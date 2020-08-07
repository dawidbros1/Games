class Bird {
    constructor(size) {
        this.position = new Vector2(100, 375);
        this.size = size;

        this.jump = 2;
        this.jumpTimer = 0;
        this.jumpFPS = 50;
        this.jumpInterval = new Array();
        this.jumpCounter = 0;

        this.spaceBlock = false;
        this.blockFallDown = false;

        this.acceleration = 1;

        this.img = new Image();
        this.img.src = './img/flappy_bird.png';

        this.initMove();
        this.initFallDown();
    }

    initMove() {
        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 32:
                    {
                        var counter = this.jumpCounter;
                        this.jumpCounter++;

                        this.jumpInterval[counter] = setInterval(() => {
                            this.spaceBlock = true;
                            this.blockFallDown = true;
                            this.jumpTimer = this.jumpTimer + 1;

                            if (this.jumpTimer >= this.jumpFPS) {
                                clearInterval(this.jumpInterval[counter])
                                this.acceleration = 1;
                                this.jumpTimer = 0;
                                this.spaceBlock = false;
                                this.blockFallDown = false;
                            }


                            if (this.position.y > 0) {
                                this.position.y -= this.jump;
                            }

                        }, 0)

                        break;
                    }
            }
        })
    }

    initFallDown() {

        this.minus = false

        this.fallDownInterval = setInterval(() => {
            if (this.blockFallDown == false) {
                // if (this.position.y < 800 - this.size) {
                this.position.y += 0.8 * this.acceleration;
                // }
                this.acceleration = this.acceleration + 0.04;
            }
        }, 1)
    }

    update(map) {
        this.draw(map);
    }

    draw(map) {
        map.ctx.drawImage(this.img, this.position.x, this.position.y, this.size, this.size);
    }
}