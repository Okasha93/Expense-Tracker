import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionItem = ({ transaction }) => {
    const { type, amount, category, date, description } = transaction;

    return (
        <View style={styles.item}>
            <View style={styles.row}>
                <Text style={styles.description}>{description}</Text>
                <Text
                    style={[
                        styles.amount,
                        { color: type === 'Income' ? 'green' : 'red' },
                    ]}
                >
                    {type === 'Expense' ? '-' : '+'}${parseFloat(amount).toFixed(2)}
                </Text>
            </View>
            <Text style={styles.details}>
                {category} | {new Date(date).toDateString()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        marginTop: 10,
        fontSize: 14,
        color: '#555',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TransactionItem;
