const VERSION = 1;

type GameCard = number[][];
type GameData = {
    version: number,
    name: string,
    last_played: number,
}

const NEW_GAME_CARD: GameCard = Array(12).fill([null, null, null, null]);

function getBlankGameCard(): GameCard {
    return JSON.parse(JSON.stringify(NEW_GAME_CARD));
}

function getNewGameData(): GameData {
    return {
        version: VERSION,
        name: "",
        last_played: -1,
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

export { getNewGameData, getBlankGameCard, upgradeSaveData, VERSION, type GameData };