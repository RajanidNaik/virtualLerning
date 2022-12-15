import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  url =
    'http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/';
  constructor(private http: HttpClient) {}
  getChapter(){
    return this.http.get(this.url + 'chapterList?courseId=23',{responseType:'text'});
  }
}
