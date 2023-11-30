'use client'
import BackgroundContext from '../BackgroundContext'
import styles from '../page.module.css'
import { useState } from 'react'

export default function ConnectFour(){
    const [board, setBoard] = useState(
        [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
        ])
    const [turn, setTurn] = useState(1)

    const winConditions = [
        [[0,0],[0,1],[0,2],[0,3]],
        [[0,0],[1,0],[2,0],[3,0]],
        [[0,0],[1,1],[2,2],[3,3]],
        [[0,3],[1,2],[2,1],[3,0]],
    ]
    let win = null
    let winPieces = []
    for(let i=0; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
            //each spot tested for each condition
            winConditions.forEach((condition) => {
                if(!win){
                    let canTest = true
                    //check if the conditions go out of bounds
                    condition.forEach((coord) => {
                        if(i+coord[0]>=board.length || j+coord[1]>=board[i].length){
                            canTest = false
                        }
                    })
                    if(canTest){
                        let piece = board[i+condition[0][0]][j+condition[0][1]]
                        if(piece != 0){
                            win = true
                            //if any piece doesn't line up with the condition, set win to null
                            condition.forEach((coord, index) => {
                                winPieces[index] = [i+coord[0],j+coord[1]]
                                if(board[i+coord[0]][j+coord[1]] != piece){
                                    win = null
                                    winPieces = []
                                }
                            })
                        }
    
                    }
                }
            })

        }
    }
    if(win){
        console.log(winPieces)
        if(turn == 1){
            win = 'Yellow'
        } else {
            win = 'Red'
        }
    } else {
        winPieces = []
    }


    const gameReset = () => {
        setBoard(        [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
        ])
        if(turn == 1){
            setTurn(2)
        } else {
            setTurn(1)
        }
    }

    const placePiece = (columnIndex) => {
        const newBoard = [...board]
        for(let i=0; i<board[columnIndex].length; i++){
            if(newBoard[columnIndex][i] > 0){
                return
            }
            if(i == newBoard[columnIndex].length-1 || newBoard[columnIndex][i+1] > 0){
                newBoard[columnIndex][i] = turn;
                break
            }
        }
        if(turn == 1){
            setTurn(2)
        } else {
            setTurn(1)
        }
        setBoard(newBoard) 
    }




    return(
        <main className={styles.main}>
            <div className={styles.titleContainer}>
                <h1 className={styles.connectFourTitle}>Connect Four</h1>
            </div>
            <div className={`${styles.connectFourBoard} ${styles[`turn${turn}`]}`}>
                {board.map((column, columnIndex) => (
                    <div 
                    key={columnIndex} 
                    className={`${styles.connectFourColumn} ${win == null ? styles.connectFourRowHoverDarken : ''}`}
                    onClick={win == null ? (() => placePiece(columnIndex)) : (()=>{})}
                    >
                        {column.map((piece, pieceIndex) => (
                            <div 
                            key={pieceIndex} 
                            className={`${styles.connectFourPiece} ${styles[`connectFourPiece${piece}`]}
                            ${winPieces.some(winPiece => columnIndex === winPiece[0] && pieceIndex === winPiece[1]) ? styles.connectFourWinPiece : win != null ? styles.connectFourShaded : ''}
                            `}
                            >
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {win!=null?<h1>{win} Wins!</h1>:''}
            <button 
            className={`${styles.center} ${styles.backButton}`}
            onClick={() => gameReset()}
            >Reset Game</button>
        </main>
    )
}