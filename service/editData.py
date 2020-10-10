import json
from pathlib import Path

data_folder = Path("/home/mumtaz/Documents/Project ATLAS/ui/src/data")
file_to_open = data_folder / "data.json"

def editData(formData):

    formData.pop('type', None)
    
    with open(file_to_open) as f:
        data = f.read()
    
    data = json.loads(data)
    f.close()
    
    for x in data:
        if x["_id"] == formData["_id"]:
            x["age"] = formData["age"]
            x["cp"] = formData["cp"]
            x["trestbps"] = formData["trestbps"]
            x["chol"] = formData["chol"]
            x["fbs"] = formData["fbs"]
            x["restecg"] = formData["restecg"]
            x["thalach"] = formData["thalach"]
            x["exang"] = formData["exang"]
            x["oldpeak"] = formData["oldpeak"]
            x["slope"] = formData["slope"]
            x["ca"] = formData["ca"]
            x["thal"] = formData["thal"]
            x["reportdate"] = formData["reportdate"]
            break
    
    with open (file_to_open, "w", encoding="utf-8") as f:
        json.dump(data, f, separators=(",",":"), ensure_ascii= False, indent = 4)
        
    f.close()