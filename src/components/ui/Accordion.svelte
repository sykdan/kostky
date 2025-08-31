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

<div class="flex flex-col mb-2 text-xl bg-neutral-200 dark:bg-neutral-700 rounded-2xl">
    <button
        onclick={() => (expanded = !expanded)}
        class="btn w-full rounded-2xl justify-start"
    >
        {#if icon}
            <div class="mx-5 my-2">
                <SvgIcon type="mdi" path={icon} size="28" />
            </div>
        {/if}
        {label}
    </button>
    {#if expanded}
        <div transition:slide>
            {@render children()}
        </div>
    {/if}
</div>