import { Component } from '@angular/core';
import { TemplatesService } from 'app/../providers/templates-service/templates-service';

@Component({
    selector   : 'fuse-top',
    templateUrl: './top.component.html',
    styleUrls  : ['./top.component.scss']
})
export class FuseTopComponent
{
    constructor(
        public tamplatesSrvc: TemplatesService
    )
    {
    }
}
