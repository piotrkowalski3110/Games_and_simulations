/// <reference path="./mytypes.d.ts"/>

import PlayerType from "./gameCanvas_Player.js";
import type AnimationType from "./gameCanvas_Animation.js";

export {TilesType as default}

type MyTilesOptions = {
    nTileWidth: number,
    nTileHeight: number,
    vvMapTiles: number[][],
    vAnimations: AnimationType[],
    context: CanvasRenderingContext2D
}

class TilesType {

    kvOptions: MyTilesOptions;
    vvTiles: PlayerType[][];

    constructor(akvOptionsIn: MyTilesOptions) {
        const akvDefaults = {};
        this.kvOptions = {...akvDefaults, ...akvOptionsIn}

        if (!this.kvOptions.context) {
            throw "Missing context"
        }

        this.vvTiles = [];
        const aMapTiles = this.kvOptions.vvMapTiles;

        if (aMapTiles) {
            const {vAnimations: avAnimations, nTileWidth: anTileWIdth, nTileHeight: anTileHeight} = this.kvOptions;
            let anRow: number, anCol: number, anRows: number, anCols: number, avLine: number[], aTile: PlayerType,
                anTileIndex: number;

            for (anRow = 0, anRows = aMapTiles.length; anRow < anRows; ++anRow) {
                avLine = aMapTiles[anRow];
                for (anCol = 0, anCols = avLine.length; anCol < anCols; ++anCol) {
                    anTileIndex = avLine[anCol];
                    if (0 < anTileIndex) {
                        aTile = new PlayerType({
                            x: anCol * anTileWIdth,
                            y: anRow * anTileHeight,
                            nWidth: anTileWIdth,
                            nHeight: anTileHeight
                        })

                        aTile.setAnimation(avAnimations[anTileIndex - 1])

                        this.vvTiles[anRow] = this.vvTiles[anRow] || []
                        this.vvTiles[anRow][anCol] = aTile
                    }
                }
            }
        }
    }

    draw(adOffsetX: number) {
        this.vvTiles.forEach(avLine => avLine.forEach(aTile => aTile.draw(adOffsetX)))
    }
}