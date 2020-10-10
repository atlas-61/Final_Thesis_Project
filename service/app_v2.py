# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
#from sklearn.externals import joblib
import numpy as np
import sys
import warnings
import joblib
import json
from insertData import insertDataFunc
from imageUpload import fileUpload
from editData import editData
warnings.filterwarnings("ignore")

flask_app = Flask(__name__)
app = Api(app = flask_app,
		  version = "1.0",
		  title = "Heart Disease Analyze",
		  description = "Predict the patients disease.")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params',
				 {'age': fields.Float(required = True,
				  							   description="Patients age",
    					  				 	help="Cannot be blank"),
				  'sex': fields.Float(required = True,
				  							   description="Patients sex",
    					  				 	help="Cannot be blank"),
				  'cp': fields.Float(required = True,
				  							description="Chest pain",
    					  				 	help="Cannot be blank"),
				  'trestbps': fields.Float(required = True,
				  							description="Resting blood pressure",
    					  				 	help="Cannot be blank"),
                  		  'chol': fields.Float(required = True,
				  							description="Serum cholestoral",
    					  				 	help="Cannot be blank"),
                  		  'fbs': fields.Float(required = True,
				  							description="Fasting blood sugar",
    					  				 	help="Cannot be blank"),
                  		  'restecg': fields.Float(required = True,
				  							description="Resting electrocardiographic results ",
    					  				 	help="Cannot be blank"),

                  		  'thalach': fields.Float(required = True,
				  							description="Maximum heart rate",
    					  				 	help="Cannot be blank"),

                  		  'exang': fields.Float(required = True,
				  							description="Exercise induced angina",
    					  				 	help="Cannot be blank"),

                  		  'oldpeak': fields.Float(required = True,
				  							description="ST depression",
    					  				 	help="Cannot be blank"),


                  		  'slope': fields.Float(required = True,
				  							description="The slope of the peak exercise",
    					  				 	help="Cannot be blank"),

                  		  'ca': fields.Float(required = True,
				  							description="Number of major vessels",
    					  				 	help="Cannot be blank"),


                  		  'thal': fields.Float(required = True,
				  							description="Thal value",
    					  				 	help="Cannot be blank")})

classifier = joblib.load('classifier.joblib')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)
	def post(self):
		try:
			if len(request.form) != 0: #image upload stage
				fileUpload()
			else:
				formData = request.json
				if len(formData) == 13: #prediction stage
					data = [val for val in formData.values()]
					prediction = classifier.predict(np.array(data).reshape(1, -1))
					types = { 0: "Hasta Değil", 1: "Hasta"}
					resultID = {0: "False", 1: "True"}
					response = jsonify({
						"statusCode": 200,
						"status": "Değerlendirme tamamlandı!",
						"result": types[prediction[0]],
						"resultID": resultID[prediction[0]]
						})
					response.headers.add('Access-Control-Allow-Origin', '*')
					return response
				else:
					if formData['type'] == "add":  #insert new patients stage
						insertDataFunc(formData)
						response = jsonify({
							"statusCode": 200,
							"status": "Yeni Hasta Kaydedildi!",
							})
						response.headers.add('Access-Control-Allow-Origin', '*')
						return response
					else: #edit patients data stage
						editData(formData)
						response = jsonify({
							"statusCode": 200,
							"status": "Hasta Kaydı Düzenlendi!",
							})
						response.headers.add('Access-Control-Allow-Origin', '*')
						return response

		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Değerlendirme yapılamadı!",
				"error": str(error)
			})
