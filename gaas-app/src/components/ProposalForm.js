import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

const ProposalForm = () => {
  const dispatch = useDispatch();

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSummary">
        <Form.Label>Summary</Form.Label>
        <Form.Control type="text" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label>Content</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Proposal
      </Button>
    </Form>
  );
};
