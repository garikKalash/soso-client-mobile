/**
 * Created by Home on 3/4/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { ConverterUtils } from "./converter.service";
var BaseService = (function () {
    function BaseService(serviceId) {
        this._serviceId = serviceId;
    }
    BaseService.prototype.ngOnInit = function () {
        this._serviceUrl = ConverterUtils.getServiceUrlFromJsonString(this.getDetailsServerUrl(this._serviceId));
    };
    BaseService.prototype.getDetailsServerUrl = function () {
        var queryParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queryParams[_i] = arguments[_i];
        }
        var basePath = "http://10.0.2.2:9011/serviceDetails";
        var url = basePath;
        for (var _a = 0, queryParams_1 = queryParams; _a < queryParams_1.length; _a++) {
            var queryParam = queryParams_1[_a];
            url += "/" + queryParam;
        }
        return url;
    };
    return BaseService;
}());
BaseService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Number])
], BaseService);
export { BaseService };
//# sourceMappingURL=base-service.service.js.map