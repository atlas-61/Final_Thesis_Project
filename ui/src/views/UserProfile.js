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

// default url 'http://127.0.0.1:5000/prediction/'
const backendURL = 'http://127.0.0.1:5000/prediction/';

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    sessionStorage.clear();
    this.state = {
      data,
      isLoading: false,
      isChanging: true,
      isResultReady: true,
      formPatients:{},
      formData: {
        age: data[0].age,
        sex: data[0].sex,
        cp: data[0].cp,
        trestbps: data[0].trestbps,
        chol: data[0].chol,
        fbs: data[0].fbs,
        restecg: data[0].restecg,
        thalach: data[0].thalach,
        exang: data[0].exang,
        oldpeak: data[0].oldpeak,
        slope: data[0].slope,
        ca: data[0].ca,
        thal: data[0].thal
      },
      resultID: "",
      result: ""
    };
    
  }

  componentDidMount(){

    try {
      const path = require('data/personsImg/'+data[0]._id+'.jpg')
      this.setState({
        formPatients:{
          patientsPhoto: path,
          name: data[0].name,
          db_age: data[0].age,
          id: data[0]._id,
          reportdate: data[0].reportdate,
          resetIndex: 1
        }
      });
    }
    catch(err) {
      this.setState({
        formPatients:{
          patientsPhoto: require('data/default.jpg'),
          name: data[0].name,
          db_age: data[0].age,
          id: data[0]._id,
          reportdate: data[0].reportdate,
          resetIndex: 1
        }});
    }

      return
  }

  imageExist(value){
    try {
     const path = require('data/personsImg/'+data[value]._id+'.jpg');
    }
    catch(err) {
     return require('data/default.jpg');
    }
      return require('data/personsImg/'+data[value]._id+'.jpg');
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
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
        this.setState({
          result: response.result,
          isLoading: false,
          isResultReady: false,
          resultID: response.resultID
        });
      });
  }


  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    //const isChanging = this.state.isChanging;
    formData[name] = value;
    this.setState({
      formData,
      isChanging: false,
      isResultReady: true
    });
  }

  handleCancelClick = (event) => {
    event.preventDefault();
    this.setState({ result: "", isResultReady: true});
  }

  selectChange = (event) => {
    event.preventDefault();
    //const isChanging = this.state.isChanging;
    var formData = this.state.formData;
    var formPatients = this.state.formPatients;
    var result = this.state.result;

    for( var j = 0; j< data.length; j++){
      if(data[j].index == event.target.value){
        formData.age = data[j].age
        formData.sex = data[j].sex
        formData.cp = data[j].cp
        formData.trestbps = data[j].trestbps
        formData.chol = data[j].chol
        formData.fbs = data[j].fbs
        formData.restecg = data[j].restecg
        formData.thalach = data[j].thalach
        formData.exang = data[j].exang
        formData.oldpeak = data[j].oldpeak
        formData.slope = data[j].slope
        formData.ca = data[j].ca
        formData.thal = data[j].thal
        formPatients.patientsPhoto = this.imageExist(j)
        formPatients.name = data[j].name
        formPatients.db_age = data[j].age
        formPatients.id = data[j]._id
        formPatients.reportdate = data[j].reportdate
        formPatients.resetIndex = event.target.value
        result = ""

        j = data.length;
      }
    }
    this.setState({
      formData,
      isChanging: true,
      isResultReady: true,
      result
    });
}


  render() {

    const formData = this.state.formData;
    const isLoading = this.state.isLoading;
    const isChanging = this.state.isChanging;
    const formPatients = this.state.formPatients;
    const resultID = this.state.resultID;
    const isResultReady = this.state.isResultReady;
    const result = this.state.result;
    var fbs;
    var exang;

    var patientsData = []
    var i;
  
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
    this.state.data.map((value) => {
      patientsData.push(<option key = {value.index} value = {value.index} >{value.name}</option>);
    })

    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">TAHLİL DEĞERLERİ</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="4">
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
                      <Col className="px-md-1" md="4">
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
                      <Col className="pl-md-1" md="4">
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
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
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
                      <Col className="pl-md-1" md="4">
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
                    </Row>
                    <Row>
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
                      <Col md="4">
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
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
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
                      <Col className="px-md-1" md="4">
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
                      <Col className="pl-md-1" md="4">
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
                    </Row>
                    <Row>
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
                      <Button block 
                          className="btn-fill" 
                          size="sm"
                          style = {{marginTop: 30}}
                          name = "resetButton"
                          color="warning" 
                          type= "submit"
                          disabled={isChanging}
                          value = {formPatients.resetIndex}
                          onClick={this.selectChange}>
                          {<i className="tim-icons icon-refresh-01" style={{marginBottom: 4, marginRight: 5}}/>}
                    {" Değerleri Eski Haline Getir"}
                  </Button>
                      </Col>
                      <Col md="4">
                      <Button block 
                          className="btn-fill" 
                          size="sm"
                          style = {{marginTop: 30}}
                          color="warning" 
                          type= "submit"
                          disabled={isResultReady}
                          onClick={this.handleCancelClick}>
                          {<i className="tim-icons icon-trash-simple" style={{marginBottom: 4, marginRight: 5}}/>}
                    {" Tahlil Sonucunu Temizle"}
                  </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button block 
                          className="btn-fill" 
                          color="info" 
                          type="submit"
                          disabled={isLoading}
                          onClick={!isLoading ? this.handlePredictClick : null}>
                          { isLoading ? <i className="tim-icons icon-sound-wave" style={{marginBottom: 4, marginRight: 5}}/>:
                          <i className="tim-icons icon-atom" style={{marginBottom: 4, marginRight: 5}}/> }
                    { isLoading ? ' Değerlendiriliyor...' : ' Tahlil Sonuçlarını Değerlendir' }
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
                        name = "patientsPhoto"
                        className="avatar"
                        src= {formPatients.patientsPhoto}
                        style={{border:"solid", borderRadius: 20,
                        borderColor: isResultReady ? '#cfcfcf' : resultID === "False" ? "#18ffff" : "#b71c1c"}}
                      />
                      <h5 className="title" style={{fontSize: "25px"}} >{formPatients.name}</h5>
                    <p className="description">
                    {"Yaş: "}{formPatients.db_age}</p>
                    <p className="description">
                    {"Rapor Tarihi: "}{formPatients.reportdate}
                    </p>
                    <p className="description">
                    {"ID: "}{formPatients.id}</p>
                    <Button block 
                          style = {{marginTop: 20}}
                          color= {isResultReady ? 'secondary' : resultID === "False" ? "success" : "danger"} 
                          className="btn-fill"  
                          type="submit"
                          disabled={isResultReady}>
                    { isResultReady ? 'Tahlil Sonucu' : result }
                  </Button>
                   
                  </div>
                  
                </CardBody>
                <CardFooter>
                <p className="description">
                    Hastayı Seçiniz</p>
                  <div className="button-container">
                  <Input type="select"
                         name = "patientsData"
                         onChange = {this.selectChange}>
                         {patientsData}
                         </Input>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
