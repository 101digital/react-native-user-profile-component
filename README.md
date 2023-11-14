# user-profile-component

**user-profile-component** is a reusable component for get user details that can be used across all the apps developed by 101 Digital.

## Features

- Support get user details

## Installation

To add this component to React Native app, run this command:

```sh
yarn add https://github.com/101digital/react-native-user-profile-component.git#1.0.1
```

Make sure you have permission to access this repository

Because **user-profile-component** depends on some libraries, so make sure you installed all dependencies into your project.

- [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git)
- [react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth).


# React Native User Profile Component

The React Native User Profile Component is a dynamic form generator designed for managing user/customer information in a React Native application.

## Table of Contents

- [Features](#features)
- [Fields](#fields)
- [Usage](#usage)
- [Installation](#installation)
- [Props](#props)
- [License](#license)

## Features

- **Dynamic Form Generation:** The component dynamically generates a form based on provided fields.
- **Field Types:**
  - TextField
  - SelectField
  - LabelField
- **Validation:** Incorporates validation using the Yup library.
- **Field Triggers:** Define triggers for specific fields for dynamic actions.
- **Modal for Selecting Options:** Includes a modal for selecting options in fields like SelectField.
- **State Management:** Uses React hooks for state management.
- **Internationalization (i18n):** Supports translation for field labels.
- **User Details Update:** Allows users to update their profile details.

## Fields

The component supports the following fields:

| Field Name            | Type          | Description                                       | Supported Fields                   |
|-----------------------|---------------|---------------------------------------------------|-------------------------------------|
| userId                | string        | Unique identifier for the user.                    | LabelField                          |
| userName              | string        | User's username or email.                         | LabelField                          |
| firstName             | string        | User's first name.                                | InputField, LabelField              |
| lastName              | string        | User's last name.                                 | InputField, LabelField              |
| nickName              | string        | User's nickname.                                  | InputField, LabelField              |
| email                 | string        | User's email address.                             | InputField, LabelField              |
| mobileNumber          | string        | User's mobile number.                             | InputField, LabelField              |
| isUSCitizen           | boolean       | Indicates if the user is a US citizen.            | LabelField, SelectField or RadioField|
| status                | string        | User's status (e.g., Prospect).                   | InputField, LabelField              |
| lastLoginAt           | string        | Timestamp of the last login.                      | LabelField                          |
| contacts              | array         | Array of user contacts.                           | SelectField, InputField, LabelField  |
| addresses             | array         | Array of user addresses.                          | SelectField, InputField, LabelField  |
| listCustomFields      | array         | Custom fields with ids, keys, and values.         | SelectField, InputField, LabelField  |
| employmentDetails     | array         | Array of employment details including company name, type, and occupation. | SelectField, InputField, LabelField  |
| taxDetails            | array         | Array of user tax details.                        | SelectField, InputField, LabelField  |
| memberships           | array         | User's memberships with organization details.    | SelectField, InputField, LabelField  |
| kycDetails            | object        | KYC details including an array of documents.     | LabelField, SelectField, InputField  |
| apps                  | array         | Array of user apps with names and onboarding dates. | SelectField, InputField, LabelField |
| listRoles             | array         | List of user roles.                              | SelectField, InputField, LabelField  |
| creditDetails         | array         | Array of credit details including credit type, card and loan counts, and annual income. | SelectField, InputField, LabelField |
| createdAt             | string        | Timestamp of user creation.                      | LabelField                          |
| passwordExpired      | boolean       | Indicates if the user's password has expired.    | LabelField, SelectField or RadioField|
| updatedAt             | string        | Timestamp of the last update.                    | LabelField                          |
| religion              | string        | User's religion.                                 | InputField, LabelField              |
| cif                   | string        | User's CIF (Customer Information File) number.   | LabelField                          |
| devices               | array         | Array of user devices.                           | SelectField, InputField, LabelField  |
| userPreference        | object        | User's preferences including language code.     | LabelField, SelectField, InputField  |

## Usage

1. **Installation:**
   - Ensure that React, React Native, and other dependencies are installed.
   - Copy the `UserProfile` component into your project.

2. **Import:**
   ```javascript
   import UserProfile from './path/to/UserProfile';

## Usage

1. **Installation:**
   - Ensure that React, React Native, and other dependencies are installed.
   - Copy the `UserProfile` component into your project.

2. **Import:**
   ```javascript
   import UserProfile from './path/to/UserProfile';

   <UserProfile componentName="Profile" enableTranslation={true} />
