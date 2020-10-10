/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import data from 'data/data.json';
import idList from 'data/ID.json';
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

const ImageData = new FormData();

// default url 'http://127.0.0.1:5000/prediction/'
const backendURL = 'http://127.0.0.1:5000/prediction/';

class AddUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data,
      idList,
      isLoading: false,
      isChanging: true,
      formPatients:{
        patientsPhoto: require('data/default.jpg')
      },
      formData: {
        type: "add",
        _id: this.newIDfunction(),
        index: 0,
        age: 0,
        name: "",
        sex: "1",
        cp: 0,
        trestbps: 0,
        chol: 0,
        fbs: 0,
        restecg: 0,
        thalach: 0,
        exang: 0,
        oldpeak: 0,
        slope: 0,
        ca: 0,
        thal: 0,
        reportdate:new Date().getUTCDate()+ 
        "-"+ (new Date().getUTCMonth() + 1)+ 
        "-" + new Date().getUTCFullYear()
      },
      imgUpload: "",
      saveState: true
    };

    this.imageSelect = this.imageSelect.bind(this)
   
  }

  componentDidMount () {
    if(sessionStorage.getItem("saveState")){
      this.notify("tc");
      sessionStorage.clear();
    }
  }

  newIDfunction (){
    var existFlag = 0;
    var newID = "";

    for( var i = 0; i< idList.length; i++){
      if(idList[i].isActive == 1){
        for ( var j = 0; j < data.length; j++){
          if (data[j]._id == idList[i]._id){
            existFlag = 1;
            break;
          }
        }
        if (existFlag == 0){
          newID = idList[i]._id;
          break;
        }
        else{
          existFlag = 0;
        }
      }
    }
    return newID;
  }

  resetScreen = (event) => {
    event.preventDefault();
    this.setState({
      formPatients:{
        patientsPhoto: require('data/default.jpg')
      },
      formData: {
        type: "add",
        _id: this.newIDfunction(),
        index: 0,
        age: 0,
        name: "",
        sex: "1",
        cp: 0,
        trestbps: 0,
        chol: 0,
        fbs: 0,
        restecg: 0,
        thalach: 0,
        exang: 0,
        oldpeak: 0,
        slope: 0,
        ca: 0,
        thal: 0,
        reportdate:new Date().getUTCDate()+ 
        "-"+ (new Date().getUTCMonth() + 1)+ 
        "-" + new Date().getUTCFullYear()
      },
      isChanging: true
    })
  }

  imageSelect(event) {

    ImageData.append('file', event.target.files[0]);
    ImageData.append('filename', this.state.formData._id + ".jpg");

    this.setState({
      formPatients:{
        patientsPhoto: URL.createObjectURL(event.target.files[0])
      }
     })
    this.handleChange(event);
  }

  saveButtonClicked = (event) =>{
    
    const formData = this.state.formData;
    this.setState({ isLoading: true });

    fetch(backendURL,
    {
      method: 'POST',
      body: ImageData
    });

    fetch(backendURL,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        sessionStorage.setItem('saveState', true);
        this.setState({
          saveState: sessionStorage.getItem('saveState')
        });
      });
  }

  handleChange = (event) => {
    sessionStorage.clear();
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    //const isChanging = this.state.isChanging;
    if(name !== "file")
      formData[name] = value;
    this.setState({
      formData,
      isChanging: false
    });
  }

  notify = place => {
    var type = "success"
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <b>Kayıt Başarılı!</b> Yeni Hasta Sisteme Kaydedildi.
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-check-2",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
    };

  render() {
    const formPatients = this.state.formPatients;
    const formData = this.state.formData;
    const isChanging = this.state.isChanging;
    var fbs;
    var exang;

    var sepalLengths = []
    for (var i = 4; i <= 7; i = +(i + 0.1).toFixed(1)) {
      sepalLengths.push(<option key = {i} value = {i}>{i}</option>);
    }
    var sepalWidths = []
    for (i = 2; i <= 4; i = +(i + 0.1).toFixed(1)) {
      sepalWidths.push(<option key = {i} value = {i}>{i}</option>);
    }
    var cp = []
    for (i = 0; i <= 3; i = i +1){
      cp.push(<option key = {i} value = {i}>{i}</option>);
    }

    var restecg = []
    for (i = 0; i <= 2; i = i +1){
      restecg.push(<option key = {i} value = {i}>{i}</option>);
    }

    var slope = []
    for (i = 0; i <= 2; i = i +1){
      slope.push(<option key = {i} value = {i}>{i}</option>);
    }

    var ca = []
    for (i = 0; i <= 4; i = i +1){
      ca.push(<option key = {i} value = {i}>{i}</option>);
    }

    var thal = []
    for (i = 0; i <= 3; i = i +1){
      thal.push(<option key = {i} value = {i}>{i}</option>);
    }

    var oldPeak = []
    for (i = 0.0; i <= 7; i = +(i + 0.1).toFixed(1)) {
      oldPeak.push(<option key = {i} value = {i}>{i}</option>);
    }
  
    return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">HASTAYA AİT BİLGİLER</h5>
                </CardHeader>
                <CardBody>
                <Form>
                    <Row>
                      <Col className="pr-md-1" md="4">
                      <FormGroup>
                          <label>Hastanın Adı ve Soyadı</label>
                          <Input
                            type="text"
                            name ="name"
                            value = {formData.name}
                            onChange = {this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                      <FormGroup>
                          <label>Hastanın Yaşı</label>
                          <Input
                            type="number"
                            name ="age"
                            value = {formData.age}
                            min = "0"
                            max = "130"
                            pattern = "[0-9]"
                            onChange = {this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                      <FormGroup>
                          <label>Hastanın Cinsiyeti</label>
                          <Input
                            name= "sex"
                            value = {formData.sex}
                            onChange={this.handleChange}
                            type="select">
                            <option value = "1" >Erkek</option>
                            <option value = "0" >Kadın</option>
                            </Input>
                  
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                      <FormGroup>
                          <label>
                            Hastanın Göğüs Ağrısı Tipi
                          </label>
                          <Input type="select"
                                 value = {formData.cp}
                                 name = "cp"
                                 onChange = {this.handleChange}>
                                 {cp}
                                 </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                      <FormGroup>
                          <label>Hastanın Dinlenme Kan Basıncı</label>
                          <Input
                            name = "trestbps"
                            value = {formData.trestbps}
                            min = "0"
                            max = "250"
                            pattern = "[0-9]"
                            type="number"
                            onChange = {this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                      <FormGroup>
                          <label>Hastanın Serum Kolestrol Değeri</label>
                          <Input
                            name = "chol"
                            type="number"
                            value = {formData.chol}
                            min = "0"
                            max = "600"
                            pattern = "[0-9]"
                            onChange = {this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                      <FormGroup>
                          <label>
                            Hastanın Açlık Kan Şekeri (120 md/dl)
                          </label>
                          <Input type="select"
                                 value = {formData.fbs}
                                 name = "fbs"
                                 onChange = {this.handleChange}>
                                  {fbs}
                                  <option value = "1">Yüksek</option>
                                  <option value = "0">Düşük</option>
                                 </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                      <FormGroup>
                          <label>Hastanın Dinlenme Elektrokardiyografik Değeri</label>
                          <Input type="select"
                                 value = {formData.restecg}
                                 name = "restecg"
                                 onChange = {this.handleChange}>
                                 {restecg}
                                 </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                      <FormGroup>
                          <label>Hastanın En Yüksek Kalp Atış Hızı</label>
                          <Input
                            type="number"
                            name ="thalach"
                            value = {formData.thalach}
                            min = "0"
                            max = "250"
                            pattern = "[0-9]"
                            onChange = {this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                      <FormGroup>
                          <label>Hastanın Egzersize Bağlı Anjiyosu</label>
                          <Input type="select"
                                 value = {formData.exang}
                                 name = "exang"
                                 onChange = {this.handleChange}>
                                 {exang}
                                 <option value = "1">Var</option>
                                 <option value = "0">Yok</option>
                                 </Input>
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                      <FormGroup>
                          <label>Hastanın Egzersize Bağlı Deprasyon Değeri</label>
                          <Input type="select"
                                 value = {formData.oldpeak}
                                 name = "oldpeak"
                                 onChange = {this.handleChange}>
                                 {oldPeak}
                                 </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                      <FormGroup>
                          <label>Hastanın Pik Egzersiz Segmentinin Eğimi</label>
                          <Input type="select"
                                 value = {formData.slope}
                                 name = "slope"
                                 onChange = {this.handleChange}>
                                 {slope}
                                 </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                      <FormGroup>
                          <label>Hastanın Büyük Damar Sayısı</label>
                          <Input type="select"
                                 value = {formData.ca}
                                 name = "ca"
                                 onChange = {this.handleChange}>
                                 {ca}
                                 </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                      <FormGroup>
                          <label>Hastanın THAL Değeri</label>
                          <Input type="select"
                                 value = {formData.thal}
                                 name = "thal"
                                 onChange = {this.handleChange}>
                                 {thal}
                                 </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                      <label>Fotoğraf Ekleyin</label>
                  <Input type="file" 
                         name="file" 
                         id="exampleFile" 
                         onChange={this.imageSelect}
                         style={{marginTop: 5}}
                         ref={(ref) => { this.uploadInput = ref; }}
                         />
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                <Button 
                          className="btn-fill" 
                          size="sm"
                          name = "resetButton"
                          color="warning" 
                          type= "submit"
                          disabled={isChanging}
                          onClick={this.resetScreen}
                          >
                          {<i className="tim-icons icon-refresh-01" style={{marginBottom: 4, marginRight: 5}}/>}
                    {" Ekranı Sıfırla"}
                  </Button>
                  
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                  
                      <img
                        alt="Hastanın Fotoğrafı"
                        className="avatar"
                        src= {formPatients.patientsPhoto}
                        style={{border:"solid", borderRadius: 20,
                        borderColor: formData.sex === '1' ? "#1e88e5" : "#ff77a9"}}
                      />
                      <h5 className="title" style={{fontSize: "25px"}} >{formData.name}</h5>
                    
                    <p className="description">
                    {"Yaş: "}{formData.age}</p>
                    <p className="description">
                    {"Rapor Tarihi: "}{formData.reportdate}
                    </p>
                    <p className="description">{"ID: "}{formData._id}</p>
                  </div>
                </CardBody>
                <CardFooter>
                <Button block 
                          color= {"info"} 
                          className="btn-fill"  
                          type="submit"
                          onClick={this.saveButtonClicked}
                          disabled={isChanging}
                          >       
                         Hastayı Kaydet
                  </Button>
                </CardFooter>
              </Card>
            </Col>
       
          </Row>
       
        </div>
       
      </>
    );
  }
}

export default AddUser;
