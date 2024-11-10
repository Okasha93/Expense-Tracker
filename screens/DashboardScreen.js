import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';
import AddTransactionModal from './AddTransactionModal';
import Toast from 'react-native-toast-message';
import Header from '../components/Header';
import { TransactionsContext } from '../TransactionsProvider';

const DashboardScreen = () => {
    const { transactions } = useContext(TransactionsContext);
    const [modalVisible, setModalVisible] = useState(false);

    // Calculate total income and expenses for the current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const transactionsThisMonth = transactions.filter((t) => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });

    const totalIncome = transactionsThisMonth
        .filter((t) => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactionsThisMonth
        .filter((t) => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const remainingBalance = totalIncome - totalExpenses;

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#333"
        }}>
            <View style={styles.container}>
                <Header title="Dashboard" />
                <Text style={styles.welcome}>Welcome Eslam Okasha </Text>
                <Text style={styles.summaryText}>Total Income: <Text style={{ color: 'green' }}>${totalIncome.toFixed(2)}</Text></Text>
                <Text style={styles.summaryText}>Total Expenses: <Text style={{ color: 'red' }}> ${totalExpenses.toFixed(2)}</Text></Text>
                <Text style={styles.summaryText}>
                    Remaining Balance: <Text style={{ color: 'blue' }}>${remainingBalance.toFixed(2)}</Text>
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Add Transaction</Text>
                </TouchableOpacity>

                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <AddTransactionModal onClose={() => setModalVisible(false)} />
                </Modal>

                <Toast />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        paddingHorizontal: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center',
        paddingHorizontal: '15%',
        paddingVertical: '15%',
    },
    summaryText: {
        fontSize: 18,
        marginVertical: '5%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 4,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#0000ff',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: '15%',
        marginHorizontal: '15%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default DashboardScreen;
