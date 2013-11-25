class Poem extends PIXI.Graphics

	constructor:()->
		super()
		@points = []
		@jump = 1
		@jumpCount = 0
		@record = true
		@previousX = null
		@previousY = null
		@method = "distance"
		@mode = "zorro"
		@radius = 5
		@enableDistance = true
		@enableInclinaison = true
		@distancePower = .05
		@inclinaisonPower = 3
		@baseWidth = 1.5
		@angleOffset = Math.PI/3

		@gui = new dat.GUI()
		distance = @gui.addFolder("distance")
		distance.add(@,"enableDistance").name("enabled")
		distance.add(@,"distancePower").name("power").min(0).max(1).step(0.01)
		inclinaison = @gui.addFolder("inclinaison")
		inclinaison.add(@,"enableInclinaison").name("enabled")
		inclinaison.add(@,"inclinaisonPower").name("power").min(0).max(30)
		inclinaison.add(@,"angleOffset").min(0).max(Math.PI*2).step(0.01)
		@gui.add(@,'alpha').min(0).max(1).step(0.01)
		@gui.add(@,'clear').onChange(@clear)
		@gui.add(@,'toString').onChange(@toString)
		@gui.add(@, 'mode', [ 'zorro', 'classic', 'ice' ] )
		@gui.add(@,'baseWidth').min(0).max(20).step(.5)
		@gui.close()

		return

	lineToSmooth:(x,y,jumpEnabled=true)=>

		if x == @previousX and y == @previousY
			return
		

		if jumpEnabled and @jumpCount%@jump != 0
			@jumpCount++
			return

		dx = (x - @previousX)
		dy = (y - @previousY)
		angle = Math.atan2(dy,dx)
		distance = Math.sqrt(dx*dx + dy*dy)

		width = @baseWidth

		if @enableDistance
			width += distance*@distancePower

		if @enableInclinaison
			change = Math.abs(Math.sin(angle+@angleOffset)*@inclinaisonPower)
			width += change

		width = Math.floor(width)
		@radius += (width-@radius)*1

		# console.log @radius

		@oldRadius ?= @radius
		angle-=Math.PI/2 #+Math.PI
		@oldAngle ?= angle

		# angle = @oldAngle+(angle-@oldAngle)*.2


		@beginFill(0xFFFFFF, 1)

		# @lineStyle( @radius, 0xFFFFFF, 1 )

		#TRIANGLE
		if @mode == "classic"
			@moveTo(@previousX-Math.cos(@oldAngle)*@oldRadius, @previousY-Math.sin(@oldAngle)*@oldRadius)
			@lineTo(x-Math.cos(angle)*@radius, y-Math.sin(angle)*@radius)
			@lineTo(x+Math.cos(angle)*@radius, y+Math.sin(angle)*@radius)
			@lineTo(@previousX+Math.cos(@oldAngle)*@oldRadius, @previousY+Math.sin(@oldAngle)*@oldRadius)

		else if @mode == "ice"
			@moveTo(@previousX+Math.cos(@oldAngle)*@oldRadius, @previousY+Math.sin(@oldAngle)*@oldRadius)
			@lineTo(x-Math.cos(angle)*@radius, y+Math.sin(angle)*@radius)
			@lineTo(x+Math.cos(angle)*@radius, y-Math.sin(angle)*@radius)
			@lineTo(@previousX+Math.cos(@oldAngle)*@oldRadius, @previousY-Math.sin(@oldAngle)*@oldRadius)

		#ZORRO RENDERER
		else if @mode == "zorro"
			@beginFill(0xFFFFFF,1)
			@lineStyle( width, 0xFFFFFF, 1 )
			@radius = width
			angle+=Math.PI/2 #+Math.PI
			cosAngle = Math.cos(angle)
			sinAngle = Math.sin(angle)
			@moveTo(@previousX-cosAngle*@radius, @previousY+sinAngle*@radius) #bottom left
			@lineTo(x-cosAngle*@radius, y+sinAngle*@radius) #top keft
			@lineTo(x+cosAngle*@radius, y-sinAngle*@radius)
			@lineTo(@previousX+cosAngle*@radius, @previousY-sinAngle*@radius)
			@lineTo(@previousX-cosAngle*@radius, @previousY+sinAngle*@radius)



		@oldRadius = @radius
		@oldAngle = angle
		@previousX = x
		@previousY = y
		# @drawCircle(@previousX,@previousY,@radius)
		@endFill()

		# @beginFill(0xFFFFFF,1)
		# @drawCircle(@previousX,@previousY,width)
		# @endFill()

		if @record
			@points.push(new Point(x,y))

		return

	clear:()=>
		@points = []
		super()
		return

	toString:()=>
		# pts = simplify(@points,.7)
		pts = @points
		s = "["
		for p in pts
			s+="{x:"+Math.floor(p.x)+",y:"+Math.floor(p.y)+"}"
			if p != pts[pts.length-1]
				s+=","
			
		s += "]"
		console.log s
