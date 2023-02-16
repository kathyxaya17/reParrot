import React, { Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";

function OrgPageHeading({ pageTitle }) {
  return (
    <Fragment>
      <div className="bg-primary py-lg-6">
        <Container>
          <Row className="align-items-center text-center">
            <Col xl={12} lg={12} md={12} sm={12}>
              <div>
                <h1 className="mb-0 text-white display-4">{pageTitle}</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

OrgPageHeading.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default OrgPageHeading;
