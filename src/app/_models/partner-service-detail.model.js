var PartnerServiceDetail = (function () {
    function PartnerServiceDetail(id, serviceId, partnerId, defaaultduration, price) {
        this._isEditing = false;
        this._id = id;
        this._serviceId = serviceId;
        this._partnerId = partnerId;
        this._defaultduration = defaaultduration;
        this._price = price;
    }
    Object.defineProperty(PartnerServiceDetail.prototype, "isEditing", {
        get: function () {
            return this._isEditing;
        },
        set: function (value) {
            this._isEditing = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PartnerServiceDetail.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PartnerServiceDetail.prototype, "service", {
        get: function () {
            return this._service;
        },
        set: function (value) {
            this._service = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PartnerServiceDetail.prototype, "serviceId", {
        get: function () {
            return this._serviceId;
        },
        set: function (value) {
            this._serviceId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PartnerServiceDetail.prototype, "partnerId", {
        get: function () {
            return this._partnerId;
        },
        set: function (value) {
            this._partnerId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PartnerServiceDetail.prototype, "defaultduration", {
        get: function () {
            return this._defaultduration;
        },
        set: function (value) {
            this._defaultduration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PartnerServiceDetail.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        },
        enumerable: true,
        configurable: true
    });
    PartnerServiceDetail.prototype.toJsonString = function () {
        var json = JSON.stringify(this);
        Object.keys(this).filter(function (key) { return key[0] === "_"; }).forEach(function (key) {
            json = json.replace(key, key.substring(1));
        });
        return json;
    };
    return PartnerServiceDetail;
}());
export { PartnerServiceDetail };
//# sourceMappingURL=partner-service-detail.model.js.map