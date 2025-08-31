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
    import ThemePreview, { type ThemeOption } from "./ui/ThemePreview.svelte";
    import { supportedLanguages } from "../i18n/locale";

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

    const themeOptions: ThemeOption[] = ["light", "dark", "system"];
</script>

{#snippet colorSchemeSetting(identifier: string, label: string)}
    <button
        class={[
            "flex items-center justify-between btn px-4 rounded-2xl",
            settings.color === identifier &&
                "not-hover:bg-neutral-300 dark:not-hover:bg-neutral-600",
        ]}
        class:selected={settings.color === identifier}
        onclick={() => (settings.color = identifier)}
    >
        {label}

        <div
            data-color={identifier}
            class="bg-primary-500 w-14 h-7 rounded-full bg-theme-gradient bg-linear-to-l"
        ></div>
    </button>
{/snippet}

{#snippet separator(content: string)}
    <div class="flex items-center mx-2">
        <hr class="grow" />
        <span class="mx-4">{content}</span>
        <hr class="grow" />
    </div>
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
                <SvgIcon type="mdi" path={Back} size="28" />
            {/snippet}
        </TopBar>
    {/snippet}

    {#snippet screenContent()}
        <div class="max-w-100 w-full self-center">
            <Accordion label={$_("settings.theme")} icon={LightDarkTheme}>
                <div class="flex m-2 mt-4 gap-2">
                    {#each themeOptions as themeOption}
                        <button
                            class="btn flex flex-col flex-1 items-center rounded-2xl"
                            onclick={() => (settings.theme = themeOption)}
                            class:selected={settings.theme == themeOption}
                        >
                            <ThemePreview theme={themeOption} />
                            <div class="text-center xl mt-2">
                                {$_("settings.theme_" + themeOption)}
                            </div>
                        </button>
                    {/each}
                </div>
            </Accordion>
            <Accordion label={$_("settings.color")} icon={ColorScheme}>
                <div class="m-2 gap-2 flex flex-col">
                    {#if settings.extraThemes}
                        {@render separator("Plain colors")}
                    {/if}

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

                    {#if settings.extraThemes}
                        {@render separator("Pride flags")}
                    {/if}

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
            <Accordion label={$_("settings.autobonus")} icon={AutoBonus}>
                <div class="flex flex-col p-2 gap-2">
                    <button
                        class={[
                            "btn flex items-center justify-start px-4 rounded-2xl hover:bg-amber-300 active:bg-amber-300",
                            settings.autoBonus &&
                                "bg-neutral-300 dark:bg-neutral-600",
                        ]}
                        onclick={() => (settings.autoBonus = true)}
                    >
                        {$_("common.yes")}
                    </button>
                    <button
                        class={[
                            "btn flex items-center justify-start px-4 rounded-2xl hover:bg-amber-300 active:bg-amber-300",
                            !settings.autoBonus &&
                                "bg-neutral-300 dark:bg-neutral-600",
                        ]}
                        onclick={() => (settings.autoBonus = false)}
                    >
                        {$_("common.no")}
                    </button>
                    <button
                        class={"btn flex items-center justify-start px-4 rounded-2xl hover:bg-amber-300 active:bg-amber-300"}
                        onclick={autobonusHelp}
                    >
                        <div class="me-3 my-2">
                            <SvgIcon type="mdi" path={Help} size="28" />
                        </div>
                        {$_("settings.autobonus_explanation_button")}
                    </button>
                </div>
            </Accordion>
            <Accordion label={$_("settings.locale")} icon={Languages}>
                <div class="flex flex-col p-2 gap-2">
                    {#each Object.entries(supportedLanguages) as [key, langName], i}
                        <button
                            class={[
                                "btn flex items-center justify-start px-4 rounded-2xl hover:bg-amber-300 active:bg-amber-300",
                                settings.locale === key &&
                                    "bg-neutral-300 dark:bg-neutral-600",
                            ]}
                            onclick={() => (settings.locale = key)}
                            lang={key}
                        >
                            {langName}
                        </button>
                    {/each}
                </div>
            </Accordion>
        </div>
    {/snippet}
</Screen>
