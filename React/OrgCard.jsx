import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
import { Image, Card, Row, Col } from "react-bootstrap";
import { Trash2, Edit, Eye, Calendar } from "react-feather";
const _logger = debug.extend("OrganizationCard");

function OrgCard(props) {
  const anOrg = props.org;

  const onLocalOrgClicked = (e) => {
    e.preventDefault();

    props.onOrgClick(anOrg, e);
  };

  const navigate = useNavigate();

  const handleAppt = (e) => {
    _logger(e);
    goToOrgApptPage(anOrg);
  };

  const goToOrgApptPage = (anOrg) => {
    _logger("appt", anOrg.id);
    const orgData = {
      type: "APPT_ORG",
      state: anOrg,
    };
    navigate(`/organization/${anOrg.id}/appointments`, orgData);
    _logger("navigate", orgData);
  };

  const handleEdit = (e) => {
    _logger(e);
    goToOrgEditPage(anOrg);
  };

  const goToOrgEditPage = (anOrg) => {
    const orgData = {
      type: "EDIT_ORG",
      state: anOrg,
    };
    navigate(`/organization/${anOrg.id}/edit`, orgData);
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

  const viewMoreOrg = (e) => {
    e.preventDefault();
    onViewMore(anOrg);
  };

  const onViewMore = (anOrg) => {
    const orgInfo = {
      type: "VIEW_ORG",
      payload: anOrg,
    };
    navigate(`/organization/${anOrg.id}`, { state: orgInfo });
  };

  return (
    <Fragment>
      <Card className=" mb-4 org-card card-hover p-2 text-center">
        <a target="_blank" rel="noreferrer noopener" href={anOrg.siteUrl}>
          <Image
            src={anOrg.logoUrl}
            className="org-card-img-top rounded-top-md img-fluid"
            alt="..."
            onClick={onImageClick}
          ></Image>
        </a>
        <Card.Body className="mb-2 p-2">
          <h5 className="card-title h4 mb-2 text-truncate-line-2 text-primary">
            {anOrg.name}
            <p className="card-text h5 mb-2">{anOrg.description}</p>
          </h5>
        </Card.Body>
        <Card.Footer className="org-card-footer">
          <Row className="align-items-center">
            <Col className="col ms-auto">
              <Eye
                size="22px"
                className="view-item-icon-orgCard"
                type="button"
                data-page={anOrg.id}
                onClick={viewMoreOrg}
              ></Eye>
            </Col>
            <Col className="col ms-2">
              {(props.currentUser.roles.includes("SysAdmin") ||
                props.currentUser.roles.includes("OrgAdmin")) && (
                <Edit
                  size="22px"
                  className="edit-item-icon-orgCard"
                  type="button"
                  data-page={anOrg.id}
                  onClick={handleEdit}
                ></Edit>
              )}
            </Col>
            <Col className="col ms-2">
              {(props.currentUser.roles.includes("SysAdmin") ||
                props.currentUser.roles.includes("OrgAdmin")) && (
                <Trash2
                  size="22px"
                  className="delete-item-icon-orgCard"
                  type="button"
                  onClick={onLocalOrgClicked}
                ></Trash2>
              )}
            </Col>
            <Col className="col ms-2">
              <Calendar
                size="22px"
                className="cal-item-icon-orgCard"
                type="button"
                data-page={anOrg.id}
                onClick={handleAppt}
              ></Calendar>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Fragment>
  );
}

OrgCard.propTypes = {
  org: PropTypes.shape({
    id: PropTypes.number.isRequired,
    logoUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    businessPhone: PropTypes.string.isRequired,
    siteUrl: PropTypes.string.isRequired,
  }),
  onOrgClick: PropTypes.func,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.shape({
      0: PropTypes.string.isRequired,
      1: PropTypes.string,
      includes: PropTypes.func,
    }),
  }),
};

export default React.memo(OrgCard);
