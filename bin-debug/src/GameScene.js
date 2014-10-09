var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this._walls = [];
        this._nets = [];
        this._spiders = [];
        this._roads = [];

        this._sheet = RES.getRes("res_json");

        this.creatScene(Round.instance().roundNum);
    }
    GameScene.prototype.clearSpider = function () {
        for (var i = 0; i < this._spiders.length; i++) {
            this._spiders[i].stop();
            this.removeChild(this._spiders[i]);
        }
        this._spiders = [];
    };

    GameScene.prototype.clearScene = function () {
        this._walls = [];
        this._nets = [];
        this._roads = [];
        this.clearSpider();
        this.removeChildren();
    };
    GameScene.prototype.creatScene = function (roundNum) {
        this.clearScene();
        this.createBackground();
        this.createHeart();

        var wallIndexs = Util.getRoundWall(roundNum);
        var netsIndexs = Util.getRoundNet(roundNum);
        for (var i = 0; i < 150; i++) {
            if (wallIndexs.indexOf(i) > -1) {
                this.createWall(i, roundNum);
                continue;
            }

            if (netsIndexs.indexOf(i) > -1) {
                this.createNet(i);
                continue;
            }

            if (i <= 90) {
                this._roads.push(i);
            }
        }
        this.createSpiders();

        this._gurin = new Penguin(Constants.GURIN);
        this._malon = new Penguin(Constants.MALON);
        this.addChild(this._gurin);
        this.addChild(this._malon);

        this.share();
    };

    GameScene.prototype.share = function () {
        WeixinApi.ready(function (api) {
            var info = new WeixinShareInfo();
            if (Round.instance().isFinish) {
                info.desc = info.title = "我在企鹅先生这个游戏里通关了，你也来试试吧！";
            } else {
                info.desc = info.title = "我在企鹅先生这个游戏里闯到了第" + Round.instance().roundNum + "关，你也来试试吧！";
            }
            info.link = "http://slertness.com/game/binaryland/index.html";
            info.imgUrl = "http://slertness.com/game/binaryland/logo.png";
            api.shareToFriend(info);
            api.shareToTimeline(info);
        });
    };

    Object.defineProperty(GameScene.prototype, "usePenguin", {
        set: function (usePenguin) {
            this._usePenguin = usePenguin;
        },
        enumerable: true,
        configurable: true
    });

    GameScene.prototype.createSpiders = function () {
        for (var i = 0; i < 3 * Round.instance().roundNum; i++) {
            var road = Math.floor(Math.random() * this._roads.length);
            var spider = new Spider(this._roads[road]);
            this._spiders.push(spider);
            this.addChild(spider);
        }
    };

    GameScene.prototype.update = function (speed) {
        this.gurin.update(speed);
        this.malon.update(speed);

        if (this._gurin.isInNet && this._malon.isInNet) {
            this.lose();
        }

        if (this.isWin()) {
            console.log("win");

            this.win();
        }
    };

    GameScene.prototype.isWin = function () {
        var heart = this.heart;
        if (heart.hitTestPoint(this.gurin.x + 36, this.gurin.y) && heart.hitTestPoint(this.malon.x - 4, this.malon.y)) {
            if (heart.x - this.gurin.x > 28 && this.malon.x - heart.x > 28) {
                if (Math.abs(Math.abs(heart.y) - Math.abs(this.gurin.y)) < 4 && Math.abs(Math.abs(heart.y) - Math.abs(this.malon.y)) < 4) {
                    return true;
                }
            }
        }
        if (heart.hitTestPoint(this.malon.x + 36, this.malon.y) && heart.hitTestPoint(this.gurin.x - 4, this.gurin.y)) {
            if (heart.x - this.malon.x > 28 && this.gurin.x - heart.x > 28) {
                if (Math.abs(Math.abs(heart.y) - Math.abs(this.gurin.y)) < 4 && Math.abs(Math.abs(heart.y) - Math.abs(this.malon.y)) < 4) {
                    return true;
                }
            }
        }
        return false;
    };

    GameScene.prototype.win = function () {
        this.parent.removeGameListener();
        this.clearSpider();
        this.unlockHeart();
        this._gurin.stay();
        this._malon.stay();
        var timer = new egret.Timer(1000, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.winTimerComFunc, this);
        timer.start();
    };

    GameScene.prototype.winTimerComFunc = function () {
        this.removeChild(this._gurin);
        this.removeChild(this._malon);
        this.showWin();

        var timer = new egret.Timer(1000, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.nextRoundTimerComFunc, this);
        timer.start();
    };

    GameScene.prototype.nextRoundTimerComFunc = function () {
        if (Round.instance().roundNum == 7) {
            this.parent.gameOver();
            Round.instance().isFinish = true;
            return;
        }
        Round.instance().next();
        Timer.instance().reset();
        this.creatScene(Round.instance().roundNum);
        this.parent.addGameListener();
    };

    GameScene.prototype.lose = function () {
        if (!this._gurin.isInNet) {
            this._gurin.lose();
        }
        if (!this._malon.isInNet) {
            this._malon.lose();
        }
        this.parent.removeGameListener();
        var timer = new egret.Timer(1000, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.loseTimerComFunc, this);
        timer.start();
        console.log("lose");
    };

    GameScene.prototype.loseTimerComFunc = function () {
        this.parent.gameOver();
    };

    Object.defineProperty(GameScene.prototype, "walls", {
        get: function () {
            return this._walls;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(GameScene.prototype, "nets", {
        get: function () {
            return this._nets;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(GameScene.prototype, "heart", {
        get: function () {
            return this._heart;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(GameScene.prototype, "gurin", {
        get: function () {
            return this._gurin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScene.prototype, "malon", {
        get: function () {
            return this._malon;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(GameScene.prototype, "spiders", {
        get: function () {
            return this._spiders;
        },
        enumerable: true,
        configurable: true
    });

    GameScene.prototype.createHeart = function () {
        this._heart = new egret.Bitmap();
        this._heart.texture = this._sheet.getTexture("heart_lock");
        var point = Util.getPointXYByIndex(7);
        this._heart.x = point.x;
        this._heart.y = point.y;
        this.addChild(this._heart);
    };

    GameScene.prototype.createNet = function (i) {
        var net = new Net(this._sheet.getTexture("net"), i);
        this.addChild(net);
        this._nets.push(net);
    };
    GameScene.prototype.createWall = function (i, roundNum) {
        var wall = new egret.Bitmap();
        if (roundNum == 7) {
            roundNum = 1;
        }
        wall.texture = this._sheet.getTexture("wall" + roundNum);
        var point = Util.getPointXYByIndex(i);
        wall.x = point.x;
        wall.y = point.y;
        this.addChild(wall);
        this._walls.push(wall);
    };

    GameScene.prototype.createBackground = function () {
        var bg = new egret.Bitmap();
        bg.texture = this._sheet.getTexture("bg");
        this.addChild(bg);
    };

    GameScene.prototype.hitWallTest = function (x, y) {
        for (var i = 0; i < this.walls.length; i++) {
            var wall = this.walls[i];
            if (wall.hitTestPoint(x, y)) {
                return wall;
            }
        }
        return null;
    };

    GameScene.prototype.hitNetTest = function (penguin) {
        for (var i = 0; i < this.nets.length; i++) {
            var net = this.nets[i];
            if (penguin.hitTestPoint(net.x + 15, net.y + 15)) {
                return net;
            }
        }
        return null;
    };

    GameScene.prototype.hitSpiderTest = function (penguin) {
        for (var i = 0; i < this.spiders.length; i++) {
            var spider = this.spiders[i];

            if (!penguin.isAttacking) {
                if (spider.hitTestPoint(penguin.x + 16, penguin.y + 16)) {
                    penguin.inNet();
                    this.lose();
                    return;
                }
            } else {
                if (penguin.attackStatus == Constants.MOVE_RIGHT) {
                    if (29 > Math.abs((spider.x + 16) - (penguin.x + 51)) && 16 > Math.abs((spider.y + 16) - (penguin.y + 16))) {
                        console.log("hit attack");
                        this.removeSpider(spider);
                        i--;
                    } else if (spider.hitTestPoint(penguin.x + 16, penguin.y + 16)) {
                        console.log("hit");
                        penguin.inNet();
                        this.lose();
                        return;
                    }
                }
                if (penguin.attackStatus == Constants.MOVE_LEFT) {
                    console.log(Math.abs((spider.x + 16) - (penguin.x - 19)));
                    if (29 > Math.abs((spider.x + 16) - (penguin.x - 19)) && 16 > Math.abs((spider.y + 16) - (penguin.y + 16))) {
                        console.log("hit attack");
                        this.removeSpider(spider);
                        i--;
                    } else if (spider.hitTestPoint(penguin.x + 16, penguin.y + 16)) {
                        console.log("hit");
                        penguin.inNet();
                        this.lose();
                        return;
                    }
                }
                if (penguin.attackStatus == Constants.MOVE_UP) {
                    if (16 > Math.abs((spider.x + 16) - (penguin.x + 16)) && 29 > Math.abs((spider.y + 16) - (penguin.y - 19))) {
                        this.removeSpider(spider);
                        i--;
                    } else if (spider.hitTestPoint(penguin.x + 16, penguin.y + 16)) {
                        penguin.inNet();
                        this.lose();
                        return;
                    }
                }
                if (penguin.attackStatus == Constants.MOVE_DOWN) {
                    if (16 > Math.abs((spider.x + 16) - (penguin.x + 16)) && 28 > Math.abs((spider.y + 16) - (penguin.y + 51))) {
                        this.removeSpider(spider);
                        i--;
                    } else if (spider.hitTestPoint(penguin.x + 16, penguin.y + 16)) {
                        penguin.inNet();
                        this.lose();
                        return;
                    }
                }
            }
        }
    };

    GameScene.prototype.removeNet = function (net) {
        for (var i = 0; i < this.nets.length; i++) {
            if (net == this.nets[i]) {
                this.nets.splice(i, 1);
            }
        }
        this.removeChild(net);
    };

    GameScene.prototype.removeSpider = function (spider) {
        for (var i = 0; i < this.spiders.length; i++) {
            if (spider == this.spiders[i]) {
                this.spiders.splice(i, 1);
            }
        }
        spider.stop();
        this.removeChild(spider);
    };

    GameScene.prototype.unlockHeart = function () {
        this._heart.texture = this._sheet.getTexture("heart_unlock");
    };

    GameScene.prototype.showWin = function () {
        this.removeChild(this.heart);
        var win = new egret.Bitmap();
        win.texture = this._sheet.getTexture("win");
        var point = Util.getPointXYByIndex(7);
        win.x = point.x - 16;
        win.y = point.y - 8;
        this.addChild(win);
    };

    GameScene.prototype.attack = function () {
        this.gurin.attack();
        this.malon.attack();
    };

    GameScene.prototype.rightBegin = function () {
        if (this._usePenguin == Constants.GURIN) {
            this.gurin.walkRight();
            this.malon.walkLeft();
        } else {
            this.gurin.walkLeft();
            this.malon.walkRight();
        }
    };
    GameScene.prototype.leftBegin = function () {
        if (this._usePenguin == Constants.GURIN) {
            this.gurin.walkLeft();
            this.malon.walkRight();
        } else {
            this.gurin.walkRight();
            this.malon.walkLeft();
        }
    };

    GameScene.prototype.upBegin = function () {
        this.gurin.walkUp();
        this.malon.walkUp();
    };

    GameScene.prototype.downBegin = function () {
        this.gurin.walkDown();
        this.malon.walkDown();
    };

    GameScene.prototype.end = function () {
        this.gurin.stay();
        this.malon.stay();
    };
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
