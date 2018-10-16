import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplatesService } from 'app/../providers/templates-service/templates-service';
import { BannerCanvasService } from 'app/../providers/banner-canvas-service/banner-canvas-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as fabric from 'fabric';
import * as firebase from 'firebase/app';

@Component({
    selector   : 'fuse-edit',
    templateUrl: './edit.component.html',
    styleUrls  : ['./edit.component.scss']
})
export class FuseEditComponent implements OnInit, OnDestroy
{
    @ViewChild('banner') _banner;
    canvas = null;
    templateData = [];
    txtObjects = [];
    private sub: any;
    constructor(
        public route: ActivatedRoute,
        public tamplatesSrvc: TemplatesService,
        public bannerSrvc: BannerCanvasService
    )
    {}

    ngOnInit() {
        this.canvas = this.bannerSrvc.createCanvas(this.banner);
        this.tamplatesSrvc.templateSub.filter(x => x.length > 0).subscribe(_ => this.initialize());
    }
    
    initialize() {
        this.sub = this.route.params.subscribe(params => {
            this.templateData = this.tamplatesSrvc.getTemplateData(params['id'])[0] || [];
            this.canvas.clear(); // canvasを初期化
            // バナーの描画
            this.bannerSrvc.render(this.templateData);
            this.txtObjects = this.canvas.getObjects();
        });
    }

    changeTxt(event) {
        this.canvas.renderAll();
    }

    ngOnDestroy() {
        console.log('ngOnDestroy');
        this.sub.unsubscribe();
    }

    onSettingsChange(value) {
        console.log('onSettingsChange');
        this.canvas.renderAll();
    }

    save() {
        this.bannerSrvc.save(this.templateData['name']);
    }

    get banner() {
        return this._banner.nativeElement;
    }

}
