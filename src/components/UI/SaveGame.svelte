<script>
    import { createEventDispatcher } from "svelte";
    import Play from "svelte-material-icons/Play.svelte";
    import Delete from "svelte-material-icons/Delete.svelte";

    export let metadata;

    const emit = createEventDispatcher();
</script>

<div class="saved-game">
    <div class="info">
        <span class="name">
            {metadata.name}
        </span>
        <span class="lastplayed">
            {new Date(metadata.last_played).toLocaleString()}
        </span>
    </div>
    <button on:click={() => emit("play")}>
        <Play size="32" color="#141414" />
    </button>
    <button
        on:click={() => confirm("Smazat tuto hru?") && emit("delete")}
        class="danger"
    >
        <Delete size="32" color="#141414" />
    </button>
</div>

<style>
    .saved-game {
        display: flex;
        padding: 16px;
        background-color: var(--silver);
        color: var(--black);
        margin-bottom: 8px;
        border-radius: 16px;
    }

    .saved-game .info {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    button {
        aspect-ratio: 1/1;
        display: grid;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: var(--gold);
        border-radius: 50%;
        transition: 0.2s;
        margin-left: 8px;
        width: 48px;
        height: 48px;
        cursor: pointer;
    }

    button:hover:not(:active) {
        transform: scale(1.05);
    }

    button:active {
        transform: scale(0.9);
    }

    .name {
        font-size: large;
        font-weight: bold;
        color: var(--black);
    }

    .lastplayed {
        font-style: italic;
        font-size: medium;
        color: var(--black);
    }

    .danger {
        background-color: var(--red);
    }
</style>
