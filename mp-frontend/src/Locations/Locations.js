import { Table } from "react-bootstrap";
import { FaPen, FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Location from "./Location";
import React, { useEffect, useState } from "react";
import LocationDelete from "./LocationDelete";
import { ClipLoader } from "react-spinners";
import axios from "axios";

function Locations() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [row, setRow] = useState({
    locationName: "",
    locationDescription: "",
    locationPhone: "",
    locationAddress: "",
  });

  const [modalDelete, setModalDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const getLocations = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/locations")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLocations();
  }, []);

  const handleShow = (id, row) => {
    setModal(true);
    setShow(true);
    setId(id);
    setRow(row);
  };
  const handleClose = () => {
    setShow(false);
    setModal(false);
    setId(null);
    setRow({});
  };

  const handleAccept = () => {
    setShow(false);
    setModal(false);
    setId(null);
    setRow({});
    getLocations();
  };

  const handleShowModalDelete = (id) => {
    setModalDelete(true);
    setShowModalDelete(true);
    setId(id);
  };
  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
    setModalDelete(false);
    setId(null);
  };

  const handleAcceptModalDelete = () => {
    setShowModalDelete(false);
    setModalDelete(false);
    setId(null);
    getLocations();
  };

  return (
    <div>
      <h1 className="text-start">Fiscalias </h1>
      <div className="text-end">
        <Button
          variant="outline-primary"
          onClick={() => handleShow(null, {})}
          disabled={loading}
        >
          Agregar
        </Button>{" "}
      </div>

      <div className="text-center">
        <ClipLoader loading={loading} size={75}></ClipLoader>
      </div>
      {!loading ? (
        <Table striped bordered hover className="mt-2">
          <thead>
            <tr>
              <th width={"5%"}>#</th>
              <th width={"20%"}>Nombre</th>
              <th width={"25%"}>Descripcion</th>
              <th width={"15%"}>Telefono</th>
              <th width={"20%"}>Ubicacion</th>
              <th width={"15%"}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((location) => {
              return (
                <tr key={location.locationId}>
                  <td>{location.locationId}</td>
                  <td>{location.locationName}</td>
                  <td>{location.locationDescription}</td>
                  <td>{location.locationPhone}</td>
                  <td>{location.locationAddress}</td>
                  <td>
                    <Button
                      variant="outline-warning"
                      onClick={() =>
                        handleShow(location.locationId, {
                          locationName: location.locationName,
                          locationDescription: location.locationDescription,
                          locationPhone: location.locationPhone,
                          locationAddress: location.locationAddress,
                        })
                      }
                    >
                      <FaPen />
                    </Button>{" "}
                    <Button
                      variant="outline-danger"
                      onClick={() => handleShowModalDelete(location.locationId)}
                    >
                      <FaTimes />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : null}
      {modal ? (
        <Location
          show={show}
          handleClose={handleClose}
          handleAccept={handleAccept}
          id={id}
          row={row}
        ></Location>
      ) : null}
      {modalDelete ? (
        <LocationDelete
          show={showModalDelete}
          handleClose={handleCloseModalDelete}
          handleAccept={handleAcceptModalDelete}
          id={id}
        ></LocationDelete>
      ) : null}
    </div>
  );
}

export default Locations;
