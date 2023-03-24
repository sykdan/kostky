<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Back from "svelte-material-icons/ArrowLeft.svelte";
    import Menu from "svelte-material-icons/DotsVertical.svelte";
    import { slide } from "svelte/transition";

    import PlayingCard from "./Card/Sheet.svelte";
    import NEW_GAME_CARD from "./Lib/EmptyCard";

    const emit = createEventDispatcher();
    let show_actions = false;

    export let key: string;
    let card = JSON.parse(localStorage.getItem(key));
    let metadata = JSON.parse(localStorage.getItem("games"))[key];
    $: localStorage.setItem(key, JSON.stringify(card));

    function zeroes() {
        card = card.map((k) => k.map((l) => l ?? 0));
    }

    function clear() {
        card = NEW_GAME_CARD;
    }
</script>

<div class="game">
    <div class="topbar">
        <button on:click={() => emit("back")}>
            <Back color="white" size="28" />
        </button>
        {metadata.name}
        <button on:click={() => (show_actions = !show_actions)}
            ><Menu color="white" size="28" /></button
        >
    </div>
    {#if show_actions}
        <div class="actions" in:slide>
            <button on:click={zeroes}>Vyplnit nulami prázdná pole</button>
            <button on:click={clear} style="color: red;"
                >VYMAZAT CELOU KARTU</button
            >
        </div>
    {/if}
    <PlayingCard bind:card />
</div>

<style>
    div.game {
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
    }

    div.topbar {
        background-color: rgb(73, 73, 73);
        color: white;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: x-large;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        z-index: 1;
    }

    div.topbar button {
        background-color: transparent;
        padding: 8px;
        font-size: medium;
        border: none;
        border-radius: 22px;
        transition: 0.2s;
    }

    div.topbar button:hover,
    div.topbar button:active {
        background-color: gray;
    }

    div.topbar button :global(svg) {
        vertical-align: middle;
    }

    div.actions {
        position: fixed;
        right: 0;
        top: 44px;
        display: flex;
        flex-direction: column;
        background-color: silver;
        padding: 4px;
        padding-bottom: 0;
    }

    div.actions button {
        margin-bottom: 4px;
        background-color: transparent;
        padding: 8px;
        font-size: medium;
        border: none;
        border-radius: 22px;
        transition: 0.2s;
    }

    div.actions button:hover,
    div.actions button:active {
        background-color: rgba(0, 0, 0, 0.16)
    }
</style>
