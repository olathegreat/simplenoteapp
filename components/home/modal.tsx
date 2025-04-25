
import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import useNotesStore from '~/store/store';
 
import { nanoid } from 'nanoid/non-secure';
import { toast } from 'sonner-native';
import { COLORS } from '~/core/theme/colors';
 
type AddNoteModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};
 
const AddNoteModal = ({ setVisible, visible }: AddNoteModalProps) => {
  const [noteText, setNoteText] = useState('');
  const { addNote } = useNotesStore();
 
  const handleAddNote = () => {
    /**
     * Add note
     */
    const newNote = {
      id: nanoid(),
      title: noteText,
    };
    addNote(newNote);
    setNoteText('');
    setVisible(false);
    toast.success('🥳 Note added successfully');
  };
 
  const closeModal = () => {
    setVisible(false);
  };
 
  return (
    <Modal visible={visible} transparent={true} style={styles.modal}>
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        ]}>
        <View style={[styles.modalView]} className="p-8">
          <Text className="text-2xl font-medium text-primary">New Note</Text>
          <TextInput
            placeholder="Create a note"
            placeholderTextColor={'grey'}
            className="mt-2 rounded border-b border-primary bg-white py-4 text-xl"
            onChangeText={setNoteText}
          />
 
          <View className="mt-4 flex flex-row items-center justify-between py-4">
            <TouchableOpacity
            className='rounded-lg'
              style={styles.button}
        
              onPress={closeModal}>
              <Text className="text-xl text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              className='rounded-lg'
              
              onPress={handleAddNote}>
              <Text className="text-xl text-white">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
 
export default AddNoteModal;
 
const styles = StyleSheet.create({
  modal: {
    zIndex: 100,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 16,
    paddingTop: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 48,
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 