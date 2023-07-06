<script lang="ts">
    import { fade, scale } from "svelte/transition";
    import { dialogTrigger } from "../Lib/DialogTrigger";

    function resolve(result: Boolean) {
        $dialogTrigger.visible = false;
        $dialogTrigger.resolver(result);
    }
</script>

{#if $dialogTrigger.visible}
    <div class="dialog" transition:fade={{ duration: 300 }}>
        <div class="content" transition:scale={{ start: 1.2 }}>
            <div class="header">
                {$dialogTrigger.title}
            </div>
            <div class="message">
                {$dialogTrigger.message}
            </div>
            <div class="buttons">
                {#if $dialogTrigger.cancel}
                    <button on:click={() => resolve(false)}>
                        {$dialogTrigger.cancel}
                    </button>
                {/if}
                <button class="ok" on:click={() => resolve(true)}>
                    {$dialogTrigger.ok}
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    div.dialog {
        position: fixed;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    div.content {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        width: 100%;
        border-radius: 16px;
        background-color: var(--white);
        color: var(--black);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        white-space: pre-line
    }

    div.header {
        background-color: var(--blue);
        color: white;
        text-align: center;
        font-size: 28px;
        user-select: none;
        border-radius: 16px 16px 0 0;
    }

    div.message {
        font-size: 24px;
        margin: 16px;
    }

    div.buttons {
        background-color: var(--silver);
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
        color: var(--black);
    }

    div.buttons button.ok {
        background-color: var(--blue);
        padding: 8px 16px;
        color: white;
    }

    div.buttons button:hover {
        cursor: pointer;
    }
</style>
