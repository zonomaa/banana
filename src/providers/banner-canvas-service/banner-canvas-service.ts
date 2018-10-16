import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { fabric } from 'fabric';

@Injectable()

export class BannerCanvasService {
    canvas = null;
    constructor() {
        console.log('constructor');
    }

    createCanvas(canvas) {
        this.canvas = new fabric.Canvas(canvas);
        this.canvas.wrapperEl.style['margin'] = '0 auto';
        return this.canvas;
    }

    render(data) {
        this.bkImageRender(data);
    }

    textRender(texts = []) {
        for (let index = 0; index < texts.length; index++) {
            const element = texts[index];
            const text = new fabric.Text(element.text, element);
            // text.set('selectable', false);
            this.canvas.add(text);
        }
    }

    addTxt() {
        const text = new fabric.Text('ここにテキスト', {
            fill: '#000',
            fontWeight: 'normal',
            fontStyle: 'normal',
            shadow: {
                color: '#000',
                blur: 0,
                offsetX: 0,
                offsetY: 0
            },
            textAlign: 'left',
            stroke: '#000',
            strokeWidth: 0,
            charSpacing: 0,
            lineHeight: 1
        });
        this.canvas.add(text);
    }

    bkImageRender(data) {
        const self = this;
        fabric.Image.fromURL(data.image, function (oImg) {
            self.canvas.setWidth(oImg.width);
            self.canvas.setHeight(oImg.height);
            self.canvas.setBackgroundImage(oImg, self.canvas.renderAll.bind(self.canvas), { crossOrigin: 'Anonymous' });
            self.canvas.selection = false;

            self.textRender(data.texts);
        }, { crossOrigin: 'Anonymous' });
    }

    save(name = null) {
        const banner: any = document.getElementById('banner');
        const blob = this.toBlob(banner.toDataURL('image/png'));
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.target = '_blank';
        a.download = name || 'banner.png';
        a.click();
    }

    toBlob(base64) {
        const bin = atob(base64.replace(/^.*,/, ''));
        const buffer = new Uint8Array(bin.length);
        let blob = null;
        for (let i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }
        // Blobを作成
        try {
            blob = new Blob([buffer.buffer], {
                type: 'image/png'
            });
        } catch (e) {
            return false;
        }
        return blob;
    }
}
