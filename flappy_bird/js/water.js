class Water {
    constructor(maxWidth, maxHeight, size) {
        this.size = size;
        this.maxHeight = maxHeight;
        this.maxWidth = maxWidth;
    }

    update(map) {
        this.draw(map);
    }

    draw(map) {
        map.ctx.fillStyle = "lightblue";
        map.ctx.fillRect(0, this.maxHeight - this.size, this.maxWidth, this.size);
    }
}