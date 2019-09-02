import unittest
import json
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC


class TestGetMenusML_2(unittest.TestCase):
	def setUp(self):
		self.browser = webdriver.Firefox()

	def testGet1MenuML(self):
		self.browser.get("http://localhost:1948/testMenuML2.html")
		wait = WebDriverWait( self.browser, 5 )

		try:
			alert = wait.until(EC.alert_is_present())
			resp = alert.text;
			alert.accept();

			self.assertEqual(
				resp,
				'TESTS',
				msg = "Resp no correcta"
				)
			
		except TimeoutException:
			self.fail( "Loading timeout expired" )

#	def tearDown(self):
#		self.browser.quit()

if __name__ == '__main__':
    unittest.main(verbosity=2)
