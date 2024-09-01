function getCookie(name) {
	let cookieArr = document.cookie.split(";");
	for (let i = 0; i < cookieArr.length; i++) {
		let cookie = cookieArr[i].trim();
		if (cookie.indexOf(name + "=") === 0) {
			return cookie.substring(name.length + 1);
		}
	}
	return null;
}
let isGameRun = false;
const startGame = document.querySelector("#start")
const gameElement = document.querySelector(".game")
const menuElement = document.querySelector(".menu")
let numberMaxPoint = getCookie("numberMaxPoint") || 0
let maxPoint = document.querySelector(".max_point_begin")
let welcome = document.querySelector(".welcome")
runGame = () => {
    document.addEventListener("keydown", game.keydown.bind(event), false)
    document.addEventListener("keyup", game.keyup.bind(event), false)
    document.body.onresize = function () {
        game.options.canvasWidth = window.innerWidth / 3,
            game.options.canvasHeight = window.innerHeight / 3
        game.canvas.width = game.options.canvasWidth
        game.canvas.height = game.options.canvasHeight
        game.requestRedraw()
    }

    game.init(function () {
        game.generateMap()
        game.requestRedraw()
    })
    game.isRun = true;
}


swap = () => {
    gameElement.classList.toggle("none")
    menuElement.classList.toggle("none")
}


maxPoint.innerHTML = `Số điểm cao nhất hiện tại là: ${numberMaxPoint}`
welcome.innerHTML = "Welcome to The Mask Dude"

startGame.addEventListener("click", () => {
    swap();
    runGame();
})