import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table, TableHead, TableBody, TableRow, TableCell, 
  Button, TextField, CircularProgress, Paper, TableContainer
} from "@mui/material";

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5000/api/transactions", {
        params: { month, search, page, perPage: 10 },
      });

      console.log("Fetched Transactions:", response.data);

      if (response.data && Array.isArray(response.data.transactions)) {
        setTransactions(response.data.transactions);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      setError("Failed to fetch transactions.");
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#1976d2" }}>Transactions</h2>

      {/* Search Input */}
      <TextField
        label="Search transactions..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Loading Spinner */}
      {loading && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <CircularProgress />
        </div>
      )}

      {/* Error Message */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Transactions Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Sold</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Date of Sale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction._id || transaction.id} hover>
                  <TableCell>
                    <img
                      src={transaction.image}
                      alt={transaction.title}
                      style={{ width: "50px", height: "50px", borderRadius: "8px" }}
                    />
                  </TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell sx={{ maxWidth: "300px", blackSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {transaction.description}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                    ${transaction.price.toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.sold ? "✅ Sold" : "❌ Not Sold"}</TableCell>
                  <TableCell>{new Date(transaction.dateOfSale).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          sx={{ marginRight: 1 }}
        >
          Previous
        </Button>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>Page {page}</span>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage(page + 1)}
          sx={{ marginLeft: 1 }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionsTable;
