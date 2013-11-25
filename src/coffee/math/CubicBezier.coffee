###
# CubicBezier - Bezier
# @author Guillaume Gouessan
###

class CubicBezier
		
	# ================== CONSTRUCTOR ======================

	constructor:(p0, p2, p3, p4)->
		@a = p0
		@b = p2
		@c = p3
		@d = p4
		@e = new Point(0, 0) # BAR a-b
		@f = new Point(0, 0) # BAR b-c
		@g = new Point(0, 0) # BAR c-d
		@k = new Point(0, 0) # BAR e-f
		@l = new Point(0, 0) # BAR f-g
		@tracer = new Point(0, 0) # BAR k-l
		return

	# ================== DISPOSE ==========================
		
	dispose:()->
		@d = null
		@c = null
		@b = null
		@a = null
		@e = null
		@f = null
		@g = null
		@k = null
		@l = null
		@tracer = null
		return
		
	# ================== PUBLIC METHODS ===================

	computeTracer:(t)->
		@computeBarycenter @e, @a, @b, t
		@computeBarycenter @f, @b, @c, t
		@computeBarycenter @g, @c, @d, t
		@computeBarycenter @k, @e, @f, t
		@computeBarycenter @l, @f, @g, t
		@computeBarycenter @tracer, @k, @l, t
		return

	computeBarycenter = (bar, orig, dest, t) ->
		bar.x = (1 - t) * orig.x + t * dest.x
		bar.y = (1 - t) * orig.y + t * dest.y
		return

	getPointAt:(t)->
		@computeTracer t
		return @tracer

	drawAtTime:(graphics, t)->
		graphics.moveTo @tracer.x, @tracer.y
		@computeTracer t
		graphics.lineTo @tracer.x, @tracer.y
		return