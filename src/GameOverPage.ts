class GameOverPage extends egret.DisplayObjectContainer{


    private _restartBtn:egret.Bitmap;
    private _shareBtn:egret.Bitmap;
    private _sheet:egret.SpriteSheet;
    private _selectAction:number;
    private txt:egret.TextField;
    private sharePanel:SharePanel;

    public constructor(){
        super();
        this.sharePanel = new SharePanel();
        this._sheet = RES.getRes("res_json");
        var background:egret.Bitmap = new egret.Bitmap();
        background.texture = this._sheet.getTexture("gameover");
        this.addChild(background);

        this._restartBtn = new egret.Bitmap();
        this._restartBtn.texture = this._sheet.getTexture("restart_active");
        this._restartBtn.x = 118;
        this._restartBtn.y = 270;
        this.addChild(this._restartBtn);



        this._shareBtn = new egret.Bitmap();
        this._shareBtn.texture = this._sheet.getTexture("share");
        this._shareBtn.x = 270;
        this._shareBtn.y = 270;
        this.addChild(this._shareBtn);

        this._selectAction = Constants.RESTART;

        var w = egret.MainContext.instance.stage.stageWidth;

        this.txt = new egret.TextField();
        this.txt.y = 110;
        this.txt.fontFamily="微软雅黑";
        this.txt.width = w;
        this.txt.height = 100;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;;
        this.txt.size = 32;
        this.addChild(this.txt);

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);

    }

    private onAddToStage(){
        if(Round.instance().roundNum == 1){
            this.txt.text = "第1关都过不了，弱爆了！";
        }else if(Round.instance().roundNum > 1 && Round.instance().roundNum < 5){
            this.txt.text = "你闯到了第"+Round.instance().roundNum+"关，有两下子！";
        }else if(Round.instance().roundNum >= 5 && Round.instance().roundNum <= 7){
            this.txt.text = "你闯到了第"+Round.instance().roundNum+"关，看来练过！";
        }else if(Round.instance().isFinish){
            this.txt.text = "恭喜你，通关了！";
        }
    }

    public right(){
        console.log("right");
        this._restartBtn.texture = this._sheet.getTexture("restart");
        this._shareBtn.texture = this._sheet.getTexture("share_active");
        this._selectAction = Constants.SHARE;
    }

    public left(){
        console.log("left");
        this._restartBtn.texture = this._sheet.getTexture("restart_active");
        this._shareBtn.texture = this._sheet.getTexture("share");
        this._selectAction = Constants.RESTART;;
    }

    public start(){
        console.log(this._selectAction);
        if(this._selectAction == Constants.RESTART){
            this.parent.removeChild(this);
            this.dispatchEventWith("restart");
        }else{
            this.addChild(this.sharePanel);
        }
    }


}