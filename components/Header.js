import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import React from 'react';


const Header = ({ title }) => {

  return (
    <View style={[styles.container, {
      backgroundColor: 'white'
    }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: "center",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 24,
    color: 'black',
    paddingBottom: 30
  }
})

export default Header