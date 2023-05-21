from bs4 import BeautifulSoup
import requests
import json
import pandas as pd


def get_data(page_data):

    data_list = []

    for li in page_data.find_all('li'):
        data_list.append(li.text)

    return data_list


def main():
    url = 'https://sports.core.api.espn.com/v3/sports/football/nfl/athletes?limit=18000'
    jsonData = requests.get(url).json()

    players = pd.DataFrame(columns=['Name', 'ID', 'Team', 'Number', 'Position'])

    for dict in jsonData['items']:
        if dict['fullName'][0:2] != ' [':

            id = int(dict['id'])
            print(id)

            player_data = requests.get('https://www.espn.com/nfl/player/gamelog/_/id/{}'.format(id)).text
            player_soup = BeautifulSoup(player_data, 'html.parser')
            data = player_soup.find('ul', class_='PlayerHeader__Team_Info')
            if data is not None:
                data_list = get_data(data)
                if len(data_list) == 3:  
                    players = players.append(
                        {
                            'Name' : dict['fullName'],
                            'ID'   : id,
                            'Team' : data_list[0],
                            'Number' : data_list[1],
                            'Position' : data_list[2],
                        }, ignore_index=True
                    )
                elif len(data_list) == 2:  
                    players = players.append(
                        {
                            'Name' : dict['fullName'],
                            'ID'   : id,
                            'Team' : data_list[0],
                            'Number' : '',
                            'Position' : data_list[1],
                        }, ignore_index=True
                    )
                elif len(data_list) == 1:
                    players = players.append(
                        {
                            'Name' : dict['fullName'],
                            'ID'   : id,
                            'Team' : '',
                            'Number' : '',
                            'Position' : data_list[0],
                        }, ignore_index=True
                    )
                elif len(data_list) == 0:
                    players = players.append(
                        {
                            'Name' : dict['fullName'],
                            'ID'   : id,
                            'Team' : '',
                            'Number' : '',
                            'Position' : '',
                        }, ignore_index=True
                    )

    with open('src/backend\sportsalgo\data.json', 'w') as json_file:
        json.dump(list(players.T.to_dict().values()), json_file)


    
if __name__ == "__main__":
    main()