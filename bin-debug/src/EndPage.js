var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndPage = (function (_super) {
    __extends(EndPage, _super);
    function EndPage() {
        _super.call(this);

        var sheet = RES.getRes("res_json");
        var background = new egret.Bitmap();
        background.texture = sheet.getTexture("gameover");
        this.addChild(background);

        var restartBtn = new egret.Bitmap();
        restartBtn.texture = sheet.getTexture("restart");
        restartBtn.x = 120;
        restartBtn.y = 270;
        this.addChild(restartBtn);

        var shareBtn = new egret.Bitmap();
        shareBtn.texture = sheet.getTexture("share");
        shareBtn.x = 270;
        shareBtn.y = 270;
        this.addChild(shareBtn);
    }
    return EndPage;
})(egret.DisplayObjectContainer);
EndPage.prototype.__class__ = "EndPage";
