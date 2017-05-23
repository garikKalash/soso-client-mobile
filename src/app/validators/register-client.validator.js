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
import { HttpWrap } from "../_commonServices/httpWrap.service";
var ClientValidator = (function () {
    function ClientValidator(httpWrap) {
        this.httpWrap = httpWrap;
    }
    ClientValidator.prototype.validateNewClient = function (client) {
        var infoProvider = {};
        if (client.name === null || client.name === undefined || client.name.length === 0) {
            infoProvider.namemessage = "Name is required.";
        }
        else if (client.name.length === 3) {
            infoProvider.namemessage = "Length of name should be more than 3.";
        }
        if (client.telephone === null || client.telephone === undefined || client.telephone.length === 0) {
            infoProvider.telephonemessage = "Telephone is required.";
        }
        else if (client.name.length === 3) {
            infoProvider.telephonemessage = "Length of telephone should be more than 3.";
        }
    };
    return ClientValidator;
}());
ClientValidator = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpWrap])
], ClientValidator);
export { ClientValidator };
//# sourceMappingURL=register-client.validator.js.map