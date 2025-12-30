import { untrack } from 'svelte';
import settings from './Settings.svelte';

let refCount = $state(0);

let wakeLock: WakeLockSentinel | null = null;

async function registerWakeLockHook() {
    if (wakeLock) return;
    console.info("Holding wake lock")

    wakeLock = await navigator.wakeLock.request();
    wakeLock.addEventListener("release", handleWakeLockForciblyReleased)
}

function releaseWakeLockHook() {
    if (!wakeLock) return;
    console.info("Releasing wake lock")

    wakeLock.removeEventListener("release", handleWakeLockForciblyReleased);
    wakeLock.release();
    wakeLock = null;
}

function handleWakeLockForciblyReleased() {
    wakeLock = null;
    registerWakeLockHook();
}

$effect.root(() => {
    $effect(() => {
        if (isWakeLockAvailable()) {
            if (settings.keepScreenOn && refCount > 0) {
                registerWakeLockHook();
            } else {
                releaseWakeLockHook();
            }
        }
    });
});

export function isWakeLockAvailable() {
    return Boolean(navigator.wakeLock).valueOf()
}

export function takeWakeLock() {
    untrack(() => refCount++);
}

export function releaseWakeLock() {
    untrack(() => refCount--);
}