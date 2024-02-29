const VERSION = 1;
const GAME_CARD_SIZE = 12 * 4

type GameCard = number[][];
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

function upgradeSaveData(data: GameData): GameData {
    let sample = getNewGameData()
    for (let s of Object.keys(sample)) {
        if (!(s in data)) {
            data[s] = sample[s]
        }
    }
    return data;
}

    export { getNewGameData, getBlankGameCard, upgradeSaveData, VERSION, GAME_CARD_SIZE, type GameData, type GameCard };