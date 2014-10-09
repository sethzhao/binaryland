var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StartPage = (function (_super) {
    __extends(StartPage, _super);
    function StartPage() {
        _super.call(this);

        var sheet = RES.getRes("res_json");
        var background = new egret.Bitmap();
        background.texture = sheet.getTexture("start");
        this.addChild(background);
        this._gurin = new egret.Bitmap();
        this._gurin.texture = sheet.getTexture("start_gurin");
        this._gurin.x = 186;
        this._gurin.y = 232;
        this.addChild(this._gurin);

        this._malon = new egret.Bitmap();
        this._malon.texture = sheet.getTexture("start_malon");
        this._malon.x = 186;
        this._malon.y = 280;

        this._usePenguin = Constants.GURIN;
    }
    Object.defineProperty(StartPage.prototype, "usePenguin", {
        get: function () {
            return this._usePenguin;
        },
        enumerable: true,
        configurable: true
    });

    StartPage.prototype.up = function () {
        if (this.contains(this._malon)) {
            this.removeChild(this._malon);
        }
        this.addChild(this._gurin);
        this._usePenguin = Constants.GURIN;
    };

    StartPage.prototype.down = function () {
        if (this.contains(this._gurin)) {
            this.removeChild(this._gurin);
        }
        this.addChild(this._malon);
        this._usePenguin = Constants.MALON;
    };

    StartPage.prototype.start = function () {
        this.parent.removeChild(this);
        this.dispatchEventWith("start");
    };
    return StartPage;
})(egret.DisplayObjectContainer);
StartPage.prototype.__class__ = "StartPage";
