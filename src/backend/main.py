import firebase_admin
from firebase_admin import credentials, firestore, auth
from bs4 import BeautifulSoup
import requests


cred = credentials.Certificate("src/backend/bajamas-1076-19fcec7f6e35.json")
firebase_admin.initialize_app(cred)

db = firestore.client()


def getDoc(user_id):
    doc_ref = db.collection(u'userInput').document(u'{}'.format(user_id))

    doc = doc_ref.get()
    if doc.exists:
        data_dict = doc.to_dict()
        userInput = data_dict['userInput']
        userDataType = data_dict['dataType']
        print(userInput)

    else:
        print(u'doc not found')


# getDoc('CihqsKuPS3PEKvkmjydFfQmcmbB2')


userInput = "joe+biden"
page_increment = 0
result_dict = {}


# BNeawe, s3v9rd

restricted_words = ['the', 'The', 'of', 'Of', 'to', 'To', 'is', 'Is', 'on', 'On', 'for', 'For', 'ago', 'a', 'A', 'hours', 'was', 'Was', 'at', 'At', 'and', 'And', 'as', 'As', 'by', 'By', 'an', 'An', 'in', 'In', 'his', 'His', 'from', 'From', 'have', 'Have', 'after', 'After', 'he', 'He', 'it', 'Is', 'i', "I", 'into', 'Into', 'all', 'All', 'Up', 'Be', 'Not', 'Return' ]


def create_data_list(result_dict,user_count_choice):
    
    count_list = []
    alist = []
    clist = []

    
    for key in result_dict:
        count_list.append(result_dict[key])


    most_results = sorted(count_list, reverse=True)[0]

    for i in range(most_results, 0, -1):
        for key in result_dict:
            if result_dict[key] == i:
                alist.append(key)
                clist.append(result_dict[key])

    return(alist[0:user_count_choice],clist[0:user_count_choice])


def add_to_dict(page_data):
    for info in page_data:
        line = info.getText().split()
        for word in line:
            if word not in restricted_words and word.isalpha() and word[0].isupper():
                if word not in result_dict.keys():
                    result_dict[word] = 1
                else:
                    result_dict[word] += 1






google_html_text = requests.get('https://www.google.com/search?q={}&start={}'.format(userInput,page_increment)).text
google_soup = BeautifulSoup(google_html_text, 'lxml')
google_search_headlines = google_soup.find_all('h3')
google_search_text = google_soup.find_all('div', class_= 's3v9rd')


googlenews_html_text = requests.get('https://www.google.com/search?q={}&rlz=1C1VDKB_enUS966US966&source=lnms&tbm=nws&sa=X&ved=2ahUKEwivuYyG4ML5AhW3hIkEHVaEAyEQ_AUoAXoECAIQAw&cshid=1660357073765655&biw=1707&bih=889&dpr=2.25'.format(userInput)).text
googlenews_soup = BeautifulSoup(googlenews_html_text, 'lxml')
googlenews_search_headlines = googlenews_soup.find_all('h3')
googlenews_search_text = googlenews_soup.find_all('div')


add_to_dict(google_search_headlines)
add_to_dict(google_search_text)
add_to_dict(googlenews_search_headlines)
add_to_dict(googlenews_search_text)

a,b = create_data_list(result_dict, 20)


print(a,b)

