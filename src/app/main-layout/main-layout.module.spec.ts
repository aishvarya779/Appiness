import { MainLayoutModule } from './main-layout.module';

describe('MainLayoutModule', () => {
  let mainLayoutModule: MainLayoutModule;

  beforeEach(() => {
    mainLayoutModule = new MainLayoutModule();
  });

  it('should create an instance', () => {
    expect(mainLayoutModule).toBeTruthy();
  });
});
