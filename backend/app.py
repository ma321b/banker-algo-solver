from flask import Flask, request, make_response, render_template
import flask
app = Flask(__name__)


@app.route('/')
def welcome_page():
    return render_template('../frontend/index.html')

@app.route('/banker', methods=['POST', 'OPTIONS'])
def calculate():
    if request.method == 'OPTIONS': # for fixing CORS errors, allow requests from everywhere
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response
    req_data = request.get_json()
    allocation = req_data['allocation']
    available = req_data['available']
    max_res = req_data['maxm']
    need = []
    numProcesses = len(allocation)

    # calculate need values:
    for i in range(len(allocation)):
        need_i = []
        for j in range(len(allocation[i])):
            need_i.append(max_res[i][j] - allocation[i][j])
        need.append(need_i)

    f_list = [False for i in range(numProcesses)]

    processOrder = []
    while True:
        changed = False
        for i in range(len(f_list)):
            if not f_list[i]:
                allLesserOrEqual = True
                for j in range(len(need[i])):
                    if need[i][j] > available[j]:
                        allLesserOrEqual = False
                if allLesserOrEqual:
                    intermediate_list = []
                    for x in range(len(available)):
                        for y in range(len(allocation[i])):
                            if x == y:
                                intermediate_list.append(available[x] + allocation[i][y])
                    available = intermediate_list 
                    f_list[i] = True
                    processOrder.append('->P' + str(i))
                    changed = True
        if not changed:
            break

    isTrueFList = True
    for i in range(len(f_list)):
        if not f_list[i]:
            isTrueFList = False
            break

    finalResult = ''
    if isTrueFList:
        finalResult +=  'Safe state; Process order: '
    else:
        finalResult += 'UNSAFE STATE; Process order: '

    for i in processOrder:
        finalResult += i
    print(finalResult)
    response = flask.jsonify({"result": finalResult})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run()
