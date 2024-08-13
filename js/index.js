// The spaghetti code masterpiece
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
var game = {
	canvas: document.getElementById('canvas'),
	context: this.canvas.getContext('2d', {alpha: false}),
	counter: document.getElementById('counter'),
	currentPoint: document.getElementById('current_point'),
	point: document.getElementById('point'),
	maxPoint: document.getElementById('max_point'),
	offset: 0,
	content: new Image(),
	textures: {
		'run': {
			image: new Image(),
			loaded: false,
			ratioFrame: 1
		},
		'idle': {
			image: new Image(),
            loaded: false,
			ratioFrame: 1
		},
		'jump': {
			image: new Image(),
            loaded: false,
			ratioFrame: 1
        },
		'fall': {
            image: new Image(),
            loaded: false,
			ratioFrame: 1
        },
		'doublejump': {
			image: new Image(),
            loaded: false,
			ratioFrame: 1
        }

	},
	drawPending: false,
	backgrounds: {
			'sky': {
				image: new Image(),
				loaded: false
			},
			'trees': {
				image: new Image(),
				loaded: false
			}
	},
	sounds: {
		jump: new Audio('sounds/jump.wav')
	},
	options: {
		texturesPath: "textures.png",
		runPath: "player/run.png",
		jumpPath: "player/jump.png",
		doublejumpPath: "player/doublejump.png",
		fallPath: "player/fall.png",
		idlePath: "player/idle.png",
		groundHeight: 50,
		tileWidth: 32,
		tileHeight: 32,
		maptileWidth: 24,
		maptileHeight: 24,
		canvasWidth: window.innerWidth / 3,
		canvasHeight: window.innerHeight / 3
	},
	pressedKeys: {},
	init: function (onInit) {
		this.canvas.width = this.options.canvasWidth
		this.canvas.height = this.options.canvasHeight
		this.context.imageSmoothingEnabled = false

    this.backgrounds['sky'].image.src = "background.png"
		this.backgrounds['trees'].image.src = "trees.png"

		for (var key in this.backgrounds) {
			this.backgrounds[key].image.onload = function (currentKey) {
				this.backgrounds[currentKey].loaded = true
			}.bind(this, key)
		}

		this.textures['run'].image.src = this.options.runPath
		this.textures['jump'].image.src = this.options.jumpPath
		this.textures['doublejump'].image.src = this.options.doublejumpPath
		this.textures['fall'].image.src = this.options.fallPath
		this.textures['idle'].image.src = this.options.idlePath
		for (var key in this.textures) {
			this.textures[key].image.onload = function (currentKey) {
                this.textures[currentKey].loaded = true
            }.bind(this, key)
		}
		this.content.src = this.options.texturesPath
		this.content.onload = onInit
	},
	map: {
		structures: []
	},
	isOver: false,
	numberMaxPoint: getCookie("numberMaxPoint") || 0
}
