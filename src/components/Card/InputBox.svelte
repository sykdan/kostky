<script lang="ts">
    import Cross from "svelte-material-icons/Close.svelte";

    export let value;

    export let type:
        | "singles"
        | "free"
        | "fullhouse"
        | "multiples"
        | "sequence";
    export let n = 0;
    export let add = 0;

    let invalid = false;

    $: if (value != null) {
        value = Math.max(value, 0);

        switch (type) {
            case "singles":
                invalid = value % n != 0 || value > n * 5;
                break;
            case "free":
                invalid = value < 5 || value > 30;
                break;
            case "fullhouse":
                invalid = value < 7 || value > 28 || value == 10 || value == 25;
                break;
            case "multiples":
                invalid = value % n != 0 || value > n * 6;
                break;
            case "sequence":
                invalid =
                    (value != 0 && (value - 6) % 10 != 0) ||
                    value < 46 ||
                    value > 76;
                break;
        }

        if (value == 0) {
            invalid = false;
        }
    } else {
        invalid = false;
        value = null;
    }
</script>

<div class="cell">
    <input class:invalid type="number" pattern="[0-9]*" bind:value />
    <span class="overlay cross" class:crossed={value == 0}
        ><Cross color="rgb(172, 0, 0)" size={48} /></span
    >
    {#if add > 0 && value}
        <span class="overlay number" class:invalid>{value + add}</span>
    {/if}
</div>

<style>
    div {
        position: relative;
    }

    input {
        padding: 0;
        border: none;
        text-align: center;
        font-size: 36px;
        width: 100%;
        height: 100%;
        border-radius: 16px;
    }

    input.invalid,
    span.number.invalid {
        background-color: pink;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
        appearance: textfield;
    }

    span.overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: 16px;
        align-items: center;
        justify-content: center;
        display: none;
    }

    span.cross {
        background-color: rgb(255, 61, 61);
    }

    span.cross :global(svg) {
        padding: 0;
        width: var(--cell-size);
    }

    span.number {
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        margin: 4px 0 0 4px;
        font-size: 36px;
        background-color: white;
    }

    input:not(:focus) + span.cross.crossed {
        display: grid;
    }

    input:not(:focus) + * + span.overlay {
        display: grid;
    }
</style>
