class ManagerAudioType {
    kvSounds: { [key: string]: HTMLAudioElement[] } = {};
    strExtension: string;

    constructor() {
        this.strExtension = ManagerAudioType.getSupportedExtension()
    }

    static getSupportedExtension(): string {
        const avAudio = [["mp3", "audio/mpeg"], ["ogg", "audio/ogg"], ["wav", "audio/wav"]];
        const aAudio: HTMLAudioElement = new Audio();
        const anElems: number = avAudio.length;

        let astrResult: string;
        let i: number;

        for (i = 0; i < anElems; ++i) {
            astrResult = aAudio.canPlayType(avAudio[i][1])
            if ("probably" === astrResult) {
                return avAudio[i][0]
            }
        }
        for (i = 0; i < anElems; ++i) {
            astrResult = aAudio.canPlayType(avAudio[i][1])
            if ("maybe" === astrResult) {
                return avAudio[i][0]
            }
        }
        return ""
    }

    play(astrName: string) {
        const aAudio: HTMLAudioElement = this.getAudioElement(astrName)
        aAudio.play()
    }

    getAudioElement(astrName: string): HTMLAudioElement {
        if (this.kvSounds[astrName]) {
            const anElems: number = this.kvSounds[astrName].length;
            for (let i = 0; i < anElems; ++i) {
                if (this.kvSounds[astrName][i].ended) {
                    return this.kvSounds[astrName][i]
                }
            }
        }
        return this.createAudioElement(astrName)
    }

    createAudioElement(astrName: string): HTMLAudioElement {
        const aAudio: HTMLAudioElement = new Audio("sounds/" + astrName + "." + this.strExtension);
        this.kvSounds[astrName] = this.kvSounds[astrName] || []
        this.kvSounds[astrName].push(aAudio)
        return aAudio
    }

    cache(abcDone: () => void, avstrNames: string[]) {
        let anCounter: number = avstrNames.length
        avstrNames.forEach((astrName: string) => {
            const aAudio: HTMLAudioElement = new Audio("sounds/" + astrName + "." + this.strExtension)
            aAudio.addEventListener("canplaythrough", function () {
                if (0 >= (--anCounter)) {
                    if (abcDone) {
                        abcDone()
                    }
                }
            })
        })
    }
}

const ManagerAudio: ManagerAudioType = new ManagerAudioType();
export {ManagerAudio as default}