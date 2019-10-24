import React, { Component } from "react";
import axios from 'axios';
import './searchComponent.css';
class SearchComponent extends Component{
    constructor(props){
        super(props);
    }
    state = {
        cities : [
            // {key:"123", name:"Cairo", country: "EG"}
        ],
    };
    getSuggestions = (e) => {
        if(e.target.value.length>0){
            
        const params = {
            apikey: "kzFGjGonADeGLw9okRVjkkua1AaYPc3H",
            q: e.target.value,
        };
        axios.get("https://dataservice.accuweather.com/locations/v1/cities/autocomplete",{params})
        .then(res => {
            var resultCities=[];
            res.data.forEach(element => {
                resultCities.push({
                    key:element.Key,
                    name:element.LocalizedName,
                    country:element.Country.ID
                });
            });
            this.setState({cities:resultCities});
          })
        }
        else{
            this.setState({cities:[]});
        }
    } 
   handleClick = () =>{
    document.getElementById("searchBar").value="";
    this.setState({cities:[]});
   }
    render(){
       
        return(
            <div className="search-component"><h1 className="title">
                <span className="text-success" >4 S</span> 
                <span className="text-warning">EA</span>
                <span className="text-danger">SO</span>
                <span className="text-primary">NS</span>
            </h1>
                <div className="search-bar">
                <input className="mb-3" id="searchBar" list="cities" placeholder="Search... " onChange={this.getSuggestions}></input>
                
                <div>
                {this.state.cities.map(city =>{
                        
                        return(
                            <span className="badge badge-primary m-2" style={{cursor: "pointer"}} key={city.key} value={city.key} onClick={(e)=>{this.handleClick();this.props.citySelected(e,city)}}>{city.name+", "+city.country}</span>
                        );
                    })}
                </div>
                </div>
            </div>
        );
    }
}
export default SearchComponent;