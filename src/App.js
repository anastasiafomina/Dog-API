import React, { Component } from 'react';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      imgUrl: '',
      imgLoading: false
    }
  }

  getRandomDog = () => {
    this.setState({
      imgLoading: true
    }, () => {
      fetch('https://dog.ceo/api/breeds/image/random')
      .then((result) => {
        return result.json()
      })
      .then((data) => {
        this.setState({
          imgUrl: data.message
        })
      })
    })
  }

  componentDidMount() {
    this.getRandomDog()
  }

  onLoad = () => {
    this.setState({ imgLoading: false })
  }
  
  render() {

    const text = this.state.imgLoading ? "Loading..." : "Get random dog"

    return (
      <div className="container">
        <button 
          onClick={this.getRandomDog}
          className="generateButton"
          disabled={this.state.imgLoading}>
            {text}
        </button>

        <img
          alt='dog'
          src={this.state.imgUrl}
          onLoad={this.onLoad}
          className="dogImage"
        />
      
      </div>
    );
  }
}

export default App;