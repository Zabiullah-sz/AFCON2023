
/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function summarizeData(data) {
    // TODO: Clean the player name data

    
    return data.map(item => {
        let foulsPer90;
        if (item.Minutes < 90) {
            foulsPer90 = item.Fouls.toString();
        } else {
            foulsPer90 = (item.Fouls / (item.Minutes / 90)).toPrecision(4);
        }
        return { player: item.Player,
            country: item.Country,
            foulsPer90: foulsPer90,
            yellowCard: item.YellowCards,
            redCard: item.RedCards }
    })
}


export function getTop(data){
    return data
    .sort((playerA, playerB) => playerB.foulsPer90 - playerA.foulsPer90)
    .slice(0, 20);
}