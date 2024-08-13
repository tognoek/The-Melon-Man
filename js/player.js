game.player = {
		x: 54,
		y: 0,
		height: 24,
		highestY: 0,
		direction: "idle",
		vectorX: 1,
		isInAir: false,
		startedJump: false,
		countJump: 0,
		moveInterval: null,
		fallTimeout: function(startingY, time, maxHeight) {
			setTimeout( function () {
				if (this.isInAir) {
					if (this.countJump == 2){
						time = 0;
						startingY = this.y
						this.countJump = -1
					}
					this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2)
					game.player.animationFrameNumber++;
					if (game.player.animationFrameNumber >= game.player.animations['doublejump'] * game.textures["doublejump"].ratioFrame){
						game.player.direction = "jump";
						game.player.animationFrameNumber = 0;
					}
					if (this.y < this.highestY) {
						this.highestY = this.y
					}
					if (time > 37) {
						this.startedJump = false
						game.player.direction = "fall"
						game.checkCollisions()
					}
					if (time < 150) {
						time++
						this.fallTimeout(startingY, time, maxHeight)
					} else {
						game.isOver = true
					}
					if (this.y > 40) {
						game.isOver = true
					}
					game.requestRedraw()
				}
			}.bind(this, startingY, time, maxHeight), 12)
		},
		animationFrameNumber: 0,
		collidesWithGround: true,
		animations: {
			// Describe coordinates of consecutive animation frames of objects in textures
			run: 12,
			idle: 11,
			jump: 1,
			doublejump: 6,
			fall : 1	
		},
		jump: function (type) {
			if (!this.isInAir) {
				game.player.direction = "jump";
				game.player.animationFrameNumber = 0;
				clearInterval(this.fallInterval)
				game.sounds.jump.play()
				this.isInAir = true
				this.startedJump = true
				var startingY = this.y
				var time = 1
				maxHeight = 121
				if (type == "fall") {
					time = 30
					maxHeight = 0
				}else{
					if (this.countJump == 0) {
						this.countJump = 1
					}
				}
				this.fallTimeout(startingY, time, maxHeight)
			}else{
				if (this.countJump == 1 && type == undefined){
					this.countJump = 2
					game.player.direction = "doublejump";
					game.player.animationFrameNumber = 0;
				}
			}
		}
	}

	function loop() {
		if (game.player.direction == "idle"){
			game.player.animationFrameNumber++
			game.requestRedraw()
		}
		game.offset++
	}
	
	setInterval(loop, 60);
