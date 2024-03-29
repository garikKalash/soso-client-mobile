var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ClientService } from "./_services/client.service";
import { ClientAccountComponent } from "./components/client-account-component/client-account.component";
import { routing } from "./app.routing";
import { WelcomePageComponent } from "./components/welcome-page-component/wlcPage.component";
import { HttpWrap } from "./_commonServices/httpWrap.service";
import { TabViewModule } from "primeng/components/tabview/tabview";
import { ClassifierService } from "./_services/classifier.service";
import { PartnerService } from "./_services/partner.service";
import { RatingModule } from "ngx-rating";
import { LocationService } from "./_services/location.service";
import { ScheduleService } from "./_services/schedule.service";
import { DropdownModule, ButtonModule, DataListModule, DialogModule, ScheduleModule, CalendarModule, CarouselModule } from "primeng/primeng";
import { AccordionModule } from "primeng/components/accordion/accordion";
import { ConnectToSystemComponent } from "./components/register-client-component/connectToSystem.component";
import { LoginComponent } from "./components/login-component/login.component";
import { AuthenticationService } from "./_services/authentication.service";
import { ClientValidator } from "./validators/register-client.validator";
import { TranslateService, TranslatePipe, TRANSLATION_PROVIDERS } from "./translate";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AgmCoreModule } from "angular2-google-maps/core";
import { EventListenerService } from "./_services/event-listener.service";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { LightboxModule } from "primeng/components/lightbox/lightbox";
import { InputMaskModule } from "primeng/components/inputmask/inputmask";
import { OverlayPanelModule } from "primeng/components/overlaypanel/overlaypanel";
import { DataGridModule } from "primeng/components/datagrid/datagrid";
import { StepsModule } from 'primeng/primeng';
import { IonicModule } from 'ionic-angular';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            ClientAccountComponent,
            WelcomePageComponent,
            ConnectToSystemComponent,
            LoginComponent,
            TranslatePipe,
        ],
        imports: [
            AgmCoreModule.forRoot({
                apiKey: 'AIzaSyDnnk3Y-c4OKlVPCXT5RZ3ehMELT-BMyK8',
                libraries: ["geometry"]
            }),
            IonicModule.forRoot(AppComponent),
            ReactiveFormsModule,
            BrowserModule,
            FormsModule,
            HttpModule,
            BrowserAnimationsModule,
            routing,
            TabViewModule,
            ButtonModule,
            DropdownModule,
            DataListModule,
            DataTableModule,
            DataGridModule,
            RatingModule,
            DialogModule,
            CarouselModule,
            ScheduleModule,
            CalendarModule,
            AccordionModule,
            InputMaskModule,
            OverlayPanelModule,
            LightboxModule,
            StepsModule
        ],
        providers: [
            HttpWrap,
            ClientService,
            ClassifierService,
            PartnerService,
            TranslateService,
            LocationService,
            ScheduleService,
            AuthenticationService,
            ClientValidator,
            EventListenerService,
            TRANSLATION_PROVIDERS
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map