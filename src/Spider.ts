class Spider extends egret.Sprite{

    private mc:egret.MovieClip;
    private point:number;
    private timer:egret.Timer;
    private duration:number;
    public constructor(p:number){
        super();
        this.point = p;
        var point = Util.getPointXYByIndex(this.point);;
        var data = RES.getRes("spider_json");
        var texture = RES.getRes("spider_png");
        this.mc = new egret.MovieClip(data,texture);
        this.mc.gotoAndPlay("walk");
        this.mc.frameRate = 4;
        this.x = point.x;
        this.y = point.y;
        this.addChild(this.mc)

        this.duration = 500;
        this.timer = new egret.Timer(this.duration,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerComFunc,this);
        this.timer.start();
    }

    private lastOrientation:number = 0;

    public stop(){
        this.timer.stop();
    }

    private speedUp1:boolean = false;
    private speedUp2:boolean = false;
    private speedUp3:boolean = false;
    private speedUp:boolean = false;

    private timerComFunc(){
        if(Timer.instance().countTime < 300){
            this.duration = 150
            this.mc.frameRate = 12;
            if(!this.speedUp1){
                this.speedUp1 = true;
                this.speedUp = true;
            }
        }else if(Timer.instance().countTime < 450){
            this.duration = 250
            this.mc.frameRate = 10;
            if(!this.speedUp2){
                this.speedUp2 = true;
                this.speedUp = true;
            }
        }else if(Timer.instance().countTime < 600){
            this.duration = 350;
            this.mc.frameRate = 8;
            if(!this.speedUp3){
                this.speedUp3 = true;
                this.speedUp = true;
            }
        }else{
            this.duration = 500;
            this.mc.frameRate = 4;
        }

        if(this.speedUp){
            this.speedUp = false;
            this.timer.stop();
            this.timer = new egret.Timer(this.duration,0);
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerComFunc,this);
            this.timer.start();
        }



        var wallIndex:Array<number> = Util.getRoundWall(Round.instance().roundNum);
        var orientationCanGo:Array<number> = [];
        if(this.point >= 15 && wallIndex.indexOf(this.point-15) == -1){
            orientationCanGo.push(0);
        }
        if(this.point%15 != 14 && wallIndex.indexOf(this.point+1) == -1){
            orientationCanGo.push(1);
        }
        if(this.point <= 134 && wallIndex.indexOf(this.point+15) == -1){
            orientationCanGo.push(2);
        }
        if(this.point%15 != 0 && wallIndex.indexOf(this.point-1) == -1){
            orientationCanGo.push(3);
        }

        var orientation:number = -1;

        if(this.lastOrientation == 1 || this.lastOrientation == 3){
            if(orientationCanGo.length == 2 && orientationCanGo.indexOf(1) > -1 && orientationCanGo.indexOf(3) > -1){
                orientation = this.lastOrientation;
            }
        }
        if(this.lastOrientation == 0 || this.lastOrientation == 2){
            if(orientationCanGo.length == 2 && orientationCanGo.indexOf(0) > -1 && orientationCanGo.indexOf(2) > -1){
                orientation = this.lastOrientation;
            }
        }

        if(orientation == -1){
            var orientationIndex:number = Math.floor(Math.random() * orientationCanGo.length);
            orientation = orientationCanGo[orientationIndex];
        }

        this.lastOrientation = orientation;

        switch (orientation){
            case 0:
                this.point = this.point-15;
                break;
            case 1:
                this.point = this.point+1;
                break;
            case 2:
                this.point = this.point+15;
                break;
            case 3:
                this.point = this.point-1;
                break;
        }

        var point:egret.Point = Util.getPointXYByIndex(this.point);

        egret.Tween.get(this).to({x:point.x,y:point.y},this.duration);

    }
}