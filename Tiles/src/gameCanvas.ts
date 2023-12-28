import PlayerType from "./gameCanvas_Player.js"
import PlayerUserType from "./gameCanvas_PlayerUser.js";
import AnimationType from "./gameCanvas_Animation.js"
import BackgroundType from "./gameCanvas_Background.js";
import TilesType from "./gameCanvas_Tiles.js"

document.addEventListener("DOMContentLoaded", onReady)

function onReady() {

    const aBoard = document.getElementById("idGame")
    if (!aBoard) {
        return
    }

    const aCanvas = document.createElement("canvas")

    aCanvas.setAttribute("id", "idCanvas")
    aCanvas.style.display = "none"
    aCanvas.width = 640
    aCanvas.height = 480
    aBoard.appendChild(aCanvas)

    const aContext = aCanvas.getContext("2d")
    if (!aContext) {
        return
    }

    const aBackgorund = new BackgroundType({
        nWorldWidth: 640,
        nWidth: 640,
        nHeight: 480,
        strURL: "images/game_background.jpg",
        context: aContext
    });

    const aBackgorund2 = new BackgroundType({
        nWorldWidth: 640,
        y: 160,
        nWidth: 640,
        nHeight: 480,
        strURL: "images/game_background.jpg",
        context: aContext
    });

    const aMusketeerPlayer = new PlayerUserType({
        context: aContext
    });

    const aKnightEnemy = new PlayerType({
        x: 400,
        y: 250,
        nWidth: 71,
        nHeight: 66,
        bFlipH: true
    });

    const aAnimStandEnemyKnightEnemy = new AnimationType({
        strURL: "images/Knight_Idle.png",
        context: aContext,
        nRate: 350
    })

    aAnimStandEnemyKnightEnemy.appendFrame(28, 62)
    aAnimStandEnemyKnightEnemy.appendFrame(156, 61)
    aAnimStandEnemyKnightEnemy.appendFrame(284, 60)
    aAnimStandEnemyKnightEnemy.appendFrame(412, 60)
    aAnimStandEnemyKnightEnemy.appendFrame(540, 60)
    aAnimStandEnemyKnightEnemy.appendFrame(668, 61)

    aKnightEnemy.setAnimation(aAnimStandEnemyKnightEnemy)

    const aMapTiles_Level0 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 2, 2, 3, 3, 2, 2, 1, 2, 3, 1, 2, 2, 3, 3, 2, 2, 1, 2]
    ];

    const aAnimTile0 = new AnimationType({
        strURL: "images/Tiles/tile22.png",
        context: aContext
    });

    const aAnimTile1 = new AnimationType({
        strURL: "images/Tiles/tile23.png",
        context: aContext
    });

    const aAnimTile2 = new AnimationType({
        strURL: "images/Tiles/tile24.png",
        context: aContext
    });

    aAnimTile0.appendFrame(0, 0)
    aAnimTile1.appendFrame(0, 0)
    aAnimTile2.appendFrame(0, 0)

    const aTiles = new TilesType({
        nTileWidth: 70,
        nTileHeight: 70,
        vvMapTiles: aMapTiles_Level0,
        vAnimations: [aAnimTile0, aAnimTile1, aAnimTile2],
        context: aContext
    });

    function gameLoop(adTimestamp: number) {
        let adElapsedTime = (adTimestamp - adTimeOld) * 0.001;
        aMusketeerPlayer.update(adElapsedTime)

        const x = aMusketeerPlayer.getX();
        let adOffsetX = 0.0;
        if (200 < x) {
            adOffsetX = x - 200
        }

        aBackgorund.draw(adOffsetX * 0.33)
        aBackgorund2.draw(adOffsetX * 0.66)

        aTiles.draw(adOffsetX)

        aKnightEnemy.draw(adOffsetX)
        aMusketeerPlayer.draw(adOffsetX)

        adTimeOld = adTimestamp
        requestAnimationFrame(gameLoop)
    }

    aCanvas.style.display = "block"

    let adTimeOld = performance.now();
    let adTimeStart = adTimeOld;

    requestAnimationFrame(gameLoop)
}