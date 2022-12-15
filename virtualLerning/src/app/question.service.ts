import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {baseUrl} from './../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Authorization':`eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqZWVsYW4uZWVlLnJ5bWVjQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImV4cCI6MTY3MTAxMjI0MSwiaWF0IjoxNjcxMDAzMjQxfQ.zE0RR8Ugo4OkFqNSrv_VoB8wXRYj9XksjiQjHmxxal6Iwu2b1kzX5mXCQe5xv961hLKQQzYoaiJuvpC7FHvdPg`
  })
}
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http:HttpClient) { }
  getQuestionJson(){
    return this.http.get<any>("assets/questions.json");
  }
  getStudentList(limit:any):Observable<any>{
    return this.http.get(`${baseUrl}/admin/studentList?pageNumber=1&limit=${limit}`);
  }
  getTotal():Observable<any>{
    return this.http.get(`${baseUrl}/admin/dashBoard/header`);
  }
  toDelete(body:any){
       return this.http.delete(`${baseUrl}/admin/deleteStudent`,body)
  }
  toSubscribe(body:any):Observable<any>{
    return this.http.put(`${baseUrl}/admin/subscribe`,body,{ observe: 'response' });
  }
}
