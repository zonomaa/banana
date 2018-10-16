import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { BannerCanvasService } from 'app/../providers/banner-canvas-service/banner-canvas-service';
import { fuseAnimations } from '@fuse/animations';
import { MatColors } from '@fuse/mat-colors';
import { FontPickerService } from 'ngx-font-picker';

@Component({
    selector     : 'fuse-panel',
    templateUrl  : './panel.component.html',
    styleUrls    : ['./panel.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class FusePanelComponent implements OnChanges
{
    _txtObjects = [];
    _addBtn: Boolean = true;
    presetFonts = ['mgenplus-1c-thin', 'ume-pgc5'];
    aligns = ['left', 'center', 'right'];
    @Output() onValueChange = new EventEmitter();
    
    @Input()
    set txtObjects(object: any[]) {
        console.log(object);
        this._txtObjects = object;
    }

    @Input()
    set addBtn(flag: Boolean) {
        this._addBtn = flag;
    }

    constructor(
        public bannerSrvc: BannerCanvasService,
        public fontService: FontPickerService
    )
    {
        console.log('constructor', this.txtObjects);
    }

    onChange(event, index, type = null, value = null) {
        if (type !== null) {
            if (type === 'lineHeight' || type === 'charSpacing') { // 描画バグ回避策
                this.txtObjects[index].set('text', `${this.txtObjects[index]['text']} `);
                this.txtObjects[index].set('text', this.txtObjects[index]['text'].replace(/\s$/g, ''));
            }

            if (value || value === 0) {
                this.txtObjects[index].set(type, value);
            }else if (event.value || event.value === 0) {
                this.txtObjects[index].set(type, event.value);
            } else if ((event.target && event.target.value) && (event.target.value || event.target.value === 0)) {
                this.txtObjects[index].set(type, event.target.value);
            } else  {
                this.txtObjects[index].set(type, event);
            }
        }
        this.onValueChange.emit();
    }

    addText() {
        this.bannerSrvc.addTxt();
    }

    onFontWidth(event, index) {
        if (event.target.checked) {
            this.txtObjects[index].set('fontWeight', 'bold');
        } else {
            this.txtObjects[index].set('fontWeight', 'normal');
        }
        this.onValueChange.emit();
    }

    onFontStyle(event, index) {
        if (event.target.checked) {
            this.txtObjects[index].set('fontStyle', 'italic');
        } else {
            this.txtObjects[index].set('fontStyle', 'normal');
        }
        this.onValueChange.emit();
    }

    onChangeFont(font: string, obj_index: number) {
        this.txtObjects[obj_index].set('fontFamily', font['family']);
        this.onValueChange.emit();
    }

    onChangeColor(color: string, obj_index: number) {
        this.txtObjects[obj_index].set('fill', color);
        this.onValueChange.emit();
    }

    onChangeShadowColor(color: string, obj_index: number) {
        this.txtObjects[obj_index]['shadow']['color'] = color;
        this.onValueChange.emit();
    }
    
    removeText(event, obj_index) {
        event.stopPropagation();
        this.txtObjects.splice(obj_index, 1);
        this.onValueChange.emit([]);
    }

    ngOnChanges(changes: any) {}

    get txtObjects() {
        return this._txtObjects;
    }

    get addBtn() {
        return this._addBtn;
    }
}
