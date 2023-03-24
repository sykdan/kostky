<script>
    import { createEventDispatcher } from "svelte";
    import Play from "svelte-material-icons/Play.svelte";
    import Delete from "svelte-material-icons/Delete.svelte";

    export let metadata;

    const emit = createEventDispatcher();
</script>

<div class="saved-game">
    <div class="info">
        <span>
            {metadata.name}
        </span>
        <span>
            {new Date(metadata.last_played).toLocaleString()}
        </span>
    </div>
    <button on:click={() => emit("play")}>
        <Play size="32" color="white" />
    </button>
    <button on:click={() => confirm("Smazat tuto hru?") && emit("delete")}>
        <Delete size="32" color="white" />
    </button>
</div>

<style>
    .saved-game {
        display: flex;
        padding: 16px;
        background-color: silver;
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
        background-color: gray;
        border-radius: 50%;
        transition: 0.2s;
        margin-left: 8px;
    }

    button:hover:not(:active) {
        transform: scale(1.05);
    }

    button:active {
        transform: scale(0.9);
    }
</style>
