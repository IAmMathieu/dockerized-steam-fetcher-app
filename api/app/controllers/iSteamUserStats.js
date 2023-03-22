const iSteamUserStats = {
  async getGlobalAchievementPercentagesForApp(req, res) {
    const gameId = req.body.game_id;
    const globalAchPerFetch = await fetch(
      `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${gameId}&format=json`,
      { method: "GET" }
    );

    const globalAchPerData = await globalAchPerFetch.json();

    if (globalAchPerData === undefined || Object.keys(globalAchPerData).length == 0) {
      res.status(404).send({"error":"No Data Found"});
    } else {
      res.status(200).send(globalAchPerData);
    }
  },

  async getPlayerAchievements(req, res) {
    const steamId = req.body.user_steam_id;
    const appId = req.body.app_id;

    const playerAchievementsFetch = await fetch(
      `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${process.env.STEAM_API_KEY}&steamid=${steamId}`,
      { method: "GET" }
    );

    const playerAchievementsData = await playerAchievementsFetch.json();

    if (
      playerAchievementsData === undefined ||
      Object.keys(playerAchievementsData).length == 0
    ) {
      res.status(404).send({"error":"No Data Found"});
    } else {
      res.status(200).send(playerAchievementsData);
    }
  },

  async getUserStatsForGame(req, res) {
    const steamId = req.body.user_steam_id;
    const appId = req.body.app_id;

    const getUserStatsForGameFetch = await fetch(
      `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=${process.env.STEAM_API_KEY}&steamid=${steamId}`,
      { method: "GET" }
    );

    const getUserStatsForGameData = await getUserStatsForGameFetch.json();

    if (
      getUserStatsForGameData === undefined ||
      Object.keys(getUserStatsForGameData).length == 0
    ) {
      res.status(404).send({"error":"No Data Found"});
    } else {
      res.status(200).send(getUserStatsForGameData);
    }
  },
};

module.exports = iSteamUserStats;
