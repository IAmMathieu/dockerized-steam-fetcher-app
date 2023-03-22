const iPlayerService = {
  async getRecentlyPlayedGames(req, res) {
    const userSteamId = req.body.user_steam_id;
    const gamesCount = req.body.games_count || 10;

    const playedGamesFetch = await fetch(
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${userSteamId}&count=${gamesCount}&format=json`
    );

    const playedGamesData = await playedGamesFetch.json();

    if (
      playedGamesData.response === undefined ||
      Object.keys(playedGamesData.response).length == 0
    ) {
      res.status(404).send({"error":"No Data Found"});
    } else {
      res.status(200).send(playedGamesData.response);
    }
  },

  async getOwnedGames(req, res) {
    const userSteamId = req.body.user_steam_id;
    const includeAppInfo = req.body.include_app_info || true;
    const includePlayedFreeGames = req.body.include_played_free_games || true;

    const getOwnedGamesFetch = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${userSteamId}&include_appinfo=${includeAppInfo}&include_played_free_games=${includePlayedFreeGames}&format=json`);

    const getOwnedGamesData = await getOwnedGamesFetch.json();

    if (
      getOwnedGamesData.response === undefined ||
      Object.keys(getOwnedGamesData.response).length == 0
    ) {
      res.status(404).send({"error":"No Data Found"});
    } else {
      res.status(200).send(getOwnedGamesData.response);
    }

  },
};

module.exports = iPlayerService;
