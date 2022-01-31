import { getFileStream } from '../services/s3';

export class ImageFromS3 {
    public key: string;
    constructor(key) {
      this.key = key;
    }
    getFile() {
      return getFileStream(this.key);
    }
}
