import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private http: HttpClient) {}

  addCategory(body: any) {
    console.log(body);
    return this.http.post(`${baseUrl}/admin/category`, body);
  }
  addSubCategory(body: any) {
    console.log(body);
    return this.http.post(`${baseUrl}/admin/subCategory`, body);
  }
}
