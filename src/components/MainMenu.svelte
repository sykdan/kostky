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
        mdiBook as HowToPlay,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import settings from "../lib/Settings.svelte";
    import { tick } from "svelte";
    import Screen from "./ui/Screen.svelte";
    import Logo from "./ui/Logo.svelte";

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
        <div class="flex flex-col items-center">
            <div class=" max-w-100 w-full">
                <Logo />
                <div
                    class="flex flex-col rounded-2xl bg-neutral-200 dark:bg-neutral-700"
                >
                    {#each gameIds as key}
                        <SaveGame
                            onSaveSelected={() => play(key)}
                            onSaveDelete={() => del(key)}
                            metadata={games[key]}
                        />
                    {/each}

                    {#if !newGame}
                        <button
                            class={[
                                "rounded-2xl btn w-full gap-3",
                                gameIds.length && "not-active:rounded-t-none",
                            ]}
                            onclick={() => {
                                newGame = getNewGameData();
                            }}
                            transition:slide|local
                        >
                            <SvgIcon type="mdi" path={NewGame} size={32} />
                            {$_("main.newgame")}
                        </button>
                    {/if}

                    {#if newGame}
                        <div class="flex flex-col p-2" transition:slide|local>
                            <span class="text-xl px-2 pt-2"
                                >{$_("main.newgame_name")}:</span
                            >
                            <input
                                class="text-lg bg-neutral-50 dark:bg-neutral-900 px-3 py-2 rounded-2xl my-2"
                                type="text"
                                placeholder={$_("main.newgame_name_hint")}
                                bind:value={newGame.name}
                            />
                            {#if newGame.name}
                                <button
                                    onclick={createGame}
                                    class="btn rounded-2xl gap-3 bg-neutral-50 dark:bg-neutral-900 hover:bg-amber-300 active:bg-amber-300"
                                    transition:slide|local
                                >
                                    <SvgIcon
                                        type="mdi"
                                        path={NewGame}
                                        size={32}
                                    />
                                    {$_("main.newgame_create")}
                                </button>
                            {/if}
                        </div>
                    {/if}
                </div>

                <button
                    class="btn mt-2 w-full gap-3 rounded-2xl"
                    onclick={onOpenRules}
                >
                    <SvgIcon type="mdi" path={HowToPlay} size={32} />
                    {$_("main.rules")}
                </button>
                <button
                    class="btn mt-2 w-full gap-3 rounded-2xl"
                    onclick={onOpenSettings}
                >
                    <SvgIcon type="mdi" path={Settings} size={32} />
                    {$_("main.options")}
                </button>
            </div>
            <div class="mt-2 text-center text-xs">
                Made by Daniel Sýkora (2023 - {new Date().getFullYear()})
                <a
                    class="underline text-blue-400"
                    target="_blank"
                    href="https://github.com/sykdan/kostky">Source code</a
                >
            </div>
        </div>
    {/snippet}
</Screen>
