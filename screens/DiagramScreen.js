import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Header from '../components/Header';
import { TransactionsContext } from '../TransactionsProvider';

const screenWidth = Dimensions.get('window').width;

const DiagramScreen = () => {
    const { transactions } = useContext(TransactionsContext);

    // Calculate for current month
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

    const remainingIncome = totalIncome - totalExpenses;

    const chartData = [
        {
            name: 'Expenses',
            amount: totalExpenses,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Remaining Income',
            amount: remainingIncome > 0 ? remainingIncome : 0,
            color: 'blue',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
            <View style={styles.container}>
                <Header title="Summary" />
                {totalIncome > 0 ? (
                    <View style={styles.chartContainer}>
                        <PieChart
                            data={chartData}
                            width={screenWidth - 32}
                            height={screenWidth - 32}
                            chartConfig={{
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: () => '#000',
                            }}
                            accessor="amount"
                            backgroundColor="transparent"
                            paddingLeft="85"
                            absolute
                            hasLegend={false}
                        />
                        <View style={styles.legendContainer}>
                            {chartData.map((item, index) => (
                                <View key={index} style={styles.legendItem}>
                                    <View
                                        style={[
                                            styles.legendColor,
                                            { backgroundColor: item.color },
                                        ]}
                                    />
                                    <Text style={styles.legendText}>
                                        {item.name}: ${item.amount.toFixed(2)}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : (
                    <Text style={styles.noDataText}>No data to display.</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        alignItems: 'center',
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    legendContainer: {
        marginTop: 20,
        width: '80%',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    legendColor: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    legendText: {
        fontSize: 16,
        color: '#7F7F7F',
    },
    noDataText: {
        textAlign: 'center',
        marginVertical: 16,
        fontSize: 16,
        color: '#888',
    },
});

export default DiagramScreen;
