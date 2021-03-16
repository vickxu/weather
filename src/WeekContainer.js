import React from 'react';
import Card from './Card';
//import DegreeToggle from './DegreeToggle';
import apiConfig from './apiKeys';


class WeekContainer extends React.Component {
  state = {
    days: [],
    location: "zip=06902",
    country: "us",
    degreeType: "metric"
  }

  componentDidMount = () => {
    //const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?${this.state.location},${this.state.country}&units=${this.state.degreeType}&APPID=${apiConfig.owmKey}`
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?${this.state.location},${this.state.country}&units=${this.state.degreeType}&APPID=${apiConfig.owmKey}`
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      console.log("Data List Loaded", data.list)
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({days: dailyData})
    })
  }

  formatCards = () => {
    return this.state.days.map((day, index) => <Card day={day} key={index}/>)
  }

  updateForecastDegree = newDegreeType => {
    this.setState({
      degreeType: newDegreeType
    }, this.sendNewFetch)
  }

  sendNewFetch = () => {
    //const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?${this.state.location},${this.state.country}&units=${this.state.degreeType}&APPID=${apiConfig.owmKey}`
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast/daily?q=Stamford&APPID=4b6f1c6a5629ab7589930bd889ecd5c8`

    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      console.log("Data List Loaded", data.list)
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({days: dailyData})
    })
  }

  render() {
    return (
      <div className="container">
      <h1 className="display-1 jumbotron">5-Day Forecast</h1>
      <h5 className="display-5 text-muted">Stamford, CT</h5>
        <div className="row justify-content-center">

          {this.formatCards()}

        </div>
      </div>
    )
  }
}

export default WeekContainer
