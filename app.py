from flask import Flask
from flask import render_template, request, redirect, session, jsonify

app = Flask(__name__)
app.secret_key = 'ws_st001/per/st'


#########
# Login #
#########
@app.route("/")
def index():
    return redirect("/login")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/login", methods=['POST'])
def login_log():
    _user = request.form["User"]
    _pass = request.form["Passw"]
    from static.db import sql
    _sql = "SELECT PASSW, NOMBRE1, APELLIDO1 FROM USUARIOS WHERE  USUARIO = ?"
    parm = (_user.upper(),)
    _usuario = sql.USUARIOS(_sql,parm,'Q')
    if _usuario:
        if _pass == _usuario[0]:
            session["login"] = True
            session["User"] = f"{_usuario[1]} {_usuario[2]}"
            return redirect("/natura-viva/inicio")
        else:
            return render_template("login.html", error="Contraseña incorrectas")
    else:
        return render_template('login.html', error="Credenciales incorrectas")

@app.route("/recuperar_contrasena", methods=['POST'])
def recuperar_contrasena():
    data = request.get_json()
    user = data.get('user')
    dni = data.get('dni')

    # Aquí deberías consultar tu base de datos para verificar el usuario y DNI
    from static.db import sql
    _sql = "SELECT PASSW FROM USUARIOS WHERE USUARIO = ? AND DNI = ?"
    parm = (user.upper(), dni)
    _usuario = sql.USUARIOS(_sql, parm, 'Q')

    if _usuario:
        return jsonify({'existe': True, 'contrasena': _usuario[0]})  # Retorna la contraseña
    else:
        return jsonify({'existe': False})

@app.route('/login/cerrar')
def login_close():
    session.clear()
    return redirect('/')

############
# Registro #
############
@app.route("/registro")
def registro():
    return render_template("registro.html")

@app.route("/registro", methods=['POST'])
def registro_log():
    _DNI       = request.form['dni']
    _user      = request.form['user']
    _nombre1   = request.form['nombre1']
    _nombre2   = request.form['nombre2']
    _apellido1 = request.form['apellido1']
    _apellido2 = request.form['apellido2']
    _fecnac    = request.form['fecnac']
    _telefono  = request.form['tel']
    _passw     = request.form['passw']
    _passwr    = request.form['passwr']
    if  _passw == _passwr:
        _user,_nombre1,_nombre2,_apellido1,_apellido2 = _user.upper(),_nombre1.upper(),_nombre2.upper(),_apellido1.upper(),_apellido2.upper()
        from static.db import sql
        parm = (_DNI,_user,_nombre1,_nombre2,_apellido1,_apellido2,_fecnac,_telefono,_passw)
        _sql = 'INSERT INTO USUARIOS (DNI, USUARIO, NOMBRE1,NOMBRE2,APELLIDO1,APELLIDO2,FECNAC,TEL,PASSW,STAT,TUSER) VALUES(?,?,?,?,?,?,?,?,?,"H","US")'
        sql.USUARIOS(_sql,parm,'I')
        return redirect("/login")
    else:
        return render_template('registro.html', errorpass='Las contraseñas no coinciden')

################
# Validaciones #
################
@app.route('/validar_dni', methods=['POST'])
def validar_dni():
    _DNI = request.json.get('dni')  
    from static.db import sql
    existe_dni = sql.USUARIOS("SELECT * FROM USUARIOS WHERE DNI = ?", (_DNI,), 'Q')
    if existe_dni:
        return jsonify({'existe': True})  
    else:
        return jsonify({'existe': False}) 

@app.route('/validar_usuario', methods=['POST'])
def validar_usuario():
    _user = request.json.get('user')
    from static.db import sql
    existe_us = sql.USUARIOS("SELECT * FROM USUARIOS WHERE USUARIO = ?", (_user.upper(),), 'Q')
    if existe_us:
        return jsonify({'existe': True})
    else:
        return jsonify({'existe': False})


#################
# .. WebSite ,, #
#################
@app.route("/natura-viva/inicio")
def inicio():
    if not 'login' in session:
        return redirect('/')
    return render_template('website/index.html')

@app.route("/natura-viva/nosotros")
def nosotros():
    if not 'login' in session:
        return redirect('/')    
    return render_template('website/nosotros.html')

@app.route("/natura-viva/productos")
def productos():
    if not 'login' in session:
        return redirect('/')
    return render_template('website/productos.html')

@app.route("/natura-viva/recetas")
def recetas():
    if not 'login' in session:
        return redirect('/')
    return render_template('website/recetas.html')

@app.route("/natura-viva/blog")
def blog():
    if not 'login' in session:
        return redirect('/')
    return render_template('website/Blog.html')








# Run
if __name__ == "__main__":
    app.run(debug=True)
