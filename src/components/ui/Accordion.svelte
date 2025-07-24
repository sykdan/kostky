<script lang="ts">
    import SvgIcon from "@jamescoyle/svelte-icon";
    import type { Snippet } from "svelte";
    import { slide } from "svelte/transition";

    interface Props {
        label: string;
        icon?: string;
        children: Snippet;
    }

    let expanded = $state(false);

    let { label, icon = undefined, children }: Props = $props();
</script>

<div class="accordion card">
    <button onclick={() => (expanded = !expanded)}>
        {#if icon}
            <SvgIcon type="mdi" path={icon} color="var(--front)" size="28" />
        {/if}
        {label}
    </button>
    {#if expanded}
        <div transition:slide>
            {@render children()}
        </div>
    {/if}
</div>

<style>
    .accordion {
        display: flex;
        flex-direction: column;
        margin-bottom: 4px;
    }

    .accordion button,
    .accordion div {
        font-size: 24px;
        text-align: start;
        padding: 0.5em 1em;
        width: 100%;
        color: var(--front);
    }

    .accordion button {
        font-size: 24px;
        text-align: start;
        padding: 0.5em 1em;
        width: 100%;
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        gap: 0.8em;
        align-items: center;
    }

    .accordion div {
        padding-top: 0;
    }
</style>
