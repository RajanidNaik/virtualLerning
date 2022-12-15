import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  url =
    'http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/';
  constructor(private http: HttpClient) {}

  getChategory() {
    return this.http.get(this.url + 'categories', { responseType: 'text' });
  }
  getSubCat() {
    return this.http.get(this.url + 'subCategories', { responseType: 'text' });
  }
}
