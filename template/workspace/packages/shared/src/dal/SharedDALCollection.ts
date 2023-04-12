import {
  UserDAL,
  FileDAL,
  AppConfigDAL,
} from "./index";

interface IDALCollection {
  getAppConfigDAL: () => AppConfigDAL;
  getFileDAL: () => FileDAL;
  getUserDAL: () => UserDAL;
}

export class SharedDALCollection implements IDALCollection {
  private userDAL?: UserDAL;
  private fileDAL?: FileDAL;
  private appConfigDAL?: AppConfigDAL;

  public getUserDAL = () => {
    if (!this.userDAL) {
      this.userDAL = new UserDAL();
    }
    return this.userDAL;
  };

  public getFileDAL = () => {
    if (!this.fileDAL) {
      this.fileDAL = new FileDAL();
    }
    return this.fileDAL;
  };

  public getAppConfigDAL = () => {
    if (!this.appConfigDAL) {
      this.appConfigDAL = new AppConfigDAL();
    }
    return this.appConfigDAL;
  };
}

export class DefaultDALCollection implements IDALCollection {
  private static dalCollection: SharedDALCollection;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private ensureDalCollection(): SharedDALCollection {
    if (!DefaultDALCollection.dalCollection) {
      DefaultDALCollection.dalCollection = new SharedDALCollection();
    }
    return DefaultDALCollection.dalCollection;
  }

  public static getDALCollection(): SharedDALCollection {
    if (!DefaultDALCollection.dalCollection) {
      DefaultDALCollection.dalCollection = new SharedDALCollection();
    }
    return DefaultDALCollection.dalCollection;
  }

  getAppConfigDAL = () => {
    return this.ensureDalCollection().getAppConfigDAL();
  };

  getFileDAL = () => {
    return this.ensureDalCollection().getFileDAL();
  };

  getUserDAL = () => {
    return this.ensureDalCollection().getUserDAL();
  };
}
