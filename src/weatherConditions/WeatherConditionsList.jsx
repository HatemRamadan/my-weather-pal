import React, { Component } from "react";
import './WeatherConditionList.css';
import axios from 'axios';

class WeatherConditionList extends Component{
    constructor(props){
        super(props);
    }
    state={

    }
    render(){
       var jsx;
        if(this.props.cities.length>0){
            jsx= (<div className="slide-top">
            <h4 className="text-danger">
                Previous Locations
            </h4>
            {
                this.props.cities.map(city=>{
                    return(
                        <span className="m-2 badge badge-secondary" key={city.timestamp}>
                            <div className="city m-1">
                            {city.cityName+" "+city.degree+" "+city.unit}
                            </div>
                        </span>
                    );
                })
            }
        </div>);
        }

        return(
            <div className="weather-condition-list">
                {jsx}
            </div>            
            );
    }
}
export default WeatherConditionList;