from flask import Flask, render_template

app = Flask(__name__)

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
