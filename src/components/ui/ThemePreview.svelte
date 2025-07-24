<script lang="ts">
    interface Props {
        theme: "light" | "dark" | "system";
    }

    let { theme }: Props = $props();
</script>

<div class="theme">
    <svg
        data-theme={theme === "light" ? "light" : "dark"}
        class="left"
        width="70"
        height="100"
        version="1.1"
        viewBox="0 0 18.521 26.458"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m2.1167 0h14.288c1.1726 0 2.1167.94403 2.1167 2.1167v22.225c0 1.1726-.94403 2.1167-2.1167 2.1167h-14.288c-1.1726 0-2.1167-.94403-2.1167-2.1167v-22.225c0-1.1726.94403-2.1167 2.1167-2.1167z"
            fill="var(--back)"
        />
        <path
            d="m2.5099 17.645h10.633v1.8651h-10.633zm0-3.027h8.7258v1.8651h-8.7258zm2.446-12.108h.1432c1.3551 0 2.446 1.0909 2.446 2.446s-1.0909 2.446-2.446 2.446h-.1432c-1.3551 0-2.446-1.0909-2.446-2.446s1.0909-2.446 2.446-2.446zm-2.446 9.0811h12.015v1.8651h-12.015zm0-3.027h13.501v1.8651h-13.501zm6.1973-3.027h7.3037v1.8651h-7.3037zm0-3.027h7.3037v1.8651h-7.3037z"
            fill="var(--front)"
        />
    </svg>
    <svg
        data-theme={theme === "dark" ? "dark" : "light"}
        class="right"
        width="70"
        height="100"
        version="1.1"
        viewBox="0 0 18.521 26.458"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m9.2604 3.1789e-7v26.458h7.1437c1.1726 0 2.1167-.94404 2.1167-2.1167v-22.225c0-1.1726-.94403-2.1167-2.1167-2.1167z"
            fill="var(--back)"
        />
        <path
            d="m9.2604 2.5099v1.865h6.7505v-1.865zm0 3.0272v1.865h6.7505v-1.865zm0 3.0267v1.865h6.7505v-1.865zm0 3.0272v1.865h5.2643v-1.865zm0 3.0272v1.865h1.9756v-1.865zm0 3.0267v1.865h3.8825v-1.865z"
            fill="var(--front)"
        />
    </svg>
</div>

<style>
    .theme {
        position: relative;
        width: 70px;
        height: 100px;
    }

    .theme .right {
        position: absolute;
        right: 0;
    }
</style>
