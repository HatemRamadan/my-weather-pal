import React from 'react';
import axios from 'axios';
import SearchComponent from './search/SearchComponent';
import './App.css';
import { Component} from 'react';
import WeatherConditionList from './weatherConditions/WeatherConditionsList';
import * as firebase from "firebase/app";

import "firebase/firestore";
import SearchResult from './searchResult/searchResult';

const firebaseConfig = {
  apiKey: "AIzaSyBYvgGDiiLpVNiXHQnRbH1EZMatqbk30Zw",
  authDomain: "my-weather-pal-958c7.firebaseapp.com",
  databaseURL: "https://my-weather-pal-958c7.firebaseio.com",
  projectId: "my-weather-pal-958c7",
  storageBucket: "my-weather-pal-958c7.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class App extends Component {
  state={cities:[],selectedCity:{}};
  
  handleGetWeather =(e,city)=>{
    const params = {
      apikey: "kzFGjGonADeGLw9okRVjkkua1AaYPc3H",
  };
  axios.get("https://dataservice.accuweather.com/currentconditions/v1/"+city.key,{params})
  .then(res => {
    console.log(res.data[0]);
      const response = res.data[0];
      const degree = response.Temperature.Metric.Value;
      const	unit = response.Temperature.Metric.Unit;
      const condition = response.WeatherText;
      const cityName = city.name;
      const country = city.country;
      //TODO
      const newCity = {
        
          degree : degree,
          unit : unit,
          condition : condition,
          cityName : cityName,
          country : country,
          timestamp:Date.now()
        
      }
      db.collection("cities").add(newCity)
      .then(docRef=> {
        console.log("Document written with ID: ", docRef.id);
        this.state.cities.pop();
        this.state.cities.push();
        this.setState({cities:this.state.cities, selectedCity:newCity}) //TODO make sure it is working
        this.componentDidMount();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    })
  }
  
  componentDidMount (){
    db.collection("cities").orderBy('timestamp','desc').limit(5).get()
    .then(res=>{
      var resultCities=[];
      res.forEach(function(doc) {
          resultCities.push(doc.data());
          console.log(doc.id, " => ", doc.data());
      });
    this.setState({cities:resultCities});    
    })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
    
  }
  render(){
  return (
    <div className="App">
      <SearchComponent citySelected={this.handleGetWeather}></SearchComponent>
      <SearchResult city={this.state.selectedCity}></SearchResult>
      <WeatherConditionList cities={this.state.cities}></WeatherConditionList>
    </div>
  );
  }
}

export default App;
