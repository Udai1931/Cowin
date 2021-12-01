import selenium
import sys
from selenium import webdriver as wb
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
# chrome_options.add_argument("--headless")

PATH = "C:\Program Files (x86)\chromedriver.exe"
# PATH = process.env.PATH
webD =wb.Chrome(PATH,chrome_options=chrome_options) 
webD.get('https://www.cowin.gov.in/')

pin = 110032
# pin = int(sys.argv[1])
age = 20  
# age = int(sys.argv[2])
# ele = webD.find_element_by_xpath('//*[@id="mat-tab-label-1-1"]').click()
WebDriverWait(webD, 20).until(EC.element_to_be_clickable((By.XPATH, "//*[@id='mat-tab-label-1-1']"))).click()
# webD.execute_script("arguments[0].click();", ele)
webD.find_element_by_xpath('//*[@id="mat-input-0"]').send_keys(pin)
webD.find_element_by_xpath('//*[@id="mat-tab-content-0-0"]/div/div[1]/div/div/button').click()

if(age>=45):
    webD.find_element_by_xpath('//*[@id="Search-Vaccination-Center"]/appointment-table/div/div/div/div/div/div/div/div/div/div/div[2]/form/div/div/div[2]/div[3]/ul/li[1]/div/div[3]/label').click()
else:
    webD.find_element_by_xpath('//*[@id="Search-Vaccination-Center"]/appointment-table/div/div/div/div/div/div/div/div/div/div/div[2]/form/div/div/div[2]/div[3]/ul/li[1]/div/div[1]/label').click()

ans = ""

rows = webD.find_elements_by_css_selector(".totalslts")
for row in rows:
    dose = row.text
    p1 = row.find_element_by_xpath('..')
    p2 = p1.find_element_by_xpath('..')
    p3 = p2.find_element_by_xpath('..')
    p4 = p3.find_element_by_xpath('..')
    p5 = p4.find_element_by_xpath('..')
    p6 = p5.find_element_by_xpath('..')
    p7 = p6.find_element_by_xpath('..')
    title = p7.find_element_by_css_selector(".center-name-text")
    ans=ans+title.text+"**"
    
print("***"+str(ans)+"***")
webD.quit()
