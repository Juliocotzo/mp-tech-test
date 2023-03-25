import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function Location(props) {
  const [locationName, setLocationName] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [locationPhone, setLocationPhone] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [validate, setValidate] = useState({
    locationName: false,
    locationPhone: false,
    locationAddress: false,
  });

  const validateDataValue = (value, property) => {
    const validateObject = validate;
    if (value) {
      validateObject[property] = false;
    } else {
      validateObject[property] = true;
    }
    setValidate(validateObject);
  };

  const validateData = () => {
    const validateData = {
      locationName: false,
      locationPhone: false,
      locationAddress: false,
    };
    if (!locationName) {
      validateData.locationName = true;
    } else {
      validateData.locationName = false;
    }
    if (!locationPhone) {
      validateData.locationPhone = true;
    } else {
      validateData.locationPhone = false;
    }
    if (!locationAddress) {
      validateData.locationAddress = true;
    } else {
      validateData.locationAddress = false;
    }
    setValidate(validateData);
    for (const property in validateData) {
      if (validateData[property] == true) {
        return true;
      }
    }
    return false;
  };

  const addLocation = () => {
    const data = {
      locationName,
      locationDescription,
      locationPhone,
      locationAddress,
    };

    if (!validateData()) {
      axios
        .post("http://localhost:8080/api/locations", data)
        .then(() => {
          props.handleAccept();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const editLocation = () => {
    const data = {
      locationName,
      locationDescription,
      locationPhone,
      locationAddress,
    };
    if (!validateData()) {
      axios
        .put(`http://localhost:8080/api/locations/${props.id}`, data)
        .then(() => {
          props.handleAccept();
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
                onChange={(e) => {
                  setLocationName(e.target.value);
                  validateDataValue(e.target.value, "locationName");
                }}
                isInvalid={validate.locationName}
              />
              <Form.Control.Feedback type="invalid">
                Este campo es requerido
              </Form.Control.Feedback>
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
                onChange={(e) => {
                  setLocationDescription(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Teléfono"
                value={locationPhone}
                onChange={(e) => {
                  setLocationPhone(e.target.value);
                  validateDataValue(e.target.value, "locationPhone");
                }}
                isInvalid={validate.locationPhone}
              />
              <Form.Control.Feedback type="invalid">
                Este campo es requerido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ubicación"
                value={locationAddress}
                onChange={(e) => {
                  setLocationAddress(e.target.value);
                  validateDataValue(e.target.value, "locationAddress");
                }}
                isInvalid={validate.locationAddress}
              />
              <Form.Control.Feedback type="invalid">
                Este campo es requerido
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cerrar
          </Button>
          {props.id ? (
            <Button variant="primary" onClick={() => editLocation()}>
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
