<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { slide } from "svelte/transition";

    import { mdiPlay as Play, mdiDelete as Delete } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import { dialogTrigger } from "../Lib/DialogTrigger.svelte";
    import type { GameData } from "../Lib/SaveData.svelte";

    interface Props {
        metadata: GameData;
        onSaveSelected: () => any;
        onSaveDelete: () => any;
    }

    let { metadata, onSaveSelected, onSaveDelete }: Props = $props();
</script>

<div class="saved-game" transition:slide|local>
    <div class="info">
        <span class="name">
            {metadata.name}
        </span>
        <span class="lastplayed">
            {metadata.last_played !== null
                ? new Date(metadata.last_played).toLocaleString()
                : $_("main.no_played")}
        </span>
    </div>
    <button class="play" onclick={onSaveSelected}>
        <SvgIcon type="mdi" path={Play} size="32" color="#141414" />
        {$_("main.play")}
    </button>
    <button
        onclick={async () =>
            (await dialogTrigger.prompt(
                $_("main.delete"),
                $_("main.delete_confirm") + "\n" + $_("common.noundo"),
                $_("common.yes"),
                $_("common.no"),
            )) && onSaveDelete()}
        class="danger"
    >
        <SvgIcon type="mdi" path={Delete} size="32" color="#141414" />
    </button>
</div>

<style>
    .saved-game {
        display: flex;
        padding: 16px;
        background-color: var(--back-extra);
        color: var(--front);
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
        display: flex;
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
        color: rgb(20, 20, 20);
    }

    button.play {
        aspect-ratio: 2/1;
        width: 96px;
        border-radius: 24px;
        font-size: 22px;
        padding-left: 0;
    }

    button:hover:not(:active) {
        transform: scale(1.1);
    }

    button:active {
        transform: scale(0.9);
    }

    .name {
        font-size: large;
        font-weight: bold;
        color: var(--front);
    }

    .lastplayed {
        font-style: italic;
        font-size: medium;
        color: var(--front);
    }

    .danger {
        background-color: var(--red);
    }
</style>
