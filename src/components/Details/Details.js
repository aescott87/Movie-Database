import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../Header/Header';

class Details extends Component {

    //GET movie details and genres on page load
    componentDidMount() {
        this.getDetails();
        this.getGenres();
    }

    //Dispatch GET request to Saga for movie details
    getDetails = () => {
        this.props.dispatch({ type: 'GET_DETAILS', payload: { movie_id: this.props.match.params.id } })
    }

    //Dispatch GET request to Saga for genres
    getGenres = () => {
        this.props.dispatch({ type: 'GET_GENRES', payload: { movie_id: this.props.match.params.id } });
    }

    //Takes user to home page
    handleGoHome = () => {
        this.props.history.push('/');
    }

    //Takes user to Edit page for selected film
    handleGoToEdit = (id) => {
        this.props.history.push(`/edit/${id}`)
    }

    render() {
        //Set variable for ID param
        const id = this.props.match.params.id;
        return (
            <>
                <Header />
                <h2>
                    {this.props.details.title}
                </h2>
                <p>
                    {this.props.details.description}
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

//Connect to details and genres Reducers
const mapStateToProps = (reduxStore) => ({
    details: reduxStore.details,
    genres: reduxStore.genres
})

export default withRouter(connect(mapStateToProps)(Details));