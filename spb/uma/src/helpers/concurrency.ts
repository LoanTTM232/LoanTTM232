class ConcurrencyHandler {
  private static instance: ConcurrencyHandler;
  private isExecuting: boolean = false;
  private callback: Array<[Function, Function]> = [];

  private constructor() {}

  public static getInstance(): ConcurrencyHandler {
    if (!ConcurrencyHandler.instance) {
      ConcurrencyHandler.instance = new ConcurrencyHandler();
    }
    return ConcurrencyHandler.instance;
  }

  public async execute(action: Function): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const onSuccess = () => {
        resolve();
      };

      const onError = (error: Error) => {
        reject(error);
      };
      this.callback.push([onSuccess, onError]);
    });

    if (!this.isExecuting) {
      this.isExecuting = true;
      try {
        await action();
        this.callback.forEach(([onSuccess]) => {
          onSuccess();
        });
      } catch (error) {
        this.callback.forEach(([_, onError]) => {
          onError(error);
        });
      } finally {
        this.isExecuting = false;
        this.callback = [];
      }
    }

    return promise;
  }
}

export default ConcurrencyHandler;
