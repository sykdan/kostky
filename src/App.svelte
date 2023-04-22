<script lang="ts">
    import MainMenu from "./components/MainMenu.svelte";
    import GameView from "./components/GameView.svelte";
    import GameRules from "./components/GameRules.svelte";

    enum SCREENS {
        MainMenu,
        GameView,
        GameRules,
    }

    let screen: SCREENS = SCREENS.MainMenu;

    let selected_game_key = null;
</script>

{#if screen == SCREENS.MainMenu}
    <MainMenu
        on:play={(e) => {
            selected_game_key = e.detail;
            screen = SCREENS.GameView;
        }}
        on:rules={() => {
            screen = SCREENS.GameRules;
        }}
    />
{:else if screen == SCREENS.GameView}
    <GameView
        on:back={() => {
            selected_game_key = null;
            screen = SCREENS.MainMenu;
        }}
        key={selected_game_key}
    />
{:else if screen == SCREENS.GameRules}
    <GameRules
        on:back={() => {
            screen = SCREENS.MainMenu;
        }}
    />
{/if}
