import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
    
  )
}

const StatisticLine = ({text, value}) => {
  if (text==="Positive") {
    return (
      <p>{text} {value} %</p>
    )
  }
  return (
    <p>{text} {value}</p>
  )

} 

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <h2>No feedback given</h2>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="Good" value={props.good}/>
      <StatisticLine text="Neutral" value={props.neutral}/>
      <StatisticLine text="Bad" value={props.bad}/>
      <StatisticLine text="Total" value={props.total}/>
      <StatisticLine text="Avarage" value={props.avarage}/>
      <StatisticLine text="Positive" value={props.positive}/>
      
      </div>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  
  const increaseGood = () => {
    setGood(good+1)
    setTotal(total+1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
  }
  const increaseBad = () => {
    setBad(bad+1)
    setTotal(total+1)
  }

  const avarage = total === 0 ? 0 :(good-bad) / total
  const positive = total === 0 ? 0 : (good / total)*100
   
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text="good"/>
      <Button onClick={increaseNeutral} text="neutral"/>
      <Button onClick={increaseBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}
      avarage={avarage} positive={positive}/>
      



    </div>
    
  )
}

export default App