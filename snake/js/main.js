class Main {
    constructor(level) {

        // Start Basic
        this.level = level;
        var settings = getSettingsByLevel(this.level);

        this.size = settings.size;
        this.applesLimit = settings.applesLimit;
        this.rocksLimit = settings.rocksLimit;
        this.objectsSize = size / 1;
        this.mapWidth = 1400;
        this.mapHeight = 800;
        this.applesLimit = applesLimit;
        this.rocksLimit = rocksLimit
        // End Basic

        // Start Class
        this.map = new Map(this.mapWidth, this.mapHeight);
        this.snake = new Snake(this.objectsSize);
        this.apples = [];
        this.rocks = [];
        // End Class

        // Start Engine
        this.lastUpdate = Date.now();
        this.refreshTimeGlobal = 1000 / 60;
        this.globalTimer = 0;
        this.refreshMoveTimer = 1000 / 15;
        this.moveTimer = 0;
        // End Engine

        this.fullScoreWrapper = document.getElementById("full_score");
        this.scoreWrapper = document.getElementById("score_value")
        this.newGame = document.getElementById('newGame');
        this.levelWrapper = document.getElementById('level_value');

        this.onInit();
    }

    onInit() {
        window.addEventListener("keydown", (e) => {

            if (e.keyCode == 32) { // Reset mapy spacja
                this.reset();
                this.initialisation();
                this.snake.reset();

            }
        })

        window.addEventListener("keyup", (e) => {
            // Wyjście ESC
            if (e.keyCode == 27) {
                location.href = './index.html';
                this.fullScoreWrapper.style.display = "none";
                this.reset;
            }
        })

        this.newGame.addEventListener("click", (e) => {
            location.reload();
        })

        this.reset();
        this.initialisation();
    }

    reset() {
        clearInterval(this.myInterval);

        this.rocks = [];

        for (var i = 0; i < this.rocksLimit; i++) {
            this.rocks[i] = new Rock(this.objectsSize);
            this.rocks[i].setPosition(this.map.cw, this.map.ch);
        }

        this.apples = [];

        for (var i = 0; i < this.applesLimit; i++) {
            this.apples[i] = new Apple(this.objectsSize, i);
            this.apples[i].setNewPosition(this.map.cw, this.map.ch, this.rocks, this.snake, this.apples);
        }
    }

    initialisation() {
        self = this;
        this.myInterval = setInterval(function () {
            self.tick();
        }, 0);
    }

    tick() {
        var now = Date.now();
        var dt = now - this.lastUpdate;
        this.lastUpdate = now;

        this.globalTimer += dt;
        this.moveTimer += dt;

        if (this.globalTimer > this.refreshTimeGlobal) {
            this.globalTimer = 0;
            this.update();
        }

        if (this.moveTimer > this.refreshMoveTimer) {
            this.moveTimer = 0;
            this.snake.move(self.map); // Snake move
        }

    }

    update() {
        this.collideSnakeHeadAndSnakeTail(this.snake)
        this.collideSnakeAndApple(this.snake, this.apples, this.map, this.rocks);
        this.collideSnakeAndMap(this.snake, this.map);
        this.collideSnakeHeadAndRocks(this.snake, this.rocks);

        this.map.update();
        this.snake.draw(this.map);

        this.apples.forEach(apple => {
            apple.update(self.map);
        });

        this.rocks.forEach(rock => {
            rock.update(self.map);
        });
    }

    // ===================== //

    collideSnakeAndMap(snake, map) {
        if (snake.head.x < 0) { // Lewa strona
            snake.head.x = map.cw - snake.size;
        }
        else if (snake.head.x >= map.cw) { // Prawa strona
            snake.head.x = 0;
        }
        else if (snake.head.y < 0) { // Góra
            snake.head.y = map.ch - snake.size;
        }
        else if (snake.head.y >= map.ch) { // Dół
            snake.head.y = 0;
        }
    }


    collideSnakeAndApple(snake, apples, map, rocks) {
        var A = snake;
        for (var i = 0; i < apples.length; i++) {
            var B = apples[i];
            if (A.head.x < B.position.x + B.size && A.head.x + A.size > B.position.x && A.head.y < B.position.y + B.size && A.head.y + A.size > B.position.y) {
                apples[i].setNewPosition(map.cw, map.ch, rocks, snake, apples)
                console.log("Zjadłeś jabło");
                snake.addTail();
            }
        }
    }

    collideSnakeHeadAndSnakeTail(snake) {
        for (var i = 1; i < snake.positions.length - 1; i++) {
            if (snake.positions[i].x == snake.head.x && snake.positions[i].y == snake.head.y) {
                clearInterval(this.myInterval);
                console.log("jebłeś w ogon");
                this.endGame();
            }
        }
    }

    collideSnakeHeadAndRocks(snake, rocks) {
        var A = snake;
        for (var i = 0; i < rocks.length; i++) {
            var B = rocks[i];
            if (A.head.x < B.position.x + B.size && A.head.x + A.size > B.position.x && A.head.y < B.position.y + B.size && A.head.y + A.size > B.position.y) {
                clearInterval(this.myInterval);
                console.log("jebłeś w skałę");
                this.endGame();
            }
        }
    }

    endGame() {
        this.fullScoreWrapper.style.display = "block";
        this.scoreWrapper.innerHTML = this.snake.positions.length - 1;
        this.levelWrapper.innerHTML = this.level;
    }
}

// Wczytanie poziomu gry (Jego ustawień)

if (localStorage.getItem('level') != null) {
    var main = new Main(localStorage.getItem('level'));
} else {
    var main = new Main('medium');
}

// Inicjacja nowej gry

// var settings = getSettingsByLevel();
  // var settings = getSettingsByLevel('medium');

// var main = new Main(settings.size, settings.applesLimit, settings.rocksLimit);