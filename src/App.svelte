<script>
    import { onMount } from "svelte";
    import PlayingCard from "./components/Sheet.svelte";

    // Empty game card, each index representing
    // one column. Order: Down, Both, Up, Announced
    const EMPTY_CARD = [
        Array(12).fill(null),
        Array(12).fill(null),
        Array(12).fill(null),
        Array(12).fill(null),
    ];

    let should_save = false;
    let card = null;

    onMount(() => {
        card =
            JSON.parse(localStorage.getItem("card")) ||
            JSON.parse(JSON.stringify(EMPTY_CARD));
        should_save = true;
    });

    $: if (should_save) {
        localStorage.setItem("card", JSON.stringify(card));
    }

    function reset() {
        card = JSON.parse(JSON.stringify(EMPTY_CARD));
    }
</script>

{#if card}
    <PlayingCard bind:card on:reset={reset} />
{/if}
