import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

class Header extends React.Component{
  render(){
    return(
      <div className='header'>
        <h2 className='header--title'>Meme Generator</h2>
      </div>
    )
  }
}

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      topvalue: 'Shut up',
      bottomvalue: 'And take my money',
      memeImage: "http://i.imgflip.com/1bij.jpg",
      memesData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.getMemes = this.getMemes.bind(this);
  }
  async getMemes(){
    let memes = await fetch('https://api.imgflip.com/get_memes');
    memes = await memes.json();
    this.setState({memesData: memes.data.memes});
  }
  componentDidMount(){
    this.getMemes();
  }
  componentDidUpdate(){
    this.getMemes();
  }
  handleChange(e){
    if(e.target.name == 'toptext'){
      this.setState({
        topvalue: e.target.value
      });
    }else{
      this.setState({
        bottomvalue: e.target.value
      });
    }
  }
  changeImage(){
    let memes=this.state.memesData;
    let randomImage = memes[Math.floor(Math.random() * memes.length)].url;
    this.setState({
      memeImage: randomImage
    });
  }
  render(){
    return(
      <div className='form'>
        <input className='form--input' name='toptext' type='text' placeholder='Shut up' onChange={this.handleChange} value={this.state.topvalue}/>
        <input className='form--input' name='bottomtext' type='text' placeholder='And take my money' onChange={this.handleChange} value={this.state.bottomvalue}/>
        <button className='form--button' onClick={this.changeImage}>Get a new meme image</button>
        <div className='meme'>
        <img src={this.state.memeImage} className="meme--image" />
        <p className='meme--text top'>{this.state.topvalue}</p>
        <p className='meme--text bottom'>{this.state.bottomvalue}</p>
        </div>
      </div>
    )
  }
}


export default class App extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        <Form/>
      </div>
    )
  }
}
/*
ReactDOM.render(
 <App/>,
  document.getElementById('root')
);*/