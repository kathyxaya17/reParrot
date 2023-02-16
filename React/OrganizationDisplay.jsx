import React, {
  useMemo,
  useState,
  useEffect,
  Fragment,
  useCallBack,
} from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import "./orgTable.css";
import { Card, Col, Row, Dropdown } from "react-bootstrap";
import { Trash, Edit, MoreVertical } from "react-feather";
import { Link } from "react-router-dom";
import GlobalFilterOrg from "./GlobalFilterOrg";
import organizationService from "services/organizationService";
import toastr from "toastr";
import debug from "sabio-debug";
import OrgPagination from "./OrgPagination";
import PropTypes from "prop-types";
const _logger = debug.extend("OrganizationDisplay");

function OrganizationDisplay() {
  const [orgData, setOrgData] = useState([]);

  const fetchOrgs = async () => {
    const response = await organizationService
      .getOrganization()
      .then(onGetOrgSuccess)
      .catch(onGetOrgError);
    _logger("Getting Organizations Successful", response);
  };

  const onGetOrgSuccess = (response) => {
    toastr.success("Getting Organizations Successful");
    let orgData = response.item.pagedItems;
    setOrgData(orgData);
  };

  const onGetOrgError = (error) => {
    toastr.error("Getting Organizations Error");
    _logger("Getting Organizations Error", error);
  };

  const onDeleteClicked = useCallBack((e) => {
    _logger("delete button clicked", e.target.id);
  });

  // organizationService
  //   .deleteOrganization()
  //   .then(onDeleteOrgsuccess)
  //   .catch(onDeleteOrgError);

  // const onDeleteOrgsuccess = (response) => {
  //   _logger("deleting", response);
  // };

  // const onDeleteOrgError = (error) => {
  //   _logger("deleting", error);
  // };

  //const navigate = useNavigate();

  const goToOrgEditPage = (e) => {
    e.preventDefault();
    _logger(e.target.id);
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const ActionMenu = ({ value }) => {
    _logger(value);
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <MoreVertical size="15px" className="text-secondary" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Header>SETTINGS</Dropdown.Header>
          <Dropdown.Item eventKey="1" onClick={goToOrgEditPage} id={value}>
            {" "}
            <Edit size="18px" className="dropdown-item-icon" /> Edit
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={onDeleteClicked} id={value}>
            {" "}
            <Trash size="18px" className="dropdown-item-icon" /> Remove
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Phone",
        accessor: "businessPhone",
      },
      {
        Header: "Website",
        accessor: "siteUrl",
      },
      {
        Header: "Logo",
        accessor: "logoUrl",
        Cell: ({ value }) => {
          return <img src={value} alt="logo"></img>;
        },
      },
      {
        accessor: "id",
        Header: "Settings",
        Cell: ({ value }) => {
          return <ActionMenu value={value} />;
        },
      },
    ],
    []
  );

  const data = useMemo(() => [...orgData], [orgData]);

  useEffect(() => {
    fetchOrgs();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, globalFilter } = state;
  _logger(page);
  return (
    <Fragment>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Organizations</h3>
            <p className="mb-0">Manage organizations</p>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="mb-lg-0 mb-2">
              <GlobalFilterOrg
                filter={globalFilter}
                setFilter={setGlobalFilter}
                placeholder="Search Organizations"
              />
            </Col>
          </Row>
        </Card.Body>
        <Card.Body className="p-0 pb-5">
          <Row>
            <Col lg={12} md={12} sm={12}>
              <div>
                <table {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup, i) => (
                      <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                        {headerGroup.headers.map((column, i) => (
                          <th {...column.getHeaderProps()} key={i}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} key={"row" + i}>
                          {row.cells.map((cell, i) => {
                            return (
                              <td {...cell.getCellProps()} key={"cell" + i}>
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
          <OrgPagination
            previousPage={previousPage}
            pageCount={pageCount}
            pageIndex={pageIndex}
            gotoPage={gotoPage}
            nextPage={nextPage}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
          ></OrgPagination>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

OrganizationDisplay.propTypes = {
  value: PropTypes.shape({ value: PropTypes.string }),
  children: PropTypes.shape({
    children: PropTypes.string,
  }),
  onClick: PropTypes.shape({
    onChange: PropTypes.func,
    onClick: PropTypes.func,
  }),
};

export default OrganizationDisplay;
