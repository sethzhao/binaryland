class Round extends egret.Sprite{

    private _sheet:egret.SpriteSheet;

    private _roundNum:number;
    private n1bitmap:egret.Bitmap;
    private n2bitmap:egret.Bitmap;
    private _isFinish:boolean;

    public constructor(){
        super();
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

    public set isFinish(isFinish:boolean){
        this._isFinish = isFinish;
    }

    public get isFinish():boolean{
        return this._isFinish;
    }

    private static _instance:Round;

    public static instance():Round{
        if(this._instance == null){
            this._instance =  new Round();
        }
        return this._instance;
    }

    public reset(){
        this._roundNum = 1;
        this._isFinish = false;
        this.show();
    }

    public next(){
        this._roundNum++;
        this.show();
    }

    public get roundNum(){
        return this._roundNum;
    }

    private show(){
        var n1:number = 0;
        if(this.roundNum > 9){
            n1 = Math.floor(this.roundNum / 10);
        }
        var n2:number = this.roundNum % 10;

        this.n1bitmap.texture = this._sheet.getTexture(String(n1));
        this.n2bitmap.texture = this._sheet.getTexture(String(n2));
    }
}