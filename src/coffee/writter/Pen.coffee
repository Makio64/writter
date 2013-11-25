class Pen extends PIXI.Sprite

	
	constructor:()->
		super( PIXI.Texture.fromImage("./img/pen.png") )
		@baseRotation 	= -Math.PI/1.5
		@kTime 			= 0.0
		@power			= .05
		@anchor.x 		= .5
		return

	update:(dt)=>
		@kTime += dt/1000
		@rotation = @baseRotation + Math.cos(@kTime)*@power

