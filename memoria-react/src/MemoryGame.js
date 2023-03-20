import React, { useEffect, useState } from 'react'
import GameBoard from './components/GameBoard'
import GameOver from './components/GameOver'
import game from './game/game'



export default function MemoryGame(){
    const [cards, setCards] = useState([])
    const [gameOver, setGameOver] = useState(false)

    useEffect(()=>{
       setCards(game.createCardsFromTechs())
    },[])

    function restart(){
        setGameOver(false)
    }

    return(
        <div>
            <GameBoard cards={cards}></GameBoard>
            <GameOver show={gameOver} handleRestart={restart}></GameOver>
        </div>
    )
}