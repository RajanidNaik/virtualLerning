import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../dialogService/dialog.service';
@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.css'],
})
export class DialogCategoryComponent implements OnInit {
  category: any;
  selectedFile: any;
  constructor(private dServ:DialogService) {}
  image: any;
  categoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),

  });

  ngOnInit(): void {
    this.category = localStorage.getItem('category');
    this.category = JSON.parse(this.category);
  }
  add(a: any) {

    console.log(this.categoryForm.value.categoryName);
    console.log(this.selectedFile);
    
    if(this.selectedFile){
    const body = new FormData();
    body.append('categoryName',a);
    body.append('categoryPhoto', this.selectedFile, this.selectedFile[0]?.name);
    
      this.dServ.addCategory(body).subscribe(data=>console.log(data));
    }
    else{
      alert('Please select file');
    }
  }
  supportUpload(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
}
