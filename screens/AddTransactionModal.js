import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { TransactionsContext } from '../TransactionsProvider';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddTransactionModal = ({ onClose }) => {
    const { transactions, addTransaction } = useContext(TransactionsContext);

    const [type, setType] = useState('Income');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('General');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleAddTransaction = async () => {
        const parsedAmount = parseFloat(amount);

        if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please enter a valid positive amount.',
            });
            return;
        }

        const balance = transactions.reduce((sum, t) => {
            return sum + (t.type === 'Income' ? t.amount : -t.amount);
        }, 0);

        if (type === 'Expense') {
            if (balance - parsedAmount < 0) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Cannot add expense. Total expenses exceed total income.',
                });
                return;
            }
        }

        const newTransaction = {
            id: Date.now().toString(),
            type,
            amount: parsedAmount,
            category,
            date: date.toISOString(),
            description,
        };

        try {
            await addTransaction(newTransaction);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Transaction added successfully.',
            });
            // Reset form fields
            setType('Income');
            setAmount('');
            setCategory('General');
            setDate(new Date());
            setDescription('');
            onClose();
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to add transaction.',
            });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add Transaction</Text>

                    <Text style={styles.label}>Type</Text>
                    <View style={styles.pickerContainer}>

                        <RNPickerSelect
                            onValueChange={(itemValue) => setType(itemValue)}
                            items={[
                                { label: 'Income', value: 'Income' },
                                { label: 'Expense', value: 'Expense' },
                            ]}
                            value={type}
                            style={styles.pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <Icon name="arrow-drop-down" size={24} color="gray" />;
                            }}
                            placeholder={{ label: 'Select Type', value: null }}
                        />
                    </View>

                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Category</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter category"
                        value={category}
                        onChangeText={setCategory}
                    />

                    <Text style={styles.label}>Date</Text>
                    <TouchableOpacity
                        style={styles.datePicker}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text>{date.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) setDate(selectedDate);
                            }}
                        />
                    )}

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter description"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>

                    <Toast />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalContent: {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
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
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 4,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 4,
        backgroundColor: '#fff',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 5,
    },
    addButton: {
        flex: 1,
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
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
});

export default AddTransactionModal;