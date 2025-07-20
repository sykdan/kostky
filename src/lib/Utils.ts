export function offclick(callback: (event: Event) => any) {
    return (el: Element) => {
        const cb = (event: Event) => {
            if (!el.contains((event.target as Element)) && !(event.target as Element).closest(".dialog")) {
                callback(event);
            }
        }
        setTimeout(() => {
            window.addEventListener("click", cb);
        }, 1);
        return () => {
            window.removeEventListener("click", cb);
        }
    }
}