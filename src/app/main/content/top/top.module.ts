import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseTopComponent } from './top.component';

const routes = [
    {
        path: 'top',
        component: FuseTopComponent
    }
];

@NgModule({
    declarations: [
        FuseTopComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        FuseTopComponent
    ]
})

export class FuseTopModule
{
}
