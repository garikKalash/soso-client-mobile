var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgZone, Injectable } from "@angular/core";
import { Http, RequestOptions, ResponseContentType } from "@angular/http";
import { MapsAPILoader } from "angular2-google-maps/core";
/**
 * Created by Home on 4/20/2017.
 */
var GET_ADDRESS_OF_MARKER_URL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
var LocationService = (function () {
    function LocationService(mapsAPILoader, ngZone, http) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.http = http;
    }
    LocationService.prototype.initMapDetails = function () {
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        //set current position
        this.setCurrentPosition();
    };
    LocationService.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 15;
                _this.getAddressByCoordinates(_this.latitude, _this.longitude).subscribe(function (data) {
                    for (var _i = 0, _a = JSON.parse(data)["results"]; _i < _a.length; _i++) {
                        var node = _a[_i];
                        _this.selectedAddress = node.formatted_address;
                        break;
                    }
                });
            });
        }
    };
    LocationService.prototype.getAddressByCoordinates = function (lat, long) {
        var data;
        var options = new RequestOptions({ responseType: ResponseContentType.Json });
        return this.http.get(GET_ADDRESS_OF_MARKER_URL + lat + "," + long + "&sensor=true", options).map(function (response) { return response.text(); });
    };
    LocationService.prototype.getDistanceToPartner = function (partner) {
        var partnerslatLng = new google.maps.LatLng(partner.latitude, partner.longitude);
        var myLatLng = new google.maps.LatLng(this.latitude, this.longitude);
        return (google.maps.geometry.spherical.computeDistanceBetween(partnerslatLng, myLatLng) / 1000).toFixed(2);
    };
    return LocationService;
}());
LocationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MapsAPILoader,
        NgZone,
        Http])
], LocationService);
export { LocationService };
//# sourceMappingURL=location.service.js.map