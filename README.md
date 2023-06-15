# GameCade

This is a drawing game app built with React and Firebase. It allows multiple users to create and join lobbies, where they can then select a game mode, and start drawing or interacting with other users depending on the game mode. Once all players have completed their drawings, the app displays the resulting canvas images for everyone else in the lobby to see! Users can also talk to each other through a global chat system.

## Getting started

The site is live now at [gamecade-react.web.app](gamecade-react.web.app)! Users must authenticate through Google (for now).

## Features

- Drawing to heart's content with the canvas
- Global chat system for sharing and discovering other lobbies.
- Display of resulting canvas images once all user's have finished their turn.

## Planned Features and Fixes

- **Additional authentication options**: Add more way for users to authenticate (only Google authentication is implemented for now)
- **User profiles**: Allow users to set a custom profile picture and display name. As well as set language filters, add friends, and other settings
- **Persistent lobbies**: Allows users to reconnect to a lobby upon app crash, close, or redirect
- **Automatic backend cleanup**: Implement cloud functions to handle automatic deletion and removal of dynamically created lobbies and all associated image collections (at the moment lobby information created exists until data gets wiped manually in Firebase)
- **Message channels**: There is a only a global chat channel for now however we are looking to change this to allow users to switch between global and lobby chat channels
- **User presence**: To display the amount of active users at a time, implement active status for users on friends lists, but also to keep game lobbies synchronised with players that actively have the app open (this will handle app crashes, manual redirects, and logouts all in one)
- **Address modularity**: Code to be split further into components, which will make adding more game modes easier
- **More game modes!**: More game modes :)

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Firebase: A cloud-based platform for building web and mobile apps.
- Firestore: A NoSQL cloud database provided by Firebase.
- Firebase Storage: A cloud storage service provided by Firebase for storing files.
- Firebase Hosting: A hosting service provided by Firebase for deploying and serving web applications.
- HTML5 Canvas: A web technology for drawing graphics on a web page.

## The Team

- Tristan Bartolome - tristanbartolome@hotmail.com
- Victor Worobec - victorworobec@gmail.com