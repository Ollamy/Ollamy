# Ollamy Mobile Application setup and good practices

This project is built using Expo, a framework and a platform for universal React applications.

## Table of Contents

- [Installation](#installation)
- [Development Setup](#development-setup)
- [Adding a New Component](#adding-a-new-component)
- [Adding a New View](#adding-a-new-view)
- [Making an API Call](#making-an-api-call)

---

## Installation

To get started, make sure you have Node.js and npm (Node Package Manager) installed on your machine.

1. Clone the repository:

```
git clone git@github.com:Ollamy/Ollamy.git
cd Ollamy
```

2. Install dependencies:

```
yarn
```

---

## Development Setup

1. **Expo CLI**: If you haven't installed Expo CLI globally, you can do so by running:

```
npm install -g expo-cli
```

2. **Starting the App**:

```
cd packages/service-mobile-app
yarn start
```

3. **Testing on a simulator**

#### Installing an iOS Emulator:

To develop and test your app on iOS, you'll need Xcode, Apple's official Integrated Development Environment (IDE). Follow these steps:

1. **Download Xcode from the App Store**: Go to the App Store, search for "Xcode", then download and install the application.

2. **Open Xcode and Accept the Terms**: Once the installation is complete, open Xcode and follow the prompts to accept the terms and licenses.

3. **Install a Device Simulator**: Navigate to Xcode preferences, go to the "Components" tab, and install a simulator corresponding to the iOS version you want to test.

#### Installing an Android Emulator:

To develop and test on Android, you can use Android Studio, which provides an Android emulator. Follow these steps:

1. **Download Android Studio**: Visit the official Android Studio website, download, and install the IDE.

2. **Install Required Components**: During installation, make sure to select the option to install necessary components, including the Android SDK.

3. **Set Up an Emulator**: Open Android Studio, then go to "AVD Manager" (Android Virtual Device Manager) to create a new emulator. Choose a virtual device, select a system image, and configure settings as needed.

With these steps, you should be able to set up and use iOS and Android emulators to develop your Expo app. Keep your emulators up to date and configure them according to the specific requirements of your project.

This will open the Expo DevTools in your default browser. You can run the app on an Android/iOS simulator or scan the QR code with the Expo Go app on your mobile device.

---

## Adding a New Component

To keep our code architecture clean, make sure you create components every time you write a piece of code with some kind of logic behind it, or which will be reused in the project.

1. Navigate to the `src/components` directory.

2. Create a new file for your component (e.g., `NewComponent.tsx`).

3. Write your component code. For example:

```tsx
import React from 'react';
import { View, Text } from 'react-native';

const NewComponent = () => {
  return (
    <View>
      <Text>New Component</Text>
    </View>
  );
};

export default NewComponent;
```

4. You can now import and use `NewComponent` in your views.

---

## Adding a New View

1. Navigate to the `src/pages` directory.

2. Create a new file for your view (e.g., `NewView.tsx`).

3. Write your view code. For example:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import NewComponent from '../components/NewComponent';

const NewView = () => {
  return (
    <View>
      <Text>New View</Text>
      <NewComponent />
    </View>
  );
};

export default NewView;
```

4. You can now navigate to this view from your existing components.

---

## Making an API Call

To make API calls, we use the redux toolkit library which helps use cache queries results, and much more.
Please refer to the existing guide on Redux and Redux Toolkit queries to get started with this library.

Remember to handle any errors and state updates accordingly.