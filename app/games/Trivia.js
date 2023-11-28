'use client'
import { useEffect, useState } from 'react'
import BackgroundContext from '../BackgroundContext'
import styles from '../page.module.css'

export default function Trivia() {
    const [currentQuestion, setCurrentQuestion] = useState({question: null, answers: [{text: null, correct: false}]})
    const [currentQuestionType, setCurrentQuestionType] = useState({type:'', code:''})
    const triviaOptions = [
        {type: 'Random', code: ''}, 
        {type: 'Movies', code: '&category=11'}, 
        {type: 'Music', code: '&category=12'},
        {type: 'Science & Nature', code: '&category=17'},
        {type: 'Geography', code: '&category=22'},
        {type: 'History', code: '&category=23'},
    ]


    useEffect(() => {
        if(currentQuestionType.type !== ''){
            fetchData()
        }
    },[currentQuestionType])
    
    const fetchData = async () => {
        try {
            console.log(currentQuestionType)
            const url = `https://opentdb.com/api.php?amount=1${currentQuestionType.code}`;
            const response = await fetch(url);
            const data = await response.json();
            const results = data.results[0]

            let newQuestion = {question: null, answers: [{text: null, correct: false}]}
            newQuestion.question = results.question
            if(results.type == 'multiple'){

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
            }
           setCurrentQuestion(newQuestion)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


        const selectQuestionType = (index) => {
            setCurrentQuestionType(triviaOptions[index])
        }

    return(
        <main className={styles.main}>
            <h1>trivia</h1>
            {currentQuestionType.type == '' ?
            <>
                {triviaOptions.map((option, index) => (
                    <option onClick={() => selectQuestionType(index)} key={index}>{option.type}</option>
                ))}
            </>
            :
            <>
                <h2>{currentQuestionType.type}</h2>
                <h3 dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h3>
                <ul>
                    {currentQuestion.answers.map((answer, index) => (
                        <option key={index} value={index} dangerouslySetInnerHTML={{ __html: answer.text }}></option>
                    ))}
                </ul>
            </>
            }
        </main>
    )
}