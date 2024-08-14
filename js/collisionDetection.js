game.collisionsDie = function () {
	if (game.isOver) return
	var watchTraps = []
	var bounds = 6
	for (var i = 0; i < game.traps.structures.length; i++) {
		if (
			game.traps.structures[i].x > (game.player.x / game.options.tileWidth) - bounds
			&& game.traps.structures[i].x < (game.player.x / game.options.tileWidth) + bounds
			&& game.traps.structures[i].y > (game.player.y / game.options.tileHeight) - bounds
			&& game.traps.structures[i].y < (game.player.y / game.options.tileHeight) + bounds
		) {
			watchTraps.push(game.traps.structures[i])
		}
	}
	// console.log(watchTraps.length)
	for (var i = 0; i < watchTraps.length; i++) {
		if (game.player.x / game.options.tileWidth - 0.3 >= watchTraps[i].x + 0.3
			&& game.player.x / game.options.tileWidth - 0.7 <= watchTraps[i].x  + 0.7
			&& game.player.y / game.options.tileHeight + 1 >= watchTraps[i].y + 1
			&& game.player.y / game.options.tileHeight <= watchTraps[i].y + 2) 
			{
				game.isOver = true
			}
		}
}
game.checkCollisions = function () {
	// List potentially collidable entities
	var watchTheseGuys = []
	var bounds = 6
	for (var i = 0; i < game.map.structures.length; i++) {
		if (
			game.map.structures[i].x > (game.player.x / game.options.tileWidth) - bounds
			&& game.map.structures[i].x < (game.player.x / game.options.tileWidth) + bounds
			&& game.map.structures[i].y > (game.player.y / game.options.tileHeight) - bounds
			&& game.map.structures[i].y < (game.player.y / game.options.tileHeight) + bounds
		) {
			watchTheseGuys.push(game.map.structures[i])
		}
	}

	// Now precisely check if there occurs any collision
	for (var i = 0; i < watchTheseGuys.length; i++) {
		for (var j = 0; j < game.structures[watchTheseGuys[i].name].length; j++) {
			if (
				game.player.x / game.options.tileWidth - 0.5 >= watchTheseGuys[i].x + game.structures[watchTheseGuys[i].name][j].x
				&& game.player.x / game.options.tileWidth - 0.5 <= watchTheseGuys[i].x + game.structures[watchTheseGuys[i].name][j].x + 1
				&& game.player.y / game.options.tileHeight < watchTheseGuys[i].y + game.structures[watchTheseGuys[i].name][j].y + 0.2
				&& game.player.y / game.options.tileHeight > watchTheseGuys[i].y + game.structures[watchTheseGuys[i].name][j].y - 0.2
				&& (game.structures[watchTheseGuys[i].name][j].collidable == undefined || game.structures[watchTheseGuys[i].name][j].collidable == true)
				&& !game.player.startedJump
			) {
				clearInterval(game.player.fallInterval)
				game.player.isInAir = false
				game.player.countJump = 0;
				if (game.player.direction == "fall"){
					game.player.direction = "idle";
					game.player.animationFrameNumber = 0;
				}
				game.player.y = Math.round(game.player.y / game.options.tileHeight) * game.options.tileHeight
				return true
			}
		}
	}

	return false
}
