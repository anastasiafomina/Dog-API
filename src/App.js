import React, { Component } from 'react';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      imgUrl: ''
    }
  }

  getRandomDog = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      this.setState({
        imgUrl: data.message
      })
    })
  }

  componentDidMount() {
    this.getRandomDog()
  }

  render() {
    return (
      <div className="container">
        <button 
          onClick={this.getRandomDog}
          className="generateButton">
            Get random dog
        </button>
        <img
          alt='dog'
          src={this.state.imgUrl}
          className="dogImage"
        >
        </img>
      </div>
    );
  }
}

export default App;