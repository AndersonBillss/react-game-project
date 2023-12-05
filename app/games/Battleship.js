'use client'
import BackgroundContext from '../BackgroundContext'
import styles from '../page.module.css'
import { useState, useEffect } from 'react'

export default function BattleShip() {
    const [board, setBoard] = useState(
        [
            [{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false}],

            [{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false}],

            [{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false}],

            [{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false}],

            [{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false}],

            [{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false}],

            [{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false}],

            [{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false}],

            [{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false}],

            [{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false},{type: 0, hit: false}],

        ]
    )
    const [selectedCell, setSelectedCell] = useState([null, null])

    const selectCell = (row, cell) => {
        setSelectedCell([row, cell])
    }
    const fire = () => {
        let newBoard = [...board]
        newBoard[selectedCell[0]][selectedCell[1]].hit = true
        setBoard(newBoard)
        setSelectedCell([null, null])
    }

    return ( 
        <main className={styles.main}>
            <h1>BattleShip</h1>

            <div className={styles.battleshipBoard}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {row.map((cell, cellIndex) => (
                            <div key={(rowIndex*10)+cellIndex} onClick={board[rowIndex][cellIndex].hit ? (() => {}) : (() => selectCell(rowIndex, cellIndex))} className={styles.battleshipCell}>
                                <div className={`${styles.battleshipDot} ${cell.hit === true ? (cell.type > 0 ? styles.battleshipHit : styles.battleshipMiss) : (rowIndex == selectedCell[0] && cellIndex == selectedCell[1]) ? styles.battleshipSelected : ''}`}></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {selectedCell[0] !== null ? <div onClick={() => fire()} className={styles.battleshipFireButton}>Fire</div> : ''}
            

        </main>
        )
    }

