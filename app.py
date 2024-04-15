from flask import Flask , render_template , request, redirect, session  #importation
import sqlite3 

app = Flask(__name__)
app.secret_key = 'benhilaDouaa'# Clé secrète pour signer la session j'ai remarqué que si je mais pas de clé secrete ca marche pas et ca m'affiche une page qui me demande de le créer 

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
                username TEXT,
                password TEXT)
            """)
    #inserer des user : (avec des tuples)
    cur.execute("""INSERT INTO USER (id, username, password)
                VALUES ( 1, 'douaa' , 'Bd10052003-')""")
# valider l'insertion des données:
    conn.commit()
# autre insertion :
    user_2 = ('hassan','000000')
    cur.execute("""INSERT INTO USER ( username, password)
                VALUES ( ? , ?)""",user_2)
    conn.commit()

    user_3 = ('nada','1977k')
    cur.execute("""INSERT INTO USER (username, password)
                VALUES ( ? , ?)""",user_3)
    conn.commit()

creer_table()


#définir les routes
# route pour la page d'accueil
@app.route('/')
def home():
    return render_template('home.html')

# route pour la page de connexion
@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
