<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import tr from "./Lib/ScreenTransition";

    import Back from "svelte-material-icons/ArrowLeft.svelte";

    import Down from "svelte-material-icons/ArrowDownBold.svelte";
    import Both from "svelte-material-icons/SwapVerticalBold.svelte";
    import Up from "svelte-material-icons/ArrowUpBold.svelte";
    import Announced from "svelte-material-icons/Bullhorn.svelte";

    import Dice1 from "svelte-material-icons/Dice1.svelte";
    import Dice2 from "svelte-material-icons/Dice2.svelte";
    import Dice3 from "svelte-material-icons/Dice3.svelte";
    import Dice4 from "svelte-material-icons/Dice4.svelte";
    import Dice5 from "svelte-material-icons/Dice5.svelte";
    import Dice6 from "svelte-material-icons/Dice6.svelte";
    import Maximum from "svelte-material-icons/Plus.svelte";
    import Minimum from "svelte-material-icons/Minus.svelte";
    import Sequence from "svelte-material-icons/Numeric.svelte";
    import FullHouse from "svelte-material-icons/Home.svelte";
    import Poker from "svelte-material-icons/StarFourPoints.svelte";
    import Yamb from "svelte-material-icons/Star.svelte";

    import TopBar from "./UI/TopBar.svelte";

    const emit = createEventDispatcher();
    let show_actions = false;
</script>

<div class="rulesscreen appscreen" in:tr out:tr>
    <TopBar
        title={$_("rules.title")}
        hideRight={true}
        on:leftbutton={() => emit("back")}
        on:rightbutton={() => (show_actions = !show_actions)}
    >
        <Back slot="leftbutton" color="white" size="28" />
    </TopBar>
    <div class="rules">
        <p>
            {$_("rules.intro_1")}
        </p>
        <p>
            {$_("rules.intro_2")}
        </p>
        <p>
            {$_("rules.intro_3")}
        </p>
        <h2>{$_("rules.rows")}</h2>
        <p>{$_("rules.rows_intro")}</p>
        <p><Dice1 /> {$_("rules.rows_1")}</p>
        <p><Dice2 /> {$_("rules.rows_2")}</p>
        <p><Dice3 /> {$_("rules.rows_3")}</p>
        <p><Dice4 /> {$_("rules.rows_4")}</p>
        <p><Dice5 /> {$_("rules.rows_5")}</p>
        <p><Dice6 /> {$_("rules.rows_6")}</p>
        <p>
            <Maximum />
            {$_("rules.rows_max")}
        </p>
        <p>
            <Minimum />
            {$_("rules.rows_min")}
        </p>
        <p style="margin-bottom: 0">
            <Sequence />
            {$_("rules.rows_str")}
        </p>
        <ul>
            <li>
                {$_("rules.rows_str_66")}
            </li>
            <li>
                {$_("rules.rows_str_56")}
            </li>
            <li>
                {$_("rules.rows_str_46")}
            </li>
            <li>
                {$_("rules.rows_str_76")}
            </li>
        </ul>
        <p>
            <FullHouse />
            {$_("rules.rows_fh")}*
        </p>
        <p>
            <Poker />
            {$_("rules.rows_poker")}*
        </p>
        <p>
            <Yamb />
            {$_("rules.rows_yamb")}*
        </p>
        <p>
            * {$_("rules.rows_autobonus")}
        </p>
        <h2>{$_("rules.cols")}</h2>
        <p>
            {$_("rules.cols_intro")}
        </p>
        <p>
            <Down />
            {$_("rules.cols_down")}
        </p>
        <p><Both /> {$_("rules.cols_any")}</p>
        <p>
            <Up />
            {$_("rules.cols_up")}
        </p>
        <p>
            <Announced />
            {@html $_("rules.cols_announce")}
        </p>

        <h2>{$_("rules.tips")}</h2>
        <p>
            {$_("rules.tips_1")}
        </p>
        <p>
            {@html $_("rules.tips_2")}
        </p>
        <p>
            {@html $_("rules.tips_3")}
        </p>
        <h2>{$_("rules.scoring")}</h2>
        <p style="margin-bottom: 0">
            {$_("rules.scoring_1")}
        </p>
        <ul>
            <li>
                {$_("rules.scoring_2")}
            </li>
            <li>
                {$_("rules.scoring_3")}
            </li>
            <li>
                {$_("rules.scoring_4")}
            </li>
            <li>{$_("rules.scoring_5")}</li>
        </ul>
        <p>
            {$_("rules.scoring_6")}
        </p>
    </div>
</div>

<style>
    div.rules {
        color: var(--front);
        padding: 1em;
        overflow-y: auto;
    }

    p {
        font-size: 140%;
    }

    ul {
        margin-top: 0;
    }

    li {
        font-size: 120%;
    }

    :global(div.rules svg) {
        height: 48px;
        width: 48px;
        vertical-align: middle;
    }

    :global(div.rules svg path) {
        fill: var(--front);
    }
</style>
