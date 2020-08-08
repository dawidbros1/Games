class Map {
    constructor(cw, ch) {
        this.cw = cw;
        this.ch = ch;

        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.cw;
        this.canvas.height = this.ch;

        // this.img = new Image();
        // this.img.src = "img/bgc.jpg";

    }

    update() {
        this.draw();
    }

    draw() {
        this.ctx.fillStyle = "lightgray";
        this.ctx.fillRect(0, 0, this.cw, this.ch)
    }
}