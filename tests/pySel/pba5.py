import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class PythonOrgSearch(unittest.TestCase):

	def setUp(self):
		self.driver = webdriver.Firefox()

	def test_search_in_python_org(self):
		driver = self.driver
		driver.get("http://localhost:3102")
		self.assertIn("Agro", driver.title)
		usr = driver.find_element_by_id("usr")
		pwd = driver.find_element_by_id("pwd")
		usr.send_keys("system")
		pwd.send_keys("system")
#		assert "No results found." not in driver.page_source


#	def tearDown(self):
#		self.driver.close()

if __name__ == "__main__":
	unittest.main()
