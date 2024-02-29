<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import { slide } from "svelte/transition";
    import SaveGame from "./UI/SaveGame.svelte";
    import { getBlankGameCard, getNewGameData, type GameData, upgradeSaveData } from "./Lib/SaveData";

    import NewGame from "svelte-material-icons/Plus.svelte";
    import Settings from "svelte-material-icons/Cog.svelte";
    import HowToPlay from "svelte-material-icons/Lightbulb.svelte";

    import tr from "./Lib/ScreenTransition";

    const emit = createEventDispatcher();

    let games: GameData[] = JSON.parse(localStorage.getItem("games") || "{}");
    let gameIds: string[] = [];

    $: gameIds = Object.keys(games);
    $: {
        localStorage.setItem("games", JSON.stringify(games));
    }

    let newGame: GameData | null = null;

    function createGame() {
        let id = null;
        while (!id || gameIds.includes(id)) {
            id = (+new Date()).toString();
        }
        games[id] = newGame;
        localStorage.setItem(id, JSON.stringify(getBlankGameCard()));
        newGame = null;
    }

    function play(id) {
        games[id].last_played = +new Date();
        games[id] = upgradeSaveData(games[id])
        emit("play", id);
    }

    function del(id) {
        delete games[id];
        games = games;
        localStorage.removeItem(id);
    }
</script>

<div class="mainmenu appscreen" in:tr out:tr>
    <div class="controls">
        <svg class="logo" viewBox="0 0 92.604 18.785" fill="var(--primary)">
            <path
                d="m36.275 12.126-2.479 1.75q.56 1.19 1.555 2.21.997 1.02 2.333 1.628 1.36.583 2.916.583 1.166 0 2.21-.364 1.07-.34 1.92-.996.85-.68 1.336-1.652.486-.972.486-2.211 0-1.094-.364-1.92-.34-.85-.972-1.458-.607-.631-1.385-1.069-.753-.437-1.58-.729-1.287-.437-2.137-.85-.85-.437-1.264-.9-.413-.485-.413-1.117 0-.631.51-1.093.51-.486 1.531-.486.778 0 1.385.316.607.291 1.07.802.485.486.825 1.093l2.721-1.506q-.437-.9-1.239-1.726-.777-.85-1.968-1.384-1.166-.56-2.794-.56-1.58 0-2.867.584-1.263.559-2.017 1.628-.729 1.045-.729 2.502 0 1.215.462 2.09.462.85 1.166 1.458.705.583 1.483.972.801.364 1.409.583 1.142.437 1.92.826.801.364 1.19.85.413.486.413 1.288 0 .923-.656 1.458-.656.534-1.701.534-.899 0-1.677-.388-.777-.39-1.433-1.094-.632-.704-1.166-1.652zM.313.889v17.008h3.572V.889Zm9.622 0-7.07 8.066 7.337 8.942h4.227L7.02 8.858l7.046-7.97ZM16.058 3.763 27.12.798a1.636 1.636 0 0 1 2.004 1.157L32.09 13.02a1.636 1.636 0 0 1-1.157 2.004l-11.064 2.964a1.636 1.636 0 0 1-2.004-1.157L14.901 5.767a1.636 1.636 0 0 1 1.157-2.004m7.014 4.05a1.636 1.636 0 0 0-1.157 2.003 1.636 1.636 0 0 0 2.004 1.157 1.636 1.636 0 0 0 1.157-2.004 1.636 1.636 0 0 0-2.004-1.157ZM47.694 3.962h4.568v13.874h3.475V3.962h4.592V.828H47.694ZM62.297.828v17.008h3.572V.828Zm9.621 0-7.07 8.066 7.338 8.942h4.227l-7.41-9.039 7.046-7.97ZM88.465.828 84.796 7.68 81.151.828h-3.96l5.856 9.986v7.022h3.523V10.79L92.425.828z"
            />
        </svg>

        {#each gameIds as key}
            <SaveGame
                on:play={() => play(key)}
                on:delete={() => del(key)}
                metadata={games[key]}
            />
        {/each}

        {#if !newGame}
            <button
                on:click={() => {
                    newGame = getNewGameData();
                }}
                transition:slide|local
            >
                <NewGame />
                {$_("main.newgame")}
            </button>
        {/if}

        {#if newGame}
            <div class="newgame-dialog" transition:slide|local>
                <span>{$_("main.newgame_name")}:</span>
                <input
                    type="text"
                    placeholder={$_("main.newgame_name_hint")}
                    bind:value={newGame.name}
                />
                <button
                    on:click={createGame}
                    class="confirm"
                    class:allow={newGame.name}
                    style={newGame.name ? "" : "pointer-events: none"}
                >
                    {$_("main.newgame_create")}
                </button>
            </div>
        {/if}

        <hr />
        <button on:click={() => emit("rules")}>
            <HowToPlay />
            {$_("main.rules")}
        </button>
        <button on:click={() => emit("settings")}>
            <Settings />
            {$_("main.options")}
        </button>
    </div>
</div>

<style>
    div.mainmenu {
        align-items: center;
        overflow-y: auto;
    }

    div.controls {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 450px;
    }

    svg.logo {
        width: 100%;
        transform: scale(0.9);
        aspect-ratio: 3/1;
    }

    button {
        font-size: xx-large;
        padding: 0.2em 1em;
        background-color: var(--back-extra);
        color: var(--front);
        border: none;
        border-radius: 16px;

        transition: 0.2s;
        margin-bottom: 8px;
        cursor: pointer;
    }

    .controls > button {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.controls > button > svg) {
        margin-right: 12px;
        height: 38px;
        width: auto;
    }

    :global(.controls > button > svg > path) {
        transition: 0.2s;
        fill: var(--front);
    }

    :global(.controls > button:hover > svg > path) {
        fill: rgb(20, 20, 20);
    }

    button:hover {
        background-color: var(--gold);
        color: rgb(20, 20, 20);
    }

    button:active {
        transform: scale(0.9);
    }

    .confirm {
        border-radius: 8px;
        margin-top: 8px;
        color: var(--front);
        background-color: var(--back-extra);
    }

    .allow {
        background-color: var(--back);
        color: var(--front);
    }

    .newgame-dialog {
        padding: 1em;
        background-color: var(--back-extra);
        color: var(--front);
        border-radius: 16px;
        display: flex;
        flex-direction: column;
    }

    .newgame-dialog > * {
        font-size: larger;
    }

    .newgame-dialog input {
        margin-top: 8px;
        margin-bottom: 8px;
        border: none;
        background-color: var(--back);
        color: var(--front);
        padding: 4px 8px;
        border-radius: 8px;
    }

    hr {
        color: var(--front);
        margin: 16px 0;
        margin-top: 8px;
    }
</style>
