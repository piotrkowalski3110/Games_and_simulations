import PlayerType from "./gameCanvas_Player.js"
import AnimationType from "./gameCanvas_Animation.js"

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

    const aBackgorund = new PlayerType({nWidth: 640, nHeight: 480})
    const aMusketeerPlayer = new PlayerType({x: 100, y: 220, nWidth: 50, nHeight: 71, bFlipH: false})
    const aKnightEnemy = new PlayerType({x: 400, y: 250, nWidth: 71, nHeight: 66, bFlipH: true})
    const aAnimBackground = new AnimationType({strURL: "images/game_background.jpg", context: aContext})
    const aAnimStandMusketeerPlayer = new AnimationType({
        strURL: "images/Musketeer_Idle.png",
        context: aContext,
        nRate: 300
    })
    const aAnimStandEnemyKnightEnemy = new AnimationType({
        strURL: "images/Knight_Idle.png",
        context: aContext,
        nRate: 300
    })

    aAnimBackground.appendFrame(0, 0);

    aAnimStandMusketeerPlayer.appendFrame(39, 57)
    aAnimStandMusketeerPlayer.appendFrame(167, 57)
    aAnimStandMusketeerPlayer.appendFrame(295, 56)
    aAnimStandMusketeerPlayer.appendFrame(423, 56)
    aAnimStandMusketeerPlayer.appendFrame(551, 57)

    aAnimStandEnemyKnightEnemy.appendFrame(28, 62)
    aAnimStandEnemyKnightEnemy.appendFrame(156, 61)
    aAnimStandEnemyKnightEnemy.appendFrame(284, 60)
    aAnimStandEnemyKnightEnemy.appendFrame(412, 60)
    aAnimStandEnemyKnightEnemy.appendFrame(540, 60)
    aAnimStandEnemyKnightEnemy.appendFrame(668, 61)

    aBackgorund.setAnimation(aAnimBackground)
    aMusketeerPlayer.setAnimation(aAnimStandMusketeerPlayer)
    aKnightEnemy.setAnimation(aAnimStandEnemyKnightEnemy)

    function gameLoop() {
        aBackgorund.draw()
        aMusketeerPlayer.draw()
        aKnightEnemy.draw()
        requestAnimationFrame(gameLoop)
    }

    aCanvas.style.display = "block"
    requestAnimationFrame(gameLoop)
}