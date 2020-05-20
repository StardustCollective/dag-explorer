import { Observable } from 'rxjs';
import { firebaseService } from '~firebase/firebase.service';

export type Info = {
  blockCount: number;
  txCount: number;
  cacheJobStatus: string;
  blockHeight: number;
  timestamp: number;
};

export const observeInfo = (): Observable<Info> => {
  return firebaseService.observeObject<Info>('/app/info');
};
