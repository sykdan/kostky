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
    import ThemePreview from "./ui/ThemePreview.svelte";

    interface Props {
        onBack: () => any;
        onOpenRules: () => any;
    }

    let { onBack, onOpenRules }: Props = $props();

    async function autobonusHelp() {
        if (
            !(await dialogTrigger.prompt(
                $_("settings.autobonus_explanation", {
                    values: {
                        settings_autobonus: $_("settings.autobonus"),
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
    }
</script>

{#snippet colorSchemeSetting(identifier: string, label: string)}
    <button
        class:selected={settings.color === identifier}
        onclick={() => (settings.color = identifier)}
    >
        {label}

        <div data-color={identifier} class="sample"></div>
    </button>
{/snippet}

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
                <div class="themes">
                    <button
                        onclick={() => (settings.theme = "light")}
                        class:selected={settings.theme == "light"}
                    >
                        <ThemePreview theme="light" />
                        <div class="theme-name">
                            {$_("settings.theme_light")}
                        </div>
                    </button>
                    <button
                        onclick={() => (settings.theme = "dark")}
                        class:selected={settings.theme == "dark"}
                    >
                        <ThemePreview theme="dark" />
                        <div class="theme-name">
                            {$_("settings.theme_dark")}
                        </div>
                    </button>
                    <button
                        onclick={() => (settings.theme = "system")}
                        class:selected={settings.theme == "system"}
                    >
                        <ThemePreview theme="system" />
                        <div class="theme-name">
                            {$_("settings.theme_system")}
                        </div>
                    </button>
                </div>
            </Accordion>
            <Accordion label={$_("settings.color")} icon={ColorScheme}>
                <div class="options">
                    {@render colorSchemeSetting(
                        "blue",
                        $_("settings.color_blue"),
                    )}
                    {@render colorSchemeSetting(
                        "red",
                        $_("settings.color_red"),
                    )}
                    {@render colorSchemeSetting(
                        "green",
                        $_("settings.color_green"),
                    )}
                    {@render colorSchemeSetting(
                        "yellow",
                        $_("settings.color_yellow"),
                    )}
                    {@render colorSchemeSetting(
                        "orange",
                        $_("settings.color_orange"),
                    )}
                    {@render colorSchemeSetting(
                        "purple",
                        $_("settings.color_purple"),
                    )}
                    {@render colorSchemeSetting(
                        "pink",
                        $_("settings.color_pink"),
                    )}
                    {@render colorSchemeSetting(
                        "cyan",
                        $_("settings.color_cyan"),
                    )}

                    {@render colorSchemeSetting(
                        "rainbow",
                        $_("settings.color_rainbow"),
                    )}

                    {#if settings.extraThemes}
                        {@render colorSchemeSetting("gay", "MLM")}
                        {@render colorSchemeSetting("lesbian", "WLW")}
                        {@render colorSchemeSetting("bi", "Bi")}
                        {@render colorSchemeSetting("trans", "Trans")}
                        {@render colorSchemeSetting("ace", "Asexual")}
                        {@render colorSchemeSetting("pan", "Pansexual")}
                    {/if}
                </div>
            </Accordion>
            <div class="row card">
                <button
                    class="extra"
                    onclick={() => (settings.autoBonus = !settings.autoBonus)}
                >
                    <SvgIcon
                        type="mdi"
                        path={AutoBonus}
                        color="var(--front)"
                        size="28"
                    />
                    {$_("settings.autobonus")}
                </button>
                <button class="help-button" onclick={autobonusHelp}>
                    <SvgIcon
                        type="mdi"
                        path={Help}
                        color="var(--front)"
                        size="28"
                    />
                </button>
                <Switch bind:on={settings.autoBonus} />
            </div>
            <Accordion label={$_("settings.locale")} icon={Languages}>
                <div class="options">
                    <button
                        class:selected={settings.locale == "cs"}
                        onclick={() => (settings.locale = "cs")}
                        lang="cs"
                    >
                        Česky
                    </button>
                    <button
                        class:selected={settings.locale == "en"}
                        onclick={() => (settings.locale = "en")}
                        lang="en"
                    >
                        English
                    </button>
                    <button
                        class:selected={settings.locale == "bs"}
                        onclick={() => (settings.locale = "bs")}
                        lang="bs"
                    >
                        Bosanski
                    </button>
                </div>
            </Accordion>
        </div>
    {/snippet}
</Screen>

<style>
    .settings {
        padding: 8px;
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

    button {
        text-align: start;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    button.extra {
        flex: 1;
        display: flex;
        gap: 0.8em;
        align-items: center;
        padding: 0.5em 1em;
        margin: -0.5em -1em;
    }

    .help-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        display: inline-flex;
    }

    .options {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .options button {
        padding: 8px 16px;
        margin: 0px -16px;
        border-radius: 8px;
        transition: background-color 0.2s;

        display: flex;
        align-items: center;
    }

    .options button.selected {
        background-color: var(--back);
    }

    .themes {
        display: flex;
        flex-direction: row;
    }

    .themes button {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .themes .theme-name {
        margin-top: 16px;
        padding: 8px 16px;
        border-radius: 8px;
    }

    .themes button .theme-name {
        transition: background-color 0.3s;
    }
    
    .themes button.selected .theme-name {
        transition: all 0.3s;
        background-color: var(--gold);
        color: var(--black);
    }

    button {
        font-size: 24px;
        color: var(--front);
        padding: 0;
    }

    [data-color].sample {
        background-color: var(--primary);
        background-image: var(--primary-detail);
        height: 30px;
        width: 60px;
        margin-left: auto;
        border-radius: 20px;
    }
</style>
