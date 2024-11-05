import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme === 'light' ? colors.light.background : colors.dark.background }
    ]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backButtonText, { color: theme === 'light' ? colors.light.text : colors.dark.text }]}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme === 'light' ? colors.light.text : colors.dark.text }]}>
        Settings
      </Text>

      <View style={styles.settingItem}>
        <Text style={[styles.settingLabel, { color: theme === 'light' ? colors.light.text : colors.dark.text }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.light.secondary, true: colors.dark.accent }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff20',
  },
  settingLabel: {
    fontSize: 16,
  },
});

export default SettingsScreen;
