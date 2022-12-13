import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http:HttpClient) { }
  getQuestionJson(){
    return this.http.get<any>("assets/questions.json");
  }
}
