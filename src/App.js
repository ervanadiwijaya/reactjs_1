import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import BodyCard from "./component/BodyCard";
import ButtonAdd from "./component/ButtonAdd";
import ModalForm from "./component/ModalForm";
import SearchForm from "./component/SearchForm";

const App = () => {
  const [dataApi, setDataApi] = useState([]);
  const [dataPost, setDataPost] = useState({
    id: 1,
    judul: "",
    catatan: "",
    tanggal: ""
  });

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState(false);
  // const [alertBody, setAertBody] = useState(false);
  // const [q, setQ] = useState("")

  const openModal = () => {
    setShow(true);
    setAlert(false);

  }
  const closeModal = () => {
    setShow(false);
    setEdit(false);
    setAlert(false);
  }

  const handleChange = (e) => {
    // console.log(e.target.value)
    let newDataPost = { ...dataPost };
    let date = new Date();
    if (edit === false) {
      newDataPost['id'] = new Date().getTime();
    }
    newDataPost[e.target.name] = e.target.value;
    newDataPost['tanggal'] = date.toLocaleString('En-US')

    setDataPost(newDataPost);
    e.preventDefault();
  }

  const handleSubmit = () => {
    if (dataPost.judul === "" || dataPost.catatan === "") {
      setAlert(true)
    } else {
      if (edit === false) {
        axios
          .post('http://localhost:3004/posts', dataPost)
          .then(() => {
            reloadData();
            clearData();
            setShow(false);
            setEdit(false);
          });
      } else {
        axios
          .put(`http://localhost:3004/posts/${dataPost.id}`, dataPost)
          .then(() => {
            reloadData();
            clearData();
            setShow(false);
            setEdit(false);
          });
      }
      setAlert(false)
    }
  }

  const getDataId = (id) => {
    // console.log(id);
    axios
      .get(`http://localhost:3004/posts/${id}`)
      .then(
        res => {
          setDataPost(res.data);
          setShow(true);
          setEdit(true);
        });
  }

  const handleRemove = (id) => {
    // console.log(e.target.value)
    if (window.confirm('Apa kamu yakin akan menghapus data?')) {
      axios.delete(`http://localhost:3004/posts/${id}`).then(() => reloadData())
    }
  }

  const handleSearch = (e) => {
    axios.get(`http://localhost:3004/posts?q=${e.target.value}`).then((res) => {
      setDataApi(res.data);
    });
    e.preventDefault();
  }

  const reloadData = () => {
    axios.get('http://localhost:3004/posts').then((res) => {
      setDataApi(res.data);
    });
  }

  const clearData = () => {
    let newDataPost = { ...dataPost };
    newDataPost['id'] = "";
    newDataPost['judul'] = "";
    newDataPost['catatan'] = "";
    newDataPost['tanggal'] = "";

    setDataPost(newDataPost);
  }

  useEffect(() => {
    reloadData()
  }, [])


  return (
    <div>

      {/* Modal buat / ubah data */}
      <ModalForm
        show={show}
        edit={edit}
        onHide={closeModal}
        onChange={handleChange}
        onSubmit={handleSubmit}
        dataPost={dataPost}
        alert={alert}
      />

      {/* Navigasi n Search bar */}
      <SearchForm
        onChange={handleSearch}
      />

      {/* tombol tambah data */}
      <ButtonAdd
        onClick={openModal}
      />

      {/* keterangan aplikasi */}
      <Container className="text-center">
        <Row>
          <Col className="bg-dark text-white rounded p-2">
            <p className="mb-0 pb-0">Mencatat adalah salah satu cara untuk mengingat. Tuangkan ide atau kenangan dalam bentuk catatan disini</p>
            <small className="mt-0 pt-0"><i>*tekan tombol <BsFillPlusCircleFill /> diatas untuk menambah catatan</i></small>
          </Col>
        </Row>
      </Container>

      {/* isi aplikasi/ daftar catatan */}
      <Container>
        {dataApi.map((dt, i) => {
          return (
            <BodyCard
              data={dt}
              key={i}
              onUpdate={getDataId}
              onDelete={handleRemove}
            />
          )
        }
        ).reverse()}
      </Container>
    </div >
  )
}

export default App;
