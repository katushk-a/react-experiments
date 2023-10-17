import React from 'react';
import ReactDOM from 'react-dom';
import me from './img/me.jpg';

class Header extends React.Component{
  render(){
    return(
      <div>
        <img src={this.props.src} alt='image' width={this.props.width} heigt={this.props.height}/>
        <h1>Laura Smith</h1>
        <h2>Front-End Developer</h2>
      </div>
    )
  }
}

class MainFirst extends React.Component{
  constructor(props){
    super(props);
    this.state = {clicked: false}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.handleClick();
  }
  render(){
    return(
      <div>
        <Header src={me} width='200px' height='200px'/>
        <button onClick={this.handleClick}>Send a message</button>
      </div>
    )
  }
}

class MessageForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    if(e.target.name=='name'){
      this.setState({
        name: e.target.value
      });
    }else{
      this.setState({
        message: e.target.value
      });
    }
  }
  handleSubmit(e){
    e.preventDefault();
    let name = this.state.name;
    let message = this.state.message;
    this.props.handleSubmit(name, message);
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Name:</label>
        <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
        <label>Message:</label>
        <input type='text' name='mes' value={this.state.message} onChange={this.handleChange}/>
        <input type='submit'/>
      </form>
    )
  }
}
class MessageList extends React.Component{
  render(){
    if(this.props.messages.length == 0){
      return null;
    }
    let messages = this.props.messages;
    let renderedmessages = messages.map((el) => 
    <li>Name: {el.name}; Message: {el.message}</li>);
    return(
      <div>
        <h2>Messages:</h2>
        <ul>
          {renderedmessages}
        </ul>
      </div>
    )
  }
}
export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {clicked: false,
    messages: new Array()};
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick(){
    let current = this.state.clicked;
    this.setState({
      clicked: !current
    });
  }
  handleSubmit(name, mes){
    let newmessages = [...this.state.messages, {name: name, message: mes}];
    this.setState({
      clicked: false,
      messages: newmessages
    });
  }
  render(){
    if(this.state.clicked){
      return(
        <div>
          <MessageForm handleSubmit={this.handleSubmit}/>
        </div>
      )
    }
    return(
      <div>
        <MainFirst handleClick={this.handleClick}/>
        <MessageList messages={this.state.messages}/>
      </div>
    )
  }
}
