import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChargeServiceService {

  // apiosoite = 'https://api.openchargemap.io/v2/poi/';
  apiosoite = 'assets/pisteet.json';
  tulokset: any;

  constructor(private http: HttpClient) { }

  getFromApi(lat, lon) {
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
      Distance: any;
    }

    return this.http.get<Myinterface>(this.apiosoite + '?output=json&latitude=' + lat +
        '&longitude=' + lon + '&maxresults=4');
  }

}
