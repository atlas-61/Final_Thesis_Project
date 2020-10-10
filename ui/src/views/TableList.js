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
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
  Button,
  CardFooter
} from "reactstrap";

// default url 'http://127.0.0.1:5000/prediction/'
const backendURL = 'http://127.0.0.1:5000/prediction/';

class Tables extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        json: [],
        patientInfo:{
          type: "fix",
          _id: "",
          index: 0,
          name: "",
          age: "",
          sex: "",
          cp: "",
          trestbps: "",
          chol: "",
          fbs: "",
          restecg: "",
          thalach: "",
          exang: "",
          oldpeak: "",
          slope: "",
          ca: "",
          thal: "",
          reportdate: ""
        },
        editing: true,
        rowIndex: -1,
        isChanging: true,
        editState: true
    }
}

componentDidMount() {
    this.setState((prevState) => {
        return {
            json: data
          
        }
    })
    if(sessionStorage.getItem("editState")){
      this.notify("tc");
      sessionStorage.clear();
    }
}

editOption = (event) =>{
  if(this.state.editing){
    this.setState({
      editing: false
    })
  }
  else{
    this.setState({
      editing: true,
      isChanging: true
    })
  }
  
}

handleChange = (event) => {
  sessionStorage.clear();
  const value = event.target.value;
  const name = event.target.name;
  var patientInfo = this.state.patientInfo;
  //const isChanging = this.state.isChanging;
    patientInfo[name] = value;
  this.setState({
    patientInfo,
    isChanging: false
  });
}

selectRow = (index) =>{
  
  this.setState({
    patientInfo:{
      type: "fix",
      _id: data[index]._id,
      index: data[index].index,
      name: data[index].name,
      age: data[index].age,
      sex: data[index].sex,
      cp: data[index].cp,
      trestbps: data[index].trestbps,
      chol: data[index].chol,
      fbs: data[index].fbs,
      restecg: data[index].restecg,
      thalach: data[index].thalach,
      exang: data[index].exang,
      oldpeak: data[index].oldpeak,
      slope: data[index].slope,
      ca: data[index].ca,
      thal: data[index].thal,
      reportdate: new Date().getUTCDate()+ 
      "-"+ (new Date().getUTCMonth() + 1)+ 
      "-" + new Date().getUTCFullYear()
    },
    rowIndex: index
  })
  
}

handleEditClick = (event) => {
  const patientInfo = this.state.patientInfo;
  
  fetch(backendURL,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(patientInfo)
    })
    .then(response => response.json())
    .then(response => {
      sessionStorage.setItem('editState', true);
      this.setState({
        editState: sessionStorage.getItem('editState'),
        editing: true,
        rowIndex: -1,
        isChanging: true
      });
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
          <b>Düzenleme Başarılı!</b> Hastaya Ait Bilgiler Düzenlendi.
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
    const numberofPersons = data.length;
    const patientInfo = this.state.patientInfo;
    const editing = this.state.editing;
    const rowIndex = this.state.rowIndex;
    const isChanging = this.state.isChanging;

    var i;
    var fbs;
    var exang;
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
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                  {<i className="tim-icons icon-single-02" style={{marginBottom: 4, marginRight: 5}}/>}
                  {" Sistemde Kayıtlı Hastalar "}
                  {"/ Kayıtlı Hasta Sayısı: "}<b style={{color:"#00c853"}} >{numberofPersons}</b>
                  </CardTitle>    
                </CardHeader>
                <CardBody>
                <div style={{
                      maxHeight: '530px',
                      overflowY: 'auto'
                        }}>
                  <Table className="tablesorter"  hover>
                    <thead className="text-primary" style={{textAlign:"center"}}>
                      <tr>
                        <th>Sıra</th>
                        <th>ID</th>
                        <th>İsim</th>
                        <th>Yaş</th>
                        <th>Cinsiyet</th>
                        <th>Cp</th>
                        <th>Trestbps</th>
                        <th>Chol</th>
                        <th>Fbs</th>
                        <th>Restecg</th>
                        <th>Thalach</th>
                        <th>Exang</th>
                        <th>Oldpeak</th>
                        <th>Slope</th>
                        <th>Ca</th>
                        <th>Thal</th>
                        <th>Rapor Tarihi</th>
                      </tr>
                    </thead>
                    <tbody style={{textAlign:"center"}}>
                    {this.state.json.map((data, i) => {
                      var gender;
                      var fastBS;
                      var exangValue;
                      if(data.sex == 1)
                        gender = "Erkek";
                      else
                        gender = "Kadın";
                      if(data.fbs == 0)
                        fastBS =  "Düşük";
                      else
                        fastBS = "Yüksek";
                      if(data.exang == 0)
                        exangValue =  "Yok";
                      else
                        exangValue = "Var";     
                            return (
                                <tr key={i} onClick={editing ? () => this.selectRow(data.index - 1) : ""} 
                                style={{backgroundColor: rowIndex === (data.index - 1) ? "#338a3e" : "",
                                color: rowIndex === (data.index - 1) ? "#00e676" : ""}}>
                                    <th scope= "row">{data.index}</th>
                                    <td>{data._id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.age}</td>
                                    <td>{gender}</td>
                                    <td>{data.cp}</td>
                                    <td>{data.trestbps}</td>
                                    <td>{data.chol}</td>
                                    <td>{fastBS}</td>
                                    <td>{data.restecg}</td>
                                    <td>{data.thalach}</td>
                                    <td>{exangValue}</td>
                                    <td>{data.oldpeak}</td>
                                    <td>{data.slope}</td>
                                    <td>{data.ca}</td>
                                    <td>{data.thal}</td>
                                    <td>{data.reportdate}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                  </Table>
                  </div>
                </CardBody>
                <CardFooter>
                  <Row>
                    <Col className="pr-md-1" md="1">
                    <label>YAŞ</label>
                <Input
                           type="number"
                           name ="age"
                           value = {patientInfo.age}
                           disabled={editing}
                           onChange = {this.handleChange}
                         />
                   </Col>
                      <Col className="pr-md-1" md="1">
                      <label>CP</label>
                          <Input type="select"
                                 value = {patientInfo.cp}
                                 name = "cp"
                                 disabled={editing}
                                 onChange = {this.handleChange}>
                                 {cp}
                                 </Input>
                      </Col>
                      <Col className="pr-md-1" md="1">
                      <label>TRESTBPS</label>
                      <Input
                            name = "trestbps"
                            value = {patientInfo.trestbps}
                            min = "0"
                            max = "250"
                            pattern = "[0-9]"
                            type="number"
                            disabled={editing}
                            onChange = {this.handleChange}
                          />
                      </Col>
                      <Col className="pr-md-1" md="1">
                      <label>CHOL</label>
                      <Input
                            name = "chol"
                            type="number"
                            value = {patientInfo.chol}
                            min = "0"
                            max = "600"
                            pattern = "[0-9]"
                            disabled={editing}
                            onChange = {this.handleChange}
                          />
                      </Col>
                      <Col className="pr-md-1" md="1">
                      <label>FBS</label>
                      <Input type="select"
                                 value = {patientInfo.fbs}
                                 name = "fbs"
                                 disabled={editing}
                                 onChange = {this.handleChange}>
                                  {fbs}
                                  <option value = "1">Yüksek</option>
                                  <option value = "0">Düşük</option>
                                 </Input>
                      </Col>
                      <Col className="pr-md-1" md="1">
                    <label>RESTECG</label>
                    <Input type="select"
                                 value = {patientInfo.restecg}
                                 name = "restecg"
                                 disabled={editing}
                                 onChange = {this.handleChange}
                                 >
                                 {restecg}
                                 </Input>
                    </Col>
                    <Col className="pr-md-1" md="1">
                      
                          <label>THALACH</label>
                          <Input
                            type="number"
                            name ="thalach"
                            value = {patientInfo.thalach}
                            min = "0"
                            max = "250"
                            pattern = "[0-9]"
                            disabled={editing}
                            onChange = {this.handleChange}
                          />
                        
                      </Col>
                      <Col className="pr-md-1" md="1">
                  
                          <label>EXANG</label>
                          <Input type="select"
                                 value = {patientInfo.exang}
                                 name = "exang"
                                 disabled={editing}
                                 onChange = {this.handleChange}>
                                 {exang}
                                 <option value = "1">Var</option>
                                 <option value = "0">Yok</option>
                                 </Input>
                       
                      </Col>
                      <Col className="px-md-1" md="1">
                      
                          <label>OLDPEAK</label>
                          <Input type="select"
                                 value = {patientInfo.oldpeak}
                                 name = "oldpeak"
                                 disabled={editing}
                                 onChange = {this.handleChange}>
                                 {oldPeak}
                                 </Input>
                        
                      </Col>
                      <Col className="pl-md-1" md="1">
                      
                          <label>SLOPE</label>
                          <Input type="select"
                                 value = {patientInfo.slope}
                                 name = "slope"
                                 disabled={editing}
                                 onChange = {this.handleChange}>
                                 {slope}
                                 </Input>
                        
                      </Col>
                      <Col md="1">
                      
                          <label>CA</label>
                          <Input type="select"
                                 value = {patientInfo.ca}
                                 name = "ca"
                                 disabled={editing}
                                 onChange = {this.handleChange}>
                                 {ca}
                                 </Input>
                        
                      </Col>
                      <Col md="1">
                      
                          <label>THAL</label>
                          <Input type="select"
                                 value = {patientInfo.thal}
                                 name = "thal"
                                 disabled={editing}
                                 onChange = {this.handleChange}>
                                 {thal}
                                 </Input>
                        
                      </Col>
                  </Row>
                  
                    <div className="td-actions text-right">
                    <Button 
                          size="sm" 
                          color= {"info"} 
                          className="btn-fill"  
                          type="submit"
                          style={{marginTop: 15}}
                          disabled={isChanging}
                          onClick={this.handleEditClick}
                          >     
                         {" Kaydet"}
                  </Button>
                  </div>
                 
                
                 <div className="td-actions text-right">
                 <Button  
                      color="link"
                      id="tooltip636901683"
                      title=""
                      type="button"
                      onClick={this.editOption}
                      disabled={rowIndex === -1 ? true:false}
                      style={{color: editing ? "#58a5f0":"#ff3d00"}}
                            >
                      <i className={editing ? "tim-icons icon-pencil" : "tim-icons icon-simple-remove"} 
                      style={{marginBottom: 4, marginRight: 5}}/>
                     { editing ? " Hasta Bilgilerini Düzenlemek İçin Tıklayın" : "İptal Et"}
                    </Button>
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

export default Tables;
