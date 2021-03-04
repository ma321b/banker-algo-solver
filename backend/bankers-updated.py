import string

def parse_str_list(input_lst):
    # convert list of strings to ints:
    return [int(x) for x in input_lst]


numProcesses = int(input('How many processes? '))
print()
resTypes = int(input('How many resource types? '))
print()

alphabets = list(string.ascii_uppercase) # list of alphabets


print('Please enter the values requested below separated by a space')
print()

avail_val = str(input('--- AVAILABLE values for resources? '))
available = parse_str_list(avail_val.split(' '))

allocation = []
need = []
max_res = []


for i in range(numProcesses):
    print()
    print('###### Values for the Process P' + str(i) + ' ######')
    print() 
    res_vals = str(input('ALLOCATION values for resources? '))
    allocation.append(parse_str_list(res_vals.split(' ')))
    max_vals = str(input('MAX values for resources? '))
    max_res.append(parse_str_list(max_vals.split(' ')))

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
                # print('i values is' + str(i))
                # print('j value is: ' + str(j))
                # print('need is ' + str(need[i]))
                # print('available is ' + str(available))
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
