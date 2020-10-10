import os
from flask import Flask, flash, request, redirect, url_for, session
from flask_cors import CORS, cross_origin

UPLOAD_FOLDER = '/home/mumtaz/Documents/Project ATLAS/ui/src/data/personsImg'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
app.secret_key = os.urandom(24)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER)
    file = request.files['file']
    filename = request.form['filename']
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    response="Image Uploading Done"
    return response

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",use_reloader=False)

CORS(app, expose_headers='Authorization')