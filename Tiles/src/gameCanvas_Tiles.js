/// <reference path="./mytypes.d.ts"/>
import PlayerType from "./gameCanvas_Player.js";
export { TilesType as default };
class TilesType {
    constructor(akvOptionsIn) {
        const akvDefaults = {};
        this.kvOptions = Object.assign(Object.assign({}, akvDefaults), akvOptionsIn);
        if (!this.kvOptions.context) {
            throw "Missing context";
        }
        this.vvTiles = [];
        const aMapTiles = this.kvOptions.vvMapTiles;
        if (aMapTiles) {
            const { vAnimations: avAnimations, nTileWidth: anTileWIdth, nTileHeight: anTileHeight } = this.kvOptions;
            let anRow, anCol, anRows, anCols, avLine, aTile, anTileIndex;
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
                        });
                        aTile.setAnimation(avAnimations[anTileIndex - 1]);
                        this.vvTiles[anRow] = this.vvTiles[anRow] || [];
                        this.vvTiles[anRow][anCol] = aTile;
                    }
                }
            }
        }
    }
    draw(adOffsetX) {
        this.vvTiles.forEach(avLine => avLine.forEach(aTile => aTile.draw(adOffsetX)));
    }
}
