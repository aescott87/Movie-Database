import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../Header/Header';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

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
        const { classes } = this.props;
        return (
            <>
                <Header />
                <div>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            {this.props.details.title}
                        </Typography>
                        <Typography component="p">
                            {this.props.details.description}
                        </Typography>
                        <Typography component="ul">
                            {this.props.genres.map((genre) => {
                                return (
                                    <li key={genre.id}>{genre.name}</li>
                                )
                            })}
                        </Typography>
                    </Paper>
                </div>
                <Button variant="contained" className={classes.button} onClick={this.handleGoHome}>Back</Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleGoToEdit(id)}>Edit</Button>
            </>
        )
    }
}

//Connect to details and genres Reducers
const mapStateToProps = (reduxStore) => ({
    details: reduxStore.details,
    genres: reduxStore.genres
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Details)));