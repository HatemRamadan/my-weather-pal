import React, { Component } from "react";
import './searchResult.css';

class SearchResult extends Component{
    constructor(props){
        super(props);
    }
    state={
    }

    render(){
        var jsx;

        if(this.props.city.cityName){
            jsx=(
                <div className="badge badge-primary"> 
                    <div className="detail">{this.props.city.cityName+", "+this.props.city.country}</div>
                    <div className="detail">{this.props.city.degree+" "+this.props.city.unit}</div>
                    <div className="detail">{this.props.city.condition}</div>
                </div>
            );
        }
        return(
            <h2 className="details">
                {jsx}
            </h2>

        );
    }
}
export default SearchResult;