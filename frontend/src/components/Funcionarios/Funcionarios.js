import React, { useEffect, useState } from "react";

import funcionarioService from "../../services/funcionario.service";

import _ from "lodash";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CModal,
  CLabel,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CCol,
  CForm,
  CFormGroup,
  CInput,
} from "@coreui/react";

const Funcionarios = () => {
  const empty = {
    nombre: "",
    apellido: "",
    cedula: 0,
    rfid: "",
    cargo: "",
    departamento: "",
    password: "",
  };

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [CRUD, setCRUD] = useState("create");
  const [funcionario, setFuncionario] = useState(empty);
  const [funcionarios, setFuncionarios] = useState([]);
  const changeHandler = (e) => {
    setFuncionario({ ...funcionario, [e.target.name]: e.target.value });
  };

  const agregarFuncionario = () => {
    funcionarioService
      .createFuncionario(funcionario)
      .then((response) => {
        setMessage(response.data.message);
        traerFuncionarios();
      })
      .catch((error) => setMessage(error.response.data.message));
  };
  const updateFuncionario = async () => {
    const response = await funcionarioService.updateFuncionario(
      funcionario.cedula,
      funcionario
    );
    setMessage(response.data.message);
    traerFuncionarios();
  };
  const editFuncionario = (e) => {
    setCRUD("Actualizar");
    setFuncionario(_.omit(e, ["updatedAt", "createdAt", "__v"]));
    setShow(true);
  };
  const traerFuncionarios = async () => {
    const response = await funcionarioService.getFuncionarios(
      funcionario.id_empresa
    );
    setFuncionarios(response.data);
  };
  const deleteFuncionario = async (id) => {
    await funcionarioService.deleteFuncionario(funcionario.cedula);
    setFuncionario(empty);
    setShow(false);
    traerFuncionarios();
  };
  useEffect(() => {
    traerFuncionarios();
    // eslint-disable-next-line
  }, []);
  console.log();
  return (
    <div>
      <CCard>
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <div >Funcionarios</div>
          <div>
            <div>
              <CButton
                color="secondary"
                onClick={(e) => {
                  setShow(true);
                  setCRUD("Guardar");
                  setFuncionario(empty);
                }}
              >
                Agregar Funcionario
              </CButton>
            </div>
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
            onRowClick={editFuncionario}
            items={funcionarios}
            fields={[
              "nombre",
              "apellido",
              "cedula",
              "departamento",
              "cargo",
              "rfid",
            ]}
            pagination
            clickableRows
          />
        </CCardBody>
      </CCard>
      <CModal
        show={show}
        onClose={() => {
          setShow(false);
          setMessage("");
          setFuncionario({});
        }}
      >
        <CModalHeader>
          <div>Información Básica</div>
          {CRUD === "Actualizar" && (
            <CButton
              color="link"
              className="text-danger"
              shape="square"
              size="sm"
              onClick={(e) => {
                deleteFuncionario(funcionario.cedula);
              }}
            >
              Eliminar
            </CButton>
          )}
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormGroup row>
              <CCol xs="12">Nombre</CCol>
              <CCol>
                <CInput
                  name="nombre"
                  value={funcionario.nombre}
                  onChange={changeHandler}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="12">Apellido</CCol>
              <CCol>
                <CInput
                  name="apellido"
                  value={funcionario.apellido}
                  onChange={changeHandler}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="12">
                <CLabel>Cedula</CLabel>
              </CCol>
              <CCol>
                <CInput
                  name="cedula"
                  type="number"
                  value={funcionario.cedula}
                  onChange={changeHandler}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="12">
                <CLabel>Departamento</CLabel>
              </CCol>
              <CCol>
                <CInput
                  name="departamento"
                  value={funcionario.departamento}
                  onChange={changeHandler}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol xs="12">
                <CLabel>Cargo</CLabel>
              </CCol>
              <CCol>
                <CInput
                  name="cargo"
                  value={funcionario.cargo}
                  onChange={changeHandler}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol xs="12">
                <CLabel>RFID</CLabel>
              </CCol>
              <CCol>
                <CInput
                  name="rfid"
                  value={funcionario.rfid}
                  onChange={changeHandler}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="12">
                <CLabel>Password</CLabel>
              </CCol>
              <CCol>
                <CInput
                  name="password"
                  value={funcionario.password}
                  onChange={changeHandler}
                />
              </CCol>
            </CFormGroup>

            {message && (
              <div
                className="form-group"
                onClick={() => {
                  setMessage("");
                }}
              >
                <div
                  className={`alert alert-${
                    message === "Guardado con exito!" ||
                    message === "Funcionario actualizado."
                      ? "success"
                      : "danger"
                  }`}
                >
                  {message}
                </div>
              </div>
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={
              CRUD === "Guardar" ? agregarFuncionario : updateFuncionario
            }
          >
            {CRUD}
          </CButton>
          <CButton
            onClick={() => {
              setShow(false);
              setFuncionario(empty);
              setMessage("");
            }}
            color="secondary"
          >
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Funcionarios;
