import * as React from 'react';
import './App.css';
import WeatherList from './components/WeatherList/WeatherList';

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <WeatherList />
      </div>
    );
  }
}

export default App;
