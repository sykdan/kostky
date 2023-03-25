<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { slide } from "svelte/transition";

    import Back from "svelte-material-icons/ArrowLeft.svelte";
    import Menu from "svelte-material-icons/DotsVertical.svelte";

    import ZeroOut from "svelte-material-icons/Close.svelte";
    import Clear from "svelte-material-icons/TrashCan.svelte";

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
        show_actions = false;
    }

    function clear() {
        card = NEW_GAME_CARD;
        show_actions = false;
    }
</script>

<div class="game">
    <div class="topbar">
        <button on:click={() => emit("back")} title="Zpět">
            <Back color="white" size="28" />
        </button>
        {metadata.name}
        <button on:click={() => (show_actions = !show_actions)} title="Možnosti"
            ><Menu color="white" size="28" /></button
        >
    </div>
    {#if show_actions}
        <div class="actions" transition:slide|local>
            <button on:click={zeroes}>
                <ZeroOut color="var(--white)" size="28" />
                Škrtnout zbytek
            </button>
            <button on:click={clear} style="color: var(--red);">
                <Clear color="var(--red)" size="28" />
                Resetovat celou kartu
            </button>
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
        background-color: var(--blue);
        color: white;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: x-large;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        z-index: 10;
        user-select: none;
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
        background-color: rgba(0, 0, 0, 0.23);
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
        background-color: var(--navy);
        padding: 4px;
        padding-bottom: 0;
        z-index: 2;
    }

    div.actions button {
        margin-bottom: 4px;
        background-color: transparent;
        padding: 8px;
        font-size: large;
        border: none;
        border-radius: 22px;
        transition: 0.2s;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 16px;
        color: var(--white);
    }

    div.actions button :global(svg) {
        margin-right: 8px;
    } 

    div.actions button:hover,
    div.actions button:active {
        background-color: rgba(255, 255, 255, 0.16);
    }
</style>
