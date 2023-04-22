<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fly, slide } from "svelte/transition";

    import Back from "svelte-material-icons/ArrowLeft.svelte";
    import Menu from "svelte-material-icons/DotsVertical.svelte";

    import ZeroOut from "svelte-material-icons/Close.svelte";
    import Clear from "svelte-material-icons/TrashCan.svelte";

    import PlayingCard from "./Card/Sheet.svelte";
    import new_card from "./Lib/EmptyCard";
    import TopBar from "./UI/TopBar.svelte";

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
        card = new_card();
        show_actions = false;
    }
</script>

<div class="game appscreen" transition:fly>
    <TopBar
        title={metadata.name}
        on:leftbutton={() => emit("back")}
        on:rightbutton={() => (show_actions = !show_actions)}
    >
        <Back slot="leftbutton" color="white" size="28" />
        <Menu slot="rightbutton" color="white" size="28" />
    </TopBar>
    {#if show_actions}
        <div class="actions" transition:slide|local>
            <button on:click={zeroes} style="color: #eef0f2">
                <ZeroOut color="#eef0f2" size="28" />
                Škrtnout zbytek
            </button>
            <button on:click={clear} style="color: var(--red)">
                <Clear color="var(--red)" size="28" />
                Resetovat celou kartu
            </button>
        </div>
    {/if}
    <PlayingCard bind:card />
</div>

<style>
    div.actions {
        position: fixed;
        right: 0;
        top: 48px;
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
