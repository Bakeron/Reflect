import { Game } from './game';
import 'bootstrap/dist/css/bootstrap.min.css';

const start = document.getElementById('start');

// Number of fields in Reflect 1-100, above 100 => 100
const size = 25;

start.addEventListener('click', () => setTimeout(() => new Game(size).startGame(), 1), false);
