export class Adapter {
    public saveType: any;
    constructor(saveType) {
      this.saveType = saveType;
    }
    getTargetFile() {
      return this.saveType.getFile();
    }
}
