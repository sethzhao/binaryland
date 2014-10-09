var Util = (function () {
    function Util() {
    }
    Util.getPointXYByIndex = function (index) {
        var point = new egret.Point();

        point.x = index % 15 * 32 + 16;
        ;
        point.y = Math.floor(index / 15) * 32 + 82;

        return point;
    };

    Util.getRoundWall = function (roundNum) {
        var walls = [];
        if (roundNum == 1) {
            walls.push(16, 17, 18, 20, 21, 22, 24, 25, 26, 28, 29);
            walls.push(30, 31, 33, 35, 37, 38, 39, 41, 43);
            walls.push(52);
            walls.push(61, 62, 63, 64, 65, 67, 69, 70, 71, 72, 73);
            walls.push(82);
            walls.push(90, 91, 93, 95, 97, 99, 101, 103, 104);
            walls.push(112);
            walls.push(121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133);
            walls.push(142);
        }
        if (roundNum == 2) {
            walls.push(16, 18, 20, 21, 22, 23, 24, 26, 28);
            walls.push(31, 33, 35, 37, 39, 40, 41, 42, 43);
            walls.push(48, 52, 56);
            walls.push(61, 62, 63, 65, 66, 67, 68, 69, 71, 73, 74);
            walls.push(82);
            walls.push(90, 91, 93, 94, 95, 97, 99, 100, 101, 102, 103);
            walls.push(108, 112);
            walls.push(121, 123, 125, 127, 128, 129, 131, 133, 134);
            walls.push(140, 142);
        }
        if (roundNum == 3) {
            walls.push(3);
            walls.push(16, 18, 20, 22, 24, 26, 28, 29);
            walls.push(31, 33, 35, 37, 39, 41, 43);
            walls.push(46, 50, 52, 56);
            walls.push(61, 62, 63, 64, 65, 66, 67, 69, 70, 71, 73, 74);
            walls.push(78, 82);
            walls.push(91, 93, 95, 97, 98, 99, 101, 102, 103);
            walls.push(106, 108, 110, 112, 116);
            walls.push(121, 123, 125, 127, 129, 131, 133);
            walls.push(136, 140, 142, 148);
        }
        if (roundNum == 4) {
            walls.push(13);
            walls.push(16, 17, 18, 20, 21, 22, 23, 24, 26, 28);
            walls.push(30, 31, 33, 35, 37, 39, 41, 43);
            walls.push(52, 56);
            walls.push(61, 62, 63, 64, 65, 67, 68, 69, 71, 72, 73);
            walls.push(82, 84);
            walls.push(91, 93, 95, 96, 97, 99, 100, 101, 103, 104);
            walls.push(112, 116);
            walls.push(120, 121, 122, 123, 124, 125, 127, 129, 131, 133);
            walls.push(142, 144);
        }
        if (roundNum == 5) {
            walls.push(5);
            walls.push(15, 16, 18, 20, 22, 24, 26, 28);
            walls.push(31, 33, 35, 37, 38, 39, 41, 42, 43);
            walls.push(48, 52);
            walls.push(60, 61, 63, 64, 65, 67, 69, 70, 71, 73, 74);
            walls.push(76, 82);
            walls.push(91, 92, 93, 95, 96, 97, 98, 99, 101, 102, 103);
            walls.push(108, 112);
            walls.push(121, 123, 125, 127, 129, 130, 131, 133, 134);
            walls.push(136, 142);
        }
        if (roundNum == 6) {
            walls.push(16, 17, 18, 19, 20, 21, 22, 24, 26, 28);
            walls.push(31, 32, 33, 34, 35, 36, 37, 39, 40, 41, 43, 44);
            walls.push(48, 52);
            walls.push(61, 63, 65, 67, 68, 69, 71, 72, 73);
            walls.push(76, 78, 80, 82);
            walls.push(91, 93, 95, 97, 99, 100, 101, 103, 104);
            walls.push(106, 108, 110, 112);
            walls.push(121, 123, 125, 127, 128, 129, 131, 132, 133);
            walls.push(136, 140, 142);
        }
        if (roundNum == 7) {
            walls.push(4);
            walls.push(19);
            walls.push(31, 32, 33, 34, 35, 36, 37, 39, 43);
            walls.push(49, 55, 57);
            walls.push(61, 62, 63, 64, 65, 66, 67, 71);
            walls.push(79, 85, 87);
            walls.push(92, 94, 95, 96, 99, 103);
            walls.push(106, 108, 109);
            walls.push(121, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133);
        }
        return walls;
    };

    Util.getRoundNet = function (roundNum) {
        var nets = [];

        if (roundNum == 1) {
            nets.push(47, 87);
        }
        if (roundNum == 2) {
            nets.push(45, 51, 59);
            nets.push(77, 83);
            nets.push(105, 110, 117);
        }
        if (roundNum == 3) {
            nets.push(4);
            nets.push(15);
            nets.push(30, 32, 36);
            nets.push(45, 53, 59);
            nets.push(76, 79, 85);
            nets.push(105, 111, 113, 117);
            nets.push(122);
        }
        if (roundNum == 4) {
            nets.push(53, 59);
            nets.push(79, 87);
            nets.push(114, 119);
        }
        if (roundNum == 5) {
            nets.push(45, 51, 59);
            nets.push(79, 83, 85, 87);
            nets.push(106, 111, 113, 119);
            nets.push(145);
        }
        if (roundNum == 6) {
            nets.push(3);
            nets.push(46, 53);
            nets.push(60, 64, 66);
            nets.push(85, 87, 89);
            nets.push(113, 119);
            nets.push(122);
            nets.push(138, 147);
        }
        if (roundNum == 7) {
            nets.push(10);
            nets.push(25);
            nets.push(38, 40, 42, 44);
            nets.push(53);
            nets.push(60, 68);
            nets.push(82, 88, 89);
            nets.push(91, 100, 102, 104);
            nets.push(111, 119);
            nets.push(120);
            nets.push(135, 138, 147);
        }
        return nets;
    };
    return Util;
})();
Util.prototype.__class__ = "Util";
