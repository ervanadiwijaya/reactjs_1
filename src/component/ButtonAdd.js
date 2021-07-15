import React from "react";
import { Button, Nav } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";

const ButtonAdd = ({ onClick }) => {
    return (
        <Nav className="justify-content-center mt-3">
            <Nav.Item className="mr-2">
                <Button onClick={onClick} variant="light"><BsFillPlusCircleFill /></Button>
            </Nav.Item>
            <Nav.Item>
                <h2 >Catatan</h2>
            </Nav.Item>
        </Nav>
    )
}

export default ButtonAdd;