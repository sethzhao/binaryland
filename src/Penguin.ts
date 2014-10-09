class Penguin extends egret.Sprite{

    private mc:egret.MovieClip;
    private _status:number;
    private _beforeStayStatus:number;
    private _isAttacking:boolean;
    private _type:number;
    private _isInNet:boolean;

    public constructor(type:number){
        super();
        var point;
        var data;
        var texture;
        if(type == Constants.MALON){
            console.log("malon create")
            point = Util.getPointXYByIndex(141);
            data = RES.getRes("malon_json");
            texture = RES.getRes("malon_png");
            this._beforeStayStatus = Constants.MOVE_LEFT;
        }
        if(type == Constants.GURIN){
            console.log("gurin create")
            point = Util.getPointXYByIndex(143);
            data = RES.getRes("gurin_json");
            texture = RES.getRes("gurin_png");
            this._beforeStayStatus = Constants.MOVE_RIGHT;
        }
        this._type = type;
        this._status = Constants.STAY;
        this.mc = new egret.MovieClip(data,texture);
        this.mc.gotoAndStop("stay");
        this.mc.frameRate = 12;
        this.x = point.x;
        this.y = point.y;
        this.addChild(this.mc);
        this._isInNet = false;

        this.mc.addEventListener("attackOver" , this.attackOver , this);
    }

    public get type(){
        return this._type;
    }

    private attackOver(){
        this._isAttacking = false;
        switch (this._status){
            case Constants.MOVE_RIGHT:
                this.mc.gotoAndPlay("walk_right");
                break;
            case Constants.MOVE_LEFT:
                this.mc.gotoAndPlay("walk_left");
                break;
            case Constants.MOVE_UP:
                this.mc.gotoAndPlay("walk_up");
                break;
            case Constants.MOVE_DOWN:
                this.mc.gotoAndPlay("walk_down");
                break;
            case Constants.STAY:
                this.mc.gotoAndStop("stay");
                break;
        }
    }

    private moveRightHitWallTest(speed:number):boolean{
        if(this.x+speed+31 > 496){
            return true;
        }
        var topWall = (<GameScene>this.parent).hitWallTest(this.x+speed+31,this.y);
        var bottomWall = (<GameScene>this.parent).hitWallTest(this.x+speed+31,this.y+31);

        if(topWall && bottomWall){
            return true;
        }
        if(topWall){
            if((this.y+15) > (topWall.y+31)){
                this.y = this.y + 1;
            }
            return true;
        }
        if(bottomWall){
            if((this.y+15) < bottomWall.y){
                this.y = this.y - 1;
            }
            return true;
        }
        this.x = this.x + speed;
        return false;
    }

    private moveLeftHitWallTest(speed:number):boolean{
        if(this.x-speed < 16){
            return true;
        }
        var topWall = (<GameScene>this.parent).hitWallTest(this.x-speed,this.y);
        var bottomWall = (<GameScene>this.parent).hitWallTest(this.x-speed,this.y+31);

        if(topWall && bottomWall){
            return true;
        }

        if(topWall){
            if((this.y+15) > (topWall.y+31)){
                this.y = this.y + 1;
            }
            return true;
        }
        if(bottomWall){
            if((this.y+15) < bottomWall.y){
                this.y = this.y - 1;
            }
            return true;
        }
        this.x = this.x - speed;
        return false;
    }

    private moveUpHitWallTest(speed:number):boolean{
        if(this.y-speed < 82){
            return true;
        }
        var leftWall:egret.Bitmap = (<GameScene>this.parent).hitWallTest(this.x,this.y-speed);
        var rightWall = (<GameScene>this.parent).hitWallTest(this.x+31,this.y-speed);

        if(leftWall && rightWall){
            return true;
        }

        if(leftWall){
            if((this.x+15) > (leftWall.x+31)){
                this.x = this.x + 1;
            }
            return true;
        }
        if(rightWall){
            if((this.x+15) < rightWall.x){
                this.x = this.x - 1;
            }
            return true;
        }
        this.y = this.y - speed;
        return false;

    }

    private moveDownHitWallTest(speed:number):boolean{
        if(this.y+speed > 370){
            return true;
        }
        var leftWall = (<GameScene>this.parent).hitWallTest(this.x,this.y+speed+31);
        var rightWall = (<GameScene>this.parent).hitWallTest(this.x+31,this.y+speed+31);

        if(leftWall && rightWall){
            return true;
        }

        if(leftWall){
            if((this.x+15) > (leftWall.x+31)){
                this.x = this.x + 1;
            }
            return true;
        }
        if(rightWall){
            if((this.x+15) < rightWall.x){
                this.x = this.x - 1;
            }
            return true;
        }
        this.y = this.y + speed;
        return false;
    }

    public update(speed:number){
        if(!this._isAttacking){
            switch (this._status){
                case Constants.MOVE_RIGHT:
                    this.moveRightHitWallTest(speed);
                    break;
                case Constants.MOVE_LEFT:
                    this.moveLeftHitWallTest(speed);
                    break;
                case Constants.MOVE_UP:
                    this.moveUpHitWallTest(speed);
                    break;
                case Constants.MOVE_DOWN:
                    this.moveDownHitWallTest(speed);
                    break;
                case Constants.IN_NET:
                    var net:egret.Bitmap = (<GameScene>this.parent).hitNetTest(this);
                    if(!net){
                        this.outNet();
                    }
                    return;
            }
        }


        this.isHitNet();

        this.isHitSpider();


    }

    private isHitSpider(){
        (<GameScene>this.parent).hitSpiderTest(this);
    }



    private isHitNet(){
        var net:Net = (<GameScene>this.parent).hitNetTest(this);
        if(net){
            if(this._isAttacking){
                (<GameScene>this.parent).removeNet(net);
            }else if(!net.hasPenguin){
                this._status = Constants.IN_NET;
                net.hasPenguin = true;
                egret.Tween.get(this).to({x:net.x,y:net.y},200).call(this.inNet,this);
            }
        }
    }

    public inNet(){
        this._isInNet = true;
        this.mc.gotoAndPlay("net");
    }

    private outNet(){
        this._isInNet = false;
        this._status = Constants.STAY;
        this.mc.gotoAndStop("stay");
    }

    public attack(){
        var status:number = this._status != Constants.STAY ?  this._status : this._beforeStayStatus;
        switch (status){
            case Constants.MOVE_RIGHT:
                this._isAttacking = true;
                this.mc.gotoAndPlay("attack_right");
                break;
            case Constants.MOVE_LEFT:
                this._isAttacking = true;
                this.mc.gotoAndPlay("attack_left");
                break;
            case Constants.MOVE_UP:
                this._isAttacking = true;
                this.mc.gotoAndPlay("attack_up");
                break;
            case Constants.MOVE_DOWN:
                this._isAttacking = true;
                this.mc.gotoAndPlay("attack_down");
                break;
        }
    }

    public walkRight(){
        if(this._status == Constants.MOVE_RIGHT || this._status == Constants.IN_NET){
            return;
        }
        this.mc.gotoAndPlay("walk_right");
        this._status = Constants.MOVE_RIGHT;
        this._isAttacking = false;
    }

    public walkLeft(){
        if(this._status == Constants.MOVE_LEFT || this._status == Constants.IN_NET){
            return;
        }
        this.mc.gotoAndPlay("walk_left");
        this._status = Constants.MOVE_LEFT;
        this._isAttacking = false;
    }

    public walkUp(){
        if(this._status == Constants.MOVE_UP || this._status == Constants.IN_NET){
            return;
        }
        this.mc.gotoAndPlay("walk_up");
        this._status = Constants.MOVE_UP;
        this._isAttacking = false;
    }

    public walkDown(){
        if(this._status == Constants.MOVE_DOWN || this._status == Constants.IN_NET){
            return;
        }
        this.mc.gotoAndPlay("walk_down");
        this._status = Constants.MOVE_DOWN;
        this._isAttacking = false;
    }

    public stay(){
        if(this._status == Constants.STAY || this._status == Constants.IN_NET){
            return;
        }
        this.mc.gotoAndStop("stay");
        this._beforeStayStatus = this._status;
        this._status = Constants.STAY;
        this._isAttacking = false;
    }

    public get beforeStayStatus():number{
        return this._beforeStayStatus;
    }

    public get attackStatus():number{
        var status:number = this._status != Constants.STAY ?  this._status : this._beforeStayStatus;
        return status;
    }

    public lose(){
        this.mc.gotoAndStop("lose");
    }

    public get isAttacking():boolean{
        return this._isAttacking;
    }

    public get status():number{
        return this._status;
    }

    public get isInNet():boolean{
        return this._isInNet;
    }
}