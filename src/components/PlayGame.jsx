import './PlayGame.css';

const PlayGame = ({playGame}) => {
  return (
    <div className='playGame'>
        <h1>Secret word</h1>
        <button onClick={playGame}>Encerrar o jogo</button>
    </div>
  )
}

export default PlayGame;