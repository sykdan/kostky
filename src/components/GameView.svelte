<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import { slide } from "svelte/transition";
    import tr from "./Lib/ScreenTransition";

    import Back from "svelte-material-icons/ArrowLeft.svelte";
    import Menu from "svelte-material-icons/DotsVertical.svelte";

    import ZeroOut from "svelte-material-icons/Close.svelte";
    import Clear from "svelte-material-icons/TrashCan.svelte";

    import PlayingCard from "./Card/Sheet.svelte";
    import { getBlankGameCard, type GameData } from "./Lib/SaveData";
    import TopBar from "./UI/TopBar.svelte";
    import { dialogTrigger } from "./Lib/DialogTrigger";

    const emit = createEventDispatcher();
    let showActions = false;

    export let id: string;
    let card = JSON.parse(localStorage.getItem(id));
    let gameData: GameData = JSON.parse(localStorage.getItem("games"))[id];
    $: localStorage.setItem(id, JSON.stringify(card));

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
                <ZeroOut color="var(--front)" size="28" />
                {$_("game.crossempty")}
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
