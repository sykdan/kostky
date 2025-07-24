<script lang="ts">
    import { _, locale } from "svelte-i18n";

    import {
        mdiArrowLeft as Back,
        mdiTranslate as Languages,
        mdiBrightness6 as LightDarkTheme,
        mdiBrush as ColorScheme,
        mdiHelpCircle as Help,
        mdiPlusCircleMultiple as AutoBonus,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import TopBar from "./ui/TopBar.svelte";
    import settings from "../lib/Settings.svelte";
    import Screen from "./ui/Screen.svelte";
    import { dialogTrigger } from "../lib/DialogTrigger.svelte";
    import Accordion from "./ui/Accordion.svelte";
    import Switch from "./ui/Switch.svelte";

    interface Props {
        onBack: () => any;
        onOpenRules: () => any;
    }

    let { onBack, onOpenRules }: Props = $props();
</script>

<Screen>
    {#snippet topBar()}
        <TopBar
            title={$_("settings.title")}
            onLeftButtonPressed={() => {
                if (settings.color == "rainbow") {
                    settings.extraThemes = true;
                }
                onBack();
            }}
        >
            {#snippet leftButtonContent()}
                <SvgIcon
                    type="mdi"
                    path={Back}
                    color="var(--surface)"
                    size="28"
                />
            {/snippet}
        </TopBar>
    {/snippet}

    {#snippet screenContent()}
        <div class="settings">
            <Accordion label={$_("settings.theme")} icon={LightDarkTheme}>
                <select name="theme" bind:value={settings.theme}>
                    <option value="light">{$_("settings.theme_light")}</option>
                    <option value="dark">{$_("settings.theme_dark")}</option>
                    <option value="system">{$_("settings.theme_system")}</option
                    >
                </select>
            </Accordion>
            <Accordion label={$_("settings.color")} icon={ColorScheme}>
                <select name="color" bind:value={settings.color}>
                    <optgroup label="Plain colors">
                        <option value="blue">
                            {$_("settings.color_blue")}
                        </option>
                        <option value="red">
                            {$_("settings.color_red")}
                        </option>
                        <option value="green">
                            {$_("settings.color_green")}
                        </option>
                        <option value="yellow">
                            {$_("settings.color_yellow")}
                        </option>
                        <option value="orange">
                            {$_("settings.color_orange")}
                        </option>
                        <option value="purple">
                            {$_("settings.color_purple")}
                        </option>
                        <option value="pink">
                            {$_("settings.color_pink")}
                        </option>
                        <option value="cyan">
                            {$_("settings.color_cyan")}
                        </option>
                    </optgroup>

                    {#if settings.extraThemes}
                        <optgroup label="Pride flags">
                            <option value="rainbow">
                                {$_("settings.color_rainbow")}
                            </option>
                            <option value="gay">MLM</option>
                            <option value="lesbian">WLW</option>
                            <option value="bi">Bi</option>
                            <option value="trans">Trans</option>
                            <option value="ace">Asexual</option>
                            <option value="pan">Pansexual</option>
                        </optgroup>
                    {:else}
                        <option value="rainbow">
                            {$_("settings.color_rainbow")}
                        </option>
                    {/if}
                </select>
            </Accordion>
            <div class="row card">
                <SvgIcon
                    type="mdi"
                    path={AutoBonus}
                    color="var(--front)"
                    size="28"
                />
                <span>
                    {$_("settings.autobonus")}
                    <button
                        class="help-button"
                        onclick={async () => {
                            if (
                                !(await dialogTrigger.prompt(
                                    $_("settings.autobonus_explanation", {
                                        values: {
                                            settings_autobonus:
                                                $_("settings.autobonus"),
                                        },
                                    }),
                                    $_("settings.autobonus_explanation_1") +
                                        "\n\n" +
                                        $_("settings.autobonus_explanation_2") +
                                        "\n\n" +
                                        $_("settings.autobonus_explanation_3"),
                                    $_("common.ok"),
                                    $_("settings.open_rules"),
                                ))
                            ) {
                                onOpenRules();
                            }
                        }}
                    >
                        <SvgIcon
                            type="mdi"
                            path={Help}
                            color="var(--front)"
                            size="28"
                        />
                    </button>
                </span>
                <Switch bind:on={settings.autoBonus}/>
            </div>
            <Accordion label={$_("settings.locale")} icon={Languages}>
                <select name="locale" bind:value={settings.locale}>
                    <option value="cs" lang="cs">Česky</option>
                    <option value="en" lang="en">English</option>
                    <option value="bs" lang="bs">Bosanski</option>
                </select>
            </Accordion>
        </div>
    {/snippet}
</Screen>

<style>
    .settings {
        padding: 16px;
        align-self: center;
        width: 100%;
        max-width: 450px;
        box-sizing: border-box;
        color: var(--front);
    }

    .row {
        display: flex;
        flex-direction: row;
        margin-bottom: 4px;
        padding: 0.5em 1em;
        gap: 0.8em;
        flex-shrink: 0;
        box-sizing: border-box;
        justify-content: flex-start;
    }

    .row span {
        display: flex;
        gap: 8px;
        align-items: center;
        flex: 1;
    }

    .row span button {
        text-align: start;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .help-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
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
