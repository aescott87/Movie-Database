import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    this.props.dispatch({type: 'GET_MOVIES'})
  }

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <div className="app-header">
          <header>
            <h1>Movie Collection</h1>
          </header>
        </div>
        <div className="movies-list">
          <ul>
            {this.props.movies.map (item => (
              <li key={item.id}>
                <h2>{item.title}</h2>
                <img src={item.poster} alt={`Poster for ${item.title}`}/>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxStore) => ({
  movies: reduxStore.movies
  
})

export default connect(mapStateToProps)(App);
