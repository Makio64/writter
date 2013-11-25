class Landmark extends PIXI.Graphics

	constructor:(@width, @height, @division, @color)->
		super()
		@redraw()
		return

	redraw:()->
		@clear()
		@lineStyle(1,0x222222,1)

		for i in [0...@division] by 1
			x = 0
			y = Math.floor(@height*i/@division)
			@moveTo(x,y)
			@lineTo(@width,y)
		
		return