class Main extends egret.DisplayObjectContainer{

    /**
     * 加载进度界面
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        //设置加载进度界面
        this.loadingView  = new LoadingUI();
        this.addChild(this.loadingView);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
//        egret.Profiler.getInstance().run();

        RES.loadConfig("resource/resource.json","resource/");
    }

    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("gameres");
    }
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="gameres"){
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            this.createStartPage();
        }
    }

    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if(event.groupName=="gameres"){
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }

    private _startPage:StartPage;
    private _gameOverPage:GameOverPage;

    private createStartPage(){
        this._startPage = new StartPage();
        this.addChild(this._startPage);
        this.controller = new Controller();
        this.addChild(this.controller)
        this.addStartListener();
    }

    private start(){
        this.removeStartListener();
        this.createGameScene();
        this.addChild(Timer.instance());
        Timer.instance().addEventListener("timeup",this.timeup,this);
        this.addChild(Round.instance());
    }

    private timeup(){
        this.gameScene.lose();
    }


    public restart(){
        this.removeGameOverListener();
        this.addChild(this._startPage);
        Timer.instance().reset();
        Round.instance().reset();
        this.addStartListener();
    }

    public gameOver(){
        this.removeChild(this.gameScene);
        this.removeChild(Timer.instance());
        this.removeChild(Round.instance());
        if(this._gameOverPage == null){
            this._gameOverPage = new GameOverPage();
        }
        this.addChild(this._gameOverPage);

        this.addGameOverListener();

    }

    private controller:Controller;
    private gameScene:GameScene;


    /**
     * 创建游戏场景
     */
    private createGameScene():void {

        this.gameScene = new GameScene();
        this.gameScene.usePenguin = this._startPage.usePenguin;
        this.addChild(this.gameScene);

        this.addGameListener();

    }



    private _lastTime:number = egret.getTimer();

    private speedOffset():number{
        var nowTime:number = egret.getTimer();
        var fps:number = 1000/(nowTime-this._lastTime);
        this._lastTime = nowTime;
        return 60/fps;
    }


    private gameViewUpdate(){
        Timer.instance().count();
        this.gameScene.update(Constants.SPEED * this.speedOffset());
    }

    private addStartListener(){
        this.controller.addStartListener(this._startPage);
        this._startPage.addEventListener("start",this.start,this);
    }

    public removeStartListener(){
        this.controller.removeStartListener(this._startPage);
        this._startPage.removeEventListener("start",this.start,this);
    }

    public addGameListener(){
        this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
        this.keyListener(this.gameScene);
        this.controller.addGameListener(this.gameScene);
    }

    public removeGameListener(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
        this.controller.removeGameListener(this.gameScene);
    }

    private addGameOverListener(){
        this.controller.addGameOverListener(this._gameOverPage);
        this._gameOverPage.addEventListener("restart",this.restart,this);
    }

    public removeGameOverListener(){
        this.controller.removeGameOverListener(this._gameOverPage);
        this._gameOverPage.removeEventListener("restart",this.restart,this);
    }

    private keyListener(src){
        document.addEventListener("keydown",function(event:KeyboardEvent){
            switch (event.keyCode){
                case 87:src.upBegin();break;
                case 68:src.rightBegin();break;
                case 83:src.downBegin();break;
                case 65:src.leftBegin();break;
                case 73:src.attack();break;
            }
        });
        document.addEventListener("keyup",function(event:KeyboardEvent){
            src.end();
        });
    }


}