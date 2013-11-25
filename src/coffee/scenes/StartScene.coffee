# This scene is an example
class StartScene extends AScene

	constructor:(stage)->
		super(stage)
		# START HERE
		@pen = new Pen()
		@pen.position.x = 400
		@pen.position.y = 400
		@down = false
		@poem = new Poem()
		@landmark = new Landmark(window.innerWidth,window.innerHeight, 40)
		@stage.addChild( @landmark )
		@stage.addChild( @poem )
		@stage.addChild( @pen )
		document.addEventListener("mousedown",@onDown)
		document.addEventListener("mouseup",@onUp)

		@read = true
		# @points = [new Point(-1,-1),new Point(74,226),new Point(76,226),new Point(81,220),new Point(81,217),new Point(83,212),new Point(83,201),new Point(78,195),new Point(73,195),new Point(73,197),new Point(79,199),new Point(110,199),new Point(112,198),new Point(112,196),new Point(113,196),new Point(116,212),new Point(119,221),new Point(122,256),new Point(123,370),new Point(118,392),new Point(114,394),new Point(109,402),new Point(100,404),new Point(88,404),new Point(83,403),new Point(77,400),new Point(74,394),new Point(74,375),new Point(83,367),new Point(84,364),new Point(94,357),new Point(101,354),new Point(103,351),new Point(108,351),new Point(112,348),new Point(118,347),new Point(122,344),new Point(128,342),new Point(132,338),new Point(139,335),new Point(142,330),new Point(145,328),new Point(147,325),new Point(147,318),new Point(143,315),new Point(137,314),new Point(132,320),new Point(132,326),new Point(133,328),new Point(140,334),new Point(151,337),new Point(160,337),new Point(-1,-1),new Point(203,337),new Point(204,337),new Point(205,334),new Point(208,332),new Point(209,327),new Point(209,310),new Point(208,310),new Point(209,312),new Point(225,319),new Point(233,324),new Point(233,334),new Point(229,337),new Point(221,338),new Point(230,338),new Point(235,336),new Point(238,333),new Point(242,326),new Point(247,321),new Point(248,317),new Point(249,330),new Point(250,333),new Point(254,334),new Point(254,335),new Point(259,335),new Point(262,332),new Point(265,327),new Point(266,323),new Point(267,323),new Point(267,319),new Point(267,327),new Point(274,331),new Point(274,332),new Point(288,332),new Point(291,316),new Point(292,325),new Point(296,334),new Point(299,335),new Point(300,337),new Point(304,337),new Point(306,336),new Point(310,325),new Point(314,320),new Point(314,311),new Point(315,311),new Point(315,312),new Point(317,312),new Point(319,315),new Point(322,317),new Point(323,322),new Point(326,328),new Point(326,332),new Point(328,334),new Point(328,341),new Point(321,341),new Point(319,340),new Point(-1,-1),new Point(286,298),new Point(288,298),new Point(288,300),new Point(285,300),new Point(285,298),new Point(-1,-1),new Point(411,237),new Point(412,239),new Point(416,242),new Point(417,251),new Point(419,255),new Point(415,257),new Point(415,262),new Point(419,275),new Point(419,289),new Point(417,303),new Point(412,311),new Point(412,316),new Point(409,324),new Point(408,325),new Point(374,332),new Point(358,332),new Point(353,330),new Point(353,322),new Point(362,318),new Point(369,317),new Point(404,317),new Point(414,320),new Point(456,320),new Point(474,317),new Point(484,310),new Point(495,286),new Point(498,259),new Point(496,234),new Point(494,224),new Point(486,218),new Point(483,210),new Point(475,202),new Point(435,191),new Point(426,186),new Point(414,184),new Point(384,184),new Point(376,186),new Point(374,188),new Point(360,189),new Point(355,193),new Point(351,199),new Point(350,204),new Point(348,207),new Point(343,209),new Point(340,220),new Point(340,226),new Point(349,236),new Point(367,240),new Point(452,241),new Point(-1,-1),new Point(542,297),new Point(543,297),new Point(543,295),new Point(533,295),new Point(530,296),new Point(529,298),new Point(527,299),new Point(527,308),new Point(528,308),new Point(532,313),new Point(536,313),new Point(537,315),new Point(546,315),new Point(552,312),new Point(553,309),new Point(553,299),new Point(554,308),new Point(556,309),new Point(557,311),new Point(565,312),new Point(569,308),new Point(571,302),new Point(576,294),new Point(578,294),new Point(578,295),new Point(580,296),new Point(583,306),new Point(587,314),new Point(591,319),new Point(605,319),new Point(607,316),new Point(610,314),new Point(611,312),new Point(611,299),new Point(608,297),new Point(606,297),new Point(606,298),new Point(609,300),new Point(613,300),new Point(631,294),new Point(632,292),new Point(633,292),new Point(632,302),new Point(635,308),new Point(639,310),new Point(645,311),new Point(-1,-1),new Point(639,270),new Point(639,271),new Point(638,271),new Point(638,269),new Point(638,270),new Point(637,270),new Point(-1,-1),new Point(667,285),new Point(665,284),new Point(660,284),new Point(653,288),new Point(651,298),new Point(652,307),new Point(659,307),new Point(665,302),new Point(667,288),new Point(669,231),new Point(669,260),new Point(676,315),new Point(-1,-1),new Point(707,213),new Point(707,302),new Point(708,305),new Point(-1,-1),new Point(707,322),new Point(707,321),new Point(708,321),new Point(708,322),new Point(707,322),new Point(-1,-1),new Point(767,163)] 
		# @points = [{x:-1,y:-1},{x:105,y:235},{x:105,y:232},{x:107,y:231},{x:115,y:218},{x:117,y:212},{x:118,y:188},{x:117,y:187},{x:114,y:187},{x:118,y:188},{x:137,y:188},{x:144,y:184},{x:151,y:182},{x:152,y:180},{x:155,y:178},{x:158,y:178},{x:170,y:202},{x:182,y:217},{x:184,y:222},{x:187,y:225},{x:190,y:233},{x:195,y:266},{x:195,y:300},{x:194,y:309},{x:187,y:329},{x:185,y:339},{x:182,y:345},{x:179,y:355},{x:168,y:376},{x:167,y:380},{x:156,y:400},{x:151,y:407},{x:139,y:416},{x:124,y:417},{x:118,y:415},{x:113,y:411},{x:110,y:406},{x:110,y:404},{x:108,y:401},{x:108,y:384},{x:109,y:382},{x:114,y:375},{x:117,y:373},{x:120,y:368},{x:129,y:359},{x:160,y:333},{x:171,y:321},{x:182,y:314},{x:192,y:305},{x:198,y:297},{x:205,y:292},{x:216,y:280},{x:216,y:278},{x:218,y:278},{x:218,y:275},{x:220,y:274},{x:220,y:269},{x:219,y:269},{x:219,y:268},{x:206,y:267},{x:203,y:269},{x:198,y:275},{x:198,y:285},{x:204,y:290},{x:208,y:292},{x:213,y:292},{x:214,y:293},{x:235,y:293},{x:238,y:292},{x:239,y:290},{x:-1,y:-1},{x:268,y:289},{x:268,y:285},{x:272,y:278},{x:272,y:273},{x:274,y:264},{x:274,y:261},{x:273,y:261},{x:273,y:260},{x:277,y:260},{x:278,y:262},{x:282,y:262},{x:283,y:263},{x:296,y:264},{x:300,y:266},{x:301,y:269},{x:302,y:269},{x:302,y:271},{x:303,y:271},{x:303,y:282},{x:302,y:282},{x:301,y:284},{x:299,y:284},{x:297,y:287},{x:293,y:287},{x:293,y:288},{x:-1,y:-1},{x:308,y:282},{x:312,y:275},{x:312,y:271},{x:315,y:267},{x:316,y:261},{x:319,y:263},{x:322,y:269},{x:329,y:274},{x:331,y:279},{x:333,y:280},{x:340,y:280},{x:341,y:275},{x:346,y:268},{x:348,y:262},{x:348,y:258},{x:353,y:272},{x:357,y:277},{x:360,y:277},{x:361,y:278},{x:364,y:278},{x:365,y:277},{x:373,y:265},{x:374,y:261},{x:376,y:260},{x:376,y:258},{x:377,y:258},{x:384,y:278},{x:385,y:280},{x:387,y:281},{x:391,y:281},{x:395,y:278},{x:397,y:275},{x:397,y:273},{x:398,y:273},{x:400,y:266},{x:-1,y:-1},{x:400,y:265},{x:400,y:259},{x:398,y:256},{x:397,y:256},{x:396,y:251},{x:395,y:251},{x:394,y:249},{x:397,y:249},{x:403,y:252},{x:407,y:255},{x:409,y:258},{x:417,y:263},{x:418,y:265},{x:420,y:265},{x:421,y:270},{x:423,y:272},{x:423,y:288},{x:414,y:291},{x:408,y:291},{x:-1,y:-1},{x:370,y:241},{x:370,y:242},{x:371,y:242},{x:371,y:248},{x:369,y:248},{x:369,y:245},{x:373,y:243},{x:-1,y:-1},{x:472,y:180},{x:474,y:184},{x:477,y:186},{x:478,y:188},{x:479,y:192},{x:488,y:210},{x:494,y:227},{x:496,y:239},{x:496,y:266},{x:491,y:283},{x:487,y:288},{x:482,y:292},{x:478,y:300},{x:475,y:302},{x:475,y:303},{x:461,y:307},{x:447,y:307},{x:437,y:301},{x:427,y:292},{x:422,y:280},{x:422,y:270},{x:426,y:265},{x:433,y:260},{x:437,y:260},{x:438,y:259},{x:464,y:260},{x:476,y:264},{x:487,y:270},{x:515,y:278},{x:526,y:279},{x:551,y:279},{x:572,y:269},{x:580,y:253},{x:585,y:237},{x:586,y:217},{x:580,y:201},{x:575,y:193},{x:557,y:175},{x:547,y:170},{x:535,y:166},{x:506,y:163},{x:490,y:163},{x:463,y:172},{x:454,y:178},{x:449,y:186},{x:448,y:205},{x:457,y:224},{x:461,y:226},{x:475,y:227},{x:500,y:224},{x:530,y:210},{x:-1,y:-1},{x:609,y:265},{x:599,y:265},{x:595,y:266},{x:590,y:269},{x:585,y:277},{x:585,y:286},{x:588,y:291},{x:595,y:296},{x:601,y:296},{x:605,y:293},{x:608,y:288},{x:612,y:273},{x:613,y:264},{x:614,y:268},{x:623,y:283},{x:633,y:287},{x:641,y:287},{x:642,y:286},{x:644,y:281},{x:647,y:266},{x:651,y:258},{x:656,y:259},{x:669,y:271},{x:676,y:276},{x:688,y:280},{x:693,y:280},{x:696,y:265},{x:696,y:260},{x:695,y:258},{x:693,y:257},{x:688,y:257},{x:701,y:256},{x:708,y:254},{x:711,y:251},{x:717,y:266},{x:718,y:266},{x:-1,y:-1},{x:710,y:236},{x:712,y:236},{x:713,y:234},{x:-1,y:-1},{x:746,y:255},{x:740,y:255},{x:732,y:262},{x:731,y:268},{x:731,y:290},{x:734,y:292},{x:740,y:291},{x:747,y:276},{x:749,y:265},{x:750,y:244},{x:750,y:208},{x:750,y:226},{x:760,y:264},{x:767,y:283},{x:769,y:292},{x:-1,y:-1},{x:361,y:370},{x:361,y:402},{x:362,y:408},{x:362,y:423},{x:364,y:433},{x:-1,y:-1},{x:393,y:365},{x:393,y:373},{x:397,y:403},{x:402,y:418},{x:402,y:422},{x:-1,y:-1},{x:343,y:460},{x:373,y:460},{x:422,y:454},{x:442,y:448},{x:445,y:445},{x:-1,y:-1},{x:394,y:466},{x:390,y:482},{x:390,y:499},{x:394,y:510},{x:397,y:514},{x:408,y:520},{x:413,y:521},{x:426,y:520},{x:435,y:514},{x:438,y:510},{x:442,y:500},{x:444,y:491},{x:444,y:481},{x:439,y:477},{x:435,y:471},{x:427,y:468},{x:-1,y:-1},{x:585,y:169}] 
		@points = [{x:-1,y:-1},{x:449,y:223},{x:450,y:223},{x:459,y:223},{x:475,y:221},{x:501,y:218},{x:546,y:213},{x:572,y:210},{x:608,y:207},{x:633,y:204},{x:659,y:203},{x:677,y:201},{x:684,y:201},{x:689,y:201},{x:691,y:202},{x:688,y:205},{x:679,y:213},{x:656,y:231},{x:624,y:256},{x:584,y:285},{x:540,y:315},{x:499,y:344},{x:471,y:364},{x:454,y:377},{x:437,y:389},{x:423,y:398},{x:414,y:405},{x:409,y:410},{x:405,y:414},{x:402,y:416},{x:400,y:418},{x:400,y:419},{x:406,y:420},{x:419,y:422},{x:449,y:423},{x:487,y:423},{x:542,y:415},{x:607,y:401},{x:677,y:390},{x:747,y:384},{x:810,y:382},{x:847,y:382},{x:885,y:382},{x:-1,y:-1},{x:1055,y:231}] 
		return

	onDown:(e)=>
		@down = true
		if @read
			return
		
		x = @stage.getMousePosition().x
		y = @stage.getMousePosition().y
		@poem.points.push(new Point(-1,-1))
		@poem.points.push(new Point(x,y))
		@poem.previousX = x
		@poem.previousY = y
		return

	onUp:(e)=>
		@down = false
		return

	onEnter:()->		
		return

	update:(dt)->

		@pen.update(dt)
		if @read
			if @down
				p = @points[0]
				if p.x>=0
					@pen.position.x += (p.x-@pen.position.x)*.35
					@pen.position.y += (p.y-@pen.position.y)*.35
					dx = @pen.position.x - p.x
					dy = @pen.position.y - p.y
					distance = Math.sqrt(dx*dx+dy*dy)
					if distance>20
						return

				p = @points.splice(0,1)[0]
				if p.x == -1
					@alert = true
				else 
					if @alert
						@alert = false
						@poem.previousX = p.x
						@poem.previousY = p.y
					@pen.position.x = p.x
					@pen.position.y = p.y
					@poem.lineToSmooth( p.x, p.y )
				if @points.length == 0
					@read = false
					@down = false
			else
				if @stage.getMousePosition().x != 0
					@pen.position.x += (@stage.getMousePosition().x-@pen.position.x)*.35
					@pen.position.y += (@stage.getMousePosition().y-@pen.position.y)*.35
		else
			if @stage.getMousePosition().x != 0
				@pen.position.x += (@stage.getMousePosition().x-@pen.position.x)*.45
				@pen.position.y += (@stage.getMousePosition().y-@pen.position.y)*.45
			if @down
				@poem.lineToSmooth( @stage.getMousePosition().x, @stage.getMousePosition().y )
		return