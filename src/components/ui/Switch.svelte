<script lang="ts">
    interface Props {
        on: boolean;
    }
    let { on = $bindable(false) }: Props = $props();
</script>

<button class:checked={on} onclick={() => (on = !on)}></button>

<style lang="scss">
    @use "sass:math";
    $width: 60px;
    $height: 30px;

    button {
        background-color: var(--dark);
        border: none;
        width: $width;
        min-width: $width;
        height: $height;
        min-height: $height;
        position: relative;
        padding: 0;
        cursor: pointer;
        border-radius: $height;
        box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px;
        transition: background-color 0.3s;

        &::after {
            content: " ";
            background-color: var(--light);
            display: block;
            height: $height;
            width: $height;
            border-radius: $height;
            position: absolute;
            top: 0;
            transform: scale(1.05) translate(0, 0);
            transition: transform 0.3s;
        }

        &.checked {
            background-color: var(--gold);
            &::after {
                opacity: 1;
                transform: scale(1.05) translate($width - $height, 0);
                box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px;
            }
        }
    }
</style>
