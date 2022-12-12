import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'virtualLerning';
  category: Array<string> = [
    'Design',
    'Development',
    'Business',
    'Music',
    'Finance',
    'Health',
    'IT',
    'Marketting',
    'LifeStyle',
    'Photogrphy',
  ];
  ngOnInit(): void {
    if(localStorage.getItem('category')){
      console.log(this.category);
      
    }
    else{
    localStorage.setItem('category',JSON.stringify(this.category));
    }
  }
}
