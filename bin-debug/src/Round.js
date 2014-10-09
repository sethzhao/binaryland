var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Round = (function (_super) {
    __extends(Round, _super);
    function Round() {
        _super.call(this);
        this._roundNum = 1;
        this._isFinish = false;
        this._sheet = RES.getRes("res_json");

        this.n1bitmap = new egret.Bitmap();
        this.n2bitmap = new egret.Bitmap();
        this.n2bitmap.x = 16;
        this.addChild(this.n1bitmap);
        this.addChild(this.n2bitmap);

        this.x = 465;
        this.y = 18;

        this.show();
    }

    Object.defineProperty(Round.prototype, "isFinish", {
        get: function () {
            return this._isFinish;
        },
        set: function (isFinish) {
            this._isFinish = isFinish;
        },
        enumerable: true,
        configurable: true
    });

    Round.instance = function () {
        if (this._instance == null) {
            this._instance = new Round();
        }
        return this._instance;
    };

    Round.prototype.reset = function () {
        this._roundNum = 1;
        this._isFinish = false;
        this.show();
    };

    Round.prototype.next = function () {
        this._roundNum++;
        this.show();
    };

    Object.defineProperty(Round.prototype, "roundNum", {
        get: function () {
            return this._roundNum;
        },
        enumerable: true,
        configurable: true
    });

    Round.prototype.show = function () {
        var n1 = 0;
        if (this.roundNum > 9) {
            n1 = Math.floor(this.roundNum / 10);
        }
        var n2 = this.roundNum % 10;

        this.n1bitmap.texture = this._sheet.getTexture(String(n1));
        this.n2bitmap.texture = this._sheet.getTexture(String(n2));
    };
    return Round;
})(egret.Sprite);
Round.prototype.__class__ = "Round";
