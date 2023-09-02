<script lang="ts">
    import { scale } from "svelte/transition";
    // Header icons
    import Down from "svelte-material-icons/ArrowDownBold.svelte";
    import Both from "svelte-material-icons/SwapVerticalBold.svelte";
    import Up from "svelte-material-icons/ArrowUpBold.svelte";
    import Announced from "svelte-material-icons/Bullhorn.svelte";

    // Side icons
    // Number-only hits
    import Dice1 from "svelte-material-icons/Dice1.svelte";
    import Dice2 from "svelte-material-icons/Dice2.svelte";
    import Dice3 from "svelte-material-icons/Dice3.svelte";
    import Dice4 from "svelte-material-icons/Dice4.svelte";
    import Dice5 from "svelte-material-icons/Dice5.svelte";
    import Dice6 from "svelte-material-icons/Dice6.svelte";
    // High/Low hits
    import Maximum from "svelte-material-icons/Plus.svelte";
    import Minimum from "svelte-material-icons/Minus.svelte";
    // Pattern hits
    import Sequence from "svelte-material-icons/Numeric.svelte";
    import FullHouse from "svelte-material-icons/Home.svelte";
    import Poker from "svelte-material-icons/StarFourPoints.svelte";
    import Yamb from "svelte-material-icons/Star.svelte";
    import Row from "./Row.svelte";

    export let card;

    // Variables for mid-game calculations
    let singles_sums: number[];
    let minmax_sums: number[];
    let special_sums: number[];

    let shouldAddBonus = localStorage.getItem("st__autobonus") != "no";

    export let final_sum: number = null;

    $: if (card) {
        const GAMES = [0, 1, 2, 3];
        // Sum the first six fields.
        singles_sums = GAMES.map((index) => {
            let sum = [0, 1, 2, 3, 4, 5].reduce(
                (p, c) => p + card[c][index],
                0
            );
            if (sum >= 60) {
                sum += 30;
            }
            return sum;
        });

        // Sum the minimum and maximum.
        minmax_sums = GAMES.map((index) => {
            let ones = card[0][index];
            let maximum = card[6][index];
            let minimum = card[7][index];

            if (maximum && minimum) {
                return (maximum - minimum) * (ones ?? 1);
            }

            return 0;
        });

        special_sums = GAMES.map((index) => {
            let bonus = card[8][index];
            bonus += card[9][index] ? card[9][index] + b(30) : 0;
            bonus += card[10][index] ? card[10][index] + b(40) : 0;
            bonus += card[11][index] ? card[11][index] + b(50) : 0;
            return bonus;
        });
    }

    // Check if the card is completely filled, and if it is, report the sum.
    $: if (!card.map((k: number[]) => k.includes(null)).includes(true)) {
        let s = singles_sums.reduce((p, c) => p + c, 0);
        s += minmax_sums.reduce((p, c) => p + c, 0);
        s += special_sums.reduce((p, c) => p + c, 0);
        final_sum = s;
    } else {
        final_sum = null;
    }

    function b(value) {
        if (shouldAddBonus) {
            return value;
        }
        return 0;
    }
</script>

<div class="wrapper">
    <div class="sheet">
        <div class="cell header side" />

        <div class="cell header has-icon">
            <Down color="white" size="100%" />
        </div>
        <div class="cell header has-icon">
            <Both color="white" size="100%" />
        </div>
        <div class="cell header has-icon">
            <Up color="white" size="100%" />
        </div>
        <div class="cell header has-icon">
            <Announced color="white" size="100%" />
        </div>

        <Row n={1} type="singles" bind:row={card[0]} {shouldAddBonus}>
            <Dice1 color="white" size="100%" />
        </Row>
        <Row n={2} type="singles" bind:row={card[1]} {shouldAddBonus}>
            <Dice2 color="white" size="100%" />
        </Row>
        <Row n={3} type="singles" bind:row={card[2]} {shouldAddBonus}>
            <Dice3 color="white" size="100%" />
        </Row>
        <Row n={4} type="singles" bind:row={card[3]} {shouldAddBonus}>
            <Dice4 color="white" size="100%" />
        </Row>
        <Row n={5} type="singles" bind:row={card[4]} {shouldAddBonus}>
            <Dice5 color="white" size="100%" />
        </Row>
        <Row n={6} type="singles" bind:row={card[5]} {shouldAddBonus}>
            <Dice6 color="white" size="100%" />
        </Row>

        <div class="cell header side" />
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
            <Maximum color="white" size="100%" />
        </Row>
        <Row type="free" bind:row={card[7]} {shouldAddBonus}>
            <Minimum color="white" size="100%" />
        </Row>

        <div class="cell header side" />
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
            <Sequence color="white" size="100%" />
        </Row>
        <Row type="fullhouse" bind:row={card[9]} add={30} {shouldAddBonus}>
            <FullHouse color="white" size="100%" />
        </Row>
        <Row
            n={4}
            type="multiples"
            bind:row={card[10]}
            add={40}
            {shouldAddBonus}
        >
            <Poker color="white" size="100%" />
        </Row>
        <Row
            n={5}
            type="multiples"
            bind:row={card[11]}
            add={50}
            {shouldAddBonus}
        >
            <Yamb color="white" size="100%" />
        </Row>

        <div class="cell header side" />
        <div class="cell header has-icon calc">{special_sums[0]}</div>
        <div class="cell header has-icon calc">{special_sums[1]}</div>
        <div class="cell header has-icon calc">{special_sums[2]}</div>
        <div class="cell header has-icon calc">{special_sums[3]}</div>
    </div>
    {#if final_sum != null}
        <div class="final_sum" transition:scale|local>
            Celkové skóre:<br />
            <b>
                {final_sum}
            </b>
        </div>
    {/if}
</div>

<style>
    div.wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        overflow-x: auto;
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
        aspect-ratio: 2/1;
    }

    :global(.cell.side) {
        background-color: var(--primary);
        aspect-ratio: 1/2;
    }

    :global(.cell.header.side) {
        background-color: transparent;
        aspect-ratio: 1/1;
    }

    :global(.row) {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    div.calc {
        color: white;
        text-align: center;
        font-size: 24px;
    }

    div.good {
        background-color: var(--green);
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
