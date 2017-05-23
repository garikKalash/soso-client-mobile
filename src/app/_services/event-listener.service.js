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
import { ConverterUtils } from "../_commonServices/converter.service";
import { PartnerService } from "./partner.service";
var EventListenerService = (function () {
    function EventListenerService(httpWrap, partnerService) {
        this.httpWrap = httpWrap;
        this.partnerService = partnerService;
        this._acceptedEvents = [];
        this._thereIsAcceptedEvent = false;
        this._doneEvents = [];
        this._thereIsDoneEvent = false;
    }
    EventListenerService.prototype.autoCheckAcceptedEvents = function (clientId) {
        var _this = this;
        if (!this._thereIsAcceptedEvent) {
            this.httpWrap.get('http://10.0.2.2:3000/eventsListener/acceptedeventsbyclient/' + clientId).map(function (response) { return response.text(); }).subscribe(function (data) {
                _this._acceptedEvents = ConverterUtils.eventsFromJson(data);
                _this._thereIsAcceptedEvent = _this._acceptedEvents.length != 0;
            });
        }
    };
    EventListenerService.prototype.autoCheckDoneEvents = function (clientId) {
        var _this = this;
        if (!this._thereIsDoneEvent) {
            this.httpWrap.get('http://10.0.2.2:3000/eventsListener/completedeventsbyclient/' + clientId).map(function (response) { return response.text(); }).subscribe(function (data) {
                _this._doneEvents = ConverterUtils.eventsFromJson(data);
                _this._thereIsDoneEvent = _this._doneEvents.length != 0;
                if (_this._doneEvents.length === 1) {
                    _this.partnerService.getPartnerMainDetailsById(_this._doneEvents[0].partnerId).subscribe(function (data) {
                        var partner = ConverterUtils.partnerFromJson(data);
                        _this._doneEvents[0].partner = partner;
                    });
                }
            });
        }
    };
    EventListenerService.prototype.deleteAcceptedEventsFromPartner = function () {
        var _this = this;
        for (var _i = 0, _a = this._acceptedEvents; _i < _a.length; _i++) {
            var event_1 = _a[_i];
            this.httpWrap.delete('http://10.0.2.2:3000/eventsListener/deleteacceptedeventbyclient/' + event_1.id).map(function (response) { return response.text(); }).subscribe(function (data) {
                _this._thereIsAcceptedEvent = false;
            });
        }
    };
    EventListenerService.prototype.deleteDoneEventsFromClient = function () {
        var _this = this;
        for (var _i = 0, _a = this._doneEvents; _i < _a.length; _i++) {
            var event_2 = _a[_i];
            this.httpWrap.delete('http://10.0.2.2:3000/eventsListener/deletedoneeventbypartner/' + event_2.id).map(function (response) { return response.text(); }).subscribe(function (data) {
                _this._thereIsDoneEvent = false;
            });
        }
    };
    Object.defineProperty(EventListenerService.prototype, "thereIsAcceptedEvent", {
        get: function () {
            return this._thereIsAcceptedEvent;
        },
        set: function (value) {
            this._thereIsAcceptedEvent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventListenerService.prototype, "doneEvents", {
        get: function () {
            return this._doneEvents;
        },
        set: function (value) {
            this._doneEvents = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventListenerService.prototype, "acceptedEvents", {
        get: function () {
            return this._acceptedEvents;
        },
        set: function (value) {
            this._acceptedEvents = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventListenerService.prototype, "thereIsDoneEvent", {
        get: function () {
            return this._thereIsDoneEvent;
        },
        set: function (value) {
            this._thereIsDoneEvent = value;
        },
        enumerable: true,
        configurable: true
    });
    return EventListenerService;
}());
EventListenerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpWrap, PartnerService])
], EventListenerService);
export { EventListenerService };
//# sourceMappingURL=event-listener.service.js.map