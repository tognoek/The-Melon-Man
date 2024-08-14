// Functions responsible for drawing on canvas

game.drawTile = function (tileColumn, tileRow, x, y) {
	game.context.drawImage(
		game.content,
		tileColumn * game.options.maptileWidth,
		tileRow * game.options.maptileHeight,
		game.options.maptileWidth,
		game.options.maptileHeight,
		x * game.options.tileWidth - Math.round(game.player.x) + Math.round(game.options.canvasWidth / 2 + game.options.tileWidth / 2),
		y * game.options.tileHeight - Math.round(game.player.y) + Math.round(game.options.canvasHeight / 2 + game.options.tileHeight / 2),
		game.options.tileWidth,
		game.options.tileHeight
	)
}

game.drawStructure = function (name, x, y) {
	var widthElement = game.options.maptileWidth * 3;
	var heighthElement = game.options.maptileHeight * 2; 
	for (var i = 0; i < 7; i++){
		var widthLava = Math.floor(Math.random() * 4) - 4;
		while (widthLava < game.options.canvasWidth) {
			game.context.drawImage(
				game.content,
				game.structures["lava"][0].tileColumn *  game.options.maptileWidth,
				game.structures["lava"][0].tileRow * game.options.maptileHeight,
				widthElement,
				heighthElement,
				widthLava,
				game.options.canvasHeight - heighthElement - game.yLava + i * heighthElement / 2,
				widthElement,
				heighthElement
			)
			widthLava += widthElement;
		}
	}
	var structure = game.structures[name]
	for (var i = 0; i < structure.length; i++) {
		game.drawTile(structure[i].tileColumn, structure[i].tileRow, structure[i].x + x, structure[i].y + y)
	}
}

game.drawPlayer = function () {
	// actualPlayerTile = game.player.animations[game.player.direction][game.player.animationFrameNumber % 4]
	game.player.animationFrameNumber = game.player.animationFrameNumber % Math.floor(game.player.animations[game.player.direction] * game.textures[game.player.direction].ratioFrame)
	if (game.textures[game.player.direction].loaded) {
		game.context.save();
		game.context.scale(game.player.vectorX, 1);
		if (game.player.vectorX < 0){
			game.context.translate(-game.options.canvasWidth, 0);
		}
		game.context.drawImage(
			game.textures[game.player.direction].image,
			Math.floor(game.player.animationFrameNumber / game.textures[game.player.direction].ratioFrame) * game.options.tileWidth,
			0 * game.options.tileHeight,
			game.options.tileWidth,
			game.options.tileHeight,
			Math.round(game.options.canvasWidth / 2 - game.options.tileWidth / 2),
			Math.round(game.options.canvasHeight / 2 - game.options.tileHeight / 2),
			game.options.tileWidth,
			game.options.tileHeight
		)
		game.context.restore();
	}
}

game.redraw = function () {
	game.drawPending = false

	game.context.fillRect(0, 0, game.canvas.width, game.canvas.height)

	// Draw the background
	if (game.backgrounds['sky'].loaded) {
		var width = game.backgrounds['sky'].image.width
		var height = game.backgrounds['sky'].image.height
		game.offset = game.offset % width
		// console.log(width)
		for (var i = 0; i < 5; i++){
			for (var t = 0; t < 5; t++){
				game.context.drawImage(game.backgrounds['sky'].image, i * width - game.offset, t * height)
			}
		}
		// var pattern = game.context.createPattern(game.backgrounds['sky'].image, 'repeat')
		// game.context.fillStyle = pattern
	} else {
		game.context.fillStyle = "#78c5ff"
	}

	if (game.backgrounds['trees'].loaded) {
		game.context.drawImage(game.backgrounds['trees'].image, 0, game.canvas.height / 2 - game.player.y / 10, 332, 180)
		game.context.drawImage(game.backgrounds['trees'].image, 332, game.canvas.height / 2 - game.player.y / 10, 332, 180)
	}

	// List nearest structures
	var structuresToDraw = []
	var drawing_distance = 15
	for (var i = 0; i < game.map.structures.length; i++) {
		if (
			game.map.structures[i].x > (game.player.x / game.options.tileWidth) - drawing_distance
			&& game.map.structures[i].x < (game.player.x / game.options.tileWidth) + drawing_distance
			&& game.map.structures[i].y > (game.player.y / game.options.tileHeight) - drawing_distance
			&& game.map.structures[i].y < (game.player.y / game.options.tileHeight) + drawing_distance
		) {
			structuresToDraw.push(game.map.structures[i])
		}
	}
	for (var i = 0; i < game.traps.structures.length; i++) {
		structuresToDraw.push(game.traps.structures[i])
	}
	// Draw them
	for (var i = 0; i < structuresToDraw.length; i++) {
		// console.log(structuresToDraw[i].name, structuresToDraw[i].x, structuresToDraw[i].y)
		game.drawStructure(structuresToDraw[i].name, structuresToDraw[i].x, structuresToDraw[i].y)
	}

	// Draw the player
	game.drawPlayer()
	game.currentPoint.innerHTML = "Current points: " + Math.round(-game.player.y / (3 * game.options.tileHeight))
	game.points = Math.round(-game.player.highestY / (3 * game.options.tileHeight))
	game.point.innerHTML = "Points: " + game.points
	game.numberMaxPoint = Math.max(game.numberMaxPoint, Math.round(-game.player.highestY / (3 * game.options.tileHeight)))
	game.maxPoint.innerHTML = "Max points: " + game.numberMaxPoint
	document.cookie = "numberMaxPoint=" + game.numberMaxPoint
	game.counter.innerHTML = "A game by Karol Swierczek | Controls: A, D / arrows and SPACE | Points: " + Math.round(-game.player.highestY / (3 * game.options.tileHeight)), game.canvas.width - 50, game.canvas.height - 12
}

game.requestRedraw = function () {
	if (!game.drawPending && !game.isOver) {
		game.drawPending = true
		requestAnimationFrame(game.redraw)
	}

	if (game.isOver) {
		clearInterval(this.player.fallInterval)
		game.context.font = "30px superscript"
		game.context.textAlign = "center"
		game.context.fillStyle = "black"
		game.context.fillText("Game over!", game.canvas.width / 2, game.canvas.height / 2)
		game.context.font = "15px Georgia"
		game.context.fillText("(Refresh the page to restart)", game.canvas.width / 2, game.canvas.height / 2 + 50)
	}
}
