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

<div class="screen" transition:tr={{invert: !base}}>
    {@render topBar?.()}
    <div class="content">
        {@render screenContent?.()}
    </div>
</div>

<style>
    .screen {
        width: 100vw;
        height: 100dvh;
        position: fixed;
        top: 0;
        left: 0;
        background: var(--back);
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .content {
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
</style>
