function isPresent(object) {
    return object !== undefined && object !== null;
}

function isUndefined(object) {
    return object === undefined;
}

export { isPresent, isUndefined };
