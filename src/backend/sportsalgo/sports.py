from bs4 import BeautifulSoup
import pandas as pd
import requests
import json
from create_tables import CreateTables as ct


def main():
        #Get data
        player_data = requests.get('https://www.espn.com/nfl/player/gamelog/_/id/{}'.format(id)).text
        player_soup = BeautifulSoup(player_data, 'html.parser')
        data = player_soup.find('table', class_='Table--align-right')
        
        #Get the position
        position = 1

        #Initialize table
        table = ct(position = position)

        if position == 'Quarterback':
            

            qb_passing = pd.DataFrame(columns=['DATE', 'OPP', 'RESULT', 'CMP', 'ATT', 'YDS','CMP%', 'AVG', 'TD', 'INT', 'LNG', 'SACK', 'RTG', 'QBR'])
            qb_rushing = pd.DataFrame(columns=['DATE', 'OPP', 'RESULT', 'ATT', 'YDS', 'AVG', 'TD', 'LNG'])

            qb_passing,qb_rushing = ct.create_qb_tables(table, data, qb_passing, qb_rushing)
            
            print(qb_passing)
            print(qb_rushing)
        
        if position == 'Wide Receiver' or position == 'Tight End':

            rt_recieving = pd.DataFrame(columns=['DATE', 'OPP', 'RESULT', 'REC', 'TGTS', 'YDS', 'AVG', 'TD', 'LNG'])
            rt_rushing = pd.DataFrame(columns=['DATE', 'OPP', 'RESULT', 'ATT', 'YDS', 'AVG', 'LNG', 'TD'])

            rt_recieving, rt_rushing = ct.create_rt_tables(table, data, rt_recieving, rt_rushing)


if __name__ == "__main__":
    main()