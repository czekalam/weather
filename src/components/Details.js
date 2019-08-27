import React, { Component } from 'react';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import '../style/Result.css';
import Graph from './Graph';
import Weather from './Weather';
import { withRouter } from "react-router-dom";

class Details extends Component {
    constructor(props) {
        super(props);
        this.state={
            forecast:null
        }
    }
    componentDidMount() {
        var keyword = this.props.match.params.city;
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${keyword}&appid=10eef0d5859a79e048209ecd86701ac1`)
            .then(res=> res.json())
            .then(data=> this.setState({forecast:data}))
            .catch(err=>console.log(err));
    }
    render() { 
        var forecast = this.state.forecast;
        return (
            <div className='days'>
                <Weather keyword={this.props.match.params.city}/>
                {forecast?
                <Graph days={forecast.list}/>
                :''} 
            </div>
        );
    }
}
export default withRouter(Details);
const mapDispatchToProps = {};
const mapStateToProps = state => {
    return {
        items: state.items
    };
};
export const DetailsContainer = connect(mapStateToProps, mapDispatchToProps)(geolocated()(Details));