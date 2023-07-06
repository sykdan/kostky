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
    export let shouldAddBonus: Boolean;

    let invalid = false;

    $: if (value != null) {
        value = Math.max(value, 0);
        let vl = value;
        if (!shouldAddBonus) {
            vl -= add;
        }

        switch (type) {
            case "singles":
                invalid = vl % n != 0 || vl > n * 5;
                break;
            case "free":
                invalid = vl < 5 || vl > 30;
                break;
            case "fullhouse":
                invalid = vl < 7 || vl > 28 || vl == 10 || vl == 25;
                break;
            case "multiples":
                invalid = vl % n != 0 || vl > n * 6;
                break;
            case "sequence":
                invalid = (vl != 0 && (vl - 6) % 10 != 0) || vl < 46 || vl > 76;
                break;
        }

        if (vl == 0) {
            invalid = false;
        }
        if (vl < 0) {
            invalid = true;
        }
    } else {
        invalid = false;
        value = null;
    }

    function b(value) {
        if (shouldAddBonus) {
            return value;
        }
        return 0;
    }
</script>

<div class="cell">
    <input class:invalid type="number" pattern="[0-9]*" bind:value />
    <span class="overlay cross" class:crossed={value == 0}>
        <Cross color="rgb(172, 0, 0)" size={48} />
    </span>
    {#if add > 0 && value}
        <span class="overlay number" class:invalid>
            {value + b(add)}
        </span>
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
        background-color: var(--silver);
        color: var(--black);
    }

    input.invalid,
    span.number.invalid {
        background-color: var(--invalid);
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
        width: 100%;
        height: 100%;
        font-size: 36px;
        background-color: var(--silver);
        color: var(--black);
    }

    input:not(:focus) + span.cross.crossed {
        display: grid;
    }

    input:not(:focus) + * + span.overlay {
        display: grid;
    }
</style>
