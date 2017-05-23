var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, SecurityContext, Sanitizer } from "@angular/core";
import { ClientService } from "../../_services/client.service";
import { ConverterUtils } from "../../_commonServices/converter.service";
import { ActivatedRoute } from "@angular/router";
import { ClassifierService } from "../../_services/classifier.service";
import { PartnerService } from "../../_services/partner.service";
import { LocationService } from "../../_services/location.service";
import { ScheduleService } from "../../_services/schedule.service";
import { AuthenticationService } from "../../_services/authentication.service";
import { EventListenerService } from "../../_services/event-listener.service";
import { Feedback } from "../../_models/feedback.model";
var ClientAccountComponent = (function () {
    function ClientAccountComponent(partnerService, classierService, sanitizer, clientService, activatedRoute, locationService, scheduleService, authenticationService, eventListenerService) {
        this.partnerService = partnerService;
        this.classierService = classierService;
        this.sanitizer = sanitizer;
        this.clientService = clientService;
        this.activatedRoute = activatedRoute;
        this.locationService = locationService;
        this.scheduleService = scheduleService;
        this.authenticationService = authenticationService;
        this.eventListenerService = eventListenerService;
        this._client = {};
        this._services = [];
        this._servicesAsSelectItems = [];
        this._selectedService = {};
        this._filteredPartnersByService = [];
        this._selectedPartner = {};
        this._reservePartner = false;
        this._showPartnerImages = false;
        this._imagesForView = [];
        this._showPartnerFeedbacks = false;
        this._showLocation = true;
        this._partnerServicesAsSelectItems = [];
        this.header = { left: 'prev,next', center: 'title', right: 'agendaDay,agendaWeek,month' };
        this._newFeedback = {};
        this._searchTerm = '';
        this._selectedRadiusForSearch = 10;
        this._isWatchingPartnerServices = false;
        this._isWrongDurationNewRequest = false;
        this._isRatedFalseFrom = false;
        this.completedRequest = {};
        this._isLeavingFeedback = false;
        this._newFeedbackFromOrdersFalseRated = false;
        this._newFeedbackFromOrders = {};
    }
    ClientAccountComponent.prototype.ngOnInit = function () {
        this.authenticationService.checkSignedClient();
        this.intiClient();
        this.initServices();
        this.locationService.initMapDetails();
    };
    ClientAccountComponent.prototype.deleteEvent = function (request) {
        this.scheduleService.deleteReservation(request.id, this._client.id);
        this.scheduleService.initReservationsForClient(this._client.id, 2);
    };
    ClientAccountComponent.prototype.soso = function () {
        var _this = this;
        if (this.selectedService != null) {
            this.partnerService.getPartnersByServiceId(this.selectedService._id).subscribe(function (data) {
                _this._filteredPartnersByService = ConverterUtils.partnersFromJson(data);
            });
        }
        else {
            this._filteredPartnersByService = [];
        }
    };
    ClientAccountComponent.prototype.filterSosoResult = function () {
        var _this = this;
        if (this._searchTerm !== null && this._searchTerm.length != 0) {
            this.partnerService.getPartnersByServiceTermId(this.selectedService._id, this._searchTerm).subscribe(function (data) {
                _this._filteredPartnersByService = ConverterUtils.partnersFromJson(data);
            });
        }
        else {
            this.partnerService.getPartnersByServiceId(this.selectedService._id).subscribe(function (data) {
                _this._filteredPartnersByService = ConverterUtils.partnersFromJson(data);
            });
        }
    };
    ClientAccountComponent.prototype.setAndFilterService = function (service) {
        this.selectedService = service;
        this.soso();
    };
    ClientAccountComponent.prototype.showPartnerServices = function (partner) {
        this.selectedPartner = partner;
        this.prepareServiceNames(partner.serviceId);
    };
    ClientAccountComponent.prototype.prepareServiceNames = function (parentServiceId) {
        var _this = this;
        this.classierService.getSubServices(parentServiceId).subscribe(function (data) {
            var services = ConverterUtils.servicesFromJson(data);
            for (var _i = 0, services_1 = services; _i < services_1.length; _i++) {
                var service = services_1[_i];
                for (var _a = 0, _b = _this.selectedPartner.services; _a < _b.length; _a++) {
                    var serviceDetail = _b[_a];
                    if (service._id === serviceDetail.serviceId) {
                        serviceDetail.service = service;
                    }
                }
            }
            _this._isWatchingPartnerServices = true;
        });
    };
    ClientAccountComponent.prototype.onServicesDetailClose = function () {
        this._isWatchingPartnerServices = false;
    };
    Object.defineProperty(ClientAccountComponent.prototype, "acceptedRequests", {
        get: function () {
            return this.scheduleService.acceptedRequests;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientAccountComponent.prototype, "unAcceptedRequests", {
        get: function () {
            return this.scheduleService.unAcceptedRequests;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientAccountComponent.prototype, "completedRequests", {
        get: function () {
            return this.scheduleService.completedRequests;
        },
        enumerable: true,
        configurable: true
    });
    ClientAccountComponent.prototype.showLocationPicker = function () {
        this._showLocation = true;
    };
    ClientAccountComponent.prototype.closeLocationPicker = function () {
        this._showLocation = false;
    };
    ClientAccountComponent.prototype.mapLongitude = function () {
        return this.locationService.longitude;
    };
    ClientAccountComponent.prototype.mapLatitude = function () {
        return this.locationService.latitude;
    };
    ClientAccountComponent.prototype.mapZoom = function () {
        return this.locationService.zoom;
    };
    ClientAccountComponent.prototype.distanceToPartner = function (partner) {
        return +this.locationService.getDistanceToPartner(partner);
    };
    ClientAccountComponent.prototype.addressMarkerDragEnd = function (event) {
        var _this = this;
        this.locationService.longitude = event.coords.lng;
        this.locationService.latitude = event.coords.lat;
        this.locationService.getAddressByCoordinates(event.coords.lat, event.coords.lng)
            .subscribe(function (data) {
            for (var _i = 0, _a = JSON.parse(data)["results"]; _i < _a.length; _i++) {
                var node = _a[_i];
                _this.locationService.selectedAddress = node.formatted_address;
                break;
            }
        });
    };
    ClientAccountComponent.prototype.mySelectedLocation = function () {
        return this.locationService.selectedAddress;
    };
    ClientAccountComponent.prototype.setSelectedPartnier = function (partner) {
        this.selectedPartner = partner;
        this.scheduleService.initReservationsForPartner(this.selectedPartner.id, 1);
        this.initPartnerServicesAsSelectItems();
        this._reservePartner = true;
    };
    ClientAccountComponent.prototype.closeSelectedPartnierDetails = function () {
        this._reservePartner = false;
    };
    ClientAccountComponent.prototype.initPartnerServicesAsSelectItems = function () {
        var _this = this;
        this.classierService.getSubServices(this.selectedPartner.serviceId).subscribe(function (data) {
            var services = ConverterUtils.servicesFromJson(data);
            _this.selectedPartner.hasSubServices = _this.selectedPartner.services.length != 0;
            _this._partnerServicesAsSelectItems = [];
            _this._partnerServicesAsSelectItems.push({ label: '-- Select service --', value: null });
            _this.selectedPartner.services.forEach(function (partnerService) {
                for (var _i = 0, services_2 = services; _i < services_2.length; _i++) {
                    var service = services_2[_i];
                    if (partnerService.serviceId === service._id) {
                        _this._partnerServicesAsSelectItems.push({ label: service._serviceName_arm, value: partnerService });
                    }
                }
            });
        });
    };
    Object.defineProperty(ClientAccountComponent.prototype, "hasSubServices", {
        get: function () {
            return this.selectedPartner.services.length !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientAccountComponent.prototype, "hasAcceptedRequest", {
        get: function () {
            this._hasAcceptedRequest = this.eventListenerService.thereIsAcceptedEvent;
            return this.eventListenerService.thereIsAcceptedEvent;
        },
        set: function (value) {
            this._hasAcceptedRequest = value;
        },
        enumerable: true,
        configurable: true
    });
    ClientAccountComponent.prototype.acceptedEvents = function () {
        return this.eventListenerService.acceptedEvents;
    };
    Object.defineProperty(ClientAccountComponent.prototype, "hasDoneRequest", {
        get: function () {
            this._hasDoneRequest = this.eventListenerService.thereIsDoneEvent;
            return this.eventListenerService.thereIsDoneEvent;
        },
        set: function (value) {
            this._hasDoneRequest = value;
        },
        enumerable: true,
        configurable: true
    });
    ClientAccountComponent.prototype.doneEvents = function () {
        return this.eventListenerService.doneEvents;
    };
    ClientAccountComponent.prototype.closeDoneRequests = function () {
        this.eventListenerService.deleteDoneEventsFromClient();
        this.scheduleService.initReservationsForClient(this._client.id, 3);
    };
    ClientAccountComponent.prototype.closeAcceptedRequests = function () {
        this.eventListenerService.deleteAcceptedEventsFromPartner();
        this.scheduleService.initReservationsForClient(this._client.id, 1);
    };
    ClientAccountComponent.prototype.showSelectedPartnerDetails = function (partner) {
        this.selectedPartner = partner;
        for (var _i = 0, _a = partner.photoDtos; _i < _a.length; _i++) {
            var path = _a[_i];
            this._imagesForView.push({ source: this.safeImage(path.image_path), thumbnail: this.safeImage(path.image_path) });
        }
        this._showPartnerImages = true;
    };
    ClientAccountComponent.prototype.showSelectedPartnerFeedbacks = function (partner) {
        this.selectedPartner = partner;
        this._showPartnerFeedbacks = true;
    };
    ClientAccountComponent.prototype.closePartnerDetails = function () {
        this._showPartnerImages = false;
    };
    ClientAccountComponent.prototype.closePartnerFeedbacks = function () {
        this._showPartnerFeedbacks = false;
    };
    ClientAccountComponent.prototype.safeImage = function (imgBase64) {
        if (imgBase64 === undefined || imgBase64 === null) {
            return this.sanitizer.sanitize(SecurityContext.URL, "/src/loading-25x25.gif");
        }
        return this.sanitizer.sanitize(SecurityContext.URL, "" + imgBase64);
    };
    ClientAccountComponent.prototype.intiClient = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            var clientId = +params['clientId'];
            _this.clientService.getClientById(clientId).subscribe(function (data) {
                _this._client = ConverterUtils.clientFromJson(data);
                _this.scheduleService.initAllRequestsOfClient(_this._client.id);
                _this.eventListenerService.autoCheckAcceptedEvents(_this._client.id);
                _this.eventListenerService.autoCheckDoneEvents(_this._client.id);
                _this._selectedRadiusForSearch = 10;
                setInterval(function () {
                    _this.eventListenerService.autoCheckAcceptedEvents(_this._client.id);
                    _this.eventListenerService.autoCheckDoneEvents(_this._client.id);
                }, 10 * 1000);
            });
        });
    };
    ClientAccountComponent.prototype.initServices = function () {
        var _this = this;
        this.classierService.getGeneralServices().subscribe(function (data) {
            _this._services = ConverterUtils.servicesFromJson(data);
            _this._servicesAsSelectItems.push({ label: '-- Choose service --', value: null });
            _this.selectedService = _this._servicesAsSelectItems[0].value;
            for (var _i = 0, _a = _this._services; _i < _a.length; _i++) {
                var service = _a[_i];
                _this._servicesAsSelectItems.push({ label: service._serviceName_arm, value: service });
            }
        });
    };
    ClientAccountComponent.prototype.newRequest = function () {
        return this.scheduleService.newReserve;
    };
    ClientAccountComponent.prototype.selectedRequest = function () {
        return this.scheduleService.selectedEvent;
    };
    ClientAccountComponent.prototype.newReserveEvent = function () {
        var _this = this;
        this.scheduleService.newReserve.partnerId = this.selectedPartner.id;
        this.scheduleService.newReserve.clientId = this._client.id;
        this.scheduleService.newReserve.status = 2; // it is mean is new requested
        this.scheduleService.newReserve.startTime.setHours(this.scheduleService.newReserve.newRequestStartTime.getHours());
        this.scheduleService.newReserve.startTime.setMinutes(this.scheduleService.newReserve.newRequestStartTime.getMinutes());
        if (this.scheduleService.newReserve.service) {
            this.scheduleService.newReserve.serviceId = this.scheduleService.newReserve.service.serviceId;
        }
        var request = this.newRequest();
        this.scheduleService.addEvent(request).subscribe(function (data) {
            _this._isWrongDurationNewRequest = JSON.parse(data)["isWrongDuration"] === 'true';
            _this._crossedRequestDurationNewRequest = ConverterUtils.requestFromJsonString(data, "crossedRequestDuration");
            _this._crossedRequestStartNewRequest = ConverterUtils.requestFromJsonString(data, "crossedRequestStart");
            if (_this._crossedRequestDurationNewRequest === undefined && _this._crossedRequestStartNewRequest === undefined && !_this._isWrongDurationNewRequest) {
                _this.scheduleService.initReservationsForPartner(request.partnerId, 1);
                _this.scheduleService.creatingEventDetails = false;
                _this.scheduleService.newReserve.newRequestStartTime = null;
                _this.scheduleService.initReservationsForClient(request.clientId, 2);
            }
        });
    };
    ClientAccountComponent.prototype.cancelAddingCustomEvent = function () {
        this.scheduleService.creatingEventDetails = false;
    };
    ClientAccountComponent.prototype.closeEventDetails = function () {
        this.scheduleService.showEventDetails = false;
    };
    ClientAccountComponent.prototype.getSchedule = function () {
        return this.scheduleService.schedule;
    };
    ClientAccountComponent.prototype.showEventDetails = function () {
        return this.scheduleService.showEventDetails;
    };
    ClientAccountComponent.prototype.createEvent = function () {
        return this.scheduleService.creatingEventDetails;
    };
    ClientAccountComponent.prototype.onEventClickHandler = function (event) {
        this.scheduleService.handleEventClick(event);
    };
    ClientAccountComponent.prototype.onDayClickHandler = function (event) {
        var now = new Date();
        var eventDay = event.date._d;
        if (eventDay.getDate() >= now.getDate() && eventDay.getMonth() >= now.getMonth() && eventDay.getFullYear() >= now.getFullYear()) {
            this.scheduleService.handleDayClick(event);
        }
    };
    ClientAccountComponent.prototype.logout = function () {
        this.clientService.logout(this._client);
    };
    ClientAccountComponent.prototype.addFeedBack = function (event) {
        var _this = this;
        if (this._newFeedback.rate === undefined || this._newFeedback.rate === null || this._newFeedback.rate === 0) {
            this._isRatedFalseFrom = true;
        }
        else {
            this._newFeedback.clientId = event.clientId;
            this._newFeedback.partnerId = event.partnerId;
            this._newFeedback.requestId = event.requestId;
            var feedbackObj = new Feedback(null, this._newFeedback.rate, this._newFeedback.context, this._newFeedback.clientId, this._newFeedback.partnerId, this._newFeedback.requestId);
            var data = feedbackObj.toJsonString();
            this.partnerService.addFeedbackToPartnier(data).subscribe(function () {
                if (_this.eventListenerService.thereIsDoneEvent === true) {
                    _this.eventListenerService.thereIsDoneEvent = false;
                    _this.eventListenerService.deleteDoneEventsFromClient();
                    _this._newFeedback = {};
                    _this._isRatedFalseFrom = false;
                }
            });
        }
    };
    ClientAccountComponent.prototype.setCompletedRequest = function (request) {
        this.completedRequest = request;
        this._isLeavingFeedback = true;
    };
    ClientAccountComponent.prototype.addFeedbackFromOrders = function (request) {
        var _this = this;
        if (this._newFeedbackFromOrders.rate === undefined || this._newFeedbackFromOrders.rate === null || this._newFeedbackFromOrders.rate === 1) {
            this._newFeedbackFromOrdersFalseRated = true;
        }
        else {
            this._newFeedbackFromOrders.clientId = request.clientId;
            this._newFeedbackFromOrders.partnerId = request.partnerId;
            this._newFeedbackFromOrders.requestId = request.id;
            var feedbackObj = new Feedback(null, this._newFeedbackFromOrders.rate, this._newFeedbackFromOrders.context, this._newFeedbackFromOrders.clientId, this._newFeedbackFromOrders.partnerId, this._newFeedbackFromOrders.requestId);
            var data = feedbackObj.toJsonString();
            this.partnerService.addFeedbackToPartnier(data).subscribe(function () {
                _this._isLeavingFeedback = false;
                _this._newFeedbackFromOrders = {};
                _this.scheduleService.initReservationsForClient(_this._client.id, 3);
                _this._newFeedbackFromOrdersFalseRated = false;
            });
        }
    };
    Object.defineProperty(ClientAccountComponent.prototype, "services", {
        get: function () {
            return this._services;
        },
        set: function (value) {
            this._services = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientAccountComponent.prototype, "selectedPartner", {
        get: function () {
            return this._selectedPartner;
        },
        set: function (value) {
            this._selectedPartner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientAccountComponent.prototype, "selectedService", {
        get: function () {
            return this._selectedService;
        },
        set: function (value) {
            this._selectedService = value;
        },
        enumerable: true,
        configurable: true
    });
    return ClientAccountComponent;
}());
ClientAccountComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './client-account.component.html',
        selector: 'client-account',
        styleUrls: ['client-account.component.css']
    }),
    __metadata("design:paramtypes", [PartnerService,
        ClassifierService,
        Sanitizer,
        ClientService,
        ActivatedRoute,
        LocationService,
        ScheduleService,
        AuthenticationService,
        EventListenerService])
], ClientAccountComponent);
export { ClientAccountComponent };
//# sourceMappingURL=client-account.component.js.map