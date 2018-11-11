import {browser, by, element} from "protractor";

describe('authentication and main page test', () => {

  it('register a new user', () => {
    browser.get('/auth').then(() => {
      element(by.css('#reg_netId')).sendKeys('e2eTester32');
      element(by.css('#displayName')).sendKeys('hello kitty');
      element(by.css('#email')).sendKeys('e2e@e2e.com');
      element(by.css('#phone')).sendKeys('234-344-6784');
      element(by.css('#zipcode')).sendKeys('76543');
      element(by.css('#pass1')).sendKeys('123456');
      element(by.css('#pass2')).sendKeys('123456');
      element(by.css('#btnRegister')).click().then(() => {
        expect(element(by.css('#successMsg')).getText()).toEqual('register success, please login');
      });
    });
  });

  it('login as new user', () => {
    browser.get('/auth').then(() => {
      element(by.id('netId')).sendKeys('e2eTester32');
      element(by.id('password')).sendKeys('123456');
      element(by.id('login')).click();
      expect(element(by.id('headline')).getText()).toEqual('Basic Profile');
    });
  });

  it('Create new article and validate article appears in feed', () => {
    browser.get('/auth').then(() => {
      element(by.id('netId')).sendKeys('e2eTester32');
      element(by.id('password')).sendKeys('123456');
      element(by.id('login')).click();
      element(by.css('#text_area')).sendKeys('this is a e2e');
      element(by.css('#btn_post')).click();
      expect(element.all(by.css('.article_content')).get(0).getText()).toEqual('this is a e2e');
    });
  });

  it('Update headline headline and verify change', () => {
    browser.get('auth').then(() => {
      element(by.id('netId')).sendKeys('e2eTester32');
      element(by.id('password')).sendKeys('123456');
      element(by.id('login')).click();
      element(by.css('#new_headline')).sendKeys('haha');
      element(by.css('#update_headline')).click();
      expect(element(by.css('#headline_content')).getText()).toEqual('haha');
    });
  });

  it('Log out new user', () => {
    browser.get('/auth').then(() => {
      element(by.id('netId')).sendKeys('e2eTester32');
      element(by.id('password')).sendKeys('123456');
      element(by.id('login')).click();
      element(by.id('logout')).click();
      expect(element(by.id('login_title')).getText()).toEqual('Login');
    });
  });

  it('login as test user', () => {
    browser.get('/auth').then(() => {
      element(by.id('netId')).sendKeys('bfcpzk5');
      element(by.id('password')).sendKeys('123456');
      element(by.id('login')).click();
      expect(element(by.id('headline')).getText()).toEqual('Basic Profile');
    });
  });

  it('Search for a keyword that matches only one of test user`s articles ' +
    'and verify only one article shows, and verify the author', () => {
    browser.get('/auth').then(() => {
      element(by.id('netId')).sendKeys('bfcpzk5');
      element(by.id('password')).sendKeys('123456');
      element(by.id('login')).click();
      element(by.id('searchbar')).sendKeys('aaabbbccc');
      element(by.id('btn_search')).click();
      expect(element.all(by.css('.article_content')).count()).toBe(1);
      expect(element.all(by.css('.article_author')).get(0).getText()).toBe('bfcpzk5');
    });
  });

  it('log out as test user', () => {
    browser.get('/auth').then(() => {
      element(by.id('netId')).sendKeys('bfcpzk5');
      element(by.id('password')).sendKeys('123456');
      element(by.id('login')).click();
      element(by.id('logout')).click();
      expect(element(by.id('login_title')).getText()).toEqual('Login');
    });
  });
});
