<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { dialogTrigger } from "../../lib/DialogTrigger.svelte";
    import { circOut, quadOut } from "svelte/easing";
    import { freezeScreen, unfreezeScreen } from "../../lib/Navigation.svelte";
    import { untrack } from "svelte";

    function resolve(result: boolean) {
        dialogTrigger.visible = false;
        dialogTrigger.resolve(result);
    }

    $effect(() => {
        if (dialogTrigger.visible) {
            untrack(() => {
                freezeScreen();
            });
        } else {
            untrack(() => {
                unfreezeScreen();
            });
        }
    });
</script>

{#if dialogTrigger.visible}
    <div
        class="dialog fixed h-dvh w-dvw bg-black/50 z-20 flex flex-col items-center justify-center backdrop-blur-sm touch-none pointer-events-[all] overscroll-contain p-2"
        transition:fade={{ duration: 300 }}
    >
        <div
            class="flex flex-col max-w-120 w-full rounded-2xl bg-neutral-50 dark:bg-neutral-900 shadow-xl whitespace-pre-line"
            in:fly={{ y: -50, easing: circOut }}
            out:fly={{ y: 50, easing: quadOut }}
        >
            <div
                class="bg-primary-500 bg-gradient-to-r bg-theme-gradient surface:text-neutral-900 text-neutral-50 text-center text-2xl py-1 rounded-t-2xl"
            >
                {dialogTrigger.title}
            </div>

            <div class="text-2xl m-4">
                {@html dialogTrigger.message}
            </div>
            <div
                class="bg-neutral-200 dark:bg-neutral-700 flex justify-end p-2 rounded-b-2xl gap-2"
            >
                {#if dialogTrigger.cancel}
                    <button
                        class="btn rounded-2xl text-xl px-4 pt-2"
                        onclick={() => resolve(false)}
                    >
                        {dialogTrigger.cancel}
                    </button>
                {/if}
                <button
                    class="group btn bg-primary-500 p-0 rounded-2xl bg-gradient-to-r bg-theme-gradient surface:text-neutral-900 text-neutral-50"
                    onclick={() => resolve(true)}
                >
                    <div class="scale-101 transition group-hover:bg-amber-300 group-hover:text-neutral-950 group-active:bg-amber-300 group-active:text-neutral-950 px-4 rounded-2xl text-xl h-full flex items-center">
                        {dialogTrigger.ok}
                    </div>
                </button>
            </div>
        </div>
    </div>
{/if}