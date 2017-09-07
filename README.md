# Reatify 
  
Entirely made on ReactJS/Redux

## Description
Project created as a basic simple Spotify Client using React and Redux.

## Installation/Execution

### Installing
To install please execute: 
`npm install` over the root of the project

#### Running the Project in dev mode
`npm start -s` this will start the project doing all the tasks (lint, tests, etc, and also keeping the watcher active)

### Deploying to Server
To build the project to be deployed in a server, please execute:

`npm run build` and you will have the required files compiled and ready on */dist* folder. 

#### Different API URL

If you want to use a different API URL you need to execute this way the command, to set the env variable.

- OSX/Linux:
```
API_HOST=http://localhost:3000/api/ npm run build
```

- Windows
```
set API_HOST=http://localhost:3000/api/
npm run build
```

#### Running the Project in production mode (with compiled files)
`npm run start:dist` will execute the project with a little nodeJS local server using your recently compiled files on `/dist` folder.

## Tech Stack

### Backend
- Node
- Express

### Frontend
- React
- Redux 

### UX
- Sass 

### Testing
- Mocha
- Expect 
- Enzyme
- jsdom

### Javascript version
- ECMA2015/ES6

### Tools
- Webpack
