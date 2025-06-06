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
  {id:2, name: "playgame"},
  {id:3, name: "end"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordslist);

//  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category};
  }, [words]);


  // Gerencia a letra digitada
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    // check if letter has alredy been utilized
    if (
      guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongletters) => [
        ...actualWrongletters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };


  useEffect(() => {

    if(guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  },[guesses]);


   // Start Game
  const startGame = useCallback(() => {
    // clear all letters
    clearLetterStates();

    // pick word and pick category
    const {word,category} = pickWordAndCategory();

    // create an array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    // fill states
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

// Check win condiction
useEffect(() => {
  const uniqueLetters = [...new Set(letters)];

  //win condition
  if(guessedLetters.length === uniqueLetters.length) {
    //add Score
    setScore((actualScore) => actualScore += 100);

    //restart game with new word
    startGame();
  }

}, [guessedLetters, letters, startGame]);



  // Restart Game
  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[1].name);
    startGame();
  };

  // End Game
  const stopGame = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "playgame" && (
        <PlayGame
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          letters = {letters}
          guessedLetters = {guessedLetters}
          wrongLetters = {wrongLetters}
          guesses = {guesses}
          score = {score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} stopGame={stopGame} score={score} />}
    </div>
  );
};

export default App;
