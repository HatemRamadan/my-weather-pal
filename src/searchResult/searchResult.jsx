import React, { Component } from "react";


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
                    <h2>{this.props.city.cityName+", "+this.props.city.country}</h2>
                    <h2>{this.props.city.degree+" "+this.props.city.unit}</h2>
                    <h2>{this.props.city.condition}</h2>
                </div>
            );
        }
        return(
            <h2>
                {jsx}
            </h2>

        );
    }
}
export default SearchResult;