from flask import Flask, request
app = Flask(__name__)


@app.route('/banker', methods=['POST'])
def calculate():
    req_data = request.get_json()
    



    return "Hello World!"

if __name__ == '__main__':
    app.run()
