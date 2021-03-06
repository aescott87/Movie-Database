import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import { HashRouter as Router } from 'react-router-dom';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

// Create the rootSaga generator function
function* rootSaga() {
yield takeEvery('GET_MOVIES', getMoviesSaga);
yield takeEvery('GET_DETAILS', getDetailsSaga);
yield takeEvery('GET_GENRES', getGenreSaga);
yield takeEvery('EDIT_MOVIE', updateMovieSaga);
}

//Saga for GET all movies request
function* getMoviesSaga(event) {
    console.log('in get movies saga');
    try {
    const response = yield axios.get('/movies');
    yield put ({type: 'SET_MOVIES', payload: response.data});
    }
    catch (error) {
        console.log('Error getting movies', error);
    }
}

//Saga for GET movie details request
function* getDetailsSaga(event) {
    console.log('in get details saga', event);
    try {
    const response = yield axios.get(`/movies/${event.payload.movie_id}`);
    yield put ({type: 'SET_DETAILS', payload: response.data});
    }
    catch (error) {
        console.log('Error getting movie details', error);
    } 
}

//Saga for GET request for specific movie's genres
function* getGenreSaga(event) {
    console.log('in get genres saga', event);
    try {
    const response = yield axios.get(`/genres/${event.payload.movie_id}`);
    yield put ({type: 'SET_GENRES', payload: response.data});
    }
    catch (error) {
        console.log('Error getting genres', error);
    }
}

//Saga for PUT request to update title and description
function* updateMovieSaga(event) {
    console.log('in update movie saga', event);
    try {
    const response = yield axios.put(`/movies/${event.payload.id}`, event.payload);
    yield put ({type: 'SET_DETAILS', payload: response.data});
    }
    catch (error) {
        console.log('Error getting genres', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

//Used to store title and description of specifc movie
const details = (state = [], action) => {
    switch(action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        details,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><Router><App /></Router></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
