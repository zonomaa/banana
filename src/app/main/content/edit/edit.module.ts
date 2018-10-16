import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FusePanelModule } from '../panel/panel.module';
import { TranslateModule } from '@ngx-translate/core';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatPaginatorModule,
    MatInputModule, MatMenuModule, MatRippleModule, MatSidenavModule, MatTableModule, MatToolbarModule, MatTabsModule, MatSelectModule, MatOptionModule,
    MatExpansionModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

import { FuseEditComponent } from './edit.component';

const routes = [
    {
        path: 'edit',
        redirectTo: '/top',
        pathMatch: 'full'
    },
    {
        path     : 'edit/:id',
        component: FuseEditComponent
    }
];

@NgModule({
    declarations: [
        FuseEditComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,
        MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatPaginatorModule,
        MatInputModule, MatMenuModule, MatRippleModule, MatSidenavModule, MatTableModule, MatToolbarModule, MatTabsModule,
        MatSelectModule, MatOptionModule,
        FuseSharedModule, MatExpansionModule,
        FusePanelModule
    ],
    exports     : [
        FuseEditComponent
    ]
})

export class FuseEditModule
{
}
