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


# implemnter la méthode d'authentification (logique dans solution minimale)
def login(username, password):
    conn = sqlite3.connect('database.db')  #crée une connexion à la base de données
    cur = conn.cursor() #créer objet curseur qui va nous permettre d'executer des requetes sql
    cur.execute("SELECT id FROM USER WHERE username = ? AND password = ?", (username, password)) # requette sql basique comme vu au s3
    user = cur.fetchone() # récupére le résultat de la requete
    conn.close() # on ferme la connexion à la base de données
    if user:
        return user[0]  #si la connexion est réussi , je retourne la clé id associé à l'utilisateur
    else:
        return None  # Retourne un message  , sinon (changer ma solution minimale)




# Page du map
@app.route('/carte.html')
def carte():
    if 'user_id' in session:
        # Si l'utilisateur est connecté, renvoyer la map
        return render_template('carte.html')
    else:
        # Sinon, rediriger vers la page de connexion
        return redirect('/login')


#définir les routes
# route pour la page d'accueil
@app.route('/')
def home():
    return render_template('home.html')

# route pour la page de connexion
@app.route('/login', methods=['GET', 'POST'])
def login_page():
    error_message = None  # Initialisez la variable d'erreur à None
    if request.method == 'POST':
        # Récupère les valeurs de formulaire
        username = request.form['username']
        password = request.form['password']
        # Retourne l'id s'il existe dans une base de données
        user_id_db = login(username, password)
        # Si l'id existe, connectez l'utilisateur
        if user_id_db is not None:
            session['user_id'] = user_id_db  # Utilisez la bonne clé pour stocker l'ID de l'utilisateur
            return redirect('/carte.html')
        else:
            error_message = 'Mauvais identifiant / mot de passe.'
    else:
        # Redirection vers la page de connexion si la méthode de requête est GET
        return redirect('/login')
           
    return render_template('login.html', error_message=error_message)



if __name__ == '__main__':
    app.run(debug=True)
