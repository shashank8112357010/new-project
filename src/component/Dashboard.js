
import React, { useEffect ,useMemo  } from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import axios from "axios"

let chartExample1 = {}
let chartExample3 = {}

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [options, setoptions] = React.useState();
  const [labels, setlabels] = React.useState();
  const [datasets, setdatasets] = React.useState();
  const [data, setdata] = React.useState([]);
  const [changechart, setchangechart] = React.useState(1);
  const [bardata, setbardata] = React.useState();



  const setBgChartData = (name) => {
    setbigChartData(name);
  };


  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/chart_options`).then((res) => {
        return setoptions(res?.data[0])
      })
      axios.get(`http://localhost:3000/chartdata`).then((response) => {
        return setdata(response.data)
      })
    } catch (error) {
      console.log(error);
    }
  }, [changechart])




  useEffect(() => {
    setBgChartData("data" + changechart)
    if (data && data.length > 0) {
      let temp = data.filter(element => {
        return element.id == changechart
      })
      const obj = temp[0]
      setlabels(obj.labels)
      setdatasets(obj.datasets)
    }
    chartExample1 = {
      data1: (canvas) => {
        let ctx = canvas.getContext("2d");
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)");
        return {
          labels: labels,
          datasets: datasets,
        };
      },
      data2: (canvas) => {
        let ctx = canvas.getContext("2d");
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)");
        return {
          labels: labels,
          datasets: datasets,

        };
      },
      data3: (canvas) => {
        let ctx = canvas.getContext("2d");
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)");
        return {
          labels: labels,
          datasets: datasets,

        };
      },
      options: options
    };

  }, [data, options, labels, datasets, changechart])




  useEffect(() => {
    axios.get(`http://localhost:3000/barchartdata`).then((res) => {
      return setbardata(res.data)
    })
  }, [])


  useEffect(() => {
    if (bardata != null) {
      chartExample3 = {
        data: (canvas) => {
          let ctx = canvas.getContext("2d");
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
          gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
          gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
          gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
          return {
            labels: bardata[0].labels,
            datasets: bardata[0].datasets
          };
        },

      };
    }
  }, [bardata])


  return (
    <>
      <div className="content">
        <Row>
          <Col xs="10" lg={10} md={10}>
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Shipments</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1"
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => { setchangechart(1) }}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2"
                        })}
                        onClick={() => { setchangechart(2) }}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3"
                        })}
                        onClick={() => { setchangechart(3) }}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Daily Sales</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  3,500€
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
