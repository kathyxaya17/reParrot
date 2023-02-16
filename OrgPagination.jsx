import React, { Fragment } from "react";
import { Row, Col, Button, ListGroup } from "react-bootstrap";

const orgPagination = ({
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  gotoPage,
  pageCount,
  pageIndex,
}) => {
  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="pb-5">
            <nav>
              <ListGroup
                as="ul"
                bsPrefix="pagination"
                className="justify-content-center mb-0"
              >
                <ListGroup.Item as="li" bsPrefix="page-item">
                  <Button
                    type="button"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="page-link mx-1 rounded"
                  >
                    <i className="fe fe-chevron-left"></i>
                  </Button>
                </ListGroup.Item>
                {Array.from(Array(pageCount).keys()).map((page) => (
                  <ListGroup.Item
                    as="li"
                    bsPrefix="page-item"
                    key={page}
                    className={`page-item ${
                      pageIndex === page ? "active" : ""
                    }`}
                  >
                    <Button
                      type="button"
                      className="page-link mx-1 rounded"
                      onClick={() => gotoPage(page)}
                    >
                      {page + 1}
                    </Button>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item as="li" bsPrefix="page-item">
                  <Button
                    type="button"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="page-link mx-1 rounded"
                  >
                    <i className="fe fe-chevron-right"></i>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </nav>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default orgPagination;
