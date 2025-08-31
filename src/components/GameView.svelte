<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    import {
        mdiArrowLeft as Back,
        mdiDotsVertical as Menu,
        mdiClose as CrossOut,
        mdiHelpCircle as WhoIsPlaying,
        mdiTrashCan as Clear,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import PlayingCard from "./card/Sheet.svelte";
    import {
        getBlankGameCard,
        type GameData,
        type GameCard,
        GAME_CARD_SIZE,
    } from "../lib/SaveData.svelte";
    import TopBar from "./ui/TopBar.svelte";
    import { dialogTrigger } from "../lib/DialogTrigger.svelte";
    import Screen from "./ui/Screen.svelte";
    import { offclick } from "../lib/Utils";

    let showActions = $state(false);

    interface Props {
        id: string;
        onBack: () => any;
    }

    let { id, onBack }: Props = $props();
    let gameData: GameData = $state(
        JSON.parse(localStorage.getItem("games")!)[id],
    );
    let card: GameCard = $state(JSON.parse(localStorage.getItem(id)!));

    onMount(() => {
        gameData.last_played = +new Date();
    });

    function countFilled() {
        let sum = 0;
        for (let row of card) {
            for (let cell of row) {
                sum += cell !== null ? 1 : 0;
            }
        }
        return sum;
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
        if (!gameData.first_placed) return null;
        let date = new Date(gameData.first_placed);
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
    }

    async function order() {
        let message = $_("game.whoisplaying_intro") + "\n\n";
        if (gameData.first_placed) {
            message +=
                $_("game.whoisplaying_time", {
                    values: { time: `<b>${getFirstPlacedTime()}</b>` },
                }) + "\n";
        }
        message +=
            $_("game.whoisplaying_fields", {
                values: {
                    n: `<b>${GAME_CARD_SIZE - countFilled()}</b>`,
                },
            }) + "\n";

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

    $effect(() => {
        localStorage.setItem(id, JSON.stringify(card));
        let filled = countFilled();
        if (filled == 0) {
            gameData.first_placed = null;
        } else if (filled == 1) {
            gameData.first_placed = +new Date();
        }
    });

    $effect(() => {
        let games = JSON.parse(localStorage.getItem("games")!);
        games[id] = gameData;
        localStorage.setItem("games", JSON.stringify(games));
    });
</script>

<Screen>
    {#snippet topBar()}
        <TopBar
            title={gameData.name}
            onLeftButtonPressed={onBack}
            onRightButtonPressed={() => (showActions = !showActions)}
        >
            {#snippet leftButtonContent()}
                <SvgIcon type="mdi" path={Back} size="28" />
            {/snippet}
            {#snippet rightButtonContent()}
                <SvgIcon type="mdi" path={Menu} size="28" />
            {/snippet}
        </TopBar>
    {/snippet}

    {#snippet screenContent()}
        {#if showActions}
            <div
                {@attach offclick((e: Event) => (showActions = false))}
                class="fixed z-10 right-0 top-12 flex flex-col rounded-2xl m-4 bg-neutral-200 dark:bg-neutral-700 shadow-2xl"
                transition:slide|local
            >
                <button
                    onclick={zeroes}
                    class="btn justify-start rounded-t-2xl active:rounded-2xl gap-3 px-3"
                >
                    <SvgIcon type="mdi" path={CrossOut} size={32} />
                    {$_("game.crossempty")}
                </button>
                <div
                    class="border-b-2 border-neutral-300 dark:border-neutral-500"
                ></div>
                <button
                    onclick={order}
                    class="btn justify-start active:rounded-2xl gap-3 px-3"
                >
                    <SvgIcon type="mdi" path={WhoIsPlaying} size={32} />
                    {$_("game.whoisplaying")}
                </button>
                <div
                    class="border-b-2 border-neutral-300 dark:border-neutral-500"
                ></div>
                <button
                    class="btn text-red-500 hover:text-red-800 justify-start rounded-b-2xl active:rounded-2xl gap-3 px-3"
                    onclick={clear}
                >
                    <SvgIcon type="mdi" path={Clear} size={32} />
                    {$_("game.reset")}
                </button>
            </div>
        {/if}

        <PlayingCard bind:card />
    {/snippet}
</Screen>