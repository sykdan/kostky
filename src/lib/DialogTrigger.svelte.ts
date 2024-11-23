class DialogTrigger {
    title: string = $state("");
    message: string = $state("");
    ok: string = $state("");
    cancel: string | null = $state("");
    visible: Boolean = $state(false);
    resolve: (value: any) => void = () => { };

    prompt(title: string, message: string, ok: string, cancel: string | null = null) {
        return new Promise((r) => {
            this.title = title
            this.message = message
            this.ok = ok
            this.cancel = cancel

            this.visible = true
            this.resolve = r
        });
    }
}

export const dialogTrigger = new DialogTrigger();
