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
    <div class="dialog" transition:fade={{ duration: 300 }}>
        <div
            class="content"
            in:fly={{ y: -50, easing: circOut }}
            out:fly={{ y: 50, easing: quadOut }}
        >
            <div class="header">
                {dialogTrigger.title}
            </div>
            <div class="message">
                {@html dialogTrigger.message}
            </div>
            <div class="buttons">
                {#if dialogTrigger.cancel}
                    <button onclick={() => resolve(false)}>
                        {dialogTrigger.cancel}
                    </button>
                {/if}
                <button class="ok" onclick={() => resolve(true)}>
                    {dialogTrigger.ok}
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    div.dialog {
        position: fixed;
        height: 100dvh;
        width: 100dvw;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
        pointer-events: all;
        touch-action: none;
        overscroll-behavior: contain;
        box-sizing: border-box;
        padding: 0 8px;
    }

    div.content {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        width: 100%;
        border-radius: 16px;
        background-color: var(--back);
        color: var(--front);
        box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        white-space: pre-line;
    }

    div.header {
        background-color: var(--primary);
        background-image: var(--primary-detail);
        color: var(--surface);
        text-align: center;
        font-size: 28px;
        user-select: none;
        border-radius: 16px 16px 0 0;
        padding: 0 8px;
    }

    div.message {
        font-size: 24px;
        margin: 16px;
    }

    div.buttons {
        background-color: var(--back-extra);
        display: flex;
        justify-content: end;
        gap: 8px;
        border-radius: 0 0 16px 16px;
        padding: 8px;
    }

    div.buttons button {
        font-size: 20px;
        border: none;
        border-radius: 18px;
        padding: 8px;
        background-color: transparent;
        color: var(--front);
    }

    div.buttons button.ok {
        background-color: var(--primary);
        background-image: var(--primary-detail);
        padding: 8px 16px;
        color: var(--surface);
    }

    div.buttons button:hover {
        cursor: pointer;
    }
</style>
