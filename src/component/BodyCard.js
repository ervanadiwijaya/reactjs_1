import React from "react";
import { Button, Card } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";


const BodyCard = ({ data, onUpdate, onDelete }) => {
    return (
        <Card border="light" className="my-2">
            <Card.Body className="mx-0 px-0">
                <Card.Title>{data.judul}</Card.Title>
                <Card.Text className="text-justify">
                    {data.catatan}
                </Card.Text>
                <p><small className="text-muted">dicatat pada: {data.tanggal}</small></p>
                <Button type="submit" variant="light" size="sm" onClick={() => onUpdate(data.id)}><BsPencil /></Button>
                <Button type="submit" variant="light" size="sm" onClick={() => onDelete(data.id)}><BsTrash /></Button>
                <hr></hr>
            </Card.Body>
        </Card>
    )
}

export default BodyCard;