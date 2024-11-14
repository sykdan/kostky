import { writable, type Writable } from 'svelte/store';

function _dialogTrigger() {
    interface DialogStore {
        title: string,
        message: string,
        ok: string,
        cancel: string | null,

        visible: Boolean,
        resolver: (value: Boolean) => void,
    }

    const { subscribe, update, set }: Writable<DialogStore> = writable({
        title: "",
        message: "",
        ok: "",
        cancel: "",

        visible: false,
        resolver: (value: Boolean) => { }
    });

    return {
        subscribe,
        prompt: (title: string, message: string, ok: string, cancel: string | null = null) => {
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
