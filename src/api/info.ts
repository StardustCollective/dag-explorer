import { Observable } from 'rxjs';
import { AppEnv } from '../app-env';
import { firebaseService } from '~firebase/firebase.service';

export type Info = {
  blockCount: number;
  txCount: number;
  cacheJobStatus: string;
  blockHeight: number;
};

// export const fetchInfo = async (): Promise<Info> => {
//   const response = await fetch(
//     `${AppEnv.DAG_EXPLORER_API}/info.json`
//   );
//   return await response.json();
// };

export const observeInfo = (): Observable<Info> => {
  return firebaseService.observeObject<Info>('/app/info');
};
