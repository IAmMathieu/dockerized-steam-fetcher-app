# Steam API Call Server

_Steam API dont allow direct call from a frontend, so i made a server that will be in charge to make the calls for the frontend depending on its needs_

---

## Server configuration

_Make a .env file and create a variable named **STEAM_API_KEY** which contains your own steam api key then install all needed packages with:_

> npm install

Then you can run it with:

For a dev environment with auto reload on changes

> npm run dev

For a prod environment

> npm run start

---

All the calls made, with arguments and results, are listed in [List_of_api_calls.md](List_of_api_calls.md)

All game ID can be found [here](https://steamdb.info/)