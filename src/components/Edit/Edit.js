import React, { Component } from 'react';
import '../App/App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../Header/Header';

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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class Edit extends Component {

    //Set local state for movie ID, title, and description
    state = {
        id: this.props.match.params.id,
        title: this.props.details.title,
        description: this.props.details.description
    }

    //Load movie details on page load
    componentDidMount() {
        this.getDetails();
    }

    //Dispatch GET movie details to Saga
    getDetails = () => {
        this.props.dispatch({ type: 'GET_DETAILS', payload: { movie_id: this.props.match.params.id } })
    }

    //Handle state change for title/description
    handleChangeFor = (propertyName, event) => {
        this.setState({
            [propertyName]: event.target.value
        })
    }

    //Dispatch PUT Saga to update movie details
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('in handleSubmit');
        this.props.dispatch({ type: 'EDIT_MOVIE', payload: this.state })
        this.handleGoToDetails();
    }

    //Takes user back to Details page
    handleGoToDetails = (event) => {
        this.props.history.push(`/details/${this.state.id}`);
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Header />
                <div>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            Current Title: {this.props.details.title}
                        </Typography>
                        <Typography component="p">
                            Current Description: {this.props.details.description}
                        </Typography>
                    </Paper>
                </div>
                <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="outlined-name"
                        label="New Title"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={(event) => this.handleChangeFor('title', event)}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="New Description"
                        multiline
                        rowsMax="4"
                        value={this.state.description}
                        onChange={(event) => this.handleChangeFor('description', event)}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button variant="contained" className={classes.button} onClick={this.handleGoToDetails}>Cancel</Button>
                    <Button variant="contained" color="secondary" className={classes.button} type="submit">Save</Button>
                </form>
            </>
        )
    }
}

//Access to details Reducer
const mapStateToProps = (reduxStore) => ({
    details: reduxStore.details,
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Edit)));