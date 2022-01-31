import fs from 'fs';

export class ImageFromServer {
    public key: string;
    constructor(key) {
      this.key = key;
    }
    getFile() {
      return fs.createReadStream(`uploads/${this.key}`);
    }
}
