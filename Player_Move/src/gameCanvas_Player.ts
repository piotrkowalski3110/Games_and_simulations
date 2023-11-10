import AnimationType from "./gameCanvas_Animation.js";

export {PlayerType as default}

type MyPlayerOptions = {
    x: number,
    y: number,
    nWidth: number,
    nHeight: number,
    bFlipH: boolean
}

class PlayerType {

    kvOptions: MyPlayerOptions;
    hAnimation?: number;
    AnimationCurrent?: AnimationType;

    constructor(akvOptionsIn?: Partial<MyPlayerOptions>) {
        const akvDefaults: MyPlayerOptions = {
            x: 0,
            y: 0,
            nWidth: 0,
            nHeight: 0,
            bFlipH: false
        };

        this.kvOptions = {...akvDefaults, ...akvOptionsIn}
    }

    setAnimation(aAnimation: AnimationType) {
        if (this.hAnimation) {
            clearInterval(this.hAnimation)
            this.hAnimation = (void 0)
        }
        this.AnimationCurrent = aAnimation

        const anNumFrames = aAnimation.getNumFrames();

        if (1 < anNumFrames) {
            this.hAnimation = setInterval(() => {
                aAnimation.setCurrentFrameIndex((aAnimation.getCurrentFrameIndex() + 1) % anNumFrames)
            }, aAnimation.getInterval())
        } else {
            aAnimation.setCurrentFrameIndex(0)
        }
    }

    draw() {
        if (!this.AnimationCurrent) {
            return
        }

        const {x, y, nWidth, nHeight, bFlipH} = this.kvOptions;
        this.AnimationCurrent.draw(x, y, nWidth, nHeight, bFlipH)
    }
}