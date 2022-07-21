import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Container,
  Card,
  Alert,
  Badge,
  Table,
} from "react-bootstrap";

export default function Post() {
  const router = useRouter();
  const { slug } = router.query;

  const [dataCity, setDataCity] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isStatus, setStatus] = useState(false);
  const [errMessage, setErrMessage] = useState();
  // const { slug } = props;
  // console.log(props.slug);

  useEffect(() => {
    if (!router.isReady) return;

    const localStates = JSON.parse(localStorage.getItem("city"));
    console.log(localStates);

    const fetchData = () => {
      console.log("Fetch ke server dengan limit 10")
      fetch(
        `http://api.airvisual.com/v2/city?city=${slug}&state=West Java&country=Indonesia&key=cb3eb68e-15d1-43e6-9f3d-7f56101373ae`
      )
        .then((res) => res.json())
        .then((data) => {

          console.log(data);
          if (data.status === "success") {
            if (localStates === null) {
              console.log("Menambah data kota pertama ke localstorage")
              const localDataCity = [
                {
                  city: slug,
                  data: data.data,
                },
              ];
              localStorage.setItem("city", JSON.stringify(localDataCity));
            } else {
              console.log("Menambah data kota ke localstorage ")
              const localDataCity = [
                ...localStates,
                {
                  city: slug,
                  data: data.data,
                },
              ];
              localStorage.setItem("city", JSON.stringify(localDataCity));
            }
            
            const stateDataCity = {
              city: slug,
              data: data.data,
            }
          
            setDataCity(stateDataCity);
            setLoading(false);
          } else if (data.status === "fail") {
            setLoading(false)
            setStatus(true)
            setErrMessage(data.data.message);
          } else {
            setLoading(false)
            setStatus(true)
            setErrMessage(data.data.message);
          }
          
        });
    };

    if (localStates === null) { // Jika Localstorage masih belum ada
      console.log("Localstorage masih belum ada")
      fetchData();
    } else { // Jika Localstorage sudah ada
      console.log("Localstorage sudah ada")
      const searchCity = localStates.find(local => local.city === slug);
      if (searchCity) { // Di local storage ada sesuai slug
        console.log("Di local storage ada sesuai slug")
        setDataCity(searchCity)
        setLoading(false);
      } else { // fetch jika tidak ada
        console.log("Di local storage belum ada fetch server")
        fetchData()
      }
    }


  }, [router.isReady]);

  console.log(dataCity);

  const airPollutionLevel = (level) => {
    if (level >= 150) {
      return "Unhealthy"
    } else if (level >= 100) {
      return "Unhealthy For Sensitive Groups"
    } else if (level >= 50) {
      return "Good"
    }
  }

  const colorAirPollutionLevel = (level) => {
    if (level >= 150) {
      return "danger"
    } else if (level > 50) {
      return "warning"
    } else if (level > 0) {
      return "success"
    }
  }

  const showFormattedDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
    return new Date(date).toLocaleDateString("id-ID", options)
  }

  if (isLoading) return <p className="text-center">Loading...</p>;
  
  if (isStatus) return (
    <Container className="text-center mt-5">
      <Badge bg="warning" text="black"><h2>Fetch Failed: {errMessage}</h2></Badge>
    </Container>
  );

  return (
    <>
      <Container className="mt-5">
        <h1>Quality Air near {dataCity.city}, {dataCity.data.country}</h1>
        <p>Air quality index (AQI) and PM2.5 air pollution near, {dataCity.city}</p>
        <Row className="mt-3">
          <Col sm={3}>
            <Card>
              <Card.Body>
                <h3>Cuaca</h3>
                <p>Cuaca di sekitar {slug}</p>
              
              <Table striped bordered hover responsive>
                <tbody>
                  {dataCity ? (
                    <>
                      <tr>
                        <td>Temperature</td>
                        <td>{dataCity.data.current.weather.tp}°C</td>
                      </tr>
                      <tr>
                        <td>Humidity</td>
                        <td>{dataCity.data.current.weather.hu}%</td>
                      </tr>
                      <tr>
                        <td>Wind</td>
                        <td>{dataCity.data.current.weather.wd}</td>
                      </tr>
                      <tr>
                        <td>Pressure</td>
                        <td>{dataCity.data.current.weather.pr} mb</td>
                      </tr>
                    </>
                ) : (
                  <tr>
                    <td colSpan={2}>Status Fail: Too Many Requests</td>
                  </tr>
                )}
                </tbody>
                
              </Table>
              <small>Updated : {showFormattedDate(dataCity.data.current.weather.ts)}</small>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Alert variant={colorAirPollutionLevel(dataCity.data.current.pollution.aqius)}>
                <Row>
                  <Col sm={2}>
                    <p>US AQI </p>
                    <Badge bg={colorAirPollutionLevel(dataCity.data.current.pollution.aqius)} text="dark">
                      <h1>{dataCity.data.current.pollution.aqius}</h1>
                    </Badge>
                  </Col>
                  <Col>
                    <p>LIVE AQI INDEX</p>
                    <h2>Unhealthy</h2>
                  </Col>
                </Row>
              </Alert>
              <Card.Body>
                <h3>Overview</h3>
                <p>What is the current air quality next {slug}</p>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Air pollution level</th>
                      <th>Air quality index</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{airPollutionLevel(dataCity.data.current.pollution.aqius)}</td>
                      <td>{dataCity.data.current.pollution.aqius} US AQI</td>
                    </tr>
                  </tbody>
                </Table>
                <small>Updated : {showFormattedDate(dataCity.data.current.pollution.ts)}</small>
                <h3 className="mt-3">Health Recomendations</h3>
                <p>How to protect from air pollution in {slug}?</p>
                <Row>
                  <Col>
                    <ul>
                      <li>Wear a mask outdoors</li>
                      <li>Close your windows to avoid dirty outdoor air</li>
                    </ul>
                  </Col>
                  <Col>
                    <ul>
                      <li>Run an air puriffier</li>
                      <li>Avoid outdoor</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}