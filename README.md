## Environment Setup
First, ensure your development environment is properly set up with Node.js, npm, and Colyseus.

Install Node.js (which includes npm) from nodejs.org.
Verify installation:
node -v
npm -v

npm install colyseus
npm install express
npm install socket.io
npm install ejs

File structure:
/boggle-app
│
├── /public          # Static assets
│   ├── /css
│   │   └── styles.css
│   └── /js
│       └── game.js  # Game logic
│
├── /views           # EJS templates
│   ├── home.ejs     # Home page
│   └── game.ejs     # Game page
│
├── /server
│   ├── Room.js      # Colyseus Room logic for Boggle
│   └── index.js     # Express server and Colyseus setup
│
├── package.json     # Dependencies and scripts
└── README.md        # Instructions to run

## Running the Application
(npm install)
node server/index.js

Navigate to http://localhost:3000. From here, you can create a room or join one using a code. The game state is synchronized through Colyseus.
