import { Directive ,EventEmitter,HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragNdrop]'
})
export class DragNdropDirective {

  @Output() fileDropped = new EventEmitter();
  constructor() { }
  @HostListener('drop',['$event']) ondrop(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    console.log("hi2");
    const files =evt.dataTransfer.files;
    if( files.length > 0 ){
      this.fileDropped.emit(files); 
  }
}
  @HostListener('dragover',['$event']) onDragOver(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    console.log("hi");
  }
 @HostListener('dragleave',['$event']) onDragLeave(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    console.log("hello");
    
}
}


