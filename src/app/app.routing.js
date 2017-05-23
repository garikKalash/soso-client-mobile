/**
 * Created by Garegin.Kalashyan on 12/28/2016.
 */
import { RouterModule } from '@angular/router';
import { WelcomePageComponent } from "./components/welcome-page-component/wlcPage.component";
import { ClientAccountComponent } from "./components/client-account-component/client-account.component";
var appRoutes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: WelcomePageComponent,
    },
    {
        path: "clientaccount",
        component: ClientAccountComponent
    },
    /* {
     path: "connectPartnerToSystem",
     component: ConnectToSystemComponent
     },
     {
     path: 'login',
     component: LoginComponent
     },*/
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
export var routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map