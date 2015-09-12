window.Colors = {
    red: "#C64444",
    white: "#EFF4F0",
    green1: "#96BB87",
    green2: "#79936C",
    green3: "#293833",
}

window.Keys = {
    W: 87,
    D: 68,
    A: 65,
    S: 83,
}

window.Loop = function(func) {
    return (function loop(time) {
        func(Math.min((Date.now() - time) / 1000, 1))
        window.requestAnimationFrame(loop.bind(null, Date.now()))
    })(Date.now())
}

window.Keyboard = {
    isDown: function(key) {
        if(this.data[key] == undefined) {
            this.data[key] = -1
        }
        return this.data[key] >= 0
    },
    isJustDown: function(key) {
        if(this.data[key] == undefined) {
            this.data[key] = -1
        }
        if(this.data[key] == 0) {
            this.data[key] += 1
            return true
        } else {
            return false
        }
    },
    data: {}
}

document.addEventListener("keydown", function(event) {
    Keyboard.data[event.keyCode] = 0
})

document.addEventListener("keyup", function(event) {
    Keyboard.data[event.keyCode] = -1
})

window.Canvas = document.getElementById("canvas").getContext("2d")

var Hero = function() {
    this.x = 16
    this.y = 7*8
    this.vx = 0
    this.vy = 0
    this.width = 6
    this.height = 9
    this.direction = +1
    this.color = Colors.white
}

Hero.prototype.update = function(tick) {
    if(Keyboard.isDown(Keys.A)) {
        this.direction = -1
        this.vx = -1
    } if(Keyboard.isDown(Keys.D)) {
        this.direction = +1
        this.vx = +1
    }
    this.x += this.vx

    if(this.vx < 0) {
        this.vx *= Math.pow(0.00005, tick)
        if(this.vx > -0.001) {this.vx = 0}
    } else if(this.vx > 0) {
        this.vx *= Math.pow(0.00005, tick)
        if(this.vx < +0.001) {this.vx = 0}
    }
}

Hero.prototype.render = function() {
    Canvas.strokeWidth = 1
    Canvas.strokeStyle = this.color
    var x = Math.round(this.x) - (this.width / 2)
    var y = Math.round(this.y) - this.height
    Canvas.strokeRect(x + 0.5, y + 0.5, this.width, this.height - 1)
}

var Level = function() {
    this.width = 16*8
    this.height = 2*8
}

Level.prototype.render = function() {
    Canvas.fillStyle = Colors.green2
    Canvas.fillRect(0, 7*PX, this.width, this.height)
}

var PX = 8

var hero = new Hero()
var level = new Level()

Loop(function(tick) {
    hero.update(tick)

    Canvas.clearRect(0, 0, 128, 72)
    hero.render()
    level.render()
})