import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const { fetchTransactions } = require('../api/transactionAPI')
const { calculatePoints } = require('../utils/rewardCalculation')

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Applied CSS for item
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
    height: '230px',
    width: '200px',
    marginRight: '30px',
    marginTop: '20px'
  }));

  useEffect(() => {
    //API call for fetching transaction
    const loadData = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load transactions');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  //calculation monthly points
  const getMonthlyPoints = (customerId, month) => {
    return transactions
      .filter(transaction => transaction.customerId === customerId && transaction.date.startsWith(month))
      .reduce((total, transaction) => total + calculatePoints(transaction.amount), 0);
  };


  const renderTransactionList = () => {
    if (loading) return <p>Loading transactions...</p>;
    if (error) return <p>{error}</p>;

    const customers = [...new Set(transactions.map(t => t.customerId))]; // Unique customer ids

    return customers.map(customerId => {
      const months = ['2024-10', '2024-11', '2024-12'];

      return (
        <Box sx={{ flexGrow: 1 }} display={'inline-flex'}>
          <Grid container spacing={4}>
            <Grid>
              <Item>
                <div key={customerId}>

                  <h3>Customer {customerId}</h3>
                  {months.map(month => {
                    const points = getMonthlyPoints(customerId, month);
                    return (
                      <div key={month}>
                        <p>{month}: {points} points</p>
                      </div>
                    );
                  })}


                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      );
    });
  };

  return <div>{renderTransactionList()}</div>;
};

export default TransactionList;
