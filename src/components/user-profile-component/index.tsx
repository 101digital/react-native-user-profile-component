import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useUser } from 'react-native-user-profile-component';
import { ThemeContext } from 'react-native-theme-component';
import { TextInput } from 'react-native-paper';
import { EditIcon, SelectorIcon, TickIcon } from '../../assets/icon';
import useMergeStyles from './styles';
import Modal from 'react-native-modal';
import { getEnterpriseData } from '@/utils/screen-utils';
const UserProfileComponent = ({ fields }) => {
  const { userDetails, updateUserProfile } = useUser();
  const [initialValues, setInitialValues] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFieldTitle, setSelectedFieldTitle] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  const [isSelectorVisible, setSelectorVisible] = useState(false);
  const [selectFieldData, setSelectFieldData] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [formatedFields, setFormatedFields] = useState({});
  const formikRef = useRef(null);

  const inputRefs = {};
  const styles = useMergeStyles();

  useEffect(() => {
    if (userDetails) {
      const defaultData = {};
      const fieldsData = {};

      const convertFieldName = (fieldName) => fieldName.replace(/[\[\]\.]/g, "_");
      Object.keys(fields).forEach((fieldName) => {
        // Handle employmentDetails as an array
        let pattern = /\[\d+\]\./; // Regular expression to match "[X]."
        let containsPattern = pattern.test(fieldName);

        if (containsPattern) {
          const fieldParts = fieldName.split(".");
          const index = fieldParts[0].match(/\d+/)[0]; // Extract the index from fieldName

          const mainFieldName = fieldParts[0].replace(/\[\d+\]/, '') // Convert nested field name
          const subFieldName = fieldParts[1];
          const detailsField = `${mainFieldName}_${index}_${subFieldName}`;


          if (userDetails[mainFieldName] && userDetails[mainFieldName][index]) {
            const userValue = userDetails[mainFieldName][index][subFieldName];
            defaultData[detailsField] = ensureStringValue(userValue)
          }else{
            defaultData[detailsField] = ''
          }

          fieldsData[detailsField] = fields[fieldName]
        } else {
          if (fields[fieldName].type !== "subtitle") {
            defaultData[convertFieldName(fieldName)] = userDetails[fieldName] || '';
          }

          fieldsData[convertFieldName(fieldName)] = fields[fieldName]
        }
      });

      setInitialValues(defaultData);
      setFormatedFields(fieldsData)
    }
  }, [userDetails, fields]);


  const ensureStringValue=(value)=> {
    if (typeof value === 'number') {
      return value.toString(); // Convert number to string
    }
    if (typeof value === 'string') {
      return value; // It's already a string
    }
    // Handle other types or undefined here if needed
    return ''; // Return an empty string for unsupported types
  }

  // Function to fetch data from getEnterpriseData
  const fetchSelectFieldData = async (fieldName) => {
    try {
      const response = await getEnterpriseData([`EntData_${fieldName}`]);
      setSelectFieldData(response?.[0]?.dataItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const validationSchema = yup.object().shape({});

  const restructureObject=(input)=> {
    const output = {};
    for (const key in input) {
        const parts = key.split('_');
        let currentObject = output;

        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];

            if (!currentObject[part]) {
                if (isNaN(parts[i + 1])) {
                    if (userDetails && userDetails[parts[i - 1]]) {
                      if (userDetails[parts[i - 1]].length > 0) {
                        currentObject[part] = {'id':userDetails[parts[i - 1]][part].id};
                      }else{
                        currentObject[part] = {};
                      }
                    }else{
                      currentObject[part] = {};
                    }

                } else {
                  currentObject[part] = [];
                }
            }
            currentObject = currentObject[part];
        }

        const lastKey = parts[parts.length - 1];
        if (!isNaN(lastKey)) {
            currentObject.push({ [lastKey]: input[key] });
        } else {
            currentObject[lastKey] = input[key];
        }
    }

    return output;
  }

  const saveDetails = async (values, formikBag) => {
    try {

      const changedFieldsValues = {};
      Object.keys(values).forEach((fieldName) => {
        if (values[fieldName] !== initialValues[fieldName]) {
          changedFieldsValues[fieldName] = values[fieldName];
        }
      });

      const changedFields =restructureObject(changedFieldsValues);

      if (Object.keys(changedFields).length > 0) {
        await updateUserProfile(userDetails.userId, changedFields);
        setSuccessMessage('Profile updated successfully');
        setErrorMessage('');

        // setInitialValues({ ...initialValues, ...changedFields });
      } else {
        setSuccessMessage('');
        setErrorMessage('No changes to save.');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error updating profile: ' + error.message);
    }
  };

  const handleInputIconPress = (fieldName) => {
    if (inputRefs[fieldName]) {
      inputRefs[fieldName].focus();
    }
  };

  const handleInputFocus = (fieldName) => {
    setActiveInput(fieldName);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  // Function to show/hide the selector modal
  const toggleSelector = () => {
    setSelectorVisible(!isSelectorVisible);
  };

  // Function to handle selecting an option
  const handleOptionSelect = (option,fieldName) => {

    formikRef.current.setFieldValue(fieldName, option.value);

    setSelectedValues({
      ...selectedValues,
      [fieldName]: option.value,
    });
    toggleSelector();
  };

  const getMaxHeight = () => {
    if (selectFieldData) {
      if (selectFieldData.length < 3) {
        return '20%'; // 1/4 of the screen height
      } else if (selectFieldData.length < 10) {
        return '40%'; // 2/4 of the screen height
      }else if (selectFieldData.length < 15) {
        return '50%'; // 2/4 of the screen height
      } else {
        return '80%'; // 3/4 of the screen height
      }
    }
    return '50%'; // Default to 2/4 of the screen height
  };

  return (
    <ScrollView contentContainerStyle={styles.container} >
      {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={saveDetails}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <>
              {Object.keys(formatedFields).map((fieldName) => {
                return (
                  <View
                    testID={`container-user-info${fieldName}`}
                    style={styles.userInfo}
                    key={fieldName}
                  >
                    {formatedFields[fieldName].type === 'subtitle' && (
                      <Text style={styles.subtitle}>{formatedFields[fieldName].label}</Text>
                    )}
                    {formatedFields[fieldName].type === 'textField' && (
                      <View style={styles.inputWrapper}>
                        <View
                          style={[
                            styles.inputContent,
                            activeInput === fieldName ? styles.activeInput : null,
                          ]}
                        >
                          <TextInput
                            testID={`textinput-user-info${fieldName}`}
                            style={[
                              styles.input,
                              values[fieldName] !== initialValues[fieldName]
                                ? styles.errorInput
                                : null,
                            ]}
                            label={formatedFields[fieldName].label}
                            name={fieldName}
                            onChangeText={handleChange(fieldName)}
                            value={values[fieldName]}
                            onBlur={handleSubmit}
                            onFocus={() => handleInputFocus(fieldName)}
                            editable={formatedFields[fieldName].isEditable}
                            underlineColor="transparent"
                            underlineStyle={{
                              display: 'none',
                            }}
                            onBlur={handleInputBlur}
                            ref={(ref) => (inputRefs[fieldName] = ref)}
                          />
                          <TouchableOpacity
                            onPress={() => handleInputIconPress(fieldName)}
                            activeOpacity={0.7}
                            style={styles.inputIconWrapper}
                          >
                            <EditIcon />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    {formatedFields[fieldName].type === 'selectField' && (
                      <View style={styles.inputWrapper}>
                        <View
                          style={[
                            styles.inputContent,
                            activeInput === fieldName ? styles.activeInput : null,
                          ]}
                        >
                          <TextInput
                            testID={`textinput-user-info${fieldName}`}
                            style={[
                              styles.input,
                              values[fieldName] !== initialValues[fieldName]
                                ? styles.errorInput
                                : null,
                            ]}
                            label={formatedFields[fieldName].label}
                            name={fieldName}
                            value={selectedValues[fieldName] || values[fieldName]}
                            onFocus={() => handleInputFocus(fieldName)}
                            editable={false}
                            underlineColor="transparent"
                            underlineStyle={{
                              display: 'none',
                            }}
                            onBlur={handleInputBlur}
                            ref={(ref) => (inputRefs[fieldName] = ref)}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedFieldTitle(formatedFields[fieldName].label)
                              setSelectedField(fieldName)
                              toggleSelector()
                              // Fetch data when the selectField is clicked
                              if (fieldName.includes('_')) {
                                const lastPart = fieldName.split('_').pop();
                                fetchSelectFieldData(lastPart);
                              } else {
                                fetchSelectFieldData(fieldName);
                              }
                            }} // Open the action sheet modal
                            activeOpacity={0.7}
                            style={styles.inputIconWrapper}
                          >
                            <SelectorIcon />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    {formatedFields[fieldName].type === 'labelField' && (
                      <>
                        <Text testID={`text-user-info${fieldName}`} style={styles.fieldLabel}>
                          {formatedFields[fieldName].label}:
                        </Text>
                        <Text style={styles.label}>{values[fieldName]}</Text>
                      </>
                    )}
                    {formatedFields[fieldName].type === 'datePicker' && (
                      <View>
                        <Text testID={`text-user-info${fieldName}`} style={styles.fieldLabel}>
                          {formatedFields[fieldName].label}:
                        </Text>
                        <Text style={styles.label}>{values[fieldName]}</Text>
                        <Button title="Change Date" onPress={() => openDatePicker(fieldName)} />
                      </View>
                    )}
                    <ErrorMessage name={fieldName} component={Text} style={styles.errorText} />
                  </View>
                );
              })}
              {Object.values(formatedFields).some((field) => field.isEditable) && (
                <View style={styles.saveButtonContainer}>
                  <Button title="Save Details" onPress={handleSubmit} />
                </View>
              )}
            </>
          );
        }}
      </Formik>
      <Modal
        isVisible={isSelectorVisible}
        onBackdropPress={() => {
          toggleSelector()
          setSelectedFieldTitle('')
          setSelectedField('')
          setSelectFieldData(null);
        }} // Close the modal when clicking outside
        backdropOpacity={0.5}
        animationIn="slideInUp" // Specify the animation to open from the bottom
        animationOut="slideOutDown" // Specify the animation to close towards the bottom
        style={styles.selectorWrapper}
        // style={[styles.selectorWrapper, { height: getMaxHeight() }]}
      >
        <View style={[styles.selectorContainer,{ height: getMaxHeight() }]}>
          {/* Add your action sheet content here */}
          <Text style={styles.selectorTitle}>{selectedFieldTitle}</Text>
          <ScrollView   showsVerticalScrollIndicator={false}>
          {selectFieldData ? (
            selectFieldData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleOptionSelect(item, selectedField);
                }} // Open the action sheet modal
                activeOpacity={0.7}
                // style={styles.inputIconWrapper}
              >
                {formikRef.current.getFieldProps(selectedField).value === item.value ? <View style={styles.selectedItem}>
                  <Text>{item.value}</Text>
                  <TickIcon />
                </View> :
                <View style={styles.selectorItem}>
                  <Text>{item.value}</Text>
                </View> }
              </TouchableOpacity>
            ))
          ) : (
            <Text>Loading data...</Text>
          )}
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default UserProfileComponent;
