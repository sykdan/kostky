import { expoOut } from "svelte/easing";
import { fly } from "svelte/transition";

function detectTouchSafari() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

let shouldTransition = !detectTouchSafari()
let shouldAllowNext = false;

let didIn = false;
let didOut = false;

function allowNext() {
    shouldAllowNext = true;
    didIn = false;
    didOut = false;
}

function tr(node: Element, options: { invert: boolean }, params: { direction?: "in" | "out"; } | undefined) {
    if (!shouldTransition) {
        if (shouldAllowNext) {
            if (params?.direction == "in") {
                didIn = true;
            }
            if (params?.direction == "out") {
                didOut = true;
            }
            if (shouldAllowNext && didIn && didOut) {
                shouldAllowNext = false;
            }
        } else {
            return {}
        }
    }
    return fly(node, { duration: 400, x: (options.invert ? 100 : -100).toString() + "vw", easing: expoOut });
}

export default tr;
export { allowNext };