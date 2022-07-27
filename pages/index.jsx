import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Alert,
  Badge,
} from "react-bootstrap";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { fetchDataStates, fetchDataCityFromServer } from "../utils/fetch";

export default function Home() {
  const [state, setState] = useState("Jakarta");
  const [dataCity, setDataCity] = useState();
  const [dataStates, setDataStates] = useState();

  const [isLoading, setLoading] = useState(true);
  const [isStatus, setStatus] = useState("");

  useEffect(() => {
    // Get Data from LocaStorage
    const localStates = JSON.parse(localStorage.getItem("states"));
    const localCity = JSON.parse(localStorage.getItem("cityStates"));
    
    if (localStates === null) {
      console.log("LocalStorage[states] null -> fetch server");
      fetchDataStates().then((data) => {
        localStorage.setItem("states", JSON.stringify(data));
        setDataStates(data);
      });
    } else {
      console.log("LocalStorage[states] -> localstorage");
      setDataStates(localStates);
    }

    const fetchDataCity = () => {
      fetchDataCityFromServer(state).then((data) => {
        if (data.status === "success") {
          if (localCity === null) {
            const localDataCity = [
              {
                state: state,
                data: data.data,
              },
            ];
            localStorage.setItem("cityStates", JSON.stringify(localDataCity));
          } else {
            const localDataCity = [
              ...localCity,
              {
                state: state,
                data: data.data,
              },
            ];
            localStorage.setItem("cityStates", JSON.stringify(localDataCity));
          }

          const stateDataCity = {
            state: state,
            data: data.data,
          };

          setDataCity(stateDataCity);
          setStatus("");
          setLoading(false);
        } else if (data.status === "fail") {
          setStatus(data.data.message);
        } else {
          setStatus(data.data.message);
        }
      });
    };

    if (localCity === null) {
      console.log("LocalStorage[cityStates] null -> fetch server");
      fetchDataCity();
    } else {
      console.log("LocalStorage[cityStates] -> localstorage -> Find city in LocalStorage");
      const searchCityInLocalStorage = localCity.find(
        (local) => local.state === state
      );
      if (searchCityInLocalStorage) {
        console.log("Find city in LocalStorage");
        setDataCity(searchCityInLocalStorage);
        setLoading(false);
        setStatus("");
      } else {
        console.log("Di local storage belum ada fetch server");
        fetchDataCity();
      }
    }
  }, [state]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <Container>
        <main className="mt-5">
          <h1>Air Quality in Indonesia</h1>
          <p>Air quality index (AQI) and PM2.5 air pollution in Jakarta</p>
          <Card className="shadow-sm">
            <Card.Body>
              <h3>Overview</h3>
              <p>How polluted is Indonesia?</p>
              <p>2021 Air quality average</p>
              <Card>
                <Alert variant="warning">
                  <div className="d-flex justify-content-between">
                    <h4>Moderate</h4>
                    <p>
                      2021 average US AQI{" "}
                      <Badge bg="warning" text="dark">
                        97
                      </Badge>
                    </p>
                  </div>
                </Alert>
                <Card.Body>
                  <Row>
                    <Col>
                      <p>2021 Indonesia cleanest city</p>
                      <p>2021 Indonesia most polluted city</p>
                    </Col>
                    <Col>
                      <p>
                        Indralaya, South Sumatra{" "}
                        <Badge bg="success" text="white">
                          17
                        </Badge>
                      </p>
                      <p>
                        Jakarta, Jakarta{" "}
                        <Badge bg="danger" text="white">
                          110
                        </Badge>
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
          <Row className="mt-3">
            <Col>
              <Card>
                <Card.Body>
                  <h3>State in Indonesia</h3>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataStates.status === "success" ? (
                        dataStates.data.map((state, index) => (
                          <tr
                            style={{ cursor: "pointer" }}
                            onClick={() => setState(state.state)}
                            key={index}
                          >
                            <td>{index + 1}</td>
                            <td>{state.state}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2}>Status Fail: Too Many Requests</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <h3>City in State {state}</h3>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>City</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataCity.data.map((city, index) => (
                        <Link
                          href={`/${city.city}?state=${dataCity.state}`}
                          key={index}
                        >
                          <tr style={{ cursor: "pointer" }}>
                            <td>{index + 1}</td>
                            <td>{city.city}</td>
                          </tr>
                        </Link>
                      ))}
                    </tbody>
                  </Table>
                  <Badge
                    bg={isStatus ? "warning" : "success"}
                    text={isStatus ? "black" : "white"}
                  >
                    Info : {isStatus ? `Error: ${isStatus}` : "Sukses"}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </main>
      </Container>
    </>
  );
}