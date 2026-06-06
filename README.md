# Asteroids Game Engine (TypeScript Refactor)

![TypeScript](https://shields.io)
![React](https://shields.io)
![Redux](https://shields.io)
![Tests](https://shields.io)

An advanced client-side architectural showcase that brings the classic Asteroids arcade game into a modern, type-safe React environment. This project serves as a performance and state management study, demonstrating strict data contracts, manual frame rendering, and defensive unit testing patterns.

## 🚀 Key Features & Architecture

* **HTML5 Canvas & Vector Math Engine:** Implements a custom 2D rendering loop using `requestAnimationFrame`. It computes real-time physics, continuous velocity vectors, and screen-wrapping boundaries for players, lasers, and active asteroids.
* **Predictable High-Frequency State:** Integrated **Redux** to normalize and store active game variables (including ship coordinates, active projectiles, lives, and scoring metrics), ensuring a single source of truth for the game loop.
* **Asynchronous Side-Effect Pipelines:** Utilizes **Redux Saga** generator functions (`function*`) as an architecture experiment to handle decoupled asynchronous data pipelines, managing local scoreboard data persistence outside of the UI view layer.
* **Strict Type Safety:** Migrated from legacy JavaScript to strict **TypeScript**, establishing rigid type contracts for spatial vectors, entity classes, and component properties to catch runtime exceptions at compile-time.
* **Defensive Integration Testing:** Features a comprehensive unit testing suite using **React Testing Library** and Jest. Tests wrap Redux contexts, mock state data, and validate component rendering cycles, modal visibility, and layout changes under specific state modifications.

## 🛠️ Tech Stack

* **Frontend:** React (Functional Components, Hooks)
* **Graphics:** HTML5 Canvas API
* **State Management:** Redux, Redux Saga (Middleware)
* **Type System:** TypeScript (Strict Compilation Mode)
* **Testing Suite:** Jest, React Testing Library (RTL)

## 📦 File Structure

```text
src/
├───Components/          # Co-located React views and integration tests
│   ├───Canvas/          # Canvas mount point and event listeners
│   ├───GameBoard/       # Core game layout management
│   └───...              
├───state/               # Redux store configurations, reducers, and Sagas
└───util/                # Pure mathematical utilities and physics engines
```

## 🧪 Testing

The project maintains a 100% passing test suite focused on component contracts, global store injection, and UI visibility triggers.

To run the test suite locally:
```bash
npm test
```


Set up game in terminal:
step 1: npm i to install all packages
step 2: cd src
step 3: npm start to run react app

Goal: Shoot as many asteroids as possible before dying(you die when you bump into an asteroid) and check your high scores

Game instructions:

W key - move player forward
UP arrow key - move player forward

A key - rotate player left
LEFT arrow key - rotate player left

S key - reverse player
DOWN arrow key - reverse player

D key - rotate player right
RIGHT arrow key - rotate player right

Spacebar - shoot bullets

Link to video: https://youtu.be/AtyvTCVCu6Q
