<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { slide } from "svelte/transition";
    import SaveGame from "./ui/SaveGame.svelte";
    import {
        getBlankGameCard,
        getNewGameData,
        type GameData,
        upgradeSaveData,
    } from "../lib/SaveData.svelte";

    import {
        mdiPlus as NewGame,
        mdiCog as Settings,
        mdiLightbulb as HowToPlay,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import settings from "../lib/Settings.svelte";
    import { tick } from "svelte";
    import Screen from "./ui/Screen.svelte";

    interface Props {
        onPlay: (id: string) => any;
        onOpenRules: () => any;
        onOpenSettings: () => any;
    }
    let { onPlay, onOpenRules, onOpenSettings }: Props = $props();

    let games: { [key: string]: GameData } = $state(
        JSON.parse(localStorage.getItem("games") || "{}"),
    );
    $effect(() => {
        localStorage.setItem("games", JSON.stringify(games));
    });

    let gameIds: string[] = $derived(Object.keys(games));
    let newGame: GameData | null = $state(null);

    function createGame() {
        if (!newGame) return;
        let id = null;
        while (!id || gameIds.includes(id)) {
            id = (+new Date()).toString();
        }
        games[id] = newGame;
        localStorage.setItem(id, JSON.stringify(getBlankGameCard()));
        newGame = null;
    }

    async function play(id: string) {
        games[id] = upgradeSaveData(id, games[id]);
        await tick();
        onPlay(id);
    }

    function del(id: string) {
        delete games[id];
        games = games;
        localStorage.removeItem(id);
    }
</script>

<Screen>
    {#snippet screenContent()}
        <div class="mainmenu">
            <div class="controls">
                <svg
                    class="logo"
                    viewBox="0 0 92.604 18.785"
                    fill="url(#gradient)"
                >
                    <defs>
                        <linearGradient id="gradient">
                            {#each settings.gradientValues as gradientPart, i}
                                <stop
                                    offset="{i == 0
                                        ? 0
                                        : (i /
                                              (settings.gradientValues.length -
                                                  1)) *
                                          100}%"
                                    stop-color={gradientPart}
                                />
                            {/each}
                        </linearGradient>
                    </defs>
                    {#if $locale == "cs"}
                        <path
                            d="m36.275 12.126-2.479 1.75q.56 1.19 1.555 2.21.997 1.02 2.333 1.628 1.36.583 2.916.583 1.166 0 2.21-.364 1.07-.34 1.92-.996.85-.68 1.336-1.652.486-.972.486-2.211 0-1.094-.364-1.92-.34-.85-.972-1.458-.607-.631-1.385-1.069-.753-.437-1.58-.729-1.287-.437-2.137-.85-.85-.437-1.264-.9-.413-.485-.413-1.117 0-.631.51-1.093.51-.486 1.531-.486.778 0 1.385.316.607.291 1.07.802.485.486.825 1.093l2.721-1.506q-.437-.9-1.239-1.726-.777-.85-1.968-1.384-1.166-.56-2.794-.56-1.58 0-2.867.584-1.263.559-2.017 1.628-.729 1.045-.729 2.502 0 1.215.462 2.09.462.85 1.166 1.458.705.583 1.483.972.801.364 1.409.583 1.142.437 1.92.826.801.364 1.19.85.413.486.413 1.288 0 .923-.656 1.458-.656.534-1.701.534-.899 0-1.677-.388-.777-.39-1.433-1.094-.632-.704-1.166-1.652zM.313.889v17.008h3.572V.889Zm9.622 0-7.07 8.066 7.337 8.942h4.227L7.02 8.858l7.046-7.97ZM16.058 3.763 27.12.798a1.636 1.636 0 0 1 2.004 1.157L32.09 13.02a1.636 1.636 0 0 1-1.157 2.004l-11.064 2.964a1.636 1.636 0 0 1-2.004-1.157L14.901 5.767a1.636 1.636 0 0 1 1.157-2.004m7.014 4.05a1.636 1.636 0 0 0-1.157 2.003 1.636 1.636 0 0 0 2.004 1.157 1.636 1.636 0 0 0 1.157-2.004 1.636 1.636 0 0 0-2.004-1.157ZM47.694 3.962h4.568v13.874h3.475V3.962h4.592V.828H47.694ZM62.297.828v17.008h3.572V.828Zm9.621 0-7.07 8.066 7.338 8.942h4.227l-7.41-9.039 7.046-7.97ZM88.465.828 84.796 7.68 81.151.828h-3.96l5.856 9.986v7.022h3.523V10.79L92.425.828z"
                        />
                    {:else}
                        <path
                            d="M78.73 9.77h3.068q1.703 0 2.993-.463 1.29-.487 2.02-1.412.73-.924.73-2.214 0-1.46-.73-2.41t-2.02-1.412q-1.29-.487-2.993-.487h-5.672V18.41h6.037q1.898 0 3.334-.511 1.436-.511 2.215-1.582.803-1.07.803-2.75 0-1.266-.536-2.167-.51-.9-1.411-1.46-.9-.584-2.045-.852-1.119-.268-2.36-.268H78.73v1.899h3.115q.657 0 1.217.146.56.122.973.438.438.292.658.754.243.439.243 1.072 0 .876-.414 1.436-.389.56-1.095.827-.706.243-1.582.243h-2.24V4.147h1.875q1.144 0 1.801.511.681.511.681 1.485 0 .633-.316 1.095-.292.463-.852.706-.56.243-1.314.243h-2.75zm-19.934-.925 4.94 7.983 4.942-7.983 1.095 9.565H73.4L70.87.52l-7.132 11.002L56.606.52l-2.532 17.89h3.627zM40.103 14.54h9.006l-.414-2.75h-8.178Zm4.455-7.642 2.555 5.914-.049.877 2.19 4.721h3.944L44.558.374 35.916 18.41h3.919l2.24-4.867-.074-.78zM34.335 1.372l-3.676 6.864-3.65-6.864H23.04l5.866 10.004v7.035h3.53v-7.06l5.865-9.98ZM16.827.742a1.636 1.636 0 0 0-.463.057L5.304 3.764a1.636 1.636 0 0 0-1.159 2.003L7.11 16.83a1.636 1.636 0 0 0 2.004 1.158l11.065-2.965a1.636 1.636 0 0 0 1.156-2.003L18.368 1.955a1.636 1.636 0 0 0-1.54-1.213zm-4 7.016a1.636 1.636 0 0 1 1.494 1.21 1.636 1.636 0 0 1-1.156 2.005 1.636 1.636 0 0 1-2.006-1.156 1.636 1.636 0 0 1 1.158-2.004 1.636 1.636 0 0 1 .51-.055z"
                        />
                    {/if}
                </svg>

                {#each gameIds as key}
                    <SaveGame
                        onSaveSelected={() => play(key)}
                        onSaveDelete={() => del(key)}
                        metadata={games[key]}
                    />
                {/each}

                {#if !newGame}
                    <button
                        class="card"
                        onclick={() => {
                            newGame = getNewGameData();
                        }}
                        transition:slide|local
                    >
                        <SvgIcon type="mdi" path={NewGame} />
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
                            onclick={createGame}
                            class="confirm"
                            class:allow={newGame.name}
                            style={newGame.name ? "" : "pointer-events: none"}
                        >
                            {$_("main.newgame_create")}
                        </button>
                    </div>
                {/if}

                <hr />
                <button class="card" onclick={onOpenRules}>
                    <SvgIcon type="mdi" path={HowToPlay} />
                    {$_("main.rules")}
                </button>
                <button class="card" onclick={onOpenSettings}>
                    <SvgIcon type="mdi" path={Settings} />
                    {$_("main.options")}
                </button>
            </div>
        </div>
        <div class="credit">
            Made by Daniel Sýkora (2023 - {new Date().getFullYear()})
            <a target="_blank" href="https://github.com/sykdan/kostky"
                >Source code</a
            >
        </div>
    {/snippet}
</Screen>

<style>
    div.mainmenu {
        display: flex;
        justify-content: center;
        padding: 0 8px;
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
        color: var(--front);
        border: none;

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

    .credit {
        text-align: center;
        font-size: small;
        color: var(--front);
    }

    .credit a {
        color: var(--blue);
    }
</style>
