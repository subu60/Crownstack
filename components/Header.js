import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'rgb(223,244,251)', fontWeight: 'bold' }}>
        SONGS
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'rgb(1,122,208)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
