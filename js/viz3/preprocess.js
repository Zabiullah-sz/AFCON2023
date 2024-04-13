// preprocess.js

/**
 * Sanitizes the names from the data in the "Player" column.
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function summarizeData(data) {
    return data.map(item => {
        let foulsPer90;
        if (item.Minutes < 90) {
            foulsPer90 = item.Fouls.toString();
        } else {
            foulsPer90 = (item.Fouls / (item.Minutes / 90)).toPrecision(2);
        }
        return {
            player: item.Player,
            country: item.Country,
            foulsPer90: foulsPer90,
            yellowCard: item.YellowCards,
            redCard: item.RedCards
        };
    });
}

/**
 * Sorts all data by fouls per 90 minutes in descending order.
 *
 * @param {object[]} data The dataset to be sorted
 * @returns {object[]} The sorted dataset
 */
export function sortData(data) {
    return data.sort((playerA, playerB) => parseFloat(playerB.foulsPer90) - parseFloat(playerA.foulsPer90));
}

/**
 * Gets the top players based on fouls per 90 minutes.
 *
 * @param {object[]} data The sorted dataset
 * @param {number} count The number of top players to return
 * @returns {object[]} An array containing only the top players
 */
export function getTop(data, count = 10) {
    return data.slice(0, count);
}
