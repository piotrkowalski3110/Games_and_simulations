/// <reference path="./mytypes.d.ts"/>
import PlayerType from "./gameCanvas_Player.js";
import AnimationType from "./gameCanvas_Animation.js";
import Keyboard from "./gameCanvas_Keyboard.js";
export { PlayerUserType as default };
const STAND = Symbol("stand");
const WALK_LEFT = Symbol("walk left");
const WALK_RIGHT = Symbol("walk right");
const ATTACK = Symbol("attack");
class PlayerUserType extends PlayerType {
    constructor(akvOptionsIn) {
        const akvDefaults = {
            x: 280,
            y: 310,
            nWidth: 75,
            nHeight: 114,
            bFlipH: false
        }, akvOptions = Object.assign(Object.assign({}, akvDefaults), akvOptionsIn);
        super(akvOptions);
        this.dWalkSpeed = 80.0;
        if (!this.kvOptions.context) {
            throw "Missing context";
        }
        const aAnimStand = new AnimationType({
            strURL: "/images/Player/Player_Idle.png",
            context: this.kvOptions.context,
            nRate: 100
        });
        const aAnimWalk = new AnimationType({
            strURL: "/images/Player/Player_Walk.png",
            context: this.kvOptions.context,
            nRate: 100
        });
        const aAnimAttack = new AnimationType({
            strURL: "/images/Player/Player_Attack.png",
            context: this.kvOptions.context,
            nRate: 100
        });
        aAnimStand.appendFrame(39, 57);
        aAnimStand.appendFrame(167, 57);
        aAnimStand.appendFrame(295, 56);
        aAnimStand.appendFrame(423, 56);
        aAnimStand.appendFrame(551, 57);
        aAnimWalk.appendFrame(21, 54);
        aAnimWalk.appendFrame(149, 55);
        aAnimWalk.appendFrame(277, 54);
        aAnimWalk.appendFrame(405, 53);
        aAnimWalk.appendFrame(533, 54);
        aAnimWalk.appendFrame(661, 55);
        aAnimWalk.appendFrame(789, 54);
        aAnimWalk.appendFrame(917, 53);
        aAnimAttack.appendFrame(20, 54);
        aAnimAttack.appendFrame(143, 55);
        aAnimAttack.appendFrame(284, 55);
        aAnimAttack.appendFrame(414, 54);
        aAnimAttack.appendFrame(542, 56);
        aAnimAttack.appendFrame(670, 57);
        this.kvPlayerStateToAnim = {
            [STAND]: aAnimStand,
            [WALK_LEFT]: aAnimWalk,
            [WALK_RIGHT]: aAnimWalk,
            [ATTACK]: aAnimAttack
        };
    }
    update(adElapsedTime) {
        let aePlayerState = STAND;
        if (Keyboard.isLeft()) {
            aePlayerState = WALK_LEFT;
        }
        else if (Keyboard.isRight()) {
            aePlayerState = WALK_RIGHT;
        }
        else if (Keyboard.isAttack()) {
            aePlayerState = ATTACK;
        }
        if (aePlayerState !== this.ePlayerState) {
            this.ePlayerState = aePlayerState;
            this.setAnimation(this.kvPlayerStateToAnim[aePlayerState]);
            switch (aePlayerState) {
                case WALK_LEFT:
                    this.setFlipH(true);
                    break;
                case WALK_RIGHT:
                    this.setFlipH(false);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (aePlayerState) {
                case WALK_LEFT:
                    this.setX(this.getX() - this.dWalkSpeed * adElapsedTime);
                    break;
                case WALK_RIGHT:
                    this.setX(this.getX() + this.dWalkSpeed * adElapsedTime);
                    break;
                default:
                    break;
            }
        }
    }
}
