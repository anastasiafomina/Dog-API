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
          imgLoading: false,
          imgUrl: data.message
        })
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

        {this.state.imgLoading ? <p>Loading...</p> : (
        <img
          alt='dog'
          src={this.state.imgUrl}
          className="dogImage"
        />
        )}
      
      </div>
    );
  }
}

export default App;