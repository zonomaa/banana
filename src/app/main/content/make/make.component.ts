import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TemplatesService } from 'app/../providers/templates-service/templates-service';
import { BannerCanvasService } from 'app/../providers/banner-canvas-service/banner-canvas-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fabric } from 'fabric';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { FontPickerService } from 'ngx-font-picker';


import * as firebase from 'firebase/app';

@Component({
    selector   : 'fuse-make',
    templateUrl: './make.component.html',
    styleUrls  : ['./make.component.scss']
})
export class FuseMakeComponent implements OnInit, OnDestroy
{
    @ViewChild('banner') _banner;
    @ViewChild('uploader') _uploader;
    @ViewChild('tmpNameField') tmp_field;
    spinnerButtonOptions: any = {
        active: false,
        text: 'バナーを保存',
        spinnerSize: 18,
        raised: true,
        buttonColor: 'primary',
        spinnerColor: 'accent'
    };
    canvas = null;
    templateData = [];
    txtObjects = [];
    image = null;
    tmpName = '';
    private sub: any;
    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public tamplatesSrvc: TemplatesService,
        public bannerSrvc: BannerCanvasService,
        public fontService: FontPickerService
    )
    {}

    ngOnInit() {
        this.canvas = this.bannerSrvc.createCanvas(this.banner);
        this.canvas.wrapperEl.style['display'] = 'none';
        this.canvas.clear(); // canvasを初期化
        this.txtObjects = this.canvas.getObjects();
    }

    changeTxt(event) {
        this.canvas.renderAll();
    }

    ngOnDestroy() {
        console.log('ngOnDestroy');
    }

    fileChange(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.uploader.style['display'] = 'none';
            this.canvas.wrapperEl.style['display'] = 'block';
            const self = this;
            const file: File = this.image = fileList[0];
            const fr = new FileReader();
            fr.onload = function () {
                const imgObj = new Image();
                imgObj.src = fr.result;
                imgObj.onload = function () {
                    const image = new fabric.Image(imgObj);
                    self.canvas.setWidth(imgObj.width);
                    self.canvas.setHeight(imgObj.height);
                    self.canvas.setBackgroundImage(image, self.canvas.renderAll.bind(self.canvas));
                    self.canvas.renderAll();
                };
            };
            fr.readAsDataURL(file);
        }
    }

    addTxt() {
        this.bannerSrvc.addTxt();
    }

    onSettingsChange(value) {
        console.log(this.txtObjects);
        this.canvas.renderAll();
    }

    save() {
        if (this.tmpName && this.image) {
            this.spinnerButtonOptions.active = true;
            this.spinnerButtonOptions.text = 'save Data...';
            this.tamplatesSrvc.saveTemplate(this.tmpName, this.image, this.canvas.getObjects()).then(key => {
                this.spinnerButtonOptions.active = false;
                this.spinnerButtonOptions.text = 'complere!';
                this.router.navigateByUrl(`/edit/${key}`);
            });
        }
    }

    get banner() {
        return this._banner.nativeElement;
    }

    get uploader() {
        return this._uploader.nativeElement;
    }

}
