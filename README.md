# Reatify 
  
A little Spotify Client using the Spotify WEB API. Entirely made on ReactJS/Redux.

## Description
Project created as a basic simple Spotify Client using React and Redux.
You can view your profile, and view your followed artist, and also you can being suggested by new artist by clicking inside each of the artist.
You can follow or unfollow artists.

### Spotify Web API Auth
Has been used the `Implicit Grant Flow` Auth Flow described here: https://developer.spotify.com/web-api/authorization-guide/#implicit-grant-flow

## Requirements: 
1. You'll need an Spotify Account (free or premium)
2. You'll need to follow at least 1 artist.

## Installation/Execution

### Environmental Variables:

You have several environmental variables if you want to specify build the project.

- `BASE_APP`: the base path of the project. (ie: `http://localhost:3001/). This will be used to create the REDIRECT_URI that the Spotify Web API needs.
- `CLIENT_ID`: the client id of your SPOTIFY APP.
- `CLIENT_SECRET`: the client secret of your SPOTIFY APP.

If you want to set the env variables, you can do it in the following way:

- OSX/Linux:
```
BASE_APP=http://localhost:3001/ npm run build
```

- Windows
```
set API_HOST=http://localhost:3001/
npm run build
```

### Installing
To install please execute: 
`npm install` over the root of the project

#### Running the Project in dev mode
`npm start -s` this will start the project doing all the tasks (lint, tests, etc, and also keeping the watcher active)

### Deploying to Server
To build the project to be deployed in a server, please execute:

`npm run build` and you will have the required files compiled and ready on */dist* folder. 

#### Running the Project in production mode (with compiled files)
`npm run start:dist` will execute the project with a little nodeJS local server using your recently compiled files on `/dist` folder.

## Tech Stack

### Frontend
- React
- Redux 

### UI
- Sass
- Bootstrap 

### Testing
- Mocha
- Expect 
- Enzyme
- jsdom

### Javascript version
- ECMA2015/ES6

### Tools
- Webpack
- Babel
- Etc
