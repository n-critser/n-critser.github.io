# Author:  Nick Critser n-critser@github.com
# file:    baseTest.py
# project: Selenium Testing with Python 2X
# objective: Test www.n-critser.github.io

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
import unittest
import sys
import time
#import Selenium2Library

# LOGGING
import logging
#logging.warning('Watch out!') # will print a message to the console
#logging.info('I told you so') # will not print anything

# Log File example
logging.basicConfig(filename='debug.log',level=logging.DEBUG)
logging.debug('This message should go to the log file')
logging.info('So should this')
logging.warning('And this, too')
# Test Class
class ExampleTestCase(unittest.TestCase):

    #def setUp(self):
    #   self.driver = webdriver.Remote(desired_capabilities={
    #       "browserName": "firefox",
    #       "platform": "MAC",
    #       })
    capabilities = None


    def setUp(self):
        #self.driver = webdriver.Remote(desired_capabilities=self.capabilities)
        self.driver = webdriver.Firefox()

    def test_example(self):
        link_value1 = ""#<h3 class="r">
        #href="http://www.meetup.com/cities/us/ny/new_york/"

        self.driver.get("http://n-critser.github.io/")
        self.assertEqual(self.driver.title, "n-critser")
        #elem = self.driver.find_element_by_id("gbqfq")
        #elem.send_keys("meetup")
        #elem.send_keys(Keys.RETURN)

        time.sleep(.5) #page load wait?

        try:
            self.assertEqual(self.driver.current_url, "http://n-critser.github.io/")
            #assert "query=What+color+is+red" in self.driver.url

        except NoSuchElementException:
            assert 0, "can't find something"
            #except

        try:

            link1 = self.driver.find_element_by_name(link_value1)
            print link1
            #linkl.click()
            #self.driver.click("link=people.php")
        except NoSuchElementException:
            assert 0, "cant't find link"
            logging.debug("Couldn't find the link to"+link_value1)
#One test is run on one browser so far
        #def test_response(self):



    def tearDown(self):
        self.driver.quit()

if __name__== "__main__":
    # ExampleTestCase.capabilities = {
    #   "browserName": sys.argv[1],
    #   "platform": sys.argv[2],
    #}
    unittest.main(verbosity=2)
