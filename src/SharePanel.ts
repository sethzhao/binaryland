class SharePanel extends egret.Sprite{

    public constructor()
    {
        super();
        this.draw();
    }


    private draw()
    {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;

        this.graphics.beginFill(0x111111,0.5);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();

        var share:egret.Bitmap = new egret.Bitmap();
        share.texture = RES.getRes("share_png");
        this.addChild(share);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);

    }

    private hide()
    {
        console.log("tap");
        this.parent.removeChild(this);
    }
}