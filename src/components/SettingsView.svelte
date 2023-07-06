<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";

    import Back from "svelte-material-icons/ArrowLeft.svelte";

    import TopBar from "./UI/TopBar.svelte";

    const emit = createEventDispatcher();

    let st__theme = localStorage.getItem("st__theme") ?? "light";
    let st__autobonus = localStorage.getItem("st__autobonus") ?? "yes";
    $: {
        localStorage.setItem("st__theme", st__theme);
        document.querySelector("html").setAttribute("theme", st__theme);
    }
    $: {
        localStorage.setItem("st__autobonus", st__autobonus);
    }

    function updateAutoBonus() {
        let b = st__autobonus == "yes" ? -1 : 1;
        let games = JSON.parse(localStorage.getItem("games"));
        Object.keys(games).forEach((game) => {
            let card = JSON.parse(localStorage.getItem(game));

            [0, 1, 2, 3].forEach((i) => {
                if (card[9][i]) {
                    card[9][i] += 30 * b;
                }
                if (card[10][i]) {
                    card[10][i] += 40 * b;
                }
                if (card[11][i]) {
                    card[11][i] += 50 * b;
                }
            });

            console.log(card)
            localStorage.setItem(game, JSON.stringify(card))
        });
    }
</script>

<div class="appscreen" transition:fly>
    <TopBar
        title="Možnosti"
        hideRight={true}
        on:leftbutton={() => emit("back")}
    >
        <Back slot="leftbutton" color="white" size="28" />
    </TopBar>

    <div class="settings">
        <div class="row">
            <label for="theme">Motiv</label>
            <select name="theme" bind:value={st__theme}>
                <option value="light">Světlý</option>
                <option value="dark">Tmavý</option>
                <option value="system">Podle systému</option>
            </select>
        </div>
        <div class="row">
            <label for="autobonus">Připočítat bonusy</label>
            <select
                name="autobonus"
                bind:value={st__autobonus}
                on:change={updateAutoBonus}
            >
                <option value="yes">Ano</option>
                <option value="no">Ne</option>
            </select>
        </div>
    </div>
</div>

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

    label {
        flex: 1;
    }

    select {
        border: none;
        border-radius: 16px;
        padding: 4px 8px;
        background-color: var(--silver);
    }

    select,
    label {
        font-size: 24px;
        color: var(--black);
    }
</style>
