import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient, private globals: Globals) {}

  getAllCountiries() {
    return this.http.get<any[]>(
      this.globals.BASE_ASPNET_ENDPOINT + '/Countries/GetCountry'
    );
  }
  
  getAllCountiryDetail(name:string, isModal = false) {
    const headers = new HttpHeaders()
      .set('X-Modal-Request', isModal ? 'true' : 'false');
      return this.http.get<any>(
        `${this.globals.BASE_ASPNET_ENDPOINT}/Countries/GetCountryDetails/${encodeURIComponent(name)}`
      );
    
  }

  
}
