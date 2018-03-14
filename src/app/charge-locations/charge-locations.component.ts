import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

declare let google: any;

@Component({
    selector: 'app-charge-locations',
    templateUrl: './charge-locations.component.html',
    styleUrls: ['./charge-locations.component.scss']
})
export class ChargeLocationsComponent implements OnInit {

    tulos = 'Moro';
    apiosoite = 'https://api.openchargemap.io/v2/poi/';
    tulokset: any;

    constructor(private http: HttpClient) {
    }

    getAddressInfo(lat, lon) {
        interface Myinterface {
            ID: number;
            AddressInfo: string;
            Connections: string;
            Title: string;
            AddressLine1: string;
            AddressLine2: string;
            Town: string;
            Latitude: number;
            Longitude: number;
            ContinentCode: string;
            Country: string;
            ISOCode: string;
            UsageCost: string;
            Distance: number;
            ConnectionTypeID: number;
        }

        this.http.get<Myinterface>(this.apiosoite + '?output=json&latitude=' + lat +
            '&longitude=' + lon).subscribe(data => {
            console.log(data);
            this.tulokset = data;
            this.teeKartta();
        });
    }

    ngOnInit() {
        navigator.geolocation.getCurrentPosition(position => {
            this.getAddressInfo(position.coords.latitude, position.coords.longitude);
        });
    }

    teeKartta() {
        const latauspiste = {lat: 60.2182258928907, lng: 24.8115987740967};
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: latauspiste,
        });
        let marker;

        const contentString = '<button type="button"> Button </button>' ;
        const myInfowindow = new google.maps.InfoWindow({
            content: '',
        });
        this.tulokset.forEach( tulos => {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng({
                    lat: tulos.AddressInfo.Latitude,
                    lng: tulos.AddressInfo.Longitude,
                }),
                map: map,
            });
            marker.infowindow = myInfowindow;
            google.maps.event.addListener(marker, 'click', function() {
                myInfowindow.setContent(tulos.AddressInfo.Title + ' ' + contentString);
                myInfowindow.open(map, this);
            });
        });
    }

}
