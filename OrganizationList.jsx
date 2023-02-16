import React, { Fragment, useState, useEffect, useCallback } from "react";
import debug from "sabio-debug";
import "./organization.css";
import { Col, Row, Button, Container } from "react-bootstrap";
import organizationService from "./../../services/organizationService";
import OrgCard from "./OrgCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";
import { Formik, Field, ErrorMessage, Form } from "formik";
import orgSearchSchema from "../../schemas/orgSearchSchema";
import OrgPageHeading from "./OrgPageHeading";
import PropTypes from "prop-types";

const _logger = debug.extend("OrganizationList");

function OrganizationList(props) {
  const [pageData, setPageData] = useState({
    arrayOfOrgs: [],
    orgComponents: [],
  });

  const [paginate, setPaginate] = useState({
    index: 0,
    total: 0,
    pageSize: 8,
  });

  const [searchData, setSearchData] = useState({ query: "" });

  const onDeleteRequested = useCallback((anOrg) => {
    const handler = getDeleteSuccessHandler(anOrg.id);

    organizationService
      .deleteOrganization(anOrg.id)
      .then(handler)
      .catch(onDeleteOrgError);
  }, []);

  const getDeleteSuccessHandler = (deleteOrgId) => {
    return () => {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfOrgs = [...pd.arrayOfOrgs];

        const idxOf = pd.arrayOfOrgs.findIndex((org) => {
          let result = false;
          if (org.id === deleteOrgId) {
            result = true;
          }
          return result;
        });

        if (idxOf >= 0) {
          pd.arrayOfOrgs.splice(idxOf, 1);
          pd.orgComponents = pd.arrayOfOrgs.map(mapOrganization);
        }

        return pd;
      });
    };
  };

  const mapOrganization = (anOrg) => {
    return (
      <Col lg={3} md={6} sm={12} key={anOrg.id}>
        <OrgCard
          org={anOrg}
          key={"OrgList" + anOrg.id}
          onOrgClick={onDeleteRequested}
          currentUser={props.currentUser}
        />
      </Col>
    );
  };

  useEffect(() => {
    if (searchData.query) {
      organizationService
        .searchOrganizations(
          paginate.index,
          paginate.pageSize,
          searchData.query
        )
        .then(onSearchOrgSuccess)
        .catch(onSearchOrgError);
    } else {
      organizationService
        .getOrganization(paginate.index, paginate.pageSize)
        .then(onGetOrgSuccess)
        .catch(onGetOrgError);
    }
  }, [paginate.index, searchData.query]);

  const onGetOrgSuccess = (data) => {
    let arrayOfOrgs2 = data.item.pagedItems;

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfOrgs = arrayOfOrgs2;
      pd.orgComponents = arrayOfOrgs2.map(mapOrganization);
      return pd;
    });

    setPaginate((prevState) => {
      const newPageData = {
        ...prevState,
        total: data.item.totalCount,
      };
      return newPageData;
    });
  };

  const onPageChangeHandler = (pageNumber) => {
    setPaginate((prevState) => {
      const updatedPage = { ...prevState, index: pageNumber - 1 };
      return updatedPage;
    });
  };

  const onGetOrgError = (error) => {
    toastr.error("Getting Organization Unsuccessful");
    _logger(error);
  };

  const onDeleteOrgError = (error) => {
    toastr.error("Deleting Organization Unsuccessful");
    _logger("deleting error", error);
  };

  const onSearchClick = (value) => {
    _logger("searching organizations", value.query);

    setSearchData((prevState) => {
      return { ...prevState, query: value.query };
    });
  };

  const onSearchOrgSuccess = (data) => {
    const arrayOfOrgs = data.item.pagedItems;

    setPageData((prevState) => {
      const searchedData = { ...prevState };
      searchedData.arrayOfOrgs = arrayOfOrgs;
      searchedData.orgComponents = arrayOfOrgs.map(mapOrganization);
      return searchedData;
    });

    setPaginate((prevState) => {
      const newPageData = {
        ...prevState,
        total: data.item.totalCount,
      };
      return newPageData;
    });
  };

  const onSearchOrgError = (error) => {
    _logger("Search Error", error);
    toastr.error("Search Organizations by name or description");
  };

  const onResetClick = () => {
    setSearchData({ query: "" });
  };
  return (
    <Fragment>
      {/* Page header */}
      <OrgPageHeading pageTitle="Automotive Repair Shops" />

      {/* Content */}
      <div className="py-6">
        <Container>
          <Container className="org-search-container">
            <Row className="mb-3">
              <Col className="d-inline-flex mb-0 mx-3 top-0 right-0 justify-content-center">
                <Formik
                  enableReinitialize={true}
                  initialValues={searchData}
                  onSubmit={onSearchClick}
                  validationSchema={orgSearchSchema}
                >
                  <Form>
                    <Col className="d-inline-flex org-search-bar">
                      <Field
                        type="text"
                        className="form-control form-control-lg org-search-placeholder"
                        name="query"
                        id="org-search-bar"
                        placeholder="Search Organizations"
                      ></Field>

                      <div className="search-bar-buttons d-inline-flex">
                        <Button
                          className="btn org-search-button btn-md"
                          type="submit"
                        >
                          Search
                        </Button>
                      </div>
                      <div className="search-bar-buttons d-inline-flex">
                        <Button
                          type="reset"
                          className="org-reset-button btn btn-primary btn-md"
                          onClick={onResetClick}
                        >
                          Reset
                        </Button>
                      </div>
                    </Col>
                    <Row>
                      <ErrorMessage
                        name="query"
                        component="div"
                        className="has-error text-danger org-search-error"
                      />
                    </Row>
                  </Form>
                </Formik>
              </Col>
            </Row>
          </Container>
          <Row className="mb-3 org-card">{pageData?.orgComponents}</Row>
          <Row>
            <Pagination
              onChange={onPageChangeHandler}
              index={paginate.index + 1}
              total={paginate.total}
              pageSize={paginate.pageSize}
              totalCount={paginate.totalCount}
              locale={locale}
              className="org-pagination justify-content-center mb-0"
            />
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

OrganizationList.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }),
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default OrganizationList;
