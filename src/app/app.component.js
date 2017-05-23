var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, SecurityContext, Sanitizer } from '@angular/core';
import { TranslateService } from "./translate/translate.service";
var AppComponent = (function () {
    function AppComponent(_translate, sanitizer) {
        this._translate = _translate;
        this.sanitizer = sanitizer;
    }
    AppComponent.prototype.ngOnInit = function () {
        // standing datad
        this.supportedLanguages = [
            { display: 'Հայերեն', value: 'am', flagpath: "http://flagpedia.net/data/flags/mini/am.png" },
            { display: 'English', value: 'en', flagpath: "http://flagpedia.net/data/flags/mini/gb.png" },
        ];
        this.selectLang('am');
    };
    AppComponent.prototype.isCurrentLang = function (lang) {
        return lang === this._translate.currentLang;
    };
    AppComponent.prototype.selectLang = function (lang) {
        // set default;
        this._translate.use(lang);
    };
    AppComponent.prototype.safeImage = function (imgBase64) {
        if (imgBase64 === undefined || imgBase64 === null) {
            return this.sanitizer.sanitize(SecurityContext.URL, "/src/loading-25x25.gif");
        }
        return this.sanitizer.sanitize(SecurityContext.URL, "" + imgBase64);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [TranslateService, Sanitizer])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map