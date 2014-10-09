class Timer extends egret.Sprite{

    private _sheet:egret.SpriteSheet;

    private _countTime:number = 900;
    private _lastTime:number = egret.getTimer();

    private n1bitmap:egret.Bitmap;
    private n2bitmap:egret.Bitmap;
    private n3bitmap:egret.Bitmap;

    public constructor(){
        super();

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

    private static _instance:Timer;

    public static instance():Timer{
        if(this._instance == null){
            this._instance =  new Timer();
        }
        return this._instance;
    }

    public reset(){
        this._countTime = 900;
        this.show();
    }

    public set countTime(countTime:number){
        this._countTime = countTime;
        this.show();
    }

    public get countTime():number{
        return this._countTime;
    }

    public count(){
        var nowTime:number = egret.getTimer();

        if(nowTime - this._lastTime > 50){
            this._countTime--;
            this._lastTime = nowTime;

            this.show();

            if(this._countTime == 0){
                this.dispatchEventWith("timeup");
            }
        }
    }

    private show(){
        var n1:number = Math.floor(this._countTime / 100);
        var n2:number = Math.floor(this._countTime % 100 / 10);
        var n3:number = this._countTime % 100 % 10;

        this.n1bitmap.texture = this._sheet.getTexture(String(n1));

        this.n2bitmap.texture = this._sheet.getTexture(String(n2));

        this.n3bitmap.texture = this._sheet.getTexture(String(n3));

    }


}