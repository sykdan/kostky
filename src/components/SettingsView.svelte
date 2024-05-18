<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import tr from "./Lib/ScreenTransition";

    import Back from "svelte-material-icons/ArrowLeft.svelte";

    import TopBar from "./UI/TopBar.svelte";

    const emit = createEventDispatcher();

    let st__theme = localStorage.getItem("st__theme") ?? "light";
    let st__autobonus = localStorage.getItem("st__autobonus") ?? "yes";
    let st__color = localStorage.getItem("st__color") ?? "blue";
    let st__locale = localStorage.getItem("st__locale") ?? "cs";
    let st__extrathemes = localStorage.getItem("st__extrathemes") ?? "no";

    $: {
        localStorage.setItem("st__theme", st__theme);
        document.querySelector("html").setAttribute("theme", st__theme);
    }
    $: {
        localStorage.setItem("st__autobonus", st__autobonus);
    }
    $: {
        localStorage.setItem("st__color", st__color);
        document.querySelector("html").setAttribute("color", st__color);
        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute(
                "content",
                getComputedStyle(document.body).getPropertyValue("--primary"),
            );
    }
    $: {
        localStorage.setItem("st__locale", st__locale);
        $locale = st__locale;
    }

    function updateAutoBonus() {
        let b = st__autobonus == "yes" ? -1 : 1;
        let games = JSON.parse(localStorage.getItem("games"));
        Object.keys(games).forEach((game) => {
            let card = JSON.parse(localStorage.getItem(game));

            [0, 1, 2, 3].forEach((i) => {
                if (card[9][i]) {
                    card[9][i] += 30 * b;
                }
                if (card[10][i]) {
                    card[10][i] += 40 * b;
                }
                if (card[11][i]) {
                    card[11][i] += 50 * b;
                }
            });

            localStorage.setItem(game, JSON.stringify(card));
        });
    }
</script>

<div class="appscreen" in:tr out:tr>
    <TopBar
        title={$_("settings.title")}
        hideRight={true}
        on:leftbutton={() => {
            if (st__color == "rainbow") {
                localStorage.setItem("st__extrathemes", "yes");
            }
            emit("back");
        }}
    >
        <Back slot="leftbutton" color="var(--surface)" size="28" />
    </TopBar>

    <div class="settings">
        <div class="row">
            <label for="theme">{$_("settings.theme")}</label>
            <select name="theme" bind:value={st__theme}>
                <option value="light">{$_("settings.theme_light")}</option>
                <option value="dark">{$_("settings.theme_dark")}</option>
                <option value="system">{$_("settings.theme_system")}</option>
            </select>
        </div>
        <div class="row">
            <label for="color">{$_("settings.color")}</label>
            <select name="color" bind:value={st__color}>
                <optgroup label="Plain colors">
                    <option value="blue">{$_("settings.color_blue")}</option>
                    <option value="red">{$_("settings.color_red")}</option>
                    <option value="green">{$_("settings.color_green")}</option>
                    <option value="yellow">{$_("settings.color_yellow")}</option>
                    <option value="orange">{$_("settings.color_orange")}</option>
                    <option value="purple">{$_("settings.color_purple")}</option>
                    <option value="pink">{$_("settings.color_pink")}</option>
                    <option value="cyan">{$_("settings.color_cyan")}</option>
                </optgroup>

                {#if st__extrathemes == "yes"}
                    <optgroup label="Pride flags">
                        <option value="rainbow">{$_("settings.color_rainbow")}</option>
                        <option value="gay">Gay</option>
                        <option value="lesbian">Lesbian</option>
                        <option value="bi">Bisexual</option>
                        <option value="trans">Transgender</option>
                        <option value="ace">Asexual</option>
                        <option value="pan">Pansexual</option>
                    </optgroup>
                {:else}
                    <option value="rainbow">{$_("settings.color_rainbow")}</option>
                {/if}
            </select>
        </div>
        <div class="row">
            <label for="autobonus">{$_("settings.autobonus")}</label>
            <select
                name="autobonus"
                bind:value={st__autobonus}
                on:change={updateAutoBonus}
            >
                <option value="yes">{$_("settings.autobonus_yes")}</option>
                <option value="no">{$_("settings.autobonus_no")}</option>
            </select>
        </div>
        <div class="row">
            <label for="locale"
                >{$_("settings.locale")}{$locale == "en"
                    ? ""
                    : " / Language"}</label
            >
            <select name="locale" bind:value={st__locale}>
                <option value="cs">Česky</option>
                <option value="en">English</option>
                <!-- <option value="bs">Bosanski</option> -->
            </select>
        </div>
    </div>
</div>

<style>
    .settings {
        padding: 16px;
        align-self: center;
        width: 100%;
        max-width: 450px;
        box-sizing: border-box;
    }

    .settings > .row {
        display: flex;
        margin-bottom: 4px;
    }

    label {
        flex: 1;
    }

    select {
        border: none;
        border-radius: 16px;
        padding: 4px 8px;
        background-color: var(--back-extra);
    }

    select,
    label {
        font-size: 24px;
        color: var(--front);
    }
</style>
