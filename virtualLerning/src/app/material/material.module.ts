import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatIconModule } from '@angular/material/icon';

const materialComponent=[]

@NgModule({
  exports: [MatInputModule, MatProgressBarModule, MatIconModule],
  imports: [MatInputModule, MatProgressBarModule, MatIconModule],
})
export class MaterialModule {}
