import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../Header/Header';

class Details extends Component {

    componentDidMount() {
        this.getDetails();
        this.getGenres();
    }

    getDetails = () => {
        this.props.dispatch({ type: 'GET_DETAILS', payload: { movie_id: this.props.match.params.id } })
    }

    getGenres = () => {
        this.props.dispatch({ type: 'GET_GENRES', payload: { movie_id: this.props.match.params.id } });
    }

    handleGoHome = () => {
        this.props.history.push('/');
    }

    handleGoToEdit = (id) => {
        this.props.history.push(`/edit/${id}`)
    }

    render() {
        const id = this.props.match.params.id;

        return (
            <>
                <Header />
                <h2>
                    {this.props.movies.title}
                </h2>
                <p>
                    {this.props.movies.description}
                </p>
                <ul>
                    {this.props.genres.map((genre) => {
                        return (
                            <li key={genre.id}>{genre.name}</li>
                        )
                    })}
                </ul>
                <button onClick={this.handleGoHome}>Back</button>
                <button onClick={() => this.handleGoToEdit(id)}>Edit</button>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    movies: reduxStore.movies,
    genres: reduxStore.genres
})

export default withRouter(connect(mapStateToProps)(Details));