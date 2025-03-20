import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = yup.object({
  passwordLength: yup
    .number()
    .required('Password length is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password can be at most 20 characters'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [passwordLength, setPasswordLength] = useState(8);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = () => {
    passwordSchema
      .validate({ passwordLength })
      .then(() => {
        let characterList = '';

        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const digitChars = '0123456789';
        const specialCharChars = '!@#$%^&*';

        if (upperCase) {
          characterList += uppercaseChars;
        }

        if (lowerCase) {
          characterList += lowercaseChars;
        }

        if (numbers) {
          characterList += digitChars;
        }

        if (symbols) {
          characterList += specialCharChars;
        }

        const passwordResult = createPassword(characterList, passwordLength);
        setPassword(passwordResult);
        setIsPasswordGenerated(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const createPassword = (characters, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setUpperCase(true);
    setLowerCase(false);
    setNumbers(false);
    setSymbols(false);
    setPasswordLength(8);
  };

  return (
    <View style={styles.container}>
      <Text>Password Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Password Length (min 8)"
        keyboardType="numeric"
        value={String(passwordLength)}
        onChangeText={(text) => setPasswordLength(Number(text))}
      />

      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          size={25}
          fillColor="lightblue"
          unFillColor="#FFFFFF"
          text="Uppercase"
          iconStyle={{ borderColor: 'red' }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' }}
          isChecked={upperCase}
          onPress={(isChecked) => setUpperCase(isChecked)} 
          margin={5}
        />

        <BouncyCheckbox
          size={25}
          fillColor="green"
          unFillColor="#FFFFFF"
          text="Lowercase"
          iconStyle={{ borderColor: 'green' }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' }}
          isChecked={lowerCase}
          onPress={(isChecked) => setLowerCase(isChecked)}
          margin={5}

        />

        <BouncyCheckbox
          size={25}
          fillColor="blue"
          unFillColor="#FFFFFF"
          text="Numbers"
          iconStyle={{ borderColor: 'blue' }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' }}
          isChecked={numbers}
          onPress={(isChecked) => setNumbers(isChecked)}
          margin={5}

        />

        <BouncyCheckbox
          size={25}
          fillColor="purple"
          unFillColor="#FFFFFF"
          text="Symbols"
          iconStyle={{ borderColor: 'purple' }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' }}
          isChecked={symbols}
          onPress={(isChecked) => setSymbols(isChecked)}
          margin={5}

        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Generate Password</Text>
      </TouchableOpacity>

      {isPasswordGenerated && (
        <View style={styles.passwordContainer}>
          <Text>Generated Password: {password}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={resetPassword}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    width: '80%',
    padding: 10,
    margin: 10,
  },
  checkboxContainer: {
    margin: 10,
    width: '80%',
  },
  passwordContainer: {
    marginTop: 20,
  },
  checkbox: {
    margin: 5,
  },
  button: {
    margin: 10,
    backgroundColor: 'lightblue',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
