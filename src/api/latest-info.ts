import { Info } from './info';

class LatestInfo {
  blockCount = 0;
  txCount = 0;
  cacheJobStatus = '';
  height = 0;
  timestamp = 0;

  update(info: Info) {
    this.txCount = info.txCount;
    this.blockCount = info.blockCount;
    this.height = info.height;
    this.cacheJobStatus = info.cacheJobStatus;
    this.timestamp = info.timestamp;
  }
}

export const latestInfo = new LatestInfo();
