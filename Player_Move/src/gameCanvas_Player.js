export { PlayerType as default };
class PlayerType {
    constructor(akvOptionsIn) {
        const akvDefaults = {
            x: 0,
            y: 0,
            nWidth: 0,
            nHeight: 0,
            bFlipH: false
        };
        this.kvOptions = Object.assign(Object.assign({}, akvDefaults), akvOptionsIn);
    }
    setAnimation(aAnimation) {
        if (this.hAnimation) {
            clearInterval(this.hAnimation);
            this.hAnimation = (void 0);
        }
        this.AnimationCurrent = aAnimation;
        const anNumFrames = aAnimation.getNumFrames();
        if (1 < anNumFrames) {
            this.hAnimation = setInterval(() => {
                aAnimation.setCurrentFrameIndex((aAnimation.getCurrentFrameIndex() + 1) % anNumFrames);
            }, aAnimation.getInterval());
        }
        else {
            aAnimation.setCurrentFrameIndex(0);
        }
    }
    draw() {
        if (!this.AnimationCurrent) {
            return;
        }
        const { x, y, nWidth, nHeight, bFlipH } = this.kvOptions;
        this.AnimationCurrent.draw(x, y, nWidth, nHeight, bFlipH);
    }
}
