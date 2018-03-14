import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChargeServiceService} from '../charge-service.service';

declare let google: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  piste: any;
  omalatitude: any;
  omalongitude: any;

  constructor(
      private chargeService: ChargeServiceService,
      private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Hakee pisteen tiedot list.component:ista
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.chargeService.tulokset.forEach(tulos => {
        if (tulos.ID.toString() === params.id) {
          console.log('jee');
          this.piste = tulos;
        }
      });
      console.log(this.piste);
    });
    //this.getLocation();
    this.teeKartta();
  }

  getLocation() {
    // Hakee käyttäjän lokaation selaimesta
    navigator.geolocation.getCurrentPosition(position => {
      // Saatuaan lokaation, laittaa koordinaatit muuttujiin
      this.omalatitude = position.coords.latitude;
      this.omalongitude = position.coords.longitude;
      // Lopuksi tekee kartan
      this.teeKartta();
    });
  }

  teeKartta() {
    // Tekee kartan, jonka keskipiste on Chicago
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    const chicago = new google.maps.LatLng(60.221034, 24.805587);
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: chicago,
    });
    directionsDisplay.setMap(map);
    // Piirtää reitin käyttäjän sijainnista latauspisteelle
    this.calculateAndDisplayRoute(directionsService, directionsDisplay);
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    // Piirtää reitin kartalle
    directionsService.route({
      // originiin muuten this.omalatitude ja this.omalongitude, mutta demon nopeuttamiseksi koodiin asetettu nyt Metropolian koordinaatit
      origin: {lat: 60.221034, lng: 24.805587},
      destination: {
        lat: this.piste.AddressInfo.Latitude,
        lng: this.piste.AddressInfo.Longitude,
      },
      travelMode: 'DRIVING',
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
