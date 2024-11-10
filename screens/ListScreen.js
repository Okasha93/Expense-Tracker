import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { TransactionsContext } from '../TransactionsProvider';
import TransactionList from '../components/TransactionList';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../components/Header';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListScreen = () => {
    const { transactions } = useContext(TransactionsContext);

    const [filterType, setFilterType] = useState('All');
    const [filterDate, setFilterDate] = useState(new Date());
    const [isDateFilterActive, setIsDateFilterActive] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const filteredTransactions = transactions.filter((t) => {
        const matchesType = filterType === 'All' || t.type === filterType;
        const matchesDate = isDateFilterActive
            ? t.date.slice(0, 10) === filterDate.toISOString().slice(0, 10)
            : true;
        return matchesType && matchesDate;
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#333" }}>
            <View style={styles.container}>
                <Header title="Transactions List" />

                <Text style={styles.label}>Filter by Type:</Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(itemValue) => setFilterType(itemValue)}
                        items={[
                            { label: 'All', value: 'All' },
                            { label: 'Income', value: 'Income' },
                            { label: 'Expense', value: 'Expense' },
                        ]}
                        value={filterType}
                        style={styles.pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <Icon name="arrow-drop-down" size={24} color="gray" />;
                        }}
                        placeholder={{}}
                    />

                </View>

                <Text style={styles.label}>Filter by Date:</Text>
                <TouchableOpacity
                    style={styles.datePicker}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text>
                        {isDateFilterActive ? filterDate.toDateString() : 'Select Date'}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={filterDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setFilterDate(selectedDate);
                                setIsDateFilterActive(true);
                            }
                        }}
                    />
                )}
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => {
                        setFilterType('All');
                        setFilterDate(new Date());
                        setIsDateFilterActive(false);
                    }}
                >
                    <Text style={styles.resetButtonText}>Reset Filters</Text>
                </TouchableOpacity>
                <TransactionList transactions={filteredTransactions} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    label: {
        marginTop: 12,
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginTop: 4,
        height: 50
    },
    datePicker: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 4,
        backgroundColor: '#fff',
    },
    pickerSelectStyles: {
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderColor: '#ccc',
            borderRadius: 5,
            color: 'black',
            paddingRight: 30,
            backgroundColor: '#fff',
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderColor: '#ccc',
            borderRadius: 5,
            color: 'black',
            paddingRight: 30,
            backgroundColor: '#fff',
        },
        iconContainer: {
            top: 10,
            right: 12,
        },
        placeholder: {
            color: 'gray',
            fontSize: 16,
        },
    },
    resetButton: {
        marginTop: 20,
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: '5%',
        marginHorizontal: '20%',
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ListScreen;
