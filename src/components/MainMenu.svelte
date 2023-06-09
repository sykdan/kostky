<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { slide, fly } from "svelte/transition";
    import SaveGame from "./UI/SaveGame.svelte";
    import new_card from "./Lib/EmptyCard";

    import NewGame from "svelte-material-icons/Plus.svelte";
    import Settings from "svelte-material-icons/Cog.svelte";
    import HowToPlay from "svelte-material-icons/Lightbulb.svelte";
    import { dialogTrigger } from "./Lib/DialogTrigger";

    const emit = createEventDispatcher();

    let games = JSON.parse(localStorage.getItem("games") || "{}");
    let games_keys = [];

    $: games_keys = Object.keys(games);
    $: {
        localStorage.setItem("games", JSON.stringify(games));
    }

    let newgame = false;
    let newgame_name = "";

    function create_game() {
        let key = null;
        while (!key || games_keys.includes(key)) {
            key = (+new Date()).toString();
        }
        games[key] = {
            name: newgame_name,
            last_played: +new Date(),
        };
        localStorage.setItem(key, JSON.stringify(new_card()));

        newgame_name = "";
        newgame = false;
    }

    function play(key) {
        games[key].last_played = +new Date();
        emit("play", key);
    }

    function del(key) {
        delete games[key];
        games = games;
        localStorage.removeItem(key);
    }
</script>

<div class="mainmenu appscreen" transition:fly>
    <div class="controls">
        <div class="logo" />

        {#each games_keys as key}
            <SaveGame
                on:play={() => play(key)}
                on:delete={() => del(key)}
                metadata={games[key]}
            />
        {/each}

        {#if !newgame}
            <button
                on:click={() => {
                    newgame = true;
                }}
                transition:slide|local
            >
                <NewGame />
                Nová hra
            </button>
        {/if}

        {#if newgame}
            <div class="newgame-dialog" transition:slide|local>
                <span>Pojmenuj tuto hru:</span>
                <input
                    type="text"
                    placeholder="např. Kostky s Lídou"
                    bind:value={newgame_name}
                />
                <button
                    on:click={create_game}
                    class="confirm"
                    class:allow={newgame_name}
                    style={newgame_name ? "" : "pointer-events: none"}
                >
                    Vytvořit
                </button>
            </div>
        {/if}

        <hr />
        <button on:click={() => emit("rules")}>
            <HowToPlay />
            Pravidla hry
        </button>
        <button on:click={() => emit("settings")}>
            <Settings />
            Možnosti
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

    div.logo {
        background-color: var(--blue);
        width: 100%;
        mask-image: url(/logo.svg);
        mask-size: 90%;
        mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-image: url(/logo.svg);
        -webkit-mask-size: 90%;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        aspect-ratio: 3/1;
    }

    button {
        font-size: xx-large;
        padding: 0.2em 1em;
        background-color: var(--silver);
        color: var(--black);
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
        fill: var(--black);
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
        color: var(--black);
        background-color: var(--silver);
    }

    .allow {
        background-color: var(--white);
        color: var(--black);
    }

    .newgame-dialog {
        padding: 1em;
        background-color: var(--silver);
        color: var(--black);
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
        background-color: var(--white);
        color: var(--black);
        padding: 4px 8px;
        border-radius: 8px;
    }

    hr {
        color: var(--black);
        margin: 16px 0;
        margin-top: 8px;
    }
</style>
