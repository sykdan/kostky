<script lang="ts">
    import MainMenu from "./components/MainMenu.svelte";
    import GameView from "./components/GameView.svelte";
    import GameRules from "./components/GameRules.svelte";
    import SettingsView from "./components/SettingsView.svelte";
    import Dialog from "./components/UI/Dialog.svelte";
    import { onMount } from "svelte";

    enum SCREENS {
        MainMenu,
        GameView,
        GameRules,
        SettingsView,
    }

    onMount(() => {
        window.addEventListener("popstate", (event) => {
            setState(event.state)
        });
    });

    let screen: SCREENS = SCREENS.MainMenu;
    let selected_game_key = null;

    function setState(state) {
        state ??= {};
        if (state.game) {
            selected_game_key = state.game;
        }
        if (state.screen) {
            screen = state.screen;
        } else {
            screen = SCREENS.MainMenu;
        }
        return state;
    }

    function back() {
        history.back();
    }
</script>

<Dialog />
{#if screen == SCREENS.MainMenu}
    <MainMenu
        on:play={(e) => {
            history.pushState(setState({ screen: SCREENS.GameView, game: e.detail }), "");
        }}
        on:rules={() => {
            history.pushState(setState({ screen: SCREENS.GameRules }), "");

        }}
        on:settings={() => {
            history.pushState(setState({ screen: SCREENS.SettingsView }), "");
        }}
    />
{:else if screen == SCREENS.GameView}
    <GameView on:back={back} key={selected_game_key} />
{:else if screen == SCREENS.GameRules}
    <GameRules on:back={back} />
{:else if screen == SCREENS.SettingsView}
    <SettingsView on:back={back} />
{/if}
