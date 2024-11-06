import { UnauthorizedModule } from './server-error.module';

describe('UnauthorizedModule', () => {
  let unauthorizedModule: UnauthorizedModule;

  beforeEach(() => {
    unauthorizedModule = new UnauthorizedModule();
  });

  it('should create an instance', () => {
    expect(unauthorizedModule).toBeTruthy();
  });
});
