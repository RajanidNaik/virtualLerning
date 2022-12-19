import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {baseUrl} from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  formData: any;
  nkm: any;

  constructor(public http:HttpClient) { }
  // getQuestionJson(){
  //   return this.http.get<any>("assets/questions.json");
  // }
  getStudentList(limit:any):Observable<any>{
    return this.http.get(`${baseUrl}/admin/studentList?pageNumber=1&limit=${limit}`);
  }
  getTotal():Observable<any>{
    return this.http.get(`${baseUrl}/admin/dashBoard/header`);
  }
  toDelete(body:any){
    // console.log(body);  let formData = new FormData();
  //   formData.set('file',body);
  //  console.log(formData);
    
    return this.http.delete(`${baseUrl}/admin/deleteStudent`,{body,responseType:'text'});
     
  }
  toSubscribe(body:any):Observable<any>{
    return this.http.put(`${baseUrl}/admin/subscribe`,body);
  }
  getProfile():Observable<any>{
    return this.http.get(`${baseUrl}/admin/getProfile`);
  }
  updateProfile(body:any){
    console.log(body);

    var body2 = new FormData();
    body2.append('profilePhoto',body.profilePhoto);
    body2.append('fullName',body.fullName);
    body2.append('mobileNumber',body.mobileNumber);

    for (const value of Object.entries(body2)) {
      console.log(value[0],value[1]);
    }
    // debugger;
    
    return this.http.post(`${baseUrl}/admin/save`,body2,{responseType:'text'});
  }


  getCourse(limit:any):Observable<any>{
    return this.http.get(`${baseUrl}/admin/coursesAdded?pageNumber=1&limit=${limit}`);
  }

  changePassword(body:any):Observable<any>{
    return this.http.put(`${baseUrl}/admin/changePassword`,body,{responseType:'text'})
  }
  getAddCourseDetails(id:any):Observable<any>{
    return this.http.get(`${baseUrl}/admin/courseDetails?courseId=${id}`);
  }
  addQuestion(body:any):Observable<any>{
    return this.http.post(`${baseUrl}/admin/addTest`,body,{responseType:'text'})
  }
  getQuestion(id:any):Observable<any>{
    return this.http.get(`${baseUrl}/admin/QuestionAndAns?chapterId=${id}`);
  }
}
