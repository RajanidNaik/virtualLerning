import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminServiceService {
  constructor(private http: HttpClient) {}

  getDash() {
    return this.http.get(`${baseUrl}/superAdmin/admins`);
  }

  adminAccept(body: any) {
    console.log(body);
    return this.http.post(`${baseUrl}/superAdmin/approve`, body);
  }

  adminReject(body: any) {
    console.log(body);
    return this.http.delete(`${baseUrl}/superAdmin/reject`, {
      body,
      responseType: 'text',
    });
  }

  removed(limit: any): Observable<any> {
    return this.http.get(
      `${baseUrl}/superAdmin/rejected/admins?pageNumber=1&limit=${limit}`,
      { responseType: 'text' }
    );
  }
  admlist(limit:any): Observable<any> {
    return this.http.get(
      `${baseUrl}/superAdmin/approved/admins?pageNumber=1&limit=${limit}`,
      { responseType: 'text' }
    );
  }
}
