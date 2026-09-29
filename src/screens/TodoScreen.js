import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { usePersistentState } from '../storage';

export default function TodoScreen() {
  const [todos, setTodos] = usePersistentState('todos', []);
  const [text, setText] = useState('');

  const add = () => {
    const title = text.trim();
    if (!title) return;
    setTodos([{ id: Date.now().toString(), title, done: false }, ...todos]);
    setText('');
  };
  const toggle = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>لیست کارها</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={add}
          placeholder="کار جدید..."
          textAlign="right"
        />
        <TouchableOpacity style={styles.addBtn} onPress={add}>
          <Text style={styles.addText}>افزودن</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(t) => t.id}
        ListEmptyComponent={<Text style={styles.empty}>هنوز کاری اضافه نشده</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => toggle(item.id)}>
              <Text style={[styles.itemText, item.done && styles.done]}>
                {item.done ? '☑ ' : '☐ '}
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => remove(item.id)}>
              <Text style={styles.del}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'right', marginBottom: 12 },
  row: { flexDirection: 'row-reverse', marginBottom: 12 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: '#ddd' },
  addBtn: { backgroundColor: '#4f46e5', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center', marginRight: 8 },
  addText: { color: '#fff', fontWeight: 'bold' },
  item: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 8 },
  itemText: { fontSize: 16, textAlign: 'right' },
  done: { textDecorationLine: 'line-through', color: '#999' },
  del: { fontSize: 18, marginRight: 8 },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
});
