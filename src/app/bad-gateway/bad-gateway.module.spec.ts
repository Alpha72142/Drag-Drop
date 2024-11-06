import { BadGatewayModule } from './bad-gateway.module';

describe('BadGatewayModule', () => {
  let badGatewayModule: BadGatewayModule;

  beforeEach(() => {
    badGatewayModule = new BadGatewayModule();
  });

  it('should create an instance', () => {
    expect(badGatewayModule).toBeTruthy();
  });
});
