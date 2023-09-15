import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from 'react-native-dashboard-component';

const UserProfileComponent: React.FC<UserProfileProps> = () => {
  const { userDetails } = useUser();

  console.log('userDetails ',userDetails);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{userDetails?.firstName}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userDetails?.email}</Text>

        <Text style={styles.label}>Mobile Number:</Text>
        <Text style={styles.value}>{userDetails?.mobileNumber}</Text>

        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>{userDetails?.dateOfBirth}</Text>

        {/* Add more user details here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    marginTop: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default UserProfileComponent;
