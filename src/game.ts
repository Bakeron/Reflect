export class Game {

    constructor(size) {
        this.size = size;
    }

    startButton: HTMLElement = document.getElementById('start');
    resetButton: HTMLElement = document.getElementById('reset');
    message: HTMLElement = document.getElementById('message');
    game: HTMLElement = document.getElementById('game');
    life: HTMLElement = document.getElementById('life');
    points: HTMLElement = document.getElementById('points');
    time: HTMLElement = document.getElementById('time');

    size: number;
    select: any;
    state = {
        life: 3,
        points: 0,
        time: 60
    };
    
    startGame() {
        this.board();
        this.message.textContent = '';

        setInterval(() => {
            this.state.time--;
            this.time.textContent = this.state.time.toString();
            if (this.state.time === 0) {
                this.endGame(startGame);
            }
        }, 1000);

        const startGame = (event) => {
            if (event.srcElement.nodeName === "LI") {
                if (event.srcElement.classList[0] === 'select') {
                    this.goodSelect(event);
                } else {
                    this.badSelect(startGame);
                }
            }
        }

        this.resetButton.children[0].addEventListener('click', () => this.resetGame(startGame), false);
        this.startButton.children[0].setAttribute('disabled', 'true');
        this.greenOn(startGame);
        this.resetButton.children[0].removeAttribute('disabled');
        this.game.addEventListener('click', startGame, false);
    };

    board() {
        let board = this.game.classList;
        if (!this.game.children.length) {
            if      (this.size > 30) board.remove('col-sm-3','offset-sm-4')
            if      (this.size >= 100) this.size = 100;

            if      (this.size < 13) board.add('padding');
            else if (this.size > 60) board.add('col-sm-7', 'offset-sm-2');
            else if (this.size > 30) board.add('col-sm-5', 'offset-sm-3');

            for (let i = 0; i < this.size; i++) {
                this.game.appendChild(document.createElement("li")) 
            }
        }
    }
    
    greenOn(startGame) {
        const li = this.game.children;
        const greenOn = () => {
            const select = Math.floor(Math.random() * this.size);
            li[select].classList.add('select')
            this.select = li[select];

            setTimeout(() => {
                if (this.select.classList.contains('select')) {
                    this.badSelect(startGame)
                }
            }, 2000);

            setTimeout(greenOn, 3000)
        }
        setTimeout(greenOn, 3000);
    };

    badSelect(startGame) {
        this.state.life--;
        this.life.textContent = this.state.life.toString();
        this.select ? this.select.classList.remove('select') : null;

        if (this.state.life === 0) {
            this.endGame(startGame);
        } else {
            this.message.textContent = 'straciłeś życie';
            setTimeout(() => this.message.textContent = '', 2000);
        }
    }

    goodSelect(event) {
        this.state.points++;
        this.life.textContent = this.state.life.toString();
        this.points.textContent = this.state.points.toString();

        event.srcElement.classList.remove('select');
    };

    resetGame(startGame) {
        this.removeAllEvent(startGame);
        this.reset();
        setTimeout(() => this.startGame(), 1)
    };

    removeAllEvent(startGame) {
        this.game.removeEventListener('click', startGame);
        let id = window.setTimeout(function() {}, 0);
        while (id--) { window.clearTimeout(id); }
        for (let i = 0; i < this.size; i++) {
            this.game.children.item(i)
                .classList.remove('select')
        }
    };

    endGame(startGame) {
        this.message.textContent = `Koniec gry. Wynik: ${this.state.points}`;
        this.removeAllEvent(startGame)
        this.reset();
    }

    reset() {
        this.startButton.children[0].removeAttribute('disabled');

        this.state = {
            life: 3,
            points: 0,
            time: 60
        }

        this.life.textContent = this.state.life.toString();
        this.points.textContent = this.state.points.toString();
        this.time.textContent = this.state.time.toString();
    };
}
