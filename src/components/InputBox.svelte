<script>
    import Cross from "svelte-material-icons/Close.svelte";

    export let value;

    export let type;
    export let row = 0;
    export let added = 0;

    let invalid = false;

    $: if (value != null) {
        value = Math.max(value, 0);

        switch (type) {
            case "singles":
                invalid = value % row != 0 || value > row * 5;
                break;
            case "free":
                invalid = value < 5 || value > 30;
                break;
            case "fullhouse":
                invalid = value < 7 || value > 28 || value == 10 || value == 25;
                break;
            case "multiples":
                invalid = value % row != 0 || value > row * 6;
        }

        if (value == 0) {
            invalid = false;
        }
    } else {
        invalid = false;
        value = null;
    }

    function check(e) {
        if (!e.key.match(/^[0-9]+$/)) {
            e.preventDefault();
        }
    }
</script>

<td>
    <input
        class:invalid
        type="number"
        pattern="[0-9]*"
        bind:value
        on:keypress={check}
    />
    <span class="overlay cross" class:crossed={value == 0}
        ><Cross color="rgb(172, 0, 0)" size={48} /></span
    >
    {#if added > 0 && value}
        <span class="overlay number" class:invalid>{value + added}</span>
    {/if}
</td>

<style>
    td {
        position: relative;
    }

    input {
        width: calc(var(--sizing) - 4px);
        height: calc(var(--sizing) - 4px);
        padding: 0;
        border: solid 2px #208aae;
        border-radius: 16px;
        text-align: center;
        font-size: 36px;
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
