# WoW Database Backend

At the current moment the project is meant for running on the local machine, but if you want to scale then you will want to convert it from writing to JSON to writing to a database.

## Features
-Weekly Email Updates On Node Activity

## Getting Started
1. Get a API Developer key from dev.blizzard.com
2. Create a .env file in the backend directory.
3. In the .env file create a variable called: "BATTLENET_API_KEY="" and then paste in your API key.
4. in the terminal run the commands in the backend directory:

```
npm install
npm run build
```


### Routes Completed (for now)
```
wowdata.js
wowmounts.js
```
### Todos
#### Front End
Build out front end in Angular 4 or React.js.

#### Back End

Node functions work, but require 2 calls to get correct JSON.
Unsure of using the Auction house route due to return and size of JSON.
Change structure from folder based to NoSQL?
