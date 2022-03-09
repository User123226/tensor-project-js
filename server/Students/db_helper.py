import json

import pymysql
from config import host, user, password, db_name

def action(x):
    try:
        connection = pymysql.connect(
        host=host,
        port=3306,
        user=user,
        password=password,
        database=db_name,
        cursorclass=pymysql.cursors.DictCursor
        )
        try:
            with connection.cursor() as cursor:
                if x != "":
                    cursor.execute(x)
                cursor.execute("SELECT * FROM `students`")
                rows = cursor.fetchall()
                connection.commit()
        finally:
            connection.close()
            return json.dumps(rows)

    except Exception as ex:
        print("Connection refused...")
        print(ex)


        


