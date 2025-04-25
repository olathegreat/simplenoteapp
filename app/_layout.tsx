import { ThemeProvider } from '@react-navigation/native';
import '../global.css';
 
// import { KeyboardProvider } from 'react-native-keyboard-controller';
//  import { KeyboardAvoidingView, Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { Toaster } from 'sonner-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useThemeConfig } from '~/core/theme/use-theme-config';
 
const Providers = ({ children }: { children: ReactNode }) => {
  const theme = useThemeConfig();
 
  return (
    <ActionSheetProvider>
    <GestureHandlerRootView style={styles.container}>
      {/* <KeyboardProvider> */}
      
        <ThemeProvider value={theme}>{children}</ThemeProvider>
        <Toaster />
        
        
      {/* </KeyboardProvider> */}
    </GestureHandlerRootView>
    </ActionSheetProvider>
  );
};
 
export default function RootLayoutNav() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="details" />
      </Stack>
    </Providers>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});
 
