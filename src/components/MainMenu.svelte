<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { slide, fade } from "svelte/transition";
    import SaveGame from "./UI/SaveGame.svelte";
    import new_card from "./Lib/EmptyCard";

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
            key = Math.floor(Math.random() * 999999999999).toString();
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

<div class="mainmenu" transition:fade>
    <div class="controls">
        <img class="logo" src="./logo.svg" alt="App logo" />

        <button
            on:click={() => {
                newgame = true;
            }}
        >
            Nová hra
        </button>

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

        {#if games_keys.length}
            <h1>Uložené hry</h1>
        {/if}

        {#each games_keys as key}
            <SaveGame
                on:play={() => play(key)}
                on:delete={() => del(key)}
                metadata={games[key]}
            />
        {/each}
    </div>
</div>

<style>
    div.mainmenu {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
    }

    div.controls {
        display: flex;
        flex-direction: column;
        max-width: 450px;
    }

    img.logo {
        padding: 5em 2em;
        max-width: 450px;
    }

    button {
        font-size: xx-large;
        padding: 0.2em 1em;
        background-color: var(--black);
        color: var(--white);
        border: none;
        border-radius: 16px;

        transition: 0.2s;
    }

    button:hover {
        background-color: var(--gold);
        color: var(--black);
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
        background-color: var(--black);
        color: var(--white);
    }

    .newgame-dialog {
        margin-top: 8px;
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
        padding: 4px 8px;
        border-radius: 8px;
    }

    h1 {
        margin: 16px;
        color: #0d21a1;
    }
</style>
