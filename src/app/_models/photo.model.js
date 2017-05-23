var Photo = (function () {
    function Photo(id, partner_id, image_path) {
        this._id = id;
        this._partner_id = partner_id;
        this._image_path = image_path;
    }
    Object.defineProperty(Photo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Photo.prototype, "partner_id", {
        get: function () {
            return this._partner_id;
        },
        set: function (value) {
            this._partner_id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Photo.prototype, "image_path", {
        get: function () {
            return this._image_path;
        },
        set: function (value) {
            this._image_path = value;
        },
        enumerable: true,
        configurable: true
    });
    return Photo;
}());
export { Photo };
//# sourceMappingURL=photo.model.js.map