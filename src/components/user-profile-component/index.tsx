import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useUser } from 'react-native-user-profile-component';

const UserProfileComponent = ({ fields }) => {
  const { userDetails, updateUserProfile } = useUser();
  const [initialValues, setInitialValues] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userDetails) {
      const defaultData = {};
      Object.keys(fields).forEach((fieldName) => {
        defaultData[fieldName] = userDetails[fieldName] || '';
      });

      setInitialValues(defaultData);
    }
  }, [userDetails, fields]);

  // Define validation schema using Yup
  const validationSchema = yup.object().shape({
    // Define validation rules for your fields here
    // Example: fieldName: yup.string().required('This field is required'),
  });

  const saveDetails = async (values, formikBag) => {
    try {
      const changedFields = {};
      Object.keys(values).forEach((fieldName) => {
        if (values[fieldName] !== initialValues[fieldName]) {
          changedFields[fieldName] = values[fieldName];
        }
      });

      if (Object.keys(changedFields).length > 0) {
        await updateUserProfile(userDetails.userId, changedFields);
        setSuccessMessage('Profile updated successfully');
        setErrorMessage(''); // Clear any previous error messages

        // Update initialValues with the new values to keep the form populated
        setInitialValues({ ...initialValues, ...changedFields });
      } else {
        setSuccessMessage('');
        setErrorMessage('No changes to save.');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error updating profile: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={saveDetails}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <View>
              {Object.keys(fields).map((fieldName) => {
                return (
                  <View style={styles.userInfo} key={fieldName}>
                    <Text style={styles.fieldLabel}>{fields[fieldName].label}:</Text>
                    {fields[fieldName].type === 'textField' && (
                      <TextInput
                        testID={`${fields[fieldName].type}-${fieldName}`}
                        style={[
                          styles.input,
                          values[fieldName] !== initialValues[fieldName] ? styles.errorInput : null,
                        ]}
                        name={fieldName}
                        onChangeText={handleChange(fieldName)}
                        value={values[fieldName]}
                        onBlur={handleSubmit}
                        editable={fields[fieldName].isEditable}
                      />
                    )}
                    {fields[fieldName].type === 'labelField' && (
                      <Text testID={`${fields[fieldName].type}-${fieldName}`}
                            style={[styles.label]}>{values[fieldName]}</Text>
                    )}
                    {fields[fieldName].type === 'datePicker' && (
                      <View testID={`${fields[fieldName].type}-${fieldName}`}>
                        <Text style={[styles.label]}>{values[fieldName]}</Text>
                        <Button title="Change Date" onPress={() => openDatePicker(fieldName)} />
                      </View>
                    )}
                    <ErrorMessage name={fieldName} component={Text} style={styles.errorText} />
                  </View>
                );
              })}
              {Object.values(fields).some((field) => field.isEditable) && (
                <View style={styles.saveButtonContainer}>
                  <Button title="Save Details" onPress={handleSubmit} />
                </View>
              )}
            </View>
          );
        }}
      </Formik>
    </ScrollView>
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
  errorText: {
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
  saveButtonContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default UserProfileComponent;
