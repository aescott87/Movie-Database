import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../Header/Header';

class Edit extends Component {

    state = {
        id: this.props.match.params.id,
        title: '',
        description: ''
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
    }

    render() {
        
        return(
            <>
            <Header />
            <h2>Current Title: {this.props.details.title}</h2>
            <p><b>Current Description:</b> {this.props.details.description}</p>
            <form onSubmit={this.handleSubmit}>
            <label>Title:</label>
            <input type="text" name="title" onChange={(event) => this.handleChangeFor('title', event)}/>
            <label>Description:</label>
            <textarea rows="4" cols="100" onChange={(event) => this.handleChangeFor('description', event)}></textarea>
            <button>Cancel</button>
            <button type="submit">Update</button>
            </form>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    details: reduxStore.details,
})

export default withRouter(connect(mapStateToProps)(Edit));