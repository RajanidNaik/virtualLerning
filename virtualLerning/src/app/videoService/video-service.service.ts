import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  constructor(private http: HttpClient) {}

  getChategory() {
    return this.http.get(`${baseUrl}/admin/categories`, {
      responseType: 'text',
    });
  }
  getSubCat() {
    return this.http.get(`${baseUrl}/admin/subCategories`, {
      responseType: 'text',
    });
  }
  save(body:any){
    console.log(body );
    
    return this.http.post(`${baseUrl}/admin/overView`,body, {
      responseType: 'text',
    });
  }
}
