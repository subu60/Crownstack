import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Header from './components/Header';
import SongsList from './components/SongsList';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />
        <SongsList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
