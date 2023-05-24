from flask import Flask, jsonify, request, render_template
import psycopg2
from flask_cors import CORS

conn = psycopg2.connect(
host="localhost",
database="ipdb",
user="postgres",
password="1111"
)
conn.autocommit=True
cur = conn.cursor()

app = Flask(__name__)
CORS(app, origins='http://localhost:3000',http='http://localhost:3000')

cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['POST'])
def save_review():
    data = request.get_json()
    feedback_type = data["feedback_type"]
    contact_info = data["contact_info"]
    review = data["review"]
    rating = data["rating"]
    cur.execute(
    f'''
    INSERT INTO public.reviews(
        feedback_type, contact_info, review, rating)
        VALUES ( '{feedback_type}', '{contact_info}', '{review}', {rating});
    ''' )
    return jsonify({'message': 'Отзыв/вопрос сохранен. Каждый клиент важен для нас!','status': 200}), 200
@app.route('/login', methods=[ 'POST'])
def get_data():
     # получение данных от клиента
    username = request.json.get('username')
    password = request.json.get('password')

    # сверка данных с данными в базе данных
    cur.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    user = cur.fetchone()

    if user:
        # если данные верны, возвращаем ответ с кодом 200
        return jsonify({'message': 'Login successful','status': 200, 'user': user}), 200
    else:
        # если данные неверны, возвращаем ответ с кодом 401
        return jsonify({'message': 'Invalid username or password','status': 401}), 401

@app.route('/dashboard', methods=['GET', 'POST'])
def post_data():
    if request.method=='GET':
        id = request.args['id']
        cur.execute(f'''SELECT * FROM users WHERE id={id}''')
        keys = [d[0] for d in cur.description]
        values = cur.fetchone()
        user=None
        if values:
            user = dict(zip(keys, values))
        if user:
            # если данные верны, возвращаем ответ с кодом 200
            return jsonify({
                'message': 'Login successful','status': 200, 'user': user}), 200
        else:
            # если данные неверны, возвращаем ответ с кодом 401
            return jsonify({
                'message': 'Invalid id','status': 401}), 401
    if request.method=='POST':
        user = request.json.get('user')
        print(user)
        cur.execute(f'''UPDATE users 
        SET username='{user['username']}',
        password='{user['password']}',
        first_name='{user['first_name']}',
        last_name='{user['last_name']}',
        about='{user['about']}'
        WHERE id={user['id']}''')
        return jsonify({
                'message': 'Login successful','status': 200, 'user': user})
@app.route('/signup', methods=['POST'])
def make_data():
    user = request.json.get('user')
    print(user)
    cur.execute(f'''SELECT * FROM users WHERE email='{user['email']}' OR username='{user['username']}';''')
    if cur.fetchone():
        return jsonify({
                'message': 'User with this email or username is exist','status': 401})
    cur.execute(f'''Insert into users(email,username,password,first_name,last_name,about) VALUES(
        '{user['email']}',
        '{user['username']}',
        '{user['password']}',
        '{user['first_name']}',
        '{user['last_name']}',
        '{user['about']}')
        ''')
    cur.execute("SELECT * FROM users WHERE username=%s AND password=%s", (user['username'], user['password']))
    keys = [d[0] for d in cur.description]
    values = cur.fetchone()
    user=None
    if values:
        user = dict(zip(keys, values))
        print(user)
        
    return jsonify({
                'message': 'Sign up successful','status': 200, 'user': user})





if __name__ == '__main__':
    app.run()