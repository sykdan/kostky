<script>
    import { onMount } from "svelte";
    import PlayingCard from "./components/Card/Sheet.svelte";

    // Empty game card, each index representing
    // one column. Order: Down, Both, Up, Announced
    const EMPTY_CARD = Array(12).fill([null, null, null, null]);

    let should_save = false;
    let card = null;

    onMount(() => {
        card =
            JSON.parse(localStorage.getItem("card")) ||
            JSON.parse(JSON.stringify(EMPTY_CARD));
        if (card.length == 4) {
            card = JSON.parse(JSON.stringify(EMPTY_CARD));
        }
        should_save = true;
    });

    $: if (should_save) {
        localStorage.setItem("card", JSON.stringify(card));
    }

    function reset() {
        card = JSON.parse(JSON.stringify(EMPTY_CARD));
    }
</script>

<div>
    {#if card}
        <PlayingCard bind:card on:reset={reset} />
    {/if}
</div>

<style>
    div {
        display: flex;
        flex: 1;
        flex-direction: column;
    }
</style>
