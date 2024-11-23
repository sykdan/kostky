<script lang="ts">
    import tr from "../../lib/ScreenTransition";

    import type { Snippet } from "svelte";

    interface Props {
        base?: boolean,
        topBar?: Snippet;
        screenContent: Snippet;
    }

    let { base = false, topBar, screenContent }: Props = $props();
</script>

<div class="screen" in:tr={{invert: !base}} out:tr={{invert: !base}}>
    {@render topBar?.()}
    {@render screenContent?.()}
</div>

<style>
    .screen {
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
        background: var(--back);
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-x: clip;
    }
</style>
