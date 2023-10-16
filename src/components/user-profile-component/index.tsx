import React from 'react';
import { View, Text, TextInput, DatePickerAndroid, Button, StyleSheet } from 'react-native';
import { useUser } from 'react-native-user-profile-component';

const UserProfileComponent: React.FC<UserProfileProps> = ({ fields }) => {
  const { userDetails } = useUser();

  const openDatePicker = async (fieldName) => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(userDetails?.[fieldName]),
      });
      if (action === DatePickerAndroid.dateSetAction) {
        const selectedDate = new Date(year, month, day);
        // Handle the selected date or update the user's date of birth here
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const renderField = (fieldName, fieldType) => {
    if (!userDetails) {
      return null; // Handle when userDetails is null or undefined
    }

    const isEditable = fields[fieldName].isEditable;
    const value = userDetails[fieldName];

    switch (fieldType) {
      case 'textField':
        return (
          <TextInput
            style={[styles.input, isEditable ? styles.editable : styles.readOnly]}
            value={value}
            editable={isEditable}
          />
        );
      case 'labelField':
        return <Text style={[styles.label, isEditable ? styles.editable : styles.readOnly]}>{value}</Text>;
      case 'datePicker':
        return (
          <View>
            <Text style={[styles.label, isEditable ? styles.editable : styles.readOnly]}>{value}</Text>
            {isEditable && (
              <Button title="Change Date" onPress={() => openDatePicker(fieldName)} />
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {Object.keys(fields).map((fieldName) => (
        <View style={styles.userInfo} key={fieldName}>
          <Text style={styles.fieldLabel}>{fields[fieldName].label}:</Text>
          {renderField(fieldName, fields[fieldName].type)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 33,
  },
  userInfo: {
    marginTop: 16,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
  },
  editable: {
    backgroundColor: '#fff',
  },
  readOnly: {
    backgroundColor: '#f0f0f0',
  },
});

export default UserProfileComponent;
