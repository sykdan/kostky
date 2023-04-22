<script lang="ts">
    import GameView from "./components/GameView.svelte";
    import MainMenu from "./components/MainMenu.svelte";

    enum SCREENS {
        MainMenu,
        GameView,
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
    />
{:else if screen == SCREENS.GameView}
    <GameView
        on:back={() => {
            selected_game_key = null;
            screen = SCREENS.MainMenu;
        }}
        key={selected_game_key}
    />
{/if}
