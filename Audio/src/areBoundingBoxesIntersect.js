/// <reference path="./mytypes.d.ts"/>
import isSegmentIntersect from "./isSegmentIntersect.js";
function areBoundingBoxesIntersect(akvBoundingBoxA, akvBoundingBoxB) {
    if (!isSegmentIntersect(akvBoundingBoxA.xLeft, akvBoundingBoxA.xRight, akvBoundingBoxB.xLeft, akvBoundingBoxB.xRight)) {
        return false;
    }
    if (!isSegmentIntersect(akvBoundingBoxA.yTop, akvBoundingBoxA.yBottom, akvBoundingBoxB.yTop, akvBoundingBoxB.yBottom)) {
        return false;
    }
    return true;
}
export { areBoundingBoxesIntersect as default };
