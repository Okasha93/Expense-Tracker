import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions }) => {
    return (
        <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionItem transaction={item} />}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 16,
    },
});

export default TransactionList;
