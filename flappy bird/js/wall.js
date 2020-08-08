class Wall {
    constructor(size, x, y, height) {
        this.size = size;
        this.position = new Vector2(x, y);
        this.height = height;
        this.onInit();

        this.img = new Image();
        this.img.src = "img/rura.jpg";

        this.img2 = new Image();
        this.img2.src = "img/rura2.jpg";
    }

    onInit() {
        this.move();
    }

    move() {
        this.moveInterval = setInterval(() => {
            this.position.x -= 5;
        }, 10)
    }

    update(map) {
        this.draw(map);
    }

    draw(map) {
        if (this.position.y != 0) {
            map.ctx.drawImage(this.img, this.position.x, this.position.y - this.size * this.height, this.size, this.size * this.height + this.size) // Dół
        }
        else {
            map.ctx.drawImage(this.img2, this.position.x, this.position.y, this.size, this.size * this.height) // Góra
        }
    }
}