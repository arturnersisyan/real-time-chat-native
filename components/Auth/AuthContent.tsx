import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import FlatButton from "../ui/Button";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/style";
import { router } from "expo-router";
import { ISubmit } from "./interfaces/AuthForm";

export interface IAuth {
  name?: string;
  age?: number;
  email: string;
  password: string;
}

interface IContent {
  isLogin: boolean;
  onAuthenticate: (value: IAuth) => Promise<any>;
}

const AuthContent: React.FC<IContent> = ({ isLogin, onAuthenticate }) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      router.replace("/signUp");
    } else {
      router.replace("/signIn");
    }
  }

  function submitHandler(credentials: ISubmit) {
    let { name, age, email, confirmEmail, password, confirmPassword } =
      credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    if(!isLogin) {
      onAuthenticate({ name, age, email, password });
    } else {
      onAuthenticate({ email, password})
    }
    
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
