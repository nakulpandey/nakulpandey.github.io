window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AnimationController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17d72MwVqZDNo+AVK9Mw3uo", "AnimationController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Animations_1 = require("../utils/Animations");
    var State;
    (function(State) {
      State[State["Idle"] = 0] = "Idle";
      State[State["Attack"] = 1] = "Attack";
      State[State["TakingHit"] = 2] = "TakingHit";
      State[State["Die"] = 3] = "Die";
      State[State["Celebrating"] = 4] = "Celebrating";
    })(State || (State = {}));
    var CurrentAnimation;
    (function(CurrentAnimation) {
      CurrentAnimation[CurrentAnimation["Idle"] = 0] = "Idle";
      CurrentAnimation[CurrentAnimation["ThrowingEgg"] = 1] = "ThrowingEgg";
      CurrentAnimation[CurrentAnimation["TakingHit"] = 2] = "TakingHit";
      CurrentAnimation[CurrentAnimation["Die"] = 3] = "Die";
      CurrentAnimation[CurrentAnimation["Celebrating"] = 4] = "Celebrating";
    })(CurrentAnimation || (CurrentAnimation = {}));
    var AnimationController = function(_super) {
      __extends(AnimationController, _super);
      function AnimationController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.idleAnimationTime = 2;
        _this.head = null;
        _this.rightHand = null;
        _this.leftHand = null;
        _this.rotationPoint = null;
        _this.eyes = null;
        _this.mouth = null;
        return _this;
      }
      AnimationController.prototype.onLoad = function() {
        this.head = this.node.getChildByName("head");
        this.rightHand = this.node.getChildByName("rightHand");
        this.leftHand = this.node.getChildByName("leftHand");
        this.rotationPoint = this.node.getChildByName("rotationPoint");
        this.eyes = this.node.getChildByName("head").getChildByName("eye");
        this.mouth = this.node.getChildByName("head").getChildByName("mouth");
        this.animationUtil = new Animations_1.default();
        this.currentState = State.Attack;
        this.currentAnimation = null;
      };
      AnimationController.prototype.start = function() {
        this.idleAnimation();
      };
      AnimationController.prototype.throwEgg = function() {
        if (this.rightHand.getParent() !== this.rotationPoint) {
          this.rightHand.setParent(this.rotationPoint);
          this.rightHand.setRotation(0, 0, 0, 0);
        }
        var rotatePoint = cc.rotateBy(500, 180);
        var rotateForever = cc.repeatForever(rotatePoint);
        this.rotationPoint.runAction(rotateForever);
      };
      AnimationController.prototype.idleAnimation = function() {
        this.animationUtil.upAndDownMovement(this.head, this.idleAnimationTime);
        this.animationUtil.upAndDownMovement(this.leftHand, 1.75 * this.idleAnimationTime);
        this.animationUtil.upAndDownMovement(this.rightHand, 1.75 * this.idleAnimationTime);
        this.animationUtil.openAndCloseAnimation(this.eyes, 3);
        this.animationUtil.openAndCloseAnimation(this.mouth, 2.5);
      };
      AnimationController.prototype.update = function(dt) {
        switch (this.currentState) {
         case State.Idle:
          if (this.currentAnimation !== CurrentAnimation.Idle) {
            console.log("State is idle hence we are setting the animation as Idle");
            this.currentAnimation = CurrentAnimation.Idle;
            this.node.stopAllActions();
            this.idleAnimation();
          }
          break;

         case State.Attack:
          if (this.currentAnimation !== CurrentAnimation.ThrowingEgg) {
            this.currentAnimation = CurrentAnimation.ThrowingEgg;
            this.node.stopAllActions();
            this.throwEgg();
          }
        }
      };
      __decorate([ property ], AnimationController.prototype, "idleAnimationTime", void 0);
      AnimationController = __decorate([ ccclass ], AnimationController);
      return AnimationController;
    }(cc.Component);
    exports.default = AnimationController;
    cc._RF.pop();
  }, {
    "../utils/Animations": "Animations"
  } ],
  AnimationHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "054965cVGFKcbh2c123WPpU", "AnimationHandler");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AnimationHandler = function(_super) {
      __extends(AnimationHandler, _super);
      function AnimationHandler() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.currentAnimation = null;
        _this.animations = [];
        return _this;
      }
      AnimationHandler.prototype.playAnimation = function(evt) {
        this.skeleton.animationName = evt.name;
      };
      AnimationHandler.prototype.onLoad = function() {
        this.node.on("play-animation", this.playAnimation, this);
        this.skeleton = this.node.getComponent(dragonBones.ArmatureDisplay);
        this.animations = this.skeleton.getAnimationNames(this.skeleton.armatureName);
      };
      AnimationHandler = __decorate([ ccclass ], AnimationHandler);
      return AnimationHandler;
    }(cc.Component);
    exports.default = AnimationHandler;
    cc._RF.pop();
  }, {} ],
  Animations: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d195cuso+1JiqwGCXqd66AZ", "Animations");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var AnimationsUtil = function() {
      function AnimationsUtil() {}
      AnimationsUtil.prototype.upAndDownMovement = function(node, totalAnimationTime) {
        void 0 === totalAnimationTime && (totalAnimationTime = 2);
        var moveUpAnimation = cc.moveBy(totalAnimationTime / 2, cc.v2(0, 10));
        var moveDownAnimation = cc.moveBy(totalAnimationTime / 2, cc.v2(0, -10));
        var upAndDownAnimationSequence = cc.sequence([ moveUpAnimation, moveDownAnimation ]);
        var repeatSequence = cc.repeatForever(upAndDownAnimationSequence);
        node.runAction(repeatSequence);
      };
      AnimationsUtil.prototype.openAndCloseAnimation = function(node, totalAnimationTime) {
        void 0 === totalAnimationTime && (totalAnimationTime = 2);
        var open = cc.scaleTo(totalAnimationTime / 2, .2, .2);
        var close = cc.scaleTo(totalAnimationTime / 2, .2, .01);
        var animationSequence = cc.sequence([ open, close ]);
        var openAndCloseAction = cc.repeatForever(animationSequence);
        node.runAction(openAndCloseAction);
      };
      AnimationsUtil = __decorate([ ccclass ], AnimationsUtil);
      return AnimationsUtil;
    }();
    exports.default = AnimationsUtil;
    cc._RF.pop();
  }, {} ],
  BaseEntity: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "395f7s3eLNCIJ2iylTJElQH", "BaseEntity");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BaseEntity = function(_super) {
      __extends(BaseEntity, _super);
      function BaseEntity() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.isPaused = false;
        return _this;
      }
      BaseEntity.prototype.onLoad = function() {
        cc.find("/Canvas").on("pauseGame", this.pauseUpdate, this);
        cc.find("/Canvas").on("resumeGame", this.resumeGame, this);
      };
      BaseEntity.prototype.pauseUpdate = function() {
        this.isPaused = true;
      };
      BaseEntity.prototype.resumeGame = function() {
        this.isPaused = false;
      };
      BaseEntity.prototype.update = function(dt) {};
      BaseEntity = __decorate([ ccclass ], BaseEntity);
      return BaseEntity;
    }(cc.Component);
    exports.default = BaseEntity;
    cc._RF.pop();
  }, {} ],
  BirdMovement: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1be173hTcJIgoG2i55usxy1", "BirdMovement");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HurtBirdMovement = function(_super) {
      __extends(HurtBirdMovement, _super);
      function HurtBirdMovement() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.horizontalMovement = 100;
        _this.verticalMovement = 50;
        return _this;
      }
      HurtBirdMovement.prototype.start = function() {};
      __decorate([ property ], HurtBirdMovement.prototype, "horizontalMovement", void 0);
      __decorate([ property ], HurtBirdMovement.prototype, "verticalMovement", void 0);
      HurtBirdMovement = __decorate([ ccclass ], HurtBirdMovement);
      return HurtBirdMovement;
    }(cc.Component);
    exports.default = HurtBirdMovement;
    cc._RF.pop();
  }, {} ],
  Brain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "91080VG+09AZatiFaXErlEQ", "Brain");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var States_1 = require("./States");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Brain = function(_super) {
      __extends(Brain, _super);
      function Brain() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.animationHandler = null;
        _this.collisionResolver = null;
        _this.movementController = null;
        _this.speechHandler = null;
        _this.healthIndicatorPrefab = null;
        _this.healthController = null;
        return _this;
      }
      Brain.prototype.onLoad = function() {
        this.animationHandler = this.node.getComponent("AnimationHandler");
        this.collisionResolver = this.node.getComponent("CollisionResolver");
        this.movementController = this.node.getComponent("MovementController");
        this.speechHandler = this.node.getComponent("SpeechHandler");
        var healthIndicator = cc.instantiate(this.healthIndicatorPrefab);
        var originHealthParent = this.node.getChildByName("healthIndicator");
        originHealthParent.addChild(healthIndicator);
        this.healthController = healthIndicator.getComponent("HealthController");
      };
      Brain.prototype.handleHitByEgg = function(payLoad) {
        payLoad.egg.destroy();
        this.healthController.handleTakingHit();
        this.movementController.setCanWalk(false);
        this.animationHandler.setState(States_1.States.TakingEggHit);
      };
      Brain.prototype.handleHitByEggEnd = function() {
        this.movementController.setCanWalk(true);
        this.animationHandler.setState(States_1.States.Walking);
      };
      Brain.prototype.handleWalkCycleComplete = function() {
        if (this.animationHandler.isTakingHit()) return;
        var randomNumber = 10 * Math.random();
        if (randomNumber >= 2) {
          this.movementController.setCanWalk(false);
          this.speechHandler.deliverSpeech();
          this.animationHandler.setState(States_1.States.DeliveringBhasan);
        } else {
          this.movementController.setCanWalk(true);
          this.animationHandler.setState(States_1.States.Walking);
        }
      };
      Brain.prototype.handleBhashanCycleDone = function() {
        if (this.animationHandler.isTakingHit()) return;
        var randomNumber = 10 * Math.random();
        if (randomNumber <= 2) {
          this.movementController.setCanWalk(false);
          this.animationHandler.setState(States_1.States.DeliveringBhasan);
        } else {
          this.movementController.setCanWalk(true);
          this.animationHandler.setState(States_1.States.Walking);
        }
      };
      Brain.prototype.handleDie = function() {
        this.node.destroy();
      };
      Brain.prototype.registerEvents = function(register) {
        if (register) {
          this.node.on("hitByEgg", this.handleHitByEgg, this);
          this.node.on("die", this.handleDie, this);
          this.node.on("bhashanCycleDone", this.handleBhashanCycleDone, this);
          this.node.on("walkCycleComplete", this.handleWalkCycleComplete, this);
          this.node.on("takingEggHitAnimationEnd", this.handleHitByEggEnd, this);
        } else {
          this.node.off("hitByEgg", this.handleHitByEgg, this);
          this.node.on("die", this.handleDie, this);
          this.node.off("bhashanCycleDone", this.handleBhashanCycleDone, this);
          this.node.off("walkCycleComplete", this.handleWalkCycleComplete, this);
          this.node.off("takingEggHitAnimationEnd", this.handleHitByEggEnd, this);
        }
      };
      Brain.prototype.start = function() {
        this.animationHandler.setState(States_1.States.Walking);
        this.registerEvents(true);
      };
      Brain.prototype.onDestroy = function() {
        this.registerEvents(false);
      };
      __decorate([ property(cc.Prefab) ], Brain.prototype, "healthIndicatorPrefab", void 0);
      Brain = __decorate([ ccclass ], Brain);
      return Brain;
    }(cc.Component);
    exports.default = Brain;
    cc._RF.pop();
  }, {
    "./States": "States"
  } ],
  ButtonClickHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "47c9duaprFHGJK1DKuk/+7z", "ButtonClickHandler");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ButtonClickHandler = function(_super) {
      __extends(ButtonClickHandler, _super);
      function ButtonClickHandler() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.scaleTo = 1.1;
        _this.totalAnimationTime = .4;
        _this.originalScale = new cc.Vec2();
        return _this;
      }
      ButtonClickHandler.prototype.bubbleEvent = function() {
        cc.find("/Canvas").emit("handleClick", {
          name: this.node.name
        });
        this.loadScene();
      };
      ButtonClickHandler.prototype.loadScene = function() {};
      ButtonClickHandler.prototype.handleClick = function(evt) {
        this.node.runAction(cc.sequence([ cc.scaleTo(this.totalAnimationTime / 2, this.scaleTo * this.originalScale.x, this.scaleTo * this.originalScale.y), cc.scaleTo(this.totalAnimationTime / 2, this.originalScale.x, this.originalScale.y), cc.callFunc(this.bubbleEvent, this) ]));
      };
      ButtonClickHandler.prototype.onLoad = function() {
        this.node.on("touchend", this.handleClick, this);
        this.originalScale = this.node.getScale(new cc.Vec2());
      };
      ButtonClickHandler.prototype.start = function() {};
      ButtonClickHandler.prototype.onDestroy = function() {
        this.node.off("touchend", this.handleClick, this);
      };
      __decorate([ property ], ButtonClickHandler.prototype, "scaleTo", void 0);
      __decorate([ property ], ButtonClickHandler.prototype, "totalAnimationTime", void 0);
      ButtonClickHandler = __decorate([ ccclass ], ButtonClickHandler);
      return ButtonClickHandler;
    }(cc.Component);
    exports.default = ButtonClickHandler;
    cc._RF.pop();
  }, {} ],
  CollisionResolver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e85014s28JGRrQqkXlClArd", "CollisionResolver");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CollisionResolver = function(_super) {
      __extends(CollisionResolver, _super);
      function CollisionResolver() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hitPoints = 25;
        return _this;
      }
      CollisionResolver.prototype.onCollisionEnter = function(other, self) {
        if ("netaJi" === other.node.group && 0 === other.tag) {
          other.node.emit("takeHit", {
            points: this.hitPoints
          });
          this.node.destroy();
        }
      };
      CollisionResolver.prototype.onLoad = function() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
      };
      CollisionResolver.prototype.start = function() {};
      CollisionResolver.prototype.onCollisionStay = function(other, self) {};
      CollisionResolver.prototype.onCollisionExit = function(other, self) {};
      __decorate([ property ], CollisionResolver.prototype, "hitPoints", void 0);
      CollisionResolver = __decorate([ ccclass ], CollisionResolver);
      return CollisionResolver;
    }(cc.Component);
    exports.default = CollisionResolver;
    cc._RF.pop();
  }, {} ],
  DebuggableNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "062eepGuWxFAq3+OCRl+r7j", "DebuggableNode");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DebuggableNode = function(_super) {
      __extends(DebuggableNode, _super);
      function DebuggableNode() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.graphics = null;
        _this.color = new cc.Color(255, 255, 255, 255);
        return _this;
      }
      DebuggableNode.prototype.start = function() {
        this.graphics = this.addComponent(cc.Graphics);
        this.graphics.lineWidth = 10;
      };
      DebuggableNode.prototype.update = function(dt) {
        this.graphics.clear();
        this.graphics.fillColor = this.color;
        this.graphics.fillRect(0, 0, this.width, this.height);
      };
      DebuggableNode = __decorate([ ccclass ], DebuggableNode);
      return DebuggableNode;
    }(cc.Node);
    exports.default = DebuggableNode;
    cc._RF.pop();
  }, {} ],
  EggAnimationController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "74007MbrmxISrnri4ZEANyM", "EggAnimationController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Enums = require("./Enums");
    var EggAnimationController = function(_super) {
      __extends(EggAnimationController, _super);
      function EggAnimationController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this.currentState = null;
        _this.currentAnimation = null;
        return _this;
      }
      EggAnimationController.prototype.onThrowAnimationComplete = function() {
        this.currentState = Enums.State.Idle;
        this.node.emit("throwEgg", {});
      };
      EggAnimationController.prototype.onIdleAnimationComplete = function() {};
      EggAnimationController.prototype.playIdleAnimation = function() {
        this.currentState !== Enums.State.Idle && (this.currentState = Enums.State.Idle);
        var animState = this.animation.play("idle");
        animState.wrapMode = cc.WrapMode.Loop;
        animState.repeatCount = Infinity;
      };
      EggAnimationController.prototype.playThrowAnimation = function() {
        var animState = this.animation.play("throw");
        animState.wrapMode = cc.WrapMode.Normal;
        animState.repeatCount = 1;
      };
      EggAnimationController.prototype.start = function() {};
      EggAnimationController.prototype.setState = function(state) {
        this.currentState = state;
      };
      EggAnimationController.prototype.onLoad = function() {
        this.animation = this.node.getComponent(cc.Animation);
      };
      EggAnimationController.prototype.update = function(dt) {
        switch (this.currentState) {
         case Enums.State.Idle:
          if (this.currentAnimation !== Enums.Animations.Idle) {
            this.currentAnimation = Enums.Animations.Idle;
            this.playIdleAnimation();
          }
          break;

         case Enums.State.Attack:
          if (this.currentAnimation !== Enums.Animations.ThrowingEgg) {
            this.currentAnimation = Enums.Animations.ThrowingEgg;
            this.playThrowAnimation();
          }
        }
      };
      EggAnimationController = __decorate([ ccclass ], EggAnimationController);
      return EggAnimationController;
    }(cc.Component);
    exports.default = EggAnimationController;
    cc._RF.pop();
  }, {
    "./Enums": "Enums"
  } ],
  EggGenerator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0da74k5+1dNhaENjjXgwBPK", "EggGenerator");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EggGenerator = function(_super) {
      __extends(EggGenerator, _super);
      function EggGenerator() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.egg = null;
        return _this;
      }
      EggGenerator.prototype.onLoad = function() {
        var eggOrigin = this.node.getChildByName("eggOrigin");
        this.eggGenerationPoint = eggOrigin.getPosition().add(this.node.getPosition());
      };
      EggGenerator.prototype.start = function() {
        var scene = cc.director.getScene();
        var newEgg = cc.instantiate(this.egg);
        newEgg.setScale(this.node.getScale(new cc.Vec2()).mul(.3));
        newEgg.setPosition(this.eggGenerationPoint);
        newEgg.parent = scene;
      };
      __decorate([ property(cc.Prefab) ], EggGenerator.prototype, "egg", void 0);
      EggGenerator = __decorate([ ccclass ], EggGenerator);
      return EggGenerator;
    }(cc.Component);
    exports.default = EggGenerator;
    cc._RF.pop();
  }, {} ],
  EggMan: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b592c7oMd5FabitiRI7hM7h", "EggMan");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Enums = require("./Enums");
    var EggMan = function(_super) {
      __extends(EggMan, _super);
      function EggMan() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.animationController = null;
        _this.hitVal = 10;
        _this.hand = null;
        _this.ground = null;
        _this.egg = null;
        _this.eggOrigination = null;
        return _this;
      }
      EggMan.prototype.launchEgg = function() {
        this.eggOrigination = this.node.convertToWorldSpaceAR(new cc.Vec2(this.hand.getPosition().x + 11, this.hand.getPosition().y + 4));
        console.log("Launching egg..");
        var newEgg = cc.instantiate(this.egg);
        var eggMovement = newEgg.getComponent("movement");
        eggMovement.setOwner(this);
        var scene = cc.director.getScene();
        scene.addChild(newEgg);
        newEgg.setPosition(this.eggOrigination);
      };
      EggMan.prototype.start = function() {
        var self = this;
        this.node.on("throwEgg", this.launchEgg.bind(this));
      };
      EggMan.prototype.onLoad = function() {
        this.animationController = this.node.getComponent("EggAnimationController");
        this.animationController.setState(Enums.State.Attack);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        this.hand = this.node.getChildByName("hand");
        this.ground = this.node.getChildByName("ground");
        console.log("The egg origination", this.eggOrigination);
      };
      EggMan.prototype.onCollisionEnter = function(other, self) {
        this.node.destroy();
        other.node.emit("takeHit", {
          hit: this.hitVal
        });
      };
      EggMan.prototype.update = function(dt) {};
      EggMan.prototype.getGroundPosition = function() {
        return this.node.convertToWorldSpaceAR(this.ground.getPosition());
      };
      __decorate([ property ], EggMan.prototype, "hitVal", void 0);
      __decorate([ property(cc.Prefab) ], EggMan.prototype, "egg", void 0);
      EggMan = __decorate([ ccclass ], EggMan);
      return EggMan;
    }(cc.Component);
    exports.default = EggMan;
    cc._RF.pop();
  }, {
    "./Enums": "Enums"
  } ],
  Enums: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98cbb1OHQBCAYdRLVVughRX", "Enums");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var State;
    (function(State) {
      State[State["Idle"] = 0] = "Idle";
      State[State["Attack"] = 1] = "Attack";
      State[State["TakingHit"] = 2] = "TakingHit";
      State[State["Die"] = 3] = "Die";
      State[State["Celebrating"] = 4] = "Celebrating";
    })(State = exports.State || (exports.State = {}));
    var Animations;
    (function(Animations) {
      Animations[Animations["Idle"] = 0] = "Idle";
      Animations[Animations["ThrowingEgg"] = 1] = "ThrowingEgg";
      Animations[Animations["TakingHit"] = 2] = "TakingHit";
      Animations[Animations["Die"] = 3] = "Die";
      Animations[Animations["Celebrating"] = 4] = "Celebrating";
    })(Animations = exports.Animations || (exports.Animations = {}));
    exports.default = {
      state: State,
      animations: Animations
    };
    cc._RF.pop();
  }, {} ],
  GameController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a539391xZNMaJdG2fRUhiYG", "GameController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameController = function(_super) {
      __extends(GameController, _super);
      function GameController() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      GameController.prototype.start = function() {};
      GameController = __decorate([ ccclass ], GameController);
      return GameController;
    }(cc.Component);
    exports.default = GameController;
    cc._RF.pop();
  }, {} ],
  GameLayOutHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6e6c6/9w3hGbKx99dvEADy5", "GameLayOutHandler");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TileClickHandler_1 = require("../groundTile/TileClickHandler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameLayoutHandler = function(_super) {
      __extends(GameLayoutHandler, _super);
      function GameLayoutHandler() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rows = 5;
        _this.groundTile = null;
        _this.garden = null;
        _this.columns = 9;
        _this.expectedWith = 1;
        _this.expectedHeight = 1;
        _this.lawnMover = null;
        _this.tiles = {};
        return _this;
      }
      GameLayoutHandler.prototype.calculateScale = function() {
        var width = this.node.width;
        var height = this.node.height;
        this.expectedWith = width / this.columns;
        this.expectedHeight = height / this.rows;
      };
      GameLayoutHandler.prototype.getTilePosition = function(row, col) {
        var x = col * this.expectedWith + this.expectedWith / 2;
        var y = row * this.expectedHeight + this.expectedHeight / 2;
        return new cc.Vec2(x, y);
      };
      GameLayoutHandler.prototype.onLoad = function() {
        this.calculateScale();
        this.scene = cc.director.getScene();
        cc.director.getCollisionManager().enabled = true;
        var index = 0;
        for (var row = 0; row < this.rows; row++) for (var col = 0; col < this.columns; col++) {
          var Tile = cc.instantiate(this.groundTile);
          var tileClickHandler = Tile.getComponent(TileClickHandler_1.default);
          var position = this.getTilePosition(row, col);
          tileClickHandler.setMetaData(row, col, index, position);
          Tile.width = this.expectedWith;
          Tile.height = this.expectedHeight;
          Tile.opacity = 0;
          this.garden.addChild(Tile);
          Tile.setPosition(position);
          this.tiles[index] = tileClickHandler;
          this.placeLawnMover(index);
          index++;
        }
        this.node.emit("tilesLayed", {
          tiles: this.tiles
        });
      };
      GameLayoutHandler.prototype.onCollisionEnter = function(other, self) {
        "netaJi" === other.node.group && 100 == self.tag && cc.find("/Canvas").emit("NetaJiWins");
      };
      GameLayoutHandler.prototype.placeLawnMover = function(index) {
        if (index % this.columns == 0) {
          var lawanMover = cc.instantiate(this.lawnMover);
          this.garden.addChild(lawanMover);
          var lawnPos = this.tiles[index].worldPos;
          lawanMover.setPosition(new cc.Vec2(lawnPos.x - lawanMover.width * lawanMover.scaleX, lawnPos.y));
        }
      };
      GameLayoutHandler.prototype.update = function(dt) {};
      __decorate([ property ], GameLayoutHandler.prototype, "rows", void 0);
      __decorate([ property(cc.Prefab) ], GameLayoutHandler.prototype, "groundTile", void 0);
      __decorate([ property(cc.Node) ], GameLayoutHandler.prototype, "garden", void 0);
      __decorate([ property ], GameLayoutHandler.prototype, "columns", void 0);
      __decorate([ property(cc.Prefab) ], GameLayoutHandler.prototype, "lawnMover", void 0);
      GameLayoutHandler = __decorate([ ccclass ], GameLayoutHandler);
      return GameLayoutHandler;
    }(cc.Component);
    exports.default = GameLayoutHandler;
    cc._RF.pop();
  }, {
    "../groundTile/TileClickHandler": "TileClickHandler"
  } ],
  GameProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93963WRykVKs5iMYyytLtCN", "GameProgress");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameProgress = function(_super) {
      __extends(GameProgress, _super);
      function GameProgress() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.savedProgress = null;
        _this.worlds = [ {
          index: 1,
          levels: [ {
            level: 1,
            world: 1,
            canPlay: true,
            sceneName: "World1Level1",
            starsAchieved: 0
          }, {
            level: 2,
            world: 1,
            canPlay: false,
            sceneName: "world1Leve2",
            starsAchieved: 0
          }, {
            level: 3,
            world: 1,
            canPlay: false,
            sceneName: "world1Leve3",
            starsAchieved: 0
          }, {
            level: 4,
            world: 1,
            canPlay: false,
            sceneName: "world1Leve4",
            starsAchieved: 0
          }, {
            level: 5,
            world: 1,
            canPlay: false,
            sceneName: "world1Leve5",
            starsAchieved: 0
          } ]
        } ];
        return _this;
      }
      GameProgress.prototype.start = function() {
        this.node.emit("loadedLevels", {
          game: this.worlds
        });
      };
      GameProgress = __decorate([ ccclass ], GameProgress);
      return GameProgress;
    }(cc.Component);
    exports.default = GameProgress;
    cc._RF.pop();
  }, {} ],
  GardenPlacement: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2e8bdeuNjtFF6LQAy8OyqvA", "GardenPlacement");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Plant_1 = require("./Plant");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GardenPlacement = function(_super) {
      __extends(GardenPlacement, _super);
      function GardenPlacement() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.selectedPlant = null;
        _this.rows = 5;
        _this.columns = 9;
        _this.plants = {};
        _this.tiles = {};
        _this.plantScale = null;
        _this.gardenNode = null;
        return _this;
      }
      GardenPlacement.prototype.plantSelected = function(evt) {
        this.selectedPlant = evt.plant;
      };
      GardenPlacement.prototype.getTileFromIndex = function(index) {
        var tile = this.tiles[index];
        return tile;
      };
      GardenPlacement.prototype.getPositionFromIndex = function(index) {
        var tile = this.tiles[index];
        return tile.getWorldPosition();
      };
      GardenPlacement.prototype.handlePlantDied = function(plant) {
        for (var i = 0; i < this.rows * this.columns; i++) {
          var currentPlant = this.plants[i];
          currentPlant && currentPlant.uuid === plant.uuid && delete this.plants[i];
        }
      };
      GardenPlacement.prototype.tilesHaveBeenLayed = function(evt) {
        this.tiles = evt.tiles;
      };
      GardenPlacement.prototype.onLoad = function() {
        cc.find("/Canvas").on("slected-plant", this.plantSelected, this);
        cc.find("/Canvas").on("plant-died", this.handlePlantDied, this);
        this.gardenNode = cc.find("/Canvas/bg/Garden");
        cc.find("/Canvas").on("tileClicked", this.handleTileClicked, this);
        this.node.on("tilesLayed", this.tilesHaveBeenLayed, this);
      };
      GardenPlacement.prototype.start = function() {};
      GardenPlacement.prototype.plantPresentAtIndex = function(index) {
        if (this.plants[index]) return true;
        return false;
      };
      GardenPlacement.prototype.handleTileClicked = function(evt) {
        var index = evt.index;
        if (null != this.selectedPlant && !this.plantPresentAtIndex(index)) {
          var plant = cc.instantiate(this.selectedPlant);
          this.gardenNode.addChild(plant);
          null == this.plantScale && (plant.width > evt.width || plant.height > evt.height ? this.plantScale = new cc.Vec2(plant.getScale(new cc.Vec2()).x * evt.width / plant.width, plant.getScale(new cc.Vec2()).y * evt.height / plant.height) : this.plantScale = plant.getScale(new cc.Vec2()));
          plant.setScale(this.plantScale);
          var plantComponent = plant.getComponent(Plant_1.default);
          plantComponent.row = Math.floor(index / this.columns);
          plantComponent.column = index % this.columns;
          plantComponent.worldPosition = evt.pos;
          plantComponent.index = index;
          plant.setPosition(evt.groundPosition);
          this.plants[index] = plant;
          cc.find("/Canvas").emit("plant-placed", {
            plant: plant,
            row: index / this.columns,
            column: index % this.columns
          });
        }
      };
      GardenPlacement = __decorate([ ccclass ], GardenPlacement);
      return GardenPlacement;
    }(cc.Component);
    exports.default = GardenPlacement;
    cc._RF.pop();
  }, {
    "./Plant": "Plant"
  } ],
  Globals: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "883d1Jd+nxM15lGZZPP17qH", "Globals");
    "use strict";
    cc._RF.pop();
  }, {} ],
  HealthController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cda644uuvJKJqHqlzvkGenZ", "HealthController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HealthController = function(_super) {
      __extends(HealthController, _super);
      function HealthController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.max = 10;
        _this.hitStep = 1;
        _this.currentHealth = 0;
        _this.progressBar = null;
        return _this;
      }
      HealthController.prototype.handleTakingHit = function() {
        this.currentHealth = this.currentHealth - this.hitStep;
        if (this.currentHealth > 0) this.progressBar.progress = this.currentHealth / this.max; else {
          this.progressBar.progress = 0;
          this.node.emit("die");
        }
      };
      HealthController.prototype.updateHealth = function(evt) {
        this.currentHealth = this.currentHealth - evt.points;
        this.currentHealth > 0 ? this.progressBar.progress = this.currentHealth / this.max : this.progressBar.progress = 0;
      };
      HealthController.prototype.onLoad = function() {
        this.progressBar = this.node.getComponent(cc.ProgressBar);
        this.currentHealth = this.max;
        this.node.on("takeHit", this.updateHealth, this);
      };
      __decorate([ property ], HealthController.prototype, "max", void 0);
      __decorate([ property ], HealthController.prototype, "hitStep", void 0);
      HealthController = __decorate([ ccclass ], HealthController);
      return HealthController;
    }(cc.Component);
    exports.default = HealthController;
    cc._RF.pop();
  }, {} ],
  IntroductionScript: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa313OxG+ZPOrsodCgz1eyA", "IntroductionScript");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var IntroductionScript = function(_super) {
      __extends(IntroductionScript, _super);
      function IntroductionScript() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.play = null;
        _this.about = null;
        _this.soundOn = null;
        return _this;
      }
      IntroductionScript.prototype.onLoad = function() {
        this.play = cc.find("/Canvas/play");
        this.about = cc.find("/Canvas/about");
        this.soundOn = cc.find("/Canvas/sound");
        cc.find("/Canvas").on("handleClick", this.handleClick, this);
      };
      IntroductionScript.prototype.handleClick = function(evt) {
        "play" === evt.name && cc.director.loadScene("world1LevelSelector");
      };
      IntroductionScript = __decorate([ ccclass ], IntroductionScript);
      return IntroductionScript;
    }(cc.Component);
    exports.default = IntroductionScript;
    cc._RF.pop();
  }, {} ],
  KejaruController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5aecaD/BHpOw4H0aXNn6hTd", "KejaruController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NetaJi_1 = require("../game/NetaJi");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var KejaruController = function(_super) {
      __extends(KejaruController, _super);
      function KejaruController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lifePoints = 100;
        return _this;
      }
      KejaruController.prototype.takeHit = function(evt) {
        this.lifePoints -= evt.points;
        this.node.emit("play-animation", {
          name: "takingHit"
        });
        this.lifePoints <= 0 && this.node.emit("play-animation", {
          name: "die"
        });
      };
      KejaruController.prototype.start = function() {
        this.node.on("takeHit", this.takeHit, this);
      };
      __decorate([ property ], KejaruController.prototype, "lifePoints", void 0);
      KejaruController = __decorate([ ccclass ], KejaruController);
      return KejaruController;
    }(NetaJi_1.default);
    exports.default = KejaruController;
    cc._RF.pop();
  }, {
    "../game/NetaJi": "NetaJi"
  } ],
  KejaruSideController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73046TKoupHwbmdtSoKU4vp", "KejaruSideController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NetaJi_1 = require("../../Scripts/game/NetaJi");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var KejaruSideController = function(_super) {
      __extends(KejaruSideController, _super);
      function KejaruSideController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.totalHealth = 90;
        _this.offsetFromBotoom = 5;
        _this.timesKejaruCanDefend = 10;
        _this.canDefend = true;
        _this.damageFactorInDefence = .2;
        _this.damagePerSecond = 25;
        _this.currentAnimation = null;
        _this.animations = [];
        _this.walkingSpeed = 10;
        _this.left = false;
        _this.healthIndicator = null;
        _this.canWalk = true;
        _this.walkingRow = 0;
        _this.originalTimeScala = 1;
        _this.currentPlantToEat = null;
        return _this;
      }
      KejaruSideController.prototype.setCanWalk = function(canWalk) {
        this.canWalk = canWalk;
      };
      KejaruSideController.prototype.updateBounds = function() {
        this.node.getPosition().x < 10 && this.node.emit("kejru-wins", {
          position: this.node.convertToWorldSpaceAR(this.node.getPosition())
        });
        this.node.destroy();
      };
      KejaruSideController.prototype.playAnimation = function(name, playTimes) {
        if ("eatPlant" == this.skeleton.animationName) return;
        "walk" == name && (this.canWalk = true);
        this.skeleton.playAnimation(name, playTimes);
      };
      KejaruSideController.prototype.takeHit = function(evt) {
        this.totalHealth -= evt.points;
        this.healthIndicator.emit("takeHit", {
          points: evt.points * this.damageFactorInDefence
        });
        if (this.totalHealth <= 0) {
          cc.find("/Canvas").emit("netaJiDied", {
            uuid: this.node.uuid
          });
          this.node.destroy();
        }
        this.canWalk = false;
        this.skeleton.timeScale = this.originalTimeScala;
        this.playAnimation("walk", 1e3);
      };
      KejaruSideController.prototype.eatCurrentPlant = function() {
        this.currentPlantToEat.emit("takeHit", {
          points: this.damagePerSecond,
          node: this.node
        });
      };
      KejaruSideController.prototype.eatPlant = function(evt) {
        this.canWalk = false;
        this.playAnimation("eatPlant", 100);
        this.currentPlantToEat = evt.plant.node;
        this.schedule(this.eatCurrentPlant, 1, 1e3, 0);
      };
      KejaruSideController.prototype.aboutToTakeHit = function() {
        if ("eatPlant" == this.skeleton.animationName || !this.canDefend) return;
        if (10 * Math.random() <= 3 && this.timesKejaruCanDefend >= 1) {
          console.log("Only 30% of the hits will be defended");
          return;
        }
        this.timesKejaruCanDefend -= 1;
        if (this.timesKejaruCanDefend < 0) return;
        this.canWalk = false;
        this.skeleton.timeScale = 3;
        this.playAnimation("defend", 1);
      };
      KejaruSideController.prototype.doneEating = function() {
        this.unschedule(this.eatCurrentPlant);
        this.canWalk = true;
        this.skeleton.playAnimation("walk", -1);
      };
      KejaruSideController.prototype.start = function() {
        _super.prototype.start.call(this);
        this.node.on("takeHit", this.takeHit, this);
        this.node.on("aboutToTakeHit", this.aboutToTakeHit, this);
        this.node.on("eatPlant", this.eatPlant, this);
        this.node.on("doneEating", this.doneEating, this);
        this.originalTimeScala = this.skeleton.timeScale;
      };
      KejaruSideController.prototype.onLoad = function() {
        this.skeleton = this.node.getComponent(dragonBones.ArmatureDisplay);
        this.animations = this.skeleton.getAnimationNames(this.skeleton.armatureName);
        this.healthIndicator = this.node.getChildByName("healthIndicator");
      };
      KejaruSideController.prototype.update = function(dt) {
        _super.prototype.update.call(this, dt);
        if (!this.canWalk) return;
        this.left ? this.node.x = this.node.x - this.walkingSpeed * dt : this.node.x = this.node.x + this.walkingSpeed * dt;
      };
      __decorate([ property ], KejaruSideController.prototype, "totalHealth", void 0);
      __decorate([ property ], KejaruSideController.prototype, "offsetFromBotoom", void 0);
      __decorate([ property ], KejaruSideController.prototype, "timesKejaruCanDefend", void 0);
      __decorate([ property ], KejaruSideController.prototype, "canDefend", void 0);
      __decorate([ property ], KejaruSideController.prototype, "damageFactorInDefence", void 0);
      __decorate([ property ], KejaruSideController.prototype, "damagePerSecond", void 0);
      __decorate([ property ], KejaruSideController.prototype, "walkingSpeed", void 0);
      __decorate([ property ], KejaruSideController.prototype, "left", void 0);
      KejaruSideController = __decorate([ ccclass ], KejaruSideController);
      return KejaruSideController;
    }(NetaJi_1.default);
    exports.default = KejaruSideController;
    cc._RF.pop();
  }, {
    "../../Scripts/game/NetaJi": "NetaJi"
  } ],
  KitanuController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a8c38TYkiRPhKHRkVbnj4EV", "KitanuController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var KitanuController = function(_super) {
      __extends(KitanuController, _super);
      function KitanuController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.speedX = 30;
        _this.speedY = 10;
        _this.hitPoints = 10;
        _this.yDisplacement = 10;
        _this.timeToLive = 20;
        _this.kitanuCanHit = [ "EGG", "PLANT" ];
        _this.currentTime = 0;
        _this.angle = 0;
        return _this;
      }
      KitanuController.prototype.onCollisionEnter = function(other, self) {
        if (this.kitanuCanHit.indexOf(other.node.group) > -1) {
          other.node.emit("takeHit", {
            points: this.hitPoints
          });
          this.node.destroy();
        }
      };
      KitanuController.prototype.start = function() {
        cc.director.getCollisionManager().enabled = true;
      };
      KitanuController.prototype.getXCordinate = function(dt) {
        return this.speedX * dt;
      };
      KitanuController.prototype.update = function(dt) {
        this.currentTime += dt;
        this.currentTime > this.timeToLive && this.node.destroy();
        this.angle += 360 * dt;
        this.node.x = this.node.x - this.getXCordinate(dt);
        this.node.y = this.node.y + this.speedY * dt + this.yDisplacement * Math.cos(this.angle);
      };
      __decorate([ property ], KitanuController.prototype, "speedX", void 0);
      __decorate([ property ], KitanuController.prototype, "speedY", void 0);
      __decorate([ property ], KitanuController.prototype, "hitPoints", void 0);
      __decorate([ property ], KitanuController.prototype, "yDisplacement", void 0);
      __decorate([ property ], KitanuController.prototype, "timeToLive", void 0);
      KitanuController = __decorate([ ccclass ], KitanuController);
      return KitanuController;
    }(cc.Component);
    exports.default = KitanuController;
    cc._RF.pop();
  }, {} ],
  LawnMover: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0aeb7PryaRFCbgV4Ym8jMTd", "LawnMover");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MovementController_1 = require("../../Scripts/kejru/MovementController");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LawnMover = function(_super) {
      __extends(LawnMover, _super);
      function LawnMover() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.audio = null;
        _this.originalSpeed = 0;
        return _this;
      }
      LawnMover.prototype.start = function() {};
      LawnMover.prototype.onCollisionEnter = function(other, self) {
        if ("netaJi" === other.node.group && 128 === other.tag) {
          other.node.emit("crushedByLawnMover");
          this.run();
        }
      };
      LawnMover.prototype.run = function() {
        this.walkingSpeed = this.originalSpeed;
        this.audio.play();
      };
      LawnMover.prototype.onLoad = function() {
        this.audio = this.node.getComponent(cc.AudioSource);
        cc.director.getCollisionManager().enabled = true;
        this.originalSpeed = this.walkingSpeed;
        this.walkingSpeed = 0;
      };
      LawnMover.prototype.onCollisionStay = function(other, self) {};
      LawnMover.prototype.onCollisionExit = function(other, self) {};
      LawnMover = __decorate([ ccclass ], LawnMover);
      return LawnMover;
    }(MovementController_1.default);
    exports.default = LawnMover;
    cc._RF.pop();
  }, {
    "../../Scripts/kejru/MovementController": "MovementController"
  } ],
  LevelLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e02f9VfprBLkaSiIFB+O/up", "LevelLoader");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DebuggableNode_1 = require("../util/DebuggableNode");
    var LevelSelectorButton_1 = require("./LevelSelectorButton");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelLoader = function(_super) {
      __extends(LevelLoader, _super);
      function LevelLoader() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levelButton = null;
        _this.lockedButton = null;
        _this.world = 1;
        _this.numberOfLevels = 3;
        _this.rows = 2;
        _this.cols = 3;
        _this.userAt = 1;
        _this.container = null;
        _this.gameState = null;
        return _this;
      }
      LevelLoader.prototype.onLoad = function() {
        this.node.on("loadedLevels", this.layLevelSelectorTiles, this);
      };
      LevelLoader.prototype.getLevelsFromWorld = function(evt) {
        var _this = this;
        var levels = [];
        evt.game.forEach(function(eachWorld) {
          eachWorld.index === _this.world && (levels = eachWorld.levels);
        });
        return levels;
      };
      LevelLoader.prototype.layLevelSelectorTiles = function(evt) {
        var levels = this.getLevelsFromWorld(evt);
        var index = 1;
        for (var row = 1; row <= this.rows; row++) for (var col = 1; col <= this.cols; col++) if (index <= levels.length) {
          var level = levels[index - 1];
          if (level.canPlay) {
            var node = new DebuggableNode_1.default();
            node.width = this.container.width / this.cols;
            node.height = this.container.height / this.rows;
            var levelButton = cc.instantiate(this.levelButton);
            levelButton.getChildByName("level").getComponent(cc.Label).string = "" + level.level;
            var levelSectorButton = levelButton.getComponent(LevelSelectorButton_1.default);
            levelSectorButton.sceneName = level.sceneName;
            this.container.addChild(node);
            node.addChild(levelButton);
            levelButton.setPosition(new cc.Vec2(0, 0));
            node.setPosition(new cc.Vec2((col - 1) * node.width + node.width / 2, -1 * ((row - 1) * node.height + node.height / 2)));
          } else {
            var node = new cc.Node();
            node.width = this.container.width / this.cols;
            node.height = this.container.height / this.rows;
            node.setAnchorPoint(new cc.Vec2(0, 0));
            var levelButton = cc.instantiate(this.lockedButton);
            node.addChild(levelButton);
            levelButton.getChildByName("level").getComponent(cc.Label).string = "" + index;
            levelButton.setPosition(new cc.Vec2(0, 0));
            this.container.addChild(node);
            node.setPosition(new cc.Vec2((col - 1) * node.width + node.width / 2, -1 * ((row - 1) * node.height + node.height / 2)));
          }
          index++;
        }
      };
      __decorate([ property(cc.Prefab) ], LevelLoader.prototype, "levelButton", void 0);
      __decorate([ property(cc.Prefab) ], LevelLoader.prototype, "lockedButton", void 0);
      __decorate([ property ], LevelLoader.prototype, "world", void 0);
      __decorate([ property ], LevelLoader.prototype, "numberOfLevels", void 0);
      __decorate([ property ], LevelLoader.prototype, "rows", void 0);
      __decorate([ property ], LevelLoader.prototype, "cols", void 0);
      __decorate([ property ], LevelLoader.prototype, "userAt", void 0);
      __decorate([ property(cc.Node) ], LevelLoader.prototype, "container", void 0);
      LevelLoader = __decorate([ ccclass ], LevelLoader);
      return LevelLoader;
    }(cc.Component);
    exports.default = LevelLoader;
    cc._RF.pop();
  }, {
    "../util/DebuggableNode": "DebuggableNode",
    "./LevelSelectorButton": "LevelSelectorButton"
  } ],
  LevelProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c8besk/E1GpbiHuV22zuiN", "LevelProgress");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelProgress = function(_super) {
      __extends(LevelProgress, _super);
      function LevelProgress() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.level = 1;
        _this.score = 0;
        _this.totalNetajies = 40;
        _this.levelNode = null;
        _this.totalNetajiesNode = null;
        _this.scoreNode = null;
        _this.barNode = null;
        _this.loadingBarContainer = null;
        _this.progress = 0;
        _this.totalNetajiesShamed = 0;
        return _this;
      }
      LevelProgress.prototype.onLoad = function() {
        this.levelNode = this.node.getChildByName("LevelIndicator").getChildByName("Level").getComponent(cc.Label);
        this.totalNetajiesNode = this.node.getChildByName("Status").getChildByName("netajiLeft").getComponent(cc.Label);
        this.scoreNode = this.node.getChildByName("Score").getChildByName("value").getComponent(cc.Label);
        this.barNode = this.node.getChildByName("loadingBar").getChildByName("bar");
        this.loadingBarContainer = this.node.getChildByName("loadingBar");
      };
      LevelProgress.prototype.registerEvents = function() {
        cc.find("/Canvas").on("netaJiDied", this.handleNetaJiDead, this);
        cc.find("/Canvas").on("updateScore", this.updateScore, this);
      };
      LevelProgress.prototype.handleNetaJiDead = function() {
        this.totalNetajiesShamed++;
        this.totalNetajiesNode.string = "" + (this.totalNetajies - this.totalNetajiesShamed);
        this.updateProgress();
      };
      LevelProgress.prototype.updateScore = function(evt) {
        this.score = evt.score;
        this.scoreNode.string = "Score " + this.score;
      };
      LevelProgress.prototype.updateProgress = function() {
        this.barNode.width = this.totalNetajiesShamed / this.totalNetajies * this.loadingBarContainer.width;
      };
      LevelProgress.prototype.setUpInitialValue = function() {
        this.barNode.width = 0;
        this.levelNode.string = "Level " + this.level;
        this.scoreNode.string = "Score " + this.score;
      };
      LevelProgress.prototype.start = function() {
        this.setUpInitialValue();
      };
      __decorate([ property ], LevelProgress.prototype, "level", void 0);
      __decorate([ property ], LevelProgress.prototype, "score", void 0);
      __decorate([ property ], LevelProgress.prototype, "totalNetajies", void 0);
      LevelProgress = __decorate([ ccclass ], LevelProgress);
      return LevelProgress;
    }(cc.Component);
    exports.default = LevelProgress;
    cc._RF.pop();
  }, {} ],
  LevelSelectorButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b1464Lh/idNN7cwkwhBmkfw", "LevelSelectorButton");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ButtonClickHandler_1 = require("./ButtonClickHandler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelSelectorButton = function(_super) {
      __extends(LevelSelectorButton, _super);
      function LevelSelectorButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.level = "1";
        _this.sceneName = "";
        _this.levelNode = null;
        _this.star1 = null;
        _this.star2 = null;
        _this.star3 = null;
        _this.star4 = null;
        return _this;
      }
      LevelSelectorButton.prototype.start = function() {
        _super.prototype.start.call(this);
        this.levelNode = this.node.getChildByName("level");
        this.star1 = this.node.getChildByName("star1");
        this.star2 = this.node.getChildByName("star2");
        this.star3 = this.node.getChildByName("star3");
        this.star4 = this.node.getChildByName("star4");
      };
      LevelSelectorButton.prototype.loadScene = function() {
        console.log("The scene name is ", this.sceneName);
        cc.director.loadScene(this.sceneName);
      };
      __decorate([ property ], LevelSelectorButton.prototype, "level", void 0);
      __decorate([ property ], LevelSelectorButton.prototype, "sceneName", void 0);
      LevelSelectorButton = __decorate([ ccclass ], LevelSelectorButton);
      return LevelSelectorButton;
    }(ButtonClickHandler_1.default);
    exports.default = LevelSelectorButton;
    cc._RF.pop();
  }, {
    "./ButtonClickHandler": "ButtonClickHandler"
  } ],
  Level: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4f091eYjhZHL6YBkzKpgx7v", "Level");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Level = function() {
      function Level(level, world, starsAchieved, canPlay, sceneName) {
        this.level = level;
        this.world = world;
        this.starsAchieved = starsAchieved;
        this.canPlay = canPlay;
        this.sceneName = sceneName;
      }
      Level.prototype.start = function() {};
      Level = __decorate([ ccclass ], Level);
      return Level;
    }();
    exports.default = Level;
    cc._RF.pop();
  }, {} ],
  MovementController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dc3dee/YcJIqoc2qSvoL3af", "MovementController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MovementController = function(_super) {
      __extends(MovementController, _super);
      function MovementController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.walkingSpeed = 10;
        _this.left = false;
        _this.canWalk = true;
        return _this;
      }
      MovementController.prototype.setCanWalk = function(canWalk) {
        this.canWalk = canWalk;
      };
      MovementController.prototype.start = function() {
        this.scheduleOnce(this.checkBounds, 2);
      };
      MovementController.prototype.checkBounds = function() {
        (this.node.x + this.node.width < -100 || this.node.x + this.node.width > cc.winSize.width + 100 || this.node.y + this.node.height < -100 || this.node.y + this.node.height > cc.winSize.height + 100) && this.node.destroy();
      };
      MovementController.prototype.update = function(dt) {
        this.checkBounds();
        if (!this.canWalk) return;
        this.left ? this.node.x = this.node.x - this.walkingSpeed * dt : this.node.x = this.node.x + this.walkingSpeed * dt;
      };
      __decorate([ property ], MovementController.prototype, "walkingSpeed", void 0);
      __decorate([ property ], MovementController.prototype, "left", void 0);
      MovementController = __decorate([ ccclass ], MovementController);
      return MovementController;
    }(cc.Component);
    exports.default = MovementController;
    cc._RF.pop();
  }, {} ],
  NetaJi: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "344703kS6NDApNXibDSR+12", "NetaJi");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NetaJi = function(_super) {
      __extends(NetaJi, _super);
      function NetaJi() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.row = 0;
        _this.column = 0;
        _this.howOftenToCheckForPlant = 0;
        _this.physicsManager = null;
        _this.canDefend = true;
        _this.currentTime = 0;
        return _this;
      }
      NetaJi.prototype.handleLawnMoverHit = function(evt) {
        this.node.destroy();
      };
      NetaJi.prototype.aboutToTakeHit = function() {};
      NetaJi.prototype.start = function() {
        this.node.on("crushedByLawnMover", this.handleLawnMoverHit, this);
        cc.director.getCollisionManager().enabled = true;
        this.physicsManager = cc.director.getPhysicsManager();
      };
      NetaJi.prototype.onCollisionEnter = function(other, self) {
        "bullet" === other.node.group && 100 === self.tag && this.aboutToTakeHit();
      };
      NetaJi.prototype.onCollisionStay = function(other, self) {
        "netaJi" === other.node.group && (this.canDefend = false);
      };
      NetaJi.prototype.onCollisionExit = function(other, self) {
        "netaJi" === other.node.group && (this.canDefend = true);
      };
      NetaJi.prototype.update = function() {};
      NetaJi = __decorate([ ccclass ], NetaJi);
      return NetaJi;
    }(cc.Component);
    exports.default = NetaJi;
    cc._RF.pop();
  }, {} ],
  NewPlantSelectButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "efc47ou8wJKZrNS3wyYpF7e", "NewPlantSelectButton");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ButtonClickHandler_1 = require("../ButtonClickHandler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewPlantSelectButton = function(_super) {
      __extends(NewPlantSelectButton, _super);
      function NewPlantSelectButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mainParentNode = null;
        _this.plantName = "Sunflower";
        _this.level = 1;
        return _this;
      }
      NewPlantSelectButton.prototype.start = function() {};
      __decorate([ property(cc.Node) ], NewPlantSelectButton.prototype, "mainParentNode", void 0);
      __decorate([ property(cc.String) ], NewPlantSelectButton.prototype, "plantName", void 0);
      __decorate([ property ], NewPlantSelectButton.prototype, "level", void 0);
      NewPlantSelectButton = __decorate([ ccclass ], NewPlantSelectButton);
      return NewPlantSelectButton;
    }(ButtonClickHandler_1.default);
    exports.default = NewPlantSelectButton;
    cc._RF.pop();
  }, {
    "../ButtonClickHandler": "ButtonClickHandler"
  } ],
  PauseButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "14a26gQ/tdMKo7+emnXWtb8", "PauseButton");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ButtonClickHandler_1 = require("../ButtonClickHandler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PauseButton = function(_super) {
      __extends(PauseButton, _super);
      function PauseButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pauseButtonPopup = null;
        return _this;
      }
      PauseButton.prototype.onload = function() {
        _super.prototype.onLoad.call(this);
      };
      PauseButton.prototype.loadScene = function() {
        this.pauseButtonPopup.active = true;
        cc.find("/Canvas").emit("pauseGame", {});
      };
      __decorate([ property(cc.Node) ], PauseButton.prototype, "pauseButtonPopup", void 0);
      PauseButton = __decorate([ ccclass ], PauseButton);
      return PauseButton;
    }(ButtonClickHandler_1.default);
    exports.default = PauseButton;
    cc._RF.pop();
  }, {
    "../ButtonClickHandler": "ButtonClickHandler"
  } ],
  PausePopUp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fd2e9rWy4ZGQo2sUFFZs4M7", "PausePopUp");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ButtonClickHandler_1 = require("../ButtonClickHandler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.handleClick = function(evt) {
        evt.stopPropagation();
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(ButtonClickHandler_1.default);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../ButtonClickHandler": "ButtonClickHandler"
  } ],
  PlantsRepository: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f92czlqehPY6yUIGX5qUnX", "PlantsRepository");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PlantsRepository = function(_super) {
      __extends(PlantsRepository, _super);
      function PlantsRepository() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.peaShooter = null;
        return _this;
      }
      PlantsRepository.prototype.start = function() {};
      __decorate([ property(cc.Prefab) ], PlantsRepository.prototype, "peaShooter", void 0);
      PlantsRepository = __decorate([ ccclass ], PlantsRepository);
      return PlantsRepository;
    }(cc.Component);
    exports.default = PlantsRepository;
    cc._RF.pop();
  }, {} ],
  PlantsSelectorButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b3c3cC70J5KNIN8AWkNweej", "PlantsSelectorButton");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ButtonClickHandler_1 = require("../ButtonClickHandler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PlantsSelectorButton = function(_super) {
      __extends(PlantsSelectorButton, _super);
      function PlantsSelectorButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.plantsSelector = null;
        return _this;
      }
      PlantsSelectorButton.prototype.loadScene = function() {
        this.plantsSelector.active = true;
      };
      __decorate([ property(cc.Node) ], PlantsSelectorButton.prototype, "plantsSelector", void 0);
      PlantsSelectorButton = __decorate([ ccclass ], PlantsSelectorButton);
      return PlantsSelectorButton;
    }(ButtonClickHandler_1.default);
    exports.default = PlantsSelectorButton;
    cc._RF.pop();
  }, {
    "../ButtonClickHandler": "ButtonClickHandler"
  } ],
  Plant: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ed172IQ5qZL7b3Zbf2gkcI7", "Plant");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NetaJi_1 = require("./NetaJi");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Plant = function(_super) {
      __extends(Plant, _super);
      function Plant() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.row = 0;
        _this.column = 0;
        _this.index = 0;
        _this.worldPosition = null;
        _this.proximityTagForNetaJi = 10;
        _this.healthIndicator = null;
        _this.health = 200;
        _this.currentTime = 0;
        return _this;
      }
      Plant.prototype.onLoad = function() {
        this.healthIndicator = this.node.getChildByName("healthIndicator");
        cc.director.getCollisionManager().enabled = true;
      };
      Plant.prototype.reactToNetajiProximity = function(netaJiNear) {};
      Plant.prototype.onCollisionEnter = function(other, self) {
        if ("netaJi" === other.node.group && 0 == other.tag && self.tag === this.proximityTagForNetaJi) {
          var netaJi = other.node.getComponent(NetaJi_1.default);
          netaJi.row === this.row && this.reactToNetajiProximity(true);
          return;
        }
        if ("netaJi" === other.node.group && 0 === other.tag) {
          var netaJi = other.node.getComponent(NetaJi_1.default);
          netaJi.row === this.row && other.node.emit("eatPlant", {
            plant: this
          });
        }
      };
      Plant.prototype.onCollisionStay = function(other, self) {
        if ("netaJi" === other.node.group) {
          var netaJi = other.node.getComponent(NetaJi_1.default);
          netaJi.row === this.row && this.reactToNetajiProximity(true);
        }
      };
      Plant.prototype.onCollisionExit = function(other, self) {
        if ("netaJi" === other.node.group) {
          var netaJi = other.node.getComponent(NetaJi_1.default);
          netaJi.row === this.row && this.reactToNetajiProximity(false);
        }
      };
      __decorate([ property ], Plant.prototype, "health", void 0);
      Plant = __decorate([ ccclass ], Plant);
      return Plant;
    }(cc.Component);
    exports.default = Plant;
    cc._RF.pop();
  }, {
    "./NetaJi": "NetaJi"
  } ],
  PlayButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ab9a30etWRLd4c6S3DdHsjW", "PlayButton");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ButtonClickHandler_1 = require("../ButtonClickHandler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PlayButton = function(_super) {
      __extends(PlayButton, _super);
      function PlayButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.container = null;
        _this.insidePopUp = false;
        return _this;
      }
      PlayButton.prototype.loadScene = function() {
        this.insidePopUp && (this.container.active = false);
        cc.find("/Canvas").emit("resumeGame", {});
      };
      PlayButton.prototype.start = function() {};
      __decorate([ property(cc.Node) ], PlayButton.prototype, "container", void 0);
      __decorate([ property(Boolean) ], PlayButton.prototype, "insidePopUp", void 0);
      PlayButton = __decorate([ ccclass ], PlayButton);
      return PlayButton;
    }(ButtonClickHandler_1.default);
    exports.default = PlayButton;
    cc._RF.pop();
  }, {
    "../ButtonClickHandler": "ButtonClickHandler"
  } ],
  ProgressLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "43967/AyDJJpoxt3wP9QNhu", "ProgressLoader");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ProgressLoader = function() {
      function ProgressLoader() {
        this.savedProgress = null;
      }
      ProgressLoader.prototype.loadGame = function() {
        return JSON.parse(cc.sys.localStorage.getItem("gameProgress"));
      };
      ProgressLoader.prototype.saveGame = function(userProgress) {
        cc.sys.localStorage.setItem("gameProgress", JSON.stringify(userProgress));
      };
      ProgressLoader.prototype.start = function() {
        this.loadGame();
      };
      ProgressLoader = __decorate([ ccclass ], ProgressLoader);
      return ProgressLoader;
    }();
    exports.default = ProgressLoader;
    cc._RF.pop();
  }, {} ],
  SelectPlantController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17d039DiklNJL0EXn5DitIx", "SelectPlantController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StarRepositoryController_1 = require("./StarRepositoryController");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SelectPlantController = function(_super) {
      __extends(SelectPlantController, _super);
      function SelectPlantController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.refreshRate = 10;
        _this.plantToSeed = null;
        _this.sunRepository = null;
        _this.sunRepositoryController = null;
        _this.points = 1;
        _this.tileHeight = 0;
        _this.currentHeight = 0;
        _this.enoughPoints = false;
        _this.refreshing = false;
        _this.selected = false;
        _this.veil = null;
        _this.selectedNode = null;
        _this.gameCallout = null;
        _this.originalScale = 1;
        return _this;
      }
      SelectPlantController.prototype.canSelect = function() {
        return !this.refreshing || !this.enoughPoints;
      };
      SelectPlantController.prototype.sunsRepositoryChanged = function(evt) {
        evt.suns >= this.points ? this.enoughPoints = true : this.enoughPoints = false;
      };
      SelectPlantController.prototype.plantPlaced = function(evt) {
        if (evt.plant.name === this.plantToSeed.name) {
          this.refreshing = true;
          this.selected = false;
          cc.find("/Canvas").emit("slected-plant", {
            plant: null
          });
          this.sunRepository.emit("update-suns", {
            points: -this.points
          });
        }
      };
      SelectPlantController.prototype.updateAppearance = function(dt) {
        if (this.refreshing) {
          this.veil.height = this.veil.height + this.refreshRate * dt;
          if (this.veil.height >= this.tileHeight) {
            this.refreshing = false;
            this.veil.height = 0;
          }
        }
        if (!this.canSelect() && 122 != this.veil.opacity) {
          this.veil.height = this.node.height;
          this.veil.color = new cc.Color(0, 0, 0);
          this.veil.opacity = 122;
        }
        this.selected && !this.selectedNode.active && (this.selectedNode.active = true);
        !this.selected && this.selectedNode.active && (this.selectedNode.active = false);
      };
      SelectPlantController.prototype.start = function() {
        this.tileHeight = this.node.height;
        this.sunRepository = cc.find("/Canvas/bg/HUD/footer/SunsRepository");
        this.sunRepositoryController = this.sunRepository.getComponent(StarRepositoryController_1.default);
        this.node.on(cc.Node.EventType.TOUCH_END, this.handleClick, this);
        this.sunRepository.on("suns-changed", this.sunsRepositoryChanged, this);
        cc.find("/Canvas").on("plant-placed", this.plantPlaced, this);
        this.veil = this.node.getChildByName("veil");
        this.selectedNode = this.node.getChildByName("sletedNode");
        this.selectedNode.active = false;
        this.veil.height = 0;
        this.gameCallout = cc.find("/Canvas/bg/HUD/GameCallout");
        this.originalScale = this.sunRepositoryController.node.scale;
      };
      SelectPlantController.prototype.erazeGameCallout = function() {
        this.gameCallout.getComponent(cc.Label).string = "";
      };
      SelectPlantController.prototype.handleClick = function(evt) {
        if (this.sunRepositoryController.suns <= 0) {
          this.gameCallout.getComponent(cc.Label).string = "You dont have enough suns, click on the suns first to plant";
          this.sunRepositoryController.node.runAction(cc.sequence([ cc.scaleTo(.2, 1.1), cc.scaleTo(.2, 1), cc.delayTime(2), cc.callFunc(this.erazeGameCallout, this) ]));
          return;
        }
        if (this.sunRepositoryController.suns < this.points) {
          this.gameCallout.getComponent(cc.Label).string = "You need atleast " + this.points + " suns to plant";
          this.sunRepositoryController.node.runAction(cc.sequence([ cc.scaleTo(.2, 1.1 * this.originalScale), cc.scaleTo(.2, this.originalScale), cc.delayTime(2), cc.callFunc(this.erazeGameCallout, this) ]));
          return;
        }
        if (!this.canSelect()) {
          this.node.runAction(cc.sequence([ cc.scaleTo(.2, 1.1 * this.originalScale), cc.scaleTo(.2, this.originalScale) ]));
          return;
        }
        this.selected = true;
        cc.find("/Canvas").emit("slected-plant", {
          plant: this.plantToSeed
        });
      };
      SelectPlantController.prototype.update = function(dt) {
        this.updateAppearance(dt);
      };
      __decorate([ property ], SelectPlantController.prototype, "refreshRate", void 0);
      __decorate([ property(cc.Prefab) ], SelectPlantController.prototype, "plantToSeed", void 0);
      __decorate([ property ], SelectPlantController.prototype, "points", void 0);
      SelectPlantController = __decorate([ ccclass ], SelectPlantController);
      return SelectPlantController;
    }(cc.Component);
    exports.default = SelectPlantController;
    cc._RF.pop();
  }, {
    "./StarRepositoryController": "StarRepositoryController"
  } ],
  SpeechBoubleMovement: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1af7frg2fZP7LZj47TJIMYZ", "SpeechBoubleMovement");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SpeechMovement = function(_super) {
      __extends(SpeechMovement, _super);
      function SpeechMovement() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.time = 2;
        return _this;
      }
      SpeechMovement.prototype.setText = function(text) {
        var label = this.node.getComponent(cc.Label);
        label.string = text;
      };
      SpeechMovement.prototype.update = function(dt) {
        this.node.y += 20 * dt;
        this.node.opacity = this.node.opacity - 20 * dt;
        this.node.opacity <= 0 && this.node.destroy();
      };
      __decorate([ property ], SpeechMovement.prototype, "time", void 0);
      SpeechMovement = __decorate([ ccclass ], SpeechMovement);
      return SpeechMovement;
    }(cc.Component);
    exports.default = SpeechMovement;
    cc._RF.pop();
  }, {} ],
  SpeechHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a8e8VzbidNOITvnNsZ1eqU", "SpeechHandler");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SpeechHandler = function(_super) {
      __extends(SpeechHandler, _super);
      function SpeechHandler() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.speechBuble = null;
        _this.speechOrigin = null;
        _this.speeches = [ "Ye shadyantra hai!", "Modi ji ne kiya hai ye... ", "Hum free Wifi Denge", "Uhhh Hunnn .... " ];
        return _this;
      }
      SpeechHandler.prototype.onLoad = function() {
        this.speechOrigin = this.node.getChildByName("speechOrigin");
      };
      SpeechHandler.prototype.deliverSpeech = function() {
        var randomSpeechIndex = Math.floor(Math.random() * (this.speeches.length - 1));
        var speechNode = cc.instantiate(this.speechBuble);
        var scene = cc.director.getScene();
        scene.addChild(speechNode);
        var label = speechNode.getComponent("SpeechBoubleMovement");
        label.setText(this.speeches[randomSpeechIndex]);
        speechNode.setPosition(this.node.convertToWorldSpaceAR(this.speechOrigin.getPosition()));
      };
      __decorate([ property(cc.Prefab) ], SpeechHandler.prototype, "speechBuble", void 0);
      SpeechHandler = __decorate([ ccclass ], SpeechHandler);
      return SpeechHandler;
    }(cc.Component);
    exports.default = SpeechHandler;
    cc._RF.pop();
  }, {} ],
  SpeechSupplier: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8ff80y/tzVEsJodZxV6qaZ7", "SpeechSupplier");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SpeechSupplier = function(_super) {
      __extends(SpeechSupplier, _super);
      function SpeechSupplier() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      SpeechSupplier.prototype.update = function(dt) {};
      SpeechSupplier = __decorate([ ccclass ], SpeechSupplier);
      return SpeechSupplier;
    }(cc.Component);
    exports.default = SpeechSupplier;
    cc._RF.pop();
  }, {} ],
  StarRepositoryController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cbc3thhj5NEYisD8FLo/zf", "StarRepositoryController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StarRepositoryController = function(_super) {
      __extends(StarRepositoryController, _super);
      function StarRepositoryController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.suns = 0;
        _this.pointsLabel = null;
        return _this;
      }
      StarRepositoryController.prototype.collectSuns = function(evt) {
        this.suns += evt.points;
        this.pointsLabel.string = this.suns.toString();
        this.node.emit("suns-changed", {
          suns: this.suns
        });
      };
      StarRepositoryController.prototype.onLoad = function() {
        this.node.on("update-suns", this.collectSuns, this);
        this.pointsLabel.string = this.suns.toString();
      };
      StarRepositoryController.prototype.start = function() {};
      __decorate([ property ], StarRepositoryController.prototype, "suns", void 0);
      __decorate([ property(cc.Label) ], StarRepositoryController.prototype, "pointsLabel", void 0);
      StarRepositoryController = __decorate([ ccclass ], StarRepositoryController);
      return StarRepositoryController;
    }(cc.Component);
    exports.default = StarRepositoryController;
    cc._RF.pop();
  }, {} ],
  StarSelector: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8aa96Ok8JCBr5vlMqBo/vp", "StarSelector");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StarSelector = function(_super) {
      __extends(StarSelector, _super);
      function StarSelector() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.stars = 3;
        return _this;
      }
      StarSelector.prototype.start = function() {
        this.node.getChildByName("3Stars").active = false;
        this.node.getChildByName("2Stars").active = false;
        this.node.getChildByName("1Star").active = false;
        switch (this.stars) {
         case 1:
          this.node.getChildByName("1Star").active = true;
          break;

         case 2:
          this.node.getChildByName("2Stars").active = true;
          break;

         case 3:
          this.node.getChildByName("3Stars").active = true;
        }
      };
      __decorate([ property ], StarSelector.prototype, "stars", void 0);
      StarSelector = __decorate([ ccclass ], StarSelector);
      return StarSelector;
    }(cc.Component);
    exports.default = StarSelector;
    cc._RF.pop();
  }, {} ],
  StarTapHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e06c0m8lppCZo4opH+2iM0S", "StarTapHandler");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseEntity_1 = require("./BaseEntity");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StarTapHandler = function(_super) {
      __extends(StarTapHandler, _super);
      function StarTapHandler() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.points = 25;
        _this.targetPosition = null;
        _this.rotationSpeed = 50;
        _this.liveTime = 0;
        _this.timeToLive = 5;
        _this.inFlight = false;
        return _this;
      }
      StarTapHandler.prototype.reachedTarget = function() {
        this.target.emit("update-suns", {
          points: this.points
        });
        this.node.destroy();
      };
      StarTapHandler.prototype.onDestroy = function() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.handleClick, this);
      };
      StarTapHandler.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.target = cc.find("/Canvas/bg/HUD/footer/SunsRepository");
        this.targetPosition = this.target.convertToWorldSpaceAR(new cc.Vec2());
        this.node.on(cc.Node.EventType.TOUCH_END, this.handleClick, this);
      };
      StarTapHandler.prototype.handleClick = function() {
        this.inFlight = true;
        this.node.runAction(cc.sequence(cc.moveTo(1, this.targetPosition), cc.callFunc(this.reachedTarget, this)));
      };
      StarTapHandler.prototype.start = function() {};
      StarTapHandler.prototype.update = function(dt) {
        if (this.isPaused) return;
        this.node.angle += this.rotationSpeed * dt;
        this.liveTime += dt;
        this.liveTime > this.timeToLive && !this.inFlight && this.node.destroy();
      };
      __decorate([ property ], StarTapHandler.prototype, "points", void 0);
      StarTapHandler = __decorate([ ccclass ], StarTapHandler);
      return StarTapHandler;
    }(BaseEntity_1.default);
    exports.default = StarTapHandler;
    cc._RF.pop();
  }, {
    "./BaseEntity": "BaseEntity"
  } ],
  StarsGenerator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "92b8deYXTtJqpt8T/yjJmU6", "StarsGenerator");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseEntity_1 = require("./BaseEntity");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StarsGenerator = function(_super) {
      __extends(StarsGenerator, _super);
      function StarsGenerator() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.star = null;
        _this.ground = null;
        _this.minTimeToWait = 3;
        _this.timeToLive = 5;
        _this.targetTime = 3;
        _this.currentTime = 0;
        return _this;
      }
      StarsGenerator.prototype.launchStar = function() {
        var width = this.ground.width;
        var height = this.ground.height;
        var starPoint = this.ground.convertToWorldSpaceAR(new cc.Vec2(Math.random() * width, Math.random() * height));
        var starNode = cc.instantiate(this.star);
        cc.director.getScene().addChild(starNode);
        starNode.setPosition(new cc.Vec2(200, cc.winSize.height));
        starNode.runAction(cc.moveTo(1, starPoint));
        this.targetTime = 10 * Math.random() + this.minTimeToWait;
        this.currentTime = 0;
      };
      StarsGenerator.prototype.update = function(dt) {
        this.currentTime += dt;
        this.currentTime >= this.targetTime && !this.isPaused && this.launchStar();
      };
      __decorate([ property(cc.Prefab) ], StarsGenerator.prototype, "star", void 0);
      __decorate([ property(cc.Node) ], StarsGenerator.prototype, "ground", void 0);
      __decorate([ property ], StarsGenerator.prototype, "minTimeToWait", void 0);
      StarsGenerator = __decorate([ ccclass ], StarsGenerator);
      return StarsGenerator;
    }(BaseEntity_1.default);
    exports.default = StarsGenerator;
    cc._RF.pop();
  }, {
    "./BaseEntity": "BaseEntity"
  } ],
  StateMachine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95ea0ZBXIJIWaVIsflrRZQt", "StateMachine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StateMachine = function(_super) {
      __extends(StateMachine, _super);
      function StateMachine() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      StateMachine = __decorate([ ccclass ], StateMachine);
      return StateMachine;
    }(cc.Component);
    exports.default = StateMachine;
    cc._RF.pop();
  }, {} ],
  States: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "193e6xPvwxCTbpwNqSykn7W", "States");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var States;
    (function(States) {
      States[States["Walking"] = 0] = "Walking";
      States[States["DeliveringBhasan"] = 1] = "DeliveringBhasan";
      States[States["TakingEggHit"] = 2] = "TakingEggHit";
      States[States["Die"] = 3] = "Die";
    })(States = exports.States || (exports.States = {}));
    var Animations;
    (function(Animations) {
      Animations[Animations["Walking"] = 0] = "Walking";
      Animations[Animations["DeliveringBhasan"] = 1] = "DeliveringBhasan";
      Animations[Animations["TakingEggHit"] = 2] = "TakingEggHit";
      Animations[Animations["Die"] = 3] = "Die";
    })(Animations = exports.Animations || (exports.Animations = {}));
    var exportObj = {
      states: States,
      Animations: Animations
    };
    exports.default = exportObj;
    cc._RF.pop();
  }, {} ],
  SunFlowerController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f4443F1uhtPYLqJXwuAtkv9", "SunFlowerController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Plant_1 = require("../../../Scripts/game/Plant");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SunFlowerController = function(_super) {
      __extends(SunFlowerController, _super);
      function SunFlowerController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sun = null;
        _this.canPawn = false;
        _this.productionRate = 3;
        _this.currentTime = 0;
        return _this;
      }
      SunFlowerController.prototype.start = function() {
        this.node.on("takeHit", this.takeHit, this);
      };
      SunFlowerController.prototype.takeHit = function(evt) {
        this.health -= evt.points;
        this.healthIndicator.emit("takeHit", evt);
        if (this.health < 0) {
          this.node.destroy();
          evt.node.emit("doneEating");
        }
      };
      SunFlowerController.prototype.update = function(dt) {
        this.currentTime += dt;
        if (this.currentTime > this.productionRate && this.canPawn) {
          this.currentTime = 0;
          var sun = cc.instantiate(this.sun);
          cc.director.getScene().addChild(sun);
          sun.setPosition(this.node.convertToWorldSpaceAR(new cc.Vec2()));
        }
      };
      __decorate([ property(cc.Prefab) ], SunFlowerController.prototype, "sun", void 0);
      __decorate([ property(Boolean) ], SunFlowerController.prototype, "canPawn", void 0);
      __decorate([ property ], SunFlowerController.prototype, "productionRate", void 0);
      SunFlowerController = __decorate([ ccclass ], SunFlowerController);
      return SunFlowerController;
    }(Plant_1.default);
    exports.default = SunFlowerController;
    cc._RF.pop();
  }, {
    "../../../Scripts/game/Plant": "Plant"
  } ],
  TileClickHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "291f1FZv6pGt4FYAb+ZiQM7", "TileClickHandler");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TileClickHandler = function(_super) {
      __extends(TileClickHandler, _super);
      function TileClickHandler() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.clickedSprite = null;
        _this.row = 0;
        _this.column = 0;
        _this.index = 0;
        _this.width = 0;
        _this.height = 0;
        _this.worldPos = null;
        return _this;
      }
      TileClickHandler.prototype.getBottomMostMitPoint = function() {
        return new cc.Vec2(this.worldPos.x, this.worldPos.y - this.height / 2);
      };
      TileClickHandler.prototype.setMetaData = function(row, col, index, pos) {
        this.row = row;
        this.column = col;
        this.index = index;
        this.worldPos = pos;
        this.width = this.node.width;
        this.height = this.node.height;
      };
      TileClickHandler.prototype.getPosition = function() {
        return new cc.Vec2(this.row, this.column);
      };
      TileClickHandler.prototype.getWorldPosition = function() {
        return this.worldPos;
      };
      TileClickHandler.prototype.handleTileClikedDone = function() {
        console.log("The person has clicked row , col, index as ", this.row, this.column, this.index);
        cc.find("/Canvas").emit("tileClicked", {
          row: this.row,
          column: this.column,
          index: this.index,
          pos: this.worldPos,
          width: this.node.width,
          height: this.node.height,
          groundPosition: new cc.Vec2(this.column * this.node.width + this.node.width / 2, this.row * this.node.height + this.node.height / 6),
          lowerCenter: this.getBottomMostMitPoint()
        });
      };
      TileClickHandler.prototype.onLoad = function() {
        this.currentSprite = this.node.getComponent(cc.Sprite);
        this.node.on(cc.Node.EventType.TOUCH_END, this.handleTileClikedDone, this);
      };
      TileClickHandler.prototype.onDestroy = function() {
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.handleTileClikedDone, this);
      };
      __decorate([ property(cc.SpriteFrame) ], TileClickHandler.prototype, "clickedSprite", void 0);
      TileClickHandler = __decorate([ ccclass ], TileClickHandler);
      return TileClickHandler;
    }(cc.Component);
    exports.default = TileClickHandler;
    cc._RF.pop();
  }, {} ],
  Troll: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f35a9h70/1Ip6pLCNFAWzBi", "Troll");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Troll = function(_super) {
      __extends(Troll, _super);
      function Troll() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.skeleton = null;
        return _this;
      }
      Troll.prototype.onLoad = function() {
        this.skeleton = this.node.getComponent(dragonBones.ArmatureDisplay);
        this.skeleton.addEventListener(dragonBones.EventObject.COMPLETE, this.throwAnimationDone, this);
        this.skeleton.addEventListener("beatAnimationdone", this.beatAnimationdone, this);
      };
      Troll.prototype.throwAnimationDone = function(evt) {
        console.log("Throw animation done!");
      };
      Troll.prototype.beatAnimationdone = function(evt) {
        console.log("Beat animation done!");
      };
      Troll = __decorate([ ccclass ], Troll);
      return Troll;
    }(cc.Component);
    exports.default = Troll;
    cc._RF.pop();
  }, {} ],
  WaveController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "51765Lyoi9Me6zIiEBR2Yoo", "WaveController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WaveController = function(_super) {
      __extends(WaveController, _super);
      function WaveController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.animationTiming = 10;
        _this.damage = 100;
        _this.scaleAnimation = null;
        return _this;
      }
      WaveController.prototype.launchWave = function() {
        this.scaleAnimation = cc.scaleTo(this.animationTiming, 5);
        var animation = cc.sequence([ this.scaleAnimation, cc.callFunc(this.onAnimationDone, this) ]);
        this.node.runAction(animation);
      };
      WaveController.prototype.onLoad = function() {
        this.launchWave();
        cc.director.getCollisionManager().enabled = true;
      };
      WaveController.prototype.onCollisionEnter = function(other, self) {
        if ("netaJiCanDestroy" === other.node.group) {
          other.node.emit("takeHitFromNetaJi", {
            points: this.damage,
            damager: this.node.group
          });
          this.node.destroy();
        }
      };
      WaveController.prototype.onAnimationDone = function() {
        this.node.destroy();
      };
      WaveController.prototype.start = function() {};
      __decorate([ property ], WaveController.prototype, "animationTiming", void 0);
      __decorate([ property ], WaveController.prototype, "damage", void 0);
      WaveController = __decorate([ ccclass ], WaveController);
      return WaveController;
    }(cc.Component);
    exports.default = WaveController;
    cc._RF.pop();
  }, {} ],
  WifiController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7fec2UFI+BB8o9sJlAGSVKL", "WifiController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WifiController = function(_super) {
      __extends(WifiController, _super);
      function WifiController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.firingFrequency = 3;
        _this.health = 100;
        _this.wavePrefab = null;
        _this.originPointOfWave = null;
        return _this;
      }
      WifiController.prototype.launchWave = function() {
        this.originPointOfWave = this.node.getChildByName("waveOrigin");
        var wave = cc.instantiate(this.wavePrefab);
        cc.director.getScene().addChild(wave);
        var worldPoint = this.node.convertToWorldSpaceAR(this.originPointOfWave.getPosition());
        wave.setPosition(worldPoint);
      };
      WifiController.prototype.onLoad = function() {
        cc.director.getCollisionManager().enabled = true;
      };
      WifiController.prototype.onCollisionEnter = function(other, self) {
        if ("bullet" === other.node.group) {
          other.node.emit("takeHitFromNetaJi", {
            points: this.damage,
            damager: this.node.group
          });
          this.node.destroy();
        }
      };
      WifiController.prototype.start = function() {
        this.schedule(this.launchWave, this.firingFrequency, 1e3, 2);
      };
      __decorate([ property ], WifiController.prototype, "firingFrequency", void 0);
      __decorate([ property ], WifiController.prototype, "health", void 0);
      __decorate([ property(cc.Prefab) ], WifiController.prototype, "wavePrefab", void 0);
      WifiController = __decorate([ ccclass ], WifiController);
      return WifiController;
    }(cc.Component);
    exports.default = WifiController;
    cc._RF.pop();
  }, {} ],
  World: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f86cfShu0tDSLqEE7P9IMfN", "World");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var World = function() {
      function World() {
        this.index = 1;
        this.levels = [];
      }
      World = __decorate([ ccclass ], World);
      return World;
    }();
    exports.default = World;
    cc._RF.pop();
  }, {} ],
  YouWinPopUp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a167sI5mdOUK7JJRE73+qq", "YouWinPopUp");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StarSelector_1 = require("../../../StarSelector/StarSelector");
    var LevelSelectorButton_1 = require("../LevelSelectorButton");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var YouWinPopUp = function(_super) {
      __extends(YouWinPopUp, _super);
      function YouWinPopUp() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.currentScene = "";
        _this.nextScene = "";
        _this.stars = 2;
        _this.winText = "";
        return _this;
      }
      YouWinPopUp.prototype.start = function() {
        this.node.getChildByName("StarCollector").getComponent(StarSelector_1.default).stars = this.stars;
        this.node.getChildByName("StarCollector").getChildByName("Score").getComponent(cc.Label).string = this.winText;
        this.node.getChildByName("restartButton").getComponent(LevelSelectorButton_1.default).sceneName = this.currentScene;
        this.node.getChildByName("playButton").getComponent(LevelSelectorButton_1.default).sceneName = this.nextScene;
      };
      __decorate([ property ], YouWinPopUp.prototype, "currentScene", void 0);
      __decorate([ property ], YouWinPopUp.prototype, "nextScene", void 0);
      __decorate([ property ], YouWinPopUp.prototype, "stars", void 0);
      __decorate([ property ], YouWinPopUp.prototype, "winText", void 0);
      YouWinPopUp = __decorate([ ccclass ], YouWinPopUp);
      return YouWinPopUp;
    }(cc.Component);
    exports.default = YouWinPopUp;
    cc._RF.pop();
  }, {
    "../../../StarSelector/StarSelector": "StarSelector",
    "../LevelSelectorButton": "LevelSelectorButton"
  } ],
  mainCamera: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f232aqAqZOQ7Uufw39DIEq", "mainCamera");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MainCamera = function(_super) {
      __extends(MainCamera, _super);
      function MainCamera() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.HUD = null;
        _this.rightMovement = 0;
        _this.margin = 10;
        _this.camera = null;
        _this.animationSequence = null;
        return _this;
      }
      MainCamera.prototype.moveCameraToExtremeRight = function() {
        return cc.moveTo(1, new cc.Vec2(this.rightMovement, 0));
      };
      MainCamera.prototype.moveBackToOriginalPlace = function() {
        return cc.moveTo(1, new cc.Vec2(0, 0));
      };
      MainCamera.prototype.setToViewGarden = function() {
        this.HUD.active = true;
        var cameraFocusHeight = this.HUD.height;
        var deviceHeight = cc.director.getWinSizeInPixels().height;
        this.camera.setPosition(this.HUD.getPosition());
        this.camera.getComponent(cc.Camera).zoomRatio = deviceHeight / cameraFocusHeight;
        this.camera.getComponent(cc.Camera).fov = 45;
      };
      MainCamera.prototype.onLoad = function() {
        var width = cc.director.getWinSizeInPixels().width;
        this.camera = cc.find("/Canvas/Main Camera");
        this.rightMovement = (cc.find("/Canvas/bg").width - width) / 2;
        this.camera.setPosition(0, 0);
        this.animationSequence = cc.sequence([ this.moveCameraToExtremeRight(), this.moveBackToOriginalPlace(), cc.callFunc(this.setToViewGarden, this) ]);
      };
      MainCamera.prototype.start = function() {
        this.camera.runAction(this.animationSequence);
      };
      __decorate([ property(cc.Node) ], MainCamera.prototype, "HUD", void 0);
      __decorate([ property ], MainCamera.prototype, "margin", void 0);
      MainCamera = __decorate([ ccclass ], MainCamera);
      return MainCamera;
    }(cc.Component);
    exports.default = MainCamera;
    cc._RF.pop();
  }, {} ],
  movement: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9111a5IFl9PNp+a00DR36fj", "movement");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Movement = function(_super) {
      __extends(Movement, _super);
      function Movement() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.owner = null;
        _this.rotationSpeed = 70;
        _this.initialSpeed = new cc.Vec2(0, 0);
        _this.maxSpeed = new cc.Vec2(0, 0);
        _this.accelaration = new cc.Vec2(10, 0);
        _this.lastVelocity = new cc.Vec2(0, 0);
        return _this;
      }
      Movement.prototype.onLoad = function() {
        this.node.rotation = 70;
        this.lastVelocity = this.initialSpeed;
      };
      Movement.prototype.setOwner = function(firer) {
        this.owner = firer;
      };
      Movement.prototype.getPosition = function(dt) {
        var dv = this.accelaration.mul(dt);
        this.lastVelocity = this.lastVelocity.add(dv);
        var position = this.node.getPosition();
        var finalPosition = position.add(this.lastVelocity.mul(dt));
        console.log("final position of the node is ", finalPosition);
        return finalPosition;
      };
      Movement.prototype.handleOutOfBounds = function() {
        if (this.node.x > cc.director.getWinSizeInPixels().width || this.node.y > cc.director.getWinSizeInPixels().height || this.node.x < 0 || this.node.y < 0) {
          console.log("Destroying the node as it has gone out of bounds!");
          this.destroySelf();
        }
        if (this.owner && this.owner.getGroundPosition().y > this.node.y - this.node.height * this.node.scale) {
          console.log("Destroying the node as it has gone below the ground!");
          this.destroySelf();
        }
      };
      Movement.prototype.destroySelf = function() {
        this.node.destroy();
      };
      Movement.prototype.update = function(dt) {
        this.handleOutOfBounds();
        this.rotate(dt);
        this.node.x = this.getPosition(dt).x;
        this.node.y = this.getPosition(dt).y;
      };
      Movement.prototype.rotate = function(dt) {
        this.node.rotation = this.node.rotation - this.rotationSpeed * dt;
        console.log("Totaion is ", this.node.rotation);
      };
      __decorate([ property ], Movement.prototype, "rotationSpeed", void 0);
      __decorate([ property ], Movement.prototype, "initialSpeed", void 0);
      __decorate([ property ], Movement.prototype, "maxSpeed", void 0);
      __decorate([ property ], Movement.prototype, "accelaration", void 0);
      Movement = __decorate([ ccclass ], Movement);
      return Movement;
    }(cc.Component);
    exports.default = Movement;
    cc._RF.pop();
  }, {} ],
  netaJiProgressIndicator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "88f18Uab3VHUIBSvCNo1Mi5", "netaJiProgressIndicator");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  peaShooter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2532dNBBdJ4YAhybed1oL1", "peaShooter");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Plant_1 = require("../../../Scripts/game/Plant");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PeaShooter = function(_super) {
      __extends(PeaShooter, _super);
      function PeaShooter() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pea = null;
        _this.frequencyOfFiringPerSecond = 1;
        _this.proximityTagForNetaJi = 10;
        _this.firingPosition = null;
        _this.health = 200;
        _this.shouldShoot = false;
        _this.currentTime = 0;
        return _this;
      }
      PeaShooter.prototype.takeHit = function(evt) {
        this.health -= evt.points;
        this.healthIndicator.emit("takeHit", evt);
        if (this.health < 0) {
          this.unschedule(this.fire);
          this.node.destroy();
          evt.node.emit("doneEating");
        }
      };
      PeaShooter.prototype.reactToNetajiProximity = function(isNetaJiNear) {
        this.shouldShoot = isNetaJiNear;
      };
      PeaShooter.prototype.start = function() {
        this.node.on("takeHit", this.takeHit, this);
        this.firingPosition = this.node.getChildByName("firingPosition");
      };
      PeaShooter.prototype.fire = function() {
        var pea = cc.instantiate(this.pea);
        var scene = cc.director.getScene();
        pea.setScale(this.node.getScale(new cc.Vec2()));
        scene.addChild(pea);
        pea.setPosition(this.node.convertToWorldSpaceAR(this.firingPosition.getPosition()));
        var audioSource = this.node.getComponent(cc.AudioSource);
        audioSource.play();
      };
      PeaShooter.prototype.update = function(dt) {
        this.currentTime += dt;
        if (this.shouldShoot && this.currentTime > this.frequencyOfFiringPerSecond) {
          this.currentTime = 0;
          this.fire();
        }
      };
      __decorate([ property(cc.Prefab) ], PeaShooter.prototype, "pea", void 0);
      __decorate([ property ], PeaShooter.prototype, "frequencyOfFiringPerSecond", void 0);
      __decorate([ property ], PeaShooter.prototype, "health", void 0);
      PeaShooter = __decorate([ ccclass ], PeaShooter);
      return PeaShooter;
    }(Plant_1.default);
    exports.default = PeaShooter;
    cc._RF.pop();
  }, {
    "../../../Scripts/game/Plant": "Plant"
  } ]
}, {}, [ "IntroductionScript", "EggGenerator", "StarSelector", "AnimationController", "StateMachine", "BirdMovement", "BaseEntity", "CollisionResolver", "GameController", "GardenPlacement", "NetaJi", "Plant", "PlantsRepository", "SelectPlantController", "StarRepositoryController", "StarTapHandler", "StarsGenerator", "ButtonClickHandler", "Globals", "LevelLoader", "LevelProgress", "LevelSelectorButton", "PausePopUp", "YouWinPopUp", "NewPlantSelectButton", "PauseButton", "PlantsSelectorButton", "PlayButton", "mainCamera", "netaJiProgressIndicator", "DebuggableNode", "GameProgress", "Level", "World", "ProgressLoader", "TileClickHandler", "HealthController", "AnimationHandler", "Brain", "KejaruController", "MovementController", "SpeechHandler", "States", "movement", "SpeechBoubleMovement", "SpeechSupplier", "Animations", "GameLayOutHandler", "peaShooter", "SunFlowerController", "Troll", "KitanuController", "WaveController", "EggAnimationController", "EggMan", "Enums", "KejaruSideController", "LawnMover", "WifiController" ]);
//# sourceMappingURL=project.dev.js.map