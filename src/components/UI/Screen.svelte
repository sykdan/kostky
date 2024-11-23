<script lang="ts">
    import tr from "../../lib/ScreenTransition";
    import { fade, fly, type FlyParams } from "svelte/transition";

    import type { Snippet } from "svelte";

    interface Props {
        topBar?: Snippet;
        screenContent: Snippet;
    }

    let { topBar, screenContent }: Props = $props();
</script>

<div class="screen" in:tr>
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
