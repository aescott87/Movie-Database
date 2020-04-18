import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../Header/Header';

class Edit extends Component {

    state = {
        id: this.props.match.params.id,
        title: this.props.details.title,
        description: this.props.details.description
    }

    componentDidMount() {
        this.getDetails();
    }

    getDetails = () => {
        this.props.dispatch({ type: 'GET_DETAILS', payload: { movie_id: this.props.match.params.id } })
    }

    handleChangeFor = (propertyName, event) => {
        this.setState({
                [propertyName]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('in handleSubmit');
        this.props.dispatch({type: 'EDIT_MOVIE', payload: this.state})
        this.handleGoToDetails();
    }

    handleGoToDetails = (event) => {
        this.props.history.push(`/details/${this.state.id}`);
    }

    render() {
        return(
            <>
            <Header />
            <h2>Current Title: {this.props.details.title}</h2>
            <p><b>Current Description:</b> {this.props.details.description}</p>
            <form onSubmit={this.handleSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={this.state.title} onChange={(event) => this.handleChangeFor('title', event)}/>
            <label>Description:</label>
            <textarea rows="4" cols="100" value={this.state.description} onChange={(event) => this.handleChangeFor('description', event)}></textarea>
            <button onClick={this.handleGoToDetails}>Cancel</button>
            <button type="submit">Save</button>
            </form>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    details: reduxStore.details,
})

export default withRouter(connect(mapStateToProps)(Edit));