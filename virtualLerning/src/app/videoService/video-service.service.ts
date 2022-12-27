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
  getSubCat(id:any) {
    console.log(id);
    return this.http.get(`${baseUrl}/admin/subCategories?categoryId=${id}`, {
      responseType: 'text',
    });
  }
  overview(body:any){
    console.log(body );
    return this.http.post(`${baseUrl}/admin/overView`,body, {
      responseType: 'text',
    });
  }
  addChapters(body:any){
    console.log(body);
    return this.http.post(`${baseUrl}/admin/chapter`, body, {
      responseType: 'text'
    });
  } 
}
