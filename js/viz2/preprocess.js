/**
 * Get allowed goals for each team
 *
 * 
 * @param {object[]} data The teams dataset
 * @returns {object[]} The allowed goals per team dataset
 */
export function sortByGoalsScored (data) {
  return data.sort((teamA, teamB) => {
    if (teamA.Buts_marques < teamB.Buts_marques) return -1;
    if (teamA.Buts_marques > teamB.Buts_marques) return 1;
    return (teamB.Pays.toString()).localeCompare(teamA.Pays.toString());
  })
}

export function sortByGoalsConceded (data) {
  return data.sort((teamA, teamB) => {
    if (teamA.Buts_alloues < teamB.Buts_alloues) return -1;
    if (teamA.Buts_alloues > teamB.Buts_alloues) return 1;
    return (teamB.Pays.toString()).localeCompare(teamA.Pays.toString());
  })
}