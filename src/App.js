import React, { Component } from 'react';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      imgUrl: '',
      imgLoading: false,
      listAllBreeds: [],
      selectedBreed: 'all'
    }
  }

  getRandomDog = () => {
    this.setState({
      imgLoading: true
    }, () => {
      fetch(this.state.selectedBreed === 'all' ? 'https://dog.ceo/api/breeds/image/random' 
        : `https://dog.ceo/api/breed/${this.state.selectedBreed}/images/random`
      )
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
      <option key={breed}>
        {breed}
      </option>
    )
  }

  setNewBreed = (e) => {
    this.setState({ 
      selectedBreed: e.target.value.toLowerCase()
    })
  }

  componentDidMount() {
    this.getRandomDog()
    this.getListAllBreeds()
  }

  onLoad = () => {
    this.setState({ imgLoading: false })
  }

  selectAllBreeds = () => {
    this.setState({ selectedBreed: 'all' })
  }
  
  render() {

    const text = this.state.imgLoading ? "Loading..." : "Get random dog"

    const allBreeds = this.state.listAllBreeds.map(this.renderBreedOption)

    return (
      <div className="container">

        <label htmlFor="selectBreed">Select dog breed</label>
        <select name="selectBreed" className="breedSelect" onChange={this.setNewBreed}>
          <option onClick={this.selectAllBreeds} key="all">All</option>
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