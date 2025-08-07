# Docker Testing for Security on User-Submitted Code

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Run the project:
   ```bash
   npm start
   ```


## How the App Works

This app is a TypeScript-based CLI that lets you write and execute Python code interactively:


### Step-by-Step Usage

1. Start the app with `npm start` (or run the built JS file directly).
2. At the prompt `PY>`, type your Python code. For multi-line code, keep entering lines; each new line will be prompted with `...`.
3. When you are done, type `END` on a new line. The app will execute all the code you entered as a single Python script and show the output directly in your terminal.
4. You can repeat the process to run more code, or type `exit` to quit.

**Example session:**
```
PY> print("Hello from Python!")
END
Hello from Python!
PY> for i in range(3):
...     print(i)
END
0
1
2
PY> exit
```

**How it works internally:**
- The app collects your input lines until you type `END`.
- It writes the code to a temporary file (`student_code.py`).
- It runs `python3 student_code.py` using Node.js's child process API, showing output/errors directly.
- The temporary file is deleted after execution for security and cleanliness.

## How the Docker Container Works


### Building and Running with Docker

1. Build the Docker image:
   ```bash
   docker build -t docker-linux-test .
   ```
2. Run the container interactively:
   ```bash
   docker run -it docker-linux-test
   ```
   This will launch the CLI app inside the container, just like running it locally.

**What the container does:**
- Uses a lightweight Linux environment (Alpine) with Node.js and Python 3 installed.
- Installs all Node.js dependencies and builds the TypeScript code to JavaScript.
- When started, runs the CLI app so you can enter Python code interactively.
- All code execution happens inside the container, so your host system is isolated from any user-submitted code.

**Why use Docker?**
- Ensures a consistent environment for running and testing user-submitted Python code.
- Adds a layer of isolation and security, so code runs in a controlled container, not directly on your host machine.
- Makes it easy to deploy or share the app with others: anyone with Docker can run the same environment.
