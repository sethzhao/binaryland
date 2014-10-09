var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Net = (function (_super) {
    __extends(Net, _super);
    function Net(texture, i) {
        _super.call(this);
        this.texture = texture;
        var point = Util.getPointXYByIndex(i);
        this.x = point.x;
        this.y = point.y;
        this._hasPenguin = false;
    }
    Object.defineProperty(Net.prototype, "hasPenguin", {
        get: function () {
            return this._hasPenguin;
        },
        set: function (hasPenguin) {
            this._hasPenguin = hasPenguin;
        },
        enumerable: true,
        configurable: true
    });

    return Net;
})(egret.Bitmap);
Net.prototype.__class__ = "Net";
