<script lang="ts">
    import InputBox from "./InputBox.svelte";

    export let type:
        | "singles"
        | "free"
        | "fullhouse"
        | "multiples"
        | "sequence";
    export let n: 1 | 2 | 3 | 4 | 5 | 6 = 1;
    export let row;
    export let add = 0;

    export let shouldAddBonus: Boolean
</script>

<!-- Icon -->
<div class="cell side has-icon gradient-downward">
    <slot />
</div>
<!-- Input boxes -->
<InputBox {n} {type} bind:value={row[0]} {add} {shouldAddBonus}/>
<InputBox {n} {type} bind:value={row[1]} {add} {shouldAddBonus}/>
<InputBox {n} {type} bind:value={row[2]} {add} {shouldAddBonus}/>
<InputBox {n} {type} bind:value={row[3]} {add} {shouldAddBonus}/>
