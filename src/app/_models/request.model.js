var Request = (function () {
    function Request(id, clientId, partnerId, startTime, description, status, responseText, duration, serviceId, isRated) {
        this._id = id;
        this._clientId = clientId;
        this._partnerId = partnerId;
        this._startTime = startTime;
        this._description = description;
        this._status = status;
        this._responseText = responseText;
        this._duration = duration;
        this._serviceId = serviceId;
        this._israted = isRated;
    }
    Object.defineProperty(Request.prototype, "israted", {
        get: function () {
            return this._israted;
        },
        set: function (value) {
            this._israted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "endTime", {
        get: function () {
            return this._endTime;
        },
        set: function (value) {
            this._endTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "partner", {
        get: function () {
            return this._partner;
        },
        set: function (value) {
            this._partner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "newRequestStartTime", {
        get: function () {
            return this._newRequestStartTime;
        },
        set: function (value) {
            this._newRequestStartTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "service", {
        get: function () {
            return this._service;
        },
        set: function (value) {
            this._service = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "serviceId", {
        get: function () {
            return this._serviceId;
        },
        set: function (value) {
            this._serviceId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (value) {
            this._duration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "clientId", {
        get: function () {
            return this._clientId;
        },
        set: function (value) {
            this._clientId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "partnerId", {
        get: function () {
            return this._partnerId;
        },
        set: function (value) {
            this._partnerId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        set: function (value) {
            this._startTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (value) {
            this._description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "responseText", {
        get: function () {
            return this._responseText;
        },
        set: function (value) {
            this._responseText = value;
        },
        enumerable: true,
        configurable: true
    });
    Request.prototype.toJsonString = function () {
        var json = JSON.stringify(this);
        Object.keys(this).filter(function (key) { return key[0] === "_"; }).forEach(function (key) {
            json = json.replace(key, key.substring(1));
        });
        return json;
    };
    return Request;
}());
export { Request };
//# sourceMappingURL=request.model.js.map