import React, { useEffect, useState } from "react";

import temperaturaService from "../../services/temperatura.service";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CInput,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import { Modal } from "react-bootstrap";
const Temperaturas = () => {
  const [temperaturas, setTemperaturas] = useState([]);
  const [show, setShow] = useState(false);
  const [cedula, setCedula] = useState(0);
  const [loading, setLoading] = useState(false);
  const [temperatura, setTemperatura] = useState("");
  const traerTemperaturas = async () => {
    const response = await temperaturaService.getTemperaturas();
    setTemperaturas(response.data);
  };
  const medirTemp = async () => {
    setLoading(true);
    const response = await temperaturaService.createTemperatura(cedula);
    if (response.data.temperatura) {
      setTemperatura(response.data.temperatura);
    } else {
      setTemperatura(response.data.message);
    }

    setLoading(false);
    traerTemperaturas();
  };
  useEffect(() => {
    traerTemperaturas();
    // eslint-disable-next-line
  }, []);
  console.log();
  return (
    <div>
      <CCard>
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <div>Temperaturas</div>
          <div>
            <CButton
              color="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              Medir Temperatura
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            responsive
            outlined
            hover
            itemsPerPage={10}
            tableFilter
            sorter
            items={temperaturas}
            fields={["funcionario", "cedula", "temperatura", "timestamp"]}
            scopedSlots={{
              funcionario: (item) => (
                <td>
                  {item?.funcionario?.nombre +
                    " " +
                    item?.funcionario?.apellido}
                </td>
              ),
              cedula: (item) => <td>{item?.funcionario?.cedula}</td>,
              temperatura: (item) => <td>{item.temperatura} °C</td>,
              timestamp: (item) => (
                <td>
                  {new Date(item.createdAt).toLocaleDateString("es-PY", {
                    hour: "numeric",
                    minute: "numeric",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              ),
            }}
            pagination
            clickableRows
          />
        </CCardBody>
      </CCard>
      <Modal show={show}>
        <Modal.Header>Marca de temperatura</Modal.Header>
        <Modal.Body>
          <CForm>
            <CFormGroup row>
              <CCol xs="12">
                <CLabel>
                  Ingrese Cedula o acerque su tarjeta de identificación
                </CLabel>
              </CCol>
              <CCol>
                <CInput
                  name="cedula"
                  type="number"
                  value={cedula}
                  onChange={(e) => {
                    setCedula(e.target.value);
                  }}
                />
              </CCol>
            </CFormGroup>
          </CForm>
          <div className="text-center">
            {loading && (
              <span className="spinner-border spinner-border-lg mx-1"></span>
            )}
            {temperatura &&
              typeof temperatura === "number" &&
              `Su temperatura es ${temperatura}`}

            {temperatura && (
              <div className="form-group">
                <div
                  className={`alert alert-${
                    temperatura < 37 ? "success" : "danger"
                  }`}
                >
                  {typeof temperatura !== "string"
                    ? temperatura < 37
                      ? "Normal"
                      : "Peligro"
                    : temperatura}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <CButton
            color="secondary"
            onClick={() => {
              setShow(false);
              setTemperatura("");
              setLoading(false);
              setCedula(0);
            }}
          >
            Cancelar
          </CButton>
          <CButton onClick={medirTemp} color="primary">
            Guardar
          </CButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Temperaturas;
