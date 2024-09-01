// Functions responsible for keyboard events handling
game.moveLeft = function () {
	if (game.isOver) return
	game.player.vectorX = -1
	game.clearMoveIntervals()
	game.player.moveLeftInterval = setInterval(function () {
		if (game.player.direction == "idle") {
			game.player.direction = "run";
			game.player.animationFrameNumber = 0;
		}
		for (var i = 1; i < 60; i++) {
			setTimeout(function () {
				// Player can't move faster if there's friction from the ground
				if (game.player.isInAir) {
					game.player.x -= 0.2
				} else {
					game.randomElement(game.sounds.run).play()
					game.player.x -= 0.1
				}
				game.requestRedraw()
				if (!game.checkCollisions()) {
					// Player should fall
					game.player.jump("fall")
				}
			}, 3 * i)
		}
		game.player.animationFrameNumber++
	}, 60)
}

game.moveRight = function () {
	if (game.isOver) return
	game.player.vectorX = 1
	game.clearMoveIntervals()
	game.player.moveRightInterval = setInterval(function () {
		if (game.player.direction == "idle") {
			game.player.direction = "run";
			game.player.animationFrameNumber = 0;
		}
		for (var i = 1; i < 60; i++) {
			setTimeout(function () {
				if (game.player.isInAir) {
					game.player.x += 0.2
				} else {
					game.randomElement(game.sounds.run).play()
					game.player.x += 0.1
				}
				game.requestRedraw()
				if (!game.checkCollisions()) {
					game.player.jump("fall")
				}
			}.bind(game), 3 * i)
		}
		game.player.animationFrameNumber++
	}, 60)
}

game.clearMoveIntervals = function () {
	clearInterval(game.player.moveLeftInterval)
	clearInterval(game.player.moveRightInterval)
}

game.keydown = function (event) {
	if (game.isOver) {
		if (event.keyCode == 82){
		    game.init(function () {
                game.reset();
                game.generateMap();
                game.requestRedraw();
            });
			game.isOver = false;
		}
		return
	};
	if (!game.pressedKeys[event.keyCode]) { // Prevent key repeating
		switch (event.keyCode) {
			case 65:
			case 37:
				game.moveLeft()
				break
			case 68:
			case 39:
				game.moveRight()
				break
			case 32:
				game.player.jump()
				break
		}
		game.pressedKeys[event.keyCode] = true
	}
}

game.keyup = function (event) {
	game.pressedKeys[event.keyCode] = false
	switch (event.keyCode) {
		case 65:
		case 37:
			clearInterval(game.player.moveLeftInterval)
			game.player.direction = "idle";
			game.player.animationFrameNumber = 0;
			break
		case 68:
		case 39:
			clearInterval(game.player.moveRightInterval)
			game.player.direction = "idle";
			game.player.animationFrameNumber = 0;
			break
	}
}
