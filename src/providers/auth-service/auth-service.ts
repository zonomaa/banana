import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

// import { Observable } from 'rxjs/Observable';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthService {
  private currentUser: firebase.User = null;
  private currentUserData: object = null;
  private path: string = null;
  public group_id = null;
  public authSub: any;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public fb: FirebaseApp
  ) {
    this.authSub = new Subject();
  }

  async initialize() {
    await Promise.resolve()
      .then(() => {
        // ログインチェック
        return this.authState().take(1).toPromise(Promise);
      })
      .then((authState) => {
        if (authState) {
          // ログインされていた場合
          this.currentUser = authState;
          this.path = `users/${authState.uid}`;
          // ユーザーのデータも取ってくる
          return this.db.object(`${this.path}/userData`).valueChanges().take(1).toPromise(Promise);
        }
      })
      .then((userData) => {
        if (userData) {
          // ユーザーデータの取得
          this.currentUserData = userData;
          this.authSub.next('initialize');
        }
      })
      .catch(error => {
        console.log('error:', error);
      });
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.currentUser.uid : '';
  }

  // Returns current user UID
  get userPath(): string {
    return this.authenticated ? this.path : '';
  }

  // Returns current user UID
  get userData(): any {
    return this.currentUserData ? this.currentUserData : {};
  }

  // Returns current user UID
  getGroupID(): any {
    return this.db.object(`${this.path}/groups`).valueChanges().take(1).toPromise(Promise);
  }

  chargeConfirm() {
    this.db.object(`${this.path}/charge`).update({ confirm: true})
      .catch(error => console.log(error));
  }

  getUserData(): any {
    this.db.object(`${this.path}/userData`).valueChanges().take(1).subscribe((user_data) => {
      this.currentUserData = user_data;
    });
  }

  getUserGroup(): any {
    return this.db.object(`${this.path}/groups`).valueChanges().take(1).toPromise(Promise);
  }

  setUserData(data) {
    this.db.object(`${this.path}/userData`).set(data)
      .catch(error => console.log(error));
  }

  authState(): any {
    return this.afAuth.authState;
  }

  login(email = null, password = null) {
    return Promise.resolve()
      .then(_ => {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
      })
      .then((user) => {
        this.currentUser = user;
        this.path = `users/${user.uid}`;
        this.getUserData();
        this.authSub.next('login');
        return this.getUserGroup();
      })
      .then(group => {
        this.group_id = Object.keys(group)[0] || null;
        return this.group_id;
      });
  }

  createAdv(username, email, password, tel, thumbnail) {
    let create_uid = '';
    return Promise.resolve()
      .then(_ => {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      })
      .then(result => {
        create_uid = result.uid;
        return this.fb.storage().ref().child(`thumbnails/${result.uid}`)
          .putString(thumbnail, 'data_url', { cacheControl: 'public,max-age=720' });
      })
      .then(snap => {
        const thumbnail_url = snap.downloadURL.replace(/&token=.*/, '');
        this.db.object(`users/${create_uid}`).set({
          'userData': {
            'email': email,
            'username': username,
            'tel': tel,
            'thumbnail': thumbnail_url
          },
          'groups': {
            3: true
          }
        });
      });
  }

  logOut(): void {
    this.db.object(`${this.path}/isLogout`).set(true).then(_ => {
      this.unLoad();
      this.afAuth.auth.signOut();
      this.authSub.next('logout');
    });
  }

  updateUserData(userData = null): void {
    if (userData) {
      const data = {
        'userData': userData
      };
      this.db.object(this.path).update(data)
        .catch(error => console.log(error));
    }

  }

  /*
  / 初期化
  */
  unLoad() {
    this.currentUser = null;
    this.currentUserData = null;
    this.path = null;
  }
}
