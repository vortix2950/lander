import './index.css';
import Terrain from './terrain';
import Ship from './ship';

var canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

var terrain = new Terrain(300, 300);
terrain.render(context);

var ship = new Ship(300, 300);
ship.render(context);
