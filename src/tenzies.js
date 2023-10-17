import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

function Die(props){
  const styles = {
    backgroundColor: props.held ? "#59E391" : "white"
}
  return(
    <div className='dicepiece' onClick={props.hold} style={styles}>
      {props.value}
    </div>
  )
}

export default function App(){
  const [dices, setDice] = React.useState(allNewDices());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    let firstValue = dices[0].value;
    if(dices.every((el) => el.value==firstValue) && dices.every(el => el.held)){
      setTenzies(true);
    }
  }, [dices]);

  function randomDieValue(){
    return Math.ceil(Math.random() * 6);
  }
 
  function allNewDices(){
    let dices = [];
    for(let i = 0; i<10; i++){
      let newDice = {
        held: false,
        value: randomDieValue(),
        id: i + 1
      };
      dices.push(newDice);
    }
    return dices;
  }

  function holdDice(id){
    setDice(element => element.map((el) => {
      return  el.id == id ? {...el, held: true} : el
    } 
    ));
  }

  function RollUnholdDices(){
    if(!tenzies){
      setDice(element => element.map((el, i) => 
      el.held ? el :
         {value: randomDieValue(), held: false, id: i+ 1}
      ));
    }else{
      setDice(allNewDices());
      setTenzies(false);
    }
  }

  const diceElements = dices.map((el) =>
  <Die held={el.held} id={el.id} value={el.value} hold={() => holdDice(el.id)}/>
  );

  return(
      <main>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.</p>
        <div className='dices-container'>
          {diceElements}
        </div>
        <button className='dice-button' onClick={RollUnholdDices}>{tenzies ? 'Play again' : 'Roll the die'}</button>
      </main>
  )
}
