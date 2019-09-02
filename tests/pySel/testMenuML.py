import unittest
import json
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC


class TestGetMenusML(unittest.TestCase):
	def setUp(self):
		self.browser = webdriver.Firefox()

	def testGetMetas(self):
		self.browser.get("http://localhost:1948/testMenuML.html")
		wait = WebDriverWait( self.browser, 5 )

		try:
			alert = wait.until(EC.alert_is_present())
			resp = json.loads(alert.text);
			alert.accept();

			self.assertEqual(
				resp[0]["meta"]["tag"],
				'TESTS',
				msg = "Resp no correcta"
				)
			
		except TimeoutException:
			self.fail( "Loading timeout expired" )

	def testMenuSet(self):
		self.browser.get("http://localhost:1948/testMenuML.html")
		wait = WebDriverWait( self.browser, 5 )

		try:
			alert = wait.until(EC.alert_is_present())
			alert.accept()
			alert = wait.until(EC.alert_is_present())
			alert.accept()
			menu = self.browser.find_element_by_id("menu")

			self.assertEqual(
				menu.text,
				'TESTS',
				msg = "Resp no correcta"
				)
			
		except TimeoutException:
			self.fail( "Menu timeout expired" )



	def tearDown(self):
		self.browser.quit()

if __name__ == '__main__':
    unittest.main(verbosity=2)
