import json
from pathlib import Path

data_folder = Path("/home/mumtaz/Documents/Project ATLAS/ui/src/data")
file_to_open = data_folder / "data.json"
id_to_open = data_folder / "ID.json"

def insertDataFunc(formData):
    
    usedID = formData['_id']
    formData.pop('type', None)

    with open(file_to_open,"a", encoding='utf-8') as f:
        json.dump(formData, f,separators=(',', ': '), ensure_ascii=False, indent=4)
    
    f.close()
    parser = json.JSONDecoder()
    parsed = []
    with open (file_to_open) as f:
        data = f.read()

    head = 0
    while True:
        head = (data.find('{', head) + 1 or data.find('[', head) + 1) - 1
        
        try:
            struct, head = parser.raw_decode(data, head)
            parsed.append(struct)
        except (ValueError, json.JSONDecodeError):
            break
    parsed = sorted(parsed, key=lambda d: d["name"])
    parsed = indexFix(parsed)  
    #print(json.dumps(parsed, indent = 2))
    with open(file_to_open,"w", encoding='utf-8') as f:
        json.dump(parsed, f, separators=(",",":"), ensure_ascii= False, indent = 4)
        
    f.close()
    changeStatus(usedID)

def indexFix(data):
    index = 1
    for x in data:
        x['index'] = index
        index += 1

    return data

def changeStatus(usedID):
    with open(id_to_open) as f:
        idData = f.read()
    
    idData = json.loads(idData)
    f.close()
    for x in idData:
        if x['_id'] == usedID:
            x['isActive'] = 0
            break

    with open(id_to_open,"w", encoding='utf-8') as f:
        json.dump(idData, f, separators=(",",":"), ensure_ascii= False, indent = 4)

    f.close()
