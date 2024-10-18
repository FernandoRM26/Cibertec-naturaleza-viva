import sqlite3

def connSQL():
    conn = sqlite3.connect('static/db/nv000.db')
    cursor = conn.cursor()
    return conn, cursor

def USUARIOS(sql, parm, flag):
    conn, cursor = connSQL()
    if flag == 'I':
        cursor.execute(sql, parm)
        conn.commit()
        conn.close()
    elif flag == 'Q':
        if parm:
            cursor.execute(sql,parm)
            results = cursor.fetchone() 
        else:
            cursor.execute(sql)
            results = cursor.fetchall() 
        conn.commit()
        conn.close()
        return results