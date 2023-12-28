const KEY_LEFT = "ArrowLeft", KEY_RIGHT = "ArrowRight", KEY_E = "e";
;
class KeyboardType {
    constructor() {
        this.kvKeys = {};
        this.kvKeys = {};
        [KEY_LEFT, KEY_RIGHT, KEY_E].forEach(aKey => {
            this.kvKeys[aKey] = false;
        });
        document.onkeydown = event => {
            if (event.key in this.kvKeys) {
                this.kvKeys[event.key] = true;
            }
        };
        document.onkeyup = event => {
            if (event.key in this.kvKeys) {
                this.kvKeys[event.key] = false;
            }
        };
    }
    isLeft() {
        return this.kvKeys[KEY_LEFT] && !this.kvKeys[KEY_RIGHT];
    }
    isRight() {
        return this.kvKeys[KEY_RIGHT] && !this.kvKeys[KEY_LEFT];
    }
    isAttack() {
        return this.kvKeys[KEY_E];
    }
}
const Keyboard = new KeyboardType();
export { Keyboard as default };
