import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

class AnswerClass{
    checked = false;
    text;
    correct;
  
    constructor(text, correct){
      this.text = text;
      this.correct = correct;
    }
  
  }
  
  class QuestionClass{
    text;
    answers;
    correctlychosen;
  
    constructor(text, ...answers){
      this.text = text;
      this.answers = answers;
      this.correctlychosen = false;
    }
  
  }
  
  let someQuestion = [new QuestionClass('How would one say Goodbye in Spanish?', 
      new AnswerClass('Adios', true), 
      new AnswerClass('Hola', false), 
      new AnswerClass('Au Revoir', false), 
      new AnswerClass('Salut', false)),
  new QuestionClass('Which best-selling toy of 1983 caused hysteria, resulting in riots breaking in stores?', 
      new AnswerClass('Cabbage Patch Kids', false), 
      new AnswerClass('Transformers', false), 
      new AnswerClass('Care Bears', true), 
      new AnswerClass('Rubics cube', false)),
  new QuestionClass('What is the hottest planet on solar system', 
      new AnswerClass('Mercury', false), 
      new AnswerClass('Venus', true), 
      new AnswerClass('Mars', false), 
      new AnswerClass('Saturn', false)),
  new QuestionClass('In which country was the ceasar salate invented?', 
      new AnswerClass('Italy', false), 
      new AnswerClass('Portugal', false), 
      new AnswerClass('Mexico', true), 
      new AnswerClass('France', false)),
  new QuestionClass('How many hearts does An Octopus have?', 
      new AnswerClass('One', false), 
      new AnswerClass('Two', false), 
      new AnswerClass('Tree', true), 
      new AnswerClass('Four', false))];
  
  function Answer(props){
    const [thisselected, setthisselected] = React.useState(false);
    let color = thisselected ? (props.check ? (props.ans.correct ? '#59E391' : '#ff5050') : '#ccccb3'): '#ffffff';
   
    const styles = {
      backgroundColor: color
    };
    let handleClick = () => {
      props.handleClick(setthisselected);
    }
    
    return(
      <div className='answerspiece' style={styles} onClick={handleClick}>
        {props.ans.text}
      </div>
    )
  }
  
  function Answers(props){
    const [selected, setSelected] = React.useState(false);
    let handleClick = (callback) => {
      if(!selected) {
        setSelected(true);
        callback(true);
      }
    }
    return(
      <div className='answers-container'>
        {props.answers.map((ans) => 
        <Answer ans={ans} selected={selected} handleClick={handleClick} check={props.check}/>
        )}
      </div>
    )
  }
  
  function Question(props){
    return(
      <div>
        <p className='question'>{props.quest.text}</p>
        <Answers answers={props.quest.answers} check={props.check}/>
      </div>
    )
  }
  
  function Questions(props){
    return(
      <div>
        {props.questions.map((quest) =>
        <Question quest={quest} check={props.check}/>
        )}
      </div>
    )
  }
  
  
  export default function App(){
    const [started, setStarted] = React.useState(false);
    const [check, setCheck] = React.useState(false);
    let innertext = '';
    let buttonClick = function(e){
      if(e.target.id == 'start'){
        setStarted(true);
      }else if(e.target.id == 'check'){
        if(!check){
          setCheck(true);
          innertext='You scored 1 point';
        }else{
          setCheck(false);
          setStarted(false);
        }
      }
    }
    if(!started){
      return(
        <main>
        <h1>Quizzical</h1>
        <button className='dice-button' onClick={buttonClick} id='start'>Start quiz</button>
      </main>
      )
    }
    return(
      <main>
        <Questions questions={someQuestion} check={check}/>
        <button className='dice-button' id='check' onClick={buttonClick}>{check ? 'Tap to play again' : 'Check!'}</button>
        <p className='question'>{innertext}</p>
      </main>
    )
  
  }
  