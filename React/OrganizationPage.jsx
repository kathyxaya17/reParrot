import React, { Fragment, useState, useEffect } from "react";
import { Card, Row, Col, Container, Collapse, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { ExternalLink, Map, Phone, Star, Calendar } from "react-feather";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./organization.css";

import OrgPageSlider from "./OrgPageSlider";

function OrganizationPage() {
  const location = useLocation();
  const orgId = useParams();
  const navigate = useNavigate();

  const [orgPageData, setOrgPageData] = useState({
    id: "",
    name: "",
    description: "",
    logoUrl: "",
    businessPhone: "",
    primaryLocationId: "",
    location: {
      id: "",
      locationType: {
        id: "",
        name: "",
      },
      lineOne: "",
      lineTwo: "",
      city: "",
      zip: "",
      state: {
        code: "",
      },
    },
    siteUrl: "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.state.type === "VIEW_ORG" && !!location?.state) {
      setOrgPageData((prevState) => {
        return { ...prevState, ...location.state };
      });
    }
  }, [orgId, location]);

  let orgInfo = orgPageData.payload;

  const onSeeMoreServices = (event) => {
    _logger(event);
    setOpen(!open);
  };

  const onImageClick = (anOrg, e) => {
    e.preventDefault();
    const orgInfo = {
      type: "ORG_SITE",
      state: anOrg,
    };
    navigate(anOrg.siteUrl);
    _logger("on image click", orgInfo, anOrg.siteUrl);
  };

  const onMapIconClick = (anOrg, e) => {
    e.preventDefault();
    const orgInfo = {
      type: "ORG_SITE",
      state: anOrg,
    };
    navigate();
    _logger("on map icon click", orgInfo);
  };

  return (
    <Fragment>
      <div className="py-6 py-md-5 bg-organization">
        <Container className="orginfo">
          <Row>
            <Row className="center-orginfo">
              <Col xl={8} lg={8}>
                <Card className="border-0 mb-0">
                  <Card.Body className="m-3">
                    <h1>{orgInfo?.name}</h1>
                    <p>
                      <Star className="star-icon-orgPage"></Star>
                      <Star className="star-icon-orgPage"></Star>
                      <Star className="star-icon-orgPage"></Star>
                      <Star className="star-icon-orgPage"></Star>
                      <Star className="star-icon-orgPage"></Star>
                      <span className="orgPage-ratings m-2">
                        <strong>Ratings</strong>
                      </span>
                    </p>
                    <p className="mb-0">{orgInfo?.description}</p>

                    <button
                      className="btn btn-link orgPage-services"
                      onClick={onSeeMoreServices}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}
                    >
                      {" "}
                      See More Services
                    </button>
                    <Collapse in={open}>
                      <div className="card-body-orgPage-services">
                        <p>Oil Change</p>
                        <p>Smog Check</p>
                        <p>Tire Rotation</p>
                        <p>Wheel Balancing</p>
                        <p>Alignment</p>
                        <p>Windshield Crack Repair</p>
                        <p>Tire Repair </p>
                        <p>Radiator Flush</p>
                        <p>Brake Replacement</p>
                        <p>Transmission Fluid</p>
                        <p>Transmission Repair</p>
                        <p>Engine Repair</p>
                        <p>Body Repair</p>
                        <p>Electrical Repair</p>
                        <p>HVAC Repair</p>
                        <p>Coolant Refill</p>
                        <p>Vehicle Safety Inspection</p>
                        <p>Accessory Installation</p>
                        <p>Electrical Repair</p>
                      </div>
                    </Collapse>
                    <p className="orgPage-images mb-4">
                      <OrgPageSlider></OrgPageSlider>
                    </p>
                    <p>
                      <iframe
                        title="orgPage map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.1796862267815!2d-118.46915548493568!3d34.03926158060941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bb43bbe07bb3%3A0x4c31192b6f97eeba!2s12411%20Santa%20Monica%20Blvd%2C%20Los%20Angeles%2C%20CA%2090025!5e0!3m2!1sen!2sus!4v1675099801838!5m2!1sen!2sus"
                        width="615"
                        height="450"
                        style={{ style: "border:0" }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        alt="..."
                      ></iframe>
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={4} sm={12}>
                <div>
                  <Card className="border-0 mb-4 mb-lg-3 org-sidebar-logo text-center">
                    <Card.Body>
                      <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href={orgInfo?.siteUrl}
                      >
                        <Image
                          src={orgInfo?.logoUrl}
                          className="org-card-img-top rounded-top-md img-fluid"
                          alt="..."
                          onClick={onImageClick}
                        ></Image>
                      </a>
                    </Card.Body>
                  </Card>
                </div>
                <div>
                  <Card className="border-0 mb-4 mb-lg-0 org-sidebar">
                    <Card.Body>
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div>
                          <h4 type="tel" className="mb-0 fw">
                            {orgInfo?.businessPhone}
                          </h4>
                        </div>
                        <div>
                          <span>
                            <Phone
                              className="phone-icon-orgPage"
                              color="blue"
                            ></Phone>
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div className="org-page-address">
                          <h5 className="mb-0 fw">
                            <p className="org-page-address-line-1">
                              {" "}
                              {orgInfo?.location.lineOne}
                            </p>
                            <p className="org-page-address-line-2">
                              {" "}
                              {orgInfo?.location.lineTwo}
                            </p>
                            <p className="org-page-address-line-3">
                              {orgInfo?.location.city}{" "}
                            </p>
                            <p className="org-page-address-line-4">
                              {" "}
                              {orgInfo?.location.state.code},{" "}
                              {orgInfo?.location.zip}
                            </p>
                          </h5>
                        </div>
                        <div>
                          <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://goo.gl/maps/CY7HGfcACHTzTkQq9"
                          >
                            <Map
                              className="fa fa-map fs-3"
                              type="button"
                              onClick={onMapIconClick}
                              color="green"
                            ></Map>
                          </a>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h4 className="mb-0 fw ellipsis-org-view">
                            {orgInfo?.siteUrl}
                          </h4>
                        </div>
                        <div>
                          <span>
                            <a
                              target="_blank"
                              rel="noreferrer noopener"
                              href={orgInfo?.siteUrl}
                            >
                              <ExternalLink
                                className="ext-link-icon-orgPage"
                                type="button"
                                size="25px"
                              ></ExternalLink>
                            </a>
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                <div>
                  <Card className="border-0 mb-4 mb-lg-0 org-sidebar mt-3">
                    <Card.Body>
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div>
                          <h4 className="mb-0 fw-bold">Hours of Operation</h4>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div className="org-page-address">
                          <h4 className="mb-0 fw">
                            <p>Mon 7:30 AM - 6:00 PM</p>
                            <p>Tue 7:30 AM - 6:00 PM</p>
                            <p>Wed 7:30 AM - 6:00 PM</p>
                            <p>Thu 7:30 AM - 6:00 PM</p>
                            <p>Fri 7:30 AM - 6:00 PM Open now</p>
                            <p>Sat 8:00 AM - 3:00 PM</p>
                            <p>Sun Closed</p>
                          </h4>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h4 className="mb-0 fw ellipsis-org-view">
                            Schedule an apppointment
                          </h4>
                        </div>
                        <div>
                          <span>
                            <Calendar
                              className="ext-link-icon-orgPage"
                              type="button"
                              size="25px"
                            ></Calendar>
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

OrganizationPage.propTypes = {
  org: PropTypes.shape({
    id: PropTypes.number.isRequired,
    logoUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    businessPhone: PropTypes.string.isRequired,
    siteUrl: PropTypes.string.isRequired,
  }),
};

export default OrganizationPage;
