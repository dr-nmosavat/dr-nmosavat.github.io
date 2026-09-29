import React, { useState } from 'react';
import { I18nManager, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TodoScreen from './src/screens/TodoScreen';
import NotesScreen from './src/screens/NotesScreen';
import CalculatorScreen from './src/screens/CalculatorScreen';

I18nManager.allowRTL(true);

const TABS = [
  { key: 'todo', title: 'کارها', icon: '✅', Screen: TodoScreen },
  { key: 'notes', title: 'یادداشت', icon: '📝', Screen: NotesScreen },
  { key: 'calc', title: 'ماشین‌حساب', icon: '🧮', Screen: CalculatorScreen },
];

export default function App() {
  const [active, setActive] = useState('todo');
  const { Screen } = TABS.find((t) => t.key === active);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Screen />
      </View>
      <View style={styles.tabBar}>
        {TABS.map((t) => (
          <TouchableOpacity key={t.key} style={styles.tab} onPress={() => setActive(t.key)}>
            <Text style={styles.icon}>{t.icon}</Text>
            <Text style={[styles.label, active === t.key && styles.labelActive]}>{t.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f5f6fa', paddingTop: 30 },
  content: { flex: 1 },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  icon: { fontSize: 22 },
  label: { fontSize: 12, color: '#888', marginTop: 2 },
  labelActive: { color: '#4f46e5', fontWeight: 'bold' },
});
