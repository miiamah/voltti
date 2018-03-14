import {Component, OnInit} from '@angular/core';
import {MatAccordionDisplayMode} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {ChargeServiceService} from '../charge-service.service';

declare let google: any;

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


    panelOpenState: boolean;
    hideToggle: boolean;
    displayMode: MatAccordionDisplayMode;
    selectable: boolean;
    collapsedHeight: string;

    tulos = 'Moro';
    // apiosoite = 'https://api.openchargemap.io/v2/poi/';

    constructor(public chargeService: ChargeServiceService) {
    }

    getFromApi(lat, lon) {
        this.chargeService.getFromApi(lat, lon).subscribe(data => {
            console.log(data);
            this.chargeService.tulokset = data;
        });
    }

    ngOnInit() {
        navigator.geolocation.getCurrentPosition(position => {
            this.getFromApi(position.coords.latitude, position.coords.longitude);
            console.log(position.coords.latitude, position.coords.longitude);
        });
    }

}
