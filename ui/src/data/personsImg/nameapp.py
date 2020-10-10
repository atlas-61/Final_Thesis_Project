import os

index = 1

f = open("femaleID.txt", "r")


for i in range(98):
    mystring = str(f.readline())
    mystring = mystring.replace('\n', '').replace('\r', '')   
    os.rename(r'./' + str(index) + '.jpg',
              r'./' + str(mystring) + '.jpg')
    index+= 1

#%%
index = 1
mystring = str(f.readline())
mystring = mystring.replace('\n', '').replace('\r', '')   
os.rename(r'./' + str(index) + '.jpg',
              r'./' + str(mystring) + '.jpg')
#%%
f.close()