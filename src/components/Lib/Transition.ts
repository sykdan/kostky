import { elasticOut, sineOut } from 'svelte/easing';

function spin(node, { duration }) {
    return {
        duration,
        css: (t) => {
            const eased = sineOut(t);

            return `opacity: ${eased};`;
        }
    };
}

export {spin};