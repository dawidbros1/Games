class Rock {
    constructor(size) {
        this.position = new Vector2(0, 0);
        this.size = size;
        this.image = new Image();
        this.image.src = "img/rock.png";
    }

    setPosition(cw, ch) {

        var x = Math.floor(Math.random() * (cw / this.size)) * this.size;
        var y = Math.floor(Math.random() * (ch / this.size)) * this.size;

        while (x == 0 && y == 0) {
            x = Math.floor(Math.random() * (cw / this.size)) * this.size;
            y = Math.floor(Math.random() * (ch / this.size)) * this.size;
        }

        this.position.x = x;
        this.position.y = y;
    }

    update(map) {
        this.draw(map);
    }

    draw(map) {
        map.ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
}