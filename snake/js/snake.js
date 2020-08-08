class Snake {
    constructor(size) {
        this.positions = [];
        this.size = size;
        this.direction = 0;
        this.lastTail = new Vector2(0, 0)

        this.left = true;
        this.right = true;
        this.down = true;
        this.up = true;

        this.onInit();
    }

    reset() {
        this.positions = [];
        this.positions[0] = new Vector2(0, 0);
        this.head = this.positions[0];
        this.direction = 0;
        this.clearBlock();
    }

    onInit() {
        self = this;

        this.positions[0] = new Vector2(0, 0);
        this.head = this.positions[0];

        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 87: // W
                    {
                        if (this.up) {
                            this.direction = 87;
                        }

                        break;
                    }

                case 65: // A
                    {
                        if (this.left) {
                            this.direction = 65;
                        }

                        break;
                    }

                case 83: // S
                    {
                        if (this.down) {
                            this.direction = 83;
                        }

                        break;
                    }

                case 68: // D
                    {
                        if (this.right) {
                            this.direction = 68;
                        }

                        break;
                    }
                default: {
                    break;
                }
            }
        })
    }

    verticalBlock() {
        // if (this.positions.length > 1) {
        this.up = false;
        this.down = false;
        this.left = true;
        this.right = true;
        // }
    }

    levelBlock() {
        // if (this.positions.length > 1) {
        this.up = true;
        this.down = true;
        this.left = false;
        this.right = false;
        // }
    }

    clearBlock() {
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;
    }

    update(map) {
        this.move();
        this.draw(map);
    }

    draw(map) {

        for (var i = 1; i < this.positions.length; i++) {
            map.ctx.fillStyle = "orange";
            map.ctx.fillRect(this.positions[i].x, this.positions[i].y, this.size, this.size)

            map.ctx.fillStyle = "black";
            map.ctx.strokeRect(this.positions[i].x + 1, this.positions[i].y + 1, this.size - 2, this.size - 2)
        }

        map.ctx.fillStyle = "green";
        map.ctx.fillRect(this.positions[0].x, this.positions[0].y, this.size, this.size)

        map.ctx.strokeStyle = "black";
        map.ctx.strokeRect(this.positions[0].x + 1, this.positions[0].y + 1, this.size - 2, this.size - 2);


        // Game score //

        var shifter = 22;
        var checker = 10;

        while (checker <= this.positions.length - 1) {
            checker = checker * 10;
            shifter += 15;
        }

        map.ctx.font = "30px Arial";
        map.ctx.fillText((this.positions.length - 1), map.cw - shifter, 25);

    }

    move() {
        this.clonedArray = JSON.parse(JSON.stringify(this.positions))
        this.lastTail = this.clonedArray[this.positions.length - 1];

        switch (this.direction) {
            case 87: // W
                {
                    this.positions[0].y -= this.size;
                    this.verticalBlock();
                    break;
                }

            case 65: // A
                {
                    this.positions[0].x -= this.size;
                    this.levelBlock();
                    break;
                }

            case 83: // S
                {
                    this.positions[0].y += this.size;
                    this.verticalBlock();
                    break;
                }

            case 68: // D
                {
                    this.positions[0].x += this.size;
                    this.levelBlock();
                    break;
                }
            default: {
                break;
            }
        }

        for (var i = 1; i < this.positions.length; i++) {
            this.positions[i] = this.clonedArray[i - 1];
        }
    }

    addTail() {
        this.positions[this.positions.length] = new Vector2(this.head.x, this.head.y);
    }
}