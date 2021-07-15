import React from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";


const ModalForm = ({ show, onHide, edit, onChange, onSubmit, dataPost, alert }) => {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={onHide}
        // ref={this.wrapper}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {edit !== true ? ("Buat Catatan") : ("Edit Catatan")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="ControlInput">
                        <Form.Label>Judul</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="judul"
                            onChange={onChange}
                            value={dataPost.judul}
                            placeholder="judul catatan" />
                        {/* <Form.Control.Feedback type="invalid">
                            Judul harus diisi.
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group controlId="ControlTextarea">
                        <Form.Label>Catatan</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            name="catatan"
                            rows={10}
                            onChange={onChange}
                            value={dataPost.catatan} />
                    </Form.Group>
                    {alert ? <Alert variant="danger">Kolom judul dan catatan tidak boleh kosong, mohon diisi.</Alert> : null}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" variant="dark" onClick={onSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalForm