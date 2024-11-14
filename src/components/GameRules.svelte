<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import tr from "./Lib/ScreenTransition";

    import {
        mdiArrowLeft as Back,
        mdiArrowDownBold as Down,
        mdiSwapVerticalBold as Both,
        mdiArrowUpBold as Up,
        mdiBullhorn as Announced,
        mdiDice1 as Dice1,
        mdiDice2 as Dice2,
        mdiDice3 as Dice3,
        mdiDice4 as Dice4,
        mdiDice5 as Dice5,
        mdiDice6 as Dice6,
        mdiPlus as Maximum,
        mdiMinus as Minimum,
        mdiNumeric as Sequence,
        mdiHome as FullHouse,
        mdiStarFourPoints as Poker,
        mdiStar as Yamb,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

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
        <SvgIcon type="mdi" path={Back} slot="leftbutton" color="var(--surface)" size="28" />
    </TopBar>
    <div class="rules">
        <p>
            {@html $_("rules.intro_1")}
        </p>
        <p>
            {@html $_("rules.intro_2")}
        </p>
        <p>
            {@html $_("rules.intro_3")}
        </p>
        <h2>{@html $_("rules.rows")}</h2>
        <p>{@html $_("rules.rows_intro")}</p>
        <p><SvgIcon type="mdi" path={Dice1} /> {@html $_("rules.rows_1")}</p>
        <p><SvgIcon type="mdi" path={Dice2} /> {@html $_("rules.rows_2")}</p>
        <p><SvgIcon type="mdi" path={Dice3} /> {@html $_("rules.rows_3")}</p>
        <p><SvgIcon type="mdi" path={Dice4} /> {@html $_("rules.rows_4")}</p>
        <p><SvgIcon type="mdi" path={Dice5} /> {@html $_("rules.rows_5")}</p>
        <p><SvgIcon type="mdi" path={Dice6} /> {@html $_("rules.rows_6")}</p>
        <p>
            <SvgIcon type="mdi" path={Maximum} />
            {@html $_("rules.rows_max")}
        </p>
        <p>
            <SvgIcon type="mdi" path={Minimum} />
            {@html $_("rules.rows_min")}
        </p>
        <p style="margin-bottom: 0">
            <SvgIcon type="mdi" path={Sequence} />
            {@html $_("rules.rows_str")}
        </p>
        <ul>
            <li>
                {@html $_("rules.rows_str_66")}
            </li>
            <li>
                {@html $_("rules.rows_str_56")}
            </li>
            <li>
                {@html $_("rules.rows_str_46")}
            </li>
            <li>
                {@html $_("rules.rows_str_76")}
            </li>
        </ul>
        <p>
            <SvgIcon type="mdi" path={FullHouse} />
            {@html $_("rules.rows_fh")}*
        </p>
        <p>
            <SvgIcon type="mdi" path={Poker} />
            {@html $_("rules.rows_poker")}*
        </p>
        <p>
            <SvgIcon type="mdi" path={Yamb} />
            {@html $_("rules.rows_yamb")}*
        </p>
        <p>
            * {@html $_("rules.rows_autobonus")}
        </p>
        <h2>{@html $_("rules.cols")}</h2>
        <p>
            {@html $_("rules.cols_intro")}
        </p>
        <p>
            <SvgIcon type="mdi" path={Down} />
            {@html $_("rules.cols_down")}
        </p>
        <p><SvgIcon type="mdi" path={Both} /> {@html $_("rules.cols_any")}</p>
        <p>
            <SvgIcon type="mdi" path={Up} />
            {@html $_("rules.cols_up")}
        </p>
        <p>
            <SvgIcon type="mdi" path={Announced} />
            {@html $_("rules.cols_announce")}
        </p>

        <h2>{@html $_("rules.tips")}</h2>
        <p>
            {@html $_("rules.tips_1")}
        </p>
        <p>
            {@html $_("rules.tips_2")}
        </p>
        <p>
            {@html $_("rules.tips_3")}
        </p>
        <h2>{@html $_("rules.scoring")}</h2>
        <p style="margin-bottom: 0">
            {@html $_("rules.scoring_1")}
        </p>
        <ul>
            <li>
                {@html $_("rules.scoring_2")}
            </li>
            <li>
                {@html $_("rules.scoring_3")}
            </li>
            <li>
                {@html $_("rules.scoring_4")}
            </li>
            <li>{@html $_("rules.scoring_5")}</li>
        </ul>
        <p>
            {@html $_("rules.scoring_6")}
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
