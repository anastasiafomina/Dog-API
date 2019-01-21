import React, { Component } from 'react';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      imgUrl: '',
      imgLoading: false,
      listAllBreeds: []
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

  getListAllBreeds = () => {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      const keys = Object.keys(data.message)

      this.setState({
        listAllBreeds: keys
      })
    })
  }

  renderBreedOption = (breed) => {
    return (
      <option>
        {breed}
      </option>
    )
  }

  componentDidMount() {
    this.getRandomDog()
    this.getListAllBreeds()
  }

  onLoad = () => {
    this.setState({ imgLoading: false })
  }
  
  render() {

    const text = this.state.imgLoading ? "Loading..." : "Get random dog"

    const allBreeds = this.state.listAllBreeds.map(this.renderBreedOption)

    return (
      <div className="container">

        <label htmlFor="selectBreed">Select dog breed</label>
        <select name="selectBreed">
          <option>All</option>
          {allBreeds}
        </select>

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