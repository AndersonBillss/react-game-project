'use client'
import Image from 'next/image'
import styles from './page.module.css'
import React, { useState, useContext } from 'react'

import MasterMind from './games/MasterMind'
import Checkers from './games/Checkers'
import Trivia from './games/Trivia'
import ConnectFour from './games/ConnectFour'

import BackgroundImageGallery from './background-image-gallery'
import BackgroundContext from './BackgroundContext'



export function test() {
  return(
    <><ConnectFour /></>
  )
}

export default function Home() {
  const [loadedGame, setLoadedGame] = useState(null)
  const [backgroundImageSelect, setBackgroundImageSelect] = useState(false)
  const [backgroundContextValue, setBackgroundContextValue] = useState(null)
  const games = [
    {title: 'MasterMind', game: <MasterMind />},
    {title: 'Checkers', game: <Checkers />},
    {title: 'Trivia', game: <Trivia />},
    {title: 'Connect Four', game: <ConnectFour />},
  ]

  const updateBackgroundContextValue = (newBackground) => {
    setBackgroundContextValue(newBackground)
  }


  const loadGame = (index) => {
    setLoadedGame(games[index].game)
  }


  const HomePage = () => {
    return(
      <main className={styles.main} style={{
        backgroundImage: backgroundContextValue === null ? '' : `url(${backgroundContextValue})`
    }}>
        <div className={`${styles.mainTitleContainer} ${styles.column}`}>
          <div>
            <h1 className={styles.mainTitle}>Games</h1>
          </div>
          <div className={styles.mainNav}>
            <button
            className={styles.backgroundSelectButton}
            onClick={() => setBackgroundImageSelect(true)}
            >select background</button>
          </div>
        </div>
        <ul className={styles.gameOptionList}>
          {games.map((game, index) => (
            <li
            key={index}
            onClick={() => loadGame(index)}
            className={`${styles.gameOption} ${styles[`${game.title}Option`]}`}
            >{game.title}</li>
          ))}
        </ul>
      </main>
    )
  }

  return (
    <BackgroundContext.Provider value={{ backgroundContextValue, updateBackgroundContextValue }}>
      {backgroundImageSelect ? (
      <div className={styles.center}>
        <button onClick={() => {setLoadedGame(null); setBackgroundImageSelect(false)}} className={styles.backButton}>Home</button>
        <BackgroundImageGallery />
      </div>
      ) : (
      loadedGame === null ? (
      <HomePage />
      ) : (
      <div className={styles.center}>
        <button onClick={() => {setLoadedGame(null); setBackgroundImageSelect(false)}} className={styles.backButton}>Home</button>
        {loadedGame}
      </div> 
      )
      )
      }

      
    </BackgroundContext.Provider>
  )
}
