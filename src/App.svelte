<script lang="ts">
    import MainMenu from "./components/MainMenu.svelte";
    import GameView from "./components/GameView.svelte";
    import GameRules from "./components/GameRules.svelte";
    import SettingsView from "./components/SettingsView.svelte";
    import Dialog from "./components/ui/Dialog.svelte";
    import { onMount } from "svelte";
    import {
        currentState,
        Screen,
        pushScreen,
        popScreen,
        setScreen,
        userPushedState
    } from "./lib/Navigation.svelte";
    import "./style/theming.scss";
    import { dialogTrigger } from "./lib/DialogTrigger.svelte";

    onMount(() => {
        const handlePopState = (event: PopStateEvent) => {
            userPushedState(event);
        };

        window.addEventListener("popstate", handlePopState);

        () => {
            window.removeEventListener("popstate", handlePopState);
        };
    });

    let screen: Screen = $derived(currentState.screen);
</script>

<Dialog />

{#if screen == Screen.MainMenu}
    <MainMenu
        onPlay={(game) => {
            pushScreen({ screen: Screen.GameView, game: game });
        }}
        onOpenRules={() => {
            pushScreen({ screen: Screen.GameRules });
        }}
        onOpenSettings={() => {
            pushScreen({ screen: Screen.SettingsView });
        }}
    />
{:else if screen == Screen.GameView && currentState.game}
    <GameView onBack={popScreen} id={currentState.game} />
{:else if screen == Screen.GameRules}
    <GameRules onBack={popScreen} />
{:else if screen == Screen.SettingsView}
    <SettingsView
        onBack={popScreen}
        onOpenRules={() => {
            pushScreen({ screen: Screen.GameRules });
        }}
    />
{/if}
