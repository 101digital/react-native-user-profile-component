# react-native-user-profile-component

**react-native-user-profile-component** is a reusable component for get user details that can be used across all the apps developed by 101 Digital.

## Features

- Support get user details

## Installation

To add this component to React Native app, run this command:

```sh
yarn add https://github.com/101digital/react-native-user-profile-component.git#1.0.1
```

Make sure you have permission to access this repository

Because **react-native-user-profile-component** depends on some libraries, so make sure you installed all dependencies into your project.

- [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git)
- [react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth).

## Quick Start

Before using this component, you must configure environment variables. That should be configure early in top of your `app.ts`

```javascript
import { AuthComponent,createAuthorizedApiClient,AuthProvider } from 'auth-user-component';
import { MemberShipService, UserProvider } from 'react-native-user-profile-component';


AuthComponent.instance()
  .configure()
  .then(() => {
      MemberShipService.instance().initClients({
        memberShipClient: createAuthorizedApiClient(),
      });
    });
  });

const App = () => {
  return (
    <View>
      <AuthProvider>
        <UserProvider>
          /* YOUR OTHER COMPONENTS */
        </UserProvider>
      </AuthProvider>
    </View>
  );
};
export default App;
```

**react-native-user-profile-component** also provides `useUser` using Context API to maintain api response state. If you want to use `useUser` you **HAVE TO** wrap your components with `UserProvider`. This is required if you use `UserProfileComponent`.
