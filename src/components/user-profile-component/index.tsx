import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from 'react-native-user-profile-component';

const UserProfileComponent: React.FC<UserProfileProps> = () => {
  const { userDetails } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{`${userDetails?.firstName} ${userDetails?.lastName}`}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userDetails?.email}</Text>

        <Text style={styles.label}>Mobile Number:</Text>
        <Text style={styles.value}>{userDetails?.mobileNumber}</Text>

        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>{userDetails?.dateOfBirth}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop:33
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
