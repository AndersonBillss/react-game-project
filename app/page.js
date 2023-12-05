'use client'
import Image from 'next/image'
import styles from './page.module.css'
import React, { useState, useContext, useEffect } from 'react'
import Head from 'next/head'

import MasterMind from './games/MasterMind'
import Checkers from './games/Checkers'
import Trivia from './games/Trivia'
import ConnectFour from './games/ConnectFour'
import BattleShip from './games/Battleship'

import BackgroundImageGallery from './background-image-gallery'
import BackgroundContext from './BackgroundContext'



export function test() {
  return(
    <><BattleShip /></>
  )
}


export function App() {

  let savedBackground
  let savedLoadedGame
  try{
    savedBackground = localStorage.getItem('background') || null
    if(savedBackground === 'null' || savedBackground === undefined || savedBackground === 'undefined'){
      savedBackground = null
    }
    savedLoadedGame = JSON.parse(localStorage.getItem('loadedGame')) || null
    if(typeof(savedLoadedGame) === 'number'){
      savedLoadedGame = savedLoadedGame-1
    }
  } catch (error){}
  

  

  const [loadedGame, setLoadedGame] = useState(null)
  const [backgroundImageSelect, setBackgroundImageSelect] = useState(false)
  const [backgroundContextValue, setBackgroundContextValue] = useState(null)
  const games = [
    {title: 'MasterMind', styleName: 'masterMind', game: <MasterMind />},
    {title: 'Checkers', styleName: 'checkers', game: <Checkers />},
    {title: 'Trivia', styleName: 'trivia', game: <Trivia />},
    {title: 'Connect Four', styleName: 'connectFour', game: <ConnectFour />},
  ]


  useEffect(() => {
    setBackgroundContextValue(savedBackground)
    setLoadedGame(savedLoadedGame)
  },[])



  const updateBackgroundContextValue = (newBackground) => {
    setBackgroundContextValue(newBackground)
  }


  const loadGame = (index) => {
    setLoadedGame(index)
  }


  const HomePage = () => {
    return(
      <>
        <main className={styles.main} style={{
          backgroundImage: (backgroundContextValue === null || backgroundContextValue === undefined) ? 'none' : `url(${backgroundContextValue})`
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
              className={`${styles.gameOption} ${styles[`${game.styleName}Option`]}`}
              >{game.title}</li>
            ))}
          </ul>
        </main>
      </>
    )
  }

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('background', backgroundContextValue);
        localStorage.setItem('loadedGame', loadedGame === null ? null : loadedGame+1);
      }
    } catch (error) {
      console.error('Error setting background in localStorage:', error);
    }
  }, [backgroundContextValue, loadedGame]);

  return (
    <BackgroundContext.Provider value={{ backgroundContextValue, updateBackgroundContextValue }}>
{/*       <button onClick={() => localStorage.clear()}>Clear Local Storage</button>
 */}      {backgroundImageSelect ? (
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
        {games[loadedGame].game}
      </div> 
      )
      )
      }
    </BackgroundContext.Provider>
  )
}

export default App