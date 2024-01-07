function isSegmentIntersect(a0: number, a1: number, b0: number, b1: number): boolean {
    if ((a0 < b0) && (b0 < a1)) {
        return true
    }
    if ((a0 < b1) && (b1 < a1)) {
        return true
    }
    if ((b0 < a0) && (a0 < b1)) {
        return true
    }
    if ((b0 < a1) && (a1 < b1)) {
        return true
    }
    if ((a0 === b0) && (a1 === b1)) {
        return true
    }

    return false
}

export {isSegmentIntersect as default}