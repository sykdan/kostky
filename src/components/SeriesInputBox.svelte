<script>
    import Cross from "svelte-material-icons/Close.svelte";

    export let value;

    const table = {
        "0": 76,
        "1": 66,
        "2": 56,
        "3": 46
    }
</script>

<td>
    <select name="series" bind:value={value}>
        <option selected value />
        <option value="0">76</option>
        <option value="1">66</option>
        <option value="2">56</option>
        <option value="3">46</option>
        <option value="X">❌</option>
    </select>
    <span class="overlay cross" class:crossed={value == "X"}
        ><Cross color="rgb(172, 0, 0)" size={48} /></span
    >
    {#if value && value != "X"}
        <span class="overlay number" style="display: grid;">{table[value]}</span>
    {/if}
</td>

<style>
    td {
        position: relative;
    }

    select {
        width: calc(var(--sizing) - 1px);
        height: calc(var(--sizing) - 1px);
        border: solid 2px #208aae;
        border-radius: 16px;
        background-color: white;
        color: transparent;

        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: "";
    }

    select option {
        font-size: 20px;
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

    span.cross.crossed {
        display: grid;
    }

    span.number {
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        margin: 4px 0 0 4px;
        font-size: 36px;
        background-color: white;
    }
</style>
