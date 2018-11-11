import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path: string) {
    return browser.get(path);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  login(){
    element(by.id('netId')).sendKeys('bfcpzk5');
    element(by.id('password')).sendKeys('123456');
    element(by.id('login')).click();
  }

  register(){
    element(by.css('#reg_netId')).sendKeys('e2eTester32');
    element(by.css('#displayName')).sendKeys('hello kitty');
    element(by.css('#email')).sendKeys('e2e@e2e.com');
    element(by.css('#phone')).sendKeys('234-344-6784');
    element(by.css('#zipcode')).sendKeys('76543');
    element(by.css('#pass1')).sendKeys('123456');
    element(by.css('#pass2')).sendKeys('123456');
    element(by.css('#btnRegister')).click();
  }

  getLoginTitle(){
    return element(by.css('app-login h3')).getText();
  }

  postNewArticle(){
    element(by.id('text_area')).sendKeys('this is a e2e test post');
    element(by.id('btn_post')).click();
  }

  getFirstPost(){
    return element(by.id('post_0_content')).getText();
  }

  checkNavigateToMain(){
    return element(by.id('headline')).getText();
  }
}
