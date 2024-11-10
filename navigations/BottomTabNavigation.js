import { View, Platform, Image, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import ListScreen from '../screens/ListScreen';
import DiagramScreen from '../screens/DiagramScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {

    const tabs = [
        {
            name: 'TransactionsList',
            component: ListScreen,
            icon: require('../assets/icons/document2.png'),
            labelKey: 'List',
        },
        {
            name: 'Dashboard',
            component: DashboardScreen,
            icon: require('../assets/icons/home2.png'),
            labelKey: 'Dashboard',
        },
        {
            name: 'TransactionsDiagram',
            component: DiagramScreen,
            icon: require('../assets/icons/chart.png'),
            labelKey: 'Summary',
        },
    ];

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    justifyContent: 'center',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 0,
                    height: Platform.OS === 'ios' ? 90 : 60,
                    backgroundColor: "#fff",
                    borderTopColor: 'transparent',
                },
            }}
        >
            {tabs.map((tab, index) => (
                <Tab.Screen
                    key={index}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={tab.icon}
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused ? "blue" : "gray",
                                    }}
                                />
                                <Text
                                    style={{
                                        color: focused ? "blue" : "gray",
                                    }}
                                >
                                    {tab.labelKey}
                                </Text>
                            </View>
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;
