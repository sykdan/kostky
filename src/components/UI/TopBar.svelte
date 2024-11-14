<script lang="ts">
    import { createEventDispatcher } from "svelte";

    interface Props {
        title?: string;
        hideLeft?: boolean;
        hideRight?: boolean;
        leftbutton?: import('svelte').Snippet;
        rightbutton?: import('svelte').Snippet;
    }

    let {
        title = "",
        hideLeft = false,
        hideRight = false,
        leftbutton,
        rightbutton
    }: Props = $props();
    const emit = createEventDispatcher();
</script>

<div class="topbar">
    <button onclick={() => emit("leftbutton")} class:hide={hideLeft}>
        {@render leftbutton?.()}
    </button>
    {title}
    <button onclick={() => emit("rightbutton")} class:hide={hideRight}>
        {@render rightbutton?.()}
    </button>
</div>

<style>
    div.topbar {
        background-color: var(--primary);
        background-image: var(--primary-detail);
        color: var(--surface);
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28px;
        box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        z-index: 10;
        user-select: none;
    }

    div.topbar button {
        background-color: transparent;
        padding: 10px;
        font-size: medium;
        border: none;
        border-radius: 50%;
        transition: 0.2s;
        cursor: pointer;
    }

    div.topbar button.hide {
        visibility: hidden;
        pointer-events: none;
    }

    div.topbar button:hover,
    div.topbar button:active {
        background-color: rgba(0, 0, 0, 0.23);
    }

    div.topbar button :global(svg) {
        vertical-align: middle;
    }
</style>
