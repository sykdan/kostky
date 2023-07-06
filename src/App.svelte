<script lang="ts">
    import MainMenu from "./components/MainMenu.svelte";
    import GameView from "./components/GameView.svelte";
    import GameRules from "./components/GameRules.svelte";
    import SettingsView from "./components/SettingsView.svelte";
    import Dialog from "./components/UI/Dialog.svelte";

    enum SCREENS {
        MainMenu,
        GameView,
        GameRules,
        SettingsView,
    }

    let screen: SCREENS = SCREENS.MainMenu;
    let selected_game_key = null;

    function back() {
        selected_game_key = null;
        screen = SCREENS.MainMenu;
    }
</script>

<Dialog />
{#if screen == SCREENS.MainMenu}
    <MainMenu
        on:play={(e) => {
            selected_game_key = e.detail;
            screen = SCREENS.GameView;
        }}
        on:rules={() => {
            screen = SCREENS.GameRules;
        }}
        on:settings={() => {
            screen = SCREENS.SettingsView;
        }}
    />
{:else if screen == SCREENS.GameView}
    <GameView on:back={back} key={selected_game_key} />
{:else if screen == SCREENS.GameRules}
    <GameRules on:back={back} />
{:else if screen == SCREENS.SettingsView}
    <SettingsView on:back={back} />
{/if}
