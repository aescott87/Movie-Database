import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
//Import Components
import Header from '../Header/Header';
import { withRouter } from 'react-router';

class Home extends Component {

    componentDidMount() {
        this.getMovies();
    }

    getMovies = () => {
        this.props.dispatch({ type: 'GET_MOVIES' })
    }

    handleGoToDetails = (id) => {
        this.props.history.push(`/details/${id}`);
    }

    render() {
        return (
            <>
                <Header />
                <h2>Want to know more? Click the poster for details.</h2>
                <ul>
                    {this.props.movies.map(item => (
                        <li key={item.id}>
                            <h2>{item.title}</h2>
                            <img src={item.poster} alt={`Poster for ${item.title}`} 
                            onClick={() => this.handleGoToDetails(item.id)} />
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    movies: reduxStore.movies

})

export default withRouter(connect(mapStateToProps)(Home));