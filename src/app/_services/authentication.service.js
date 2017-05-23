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
import { Router } from "@angular/router";
import { ConverterUtils } from "../_commonServices/converter.service";
/**
 * Created by Home on 3/4/2017.
 */
var AuthenticationService = (function () {
    function AuthenticationService(httpWrap, router) {
        this.httpWrap = httpWrap;
        this.router = router;
    }
    AuthenticationService.prototype.checkSignedClient = function () {
        var client = JSON.parse(localStorage.getItem("soso_registered_client_details"));
        if (client) {
            var token = localStorage.getItem("soso_client_token");
            HttpWrap.getHeaders().set('token', token);
            HttpWrap.getHeaders().set('clientId', new String(client.id).toString());
            this.router.navigate(["/clientaccount"], { queryParams: { clientId: +client.id } });
        }
        else {
            this.router.navigate(["/home"]);
        }
    };
    /* signin(client:Client):void{
       this.signinReq(client).subscribe(
         data =>{
           client.id = +ConverterUtils.clientIdFromJson(data);
           let token =  ConverterUtils.getTokenFromJsonString(data);
           this.getAndPutToken(client);
   
         });
     }
   */
    AuthenticationService.prototype.signin = function (client) {
        return this.signinReq(client);
    };
    AuthenticationService.prototype.signup = function (client) {
        return this.registerReq(client);
    };
    AuthenticationService.prototype.logout = function (client) {
        var _this = this;
        this.logoutReq(client).subscribe(function () {
            _this.deleteToken(client);
        });
    };
    AuthenticationService.prototype.signinReq = function (client) {
        var data = JSON.stringify(client);
        return this.httpWrap.post('http://10.0.2.2:8080/client/signinclient/', data)
            .map(function (response) { return response.text(); });
    };
    AuthenticationService.prototype.registerReq = function (client) {
        var data = JSON.stringify(client);
        return this.httpWrap.post('http://10.0.2.2:8080/client/addclient/', data)
            .map(function (response) { return response.text(); });
    };
    AuthenticationService.prototype.logoutReq = function (client) {
        var data = JSON.stringify(client);
        return this.httpWrap.delete('http://10.0.2.2:8002/authenticateService/deleteToken/1/' + client.id + '/' + HttpWrap.getHeaders().get('token'))
            .map(function (response) { return response.text(); });
    };
    AuthenticationService.prototype.getAndPutToken = function (client) {
        var _this = this;
        this.httpWrap.get("http://10.0.2.2:8002/authenticateService/getToken/1/" + client.id + "/" + client.telephone).map(function (response) { return response.text(); }).subscribe(function (data) {
            var token = JSON.parse(data)["createdToken"]["key"];
            HttpWrap.getHeaders().set('token', token);
            localStorage.setItem("soso_client_token", token);
            HttpWrap.getHeaders().set('clientId', ConverterUtils.clientIdFromJson(data));
            localStorage.setItem("soso_registered_client_details", JSON.stringify(client));
            _this.router.navigate(["/clientaccount"], { queryParams: { clientId: +client.id } });
        });
    };
    AuthenticationService.prototype.deleteToken = function (client) {
        var _this = this;
        this.httpWrap.delete("http://10.0.2.2:8002/authenticateService/deleteToken/1/" + client.id + "/" + HttpWrap.getHeaders().get('token')).map(function (response) { return response.text(); }).subscribe(function (data) {
            HttpWrap.getHeaders().set('token', '');
            HttpWrap.getHeaders().set('clientId', '');
            localStorage.removeItem("soso_client_token");
            localStorage.removeItem("soso_registered_client_details");
            _this.router.navigate(["/home"]);
        });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpWrap,
        Router])
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map