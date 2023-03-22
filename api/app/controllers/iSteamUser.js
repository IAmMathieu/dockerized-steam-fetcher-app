const iSteamUser = {
  async getPlayerSummaries(req, res) {
    const userSteamId = req.body.user_steam_id; // must be a string to avoid javascript number precision issue
    // const userSteamId = "76561198042858555";
    const userDataFetch = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${userSteamId}`,
      { method: "GET" }
    );

    const userData = await userDataFetch.json();

    // console.log(userData.response.players[0]);

    if (
      userData.response.players === undefined ||
      userData.response.players.length == 0
    ) {
      res.status(404).send({"error":"No Data Found"});
    } else {
      res.status(200).send(userData.response.players[0]);
    }
  },

  async getFriendList(req, res) {
    const userSteamId = req.body.user_steam_id;
    const relationship = req.body.relationship;
    const userFriendListFetch = await fetch(
      `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${userSteamId}&relationship=${relationship}`,
      { method: "GET" }
    );

    const userFriendListData = await userFriendListFetch.json();

    if (
      userFriendListData.friendslist === undefined ||
      userFriendListData.friendslist.length == 0
    ) {
      res.status(404).send({"error":"No Data Found"});
    } else {
      res.status(200).send(userFriendListData.friendslist);
    }
  },
};

module.exports = iSteamUser;
