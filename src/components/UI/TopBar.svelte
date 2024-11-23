<script lang="ts">
    import { type Snippet } from "svelte";

    interface Props {
        title?: string;
        leftButtonContent?: Snippet;
        onLeftButtonPressed?: () => any;
        rightButtonContent?: Snippet;
        onRightButtonPressed?: () => any;
    }

    let {
        title = "",
        leftButtonContent,
        onLeftButtonPressed,
        rightButtonContent,
        onRightButtonPressed,
    }: Props = $props();
</script>

<div class="topbar">
    <button
        onclick={onLeftButtonPressed}
        class:hide={leftButtonContent == null}
    >
        {@render leftButtonContent?.()}
    </button>
    {title}
    <button
        onclick={onRightButtonPressed}
        class:hide={rightButtonContent == null}
    >
        {@render rightButtonContent?.()}
    </button>
</div>

<style>
    div.topbar {
        position: sticky;
        top: 0;
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
