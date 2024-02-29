<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { createEventDispatcher, onMount } from "svelte";
    import { slide } from "svelte/transition";
    import tr from "./Lib/ScreenTransition";

    import Back from "svelte-material-icons/ArrowLeft.svelte";
    import Menu from "svelte-material-icons/DotsVertical.svelte";

    import CrossOut from "svelte-material-icons/Close.svelte";
    import WhoIsPlaying from "svelte-material-icons/HelpCircle.svelte";
    import Clear from "svelte-material-icons/TrashCan.svelte";

    import PlayingCard from "./Card/Sheet.svelte";
    import {
        getBlankGameCard,
        type GameData,
        type GameCard,
        GAME_CARD_SIZE,
    } from "./Lib/SaveData";
    import TopBar from "./UI/TopBar.svelte";
    import { dialogTrigger } from "./Lib/DialogTrigger";

    const emit = createEventDispatcher();
    let showActions = false;

    export let id: string;
    let gameData: GameData = JSON.parse(localStorage.getItem("games"))[id];
    let card: GameCard = JSON.parse(localStorage.getItem(id));
    $: {
        localStorage.setItem(id, JSON.stringify(card));
        if (gameData.first_placed === null && countFilled() > 0) {
            gameData.first_placed = +new Date();
        }
    }
    $: {
        let g = JSON.parse(localStorage.getItem("games"));
        g[id] = gameData;
        localStorage.setItem("games", JSON.stringify(g));
    }

    onMount(() => {
        gameData.last_played = +new Date();
    });

    function countFilled() {
        return card.reduce(
            (carry, x) =>
                carry += x.reduce((carry, x) => carry += (x !== null ? 1 : 0), 0),
            0,
        );
    }

    async function zeroes() {
        if (
            await dialogTrigger.prompt(
                $_("game.crossempty"),
                $_("game.crossempty_confirm") + "\n" + $_("common.noundo"),
                $_("common.yes"),
                $_("common.no"),
            )
        ) {
            card = card.map((k) => k.map((l) => l ?? 0));
            showActions = false;
        }
    }

    function getFirstPlacedTime() {
        let date = new Date(gameData.first_placed);
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
    }

    async function order() {
        let message =  $_("game.whoisplaying_intro") + "\n\n";
        if(gameData.first_placed) {
            message += $_("game.whoisplaying_time", {values: {"time": "<b>" + getFirstPlacedTime() + "</b>"}}) + "\n"
        }
        message += $_("game.whoisplaying_fields", {values: {"n": "<b>" + (GAME_CARD_SIZE - countFilled()).toString() + "</b>"}}) + "\n";
           
        await dialogTrigger.prompt(
            $_("game.whoisplaying"),
           message,
            $_("common.ok"),
        );
    }

    async function clear() {
        if (
            await dialogTrigger.prompt(
                $_("game.reset"),
                $_("game.reset_confirm") + "\n" + $_("common.noundo"),
                $_("common.yes"),
                $_("common.no"),
            )
        ) {
            card = getBlankGameCard();
            gameData.first_placed = null;
            showActions = false;
        }
    }
</script>

<div class="game appscreen" in:tr out:tr>
    <TopBar
        title={gameData.name}
        on:leftbutton={() => emit("back")}
        on:rightbutton={() => (showActions = !showActions)}
    >
        <Back slot="leftbutton" color="white" size="28" />
        <Menu slot="rightbutton" color="white" size="28" />
    </TopBar>

    {#if showActions}
        <div class="actions" transition:slide|local>
            <button on:click={zeroes} style="color: var(--front)">
                <CrossOut color="var(--front)" size="28" />
                {$_("game.crossempty")}
            </button>
            <button on:click={order} style="color: var(--front)">
                <WhoIsPlaying color="var(--front)" size="28" />
                {$_("game.whoisplaying")}
            </button>
            <button on:click={clear} style="color: var(--red)">
                <Clear color="var(--red)" size="28" />
                {$_("game.reset")}
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
        background-color: var(--back-extra);
        padding: 4px;
        z-index: 2;
        gap: 4px;
        margin: 8px;
        border-radius: 16px;
        box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
    }

    div.actions button {
        background-color: transparent;
        padding: 8px;
        font-size: large;
        border: none;
        border-radius: 12px;
        transition: 0.2s;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 16px;
        color: var(--back);
    }

    div.actions button :global(svg) {
        margin-right: 8px;
    }

    div.actions button:hover,
    div.actions button:active {
        background-color: rgba(255, 255, 255, 0.16);
    }
</style>
