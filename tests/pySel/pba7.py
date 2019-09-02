from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
  
browser = webdriver.Firefox()
browser.get("http://localhost:3102")
  
usr = browser.find_element_by_id("usr")
pwd = browser.find_element_by_id("pwd")
submit   = browser.find_element_by_id("submit")
  
usr.send_keys("system")
pwd.send_keys("system")
  

submit.click()
  

wait = WebDriverWait( browser, 5 )
  
try:
	page_loaded = wait.until_not(
	lambda browser: browser.current_url == "testLogin.html"
	)
except TimeoutException:
	self.fail( "Loading timeout expired" )
	  
	self.assertEqual(
		browser.current_url,
		"testLogin.html",
		msg = "Successful Login"
		)
