import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

interface NgxSpinnerConfig{
  type?: string;
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    NgxGalleryModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    FileUploadModule,
    BsDatepickerModule.forRoot()
  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
