<script lang="ts">
    interface Props {
        on: boolean;
    }
    let { on = $bindable(false) }: Props = $props();
</script>

<button class:checked={on} onclick={() => (on = !on)}> </button>

<style lang="scss">
    @use "sass:math";
    $width: 30px;
    $knobWidth: 20px;

    button {
        background-color: var(--back);
        border: none;
        width: 30px;
        height: math.div($width, 2);
        position: relative;
        padding: 0;
        cursor: pointer;
        border-radius: math.div($width, 2);

        &::after {
            content: " ";
            background-color: var(--front);
            display: block;
            height: $knobWidth;
            width: $knobWidth;
            border-radius: $knobWidth;
            position: absolute;
            top: 0;
            transform: translate(
                math.div($knobWidth, -2),
                math.div($width - $knobWidth, -4)
            );
            transition: 0.3s;
        }

        &.checked::after {
            transform: translate(
                math.div($knobWidth, -2) + $width,
                math.div($width - $knobWidth, -4)
            );
        }
    }
</style>
