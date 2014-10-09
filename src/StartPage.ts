class StartPage extends egret.DisplayObjectContainer{

    private _gurin:egret.Bitmap;
    private _malon:egret.Bitmap;
    private _usePenguin:number;

    public constructor(){
        super();

        var sheet:egret.SpriteSheet = RES.getRes("res_json");
        var background:egret.Bitmap = new egret.Bitmap();
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

        this._usePenguin  = Constants.GURIN;

    }


    public get usePenguin(){
        return this._usePenguin;
    }

    public up(){
        if(this.contains(this._malon)){
            this.removeChild(this._malon);
        }
        this.addChild(this._gurin);
        this._usePenguin = Constants.GURIN;
    }

    public down(){
        if(this.contains(this._gurin)){
            this.removeChild(this._gurin);
        }
        this.addChild(this._malon);
        this._usePenguin = Constants.MALON;
    }

    public start(){
        this.parent.removeChild(this);
        this.dispatchEventWith("start");
    }


}