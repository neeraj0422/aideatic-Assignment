import { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MoreVert as MoreVertIcon, Settings as SettingsIcon } from "@mui/icons-material";

const ListView = (props) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("email");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = props.data.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy].toLowerCase().localeCompare(b[orderBy].toLowerCase());
    } else {
      return b[orderBy].toLowerCase().localeCompare(a[orderBy].toLowerCase());
    }
  });

  const rowsToShow = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>ID</TableCell>
            <TableCell sortDirection={orderBy === "email" ? order : false}>
              <TableSortLabel
                active={orderBy === "email"}
                direction={order}
                onClick={() => handleSort("email")}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>Description</TableCell>
            <TableCell>
              <Tooltip title="Settings">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsToShow.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ display: "flex", minWidth: "200px" }}>
                <img
                  src={row.image_url}
                  alt={`${row.first_name + row.last_name}`}
                  style={{
                    height: "48px",
                    width: "48px",
                    borderRadius: "50%",
                    border: "6px solid #181A1C",
                    stroke: "solid",
                    strokeColor: "colour/card",
                    marginRight: "16px",
                    float: "left",
                  }}
                />

                <div style={{ fontSize: "18px", fontWeight: "bold" }}>{row.first_name + row.last_name}</div>
              </TableCell>
              <TableCell sx={{ color: "#949494", minWidth: "100px" }}>{row.id}</TableCell>
              <TableCell sx={{ color: "#949494" }}>{row.email}</TableCell>
              <TableCell sx={{ marginTop: "8px" }}>{row.description}</TableCell>
              <TableCell>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
export default ListView

