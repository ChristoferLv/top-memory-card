# Memory Card

Memory card project developed as part of the React course from [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/react), focused on state, effects, and rendering lists.

## Project Objective

The main goals were to practice:
- Managing game state and score in React
- Fetching external data and creating cards from API results
- Re-rendering a shuffled list after each pick
- Preventing duplicate selections with state checks

## What Is It?

A Pokemon-themed memory card game. Click a card only once; each correct pick increases your score, and the best score is saved for the session. The card order shuffles after every pick. Data and images are loaded from the PokeAPI at startup.

## How To Use

1. Go to the project folder:
   `cd React/top-memory-card`
2. Install dependencies:
   `npm install`
3. Run the development server:
   `npm run dev`

## Features

- Score and best score tracking
- Shuffled card order after each click
- Cards built from live PokeAPI data
- Simple reset when a duplicate card is clicked
- Custom font and background styling

## File Structure

- `src/App.jsx`: game logic, state, and data fetching
- `src/Card.jsx`: card component
- `src/App.css`: layout and card styling
- `public/background.webp`: background image
- `src/font/`: local font file

## Technologies Used

- React
- Vite
- JavaScript
- HTML and CSS

## Visualization

<img width="1910" height="1438" alt="memory_card_game_screenshot" src="https://github.com/user-attachments/assets/f587e183-79eb-41bc-8354-2b5500fe21cf" />

---

Project built following: [The Odin Project - Memory Card](https://www.theodinproject.com/lessons/node-path-react-new-memory-card)

📍 **Main repository with all projects**: [ChristoferLv/TheOdinProject](https://github.com/ChristoferLv/TheOdinProject)
