import React from "react";
import { Accordion, Container, Row } from "react-bootstrap";
import styles from "./index.module.css";

const FAQs = () => {
  return (
    <Container>
      <Row className={styles.heading}>FAQs</Row>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            What services does your home building startup provide?
          </Accordion.Header>
          <Accordion.Body>
            Our startup specializes in custom home construction, remodeling, and
            renovation projects.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            How experienced is your team in the home building industry?
          </Accordion.Header>
          <Accordion.Body>
            Our team consists of highly skilled professionals with over 10 years
            of experience in the home building industry.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Can you help with obtaining permits and dealing with local
            regulations?
          </Accordion.Header>
          <Accordion.Body>
            Yes, we have a dedicated team that will assist you in obtaining the
            necessary permits and ensure compliance with local regulations.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            How long does the home building process typically take?
          </Accordion.Header>
          <Accordion.Body>
            The duration of the construction process depends on the size and
            complexity of the project. However, on average, it can take anywhere
            from six to twelve months.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            What types of homes can you build?
          </Accordion.Header>
          <Accordion.Body>
            We can build a variety of homes, including single-family homes,
            townhouses, and custom-designed luxury residences.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            Do you offer energy-efficient and sustainable home building options?
          </Accordion.Header>
          <Accordion.Body>
            Yes, we prioritize energy efficiency and sustainability. We can
            incorporate eco-friendly materials and features into your home
            design.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            Can you work with an existing design or architectural plans?
          </Accordion.Header>
          <Accordion.Body>
            Absolutely! We can work with your existing design or collaborate
            with architects and designers to bring your vision to life.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>
            What sets your startup apart from other home builders?
          </Accordion.Header>
          <Accordion.Body>
            Our startup focuses on providing personalized attention to each
            client, ensuring high-quality craftsmanship, and maintaining open
            communication throughout the project.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>
            What is the payment structure for your services?
          </Accordion.Header>
          <Accordion.Body>
            Our payment structure typically involves an initial deposit,
            followed by progress payments at different stages of the project.
            Specific details will be outlined in the contract.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>
            Do you provide any warranties for your work?
          </Accordion.Header>
          <Accordion.Body>
            Yes, we provide warranties on our workmanship and materials used,
            typically ranging from one to ten years, depending on the type of
            project and components involved.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQs;
