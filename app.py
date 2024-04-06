from flask import Flask , render_template , request, redirect, session  #importation
import sqlite3 

app = Flask(__name__) # créer une instance du flask
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


# implemnter la méthode d'authentification (logique dans solution minimale)
def login(user_id, password):
    conn = sqlite3.connect('database.db')  #crée une connexion à la base de données
    cur = conn.cursor() #créer objet curseur qui va nous permettre d'executer des requetes sql
    cur.execute("SELECT id FROM USER WHERE user_id = ? AND password = ?", (user_id, password)) # requette sql basique comme vu au s3
    user = cur.fetchone() # récupére le résultat de la requete
    conn.close() # on ferme la connexion à la base de données
    if user:
        return user[0]  #si la connexion est réussi , je retourne la clé id associé à l'utilisateur
    else:
        return None  # Retourne un message  , sinon (changer ma solution minimale)

# defini les routes 
@app.route('/', methods=['GET', 'POST'])
def login_page():
    error_message = None  # Initialisez la variable d'erreur à None
    if request.method == 'POST':
        #récupère les valeurs de formulaire
        user_id = request.form['user_id']
        password = request.form['password']
        # retourne l'id s'il existe dans une base de données
        user_id_db = login(user_id, password)
        # si l id est different de None autrement dit il existe  
        if user_id_db is not None:
            session['user_id'] = user_id_db  
            return redirect('/dashboard')
        else:
            error_message = 'Mauvais identifiant / mot de passe.'
           
    return render_template('home.html', error_message=error_message)


#page temporaire 
# Page du tableau de bord
@app.route('/dashboard')
def dashboard():
    if 'user_id' in session:
        # Si l'utilisateur est connecté, renvoyer le tableau de bord
        return render_template('dashboard.html')
    else:
        # Sinon, rediriger vers la page de connexion
        return redirect('/login')

if __name__ == '__main__':
  app.run(debug=True)