import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function Location(props) {
  const [locationName, setLocationName] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [locationPhone, setLocationPhone] = useState("");
  const [locationAddress, setLocationAddress] = useState("");

  const addLocation = () => {
    const data = {
      locationName,
      locationDescription,
      locationPhone,
      locationAddress,
    };
    axios
      .post("http://localhost:8080/api/locations", data)
      .then((response) => {
        props.handleAccept();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (props.id) {
      const locationDescription = props.row.locationDescription
        ? props.row.locationDescription
        : "";
      setLocationName(props.row.locationName);
      setLocationDescription(locationDescription);
      setLocationPhone(props.row.locationPhone);
      setLocationAddress(props.row.locationAddress);
    }
  }, [props.id]);

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.id ? "Editar Fiscalia" : "Agregar Fiscalia"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Descripcion"
                value={locationDescription}
                onChange={(e) => setLocationDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Teléfono"
                value={locationPhone}
                onChange={(e) => setLocationPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ubicación"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cerrar
          </Button>
          {props.id ? (
            <Button variant="primary" onClick={() => addLocation()}>
              Editar
            </Button>
          ) : (
            <Button variant="primary" onClick={() => addLocation()}>
              Agregar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Location;
