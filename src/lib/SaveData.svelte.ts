import settings from "./Settings.svelte";

const VERSION = 1;
const GAME_CARD_SIZE = 12 * 4

type GameCard = Array<Array<number | null>>;
type GameData = {
    version: number,
    name: string,
    last_played: number | null,
    first_placed: number | null
}

const NEW_GAME_CARD: GameCard = Array(12).fill([null, null, null, null]);

function getBlankGameCard(): GameCard {
    return JSON.parse(JSON.stringify(NEW_GAME_CARD));
}

function getNewGameData(): GameData {
    return {
        version: VERSION,
        name: "",
        last_played: null,
        first_placed: null,
    }
}

function upgradeSaveData(id: string, data: GameData): GameData {
    let sample = getNewGameData()
    for (let key in sample) {
        if (!(key in data)) {
            // @ts-ignore
            data[key] = sample[key]
        }
    }

    // Migration 1: Changed file format to always store numbers in full (bonus included) form.
    // If auto bonus is disabled, add the bonus to the user's saved games to account for this change.
    if (data.version == 1) {
        console.log("MIGRATING: 1 -> 2")
        if (settings.autoBonus) {
            let card = JSON.parse(localStorage.getItem(id)!);

            [0, 1, 2, 3].forEach((i) => {
                if (card[9][i]) {
                    card[9][i] += 30;
                }
                if (card[10][i]) {
                    card[10][i] += 40;
                }
                if (card[11][i]) {
                    card[11][i] += 50;
                }
            });

            localStorage.setItem(id, JSON.stringify(card));
        }
        data.version = 2;
    }

    return data;
}


export { getNewGameData, getBlankGameCard, upgradeSaveData, VERSION, GAME_CARD_SIZE, type GameData, type GameCard };