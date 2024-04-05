from flask import Flask , render_template , request, redirect, session # type: ignore #importer flask
import sqlite3 

app = Flask(__name__) # créer une instance du flask
# créer table user
def creer_table():
#créer une connexion avec ma base de données 
    conn = sqlite3.connect('database.db')
#créer un cursseur nous aide a executer les requetes sql et avoir les résultats
    cur= conn.cursor()
#supprimer la table si elle existait
    cur.execute("DROP TABLE IF EXISTS USER")
#créer une table dans la base de données
#chaque fois j'ajoude un user id s'incrémente automatiquement (autoincrement)
    cur.execute("""CREATE TABLE USER( 
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                user_id TEXT,
                password TEXT)
            """)
#inserer des user : (avec des tuples)
    cur.execute("""INSERT INTO USER (id, user_id, password)
                VALUES ( 1, 'b21228304' , 'Bd10052003-')""")
# valider l'insertion des données:
    conn.commit()
# autre insertion :
    user_2 = ('a21258907','Bh25061977?')
    cur.execute("""INSERT INTO USER ( user_id, password)
                VALUES ( ? , ?)""",user_2)
    conn.commit()

    user_3 = ('e21235906','Ek10041977?')
    cur.execute("""INSERT INTO USER (user_id, password)
                VALUES ( ? , ?)""",user_3)
    conn.commit()
# recupérer des données (requetes d'interrogation)
    res = cur.execute("SELECT * FROM USER")
    print(res.fetchall())
# fermer la connexion avec la base de données
    conn.close()



creer_table()



#définir les routes et les vues 
@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)