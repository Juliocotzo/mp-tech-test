import './App.css';
import Locations from "./Locations/Locations";
import { Col, Container, Nav, Row } from "react-bootstrap";
function App() {
  return (
    <div className="App">
        <Nav
            activeKey="/"
            className="navbar navbar-dark bg-dark"
        >
            <Nav.Item>
                <Nav.Link href="/" disabled>Ministerio Publico</Nav.Link>
            </Nav.Item>
        </Nav>
        <Container className="mt-4">
            <Row>
                <Col xs={1}>

                </Col>
                <Col xs={10}>
                    <Locations></Locations>
                </Col>
                <Col xs={1}>

                </Col>
            </Row>
        </Container>

    </div>
  );
}

export default App;
