import './GameOver.css';

const GameOver = ({retry, stopGame, score}) => {
  return (
    <div className='gameOver'>
        <h1>Fim de Jogo!</h1>
        <h2>
          A sua pontuação foi: <span>{score}</span>
        </h2>
        <button onClick={retry}>Reiniciar o jogo</button>
        <button onClick={stopGame}>Sair do jogo</button>
    </div>
  )
}

export default GameOver;