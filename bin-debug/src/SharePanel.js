var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SharePanel = (function (_super) {
    __extends(SharePanel, _super);
    function SharePanel() {
        _super.call(this);
        this.draw();
    }
    SharePanel.prototype.draw = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;

        this.graphics.beginFill(0x111111, 0.5);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();

        var share = new egret.Bitmap();
        share.texture = RES.getRes("share_png");
        this.addChild(share);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
    };

    SharePanel.prototype.hide = function () {
        console.log("tap");
        this.parent.removeChild(this);
    };
    return SharePanel;
})(egret.Sprite);
SharePanel.prototype.__class__ = "SharePanel";
