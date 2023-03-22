# Users and Games informations fetcher

_A simple web app to fecth information from Steam API for a specific User or Game ID_

## Users

_Get Users related informations_

### <ins>From GetPlayerSummaries (v2):</ins>

_Returns basic profile information for a list of 64-bit Steam IDs_

---

> Arguments
>
> - key
>   - steam api key
> - steamids
>   - Comma-delimited list of 64 bit Steam IDs to return profile information for. Up to 100 Steam IDs can be requested
> - format
>   - Output format, json (default), xml or vdf
>
> Example:
>
> *http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=XXXXXXXXXXXXXXXXXXXXXXX&steamids=XXXXXXXXXXXXXXXXX*

---

#### Public Result Data

- steamid
  - 64bit SteamID of the user
- personaname
  - The player's display name
- profileurl
  - The full URL of the player's Steam Community profile
- avatar
  - The full URL of the player's 32x32 avatar
- avatarmedium
  - The full URL of the player's 64x64 avatar
- avatarfull
  - The full URL of the player's 184x184 avatar
- personastateflags
  - The user's current status. 0 - offline, 1 - online, 2 - busy, 3 - away, 4 - Snooze, 5 - looking to trade, 6 - looking to play
- communityvisibilitystate
  - Represents whether the profile is visible or not, 1 - private, 3 - public
- profilestate
  - if set, the user has a community profile configured, if so set to 1
- lastlogoff
  - The last time the user was online - Unix time
- commentpermission
  - If set indicates the profile allows public comments

---

#### Private Result Data (depends on communityvisibilitystate)

- realname
  - Player's real name if set
- primaryclanid
  - Player's primary group, as configured on their Steam Community profile
- timecreated
  - The time the player's account was created - Unix Time
- gameid
  - if the user is currently in-game, this value will be returned and set to the gameid of that game
- gameserverip
  - The ip and port of the game server the user is currently playing on, if they are playing on-line in a game using Steam matchmaking. Otherwise will be set to "0.0.0.0:0"
- gameextrainfo
  - If the user is currently in-game, this will be the name of the game they are playing. This may be the name of a non-Steam game shortcut.
- loccountrycode
  - If set on the user's Steam Community profile, The user's country of residence, 2-character ISO country code
- locstatecode
  - If set on the user's Steam Community profile, The user's state of residence
- loccityid
  - An internal code indicating the user's city of residence. A future update will provide this data in a more useful way.
  - Getting locstatecode and loccityid, can now be done from *https://steamcommunity.com/actions/QueryLocations/\<loccountrycode\>/\<locstatecode\>/*

### <ins>From GetFriendList (v1)</ins>

_Returns the friend list of any Steam user, provided their Steam Community profile visibility is set to "Public"_

---

> Arguments
>
> - key
>   - steam api key
> - steamid
>   - 64 bit Steam ID to return friend list for
> - relationship
>   - Relationship filter. Possibles values: all, friend
> - format
>   - Output format. json (default), xml or vdf.
>
> Example:
>
> *http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=XXXXXXXXXXXXXXXXX&relationship=friend*

---

#### Result Data

_The user's friends list, as an array of friends. Nothing will be returned if the profile is private_

- steamid
  - 64bit SteamID of the user
- relationship
  - Relationship qualifier
- friend_since
  - Unix timestamp of the time when the relationship was created

### <ins>From GetPlayerAchievements (v1)</ins>

_Returns a list of all achievements by app id for user even non-achieved_

---

> Arguments
>
> - key
>   - steam api key
> - steamid
>   - 64 bit Steam ID to return friend list for
> - appid
>   - ID for the game you're requesting
> - l (Optional)
>   - Languagem if specified, it will return language data from the requested language
>
> Example:
>
> *http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=XXX&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=XXXXXXXXXXXXXXXXX*

---

#### Result Data

_A list of achievements_

- apiname
  - The API name of the achievement
- achieved
  - Whether or not the achievement has been completed
- unlocktime
  - Date when the achievement was unlocked
- name (Optional)
  - Localized description of the achievement
- description (Optional)
  - Localized description of the achievement

### <ins>From GetUserStatsForGame (v2)</ins>

_Returns a list of achievements for this user by app id_

---

> Arguments
>
> - key
>   - steam api key
> - steamid
>   - 64 bit Steam ID to return friend list for
> - appid
>   - ID for the game you're requesting
> - l (Optional)
>   - Languagem if specified, it will return language data from the requested language
>
> Example:
>
> *http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=XXX&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=XXXXXXXXXXXXXXXXX*

#### Result Data

_Same as GetPlayerAchievements but only listing achieved_

### <ins>From GetOwnedGames (v1)</ins>

_GetOwnedGames returns a list of games a player owns along with some playtime information, if the profile is publicly visible. Private, friends-only, and other privacy settings are not supported unless you are asking for your own personal details (ie the WebAPI key you are using is linked to the steamid you are requesting)_

---

> Arguments
>
> - key
>   - steam api key
> - steamid
>   - 64 bit Steam ID to return friend list for
> - include_appinfo
>   - Include game name and logo information in the output. The default is to return appids only
> - include_played_free_games
>   - By default, free games like Team Fortress 2 are excluded (as technically everyone owns them). If include_played_free_games is set, they will be returned if the player has played them at some point. This is the same behavior as the games list on the Steam Community
> - format
>   - Output format. json (default), xml or vdf
> - appids_filter
>   - You can optionally filter the list to a set of appids. Note that these cannot be passed as a URL parameter, instead you must use the JSON format described in Steam_Web_API#Calling_Service_interfaces. The expected input is an array of integers (in JSON: "appids_filter: [ 440, 500, 550 ]" )
>
> Example:
>
> *http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=XXXXXXXXXXXXXXXXX&format=json*

---

#### Result Data

- game_count
  - the total number of games the user owns (including free games they've played, if include_played_free_games was passed)
- A games array, with the following contents (note that if "include_appinfo" was not passed in the request, only appid, playtime_2weeks, and playtime_forever will be returned):
  - appid
    - Unique identifier for the game
  - name
    - The name of the game
  - playtime_2weeks
    - The total number of minutes played in the last 2 weeks
  - playtime_forever
    - The total number of minutes played "on record", since Stean began tracking total playtime in early 2009
  - img_icon_url, img_logo_url
    - hese are the filenames of various images for the game. To construct the URL to the image, use this format: http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg. For example, the TF2 logo is returned as "07385eb55b5ba974aebbe74d3c99626bda7920b8"
  - has_community_visible_stats
    - indicates there is a stats page with achievements or other game stats available for this game. The uniform URL for accessing this data is http://steamcommunity.com/profiles/{steamid}/stats/{appid}. For example, Robin's TF2 stats can be found at: http://steamcommunity.com/profiles/76561197960435530/stats/440. You may notice that clicking this link will actually redirect to a vanity URL like /id/robinwalker/stats/TF2

### <ins>From GetRecentlyPlayedGames (v1)</ins>

_GetRecentlyPlayedGames returns a list of games a player has played in the last two weeks, if the profile is publicly visible. Private, friends-only, and other privacy settings are not supported unless you are asking for your own personal details (ie the WebAPI key you are using is linked to the steamid you are requesting)_

---

> Arguments
>
> - key
>   - steam api key
> - steamid
>   - 64 bit Steam ID to return friend list for
> - count
>   - Optionally limit to a certain number of games (the number of games a person has played in the last 2 weeks is typically very small)
> - include_played_free_games
> - format
>   - Output format. json (default), xml or vdf
>
> Example:
>
> *http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=XXXXXXXXXXXXXXXXX&format=json*

---

#### Result Data

- total_count
  - the total number of unique games the user has played in the last two weeks. This is mostly significant if you opted to return a limited number of games with the count input parameter
- A games array, with the following contents:
  - appid
    - Unique identifier for the game
  - name
    - The name of the game
  - playtime_2weeks
    - The total number of minutes played in the last 2 weeks
  - playtime_forever
    - The total number of minutes played "on record", since Stean began tracking total playtime in early 2009
  - img_icon_url, img_logo_url
    - These are the filenames of various images for the game. To construct the URL to the image, use this format: http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg. For example, the TF2 logo is returned as "07385eb55b5ba974aebbe74d3c99626bda7920b8"
  - playtime_windows_forever
    - Same as playtime_forever but time played on Windows Plateform
  - playtime_mac_forever
    - Same as playtime_forever but time played on Mac Plateform (if mac is natively supported by game)
  - playtime_linux_forever
    - Same as playtime_forever but time played on Linux Plateform (if linux is natively supported by game)


## Games

### <ins>From GetNewsForApp (v2)</ins>

_GetNewsForApp returns the latest of a game specified by its appID_

---

> Arguments
>
> - appid
>   - ID for the game you're requesting
> - count
>   - How many news enties you want to get returned
> - maxlenght
>   - Maximum lenght of each news entry
> - format
>   - Output format, json (default), xml or vdf
>
> Example:
>
> *http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=XXXX&count=3&maxlength=300&format=json*

---

#### Result Data

_An appnews object containing:_

- appid
  - the AppID of the game you want news of
- newsitems
  - an array of news item information:
    - An ID, title and url
    - A shortened excerpt of the contents (to maxlength characters), terminated by "..." if longer than maxlength
    - A comma-separated string of labels and UNIX timestamp

### <ins>From GetGlobalAchievementPercentagesForApp (v2)</ins>

_Returns on global achievements overview of a specific game in percentages_

> Arguments
>
> - gameid
>   - ID for the game you want the stats
> - format
>   - Output format, json (default), xml or vdf
>
> Example:
>
> *http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=XXX&format=xml*
