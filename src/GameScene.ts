class GameScene extends egret.DisplayObjectContainer{

    private _sheet:egret.SpriteSheet;
    private _walls:Array<egret.Bitmap> = [];
    private _nets:Array<Net> = [];
    private _heart:egret.Bitmap;

    private _gurin:Penguin;
    private _malon:Penguin;
    private _spiders:Array<Spider> = [];

    private _roads:Array<number> = [];

    private _usePenguin:number;

    public constructor(){
        super();

        this._sheet = RES.getRes("res_json");

        this.creatScene(Round.instance().roundNum);

    }

    private clearSpider(){
        for(var i=0;i<this._spiders.length;i++){
            this._spiders[i].stop();
            this.removeChild(this._spiders[i]);
        }
        this._spiders = [];
    }

    private clearScene(){
        this._walls = [];
        this._nets = [];
        this._roads = [];
        this.clearSpider();
        this.removeChildren();
    }
    private creatScene(roundNum:number){
        this.clearScene();
        this.createBackground();
        this.createHeart();

        var wallIndexs:Array<number> = Util.getRoundWall(roundNum);
        var netsIndexs:Array<number> = Util.getRoundNet(roundNum);
        for(var i=0;i<150;i++){
            if(wallIndexs.indexOf(i) > -1){
                this.createWall(i,roundNum);
                continue;
            }

            if(netsIndexs.indexOf(i) > -1){
                this.createNet(i);
                continue;
            }

            if(i<=90){
                this._roads.push(i);
            }
        }
        this.createSpiders();

        this._gurin = new Penguin(Constants.GURIN);
        this._malon = new Penguin(Constants.MALON);
        this.addChild(this._gurin);
        this.addChild(this._malon);

        this.share();
    }

    private share(){
        WeixinApi.ready(function(api:WeixinApi){
            var info:WeixinShareInfo = new WeixinShareInfo();
            if(Round.instance().isFinish){
                info.desc = info.title = "我在企鹅先生这个游戏里通关了，你也来试试吧！";
            }else{
                info.desc = info.title = "我在企鹅先生这个游戏里闯到了第"+Round.instance().roundNum+"关，你也来试试吧！";
            }
            info.link = "http://slertness.com/game/binaryland/index.html";
            info.imgUrl = "http://slertness.com/game/binaryland/logo.png";
            api.shareToFriend(info);
            api.shareToTimeline(info);
        });
    }

    public set usePenguin(usePenguin:number){
        this._usePenguin = usePenguin;
    }

    private createSpiders(){
        for(var i=0;i<3*Round.instance().roundNum;i++){
            var road:number = Math.floor(Math.random() * this._roads.length);
            var spider:Spider = new Spider(this._roads[road]);
            this._spiders.push(spider);
            this.addChild(spider);
        }

    }

    public update(speed:number){
        this.gurin.update(speed);
        this.malon.update(speed);

        if(this._gurin.isInNet && this._malon.isInNet){
            this.lose();
        }

        if(this.isWin()){
            console.log("win");


            this.win();
        }
    }




    public isWin():boolean{
        var heart:egret.Bitmap = this.heart;
        if(heart.hitTestPoint(this.gurin.x+36,this.gurin.y) && heart.hitTestPoint(this.malon.x-4,this.malon.y)){
            if(heart.x - this.gurin.x > 28 && this.malon.x - heart.x > 28){
                if(Math.abs(Math.abs(heart.y) - Math.abs(this.gurin.y)) < 4 && Math.abs(Math.abs(heart.y) - Math.abs(this.malon.y)) < 4){
                    return true;
                }
            }
        }
        if(heart.hitTestPoint(this.malon.x+36,this.malon.y) && heart.hitTestPoint(this.gurin.x-4,this.gurin.y)){
            if(heart.x - this.malon.x > 28 && this.gurin.x - heart.x > 28){
                if(Math.abs(Math.abs(heart.y) - Math.abs(this.gurin.y)) < 4 && Math.abs(Math.abs(heart.y) - Math.abs(this.malon.y)) < 4){
                    return true;
                }
            }
        }
        return false;
    }

    public win(){
        (<Main>this.parent).removeGameListener();
        this.clearSpider();
        this.unlockHeart();
        this._gurin.stay();
        this._malon.stay();
        var timer:egret.Timer = new egret.Timer(1000,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.winTimerComFunc,this);
        timer.start();

    }

    private winTimerComFunc(){
        this.removeChild(this._gurin);
        this.removeChild(this._malon);
        this.showWin();

        var timer:egret.Timer = new egret.Timer(1000,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.nextRoundTimerComFunc,this);
        timer.start();
    }

    private nextRoundTimerComFunc(){
        if(Round.instance().roundNum == 7){
            (<Main>this.parent).gameOver();
            Round.instance().isFinish = true;
            return;
        }
        Round.instance().next();
        Timer.instance().reset();
        this.creatScene(Round.instance().roundNum);
        (<Main>this.parent).addGameListener();
    }

    public lose(){
        if(!this._gurin.isInNet){
            this._gurin.lose();
        }
        if(!this._malon.isInNet){
            this._malon.lose();
        }
        (<Main>this.parent).removeGameListener();
        var timer:egret.Timer = new egret.Timer(1000,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.loseTimerComFunc,this);
        timer.start();
        console.log("lose");
    }

    private loseTimerComFunc(){
        (<Main>this.parent).gameOver();
    }

    public get walls():Array<egret.Bitmap>{
        return this._walls;
    }

    public get nets():Array<Net>{
        return this._nets;
    }

    public get heart():egret.Bitmap{
        return this._heart;
    }

    public get gurin():Penguin{
        return this._gurin;
    }
    public get malon():Penguin{
        return this._malon;
    }

    public get spiders():Array<Spider>{
        return this._spiders;
    }


    private createHeart(){
        this._heart = new egret.Bitmap();
        this._heart.texture = this._sheet.getTexture("heart_lock");
        var point = Util.getPointXYByIndex(7);
        this._heart.x = point.x;
        this._heart.y = point.y;
        this.addChild(this._heart);
    }

    private createNet(i:number){
        var net:Net = new Net(this._sheet.getTexture("net"),i);
        this.addChild(net);
        this._nets.push(net);
    }
    private createWall(i:number,roundNum:number){
        var wall:egret.Bitmap = new egret.Bitmap();
        if(roundNum == 7){
            roundNum = 1;
        }
        wall.texture = this._sheet.getTexture("wall"+roundNum);
        var point = Util.getPointXYByIndex(i);
        wall.x = point.x;
        wall.y = point.y;
        this.addChild(wall);
        this._walls.push(wall);
    }

    private createBackground(){
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = this._sheet.getTexture("bg");
        this.addChild(bg);
    }



    public hitWallTest(x:number,y:number):egret.Bitmap{
        for(var i=0;i<this.walls.length;i++){
            var wall = this.walls[i];
            if(wall.hitTestPoint(x,y)){
                return wall;
            }
        }
        return null;
    }

    public hitNetTest(penguin:Penguin):Net{
        for(var i=0;i<this.nets.length;i++){
            var net = this.nets[i];
            if(penguin.hitTestPoint(net.x + 15,net.y + 15)){
                return net;
            }
        }
        return null;
    }

    public hitSpiderTest(penguin:Penguin){
        for(var i=0;i<this.spiders.length;i++){
            var spider = this.spiders[i];

            if(!penguin.isAttacking){
                if(spider.hitTestPoint(penguin.x + 16,penguin.y + 16)){
                    penguin.inNet();
                    this.lose();
                    return;
                }

            }else{

                if(penguin.attackStatus == Constants.MOVE_RIGHT){

                    if(29>Math.abs((spider.x+16)-(penguin.x+51)) && 16>Math.abs((spider.y+16)-(penguin.y+16))){
                        console.log("hit attack");
                       this.removeSpider(spider);
                        i--;
                    }else if(spider.hitTestPoint(penguin.x + 16,penguin.y + 16)){
                        console.log("hit");
                        penguin.inNet();
                        this.lose();
                        return;
                    }
                }
                if(penguin.attackStatus == Constants.MOVE_LEFT){
                    console.log(Math.abs((spider.x+16)-(penguin.x-19)));
                    if(29>Math.abs((spider.x+16)-(penguin.x-19)) && 16>Math.abs((spider.y+16)-(penguin.y+16))){
                        console.log("hit attack");
                        this.removeSpider(spider);
                        i--;
                    }else if(spider.hitTestPoint(penguin.x + 16,penguin.y + 16)){
                        console.log("hit");
                        penguin.inNet();
                        this.lose();
                        return;
                    }
                }
                if(penguin.attackStatus == Constants.MOVE_UP){
                    if(16>Math.abs((spider.x+16)-(penguin.x+16)) && 29>Math.abs((spider.y+16)-(penguin.y-19))){
                        this.removeSpider(spider);
                        i--;
                    }else if(spider.hitTestPoint(penguin.x + 16,penguin.y + 16)){
                        penguin.inNet();
                        this.lose();
                        return;
                    }
                }
                if(penguin.attackStatus == Constants.MOVE_DOWN){
                    if(16>Math.abs((spider.x+16)-(penguin.x+16)) && 28>Math.abs((spider.y+16)-(penguin.y+51))){
                        this.removeSpider(spider);
                        i--;
                    }else if(spider.hitTestPoint(penguin.x + 16,penguin.y + 16)){
                        penguin.inNet();
                        this.lose();
                        return;
                    }
                }

            }
        }
    }

    public removeNet(net:Net){
        for(var i=0;i<this.nets.length;i++){
            if(net == this.nets[i]){
               this.nets.splice(i,1);
            }
        }
        this.removeChild(net);
    }

    public removeSpider(spider:Spider){
        for(var i=0;i<this.spiders.length;i++){
            if(spider == this.spiders[i]){
                this.spiders.splice(i,1);
            }
        }
        spider.stop();
        this.removeChild(spider);
    }

    public unlockHeart(){
        this._heart.texture = this._sheet.getTexture("heart_unlock");
    }

    public showWin(){
        this.removeChild(this.heart);
        var win:egret.Bitmap = new egret.Bitmap();
        win.texture = this._sheet.getTexture("win");
        var point = Util.getPointXYByIndex(7);
        win.x = point.x - 16;
        win.y = point.y - 8;
        this.addChild(win);
    }


    public attack(){
        this.gurin.attack();
        this.malon.attack();
    }

    public rightBegin(){
        if(this._usePenguin == Constants.GURIN){
            this.gurin.walkRight();
            this.malon.walkLeft();
        }else{
            this.gurin.walkLeft();
            this.malon.walkRight();
        }
    }
    public leftBegin(){
        if(this._usePenguin == Constants.GURIN) {
            this.gurin.walkLeft();
            this.malon.walkRight();
        }else{
            this.gurin.walkRight();
            this.malon.walkLeft();
        }
    }

    public upBegin(){
        this.gurin.walkUp();
        this.malon.walkUp();
    }

    public downBegin(){
        this.gurin.walkDown();
        this.malon.walkDown();
    }

    public end(){
        this.gurin.stay();
        this.malon.stay();
    }
}