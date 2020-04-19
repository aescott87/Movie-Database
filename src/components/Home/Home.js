import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
//Import Components
import Header from '../Header/Header';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: "block",
        maxWidth: 345,
    },
    media: {
        height: 500,
    },
};

class Home extends Component {

    //GET all movies on page load
    componentDidMount() {
        this.getMovies();
    }

    //Dispatch GET request to Saga
    getMovies = () => {
        this.props.dispatch({ type: 'GET_MOVIES' })
    }

    //Takes user to the details page for selected movie
    handleGoToDetails = (id) => {
        this.props.history.push(`/details/${id}`);
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Header />
                <h2>Want to know more? Click the poster for details.</h2>
                <div className="grid-container">
                    {this.props.movies.map((item) => {
                        return (
                            <Card key={item.id} className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        onClick={() => this.handleGoToDetails(item.id)}
                                        className={classes.media}
                                        image={item.poster}
                                        title={`Poster for ${item.title}`}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.title}
                                        </Typography>
                                        <Typography component="p">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })}
                </div>
            </>
        )
    }
}

//Connect to movies Reducer
const mapStateToProps = (reduxStore) => ({
    movies: reduxStore.movies
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)));