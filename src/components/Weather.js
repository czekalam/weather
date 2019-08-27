import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun } from '@fortawesome/free-solid-svg-icons';
import '../style/Result.css';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            days:''
        }
    }
    filterResults = () => {
        var keyword = this.props.keyword;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=10eef0d5859a79e048209ecd86701ac1`)
            .then(res => res.json())
            .then(items => this.setState({
                result: items
            }))
            .catch(err => console.log(err));

        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${keyword}&appid=10eef0d5859a79e048209ecd86701ac1`)
            .then(res=> res.json())
            .then(items=> this.setState({days:items}))
            .catch(err=>console.log(err))
    }
    componentDidMount() {
        this.filterResults();
    }
    cloud = (result) => {
        if (result < 33) {
            return <FontAwesomeIcon icon={faSun} />;
        }
        else if (result< 66) {
            return <FontAwesomeIcon icon={faCloudSun} />;
        }
        else if (result <= 100) {
            return <FontAwesomeIcon icon={faCloud} />;
        }
        else {
            return '';
        }
    }
    wind = (wind) => {
        if (wind === 0) {
            return 'N';
        }
        else if (wind < 90) {
            return 'NE'
        }
        else if (wind === 90) {
            return 'E';
        }
        else if (wind < 180) {
            return 'SE';
        }
        else if (wind === 180) {
            return 'S';
        }
        else if (wind < 270) {
            return 'SW';
        }
        else if (wind === 270) {
            return 'W';
        }
        else if (wind < 360) {
            return 'NW'
        }
    }
    render() { 
        var result = this.state.result;
        console.log(result);
        return (
            <div className='result'>
                {result.cod === 200 ?
                    <div className='data'>
                        <p className='name'>{result.name}</p>
                        <p className="clouds"> {this.cloud(result.clouds.all)}</p>
                        <div className='temperature'>
                            <div className='average'>{Math.round(result.main.temp - 273.15)}°C</div>
                            <div className='maxmin'>
                                <div className='max'>max {Math.round(result.main.temp_max - 273.15)}°C</div>
                                <div className='min'>min {Math.round(result.main.temp_min - 273.15)}°C</div>
                            </div>
                        </div>
                        <p>Wind {result.wind.speed + "m/s " + this.wind(result.wind.deg)}</p>
                        <p>Coords {result.coord.lat + " " + result.coord.lon}</p>
                        <p>Humidity {result.main.humidity}%</p>
                        <p>Pressure {result.main.pressure}hPa</p>
                        <div className='suntime'>
                            <img alt="sunrise" src="https://img.icons8.com/color/48/000000/sunrise.png"></img>
                            {new Date(result.sys.sunrise * 1000).getHours()}:{new Date(result.sys.sunrise * 1000).getMinutes()}
                            <img alt="sunset" src="https://img.icons8.com/color/48/000000/sunset.png"></img>
                            {new Date(result.sys.sunset * 1000).getHours()}:{new Date(result.sys.sunset * 1000).getMinutes()}
                        </div>
                    </div>
                : ''}
            </div>
        );
    }
}
export default Weather;