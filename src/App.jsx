// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// data
import { wordslist } from './data/words';

// components
import StartScreen from './components/StartScreen';
import PlayGame from './components/PlayGame';
import GameOver from './components/GameOver';

const stages = [
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "end"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordslist);

  console.log(words);

  const startGame = () => {
    setGameStage(stages[1].name);
  };

  const playGame = () => {
    setGameStage(stages[2].name);
  };

  const gameOver = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <PlayGame playGame={playGame} />}
      {gameStage === "end" && <GameOver gameOver={gameOver} />}
    </div>
  )
};

export default App;
