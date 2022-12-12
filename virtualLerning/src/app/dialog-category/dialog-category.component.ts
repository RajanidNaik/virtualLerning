import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.css'],
})
export class DialogCategoryComponent implements OnInit {
  category: any;
  constructor() {}

  ngOnInit(): void {
    this.category = localStorage.getItem('category');
    this.category = JSON.parse(this.category);
  }
  add(a:any){
      this.category.push(a);
      console.log(this.category);
      
      localStorage.setItem('category', JSON.stringify(this.category));
      window.location.reload();
  }
  close(){
    
  }
}
