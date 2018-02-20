import React, { Component } from 'react';
import robotImg from './assets/robot.png';
import tileImg from './assets/mars-surface-tile.gif';

import * as PIXI from 'pixi.js';
import {
  Sprite,
  Stage,
  Text,
  TilingSprite,
} from 'react-pixi-fiber';

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
    const {
      left,
      right,
      up,
      down
    } = this.props.keys;

    if (left || right || up || down) {
      this.setState(
        (state) => {
          const timeDifference = time - state.lastAnimationTimestamp;
          const distanceDifference = ROBOT_SPEED * timeDifference;
          const newX = Math.round(
            state.robot.x +
            (right ? 1 : 0) * distanceDifference +
            (left ? -1 : 0) * distanceDifference
          );
          const newY = Math.round(
            state.robot.y +
            (down ? 1 : 0) * distanceDifference +
            (up ? -1 : 0) * distanceDifference              
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
    } else {
      this.setState(
        (state) => {
          const timeDifference = time - state.lastAnimationTimestamp;
          const newFramerate = Math.round(1000/timeDifference);
          return {
            ...state,
            animationRequestID: requestAnimationFrame(this.animationCallback),
            currentFramerate: newFramerate,
            lastAnimationTimestamp: time,
          };
        }
      );
    }
  }

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      animationRequestID: requestAnimationFrame(this.animationCallback),
    }))
  }

  render() {
    const {
      left,
      right,
      up,
      down
    } = this.props.keys;
    
    const text = `Current framerate: ${this.state.currentFramerate} fps`;
    return (
      <div>
        <Stage width={900} height={600}>
          <TilingSprite texture={PIXI.Texture.fromImage(tileImg)} width={900} height={600} key="tile" />
          <Text text={text} x={10} y={10} key="2" />
          <Text text={`${up ? 'up' : ''}`} x={10} y={40} anchor={new PIXI.Point(0,0)} key="3" />
          <Text text={`${down ? 'down' : ''}`} x={10} y={70} anchor={new PIXI.Point(0,0)} key="4" />
          <Text text={`${left ? 'left' : ''}`} x={10} y={100} anchor={new PIXI.Point(0,0)} key="5" />
          <Text text={`${right ? 'right' : ''}`} x={10} y={130} anchor={new PIXI.Point(0,0)} key="6" />
          <Sprite texture={PIXI.Texture.fromImage(robotImg)} scale={0.5} x={this.state.robot.x} y={this.state.robot.y} anchor={new PIXI.Point(0.5,0.5)} key="robot" />
        </Stage>
      </div>
    );
  }
}

export default MapStage;
