function isSegmentIntersect(a0, a1, b0, b1) {
    if ((a0 < b0) && (b0 < a1)) {
        return true;
    }
    if ((a0 < b1) && (b1 < a1)) {
        return true;
    }
    if ((b0 < a0) && (a0 < b1)) {
        return true;
    }
    if ((b0 < a1) && (a1 < b1)) {
        return true;
    }
    if ((a0 === b0) && (a1 === b1)) {
        return true;
    }
    return false;
}
export { isSegmentIntersect as default };
