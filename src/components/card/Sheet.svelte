<script lang="ts">
    import { _ } from "svelte-i18n";
    import { scale } from "svelte/transition";
    import {
        // Header icons
        mdiArrowDownBold as Down,
        mdiSwapVerticalBold as Both,
        mdiArrowUpBold as Up,
        mdiBullhorn as Announced,

        // Side icons
        // Number-only hits
        mdiDice1 as Dice1,
        mdiDice2 as Dice2,
        mdiDice3 as Dice3,
        mdiDice4 as Dice4,
        mdiDice5 as Dice5,
        mdiDice6 as Dice6,
        // High/Low hits
        mdiPlus as Maximum,
        mdiMinus as Minimum,
        // Pattern hits
        mdiNumeric as Sequence,
        mdiHome as FullHouse,
        mdiStarFourPoints as Poker,
        mdiStar as Yamb,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import Row from "./Row.svelte";
    import { type GameCard } from "../../lib/SaveData.svelte";
    import settings from "../../lib/Settings.svelte";

    // Variables for mid-game calculations
    const _GAMES = [0, 1, 2, 3];

    let singles_sums: number[] = $derived(
        _GAMES.map((index) => {
            let sum = [0, 1, 2, 3, 4, 5].reduce(
                (p, c) => p + (card[c][index] ?? 0),
                0,
            );
            if (sum >= 60) {
                sum += 30;
            }
            return sum;
        }),
    );

    let minmax_sums: number[] = $derived(
        _GAMES.map((index) => {
            let ones = card[0][index];
            let maximum = card[6][index];
            let minimum = card[7][index];

            if (maximum && minimum) {
                return (maximum - minimum) * (ones ?? 1);
            }

            return 0;
        }),
    );

    let special_sums: number[] = $derived(
        _GAMES.map((index) => {
            let bonus = card[8][index] ?? 0;
            bonus += card[9][index] ?? 0;
            bonus += card[10][index] ?? 0;
            bonus += card[11][index] ?? 0;
            return bonus;
        }),
    );

    $effect(() => {
        if (!card.map((k) => k.includes(null)).includes(true)) {
            let s = singles_sums.reduce((p, c) => p + c, 0);
            s += minmax_sums.reduce((p, c) => p + c, 0);
            s += special_sums.reduce((p, c) => p + c, 0);
            final_sum = s;
        } else {
            final_sum = null;
        }
    });

    let shouldAddBonus = settings.autoBonus;

    interface Props {
        card: GameCard;
        final_sum?: number | null;
    }

    let { card = $bindable(), final_sum = $bindable(null) }: Props = $props();
</script>

<div class="wrapper">
    <div class="sheet">
        <div class="cell header side"></div>

        <div class="cell header has-icon">
            <SvgIcon
                type="mdi"
                path={Down}
                color="var(--surface)"
                size="100%"
            />
        </div>
        <div class="cell header has-icon">
            <SvgIcon
                type="mdi"
                path={Both}
                color="var(--surface)"
                size="100%"
            />
        </div>
        <div class="cell header has-icon">
            <SvgIcon type="mdi" path={Up} color="var(--surface)" size="100%" />
        </div>
        <div class="cell header has-icon">
            <SvgIcon
                type="mdi"
                path={Announced}
                color="var(--surface)"
                size="100%"
            />
        </div>

        <Row n={1} type="singles" bind:row={card[0]} {shouldAddBonus}>
            <SvgIcon
                type="mdi"
                path={Dice1}
                color="var(--surface)"
                size="100%"
            />
        </Row>
        <Row n={2} type="singles" bind:row={card[1]} {shouldAddBonus}>
            <SvgIcon
                type="mdi"
                path={Dice2}
                color="var(--surface)"
                size="100%"
            />
        </Row>
        <Row n={3} type="singles" bind:row={card[2]} {shouldAddBonus}>
            <SvgIcon
                type="mdi"
                path={Dice3}
                color="var(--surface)"
                size="100%"
            />
        </Row>
        <Row n={4} type="singles" bind:row={card[3]} {shouldAddBonus}>
            <SvgIcon
                type="mdi"
                path={Dice4}
                color="var(--surface)"
                size="100%"
            />
        </Row>
        <Row n={5} type="singles" bind:row={card[4]} {shouldAddBonus}>
            <SvgIcon
                type="mdi"
                path={Dice5}
                color="var(--surface)"
                size="100%"
            />
        </Row>
        <Row n={6} type="singles" bind:row={card[5]} {shouldAddBonus}>
            <SvgIcon
                type="mdi"
                path={Dice6}
                color="var(--surface)"
                size="100%"
            />
        </Row>

        <div class="cell header side"></div>
        <div
            class="cell header has-icon calc"
            class:good={singles_sums[0] > 60}
        >
            {singles_sums[0]}
        </div>
        <div
            class="cell header has-icon calc"
            class:good={singles_sums[1] > 60}
        >
            {singles_sums[1]}
        </div>
        <div
            class="cell header has-icon calc"
            class:good={singles_sums[2] > 60}
        >
            {singles_sums[2]}
        </div>
        <div
            class="cell header has-icon calc"
            class:good={singles_sums[3] > 60}
        >
            {singles_sums[3]}
        </div>

        <Row type="free" bind:row={card[6]} {shouldAddBonus}>
            <SvgIcon
                type="mdi"
                path={Maximum}
                color="var(--surface)"
                size="100%"
            />
        </Row>
        <Row type="free" bind:row={card[7]} {shouldAddBonus}>
            <SvgIcon
                type="mdi"
                path={Minimum}
                color="var(--surface)"
                size="100%"
            />
        </Row>

        <div class="cell header side"></div>
        <div class="cell header has-icon calc">
            {minmax_sums[0]}{card[0][0] == null && minmax_sums[0] ? "?" : ""}
        </div>
        <div class="cell header has-icon calc">
            {minmax_sums[1]}{card[0][1] == null && minmax_sums[1] ? "?" : ""}
        </div>
        <div class="cell header has-icon calc">
            {minmax_sums[2]}{card[0][2] == null && minmax_sums[2] ? "?" : ""}
        </div>
        <div class="cell header has-icon calc">
            {minmax_sums[3]}{card[0][3] == null && minmax_sums[3] ? "?" : ""}
        </div>

        <Row type="sequence" bind:row={card[8]} {shouldAddBonus}>
            <SvgIcon
                type="mdi"
                path={Sequence}
                color="var(--surface)"
                size="100%"
            />
        </Row>
        <Row type="fullhouse" bind:row={card[9]} add={30} {shouldAddBonus}>
            <SvgIcon
                type="mdi"
                path={FullHouse}
                color="var(--surface)"
                size="100%"
            />
        </Row>
        <Row
            n={4}
            type="multiples"
            bind:row={card[10]}
            add={40}
            {shouldAddBonus}
        >
            <SvgIcon
                type="mdi"
                path={Poker}
                color="var(--surface)"
                size="100%"
            />
        </Row>
        <Row
            n={5}
            type="multiples"
            bind:row={card[11]}
            add={50}
            {shouldAddBonus}
        >
            <SvgIcon
                type="mdi"
                path={Yamb}
                color="var(--surface)"
                size="100%"
            />
        </Row>

        <div class="cell header side"></div>
        <div class="cell header has-icon calc">{special_sums[0]}</div>
        <div class="cell header has-icon calc">{special_sums[1]}</div>
        <div class="cell header has-icon calc">{special_sums[2]}</div>
        <div class="cell header has-icon calc">{special_sums[3]}</div>
    </div>
    {#if final_sum != null}
        <div class="final_sum" transition:scale|local>
            {$_("game.finalscore")}:<br />
            <b>
                {final_sum}
            </b>
        </div>
    {/if}
</div>

<style>
    div.wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 8px;
        padding-bottom: 8px;
        background-color: var(--back);
    }

    div.sheet {
        width: 100%;
        max-width: 400px;
        min-width: 100px;

        display: grid;
        grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
        gap: 4px;
        align-content: start;
    }

    :global(.cell) {
        aspect-ratio: 1/1;
        width: 100%;
        border-radius: 16px;
    }

    :global(.cell.header) {
        background-color: var(--primary);
        background-image: var(--primary-detail);
        aspect-ratio: 2/1;
    }

    :global(.cell.side) {
        background-color: var(--primary);
        background-image: var(--primary-detail);
        aspect-ratio: 1/2;
    }

    :global(.cell.header.side) {
        background: transparent;
        aspect-ratio: 1/1;
    }

    :global(.row) {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    div.calc {
        color: var(--surface);
        text-align: center;
        font-size: 24px;
    }

    div.good {
        background: var(--green);
        color: var(--white);
    }

    :global(.has-icon) {
        display: grid;
        align-content: center;
        justify-content: center;
    }

    :global(.has-icon) :global(svg) {
        transform: scale(0.85);
    }

    .final_sum {
        position: sticky;
        bottom: 8px;
        background-color: var(--green);
        padding: 8px 16px;
        margin-bottom: 8px;
        margin-top: 8px;
        border-radius: 16px;
        color: white;
        font-size: 18px;
        text-align: center;
    }

    .final_sum b {
        font-size: 24px;
    }
</style>
