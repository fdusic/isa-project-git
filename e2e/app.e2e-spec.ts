import { Angular2IsaFrontendPage } from './app.po';

describe('angular2-isa-frontend App', function() {
  let page: Angular2IsaFrontendPage;

  beforeEach(() => {
    page = new Angular2IsaFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
