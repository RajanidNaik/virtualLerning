import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
const materialComponent=[MatSlideToggleModule,MatInputModule,MatProgressBarModule,MatIconModule,MatDialogModule]

@NgModule({
  exports: [materialComponent],
  imports: [materialComponent],
})

export class MaterialModule {}
