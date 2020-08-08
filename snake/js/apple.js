class Apple {
    constructor(size, index) {
        this.position = new Vector2(0, 0);
        this.size = size;
        this.image = new Image();
        this.image.src = "img/apple.png";
        this.index = index;
    }

    setNewPosition(cw, ch, rocks, snake, apples) {

        var x = Math.floor(Math.random() * (cw / this.size)) * this.size;
        var y = Math.floor(Math.random() * (ch / this.size)) * this.size;

        for (var i = 0; i < rocks.length; i++) {
            while ((x == rocks[i].position.x && y == rocks[i].position.y) || (x == this.position.x && y == this.position.y) || (x == snake.head.x && y == snake.head.y) || this.selfCollision(x, y, apples)) {
                x = Math.floor(Math.random() * (cw / this.size)) * this.size;
                y = Math.floor(Math.random() * (ch / this.size)) * this.size;
            }
        }

        this.position.x = x;
        this.position.y = y;
    }

    selfCollision(x, y, apples) {

        for (var j = 0; j < apples.length; j++) {
            if (x == apples[j].position.x && y == apples[j].position.y && apples[j].index != this.index) {
                return true;
            }
        }
        return false;
    }

    update(map) {
        this.draw(map);
    }

    draw(map) {
        map.ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
}