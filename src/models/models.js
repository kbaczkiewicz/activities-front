export class Credentials {
    constructor(email, password) {
        this._email = email;
        this._password = password;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }
}

export class Interval {
    constructor(id, name, status, dateStart, dateEnd) {
        this._id = id;
        this._name = name;
        this._status = status;
        this._dateStart = dateStart;
        this._dateEnd = dateEnd;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get status() {
        return this._status;
    }

    get dateStart() {
        return this._dateStart;
    }

    get dateEnd() {
        return this._dateEnd;
    }

    serialize() {
        return {
            id: this._id,
            name: this._name,
            status: this._status,
            dateStart: this._dateStart,
            dateEnd: this._dateEnd
        };
    }
}

export class Message {
    constructor(type, content) {
        this._type = type;
        this._content = content;
    }

    get type() {
        return this._type;
    }

    get content() {
        return this._content;
    }
}

export class ActivityType {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    serialize() {
        return {id: this._id, name: this._name};
    }
}

export class Activity {
    constructor(id, name, type, dateStart) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._dateStart = dateStart;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get dateStart() {
        return this._dateStart;
    }

    serialize() {
        return {id: this._id, name: this._name, typeId: this._type, dateStart: this._dateStart}
    }
}

export class IntervalStats {
    constructor(completedAmount, failedAmount, completedPercent) {
        this._completedAmount = completedAmount;
        this._failedAmount = failedAmount;
        this._completedPercent =completedPercent;
    }

    get completedAmount() {
        return this._completedAmount;
    }

    get failedAmount() {
        return this._failedAmount;
    }

    get completedPercent() {
        return this._completedPercent;
    }
}
