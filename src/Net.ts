class Net extends egret.Bitmap{
    private _hasPenguin:boolean;

    public constructor(texture:egret.Texture,i:number){
        super();
        this.texture = texture;
        var point = Util.getPointXYByIndex(i);
        this.x = point.x;
        this.y = point.y;
        this._hasPenguin = false;
    }

    public get hasPenguin():boolean{
        return this._hasPenguin;
    }

    public set hasPenguin(hasPenguin:boolean){
        this._hasPenguin = hasPenguin;
    }

}

