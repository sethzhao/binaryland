var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this._lastTime = egret.getTimer();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        //        egret.Profiler.getInstance().run();
        RES.loadConfig("resource/resource.json", "resource/");
    };

    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("gameres");
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "gameres") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createStartPage();
        }
    };

    /**
    * preload资源组加载进度
    */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "gameres") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };

    Main.prototype.createStartPage = function () {
        this._startPage = new StartPage();
        this.addChild(this._startPage);
        this.controller = new Controller();
        this.addChild(this.controller);
        this.addStartListener();
    };

    Main.prototype.start = function () {
        this.removeStartListener();
        this.createGameScene();
        this.addChild(Timer.instance());
        Timer.instance().addEventListener("timeup", this.timeup, this);
        this.addChild(Round.instance());
    };

    Main.prototype.timeup = function () {
        this.gameScene.lose();
    };

    Main.prototype.restart = function () {
        this.removeGameOverListener();
        this.addChild(this._startPage);
        Timer.instance().reset();
        Round.instance().reset();
        this.addStartListener();
    };

    Main.prototype.gameOver = function () {
        this.removeChild(this.gameScene);
        this.removeChild(Timer.instance());
        this.removeChild(Round.instance());
        if (this._gameOverPage == null) {
            this._gameOverPage = new GameOverPage();
        }
        this.addChild(this._gameOverPage);

        this.addGameOverListener();
    };

    /**
    * 创建游戏场景
    */
    Main.prototype.createGameScene = function () {
        this.gameScene = new GameScene();
        this.gameScene.usePenguin = this._startPage.usePenguin;
        this.addChild(this.gameScene);

        this.addGameListener();
    };

    Main.prototype.speedOffset = function () {
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        return 60 / fps;
    };

    Main.prototype.gameViewUpdate = function () {
        Timer.instance().count();
        this.gameScene.update(Constants.SPEED * this.speedOffset());
    };

    Main.prototype.addStartListener = function () {
        this.controller.addStartListener(this._startPage);
        this._startPage.addEventListener("start", this.start, this);
    };

    Main.prototype.removeStartListener = function () {
        this.controller.removeStartListener(this._startPage);
        this._startPage.removeEventListener("start", this.start, this);
    };

    Main.prototype.addGameListener = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.keyListener(this.gameScene);
        this.controller.addGameListener(this.gameScene);
    };

    Main.prototype.removeGameListener = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.controller.removeGameListener(this.gameScene);
    };

    Main.prototype.addGameOverListener = function () {
        this.controller.addGameOverListener(this._gameOverPage);
        this._gameOverPage.addEventListener("restart", this.restart, this);
    };

    Main.prototype.removeGameOverListener = function () {
        this.controller.removeGameOverListener(this._gameOverPage);
        this._gameOverPage.removeEventListener("restart", this.restart, this);
    };

    Main.prototype.keyListener = function (src) {
        document.addEventListener("keydown", function (event) {
            switch (event.keyCode) {
                case 87:
                    src.upBegin();
                    break;
                case 68:
                    src.rightBegin();
                    break;
                case 83:
                    src.downBegin();
                    break;
                case 65:
                    src.leftBegin();
                    break;
                case 73:
                    src.attack();
                    break;
            }
        });
        document.addEventListener("keyup", function (event) {
            src.end();
        });
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
