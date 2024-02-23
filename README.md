# GameCade

This is a drawing game app built with React and Firebase. It allows multiple users to create and join lobbies, where they can then select a game mode, and start drawing or interacting with other users depending on the game mode. Once all players have completed their drawings, the app displays the resulting canvas images for everyone else in the lobby to see! Users can also talk to each other through a global chat system.

## Getting started

The site is live now at [gamecade-react.web.app](http://gamecade-react.web.app)! Users must authenticate through Google (for now).

## Features

- Creating and joining lobbies
- Game mode selection
- Canvas drawing
- Global chat system
- Results page to view the drawings of other users

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
- Robinson Lam

# --

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
