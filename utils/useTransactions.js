import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export const useTransactions = (initialTransactions = []) => {
    const [transactions, setTransactions] = useState(initialTransactions);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const storedTransactions = await AsyncStorage.getItem('transactions');
                if (storedTransactions) {
                    setTransactions(JSON.parse(storedTransactions));
                }
            } catch (e) {
                console.error('Failed to load transactions.', e);
            }
        };

        loadTransactions();
    }, []);

    const addTransaction = async (transaction) => {
        try {
            setTransactions((prevTransactions) => {
                const newTransactions = [...prevTransactions, transaction];
                AsyncStorage.setItem('transactions', JSON.stringify(newTransactions))
                    .catch(e => console.error('Failed to save transaction.', e));
                return newTransactions;
            });
        } catch (e) {
            console.error('Failed to add transaction.', e);
            throw e;
        }
    };


    return {
        transactions,
        setTransactions,
        addTransaction,
    };
};
