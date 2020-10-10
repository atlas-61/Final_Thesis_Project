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
// nodejs library that concatenates classes
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import data from 'data/data.json';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartExample2,
  chartExample3,
  chartExample4,
  chartExample5
} from "variables/charts.js";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    sessionStorage.clear();
    this.state = {
      json: [],
      patientInfo:{
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
      },
      rowIndex: -1
    };
  }

  componentDidMount() {
    this.setState((prevState) => {
        return {
            json: data,
          
        }
    })
    chartExample2.data = {
      labels: ["CINSIYET", "CP", "FBS", "RESTECG", "EXANG", "OLDPEAK","SLOPE","CA","THAL"],
      datasets:
      [{
        label: " ",
        fill: true,
        backgroundColor: "rgba(66,165,245,0.3)",
        borderColor: "#1f8ef1",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#1f8ef1",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [0,0,0,0,0,0,0,0,0]}]};

        chartExample5.data = {
          labels: ["YAŞ", "TRESTBPS", "CHOL", "THALACH"],
          datasets:
          [{
            label: " ",
            fill: true,
            backgroundColor: "rgba(66,165,245,0.3)",
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [0,0,0,0]}]};

};

selectRow = (index) =>{

  chartExample2.data = {
    labels: ["CINSIYET", "CP", "FBS", "RESTECG", "EXANG", "OLDPEAK","SLOPE","CA","THAL"],
    datasets:
    [{
      label: " ",
      fill: true,
      borderColor: "#1f8ef1",
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBackgroundColor: "#1f8ef1",
      pointBorderColor: "rgba(255,255,255,0)",
      pointHoverBackgroundColor: "#1f8ef1",
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
      data: [
        data[index].sex,
        data[index].cp,
        data[index].fbs,
        data[index].restecg,
        data[index].exang,
        data[index].oldpeak,
        data[index].slope,
        data[index].ca,
        data[index].thal
      ]}]};

      chartExample5.data = {
        labels: ["YAŞ", "TRESTBPS", "CHOL", "THALACH"],
        datasets:
        [{
          label: " ",
          fill: true,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [
            data[index].age,
            data[index].trestbps,
            data[index].chol,
            data[index].thalach
          ]}]};

  this.setState({
    patientInfo:{
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
      thal: data[index].thal
    },
    rowIndex: index
  })
  
};

  render() {

    const patientInfo = this.state.patientInfo;
    const rowIndex = this.state.rowIndex;

    return (
      <>
        <div className="content">
          <Row>
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-badge" />{" Hastanın Adı: "}
                    <b>{patientInfo.name}</b>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">
                  <i className="tim-icons icon-alert-circle-exc" />
                    {" Alttaki Grafikler İdeal Değerlerdir"}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample5.data}
                      options={chartExample5.options}
                    />
                  </div>
                </CardBody>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">{"Kayıtlı Hasta Listesi "}</CardTitle>
                </CardHeader>
                <div style={{
                      maxHeight: '350px',
                      overflowY: 'auto'
                        }}>
                <CardBody>
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
                                <tr key={i} onClick={() => this.selectRow(data.index - 1)} 
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
                </CardBody>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
