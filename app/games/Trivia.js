'use client'
import { useEffect, useState, useContext } from 'react'
import BackgroundContext from '../BackgroundContext'
import styles from '../page.module.css'

export default function Trivia() {
    const [currentQuestion, setCurrentQuestion] = useState({question: null, answers: [{text: null, correct: false}]})
    const [currentQuestionType, setCurrentQuestionType] = useState({type:'', code:''})
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [answerChecked, setAnswerChecked] = useState(false)
    const triviaOptions = [
        {type: 'Random', code: ''}, 
        {type: 'Movies', code: '&category=11'}, 
        {type: 'Music', code: '&category=12'},
        {type: 'Science & Nature', code: '&category=17'},
        {type: 'Geography', code: '&category=22'},
        {type: 'History', code: '&category=23'},
    ]


    useEffect(() => {
            fetchData()
    },[currentQuestionType])
    
    const fetchData = async () => {
        if(currentQuestionType.type !== ''){
            try {
                const url = `https://opentdb.com/api.php?amount=1${currentQuestionType.code}`;
                const response = await fetch(url);
                const data = await response.json();
                const results = data.results[0]

                let newQuestion = {question: null, answers: [{text: null, correct: false}]}
                newQuestion.question = results.question
                

                //create a randomizer array
                let answerRandomizer = []
                let numbers = []
                const answerNum = results.incorrect_answers.length+1
                for(let i=0; i<answerNum; i++){
                    numbers[i] = i
                }
                for(let i=0; i<answerNum; i++){
                    let randomNum = Math.floor(Math.random()*(answerNum-i))
                    answerRandomizer[i] = numbers[randomNum]
                    numbers.splice(randomNum,1)
                }

                //randomize questions with the randomizer array
                newQuestion.answers[answerRandomizer[0]] = {text: results.correct_answer, correct: true}
                results.incorrect_answers.map((item, index) => {
                    newQuestion.answers[(answerRandomizer[index+1])] = {text: results.incorrect_answers[index], correct: false}
                })
                
            setCurrentQuestion(newQuestion)
            setAnswerChecked(false)
            setSelectedAnswer(null)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            setCurrentQuestion({question: null, answers: [{text: null, correct: false}]})
        }
    };


    const selectQuestionType = (index) => {
        setCurrentQuestionType(triviaOptions[index])
    }

    const checkAnswer = () => {
        setAnswerChecked(true)
    }

    const nextQuestion = () => {
        fetchData()
    }


    const {backgroundContextValue, updateBackgroundContextValue} = useContext(BackgroundContext)
    return(
        <main className={styles.main} style={{
            backgroundImage: backgroundContextValue === null ? '' : `url(${backgroundContextValue})`
          }}>
            <div className={styles.titleContainer}>
                <h1 className={styles.triviaTitle}>Trivia</h1>
            </div>
            <div className={styles.triviaOptions}>
                {currentQuestionType.type == '' ?
                <>
                    {triviaOptions.map((option, index) => (
                        <div 
                        onClick={() => selectQuestionType(index)} 
                        key={index}
                        className={`${styles.triviaTypeOption}`}
                        >{option.type}</div>
                    ))}
                </>
                :
                <>
                    <h2 className={styles.triviaType}>{currentQuestionType.type}</h2>
                    <h3 
                    className={styles.triviaQuestion} 
                    dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h3>
                    <ul>
                        {currentQuestion.answers.map((answer, index) => (
                            <p 
                            key={index} 
                            value={index} 
                            onClick={!answerChecked ? () => {setSelectedAnswer(index)} : () => {}}
                            className={`
                            ${styles.triviaAnswerOption}
                            ${index == selectedAnswer ? (answerChecked ? (answer.correct ? styles.triviaSelectedCorrect : styles.triviaSelectedIncorrect) : styles.triviaSelected) : ''}
                            ${answerChecked ? (answer.correct ? styles.triviaCorrect : styles.triviaIncorrect) : ''}
                            `}
                            dangerouslySetInnerHTML={{ __html: answer.text }}
                            ></p>
                        ))}
                    </ul>

                    <div
                        className={`${styles.triviaButton} ${selectedAnswer != null ? styles.triviaCanClick : ''}`}
                        onClick={selectedAnswer != null ? (answerChecked ? () => {nextQuestion()} : ()=>checkAnswer()) : ()=>{}}
                    >{answerChecked ? 'Next Question' : 'Confirm'}</div>
                    <div 
                    className={`${styles.triviaBackButton}`}
                    onClick={() => setCurrentQuestionType({type:'', code:''})}
                    >Back</div>
                </>
                }
            </div>
        </main>
    )
}