import React, { Component } from 'react';
import robotImg from './assets/robot.png';
import tileImg from './assets/mars-surface-tile.gif';

var ReactPIXI = require('react-pixi');
var PIXI = require('pixi.js');
var Text = ReactPIXI.Text;

var Stage = ReactPIXI.Stage;
var Sprite = ReactPIXI.Sprite;
var TilingSprite = ReactPIXI.TilingSprite;

class MapStage extends Component {
  constructor() {
    super();
    this.state = {
      robot: {
        x: 300,
        y: 100,
      }
    }
  }

  render() {
    const text = `Current framerate: ? fps`;
    return (
      <div>
        <Stage width={900} height={600}>
          <TilingSprite image={tileImg} width={900} height={600} key="tile" />
          <Text text={text} x={150} y={0} anchor={new PIXI.Point(0.5,0)} key="2" />
          <Sprite image={robotImg} scale={0.5} x={this.state.robot.x} y={this.state.robot.y} anchor={new PIXI.Point(0.5,0.5)} key="robot" />
        </Stage>
      </div>
    );
  }
}

export default MapStage;
