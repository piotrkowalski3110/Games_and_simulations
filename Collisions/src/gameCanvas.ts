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

    const aSplashScreen = document.getElementById("idSplashScreen")
    const aCanvas = document.createElement("canvas")

    if (!aSplashScreen) {
        return
    }

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
        y: 50,
        nWidth: 272,
        nHeight: 62,
        strURL: "images/clouds.png",
        context: aContext
    });

    const aMusketeerPlayer = new PlayerUserType({
        context: aContext
    });

    const aKnightEnemy = new PlayerType({
        x: 300,
        y: 125,
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
        [0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 1, 2, 2, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 2, 2, 2, 2, 3, 0, 0, 1, 3, 0, 1, 3, 0, 1, 2, 2, 3, 0, 0]
    ];

    const aAnimTile0 = new AnimationType({
        strURL: "images/Tiles/Ground_10.png",
        context: aContext
    });

    const aAnimTile1 = new AnimationType({
        strURL: "images/Tiles/Ground_11.png",
        context: aContext
    });

    const aAnimTile2 = new AnimationType({
        strURL: "images/Tiles/Ground_12.png",
        context: aContext
    });

    aAnimTile0.appendFrame(0, 0)
    aAnimTile1.appendFrame(0, 0)
    aAnimTile2.appendFrame(0, 0)

    const aTiles = new TilesType({
        nTileWidth: 64,
        nTileHeight: 64,
        vvMapTiles: aMapTiles_Level0,
        vAnimations: [aAnimTile0, aAnimTile1, aAnimTile2],
        context: aContext
    });

    function gameLoop(adTimestamp: number) {
        let adElapsedTime = (adTimestamp - adTime) * 0.001;
        aMusketeerPlayer.update(adElapsedTime, aTiles)

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

        adTime = adTimestamp
        requestAnimationFrame(gameLoop)
    }

    let adTime: number;

    aSplashScreen.onclick = () => {
        aSplashScreen.style.display = "none"
        aCanvas.style.display = "block"

        adTime = performance.now()
        requestAnimationFrame(gameLoop)
    }
}