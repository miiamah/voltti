import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hero} from '../hero';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  tulos = 'Moro';
  apiosoite = 'https://api.openchargemap.io/v2/poi/';
  tulokset: any;
  hakutulokset: any;
  map: any;
  marker: any;
  myInfowindow: any;

  constructor(private http: HttpClient) {
  }

  model = new Hero('');
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  getSearch(lat, lon) {
    interface Myinterface {
      results: string;
      geometry: string;
      location: string;
      lat: number;
      lng: number;
    }

    this.http.get<Myinterface>('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' +
        this.model.name + '&key=AIzaSyD_h2as_-bd7nXyO1mxezHZNORA8GHfkEc').
        subscribe(data => {
              console.log(data);
              this.hakutulokset = data;
              this.getLatlong();
            },
        );
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
        '&longitude=' + lon + '&maxresults=10').subscribe(data => {
      console.log(data);
      this.tulokset = data;
      const latLng = {lat: lat, lng: lon};
      this.teeKartta(latLng);
    });
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.getAddressInfo(position.coords.latitude, position.coords.longitude);
    });

  }

  getLatlong() {
    const geocoder = new google.maps.Geocoder();
    const address = this.model.name;
    geocoder.geocode({'address': address}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const searchLat = results[0].geometry.location.lat();
        console.log(searchLat);
        const searchLon = results[0].geometry.location.lng();
        console.log(searchLon);
        const latLng = {lat: searchLat, lng: searchLon};
        this.teeKartta(latLng);
        this.http.get(this.apiosoite + '?output=json&latitude=' + searchLat +
            '&longitude=' + searchLon + '&maxresults=10').subscribe(data => {
          this.tulokset = data;
          const mySearchInfowindow = new google.maps.InfoWindow({
            content: '',
          });
          this.tulokset.forEach(tulos => {
            this.marker = new google.maps.Marker({
              position: new google.maps.LatLng({
                lat: tulos.AddressInfo.Latitude,
                lng: tulos.AddressInfo.Longitude,
              }),
              map: this.map,
            });
            this.marker.infowindow = mySearchInfowindow;
            google.maps.event.addListener(this.marker, 'click', function() {
              mySearchInfowindow.setContent(
                  '<h3>' + tulos.AddressInfo.Title + '</h3>' +
                  '<p>' + 'Hinta: ' + tulos.UsageCost + '</p>' +
                  '<p>' + 'Paikkoja: ' + tulos.NumberOfPoints + '</p> ');
              mySearchInfowindow.open(this.map, this);
            });
          });
        });
      }
    });
  }

  teeKartta(latauspiste) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: latauspiste,
    });
    const myInfowindow = new google.maps.InfoWindow({
      content: '',
    });
    this.tulokset.forEach( tulos => {
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng({
          lat: tulos.AddressInfo.Latitude,
          lng: tulos.AddressInfo.Longitude,
        }),
        map: this.map,
      });
      this.marker.infowindow = myInfowindow;
      google.maps.event.addListener(this.marker, 'click', function() {
        myInfowindow.setContent(
            '<h3>' + tulos.AddressInfo.Title + '</h3>' +
            '<p>' + 'Hinta: ' + tulos.UsageCost + '</p>' +
            '<p>' + 'Paikkoja: ' + tulos.NumberOfPoints + '</p> ');
        myInfowindow.open(this.map, this);
      });
    });
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  newHero() {
    this.model = new Hero('');
  }

}
