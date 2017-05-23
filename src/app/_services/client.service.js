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
import 'rxjs/Rx';
import { ConverterUtils } from "../_commonServices/converter.service";
import { AuthenticationService } from "./authentication.service";
var ClientService = (function () {
    function ClientService(httpWrap, authenticationService) {
        this.httpWrap = httpWrap;
        this.authenticationService = authenticationService;
        this._myAcceptedRequests = [];
        this._myUnacceptedRequests = [];
        this._doneRequests = [];
    }
    ClientService.prototype.getClientById = function (clientId) {
        return this.httpWrap.get("http://10.0.2.2:8080/client/clientaccount?clientId=" + clientId)
            .map(function (response) { return response.text(); });
    };
    ClientService.prototype.getClientMainDetailsById = function (clientId) {
        return this.httpWrap.get("http://10.0.2.2:8080/client/clientmaindetails/" + clientId)
            .map(function (response) { return response.text(); });
    };
    ClientService.prototype.initMyAcceptedRequest = function (clientId) {
        var _this = this;
        this.getReservationsForClient(clientId, 1).subscribe(function (data) {
            _this._myAcceptedRequests = ConverterUtils.reservationsFromJson(data);
        });
    };
    ClientService.prototype.initUnacceptedRequests = function (clientId) {
        var _this = this;
        this.getReservationsForClient(clientId, 2).subscribe(function (data) {
            _this._myUnacceptedRequests = ConverterUtils.reservationsFromJson(data);
        });
    };
    ClientService.prototype.initDoneRequests = function (clientId) {
        var _this = this;
        this.getReservationsForClient(clientId, 2).subscribe(function (data) {
            _this._myUnacceptedRequests = ConverterUtils.reservationsFromJson(data);
        });
    };
    ClientService.prototype.getReservationsForClient = function (clientId, status) {
        return this.httpWrap.get('http://10.0.2.2:8081/partner/reservationsforclient/' + clientId + '/' + status)
            .map(function (response) { return response.text(); });
    };
    ClientService.prototype.signin = function (client) {
        return this.authenticationService.signin(client);
    };
    ClientService.prototype.register = function (client) {
        return this.authenticationService.signup(client);
    };
    ClientService.prototype.logout = function (client) {
        this.authenticationService.logout(client);
    };
    ClientService.prototype.getAndPutToken = function (client) {
        this.authenticationService.getAndPutToken(client);
    };
    Object.defineProperty(ClientService.prototype, "myAcceptedRequests", {
        get: function () {
            return this._myAcceptedRequests;
        },
        set: function (value) {
            this._myAcceptedRequests = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientService.prototype, "myUnacceptedRequests", {
        get: function () {
            return this._myUnacceptedRequests;
        },
        set: function (value) {
            this._myUnacceptedRequests = value;
        },
        enumerable: true,
        configurable: true
    });
    return ClientService;
}());
ClientService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpWrap, AuthenticationService])
], ClientService);
export { ClientService };
//# sourceMappingURL=client.service.js.map