<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    import tr from "./Lib/ScreenTransition";

    import {
        mdiArrowLeft as Back,
        mdiDotsVertical as Menu,
        mdiClose as CrossOut,
        mdiHelpCircle as WhoIsPlaying,
        mdiTrashCan as Clear,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import PlayingCard from "./Card/Sheet.svelte";
    import {
        getBlankGameCard,
        type GameData,
        type GameCard,
        GAME_CARD_SIZE,
    } from "./Lib/SaveData.svelte";
    import TopBar from "./UI/TopBar.svelte";
    import { dialogTrigger } from "./Lib/DialogTrigger.svelte";

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

<div class="game appscreen" in:tr out:tr>
    <TopBar
        title={gameData.name}
        onLeftButtonPressed={onBack}
        onRightButtonPressed={() => (showActions = !showActions)}
    >
        {#snippet leftButtonContent()}
            <SvgIcon type="mdi" path={Back} color="var(--surface)" size="28" />
        {/snippet}
        {#snippet rightButtonContent()}
            <SvgIcon type="mdi" path={Menu} color="var(--surface)" size="28" />
        {/snippet}
    </TopBar>

    {#if showActions}
        <div class="actions" transition:slide|local>
            <button onclick={zeroes} style="color: var(--front)">
                <SvgIcon
                    type="mdi"
                    path={CrossOut}
                    color="var(--front)"
                    size="28"
                />
                {$_("game.crossempty")}
            </button>
            <button onclick={order} style="color: var(--front)">
                <SvgIcon
                    type="mdi"
                    path={WhoIsPlaying}
                    color="var(--front)"
                    size="28"
                />
                {$_("game.whoisplaying")}
            </button>
            <button onclick={clear} style="color: var(--red)">
                <SvgIcon type="mdi" path={Clear} color="var(--red)" size="28" />
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
        cursor: pointer;
    }

    div.actions button :global(svg) {
        margin-right: 8px;
    }

    div.actions button:hover,
    div.actions button:active {
        background-color: rgba(255, 255, 255, 0.16);
    }
</style>
