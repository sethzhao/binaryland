var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gurin = (function (_super) {
    __extends(Gurin, _super);
    function Gurin() {
        _super.call(this);
        var data = RES.getRes("gurin_json");
        var texture = RES.getRes("gurin_png");
        this.gurin = new egret.MovieClip(data, texture);
        this.gurin.gotoAndStop("stay");
        this.gurin.frameRate = 12;
        var point = Util.getPointXYByIndex(143);
        this.x = point.x;
        this.y = point.y;
        this.addChild(this.gurin);
    }
    Gurin.prototype.update = function (walls, speed) {
        switch (this.moveStatus) {
            case Constants.MOVE_RIGHT:
                if (this.x + speed + 31 > 496) {
                    return;
                }
                var wall = Util.hitWallTest(walls, this.x + speed + 31, this.y);
                if (wall) {
                    if ((this.y + 15) > (wall.y + 31)) {
                        this.y = this.y + speed;
                    }
                    return;
                }
                wall = Util.hitWallTest(walls, this.x + speed + 31, this.y + 31);
                if (wall) {
                    if ((this.y + 15) < wall.y) {
                        this.y = this.y - speed;
                    }
                    return;
                }
                this.x = this.x + speed;
                break;
            case Constants.MOVE_LEFT:
                if (this.x - speed < 16) {
                    return;
                }
                var wall = Util.hitWallTest(walls, this.x - speed, this.y);
                if (wall) {
                    if ((this.y + 15) > (wall.y + 31)) {
                        this.y = this.y + speed;
                    }
                    return;
                }
                wall = Util.hitWallTest(walls, this.x - speed, this.y + 31);
                if (wall) {
                    if ((this.y + 15) < wall.y) {
                        this.y = this.y - speed;
                    }
                    return;
                }
                this.x = this.x - speed;
                break;
            case Constants.MOVE_UP:
                if (this.y - speed < 32) {
                    return;
                }
                var wall = Util.hitWallTest(walls, this.x, this.y - speed);
                if (wall) {
                    if ((this.x + 15) > (wall.x + 31)) {
                        this.x = this.x + speed;
                    }
                    return;
                }
                wall = Util.hitWallTest(walls, this.x + 31, this.y - speed);
                if (wall) {
                    if ((this.x + 15) < wall.x) {
                        this.x = this.x - speed;
                    }
                    return;
                }
                this.y = this.y - speed;
                break;
            case Constants.MOVE_DOWN:
                if (this.y + speed > 320) {
                    return;
                }
                var wall = Util.hitWallTest(walls, this.x, this.y + speed + 31);
                if (wall) {
                    if ((this.x + 15) > (wall.x + 31)) {
                        this.x = this.x + speed;
                    }
                    return;
                }
                wall = Util.hitWallTest(walls, this.x + 31, this.y + speed + 31);
                if (wall) {
                    if ((this.x + 15) < wall.x) {
                        this.x = this.x - speed;
                    }
                    return;
                }
                this.y = this.y + speed;
                break;
        }
    };

    Object.defineProperty(Gurin.prototype, "moveStatus", {
        get: function () {
            return this._moveStatus;
        },
        enumerable: true,
        configurable: true
    });

    Gurin.prototype.walkRight = function () {
        if (this._moveStatus == Constants.MOVE_RIGHT) {
            return;
        }
        this.gurin.gotoAndPlay("walk_right");
        this._moveStatus = Constants.MOVE_RIGHT;
    };

    Gurin.prototype.walkLeft = function () {
        if (this._moveStatus == Constants.MOVE_LEFT) {
            return;
        }
        this.gurin.gotoAndPlay("walk_left");
        this._moveStatus = Constants.MOVE_LEFT;
    };

    Gurin.prototype.walkUp = function () {
        if (this._moveStatus == Constants.MOVE_UP) {
            return;
        }
        this.gurin.gotoAndPlay("walk_up");
        this._moveStatus = Constants.MOVE_UP;
    };

    Gurin.prototype.walkDown = function () {
        if (this._moveStatus == Constants.MOVE_DOWN) {
            return;
        }
        this.gurin.gotoAndPlay("walk_down");
        this._moveStatus = Constants.MOVE_DOWN;
    };

    Gurin.prototype.stay = function () {
        if (this._moveStatus == Constants.STAY) {
            return;
        }
        this.gurin.gotoAndStop("stay");
        this._moveStatus = Constants.STAY;
    };
    return Gurin;
})(egret.Sprite);
Gurin.prototype.__class__ = "Gurin";
