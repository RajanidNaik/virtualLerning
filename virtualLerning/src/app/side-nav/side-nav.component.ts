import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
active:boolean=false;
  constructor() { }

  ngOnInit(): void {
    this. onCheck();
  }
  onCheck(){
    if(sessionStorage.getItem('active')){
      this.active= true;
    }else{
      this.active =false;
    }
  }
 

}
