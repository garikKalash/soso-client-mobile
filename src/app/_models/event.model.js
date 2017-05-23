var Event = (function () {
    function Event(id, partnerId, clientId, requestId, isSeen, seenTime) {
        this._id = id;
        this._partnerId = partnerId;
        this._clientId = clientId;
        this._requestId = requestId;
        this._isSeen = isSeen;
        this._seenTime = seenTime;
    }
    Object.defineProperty(Event.prototype, "partner", {
        get: function () {
            return this._partner;
        },
        set: function (value) {
            this._partner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "client", {
        get: function () {
            return this._client;
        },
        set: function (value) {
            this._client = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "partnerId", {
        get: function () {
            return this._partnerId;
        },
        set: function (value) {
            this._partnerId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "clientId", {
        get: function () {
            return this._clientId;
        },
        set: function (value) {
            this._clientId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "requestId", {
        get: function () {
            return this._requestId;
        },
        set: function (value) {
            this._requestId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "isSeen", {
        get: function () {
            return this._isSeen;
        },
        set: function (value) {
            this._isSeen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "seenTime", {
        get: function () {
            return this._seenTime;
        },
        set: function (value) {
            this._seenTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Event.prototype.toJsonString = function () {
        var json = JSON.stringify(this);
        Object.keys(this).filter(function (key) { return key[0] === "_"; }).forEach(function (key) {
            json = json.replace(key, key.substring(1));
        });
        return json;
    };
    return Event;
}());
export { Event };
//# sourceMappingURL=event.model.js.map