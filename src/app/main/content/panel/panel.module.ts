import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule, MatIconModule, MatTabsModule, MatFormFieldModule,
    MatRadioModule, MatSelectModule, MatInputModule, MatExpansionModule,
    MatSliderModule
} from '@angular/material';

import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { FontPickerConfigInterface } from 'ngx-font-picker';
import { ColorPickerModule } from 'ngx-color-picker';

const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
    // Change this to your Google API key
    apiKey: 'AIzaSyA9S7DY0khhn9JYcfyRWb1F6Rd2rwtF_mA'
};
import { FusePanelComponent } from './panel.component';

@NgModule({
    declarations: [
        FusePanelComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        FontPickerModule,
        MatSelectModule,
        ColorPickerModule,
        MatSliderModule,
        FusePipesModule
    ],
    providers: [
        {
            provide: FONT_PICKER_CONFIG,
            useValue: DEFAULT_FONT_PICKER_CONFIG
        }
    ],
    exports: [
        FusePanelComponent
    ],
})
export class FusePanelModule
{
}
