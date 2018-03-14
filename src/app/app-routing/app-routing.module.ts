import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from '../list/list.component';
import {NavigationComponent} from '../navigation/navigation.component';
import {MapComponent} from '../map/map.component';
import {SettingsComponent} from '../settings/settings.component';

const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'navigation/:id',
        component: NavigationComponent
    },
    {
        path: 'map',
        component: MapComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule {
}
