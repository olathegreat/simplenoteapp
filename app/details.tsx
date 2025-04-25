import { Ionicons } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';

import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';
import { DEFAULT_ICON_SIZE } from '~/core/constant';
import { COLORS } from '~/core/theme/colors';
import useNotesStore from '~/store/store';
 
export default function Details() {
  const { noteId } = useLocalSearchParams();
 
  const { getNote, updateNote } = useNotesStore();
  const note = getNote(noteId as string);
 
  const [noteText, setNoteText] = useState(note?.title ?? '');
 
  const navigateBack = () => {
    router.back();
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Details', headerShown: false }} />
 
      {/* <KeyboardAvoidingView style={styles.keyboardAvoidingViewController} behavior="padding"> */}
      <KeyboardAvoidingView 
  style={styles.keyboardAvoidingViewController}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust for iOS/Android
  keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })} // Optional offset
>
        <View className="flex-1 p-6">
          <TouchableOpacity onPress={navigateBack}>
            <Ionicons name="arrow-back" size={DEFAULT_ICON_SIZE} />
          </TouchableOpacity>
 
          <View
            >
            <TextInput
              placeholder="Edit Note"
              className="p-5 text-xl"
              multiline
              defaultValue={note?.title ?? ''}
              autoFocus
              onChangeText={setNoteText}
            />
          </View>
 
          <View className="absolute rounded-lg bottom-10 right-10 bg-blue-500">
            
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                if (note) {
                  updateNote(note.id, {
                    title: noteText,
                  });
                  toast.success('Notes updated');
                  router.back();
                }
              }}>
              <Ionicons name="checkmark" color='white' size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingViewController: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: '#F4F4F4',
    marginTop: 16,
  },
  updateButton: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});