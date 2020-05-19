import * as firebase from 'firebase/app';
import 'firebase/database';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Query = firebase.database.Query;
import Reference = firebase.database.Reference;
import { AppEnv } from '../app-env';
import { FbQuery } from '~firebase/fb-query';

export class FirebaseService {
  protected basePath = '';

  private database: firebase.database.Database;
  private app: firebase.app.App;

  constructor() {
    this.app = firebase.initializeApp(AppEnv.FIREBASE_CONFIG);

    this.database = this.app.database();
  }

  ref(path?: string) {
    return this.database.ref(this.basePath + path);
  }

  getObject<T>(path: string): Promise<T> {
    return this.ref(path)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  observeObject<T>(path: string): Observable<T> {
    return this.observeByValue(path);
  }

  private observeByValue<T>(path: string): Observable<T> {
    const subject: Subject<T> = new ReplaySubject<T>(1);

    this.ref(path).on('value', data => {
      subject.next(data.val());
    });

    return subject.pipe(
      finalize(() => {
        if (subject.observers.every(obv => obv.closed)) {
          this.ref(path).off();
        }
      })
    );
  }

  getListByQuery<T>(path: string, query: FbQuery): Promise<T[]> {
    const ref: Reference = this.ref(path);

    let queryFn: QueryFn | null = null;

    if (query) {
      const limit = query.limit || 10;

      if (query.startAt !== undefined) {
        queryFn = ref =>
          ref
            .orderByKey()
            .startAt(query.startAt || 0)
            .limitToFirst(limit);
      } else {
        queryFn = ref => ref.orderByKey().limitToFirst(limit);
      }
    }

    let childPath: Reference | Query = ref;

    if (queryFn) {
      childPath = queryFn(ref);
    }

    return childPath.once('value').then(snapshot => {
      const list: T[] = [];

      snapshot.forEach(child => {
        list.push(child.val());
      });

      return list;
    });
  }
}

export declare type QueryFn = (ref: Reference) => Query;

export const firebaseService = new FirebaseService();
