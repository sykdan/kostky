<script lang="ts">
    import SvgIcon from "@jamescoyle/svelte-icon";
    import type { Snippet } from "svelte";
    import { slide } from "svelte/transition";
    import Button from "./Button.svelte";

    interface Props {
        label: string;
        icon?: string;
        children: Snippet;
    }

    let expanded = $state(false);

    let { label, icon = undefined, children }: Props = $props();
</script>

<div
    class="flex flex-col mb-2 text-xl bg-neutral-200 dark:bg-neutral-700 rounded-2xl"
>
    <Button align="start" onclick={() => (expanded = !expanded)}>
        {#if icon}
            <div class="mx-3">
                <SvgIcon type="mdi" path={icon} size="28" />
            </div>
        {/if}
        {label}
    </Button>
    {#if expanded}
        <div transition:slide>
            {@render children()}
        </div>
    {/if}
</div>
