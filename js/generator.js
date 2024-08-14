game.structures = {
	"grassPlatform": [
		{ tileColumn: 0, tileRow: 0, x: 0, y: 0 }, { tileColumn: 5, tileRow: 1, x: 0, y: -1, collidable: false },
		{ tileColumn: 1, tileRow: 0, x: 1, y: 0 }, { tileColumn: 5, tileRow: 1, x: 1, y: -1, collidable: false },
		{ tileColumn: 2, tileRow: 0, x: 2, y: 0 }, { tileColumn: 5, tileRow: 1, x: 2, y: -1, collidable: false }
	],
	"snowPlatform": [{ tileColumn: 0, tileRow: 1, x: 0, y: 0 }, { tileColumn: 1, tileRow: 1, x: 1, y: 0 }, { tileColumn: 2, tileRow: 1, x: 2, y: 0 }],
	"gelPlatform": [{ tileColumn: 3, tileRow: 1, x: 0, y: 0 }, { tileColumn: 4, tileRow: 1, x: 1, y: 0 }],
	"seaWeedPlatform": [{ tileColumn: 0, tileRow: 2, x: 0, y: 0 }, { tileColumn: 0, tileRow: 3, x: 0, y: 1 }],
	"eyePlatform_1": [{ tileColumn: 1, tileRow: 2, x: 0, y: 0 }, { tileColumn: 2, tileRow: 2, x: 1, y: 0 }],
	"eyePlatform_2": [{ tileColumn: 1, tileRow: 3, x: 0, y: 0 }, { tileColumn: 2, tileRow: 3, x: 1, y: 0 }],
	"eyePlatform_3": [{ tileColumn: 1, tileRow: 2, x: 0, y: 0 }, { tileColumn: 2, tileRow: 3, x: 1, y: 0 }],
	"eyePlatform_4": [{ tileColumn: 1, tileRow: 3, x: 0, y: 0 }, { tileColumn: 2, tileRow: 2, x: 1, y: 0 }],
	"manHoldingPlatform": [
		{ tileColumn: 3, tileRow: 2, x: 0, y: 0 }, { tileColumn: 4, tileRow: 2, x: 1, y: 0 },
		{ tileColumn: 3, tileRow: 3, x: 0, y: 1, collidable: false }, { tileColumn: 4, tileRow: 3, x: 1, y: 1, collidable: false }
	],
	"snowman": [{ tileColumn: 5, tileRow: 3, x: 0, y: 0, collidable: false }, { tileColumn: 5, tileRow: 2, x: 0, y: -1, collidable: false }],
	"lava_platform": [
		{ tileColumn: 6, tileRow: 1, x: -1, y: -0.9, collidable: false }, { tileColumn: 7, tileRow: 1, x: 0, y: -0.9, collidable: false }, { tileColumn: 8, tileRow: 1, x: 1, y: -0.9, collidable: false },
		{ tileColumn: 0, tileRow: 4, x: -1, y: 0 }, { tileColumn: 1, tileRow: 4, x: 0, y: 0 }, { tileColumn: 2, tileRow: 4, x: 1, y: 0 },
		{ tileColumn: 0, tileRow: 5, x: -1, y: 1, collidable: false }, { tileColumn: 1, tileRow: 5, x: 0, y: 1, collidable: false }, { tileColumn: 2, tileRow: 5, x: 1, y: 1, collidable: false }
	],
	"knife" : [{tileColumn: 6, tileRow: 3, x: 0, y: 0, collidable: true}, { tileColumn: 6, tileRow: 2, x: 0, y: -1, collidable: true }],
	"lava" : [{tileColumn: 4, tileRow: 4, x: 0, y: 0, collidable: true}]
}
game.genrateTraps = function () {
	if (game.offset % 31 == 0){
		this.traps.structures.push({
			name : "knife",
			x: game.player.x / game.options.tileHeight + Math.floor(Math.random() * 2) - 2,
			y: game.player.y / game.options.tileHeight - 8
		});
	}
}

game.generateMapGrassPlatform = function(){
	var index = this.map.structures.length;
	this.map.structures.push({
		name: "grassPlatform",
		x: Math.floor(Math.random() * 8),
		y: index * -3
	})
}
game.generateMapSnowPlatform = function(){
	var index = this.map.structures.length;
	randomX = Math.floor(Math.random() * 8)
		this.map.structures.push({
			name: "snowPlatform",
			x: randomX,
			y: index * -3
		})
		if (Math.floor(Math.random() * 7) == 0) {
			this.map.structures.push({
				name: "snowman",
				x: randomX + Math.floor(Math.random() * 3),
				y: index * -3 - 1
			})
		}
}
game.generateMapGelPlatform = function(){
	var index = this.map.structures.length;
	this.map.structures.push({
		name: "gelPlatform",
		x: Math.floor(Math.random() * 6),
		y: index * -3
	})
}
game.generateMapSeaWeedPlatform = function(){
	var index = this.map.structures.length;
	this.map.structures.push({
		name: "seaWeedPlatform",
		x: Math.floor(Math.random() * 4),
		y: index * -3
	})
}
game.generateMapEyePlatform = function(){
	var index = this.map.structures.length;
	this.map.structures.push({
		name: "eyePlatform_" + Math.floor(Math.random() * 4 + 1),
		x: Math.floor(Math.random() * 8),
		y: index * -3
	})
}
game.generateMapManHoldingPlatform = function(){
	var index = this.map.structures.length;
	this.map.structures.push({
		name: "manHoldingPlatform",
		x: Math.floor(Math.random() * 8),
		y: index * -3
	})
}
game.generateMapManLavaPlatform = function(){
	var index = this.map.structures.length;
	this.map.structures.push({
		name: "lava_platform",
		x: Math.floor(Math.random() * 8),
		y: index * -3
	})
}
game.generateMap = function (size) {
	// Generate a platform for the player
	this.map.structures.push({
		name: "grassPlatform",
		x: 0,
		y: 0 
	})
	if (size == undefined){
		size = 20;
	}
	for (var i = 0; i < size; i++){
		var random = Math.floor(Math.random() * 6)
		if (random== 0) {
            this.generateMapSnowPlatform();
        } else if (random == 1) {
            this.generateMapGelPlatform();
        } else if (random == 2) {
            this.generateMapSeaWeedPlatform();
        } else if (random == 3) {
            this.generateMapEyePlatform();
        } else if (random == 4) {
            this.generateMapManHoldingPlatform();
        } else if (random == 5) {
            this.generateMapManLavaPlatform();
        } else this.generateMapGrassPlatform();
	}
}
