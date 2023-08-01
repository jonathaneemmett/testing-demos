var webdriver = require('selenium-webdriver');
const driver = new webdriver.Builder().forBrowser('firefox').build();
driver.get('http://www.google.com');

driver.quit();
