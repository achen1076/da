import pandas as pd
import requests




class CreateTables:
    
    def __init__(self, position: str) -> None:
        self.position = position


    def add_to_list(self, page_data, data_list) -> list:
        temp_list = []
        for info in page_data:
            line = info.getText()
            temp_list.append(line)
            
        data_list.append(temp_list)

        return data_list

    def create_data_list(self,data) -> list:
        data_list = []

        for row in data.tbody.find_all('tr'):
            columns = row.find_all('td')
            data_list = self.add_to_list(columns, data_list)

        total = data_list.pop(len(data_list) - 1)

        return data_list


    def create_qb_tables(self, data, qb_passing, qb_rushing):

        data_list = self.create_data_list(data)

        for stats in data_list:

            #General data
            date = stats[0]
            opp = stats[1]
            result = stats[2]

            #Passing
            cmp = stats[3]
            att = stats[4]
            yds = stats[5]
            cmpp = stats[6]
            avg = stats[7]
            td = stats[8]
            int = stats[9]
            lng = stats[10]
            sack = stats[11]
            rtg = stats[12]
            qbr = stats[13]

            #Rushing
            ratt = stats[14]
            ryds = stats[15]
            ravg = stats[16]
            rtd = stats[17]
            rlng = stats[18]


            
            qb_passing = qb_passing.append(
                {
                'DATE': date, 
                'OPP' : opp,
                'RESULT': result, 
                'CMP' : cmp,
                'ATT': att, 
                'YDS' : yds,
                'CMP%': cmpp, 
                'AVG' : avg,
                'TD': td, 
                'INT' : int,
                'LNG': lng, 
                'SACK' : sack,
                'RTG': rtg, 
                'QBR' : qbr,
                }, 
            ignore_index=True)


            qb_rushing = qb_rushing.append(
                {
                'DATE': date, 
                'OPP' : opp,
                'RESULT': result,
                'ATT': ratt, 
                'YDS' : ryds,
                'AVG' : ravg,
                'TD': rtd, 
                'LNG': rlng, 
                },
            ignore_index=True)

            
        return qb_passing,qb_rushing

    def create_rt_tables(self, data, rt_passing, rt,_rushing):
        
        data_list = self.create_data_list(data)


