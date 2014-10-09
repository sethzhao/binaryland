var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Penguin = (function (_super) {
    __extends(Penguin, _super);
    function Penguin(type) {
        _super.call(this);
        var point;
        var data;
        var texture;
        if (type == Constants.MALON) {
            console.log("malon create");
            point = Util.getPointXYByIndex(141);
            data = RES.getRes("malon_json");
            texture = RES.getRes("malon_png");
            this._beforeStayStatus = Constants.MOVE_LEFT;
        }
        if (type == Constants.GURIN) {
            console.log("gurin create");
            point = Util.getPointXYByIndex(143);
            data = RES.getRes("gurin_json");
            texture = RES.getRes("gurin_png");
            this._beforeStayStatus = Constants.MOVE_RIGHT;
        }
        this._type = type;
        this._status = Constants.STAY;
        this.mc = new egret.MovieClip(data, texture);
        this.mc.gotoAndStop("stay");
        this.mc.frameRate = 12;
        this.x = point.x;
        this.y = point.y;
        this.addChild(this.mc);
        this._isInNet = false;

        this.mc.addEventListener("attackOver", this.attackOver, this);
    }
    Object.defineProperty(Penguin.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });

    Penguin.prototype.attackOver = function () {
        this._isAttacking = false;
        switch (this._status) {
            case Constants.MOVE_RIGHT:
                this.mc.gotoAndPlay("walk_right");
                break;
            case Constants.MOVE_LEFT:
                this.mc.gotoAndPlay("walk_left");
                break;
            case Constants.MOVE_UP:
                this.mc.gotoAndPlay("walk_up");
                break;
            case Constants.MOVE_DOWN:
                this.mc.gotoAndPlay("walk_down");
                break;
            case Constants.STAY:
                this.mc.gotoAndStop("stay");
                break;
        }
    };

    Penguin.prototype.moveRightHitWallTest = function (speed) {
        if (this.x + speed + 31 > 496) {
            return true;
        }
        var topWall = this.parent.hitWallTest(this.x + speed + 31, this.y);
        var bottomWall = this.parent.hitWallTest(this.x + speed + 31, this.y + 31);

        if (topWall && bottomWall) {
            return true;
        }
        if (topWall) {
            if ((this.y + 15) > (topWall.y + 31)) {
                this.y = this.y + 1;
            }
            return true;
        }
        if (bottomWall) {
            if ((this.y + 15) < bottomWall.y) {
                this.y = this.y - 1;
            }
            return true;
        }
        this.x = this.x + speed;
        return false;
    };

    Penguin.prototype.moveLeftHitWallTest = function (speed) {
        if (this.x - speed < 16) {
            return true;
        }
        var topWall = this.parent.hitWallTest(this.x - speed, this.y);
        var bottomWall = this.parent.hitWallTest(this.x - speed, this.y + 31);

        if (topWall && bottomWall) {
            return true;
        }

        if (topWall) {
            if ((this.y + 15) > (topWall.y + 31)) {
                this.y = this.y + 1;
            }
            return true;
        }
        if (bottomWall) {
            if ((this.y + 15) < bottomWall.y) {
                this.y = this.y - 1;
            }
            return true;
        }
        this.x = this.x - speed;
        return false;
    };

    Penguin.prototype.moveUpHitWallTest = function (speed) {
        if (this.y - speed < 82) {
            return true;
        }
        var leftWall = this.parent.hitWallTest(this.x, this.y - speed);
        var rightWall = this.parent.hitWallTest(this.x + 31, this.y - speed);

        if (leftWall && rightWall) {
            return true;
        }

        if (leftWall) {
            if ((this.x + 15) > (leftWall.x + 31)) {
                this.x = this.x + 1;
            }
            return true;
        }
        if (rightWall) {
            if ((this.x + 15) < rightWall.x) {
                this.x = this.x - 1;
            }
            return true;
        }
        this.y = this.y - speed;
        return false;
    };

    Penguin.prototype.moveDownHitWallTest = function (speed) {
        if (this.y + speed > 370) {
            return true;
        }
        var leftWall = this.parent.hitWallTest(this.x, this.y + speed + 31);
        var rightWall = this.parent.hitWallTest(this.x + 31, this.y + speed + 31);

        if (leftWall && rightWall) {
            return true;
        }

        if (leftWall) {
            if ((this.x + 15) > (leftWall.x + 31)) {
                this.x = this.x + 1;
            }
            return true;
        }
        if (rightWall) {
            if ((this.x + 15) < rightWall.x) {
                this.x = this.x - 1;
            }
            return true;
        }
        this.y = this.y + speed;
        return false;
    };

    Penguin.prototype.update = function (speed) {
        if (!this._isAttacking) {
            switch (this._status) {
                case Constants.MOVE_RIGHT:
                    this.moveRightHitWallTest(speed);
                    break;
                case Constants.MOVE_LEFT:
                    this.moveLeftHitWallTest(speed);
                    break;
                case Constants.MOVE_UP:
                    this.moveUpHitWallTest(speed);
                    break;
                case Constants.MOVE_DOWN:
                    this.moveDownHitWallTest(speed);
                    break;
                case Constants.IN_NET:
                    var net = this.parent.hitNetTest(this);
                    if (!net) {
                        this.outNet();
                    }
                    return;
            }
        }

        this.isHitNet();

        this.isHitSpider();
    };

    Penguin.prototype.isHitSpider = function () {
        this.parent.hitSpiderTest(this);
    };

    Penguin.prototype.isHitNet = function () {
        var net = this.parent.hitNetTest(this);
        if (net) {
            if (this._isAttacking) {
                this.parent.removeNet(net);
            } else if (!net.hasPenguin) {
                this._status = Constants.IN_NET;
                net.hasPenguin = true;
                egret.Tween.get(this).to({ x: net.x, y: net.y }, 200).call(this.inNet, this);
            }
        }
    };

    Penguin.prototype.inNet = function () {
        this._isInNet = true;
        this.mc.gotoAndPlay("net");
    };

    Penguin.prototype.outNet = function () {
        this._isInNet = false;
        this._status = Constants.STAY;
        this.mc.gotoAndStop("stay");
    };

    Penguin.prototype.attack = function () {
        var status = this._status != Constants.STAY ? this._status : this._beforeStayStatus;
        switch (status) {
            case Constants.MOVE_RIGHT:
                this._isAttacking = true;
                this.mc.gotoAndPlay("attack_right");
                break;
            case Constants.MOVE_LEFT:
                this._isAttacking = true;
                this.mc.gotoAndPlay("attack_left");
                break;
            case Constants.MOVE_UP:
                this._isAttacking = true;
                this.mc.gotoAndPlay("attack_up");
                break;
            case Constants.MOVE_DOWN:
                this._isAttacking = true;
                this.mc.gotoAndPlay("attack_down");
                break;
        }
    };

    Penguin.prototype.walkRight = function () {
        if (this._status == Constants.MOVE_RIGHT || this._status == Constants.IN_NET) {
            return;
        }
        this.mc.gotoAndPlay("walk_right");
        this._status = Constants.MOVE_RIGHT;
        this._isAttacking = false;
    };

    Penguin.prototype.walkLeft = function () {
        if (this._status == Constants.MOVE_LEFT || this._status == Constants.IN_NET) {
            return;
        }
        this.mc.gotoAndPlay("walk_left");
        this._status = Constants.MOVE_LEFT;
        this._isAttacking = false;
    };

    Penguin.prototype.walkUp = function () {
        if (this._status == Constants.MOVE_UP || this._status == Constants.IN_NET) {
            return;
        }
        this.mc.gotoAndPlay("walk_up");
        this._status = Constants.MOVE_UP;
        this._isAttacking = false;
    };

    Penguin.prototype.walkDown = function () {
        if (this._status == Constants.MOVE_DOWN || this._status == Constants.IN_NET) {
            return;
        }
        this.mc.gotoAndPlay("walk_down");
        this._status = Constants.MOVE_DOWN;
        this._isAttacking = false;
    };

    Penguin.prototype.stay = function () {
        if (this._status == Constants.STAY || this._status == Constants.IN_NET) {
            return;
        }
        this.mc.gotoAndStop("stay");
        this._beforeStayStatus = this._status;
        this._status = Constants.STAY;
        this._isAttacking = false;
    };

    Object.defineProperty(Penguin.prototype, "beforeStayStatus", {
        get: function () {
            return this._beforeStayStatus;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Penguin.prototype, "attackStatus", {
        get: function () {
            var status = this._status != Constants.STAY ? this._status : this._beforeStayStatus;
            return status;
        },
        enumerable: true,
        configurable: true
    });

    Penguin.prototype.lose = function () {
        this.mc.gotoAndStop("lose");
    };

    Object.defineProperty(Penguin.prototype, "isAttacking", {
        get: function () {
            return this._isAttacking;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Penguin.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Penguin.prototype, "isInNet", {
        get: function () {
            return this._isInNet;
        },
        enumerable: true,
        configurable: true
    });
    return Penguin;
})(egret.Sprite);
Penguin.prototype.__class__ = "Penguin";
