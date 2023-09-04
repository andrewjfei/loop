class Timestamp {
    year;
    month;
    day;
    hour;
    minute;
    second;

    constructor(date, time) {
        const dateArray = date.split("-");

        this.year = parseInt(dateArray[0]);
        this.month = parseInt(dateArray[1]);
        this.day = parseInt(dateArray[2]);

        const timeArray = time.split(":");

        this.hour = parseInt(timeArray[0]);
        this.minute = parseInt(timeArray[1]);
        this.second = parseInt(timeArray[2]);
    }

    add(time) {
        // todo: update logic to be more robust and correct
        const timeArray = time.split(":");

        const hour = parseInt(timeArray[0]);
        const minute = parseInt(timeArray[1]);
        const second = parseInt(timeArray[2]);

        this.second += second;
        this.minute += minute;
        this.hour += hour;

        const additionalMinutes = Math.floor(this.second / 60);
        this.second %= 60;
        this.minute += additionalMinutes;

        const additionalHours = Math.floor(this.minute / 60);
        this.minute %= 60;
        this.hour += additionalHours;

        const additionalDays = Math.floor(this.hour / 24);
        this.hour %= 24;
        this.day += additionalDays;

        // todo: update this to consider months with 28, 29, 30, and 31 days
        const additionalMonths = Math.floor(this.day / 30);
        this.day %= 30;
        this.month += additionalMonths;

        const additionalYears = Math.floor(this.month / 12);
        this.month %= 12;
        this.year += additionalYears;

        return this;
    }

    toString() {
        return `${this.year}-${formatNumber(this.month)}-${
            formatNumber(this.day)
        } ${formatNumber(this.hour)}:${formatNumber(this.minute)}:${
            formatNumber(this.second)
        }`;
    }
}

function formatNumber(number) {
    if (number < 10) {
        return "0" + number;
    }

    return number.toString();
}

export { Timestamp };
