# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.ensemble import RandomForestClassifier
from sklearn.externals import joblib

np.random.seed(123) #ensure reproducibility
pd.options.mode.chained_assignment = None

data = pd.read_csv("./heart.csv")


y = data.target.values
x = data.drop(['target'], axis = 1)

X_train, X_test, y_train, y_test = train_test_split(x, y, test_size = 0.20, random_state = 2)


classifier = RandomForestClassifier(n_estimators=1000, random_state=100)
classifier.fit(X_train, y_train)


prediction = classifier.predict(X_test)

print("Confusion Matrix:")
cm_test = confusion_matrix(prediction, y_test)

prediction_train = classifier.predict(X_train)
cm_train = confusion_matrix(prediction_train, y_train)

joblib.dump(classifier, 'classifier.joblib')

print('Accuracy for training set for Random Forest = {}'.format((cm_train[0][0] + cm_train[1][1])/len(y_train)))
print('Accuracy for test set for Random Forest = {}'.format((cm_test[0][0] + cm_test[1][1])/len(y_test)))
