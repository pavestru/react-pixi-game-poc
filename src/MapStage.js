import React, { Component } from 'react';
import robotImg from './assets/robot.png';
import tileImg from './assets/mars-surface-tile.gif';

var ReactPIXI = require('react-pixi');
var PIXI = require('pixi.js');
var Text = ReactPIXI.Text;

var Stage = ReactPIXI.Stage;
var Sprite = ReactPIXI.Sprite;
var TilingSprite = ReactPIXI.TilingSprite;

const ROBOT_SPEED = 300/1000; // px per ms

class MapStage extends Component {
  constructor() {
    super();
    this.state = {
      lastAnimationTimestamp: null,
      robot: {
        x: 300,
        y: 200,
      },
      currentFramerate: 0,
      animationRequestID: null, // use it to cancel animation; not really necessary
    }
  }

  animationCallback = (time) => {
    this.setState(
      (state) => {
        const timeDifference = (time - state.lastAnimationTimestamp);
        const distanceDifference = ROBOT_SPEED * timeDifference;
        const newX = Math.round(
          state.robot.x +
          (this.props.keys.right ? 1 : 0) * distanceDifference +
          (this.props.keys.left ? -1 : 0) * distanceDifference
        );
        const newY = Math.round(
          state.robot.y +
          (this.props.keys.down ? 1 : 0) * distanceDifference +
          (this.props.keys.up ? -1 : 0) * distanceDifference              
        );
        const newFramerate = Math.round(1000/timeDifference);
        return {
          ...state,
          animationRequestID: requestAnimationFrame(this.animationCallback),
          robot: {
            ...state.robot,
            x: newX,
            y: newY,
          },
          currentFramerate: newFramerate,
          lastAnimationTimestamp: time,  
        }            
      }
    );
  }

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      animationRequestID: requestAnimationFrame(this.animationCallback),
    }))
  }

  render() {
    const text = `Current framerate: ${this.state.currentFramerate} fps`;
    return (
      <div>
        <Stage width={900} height={600}>
          <TilingSprite image={tileImg} width={900} height={600} key="tile" />
          <Text text={text} x={10} y={10} key="2" />
          <Text text={`${this.props.keys.up ? 'up' : ''}`} x={10} y={40} anchor={new PIXI.Point(0,0)} key="3" />
          <Text text={`${this.props.keys.down ? 'down' : ''}`} x={10} y={70} anchor={new PIXI.Point(0,0)} key="4" />
          <Text text={`${this.props.keys.left ? 'left' : ''}`} x={10} y={100} anchor={new PIXI.Point(0,0)} key="5" />
          <Text text={`${this.props.keys.right ? 'right' : ''}`} x={10} y={130} anchor={new PIXI.Point(0,0)} key="6" />
          <Sprite image={robotImg} scale={0.5} x={this.state.robot.x} y={this.state.robot.y} anchor={new PIXI.Point(0.5,0.5)} key="robot" />
        </Stage>
      </div>
    );
  }
}

export default MapStage;
