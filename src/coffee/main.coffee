main = null

class Main

	stage 			: null
	renderer 		: null
	dt 				: 0
	lastTime 		: 0
	pause 			: false

	constructor:()->		
		@stage = new PIXI.Stage(0)
		@pause = false
		# @renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,null, true, true)
		@renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight,null, true)
		@renderer.view.style.display = "block"
		
		@renderer.view.className = "renderer"
		SceneTraveler.getInstance().travelTo(new LoadScene(@stage))
		@lastTime = Date.now()

		$("#main").append(@renderer.view)

		window.focus()

		requestAnimFrame( @animate )
		main = @
		return

	animate:()=>

		if @pause
			t = Date.now()
			dt = t - @lastTime
			@lastTime = t
			return
		
		requestAnimFrame( @animate )
		t = Date.now()
		dt = t - @lastTime
		SceneTraveler.getInstance().currentScene.update(dt)
		@renderer.render( @stage )

		ctx = main.renderer.context
		@lastTime = t
		@renderer.view.style.cursor = "none"

		return

	resize:()->
		@renderer.resize(window.innerWidth,window.innerHeight)

		return

$(document).ready ->
	main = new Main()
	
	$(window).blur(()->
		main.pause = true
		cancelAnimationFrame(main.animate)
	)

	$(window).focus(()->
		requestAnimFrame( main.animate )
		main.lastTime = Date.now()
		main.pause = false
	)

	$(window).resize(()=>
		main.resize()
	)
	return