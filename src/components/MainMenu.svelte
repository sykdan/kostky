<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { slide, fly } from "svelte/transition";
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

<div class="mainmenu appscreen" transition:fly>
    <div class="controls">
        <div class="logo" />

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
        height: 240px;
        background-color: var(--blue);
        width: 100%;
        mask-image: url(/logo.svg);
        mask-size: 100%;
        mask-repeat: no-repeat;
        mask-position: center;
    }

    button {
        font-size: xx-large;
        padding: 0.2em 1em;
        background-color: var(--silver);
        color: var(--black);
        border: none;
        border-radius: 16px;

        transition: 0.2s;
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
        color: var(--black);
        padding: 4px 8px;
        border-radius: 8px;
    }

    h1 {
        margin: 16px 0;
        color: var(--blue);
    }
</style>
