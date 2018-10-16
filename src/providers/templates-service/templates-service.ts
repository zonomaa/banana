import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as firebase from 'firebase/app';

@Injectable()

export class TemplatesService {
    templetes = [];
    templateSub = new BehaviorSubject([]);

    constructor(public db: AngularFireDatabase) {
        this.db.list('/templates').auditTrail().subscribe(templetes => {
            this.templetes = templetes.map(x => {
                return {
                    'key': x.key,
                    'value': x.payload.val()
                };
            });

            this.templateSub.next(this.navList);
        });
    }

    getTemplateData(id = null) {
        return this.templetes.filter(x => {
                return x.key === id;
            }).map(x => {
                    return x.value;    
            });
    }

    async saveTemplate(name, img, texts) {
        let save_key = null;
        await Promise.resolve()
            .then(_ => {
                return this.saveImg(img);
            })
            .then(store => {
                const textsObj = texts.map(x => {
                    return {
                        'text': x.text,
                        'top': x.top || null,
                        'left': x.left || null,
                        'fill': x.fill || null,
                        'fontWeight': x.fontWeight || null,
                        'scaleX': x.scaleX || null,
                        'scaleY': x.scaleY || null,
                        'fontStyle': x.fontStyle || null,
                        'shadow': x.shadow || null,
                        'angle': x.angle || null,
                        'textAlign': x.textAlign || null,
                        'stroke': x.stroke || null,
                        'fontFamily': x.fontFamily || null,
                        'strokeWidth': x.strokeWidth || 0,
                        'charSpacing': x.charSpacing || null,
                        'lineHeight': x.lineHeight || null
                    };
                });
                console.log(textsObj, texts);
                
                return this.db.list('/templates').push({
                    'name': name,
                    'image': store.downloadURL,
                    'texts': textsObj
                });
            })
            .then(result => {
                save_key = result['key'];
            });
        
        return save_key;
    }

    saveImg(img) {
        const storageRef = firebase.storage().ref();
        const img_key = this.getUniqueStr();
        // ストレージへアップロードするファイルのパスを生成する
        const uploadRef = storageRef.child('images/' + img_key + '.png');

        return uploadRef.put(img);
    }

    getUniqueStr() {
        const strong = 1000;
        return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16);
    }

    get navList() {
        return this.templetes.map(x => {
            return {
                title: x.value.name,
                type: 'item',
                url: `/edit/${x.key}`
            };
        });
    }


}
