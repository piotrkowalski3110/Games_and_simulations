/// <reference path="./mytypes.d.ts"/>

import PlayerType from "./gameCanvas_Player.js"
import AnimationType from "./gameCanvas_Animation.js"
import Keyboard from "./gameCanvas_Keyboard.js"
import isSegmentsIntersect from "./isSegmentIntersect.js"
import areBoundingBoxesIntersect from "./areBoundingBoxesIntersect.js"
import getSegmentsIntersection from "./getSegmentsIntersection.js"
import ManagerAudio from "./gameCanvas_ManagerAudio.js";

import type TilesType from "./gameCanvas_Tiles.js";
import {type MyPlayerOptions} from "./gameCanvas_Player.js"

export {PlayerUserType as default}

type MyPlayerUserOptions = MyPlayerOptions & {
    context: CanvasRenderingContext2D
};

const STAND = Symbol("stand");
const WALK_LEFT = Symbol("walk left");
const WALK_RIGHT = Symbol("walk right");
const ATTACK = Symbol("attack");
const JUMP = Symbol("jump")

class PlayerUserType extends PlayerType {
    declare kvOptions: MyPlayerUserOptions;
    ePlayerState?: symbol;
    dWalkSpeed: number = 150.0;
    dJumpSpeed: number = 300.0;
    dAccelY: number = 220.0;
    dSpeedX: number = 0;
    dSpeedY: number = 0;
    kvPlayerStateToAnim: {
        [key: symbol]: AnimationType
    };

    constructor(akvOptionsIn: OnlyRequired<MyPlayerUserOptions, "context">) {
        const akvDefaults: OnlyOptional<MyPlayerUserOptions, "context"> = {
            x: 200,
            y: 200,
            nWidth: 50,
            nHeight: 72,
            bFlipH: false
        }, akvOptions = {...akvDefaults, ...akvOptionsIn};

        super(akvOptions);

        if (!this.kvOptions.context) {
            throw "Missing context"
        }

        const aAnimStand = new AnimationType({
            strURL: "/images/Player/Player_Idle.png",
            context: this.kvOptions.context,
            nRate: 100
        })

        const aAnimWalk = new AnimationType({
            strURL: "/images/Player/Player_Walk.png",
            context: this.kvOptions.context,
            nRate: 100
        })

        const aAnimAttack = new AnimationType({
            strURL: "/images/Player/Player_Attack.png",
            context: this.kvOptions.context,
            nRate: 100
        })

        const aAnimJump = new AnimationType({
            strURL: "/images/Player/Player_Jump.png",
            context: this.kvOptions.context,
            nRate: 100,
            bLoop: false
        })

        aAnimStand.appendFrame(39, 57)
        aAnimStand.appendFrame(167, 57)
        aAnimStand.appendFrame(295, 56)
        aAnimStand.appendFrame(423, 56)
        aAnimStand.appendFrame(551, 57)

        aAnimWalk.appendFrame(21, 54)
        aAnimWalk.appendFrame(149, 55)
        aAnimWalk.appendFrame(277, 54)
        aAnimWalk.appendFrame(405, 53)
        aAnimWalk.appendFrame(533, 54)
        aAnimWalk.appendFrame(661, 55)
        aAnimWalk.appendFrame(789, 54)
        aAnimWalk.appendFrame(917, 53)

        aAnimAttack.appendFrame(20, 54)
        aAnimAttack.appendFrame(143, 55)
        aAnimAttack.appendFrame(284, 55)
        aAnimAttack.appendFrame(414, 54)
        aAnimAttack.appendFrame(542, 56)
        aAnimAttack.appendFrame(670, 57)

        aAnimJump.appendFrame(40, 58)
        aAnimJump.appendFrame(167, 59)
        aAnimJump.appendFrame(295, 60)
        aAnimJump.appendFrame(420, 36)
        aAnimJump.appendFrame(548, 36)
        aAnimJump.appendFrame(676, 36)
        aAnimJump.appendFrame(807, 58)

        this.kvPlayerStateToAnim = {
            [STAND]: aAnimStand,
            [WALK_LEFT]: aAnimWalk,
            [WALK_RIGHT]: aAnimWalk,
            [ATTACK]: aAnimAttack,
            [JUMP]: aAnimJump
        }
    }

    update(adElapsedTime: number, aTiles:TilesType) {
        let aePlayerState: symbol = STAND;
        this.dSpeedX = 0;

        if (Keyboard.isJump()) {
            aePlayerState = JUMP
        } else if (Keyboard.isLeft()) {
            aePlayerState = WALK_LEFT
        } else if (Keyboard.isRight()) {
            aePlayerState = WALK_RIGHT
        } else if (Keyboard.isAttack()) {
            aePlayerState = ATTACK
        }

        if (aePlayerState !== this.ePlayerState) {
            this.ePlayerState = aePlayerState
            this.setAnimation(this.kvPlayerStateToAnim[aePlayerState])

            switch (aePlayerState) {
                case WALK_LEFT:
                    this.setFlipH(true)
                    break
                case WALK_RIGHT:
                    this.setFlipH(false)
                    break
                case JUMP:
                    if (0 === this.dSpeedY) {
                        this.dSpeedY = -this.dJumpSpeed
                    }
                    break
                case ATTACK:
                    ManagerAudio.play("attack")
                    break
                default:
                    break
            }
        } else {
            switch (aePlayerState) {
                case WALK_LEFT:
                    this.dSpeedX = -this.dWalkSpeed
                    break
                case WALK_RIGHT:
                    this.dSpeedX = this.dWalkSpeed
                    break
                default:
                    break
            }
        }

        const adOrigY = this.getY();
        const adOrigX = this.getX();

        this.dSpeedY = Math.min(450, Math.max(-450, this.dSpeedY + this.dAccelY * adElapsedTime))

        let adX_new = adOrigX + this.dSpeedX * adElapsedTime;
        let adY_new = adOrigY + this.dSpeedY * adElapsedTime;

        let akvBoundingBox: BoundingBox = this.getBoundingBox();
        let akvBoundingBox_new: BoundingBox = {
            xLeft: adX_new,
            xRight: adX_new + this.getWidth(),
            yTop: adY_new,
            yBottom: adY_new + this.getHeight()
        };

        const avTilesColliding: PlayerType[] = aTiles.getCollidingTiles(akvBoundingBox_new);
        const anTiles = avTilesColliding.length;

        if (0 >= anTiles) {
            this.setX(adX_new);
            this.setY(adY_new);
            return
        }

        const adDeltaX = adX_new - adOrigX;
        const adDeltaY = adY_new - adOrigY;
        let aTile: PlayerType;

        if (0 < Math.abs(adDeltaY)) {
            for (let i = 0; i < anTiles; ++i) {
                aTile = avTilesColliding[i]
                const akvBoundingBox_Tile: BoundingBox = aTile.getBoundingBox()

                if (!areBoundingBoxesIntersect(akvBoundingBox_new, akvBoundingBox_Tile)) {
                    continue
                }

                if (isSegmentsIntersect(akvBoundingBox_Tile.yTop, akvBoundingBox_Tile.yBottom, akvBoundingBox.yTop, akvBoundingBox.yBottom)) {
                    continue
                }

                const avSegmentY: Segment = getSegmentsIntersection(akvBoundingBox_Tile.yTop, akvBoundingBox_Tile.yBottom, akvBoundingBox_new.yTop, akvBoundingBox_new.yBottom);
                let adCorrY: number;

                if (Math.abs(avSegmentY[0] - adY_new) < 0.1) {
                    adCorrY = avSegmentY[1] - avSegmentY[0]
                } else {
                    adCorrY = avSegmentY[0] - avSegmentY[1]
                }

                adY_new += adCorrY;
                akvBoundingBox_new.yTop += adCorrY;
                akvBoundingBox_new.yBottom += adCorrY;

                if((20 < this.dSpeedY) && (0 > adCorrY)){
                    ManagerAudio.play("onground")
                }

                this.dSpeedY = 0;
                break
            }
        }

        if (0 < Math.abs(adDeltaX)) {
            for (let i = 0; i < anTiles; ++i) {
                aTile = avTilesColliding[i]
                const akvBoundingBox_Tile: BoundingBox = aTile.getBoundingBox()

                if (!areBoundingBoxesIntersect(akvBoundingBox_new, akvBoundingBox_Tile)) {
                    continue
                }

                if (isSegmentsIntersect(akvBoundingBox_Tile.xLeft, akvBoundingBox_Tile.xRight, akvBoundingBox.xLeft, akvBoundingBox.xRight)) {
                    continue
                }

                const avSegmentX: Segment = getSegmentsIntersection(akvBoundingBox_Tile.xLeft, akvBoundingBox_Tile.xRight, akvBoundingBox_new.xLeft, akvBoundingBox_new.xRight);
                let adCorrX: number;

                if (Math.abs(avSegmentX[0] - adX_new) < 0.1) {
                    adCorrX = avSegmentX[1] - avSegmentX[0]
                } else {
                    adCorrX = avSegmentX[0] - avSegmentX[1]
                }

                adX_new += adCorrX
                this.dSpeedX = 0

                ManagerAudio.play("hit")
                break
            }
        }

        this.setX(adX_new);
        this.setY(adY_new);
    }
}