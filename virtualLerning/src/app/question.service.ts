import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {baseUrl} from './../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Authorization':"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqZWVsYW4uZWVlLnJ5bWVjQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImV4cCI6MTY3MTA5NzkyNywiaWF0IjoxNjcxMDg4OTI3fQ.RgoD-QjYOhaDTCGFAuYnqK5tg-B4UIZxMge-6-YdbFG1sMH4ynf7XFiEq9SDHA8ITj2fi9Ygn9PYTt248-v-xA"
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
    return this.http.put(`${baseUrl}/admin/subscribe`,body);
  }
}
