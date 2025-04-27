import { Ionicons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { router } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DEFAULT_ICON_SIZE } from '~/core/constant';
import { COLORS } from '~/core/theme/colors';
import useNotesStore from '~/store/store';

type NoteProps = {
  item: Note;
};
export interface MenuActionEvent {
  nativeEvent: {
    event: string;
    index?: number;
  };
}




const Note = ({ item }: NoteProps) => {
  const { deleteNote } = useNotesStore();
  const { showActionSheetWithOptions } = useActionSheet();

  const handleMenuPress = () => {
    const options = ['Edit', 'Delete', 'Cancel'];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        // iOS-only options:
        userInterfaceStyle: 'light',
        // Android-only options:
        title: 'Note Actions',
        message: 'Choose an action',
        showSeparators: true,
        textStyle: { color: COLORS.primary },
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            router.push({ pathname: '/details', params: { noteId: item.id } });
            break;
          case 1:
            deleteNote(item.id);
            break;
          case cancelButtonIndex:
            // Cancel pressed
            break;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity 
          onPress={handleMenuPress}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons 
            name="ellipsis-vertical" 
            size={DEFAULT_ICON_SIZE} 
            color={COLORS.primary} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Note;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF9F0',
    borderRadius: 24,
    paddingVertical: 24,
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 20,
    color: COLORS.primary,
  },
});