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
        game.clearCards()
        setCards(game.createCardsFromTechs())
        setGameOver(false)
    }
    function handleFlip(card){
            game.flipCard(card.id, ()=>{
                //GameOverCallBack
                setGameOver(true)
            },()=>{
                //NoMatchCallBack
                setCards([...game.cards])
            })
            setCards([...game.cards])
    }

    return(
        <div>
            <GameBoard handleFlip={handleFlip} cards={cards}></GameBoard>
            <GameOver show={gameOver} handleRestart={restart}></GameOver>
        </div>
    )
}