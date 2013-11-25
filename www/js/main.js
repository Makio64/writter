var Landmark,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Landmark = (function(_super) {
  __extends(Landmark, _super);

  function Landmark(width, height, division, color) {
    this.width = width;
    this.height = height;
    this.division = division;
    this.color = color;
    Landmark.__super__.constructor.call(this);
    this.redraw();
    return;
  }

  Landmark.prototype.redraw = function() {
    var i, x, y, _i, _ref;
    this.clear();
    this.lineStyle(1, 0x222222, 1);
    for (i = _i = 0, _ref = this.division; _i < _ref; i = _i += 1) {
      x = 0;
      y = Math.floor(this.height * i / this.division);
      this.moveTo(x, y);
      this.lineTo(this.width, y);
    }
  };

  return Landmark;

})(PIXI.Graphics);

var Pen,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Pen = (function(_super) {
  __extends(Pen, _super);

  function Pen() {
    this.update = __bind(this.update, this);
    Pen.__super__.constructor.call(this, PIXI.Texture.fromImage("./img/pen.png"));
    this.baseRotation = -Math.PI / 1.5;
    this.kTime = 0.0;
    this.power = .05;
    this.anchor.x = .5;
    return;
  }

  Pen.prototype.update = function(dt) {
    this.kTime += dt / 1000;
    return this.rotation = this.baseRotation + Math.cos(this.kTime) * this.power;
  };

  return Pen;

})(PIXI.Sprite);

var Poem,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Poem = (function(_super) {
  __extends(Poem, _super);

  function Poem() {
    this.toString = __bind(this.toString, this);
    this.clear = __bind(this.clear, this);
    this.lineToSmooth = __bind(this.lineToSmooth, this);
    var distance, inclinaison;
    Poem.__super__.constructor.call(this);
    this.points = [];
    this.jump = 1;
    this.jumpCount = 0;
    this.record = true;
    this.previousX = null;
    this.previousY = null;
    this.method = "distance";
    this.mode = "zorro";
    this.radius = 5;
    this.enableDistance = true;
    this.enableInclinaison = true;
    this.distancePower = .05;
    this.inclinaisonPower = 3;
    this.baseWidth = 1.5;
    this.angleOffset = Math.PI / 3;
    this.gui = new dat.GUI();
    distance = this.gui.addFolder("distance");
    distance.add(this, "enableDistance").name("enabled");
    distance.add(this, "distancePower").name("power").min(0).max(1).step(0.01);
    inclinaison = this.gui.addFolder("inclinaison");
    inclinaison.add(this, "enableInclinaison").name("enabled");
    inclinaison.add(this, "inclinaisonPower").name("power").min(0).max(30);
    inclinaison.add(this, "angleOffset").min(0).max(Math.PI * 2).step(0.01);
    this.gui.add(this, 'alpha').min(0).max(1).step(0.01);
    this.gui.add(this, 'clear').onChange(this.clear);
    this.gui.add(this, 'toString').onChange(this.toString);
    this.gui.add(this, 'mode', ['zorro', 'classic', 'ice']);
    this.gui.add(this, 'baseWidth').min(0).max(20).step(.5);
    this.gui.close();
    return;
  }

  Poem.prototype.lineToSmooth = function(x, y, jumpEnabled) {
    var angle, change, cosAngle, distance, dx, dy, sinAngle, width;
    if (jumpEnabled == null) {
      jumpEnabled = true;
    }
    if (x === this.previousX && y === this.previousY) {
      return;
    }
    if (jumpEnabled && this.jumpCount % this.jump !== 0) {
      this.jumpCount++;
      return;
    }
    dx = x - this.previousX;
    dy = y - this.previousY;
    angle = Math.atan2(dy, dx);
    distance = Math.sqrt(dx * dx + dy * dy);
    width = this.baseWidth;
    if (this.enableDistance) {
      width += distance * this.distancePower;
    }
    if (this.enableInclinaison) {
      change = Math.abs(Math.sin(angle + this.angleOffset) * this.inclinaisonPower);
      width += change;
    }
    width = Math.floor(width);
    this.radius += (width - this.radius) * 1;
    if (this.oldRadius == null) {
      this.oldRadius = this.radius;
    }
    angle -= Math.PI / 2;
    if (this.oldAngle == null) {
      this.oldAngle = angle;
    }
    this.beginFill(0xFFFFFF, 1);
    if (this.mode === "classic") {
      this.moveTo(this.previousX - Math.cos(this.oldAngle) * this.oldRadius, this.previousY - Math.sin(this.oldAngle) * this.oldRadius);
      this.lineTo(x - Math.cos(angle) * this.radius, y - Math.sin(angle) * this.radius);
      this.lineTo(x + Math.cos(angle) * this.radius, y + Math.sin(angle) * this.radius);
      this.lineTo(this.previousX + Math.cos(this.oldAngle) * this.oldRadius, this.previousY + Math.sin(this.oldAngle) * this.oldRadius);
    } else if (this.mode === "ice") {
      this.moveTo(this.previousX + Math.cos(this.oldAngle) * this.oldRadius, this.previousY + Math.sin(this.oldAngle) * this.oldRadius);
      this.lineTo(x - Math.cos(angle) * this.radius, y + Math.sin(angle) * this.radius);
      this.lineTo(x + Math.cos(angle) * this.radius, y - Math.sin(angle) * this.radius);
      this.lineTo(this.previousX + Math.cos(this.oldAngle) * this.oldRadius, this.previousY - Math.sin(this.oldAngle) * this.oldRadius);
    } else if (this.mode === "zorro") {
      this.beginFill(0xFFFFFF, 1);
      this.lineStyle(width, 0xFFFFFF, 1);
      this.radius = width;
      angle += Math.PI / 2;
      cosAngle = Math.cos(angle);
      sinAngle = Math.sin(angle);
      this.moveTo(this.previousX - cosAngle * this.radius, this.previousY + sinAngle * this.radius);
      this.lineTo(x - cosAngle * this.radius, y + sinAngle * this.radius);
      this.lineTo(x + cosAngle * this.radius, y - sinAngle * this.radius);
      this.lineTo(this.previousX + cosAngle * this.radius, this.previousY - sinAngle * this.radius);
      this.lineTo(this.previousX - cosAngle * this.radius, this.previousY + sinAngle * this.radius);
    }
    this.oldRadius = this.radius;
    this.oldAngle = angle;
    this.previousX = x;
    this.previousY = y;
    this.endFill();
    if (this.record) {
      this.points.push(new Point(x, y));
    }
  };

  Poem.prototype.clear = function() {
    this.points = [];
    Poem.__super__.clear.call(this);
  };

  Poem.prototype.toString = function() {
    var p, pts, s, _i, _len;
    pts = this.points;
    s = "[";
    for (_i = 0, _len = pts.length; _i < _len; _i++) {
      p = pts[_i];
      s += "{x:" + Math.floor(p.x) + ",y:" + Math.floor(p.y) + "}";
      if (p !== pts[pts.length - 1]) {
        s += ",";
      }
    }
    s += "]";
    return console.log(s);
  };

  return Poem;

})(PIXI.Graphics);

var CanvasUtils;

CanvasUtils = (function() {
  function CanvasUtils() {}

  CanvasUtils.fromImage = function(image) {
    var canvas, context;
    canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    context = canvas.getContext('2d');
    context.width = image.width;
    context.height = image.height;
    context.drawImage(image, 0, 0);
    return canvas;
  };

  CanvasUtils.dataFromImage = function(image) {
    return CanvasUtils.fromImage(image).getContext('2d').getImageData(0, 0, image.width, image.height);
  };

  return CanvasUtils;

})();

var M_2PI, M_PI, M_PI2, M_PI4, M_PI8;

M_PI = Math.PI;

M_2PI = Math.PI * 2;

M_PI2 = Math.PI / 2;

M_PI4 = Math.PI / 4;

M_PI8 = Math.PI / 8;

var HitTest;

HitTest = (function() {
  function HitTest() {
    return;
  }

  HitTest.testCircle = function(position, object, radius) {
    var dist, dx, dy;
    if (radius == null) {
      radius = object.radius;
    }
    dx = object.position.x - position.x;
    dy = object.position.y - position.y;
    dist = Math.sqrt(dx * dx + dy * dy);
    return dist <= radius;
  };

  HitTest.testElipse = function(position, object, width, height) {
    var dx, dy;
    dx = object.position.x - position.x;
    dy = object.position.y - position.y;
    return ((dx * dx) / (width * width)) + ((dy * dy) / (height * height)) <= 1.0;
  };

  HitTest.testRect = function(position, object) {
    return position.x >= object.position.x && position.y >= object.position.y && position.x <= object.position.x + object.width && position.y <= object.position.y + object.height;
  };

  HitTest.testRect = function(position, object, centred) {
    position.x += object.width / 2;
    position.y += object.height / 2;
    return HitTest.testRect(position, object);
  };

  return HitTest;

})();

var NumberUtils;

NumberUtils = (function() {
  function NumberUtils() {
    throw new Error("you can t create an instance of NumberUtils");
  }

  NumberUtils.addZero = function(string, minLenght) {
    string += "";
    while (string.length < minLenght) {
      string = "0" + string;
    }
    return string;
  };

  return NumberUtils;

})();

var ObjectPool;

ObjectPool = (function() {
  function ObjectPool(create, minSize, maxSize) {
    var _i, _ref;
    this.create = create;
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.list = [];
    for (_i = 0, _ref = this.minSize; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--) {
      this.add();
    }
    return;
  }

  ObjectPool.prototype.add = function() {
    return this.list.push(this.create());
  };

  ObjectPool.prototype.checkOut = function() {
    var i;
    if (this.list.length === 0) {
      return i = this.create();
    } else {
      return i = this.list.pop();
    }
  };

  ObjectPool.prototype.checkIn = function(item) {
    if (this.list.length < this.maxSize) {
      return this.list.push(item);
    }
  };

  return ObjectPool;

})();

var AScene;

AScene = (function() {
  AScene.prototype.stage = null;

  AScene.prototype.callback = null;

  function AScene(stage) {
    this.stage = stage;
    return;
  }

  AScene.prototype.transitionIn = function(callback) {
    this.callback = callback;
    this.onTransitionInComplete();
  };

  AScene.prototype.transitionOut = function(callback) {
    this.callback = callback;
    this.onTransitionOutComplete();
  };

  AScene.prototype.onTransitionOutComplete = function() {
    this.callback();
  };

  AScene.prototype.onTransitionInComplete = function() {
    this.callback();
  };

  AScene.prototype.onEnter = function() {};

  AScene.prototype.onExit = function() {};

  AScene.prototype.update = function(dt) {};

  AScene.prototype.resize = function(width, height) {};

  AScene.prototype.dispose = function() {
    this.stage = null;
    this.callback = null;
  };

  return AScene;

})();

var LoadScene,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

LoadScene = (function(_super) {
  __extends(LoadScene, _super);

  function LoadScene(stage) {
    this.onSoundLoaded = __bind(this.onSoundLoaded, this);
    this.loadSound = __bind(this.loadSound, this);
    this.loadPixiAsset = __bind(this.loadPixiAsset, this);
    this.loadData = __bind(this.loadData, this);
    LoadScene.__super__.constructor.call(this, stage);
    return;
  }

  LoadScene.prototype.onEnter = function() {
    this.loadData();
    SceneTraveler.getInstance().travelTo(new StartScene(this.stage));
  };

  LoadScene.prototype.loadData = function() {};

  LoadScene.prototype.loadPixiAsset = function() {};

  LoadScene.prototype.loadSound = function() {};

  LoadScene.prototype.onSoundLoaded = function() {
    SceneTraveler.getInstance().travelTo(new GameScene(this.stage));
  };

  return LoadScene;

})(AScene);

var SceneTraveler,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SceneTraveler = (function() {
  var instance;

  function SceneTraveler() {
    this.onTransitionInComplete = __bind(this.onTransitionInComplete, this);
    this.onTransitionOutComplete = __bind(this.onTransitionOutComplete, this);
    this.travelTo = __bind(this.travelTo, this);
  }

  SceneTraveler.prototype.currentScene = null;

  SceneTraveler.prototype.nextScene = null;

  SceneTraveler.prototype.transitioning = false;

  instance = null;

  SceneTraveler.getInstance = function() {
    if (instance == null) {
      instance = new SceneTraveler();
    }
    return instance;
  };

  SceneTraveler.prototype.travelTo = function(scene) {
    this.nextScene = scene;
    if (this.currentScene !== null) {
      this.currentScene.transitionOut(this.onTransitionOutComplete);
    } else {
      this.onTransitionOutComplete();
    }
  };

  SceneTraveler.prototype.onTransitionOutComplete = function() {
    if (this.currentScene !== null) {
      this.currentScene.onExit();
      this.currentScene.dispose();
    }
    this.currentScene = this.nextScene;
    this.currentScene.onEnter();
    this.currentScene.transitionIn(this.onTransitionInComplete);
    this.nextScene = null;
  };

  SceneTraveler.prototype.onTransitionInComplete = function() {};

  return SceneTraveler;

})();

var StartScene,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

StartScene = (function(_super) {
  __extends(StartScene, _super);

  function StartScene(stage) {
    this.onUp = __bind(this.onUp, this);
    this.onDown = __bind(this.onDown, this);
    StartScene.__super__.constructor.call(this, stage);
    this.pen = new Pen();
    this.pen.position.x = 400;
    this.pen.position.y = 400;
    this.down = false;
    this.poem = new Poem();
    this.landmark = new Landmark(window.innerWidth, window.innerHeight, 40);
    this.stage.addChild(this.landmark);
    this.stage.addChild(this.poem);
    this.stage.addChild(this.pen);
    document.addEventListener("mousedown", this.onDown);
    document.addEventListener("mouseup", this.onUp);
    this.read = true;
    this.points = [
      {
        x: -1,
        y: -1
      }, {
        x: 449,
        y: 223
      }, {
        x: 450,
        y: 223
      }, {
        x: 459,
        y: 223
      }, {
        x: 475,
        y: 221
      }, {
        x: 501,
        y: 218
      }, {
        x: 546,
        y: 213
      }, {
        x: 572,
        y: 210
      }, {
        x: 608,
        y: 207
      }, {
        x: 633,
        y: 204
      }, {
        x: 659,
        y: 203
      }, {
        x: 677,
        y: 201
      }, {
        x: 684,
        y: 201
      }, {
        x: 689,
        y: 201
      }, {
        x: 691,
        y: 202
      }, {
        x: 688,
        y: 205
      }, {
        x: 679,
        y: 213
      }, {
        x: 656,
        y: 231
      }, {
        x: 624,
        y: 256
      }, {
        x: 584,
        y: 285
      }, {
        x: 540,
        y: 315
      }, {
        x: 499,
        y: 344
      }, {
        x: 471,
        y: 364
      }, {
        x: 454,
        y: 377
      }, {
        x: 437,
        y: 389
      }, {
        x: 423,
        y: 398
      }, {
        x: 414,
        y: 405
      }, {
        x: 409,
        y: 410
      }, {
        x: 405,
        y: 414
      }, {
        x: 402,
        y: 416
      }, {
        x: 400,
        y: 418
      }, {
        x: 400,
        y: 419
      }, {
        x: 406,
        y: 420
      }, {
        x: 419,
        y: 422
      }, {
        x: 449,
        y: 423
      }, {
        x: 487,
        y: 423
      }, {
        x: 542,
        y: 415
      }, {
        x: 607,
        y: 401
      }, {
        x: 677,
        y: 390
      }, {
        x: 747,
        y: 384
      }, {
        x: 810,
        y: 382
      }, {
        x: 847,
        y: 382
      }, {
        x: 885,
        y: 382
      }, {
        x: -1,
        y: -1
      }, {
        x: 1055,
        y: 231
      }
    ];
    return;
  }

  StartScene.prototype.onDown = function(e) {
    var x, y;
    this.down = true;
    if (this.read) {
      return;
    }
    x = this.stage.getMousePosition().x;
    y = this.stage.getMousePosition().y;
    this.poem.points.push(new Point(-1, -1));
    this.poem.points.push(new Point(x, y));
    this.poem.previousX = x;
    this.poem.previousY = y;
  };

  StartScene.prototype.onUp = function(e) {
    this.down = false;
  };

  StartScene.prototype.onEnter = function() {};

  StartScene.prototype.update = function(dt) {
    var distance, dx, dy, p;
    this.pen.update(dt);
    if (this.read) {
      if (this.down) {
        p = this.points[0];
        if (p.x >= 0) {
          this.pen.position.x += (p.x - this.pen.position.x) * .35;
          this.pen.position.y += (p.y - this.pen.position.y) * .35;
          dx = this.pen.position.x - p.x;
          dy = this.pen.position.y - p.y;
          distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 20) {
            return;
          }
        }
        p = this.points.splice(0, 1)[0];
        if (p.x === -1) {
          this.alert = true;
        } else {
          if (this.alert) {
            this.alert = false;
            this.poem.previousX = p.x;
            this.poem.previousY = p.y;
          }
          this.pen.position.x = p.x;
          this.pen.position.y = p.y;
          this.poem.lineToSmooth(p.x, p.y);
        }
        if (this.points.length === 0) {
          this.read = false;
          this.down = false;
        }
      } else {
        if (this.stage.getMousePosition().x !== 0) {
          this.pen.position.x += (this.stage.getMousePosition().x - this.pen.position.x) * .35;
          this.pen.position.y += (this.stage.getMousePosition().y - this.pen.position.y) * .35;
        }
      }
    } else {
      if (this.stage.getMousePosition().x !== 0) {
        this.pen.position.x += (this.stage.getMousePosition().x - this.pen.position.x) * .45;
        this.pen.position.y += (this.stage.getMousePosition().y - this.pen.position.y) * .45;
      }
      if (this.down) {
        this.poem.lineToSmooth(this.stage.getMousePosition().x, this.stage.getMousePosition().y);
      }
    }
  };

  return StartScene;

})(AScene);

/*
# Bezier
# Quadratic bezier ( curve define by 3 points )
# @author David Ronai aka Makio64 // makiopolis.com
*/

var Bezier;

Bezier = (function() {
  var _this = this;

  Bezier.prototype.p0 = null;

  Bezier.prototype.p1 = null;

  Bezier.prototype.p2 = null;

  function Bezier(p0, p1, p2) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
  }

  Bezier.prototype.dispose = function() {
    this.p0.dispose();
    this.p1.dispose();
    this.p2.dispose();
    this.p2 = null;
    this.p1 = null;
    return this.p0 = null;
  };

  Bezier.prototype.getBezierPoint = function(t) {
    var x, y;
    if (t == null) {
      t = 0.0;
    }
    x = Math.pow(1 - t, 2) * this.p0.x + 2 * t * (1 - t) * this.p1.x + Math.pow(t, 2) * this.p2.x;
    y = Math.pow(1 - t, 2) * this.p0.y + 2 * t * (1 - t) * this.p1.y + Math.pow(t, 2) * this.p2.y;
    return new Point(x, y);
  };

  Bezier.prototype.toCubic = function() {
    var new1, new2, points;
    points = [];
    new1 = new Point((this.p1.x + this.p0.x) * .5, (this.p1.y + this.p0.y) * .5);
    new2 = new Point((this.p2.x + this.p1.x) * .5, (this.p2.y + this.p1.y) * .5);
    points[0] = new Point(this.p0.x, this.p0.y);
    points[1] = new1;
    points[2] = new2;
    points[3] = new Point(this.p2.x, this.p2.y);
    return points;
  };

  Bezier.toBezier = function(points, division) {
    var b, c, cubic, finalPoints, i, p1, p2, p3, t, _i, _j, _k, _ref, _ref1, _ref2;
    if (division == null) {
      division = 10;
    }
    cubic = [];
    finalPoints = [];
    for (i = _i = 0, _ref = points.length - 1; _i < _ref; i = _i += 1) {
      p1 = points[i];
      p2 = points[(i + 1) % points.length];
      p3 = points[(i + 2) % points.length];
      b = new Bezier(p1, p2, p3);
      c = b.toCubic();
      cubic.push(p1);
      cubic.push(c[1]);
    }
    for (i = _j = 1, _ref1 = cubic.length - 3; _j < _ref1; i = _j += 2) {
      p1 = cubic[i];
      p2 = cubic[i + 1];
      p3 = cubic[i + 2];
      b = new Bezier(p1, p2, p3);
      for (t = _k = 0.0, _ref2 = 1.0 / division; _ref2 > 0 ? _k < 1.0 : _k > 1.0; t = _k += _ref2) {
        finalPoints.push(b.getBezierPoint(t));
      }
    }
    return finalPoints;
  };

  return Bezier;

}).call(this);

/*
# CubicBezier - Bezier
# @author Guillaume Gouessan
*/

var CubicBezier;

CubicBezier = (function() {
  var computeBarycenter;

  function CubicBezier(p0, p2, p3, p4) {
    this.a = p0;
    this.b = p2;
    this.c = p3;
    this.d = p4;
    this.e = new Point(0, 0);
    this.f = new Point(0, 0);
    this.g = new Point(0, 0);
    this.k = new Point(0, 0);
    this.l = new Point(0, 0);
    this.tracer = new Point(0, 0);
    return;
  }

  CubicBezier.prototype.dispose = function() {
    this.d = null;
    this.c = null;
    this.b = null;
    this.a = null;
    this.e = null;
    this.f = null;
    this.g = null;
    this.k = null;
    this.l = null;
    this.tracer = null;
  };

  CubicBezier.prototype.computeTracer = function(t) {
    this.computeBarycenter(this.e, this.a, this.b, t);
    this.computeBarycenter(this.f, this.b, this.c, t);
    this.computeBarycenter(this.g, this.c, this.d, t);
    this.computeBarycenter(this.k, this.e, this.f, t);
    this.computeBarycenter(this.l, this.f, this.g, t);
    this.computeBarycenter(this.tracer, this.k, this.l, t);
  };

  computeBarycenter = function(bar, orig, dest, t) {
    bar.x = (1 - t) * orig.x + t * dest.x;
    bar.y = (1 - t) * orig.y + t * dest.y;
  };

  CubicBezier.prototype.getPointAt = function(t) {
    this.computeTracer(t);
    return this.tracer;
  };

  CubicBezier.prototype.drawAtTime = function(graphics, t) {
    graphics.moveTo(this.tracer.x, this.tracer.y);
    this.computeTracer(t);
    graphics.lineTo(this.tracer.x, this.tracer.y);
  };

  return CubicBezier;

})();

var Point;

Point = (function() {
  var euclidean;

  Point.prototype.x = 0.0;

  Point.prototype.y = 0.0;

  function Point(x, y) {
    this.x = x;
    this.y = y;
    return;
  }

  euclidean = function(p1, p2) {
    var a, b;
    a = (p1 != null ? p1.x : void 0) - (p2 != null ? p2.x : void 0);
    b = (p1 != null ? p1.y : void 0) - (p2 != null ? p2.y : void 0);
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  };

  Point.prototype.add = function(p) {
    this.x += p.x;
    return this.y += p.y;
  };

  Point.prototype.sub = function(p) {
    this.x -= p.x;
    return this.y -= p.y;
  };

  Point.prototype.scale = function(value) {
    this.x *= value;
    return this.y *= value;
  };

  Point.prototype.draw = function(ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x, this.y, 1, 1);
  };

  Point.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")";
  };

  Point.prototype.dispose = function() {};

  return Point;

})();

var Main, main,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

main = null;

Main = (function() {
  Main.prototype.stage = null;

  Main.prototype.renderer = null;

  Main.prototype.dt = 0;

  Main.prototype.lastTime = 0;

  Main.prototype.pause = false;

  function Main() {
    this.animate = __bind(this.animate, this);
    this.stage = new PIXI.Stage(0);
    this.pause = false;
    this.renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight, null, true);
    this.renderer.view.style.display = "block";
    this.renderer.view.className = "renderer";
    SceneTraveler.getInstance().travelTo(new LoadScene(this.stage));
    this.lastTime = Date.now();
    $("#main").append(this.renderer.view);
    window.focus();
    requestAnimFrame(this.animate);
    main = this;
    return;
  }

  Main.prototype.animate = function() {
    var ctx, dt, t;
    if (this.pause) {
      t = Date.now();
      dt = t - this.lastTime;
      this.lastTime = t;
      return;
    }
    requestAnimFrame(this.animate);
    t = Date.now();
    dt = t - this.lastTime;
    SceneTraveler.getInstance().currentScene.update(dt);
    this.renderer.render(this.stage);
    ctx = main.renderer.context;
    this.lastTime = t;
    this.renderer.view.style.cursor = "none";
  };

  Main.prototype.resize = function() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
  };

  return Main;

})();

$(document).ready(function() {
  var _this = this;
  main = new Main();
  $(window).blur(function() {
    main.pause = true;
    return cancelAnimationFrame(main.animate);
  });
  $(window).focus(function() {
    requestAnimFrame(main.animate);
    main.lastTime = Date.now();
    return main.pause = false;
  });
  $(window).resize(function() {
    return main.resize();
  });
});
