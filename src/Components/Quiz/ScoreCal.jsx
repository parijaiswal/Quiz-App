import React from 'react'
import './ScoreCal.css'
import { useState } from 'react'
const ScoreCal = ({score,total, onReset}) => {
    const percentage = ((score/total)*100).toFixed(2);
    let remark = "";
    if(percentage >=85) {
        remark = "Excellent 🎉";
    }
    else if(percentage >= 70){
        remark = "Good Job😊";
    }
    else if(percentage >=50){
        remark = "Keep Practicing! 💪";
    }
  return (
    <div className="summary">
        <h2>Quiz Completed!</h2>
        <p><strong>Total Questions:</strong> {total}</p>
        <p><strong>Correct Answers: </strong> {score}</p>
        <p><strong>Score: </strong> {percentage}%</p>
        <p><strong>Remark: </strong> {remark}</p>
        <button className="btn" onClick={onReset}>Restart Quiz</button>
    </div>
  )
}

export default ScoreCal