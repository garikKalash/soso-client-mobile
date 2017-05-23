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
import { Request } from "../_models/request.model";
import { HttpWrap } from "../_commonServices/httpWrap.service";
import { ConverterUtils } from "../_commonServices/converter.service";
import { PartnerService } from "./partner.service";
var ScheduleService = (function () {
    function ScheduleService(httpWrap, partnerService) {
        this.httpWrap = httpWrap;
        this.partnerService = partnerService;
        this._newReserve = {};
        this._schedule = [];
        this._requestsOfPartner = [];
        this._selectedEvent = {};
        this._showEventDetails = false;
        this._creatingEventDetails = false;
        this._acceptedRequests = [];
        this._unAcceptedRequests = [];
        this._completedRequests = [];
    }
    Object.defineProperty(ScheduleService.prototype, "requestsOfPartner", {
        get: function () {
            return this._requestsOfPartner;
        },
        set: function (value) {
            this._requestsOfPartner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleService.prototype, "acceptedRequests", {
        get: function () {
            return this._acceptedRequests;
        },
        set: function (value) {
            this._acceptedRequests = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleService.prototype, "unAcceptedRequests", {
        get: function () {
            return this._unAcceptedRequests;
        },
        set: function (value) {
            this._unAcceptedRequests = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleService.prototype, "completedRequests", {
        get: function () {
            return this._completedRequests;
        },
        set: function (value) {
            this._completedRequests = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleService.prototype, "newReserve", {
        get: function () {
            return this._newReserve;
        },
        set: function (value) {
            this._newReserve = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleService.prototype, "schedule", {
        get: function () {
            return this._schedule;
        },
        set: function (value) {
            this._schedule = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleService.prototype, "selectedEvent", {
        get: function () {
            return this._selectedEvent;
        },
        set: function (value) {
            this._selectedEvent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleService.prototype, "showEventDetails", {
        get: function () {
            return this._showEventDetails;
        },
        set: function (value) {
            this._showEventDetails = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleService.prototype, "creatingEventDetails", {
        get: function () {
            return this._creatingEventDetails;
        },
        set: function (value) {
            this._creatingEventDetails = value;
        },
        enumerable: true,
        configurable: true
    });
    ScheduleService.prototype.initAllRequestsOfClient = function (clientId) {
        this.initReservationsForClient(clientId, 2);
        this.initReservationsForClient(clientId, 1);
        this.initReservationsForClient(clientId, 3);
    };
    ScheduleService.prototype.addEvent = function (request) {
        return this.saveReservation(request);
    };
    ScheduleService.prototype.handleEventClick = function (e) {
        this.selectedEvent = {};
        this.selectedEvent.description = e.calEvent.title;
        var start = e.calEvent.start;
        var end = e.calEvent.end;
        this.selectedEvent.id = e.calEvent.id;
        this.selectedEvent.startTime = start.format();
        this.showEventDetails = true;
    };
    ScheduleService.prototype.handleDayClick = function (event) {
        this.newReserve = {};
        this.newReserve.newRequestStartTime = new Date();
        this.newReserve.startTime = event.date._d;
        this.newReserve.startTime.setHours(this.newReserve.newRequestStartTime.getHours());
        this.newReserve.startTime.setMinutes(this.newReserve.newRequestStartTime.getMinutes());
        this.creatingEventDetails = true;
    };
    ScheduleService.prototype.findEventIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.schedule.length; i++) {
            if (id == this.schedule[i].id) {
                index = i;
                break;
            }
        }
        return index;
    };
    ScheduleService.prototype.initReservationsForClient = function (clientId, status) {
        var _this = this;
        this.getReservationsForClient(clientId, status).subscribe(function (data) {
            var requests = [];
            if (status === 1) {
                _this.acceptedRequests = ConverterUtils.reservationsFromJson(data);
                requests = _this.acceptedRequests;
            }
            else if (status === 2) {
                _this.unAcceptedRequests = ConverterUtils.reservationsFromJson(data);
                requests = _this.unAcceptedRequests;
            }
            else if (status === 3) {
                _this.completedRequests = ConverterUtils.reservationsFromJson(data);
                requests = _this.completedRequests;
            }
            var _loop_1 = function (request) {
                _this.partnerService.getPartnerMainDetailsById(request.partnerId).subscribe(function (data) {
                    request.partner = ConverterUtils.partnerFromJson(data);
                });
            };
            for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
                var request = requests_1[_i];
                _loop_1(request);
            }
        });
    };
    ScheduleService.prototype.initReservationsForPartner = function (partnerId, status) {
        var _this = this;
        this.getReservationsForPartner(partnerId, status).subscribe(function (data) {
            _this._requestsOfPartner = ConverterUtils.reservationsFromJson(data);
            _this.schedule = [];
            for (var _i = 0, _a = _this._requestsOfPartner; _i < _a.length; _i++) {
                var request = _a[_i];
                var endOfRequest = request.startTime.getMinutes() + +request.duration;
                request.endTime = new Date(request.startTime);
                request.endTime.setMinutes(endOfRequest);
                _this.schedule.push({
                    "id": request.id,
                    "clientId": request.clientId,
                    "title": request.description,
                    "start": request.startTime,
                    "end": request.endTime,
                    "status": request.status,
                    "responseText": request.responseText,
                    "duration": request.duration,
                    "isRated": request.israted
                });
            }
        });
    };
    ScheduleService.prototype.getReservationsForPartner = function (partnerId, status) {
        return this.httpWrap.get('http://10.0.2.2:8081/partner/reservationsforpartner/' + partnerId + '/' + status)
            .map(function (response) { return response.text(); });
    };
    ScheduleService.prototype.getReservationsForClient = function (clientId, status) {
        return this.httpWrap.get('http://10.0.2.2:8081/partner/reservationsforclient/' + clientId + '/' + status)
            .map(function (response) { return response.text(); });
    };
    ScheduleService.prototype.saveReservation = function (request) {
        var requesNew = new Request(request.id, request.clientId, request.partnerId, request.startTime, request.description, request.status, request.responseText, request.duration, request.serviceId, request.israted);
        var data = requesNew.toJsonString();
        return this.httpWrap.post('http://10.0.2.2:8081/partner/addReserve', data)
            .map(function (response) { return response.text(); });
    };
    ScheduleService.prototype.deleteReservation = function (requestId, clientid) {
        var _this = this;
        this.httpWrap.delete('http://10.0.2.2:8081/partner/deletereserve/' + requestId)
            .map(function (response) { return response.text(); }).subscribe(function (data) {
            var index = _this.findEventIndexById(requestId);
            if (index >= 0) {
                _this.schedule.splice(index, 1);
            }
            _this.showEventDetails = false;
            _this.initReservationsForClient(clientid, 2);
        });
    };
    ScheduleService.prototype.initMyAccpetedRequests = function () {
    };
    return ScheduleService;
}());
ScheduleService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpWrap, PartnerService])
], ScheduleService);
export { ScheduleService };
//# sourceMappingURL=schedule.service.js.map