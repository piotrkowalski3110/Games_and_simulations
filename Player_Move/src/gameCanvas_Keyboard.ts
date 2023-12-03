const KEY_LEFT: string = "ArrowLeft",
    KEY_RIGHT: string = "ArrowRight",
    KEY_E: string = "e";

interface MyKeyContainer {
    [key: string]: boolean
};

class KeyboardType {
    kvKeys: MyKeyContainer = {};

    constructor() {
        this.kvKeys = {};
        [KEY_LEFT, KEY_RIGHT, KEY_E].forEach(aKey => {
            this.kvKeys[aKey] = false
        })

        document.onkeydown = event => {
            if (event.key in this.kvKeys) {
                this.kvKeys[event.key] = true
            }
        }
        document.onkeyup = event => {
            if (event.key in this.kvKeys) {
                this.kvKeys[event.key] = false
            }
        }
    }

    isLeft(): boolean {
        return this.kvKeys[KEY_LEFT] && !this.kvKeys[KEY_RIGHT]
    }

    isRight(): boolean {
        return this.kvKeys[KEY_RIGHT] && !this.kvKeys[KEY_LEFT]
    }

    isAttack(): boolean {
        return this.kvKeys[KEY_E]
    }
}

const Keyboard: KeyboardType = new KeyboardType()
export {Keyboard as default}