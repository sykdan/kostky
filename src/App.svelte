<script lang="ts">
    import MainMenu from "./components/MainMenu.svelte";
    import GameView from "./components/GameView.svelte";
    import GameRules from "./components/GameRules.svelte";
    import SettingsView from "./components/SettingsView.svelte";
    import Dialog from "./components/UI/Dialog.svelte";
    import { onMount } from "svelte";
    import { allowNext } from "./components/Lib/ScreenTransition";

    enum Screen {
        MainMenu,
        GameView,
        GameRules,
        SettingsView,
    }

    interface ScreenData {
        screen?: Screen;
        game?: string;
    }

    onMount(() => {
        const handlePopState = (event: PopStateEvent) => {
            setState(event.state);
        };

        window.addEventListener("popstate", handlePopState);

        () => {
            window.removeEventListener("popstate", handlePopState);
        };
    });

    let screen: Screen = $state(Screen.MainMenu);
    let selectedGameId: string | null = $state(null);

    function setState(state: ScreenData | null) {
        if (state?.game) {
            selectedGameId = state.game;
        }
        if (state?.screen) {
            screen = state.screen;
        } else {
            screen = Screen.MainMenu;
        }
        return state;
    }

    function back() {
        allowNext();
        history.back();
    }
</script>

<Dialog />
{#if screen == Screen.MainMenu}
    <MainMenu
        on:play={(e) => {
            allowNext();
            history.pushState(
                setState({ screen: Screen.GameView, game: e.detail }),
                "",
            );
        }}
        on:rules={() => {
            allowNext();
            history.pushState(setState({ screen: Screen.GameRules }), "");
        }}
        on:settings={() => {
            allowNext();
            history.pushState(setState({ screen: Screen.SettingsView }), "");
        }}
    />
{:else if screen == Screen.GameView && selectedGameId}
    <GameView on:back={back} id={selectedGameId} />
{:else if screen == Screen.GameRules}
    <GameRules on:back={back} />
{:else if screen == Screen.SettingsView}
    <SettingsView on:back={back} />
{/if}
