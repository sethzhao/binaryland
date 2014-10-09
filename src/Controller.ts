class Controller extends egret.Sprite{

    private btn_right:egret.Sprite;
    private btn_left:egret.Sprite;
    private btn_up:egret.Sprite;
    private btn_down:egret.Sprite;
    private btn_attack:egret.Sprite;


    public constructor(){
        super();
        this.btn_right = new egret.Sprite();
        this.btn_right.width = this.btn_right.height = 110;
        this.btn_right.x = 180;
        this.btn_right.y = 480;
        this.btn_right.graphics.beginFill(0xff0000,1);
        this.btn_right.graphics.drawCircle(55,55,55);
        this.btn_right.graphics.endFill();
        this.btn_right.touchEnabled = true;




        this.addChild(this.btn_right);

        this.btn_left = new egret.Sprite();
        this.btn_left.width = this.btn_left.height = 110;
        this.btn_left.x = 10;
        this.btn_left.y = 480;
        this.btn_left.graphics.beginFill(0xff0000,1);
        this.btn_left.graphics.drawCircle(55,55,55);
        this.btn_left.graphics.endFill();
        this.btn_left.touchEnabled = true;

        this.addChild(this.btn_left);


        this.btn_up = new egret.Sprite();
        this.btn_up.width = this.btn_up.height = 110;
        this.btn_up.x = 95;
        this.btn_up.y = 395;
        this.btn_up.graphics.beginFill(0xff0000,1);
        this.btn_up.graphics.drawCircle(55,55,55);
        this.btn_up.graphics.endFill();
        this.btn_up.touchEnabled = true;




        this.addChild(this.btn_up);

        this.btn_down = new egret.Sprite();
        this.btn_down.width = this.btn_down.height = 110;
        this.btn_down.x = 95;
        this.btn_down.y = 565;
        this.btn_down.graphics.beginFill(0xff0000,1);
        this.btn_down.graphics.drawCircle(55,55,55);
        this.btn_down.graphics.endFill();
        this.btn_down.touchEnabled = true;

        this.addChild(this.btn_down);



        this.btn_attack = new egret.Sprite();
        this.btn_attack.width = this.btn_attack.height = 160;
        this.btn_attack.x = 325;
        this.btn_attack.y = 455;
        this.btn_attack.graphics.beginFill(0xff0000,1);
        this.btn_attack.graphics.drawCircle(80,80,80);
        this.btn_attack.graphics.endFill();
        this.btn_attack.touchEnabled = true;

        this.addChild(this.btn_attack);

        this.y = 80;
    }

    public addStartListener(startPage:StartPage){
        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_TAP,startPage.up,startPage);
        this.btn_down.addEventListener(egret.TouchEvent.TOUCH_TAP,startPage.down,startPage);
        this.btn_attack.addEventListener(egret.TouchEvent.TOUCH_TAP,startPage.start,startPage);
    }

    public removeStartListener(startPage:StartPage){
        this.btn_up.removeEventListener(egret.TouchEvent.TOUCH_TAP,startPage.up,startPage);
        this.btn_down.removeEventListener(egret.TouchEvent.TOUCH_TAP,startPage.down,startPage);
        this.btn_attack.removeEventListener(egret.TouchEvent.TOUCH_TAP,startPage.start,startPage);
    }

    public addGameOverListener(gameOverPage:GameOverPage){
        this.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP,gameOverPage.right,gameOverPage);
        this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP,gameOverPage.left,gameOverPage);
        this.btn_attack.addEventListener(egret.TouchEvent.TOUCH_TAP,gameOverPage.start,gameOverPage);
    }

    public removeGameOverListener(gameOverPage:GameOverPage){
        this.btn_right.removeEventListener(egret.TouchEvent.TOUCH_TAP,gameOverPage.right,gameOverPage);
        this.btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP,gameOverPage.left,gameOverPage);
        this.btn_attack.removeEventListener(egret.TouchEvent.TOUCH_TAP,gameOverPage.start,gameOverPage);
    }

    public addGameListener(gameScene:GameScene){

        this.btn_right.addEventListener(egret.TouchEvent.TOUCH_BEGIN,gameScene.rightBegin,gameScene);
        this.btn_right.addEventListener(egret.TouchEvent.TOUCH_END,gameScene.end,gameScene);
        this.btn_right.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,gameScene.end,gameScene);

        this.btn_left.addEventListener(egret.TouchEvent.TOUCH_BEGIN,gameScene.leftBegin,gameScene);
        this.btn_left.addEventListener(egret.TouchEvent.TOUCH_END,gameScene.end,gameScene);
        this.btn_left.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,gameScene.end,gameScene);

        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_BEGIN,gameScene.upBegin,gameScene);
        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_END,gameScene.end,gameScene);
        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,gameScene.end,gameScene);

        this.btn_down.addEventListener(egret.TouchEvent.TOUCH_BEGIN,gameScene.downBegin,gameScene);
        this.btn_down.addEventListener(egret.TouchEvent.TOUCH_END,gameScene.end,gameScene);
        this.btn_down.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,gameScene.end,gameScene);

        this.btn_attack.addEventListener(egret.TouchEvent.TOUCH_TAP,gameScene.attack,gameScene);

    }

    public removeGameListener(gameScene:GameScene) {
        this.btn_right.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,gameScene.rightBegin,gameScene);
        this.btn_right.removeEventListener(egret.TouchEvent.TOUCH_END,gameScene.end,gameScene);
        this.btn_right.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,gameScene.end,gameScene);

        this.btn_left.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,gameScene.leftBegin,gameScene);
        this.btn_left.removeEventListener(egret.TouchEvent.TOUCH_END,gameScene.end,gameScene);
        this.btn_left.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,gameScene.end,gameScene);

        this.btn_up.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,gameScene.upBegin,gameScene);
        this.btn_up.removeEventListener(egret.TouchEvent.TOUCH_END,gameScene.end,gameScene);
        this.btn_up.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,gameScene.end,gameScene);

        this.btn_down.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,gameScene.downBegin,gameScene);
        this.btn_down.removeEventListener(egret.TouchEvent.TOUCH_END,gameScene.end,gameScene);
        this.btn_down.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,gameScene.end,gameScene);

        this.btn_attack.removeEventListener(egret.TouchEvent.TOUCH_TAP,gameScene.attack,gameScene);
    }

}