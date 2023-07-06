<script>
    import { createEventDispatcher } from "svelte";

    export let title = "";
    export let hideLeft = false;
    export let hideRight = false;
    const emit = createEventDispatcher();
</script>

<div class="topbar">
    <button on:click={() => emit("leftbutton")} class:hide={hideLeft}>
        <slot name="leftbutton" />
    </button>
    {title}
    <button on:click={() => emit("rightbutton")} class:hide={hideRight}>
        <slot name="rightbutton" />
    </button>
</div>

<style>
    div.topbar {
        background-color: var(--blue);
        color: white;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
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
