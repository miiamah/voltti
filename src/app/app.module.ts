import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {TabbarComponent} from './tabbar/tabbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule
} from '@angular/material';
import {ListComponent} from './list/list.component';
import {HeaderComponent} from './header/header.component';
import {NavigationComponent} from './navigation/navigation.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { MapComponent } from './map/map.component';
import { SettingsComponent } from './settings/settings.component';
import { ChargeLocationsComponent } from './charge-locations/charge-locations.component';
import {HttpClientModule} from '@angular/common/http';
import {ChargeServiceService} from './charge-service.service';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent,
        TabbarComponent,
        ListComponent,
        HeaderComponent,
        NavigationComponent,
        MapComponent,
        SettingsComponent,
        ChargeLocationsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatExpansionModule,
        MatChipsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [ChargeServiceService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
