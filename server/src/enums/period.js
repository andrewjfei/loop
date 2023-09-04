const NONE = "NONE";
const ONE_DAY = "1_DAY";
const ONE_WEEK = "1_WEEK";
const ONE_MONTH = "1_MONTH";

function toKey(period) {
    switch (period) {
        case "1_DAY":
            return "ONE_DAY";
        case "1_WEEK":
            return "ONE_WEEK";
        case "1_MONTH":
            return "ONE_MONTH";
        default:
            return period;
    }
}

export { NONE, ONE_DAY, ONE_MONTH, ONE_WEEK, toKey };
