var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        _super.call(this);
        this._countTime = 900;
        this._lastTime = egret.getTimer();

        this._sheet = RES.getRes("res_json");

        this.n1bitmap = new egret.Bitmap();
        this.n2bitmap = new egret.Bitmap();
        this.n2bitmap.x = 16;
        this.n3bitmap = new egret.Bitmap();
        this.n3bitmap.x = 32;
        this.addChild(this.n1bitmap);
        this.addChild(this.n2bitmap);
        this.addChild(this.n3bitmap);

        this.x = 305;
        this.y = 18;

        this.show();
    }
    Timer.instance = function () {
        if (this._instance == null) {
            this._instance = new Timer();
        }
        return this._instance;
    };

    Timer.prototype.reset = function () {
        this._countTime = 900;
        this.show();
    };


    Object.defineProperty(Timer.prototype, "countTime", {
        get: function () {
            return this._countTime;
        },
        set: function (countTime) {
            this._countTime = countTime;
            this.show();
        },
        enumerable: true,
        configurable: true
    });

    Timer.prototype.count = function () {
        var nowTime = egret.getTimer();

        if (nowTime - this._lastTime > 50) {
            this._countTime--;
            this._lastTime = nowTime;

            this.show();

            if (this._countTime == 0) {
                this.dispatchEventWith("timeup");
            }
        }
    };

    Timer.prototype.show = function () {
        var n1 = Math.floor(this._countTime / 100);
        var n2 = Math.floor(this._countTime % 100 / 10);
        var n3 = this._countTime % 100 % 10;

        this.n1bitmap.texture = this._sheet.getTexture(String(n1));

        this.n2bitmap.texture = this._sheet.getTexture(String(n2));

        this.n3bitmap.texture = this._sheet.getTexture(String(n3));
    };
    return Timer;
})(egret.Sprite);
Timer.prototype.__class__ = "Timer";
