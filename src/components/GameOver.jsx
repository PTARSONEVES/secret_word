import './GameOver.css';

const GameOver = ({gameOver}) => {
  return (
    <div className='gameOver'>
        <h1>Secret word</h1>
        <button onClick={gameOver}>Reiniciar o jogo</button>
    </div>
  )
}

export default GameOver;