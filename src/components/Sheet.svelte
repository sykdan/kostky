<script lang="ts">
    import { createEventDispatcher } from "svelte";
    // Input fields
    import InputBox from "./InputBox.svelte";
    import SeriesInputBox from "./SeriesInputBox.svelte";

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
    import Plus from "svelte-material-icons/Plus.svelte";
    import Minus from "svelte-material-icons/Minus.svelte";
    // Pattern hits
    import Sequence from "svelte-material-icons/Numeric.svelte";
    import FullHouse from "svelte-material-icons/Home.svelte";
    import Poker from "svelte-material-icons/StarFourPoints.svelte";
    import Yamb from "svelte-material-icons/Star.svelte";

    const SPECIAL_ADDS = [30, 40, 50];

    const emit = createEventDispatcher();

    export let card;

    // Variables for mid-game calculations
    let singles_sums: number[];
    let minmax_sums: number[];
    let special_sums: number[];

    $: if (card) {
        // Sum the first six fields.
        singles_sums = card.map((c: number[]) => {
            let n = c.slice(0, 6).reduce((p, c) => p + c, 0);
            return n >= 60 ? n + 30 : n;
        });

        // Sum the minimum and maximum.
        minmax_sums = card.map((c: number[]) => {
            let ones = c[0];
            let maximum = c[6];
            let minimum = c[7];

            if (maximum && minimum) {
                return (maximum - minimum) * (ones ?? 1);
            }

            return 0;
        });

        special_sums = card.map((c) => {
            // Score for Fullhouse, Poker and Yamb
            let sum_bonuses = SPECIAL_ADDS.map((add, index) => {
                if (c[index + 9] > 0) {
                    return c[index + 9] + add;
                }
                return 0;
            }).reduce((p, c) => p + c, 0); // Sum the array

            // Score for sequence
            let sum_sequence;
            if (c[8] == "X" || c[8] == "" || c[8] == null) {
                sum_sequence = 0;
            } else {
                sum_sequence = parseInt(c[8]) * -10 + 76;
            }

            return sum_bonuses + sum_sequence;
        });
    }
</script>

<table>
    <tr class="heading">
        <th class="side" />
        <th><div><Down color="white" size="48" /></div></th>
        <th><div><Both color="white" size="48" /></div></th>
        <th><div><Up color="white" size="48" /></div></th>
        <th><div><Announced color="white" size="48" /></div></th>
    </tr>

    <tr>
        <td><Dice1 color="white" size="24" /></td>
        <InputBox row={1} type="singles" bind:value={card[0][0]} />
        <InputBox row={1} type="singles" bind:value={card[1][0]} />
        <InputBox row={1} type="singles" bind:value={card[2][0]} />
        <InputBox row={1} type="singles" bind:value={card[3][0]} />
    </tr>
    <tr>
        <td><Dice2 color="white" size="24" /></td>
        <InputBox row={2} type="singles" bind:value={card[0][1]} />
        <InputBox row={2} type="singles" bind:value={card[1][1]} />
        <InputBox row={2} type="singles" bind:value={card[2][1]} />
        <InputBox row={2} type="singles" bind:value={card[3][1]} />
    </tr>
    <tr>
        <td><Dice3 color="white" size="24" /></td>
        <InputBox row={3} type="singles" bind:value={card[0][2]} />
        <InputBox row={3} type="singles" bind:value={card[1][2]} />
        <InputBox row={3} type="singles" bind:value={card[2][2]} />
        <InputBox row={3} type="singles" bind:value={card[3][2]} />
    </tr>
    <tr>
        <td><Dice4 color="white" size="24" /></td>
        <InputBox row={4} type="singles" bind:value={card[0][3]} />
        <InputBox row={4} type="singles" bind:value={card[1][3]} />
        <InputBox row={4} type="singles" bind:value={card[2][3]} />
        <InputBox row={4} type="singles" bind:value={card[3][3]} />
    </tr>
    <tr>
        <td><Dice5 color="white" size="24" /></td>
        <InputBox row={5} type="singles" bind:value={card[0][4]} />
        <InputBox row={5} type="singles" bind:value={card[1][4]} />
        <InputBox row={5} type="singles" bind:value={card[2][4]} />
        <InputBox row={5} type="singles" bind:value={card[3][4]} />
    </tr>
    <tr>
        <td><Dice6 color="white" size="24" /></td>
        <InputBox row={6} type="singles" bind:value={card[0][5]} />
        <InputBox row={6} type="singles" bind:value={card[1][5]} />
        <InputBox row={6} type="singles" bind:value={card[2][5]} />
        <InputBox row={6} type="singles" bind:value={card[3][5]} />
    </tr>
    <tr class="margin">
        <td />
        <td
            ><span class:fulfilled={singles_sums[0] > 60}
                >{singles_sums[0]}</span
            ></td
        >
        <td
            ><span class:fulfilled={singles_sums[1] > 60}
                >{singles_sums[1]}</span
            ></td
        >
        <td
            ><span class:fulfilled={singles_sums[2] > 60}
                >{singles_sums[2]}</span
            ></td
        >
        <td
            ><span class:fulfilled={singles_sums[3] > 60}
                >{singles_sums[3]}</span
            ></td
        >
    </tr>

    <tr>
        <td><Plus color="white" size="24" /></td>
        <InputBox type="free" bind:value={card[0][6]} />
        <InputBox type="free" bind:value={card[1][6]} />
        <InputBox type="free" bind:value={card[2][6]} />
        <InputBox type="free" bind:value={card[3][6]} />
    </tr>
    <tr>
        <td><Minus color="white" size="24" /></td>
        <InputBox type="free" bind:value={card[0][7]} />
        <InputBox type="free" bind:value={card[1][7]} />
        <InputBox type="free" bind:value={card[2][7]} />
        <InputBox type="free" bind:value={card[3][7]} />
    </tr>
    <tr class="margin">
        <td />
        <td
            ><span
                >{minmax_sums[0]}{card[0][0] == null && minmax_sums[0]
                    ? "?"
                    : ""}</span
            ></td
        >
        <td
            ><span
                >{minmax_sums[1]}{card[1][0] == null && minmax_sums[1]
                    ? "?"
                    : ""}</span
            ></td
        >
        <td
            ><span
                >{minmax_sums[2]}{card[2][0] == null && minmax_sums[2]
                    ? "?"
                    : ""}</span
            ></td
        >
        <td
            ><span
                >{minmax_sums[3]}{card[3][0] == null && minmax_sums[3]
                    ? "?"
                    : ""}</span
            ></td
        >
    </tr>

    <tr>
        <td><Sequence color="white" size="24" /></td>
        <SeriesInputBox bind:value={card[0][8]} />
        <SeriesInputBox bind:value={card[1][8]} />
        <SeriesInputBox bind:value={card[2][8]} />
        <SeriesInputBox bind:value={card[3][8]} />
    </tr>
    <tr>
        <td><FullHouse color="white" size="24" /></td>
        <InputBox
            type="fullhouse"
            added={SPECIAL_ADDS[0]}
            bind:value={card[0][9]}
        />
        <InputBox
            type="fullhouse"
            added={SPECIAL_ADDS[0]}
            bind:value={card[1][9]}
        />
        <InputBox
            type="fullhouse"
            added={SPECIAL_ADDS[0]}
            bind:value={card[2][9]}
        />
        <InputBox
            type="fullhouse"
            added={SPECIAL_ADDS[0]}
            bind:value={card[3][9]}
        />
    </tr>
    <tr>
        <td><Poker color="white" size="24" /></td>
        <InputBox
            type="multiples"
            row={4}
            added={SPECIAL_ADDS[1]}
            bind:value={card[0][10]}
        />
        <InputBox
            type="multiples"
            row={4}
            added={SPECIAL_ADDS[1]}
            bind:value={card[1][10]}
        />
        <InputBox
            type="multiples"
            row={4}
            added={SPECIAL_ADDS[1]}
            bind:value={card[2][10]}
        />
        <InputBox
            type="multiples"
            row={4}
            added={SPECIAL_ADDS[1]}
            bind:value={card[3][10]}
        />
    </tr>
    <tr>
        <td><Yamb color="white" size="24" /></td>
        <InputBox
            type="multiples"
            row={5}
            added={SPECIAL_ADDS[2]}
            bind:value={card[0][11]}
        />
        <InputBox
            type="multiples"
            row={5}
            added={SPECIAL_ADDS[2]}
            bind:value={card[1][11]}
        />
        <InputBox
            type="multiples"
            row={5}
            added={SPECIAL_ADDS[2]}
            bind:value={card[2][11]}
        />
        <InputBox
            type="multiples"
            row={5}
            added={SPECIAL_ADDS[2]}
            bind:value={card[3][11]}
        />
    </tr>
    <tr class="margin last">
        <td />
        <td><span>{special_sums[0]}</span></td>
        <td><span>{special_sums[1]}</span></td>
        <td><span>{special_sums[2]}</span></td>
        <td><span>{special_sums[3]}</span></td>
    </tr>
</table>

<button
    on:click={() => {
        emit("reset");
    }}
>
    Resetovat
</button>
<button
    on:click={() => {
        card = card.map((c) => c.map((d) => d || 0));
        card[0][8] ||= "X";
        card[1][8] ||= "X";
        card[2][8] ||= "X";
        card[3][8] ||= "X";
    }}
>
    Vyplnit zbytek nulami
</button>

{#if !(card[0].includes(null) || card[1].includes(null) || card[2].includes(null) || card[3].includes(null))}
    <div class="total">
        Celkem:
        <span class="big">
            {singles_sums.reduce((p, c) => p + c, 0) +
                minmax_sums.reduce((p, c) => p + c, 0) +
                special_sums.reduce((p, c) => p + c, 0)}
        </span>
    </div>
{/if}

<style>
    table {
        border-spacing: 4px 4px;
        --sizing: calc(clamp(42px, 20vw, 84px) - 4px);
    }

    th,
    th div,
    td {
        width: var(--sizing);
        height: var(--sizing);
    }

    tr.heading > th {
        background-color: white;
        position: sticky;
        padding: 4px 0;
        top: 0;
        z-index: 1;
    }

    th div,
    td:nth-child(1) {
        background-color: #208aae;
        border-radius: 16px;
        display: grid;
        align-content: center;
        justify-content: center;
    }

    th:nth-child(1) {
        width: 24px;
        background-color: white;
    }

    td:nth-child(1) {
        width: 32px;
        height: var(--sizing);
        text-align: center;
        color: white;
    }

    tr.margin td {
        padding-bottom: 48px;
        display: table-cell;
        height: 20px;
        background: white;
    }

    tr.margin.last td {
        padding-bottom: 0;
    }

    tr.margin td span {
        color: white;
        background: #208aae;
        border-radius: 16px;
        display: block;
        text-align: center;
        font-size: 24px;
    }

    tr.margin td span.fulfilled {
        background: #39b51d;
    }

    tr.margin td:nth-child(1) {
        background-color: white;
        border-radius: 0;
    }

    .total {
        background-color: #39b51d;
        color: white;
        height: 32px;
        margin: 16px;
        padding: 16px;
        bottom: 0;
        border-radius: 16px;
        padding-top: 4px;
        text-align: center;
    }

    .total .big {
        font-size: 32px;
    }

    button {
        background-color: #208aae;
        border-radius: 16px;
        border: none;
        padding: 8px;
        color: white;
        font-size: 16px;
        margin: 4px 0;
    }
</style>
