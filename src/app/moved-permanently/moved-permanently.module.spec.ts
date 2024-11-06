import { MovedPermanentlyModule } from './moved-permanently.module';

describe('MovedPermanentlyModule', () => {
  let movedPermanentlyModule: MovedPermanentlyModule;

  beforeEach(() => {
    movedPermanentlyModule = new MovedPermanentlyModule();
  });

  it('should create an instance', () => {
    expect(movedPermanentlyModule).toBeTruthy();
  });
});
