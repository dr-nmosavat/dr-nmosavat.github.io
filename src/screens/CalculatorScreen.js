import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const KEYS = [
  ['C', '⌫', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

const OPS = { '+': (a, b) => a + b, '-': (a, b) => a - b, '×': (a, b) => a * b, '÷': (a, b) => a / b };

const fmt = (n) => (Number.isFinite(n) ? String(parseFloat(n.toPrecision(12))) : 'خطا');

export default function CalculatorScreen() {
  const [display, setDisplay] = useState('0');
  const [acc, setAcc] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(true); // next digit starts a new number

  const press = (k) => {
    if (/\d/.test(k)) {
      setDisplay(fresh || display === '0' ? k : display + k);
      setFresh(false);
    } else if (k === '.') {
      if (fresh) { setDisplay('0.'); setFresh(false); }
      else if (!display.includes('.')) setDisplay(display + '.');
    } else if (k === 'C') {
      setDisplay('0'); setAcc(null); setOp(null); setFresh(true);
    } else if (k === '⌫') {
      if (!fresh) setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else if (k === '%') {
      setDisplay(fmt(parseFloat(display) / 100));
    } else {
      // operator or '='
      const cur = parseFloat(display);
      const result = acc != null && op && !fresh ? OPS[op](acc, cur) : cur;
      setDisplay(fmt(result));
      setAcc(k === '=' ? null : result);
      setOp(k === '=' ? null : k);
      setFresh(true);
    }
  };

  const isOp = (k) => '÷×-+='.includes(k);

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>{display}</Text>
      </View>
      {KEYS.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((k) => (
            <TouchableOpacity
              key={k}
              style={[styles.key, isOp(k) && styles.opKey, k === '0' && styles.zero]}
              onPress={() => press(k)}
            >
              <Text style={[styles.keyText, isOp(k) && { color: '#fff' }]}>{k}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'flex-end' },
  screen: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, alignItems: 'flex-end' },
  display: { fontSize: 48 },
  row: { flexDirection: 'row', marginBottom: 8 },
  key: { flex: 1, backgroundColor: '#fff', margin: 4, paddingVertical: 20, borderRadius: 8, alignItems: 'center' },
  zero: { flex: 2 },
  opKey: { backgroundColor: '#4f46e5' },
  keyText: { fontSize: 22, fontWeight: '600' },
});
