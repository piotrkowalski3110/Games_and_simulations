import PlayerType from "./gameCanvas_Player";
import AnimationType from "./gameCanvas_Animation";
import {type MyPlayerOptions} from "./gameCanvas_Player";

export {BackgroundType as default}

type MyBackgroundOptions = MyPlayerOptions & {
    context: CanvasRenderingContext2D,
    strURL: string,
    nWorldWidth: number
};

class BackgroundType extends PlayerType {

    declare kvOptions: MyBackgroundOptions;

    constructor(akvOptionsIn: OnlyRequired<MyBackgroundOptions, "strURL" | "context">) {
        const akvDefaults: Partial<MyBackgroundOptions> = {
            nWorldWidth: 1
        }, akvOptions = {...akvDefaults, ...akvOptionsIn};

        super(akvOptions);

        if (!this.kvOptions.context) {
            throw "Missing context"
        }

        const {strURL: astrURL, context: aContext} = this.kvOptions
        const aAnimBackground = new AnimationType({
            strURL: astrURL,
            context: aContext
        });

        aAnimBackground.appendFrame(0, 0)
        this.setAnimation(aAnimBackground)
    }

    draw(adWorldOffsetX: number) {
        const adWorldXL = adWorldOffsetX,
            adWorldXR = adWorldXL + this.kvOptions.nWorldWidth - 1,
            anWidth = this.getWidth(),
            anStart = Math.floor(adWorldXL / anWidth),
            anEnd = Math.floor(adWorldXR / anWidth)

        for (let n = anStart; n <= anEnd; n++) {
            this.setX(anWidth * n)
            super.draw(adWorldOffsetX)
        }
    }
}