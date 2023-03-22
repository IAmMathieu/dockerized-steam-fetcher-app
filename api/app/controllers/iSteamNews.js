const iSteamNews = {
  async getNewsForApp(req, res) {
    const appSteamId = req.body.app_steam_id;
    const count = req.body.count || 3;
    const maxLength = req.body.maxLength || 300;

    const appNewsFetch = await fetch(
      `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appSteamId}&count=${count}&maxlength=${maxLength}&format=json`,
      { method: "GET" }
    );

    const appNewsData = await appNewsFetch.json();

    if (appNewsData === undefined || Object.keys(appNewsData).length == 0) {
      res.status(404).send({"error":"No Data Found"});
    } else {
      res.status(200).send(appNewsData);
    }
  },
};

module.exports = iSteamNews;
