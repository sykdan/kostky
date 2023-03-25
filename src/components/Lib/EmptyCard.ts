const NEW_GAME_CARD = Array(12).fill([null, null, null, null]);
function new_card() {
    return JSON.parse(JSON.stringify(NEW_GAME_CARD));
}
export default new_card;