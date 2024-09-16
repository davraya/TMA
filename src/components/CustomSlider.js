// CustomSlider.js

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const CustomSlider = ({ onValueChange }) => {
  const [value, setValue] = useState(1);

  const getLabel = (value) => {
    switch (value) {
      case 1:
        return 'Low';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      default:
        return '';
    }
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
        <Text>Priority</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={3}
        step={1}
        value={value}
        onValueChange={handleValueChange}
        minimumTrackTintColor="#1E90FF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#1E90FF"
      />
      <View style={styles.valuesContainer}>
        <Text style={styles.valueLabel}>Low</Text>
        <Text style={styles.valueLabel}>Medium</Text>
        <Text style={styles.valueLabel}>High</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignItems: 'center',
    // padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 15,
    paddingTop: 10,
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  valueLabel: {
    fontSize: 12,
  },
});

export default CustomSlider;
