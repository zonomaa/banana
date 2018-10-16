import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { TranslateModule } from '@ngx-translate/core';
import { FusePanelModule } from '../panel/panel.module';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatPaginatorModule,
    MatInputModule, MatMenuModule, MatRippleModule, MatSidenavModule, MatTableModule, MatToolbarModule, MatTabsModule, MatSelectModule, MatOptionModule,
    MatSliderModule, MatProgressSpinnerModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatProgressButtons } from 'mat-progress-buttons';

import { FuseMakeComponent } from './make.component';
import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { FontPickerConfigInterface } from 'ngx-font-picker';

const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
    // Change this to your Google API key
    apiKey: 'AIzaSyA9S7DY0khhn9JYcfyRWb1F6Rd2rwtF_mA'
};

const routes = [
    {
        path     : 'make',
        component: FuseMakeComponent
    }
];

@NgModule({
    declarations: [
        FuseMakeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FormsModule,
        TranslateModule,
        MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatPaginatorModule,
        MatInputModule, MatMenuModule, MatRippleModule, MatSidenavModule, MatTableModule, MatToolbarModule, MatTabsModule,
        MatSelectModule, MatOptionModule, MatSliderModule,
        FuseSharedModule,
        ColorPickerModule,
        FontPickerModule,
        MatProgressSpinnerModule,
        MatProgressButtons,
        FusePanelModule
    ],
    providers: [
        {
            provide: FONT_PICKER_CONFIG,
            useValue: DEFAULT_FONT_PICKER_CONFIG
        }
    ],
    exports     : [
        FuseMakeComponent
    ]
})

export class FuseMakeModule
{
}
