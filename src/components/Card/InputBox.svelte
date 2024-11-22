<script lang="ts">
    import { mdiClose as Cross } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    interface Props {
        value: any;
        type: "singles" | "free" | "fullhouse" | "multiples" | "sequence";
        n?: number;
        add?: number;
        shouldAddBonus: Boolean;
    }

    let {
        value = $bindable(),
        type,
        n = 0,
        add = 0,
        shouldAddBonus,
    }: Props = $props();

    let inputValue: number | null = $state(
        value != null ? value - (shouldAddBonus ? add : 0) : null,
    );
    let invalid = $state(false);

    $effect(() => {
        if (inputValue == null) {
            invalid = false;
            value = null;
            return;
        }

        inputValue = Math.max(inputValue, 0);
        let vl = inputValue;

        if (!shouldAddBonus) {
            vl -= add;
        }

        switch (type) {
            case "singles":
                invalid = vl % n != 0 || vl > n * 5;
                break;
            case "free":
                invalid = vl < 5 || vl > 30;
                break;
            case "fullhouse":
                invalid = vl < 7 || vl > 28 || vl == 10 || vl == 25;
                break;
            case "multiples":
                invalid = vl % n != 0 || vl > n * 6;
                break;
            case "sequence":
                invalid = (vl != 0 && (vl - 6) % 10 != 0) || vl < 46 || vl > 76;
                break;
        }

        if (vl == 0) {
            invalid = false;
        }

        if (vl < 0) {
            invalid = true;
        }

        if (inputValue) {
            value = inputValue + (shouldAddBonus ? add : 0);
        } else {
            value = 0;
        }
    });
</script>

<div class="cell">
    <input
        class:invalid
        class="number"
        type="number"
        pattern="[0-9]*"
        bind:value={inputValue}
    />

    {#if add > 0 && value}
        <span class="overlay number" class:invalid>
            {value}
        </span>
    {:else if value == 0}
        <span class="overlay cross">
            <SvgIcon type="mdi" path={Cross} color="rgb(172, 0, 0)" size={48} />
        </span>
    {/if}
</div>

<style lang="scss">
    .cell {
        position: relative;
    }

    input {
        padding: 0;
        border: none;
        width: 100%;
        height: 100%;
        border-radius: 16px;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &[type="number"] {
            -moz-appearance: textfield;
            appearance: textfield;
        }

        &:not(:focus) + .overlay {
            display: grid;
        }
    }

    .overlay {
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

    .cross {
        background-color: rgb(255, 61, 61);

        :global(svg) {
            padding: 0;
            width: var(--cell-size);
        }
    }

    .number {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 36px;
        background-color: var(--back-extra);
        color: var(--front);

        &.invalid {
            background-color: var(--back-error);
        }
    }
</style>
