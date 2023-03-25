import { Table } from "react-bootstrap";
import { FaPen, FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Location from "./Location";
import React, { useEffect, useState } from "react";
import LocationDelete from "./LocationDelete";
import { ClipLoader } from "react-spinners";

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

  useEffect(() => {
    const dataRequest = () => {
      setData([
        {
          locationId: 1,
          locationName: "Guatemala",
          locationDescription:
            "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
          locationPhone: "2410-2541",
          locationAddress: "Guatemala Zona 1",
        },
        {
          locationId: 2,
          locationName: "Guatemala 2",
          locationDescription:
            "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
          locationPhone: "2410-2541",
          locationAddress: "Guatemala Zona 2",
        },
      ]);
      setLoading(false);
    };

    setTimeout(dataRequest, 2000);
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
          id={id}
          row={row}
        ></Location>
      ) : null}
      {modalDelete ? (
        <LocationDelete
          show={showModalDelete}
          handleClose={handleCloseModalDelete}
          id={id}
        ></LocationDelete>
      ) : null}
    </div>
  );
}

export default Locations;
