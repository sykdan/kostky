import { _, locale } from "svelte-i18n";

function stringToBoolean(value: string) {
    if (value == "yes") return true;
    else return false;
}

function booleanToString(value: boolean) {
    return value ? "yes" : "no";
}

function migrateAutoBonus(useAutoBonus: boolean) {
    let b = useAutoBonus ? -1 : 1;
    let games = JSON.parse(localStorage.getItem("games")!);
    Object.keys(games).forEach((game) => {
        let card = JSON.parse(localStorage.getItem(game)!);

        [0, 1, 2, 3].forEach((i) => {
            if (card[9][i]) {
                card[9][i] += 30 * b;
            }
            if (card[10][i]) {
                card[10][i] += 40 * b;
            }
            if (card[11][i]) {
                card[11][i] += 50 * b;
            }
        });

        localStorage.setItem(game, JSON.stringify(card));
    });
}

class YambSettings {
    theme = $state("light");
    color = $state("blue");
    locale = $state("cs");
    autoBonus = $state(true);
    extraThemes = $state(false);
    gradientValues: string[] = $state([]);

    constructor() {
        this.readFromLocalStorage();
        this.registerChangeHooks();
    }

    private readFromLocalStorage() {
        this.theme = localStorage.getItem("st__theme") ?? "light";
        this.color = localStorage.getItem("st__color") ?? "blue";
        this.locale = localStorage.getItem("st__locale") ?? "cs";
        this.autoBonus = stringToBoolean((localStorage.getItem("st__autobonus") ?? "yes"));
        this.extraThemes = stringToBoolean((localStorage.getItem("st__extrathemes") ?? "no"));
    }

    private registerChangeHooks() {
        let _autoBonusLastValue = this.autoBonus;

        $effect.root(() => {
            $effect(() => {
                localStorage.setItem("st__theme", this.theme);
                document.querySelector("html")!.setAttribute("theme", this.theme);
            });
            $effect(() => {
                localStorage.setItem("st__autobonus", booleanToString(this.autoBonus));
                if (_autoBonusLastValue != this.autoBonus) {
                    migrateAutoBonus(this.autoBonus);
                    _autoBonusLastValue = this.autoBonus;
                }
            });
            $effect(() => {
                localStorage.setItem("st__color", this.color);
                document.querySelector("html")!.setAttribute("color", this.color);
                let primaryColorHex = getComputedStyle(document.body).getPropertyValue('--primary') || "#000000"
                document.querySelector('meta[name="theme-color"]')!.setAttribute("content", primaryColorHex);
                this.gradientValues = getComputedStyle(document.body)
                    .getPropertyValue("--primary-detail")
                    ?.split("(")[1]
                    ?.split(")")[0]
                    ?.split(",")
                    ?.splice(1) ?? [
                        getComputedStyle(document.body).getPropertyValue("--primary"),
                    ];
            });
            $effect(() => {
                localStorage.setItem("st__locale", this.locale);
                locale.set(this.locale);
            });
        });
    }
}

const settings = new YambSettings();
export default settings;

