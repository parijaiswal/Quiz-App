import React from "react";
import "./Quiz.css";
import { useState,useRef,useEffect } from "react";
import {data} from '../../assets/data';
import ScoreCal from "./ScoreCal";
const Quiz = () => {

  let [index,setIndex] = useState(0);
  let [question,setQuestions] = useState(data[index]);
  let [lock,setLock] = useState(false);
  let [score,setScore] = useState(0);
  let [result,setResult] = useState(false);
  let [timeLeft,setTimeLeft] = useState(20);


  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1,Option2,Option3,Option4];

  const checkAnswer = (e,ans)=>{
      if(lock === false)
      {
        if(question.ans===ans)
        {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1);
        }
        else{
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans-1].current.classList.add("correct");
        }
      }

  }

  const nextQuestion = ()=>{
    if(lock===true)
    {
        if(index === data.length-1)
        {
           setResult(true);
           return 0;
        }
        setIndex(++index);
        setQuestions(data[index]);
        setLock(false);
        setTimeLeft(20); // Reset timer for next question
        option_array.map((option) => {
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
            return null;
        })
    }
  }
   useEffect(() => {
  if (result)
    { return; } // Don't run timer on result page

  if (timeLeft === 0) {
    nextQuestion(); // Move to next question automatically
    return;
  }

  const timer = setTimeout(() => {
    setTimeLeft(prev => prev - 1);
  }, 1000);

  return () => clearTimeout(timer); // Cleanup when component updates/unmounts
}, [timeLeft, result]);

  const reset = ()=>{
    setIndex(0);
    setQuestions(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setTimeLeft(20);
  }
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <div className="timer">
        <span>Time Left: {timeLeft} seconds</span>
      </div>
      <hr />
      {result? (<>
      <ScoreCal score={score} total={data.length} onReset={reset} /></>) : (
        <><h2>{index + 1}. {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=>{checkAnswer(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAnswer(e,2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAnswer(e,3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAnswer(e,4)}}>{question.option4}</li>
      </ul>
      <button onClick={nextQuestion}>Next</button>
      <div className="index">{index + 1} of {data.length} questions</div>
    </>)}
   
    </div>
  );
};

export default Quiz;
