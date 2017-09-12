# Reatify 
  
A little Spotify Client using the [Spotify WEB API](https://developer.spotify.com/web-api/). Entirely made on ReactJS/Redux.

## Objective
The App will suggest you new artists based on the artists you like. And you can follow/unfollow them.

## Description
Project created as a basic Spotify Client using React and Redux.
You can view your profile. View your followed artist, and also being suggested by new artists by clicking on each of the artist.
You can follow or unfollow artists.

### Spotify Web API Auth
Has been used the [Implicit Grant Flow](https://developer.spotify.com/web-api/authorization-guide/#implicit-grant-flow) to authenticate with the API.

### Building the App with your App credentials
If you want to create your application, and have your `CLIENT_ID` and `CLIENT_SECRET`. Please go to: [Spotify My Applications](https://developer.spotify.com/my-applications/) and register your app. Remember to add the corrects `REDIRECT_URI` you need to use the App.

### Requirements for App Usage:
1. A Spotify Account (free or premium)
2. Need to be following 1 artist at least.

## Installation/Execution

### Environmental Variables:

You have several environmental variables if you want to specify build the project for your needs.

- `BASE_APP`: the base path of the project. (ie: `http://localhost:3001/`). This will be used to create the `REDIRECT_URI` that the Spotify Web API needs.
- `CLIENT_ID`: the client id of your Spotify App.
- `CLIENT_SECRET`: the client secret of your Spotify App.
- `SPOTIFY_WEB_API_AUTH_HOST`: the Spotify Web API Auth URL that defaults to: `https://accounts.spotify.com/`.
- `SPOTIFY_WEB_API_HOST`: the Spotify Web API Host URL that defaults to: `https://api.spotify.com/v1/`.

If you want to set the env variables, you can do it in the following way: (ie:)

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

#### Running the Project in Development mode
`npm start -s` this will start the project doing all the tasks (lint, tests, etc, and also keeping the watcher active)

### Deploying to Server
To build the project to be deployed in a server, please execute:

`npm run build` and you will have the required files compiled and ready on */dist* folder. 

#### Running the Project in production mode (with compiled files)
`npm run start:dist` will execute the project with a little nodeJS local server using your recently compiled files on `/dist` folder.

### Demo deployed on a AWS S3 Bucket
[Reatify Demo](http://reatify.s3-website.us-east-2.amazonaws.com/)

## Tech Stack / Main Used Libraries

### Frontend
- React
- Redux 
- React Router

### UI
- Sass
- Bootstrap 
- Font Awesome

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
