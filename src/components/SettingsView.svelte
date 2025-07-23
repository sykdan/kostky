<script lang="ts">
    import { _, locale } from "svelte-i18n";

    import {
        mdiArrowLeft as Back,
        mdiTranslate as Languages,
        mdiHelpCircle as Help,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import TopBar from "./ui/TopBar.svelte";
    import settings from "../lib/Settings.svelte";
    import Screen from "./ui/Screen.svelte";
    import { dialogTrigger } from "../lib/DialogTrigger.svelte";

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
            <div class="row">
                <label for="theme">{$_("settings.theme")}</label>
                <select name="theme" bind:value={settings.theme}>
                    <option value="light">{$_("settings.theme_light")}</option>
                    <option value="dark">{$_("settings.theme_dark")}</option>
                    <option value="system">{$_("settings.theme_system")}</option
                    >
                </select>
            </div>
            <div class="row">
                <label for="color">{$_("settings.color")}</label>
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
            </div>
            <div class="row">
                <label for="autobonus">
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
                                    $_("settings.autobonus_explanation_1") + "\n\n" +
                                    $_("settings.autobonus_explanation_2") + "\n\n" +
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
                </label>
                <select name="autobonus" bind:value={settings.autoBonus}>
                    <option value={true}>{$_("settings.autobonus_yes")}</option>
                    <option value={false}>{$_("settings.autobonus_no")}</option>
                </select>
            </div>
            <div class="row">
                <label for="locale">
                    <SvgIcon
                        type="mdi"
                        path={Languages}
                        color="var(--front)"
                        size="28"
                    />
                    {$_("settings.locale")}
                </label>
                <select name="locale" bind:value={settings.locale}>
                    <option value="cs" lang="cs">Česky</option>
                    <option value="en" lang="en">English</option>
                    <option value="bs" lang="bs">Bosanski</option>
                </select>
            </div>
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
    }

    .settings > .row {
        display: flex;
        margin-bottom: 4px;
    }

    .row label {
        display: flex;
        gap: 16px;
        align-items: center;
    }

    label {
        flex: 1;
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
