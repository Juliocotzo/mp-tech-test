import { Button, Modal } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";

function LocationDelete(props) {
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Fiscalia</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <FaExclamationTriangle size={"75px"} />
          <h4 className="heading mt-4">Eliminar Fiscalia</h4>
          <p>¿Está seguro de que desea eliminar esta Fiscalia?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            {" "}
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LocationDelete;
