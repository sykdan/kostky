import { writable } from 'svelte/store';

function _dialogTrigger() {
    const { subscribe, update, set } = writable({
        title: "",
        message: "",
        ok: "",
        cancel: "",

        visible: false,
        resolver: (value) => {}
    });

    return {
        subscribe,
        prompt: (title, message, ok, cancel) => {
            return new Promise((r) => {
                update(k => {
                    k.title = title
                    k.message = message
                    k.ok = ok
                    k.cancel = cancel
    
                    k.visible = true
                    k.resolver = r

                    return k;
                })
            });
        },
        set
    };
}

export const dialogTrigger = _dialogTrigger();
