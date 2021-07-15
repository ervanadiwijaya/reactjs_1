import React from "react";
import { Form, FormControl, Navbar } from "react-bootstrap";

const SearchForm = ({ onChange }) => {
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="#home" className="mr-auto">MyCatatan</Navbar.Brand>
            <Form inline>
                <FormControl type="text" placeholder="Cari catatan" className="mr-sm-2" onChange={onChange} />
            </Form>
        </Navbar>
    )
}

export default SearchForm;