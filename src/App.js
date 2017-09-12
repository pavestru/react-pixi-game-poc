import React, { Component } from 'react';
import { HotKeys } from 'react-hotkeys';
import logo from './logo.svg';
import './App.css';
import MapStage from './MapStage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      keys: {
        up: false,
        down: false,
        left: false,
        right: false,
      }
    }
  }

  handleKeyDown = (event) => {
    event.preventDefault();
    switch (event.key) {
      case "ArrowDown":
        this.setState((state) => ({...state, keys: {...state.keys, down: true}}));
        break;
      case "ArrowUp":
        this.setState((state) => ({...state, keys: {...state.keys, up: true}}));
        break;
      case "ArrowLeft":
        this.setState((state) => ({...state, keys: {...state.keys, left: true}}));
        break;
      case "ArrowRight":
        this.setState((state) => ({...state, keys: {...state.keys, right: true}}));
        break;
      default:
    }
  }

  handleKeyUp = (event) => {
    event.preventDefault();
    switch (event.key) {
      case "ArrowDown":
        this.setState((state) => ({...state, keys: {...state.keys, down: false}}));
        break;
      case "ArrowUp":
        this.setState((state) => ({...state, keys: {...state.keys, up: false}}));
        break;
      case "ArrowLeft":
        this.setState((state) => ({...state, keys: {...state.keys, left: false}}));  
        break;
      case "ArrowRight":
        this.setState((state) => ({...state, keys: {...state.keys, right: false}}));
        break;
      default:
    }
  }

  componentDidMount() {
    this.wrapper.focus();
  }

  render() {
    const keyMap = {
      arrowKeyDown: {
        sequence: ['down', 'up', 'left', 'right'],
        action: 'keydown'
      },
      arrowKeyUp: {
        sequence: ['down', 'up', 'left', 'right'],
        action: 'keyup'
      },  
    }
    
    const handlers = {
      arrowKeyDown: this.handleKeyDown,
      arrowKeyUp: this.handleKeyUp
    };

    return (
      <HotKeys
        keyMap={keyMap}
        handlers={handlers}
      >
        <div
          tabIndex={0}
          ref={(wrapper) => { this.wrapper = wrapper; }}
          className="App"
        >
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React with Pixi.js (react-pixi)</h2>
          </div>
          <p className="App-intro">
            Use arrows on your keyboard to move the robot around.
          </p>
          <MapStage keys={this.state.keys}/>
        </div>
      </HotKeys>
    );
  }
}

export default App;
