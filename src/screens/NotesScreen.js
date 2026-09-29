import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { usePersistentState } from '../storage';

export default function NotesScreen() {
  const [notes, setNotes] = usePersistentState('notes', []);
  const [editing, setEditing] = useState(null); // note object or {id: null}
  const [draft, setDraft] = useState('');

  const open = (note) => {
    setEditing(note);
    setDraft(note.body);
  };
  const save = () => {
    const body = draft.trim();
    if (body) {
      if (editing.id) setNotes(notes.map((n) => (n.id === editing.id ? { ...n, body } : n)));
      else setNotes([{ id: Date.now().toString(), body }, ...notes]);
    }
    setEditing(null);
  };
  const remove = () => {
    if (editing.id) setNotes(notes.filter((n) => n.id !== editing.id));
    setEditing(null);
  };

  if (editing) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.editor}
          value={draft}
          onChangeText={setDraft}
          multiline
          autoFocus
          placeholder="یادداشت خود را بنویسید..."
          textAlign="right"
          textAlignVertical="top"
        />
        <View style={styles.actions}>
          <TouchableOpacity style={styles.save} onPress={save}>
            <Text style={styles.btnText}>ذخیره</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.delete} onPress={remove}>
            <Text style={styles.btnText}>حذف</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>یادداشت‌ها</Text>
      <FlatList
        data={notes}
        keyExtractor={(n) => n.id}
        ListEmptyComponent={<Text style={styles.empty}>یادداشتی وجود ندارد</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => open(item)}>
            <Text style={styles.cardText} numberOfLines={3}>{item.body}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => open({ id: null, body: '' })}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'right', marginBottom: 12 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 8 },
  cardText: { fontSize: 16, textAlign: 'right' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
  fab: { position: 'absolute', bottom: 20, left: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#4f46e5', alignItems: 'center', justifyContent: 'center', elevation: 4 },
  fabText: { color: '#fff', fontSize: 28 },
  editor: { flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16 },
  actions: { flexDirection: 'row-reverse', marginTop: 12 },
  save: { flex: 1, backgroundColor: '#4f46e5', padding: 14, borderRadius: 8, alignItems: 'center', marginLeft: 8 },
  delete: { flex: 1, backgroundColor: '#dc2626', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
