import axios from "axios";
import React, { Component } from "react";
import { Navbar, Form, FormControl, Button, Container, Card, Modal, Nav, Row, Col } from "react-bootstrap";
import { BsFillPlusCircleFill, BsTrash, BsPencil } from "react-icons/bs";


class App extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef()
    this.state = {
      dataApi: [],
      show: false,
      dataPost: { id: 0, judul: "", catatan: "", tanggal: "" },
      edit: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getDataId = this.getDataId.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  openModal = () => {
    this.setState({
      show: true
    })
  }
  closeModal = () => {
    this.setState({
      show: false,
      edit: false
    })
  }

  handleChange(e) {
    console.log(e.target.value)
    let newDataPost = { ...this.state.dataPost };
    let date = new Date();
    if (this.state.edit === false) {
      newDataPost['id'] = new Date().getTime();
    }
    newDataPost[e.target.name] = e.target.value;
    newDataPost['tanggal'] = date.toLocaleString('En-US')

    this.setState({
      dataPost: newDataPost
    },
      () => console.log(this.state.dataPost)
    );
  }

  handleSubmit() {
    if (this.state.edit === false) {
      axios
        .post('http://localhost:3004/posts', this.state.dataPost)
        .then(() => {
          this.reloadData();
          this.clearData();
          this.setState({
            edit: false,
            show: false
          });
        });
    } else {
      axios
        .put(`http://localhost:3004/posts/${this.state.dataPost.id}`, this.state.dataPost)
        .then(() => {
          this.reloadData();
          this.clearData();
          this.setState({
            edit: false,
            show: false
          });
        });
    }
  }

  getDataId(id) {
    // console.log(id);
    axios
      .get(`http://localhost:3004/posts/${id}`)
      .then(
        res => {
          this.setState({
            dataPost: res.data,
            edit: true,
            show: true
          })
        });
  }

  handleRemove(id) {
    // console.log(e.target.value)
    fetch(`http://localhost:3004/posts/${id}`, { method: "DELETE" }).then(res => this.reloadData())
  }

  handleSearch(e) {

  }

  reloadData() {
    axios.get('http://localhost:3004/posts').then((res) => {
      this.setState({
        dataApi: res.data,
        filterData: res.data
      });
    });
  }

  clearData() {
    let newDataPost = { ...this.state.dataPost };
    newDataPost['id'] = "";
    newDataPost['judul'] = "";
    newDataPost['catatan'] = "";
    newDataPost['tanggal'] = "";

    this.setState({
      dataPost: newDataPost
    });
  }

  componentDidMount() {
    this.reloadData();
  }


  render() {
    return (
      <div>

        {/* Modal buat / ubah data */}
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          onHide={this.closeModal}
          ref={this.wrapper}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.state.edit !== true ? ("Buat Catatan") : ("Edit Catatan")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="ControlInput">
                <Form.Label>Judul</Form.Label>
                <Form.Control type="text" name="judul" onChange={this.handleChange} value={this.state.dataPost.judul} placeholder="judul catatan" />
              </Form.Group>
              <Form.Group controlId="ControlTextarea">
                <Form.Label>Catatan</Form.Label>
                <Form.Control as="textarea" name="catatan" rows={3} onChange={this.handleChange} value={this.state.dataPost.catatan} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="dark" onClick={this.handleSubmit}>Save</Button>
          </Modal.Footer>
        </Modal>

        {/* Navigasi bar */}
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand href="#home" className="mr-auto">MyCatatan</Navbar.Brand>
          <Form inline>
            <FormControl type="text" placeholder="Cari catatan" className="mr-sm-2" onChange={(e) => this.handleSearch(e)} />
          </Form>
        </Navbar>

        {/* tombol tambah data */}
        <Nav className="justify-content-center mt-3">
          <Nav.Item className="mr-2">
            <Button onClick={this.openModal} variant="light"><BsFillPlusCircleFill /></Button>
          </Nav.Item>
          <Nav.Item>
            <h2 >Catatan</h2>
          </Nav.Item>
        </Nav>

        {/* keterangan aplikasi */}
        <Container className="text-center">
          <Row>
            <Col className="bg-dark text-white rounded p-2">
              <p className="mb-0 pb-0">Mencatat adalah salah satu cara untuk mengingat. Tuangkan ide atau kenangan dalam bentuk catatan disini</p>
              <small className="mt-0 pt-0"><i>*tekan tombol <BsFillPlusCircleFill /> diatas untuk menambah catatan</i></small>
            </Col>
          </Row>
        </Container>

        {/* isi aplikasi (catatan) */}
        <Container>
          {this.state.dataApi.map((dt, i) => {
            return (
              <Card border="light" className="my-2" key={i}>
                <Card.Body className="mx-0 px-0">
                  <Card.Title>{dt.judul}</Card.Title>
                  <Card.Text>
                    {dt.catatan}
                  </Card.Text>
                  <p><small className="text-muted">{dt.tanggal}</small></p>
                  <Button type="submit" variant="light" size="sm" onClick={() => this.getDataId(dt.id)}><BsPencil /></Button>
                  <Button type="submit" variant="light" size="sm" onClick={() => this.handleRemove(dt.id)}><BsTrash /></Button>
                </Card.Body>
              </Card>
            )
          }
          )}
        </Container>
      </div >

    );

  }
}

export default App;
