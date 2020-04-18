import React, { Component } from 'react';
import '../App/App.css';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../Header/Header';

class Details extends Component {
    render() {
        return(
            <Header />
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    movies: reduxStore.movies
    
})

export default withRouter(connect(mapStateToProps)(Details));