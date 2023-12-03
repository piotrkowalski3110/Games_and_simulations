import PlayerType from "./gameCanvas_Player.js"
import PlayerUserType from "./gameCanvas_PlayerUser.js";
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

    const aBackgorund = new PlayerType({
        nWidth: 640,
        nHeight: 480});

    const aMusketeerPlayer = new PlayerUserType({
        context: aContext});

    const aKnightEnemy = new PlayerType({
        x: 400,
        y: 250,
        nWidth: 71,
        nHeight: 66,
        bFlipH: true});

    const aAnimBackground = new AnimationType({
        strURL: "images/game_background.jpg",
        context: aContext});

    const aAnimStandEnemyKnightEnemy = new AnimationType({
        strURL: "images/Knight_Idle.png",
        context: aContext,
        nRate: 350
    })

    aAnimBackground.appendFrame(0, 0);

    aAnimStandEnemyKnightEnemy.appendFrame(28, 62)
    aAnimStandEnemyKnightEnemy.appendFrame(156, 61)
    aAnimStandEnemyKnightEnemy.appendFrame(284, 60)
    aAnimStandEnemyKnightEnemy.appendFrame(412, 60)
    aAnimStandEnemyKnightEnemy.appendFrame(540, 60)
    aAnimStandEnemyKnightEnemy.appendFrame(668, 61)

    aBackgorund.setAnimation(aAnimBackground)
    aKnightEnemy.setAnimation(aAnimStandEnemyKnightEnemy)

    function gameLoop(adTimestamp: number) {
        let adElapsedTime = (adTimestamp - adTimeOld) * 0.001;

        aMusketeerPlayer.update(adElapsedTime)

        aBackgorund.draw()
        aKnightEnemy.draw()
        aMusketeerPlayer.draw()

        adTimeOld = adTimestamp
        requestAnimationFrame(gameLoop)
    }

    aCanvas.style.display = "block"

    let adTimeOld = performance.now();
    let adTimeStart = adTimeOld;

    requestAnimationFrame(gameLoop)
}