class Main {
    constructor() {
        this.mapWidth = $('#container').width();
        this.mapHeight = 800;

        this.endGameStatsWrapper = document.getElementById('endGameStats');
        this.endGameTimeWrapper = document.getElementById('time-value');
        this.newGameButton = document.getElementById('newGame');

        this.map = new Map(this.mapWidth, this.mapHeight);
        this.bird = new Bird(40);
        this.walls = new Array();

        this.wallSize = 100;
        this.maxHeight = (this.mapHeight / this.wallSize) - 3;


        this.gameTimer = 0;
        this.gameTimerWrapper = document.getElementById('gameTimer');

        this.lastUpdate = Date.now();
        this.refreshTime = 1000 / 60;
        this.timer = 0;
        this.onInit();
    }

    onInit() {
        self = this;

        this.myInterval = setInterval(function () {
            self.tick();
        }, 0);

        this.timerGo();
        this.addWallInit();

        this.newGameButton.addEventListener('click', function () {
            window.location.reload(true);
        })
    }


    timerGo() {
        this.myGameTimer = setInterval(() => {
            this.gameTimer++;
            this.gameTimerWrapper.innerHTML = this.gameTimer;
        }, 1000)
    }

    addWallInit() {
        this.addWallInterwal = setInterval(() => {
            var wallHeight = Math.floor(Math.random() * 4) + 1


            this.walls[this.walls.length] = new Wall(this.wallSize, this.mapWidth + 100, 0, wallHeight);
            this.walls[this.walls.length] = new Wall(this.wallSize, this.mapWidth + 100, this.mapHeight - this.wallSize, this.maxHeight - wallHeight);

        }, 700)
    }

    tick() {
        var now = Date.now();
        var dt = now - this.lastUpdate;
        this.lastUpdate = now;

        this.timer += dt;

        if (this.timer > this.refreshTime) {
            this.timer = 0;
            this.update();
        }
    }

    update() {
        this.map.update();

        if (this.walls.length > 0) {
            this.colideBirdWithWalls();
            this.walls.forEach((wall, key) => {
                if (wall.position.x < - 15 * wall.size) {
                    main.walls.splice(key, 1)
                }
                else {
                    wall.update(this.map);
                }
            });
        }

        this.bird.update(this.map);
    }

    colideBirdWithWalls() {
        var A = this.bird;

        for (var i = 0; i < this.walls.length; i++) {
            var B = this.walls[i];
            if (A.position.x < B.position.x + B.size && A.position.x + A.size > B.position.x && A.position.y < B.position.y + B.size * B.height && A.position.y + A.size > B.position.y) {
                this.endGame()
            }

            if (A.position.x < B.position.x + B.size && A.position.x + A.size > B.position.x && A.position.y < B.position.y + B.size && A.position.y + A.size > B.position.y - B.height * B.size) {
                this.endGame()
            }
        }

        if (this.bird.position.y > this.mapHeight) {
            this.endGame();
        }

    }

    endGame() {
        clearInterval(this.myInterval);
        clearInterval(this.myGameTimer);
        clearInterval(this.addWallInterwal);
        this.endGameStatsWrapper.classList.remove('none');
        this.endGameTimeWrapper.innerHTML = this.gameTimer;
    }
}

var main = new Main();