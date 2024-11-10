import React, { createContext } from 'react';
import { useTransactions } from './utils/useTransactions';

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
    const transactionsData = useTransactions();

    return (
        <TransactionsContext.Provider value={transactionsData}>
            {children}
        </TransactionsContext.Provider>
    );
};
