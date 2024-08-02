import Button from "@/components/ui/Button";
import { Colors } from "@/constants/style";
import { router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";

const WelcomeScreen = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const checkIsLoggedIn = () => {
      if(authCtx.authentificated) {
        return router.replace('/start')
      }
    }
    checkIsLoggedIn();
  },[authCtx.authentificated])

  const loginRoutHandler = () => {
    router.replace("/signIn");
  };

const  signUpHandler = () => {
    router.replace("/signUp")
}

  return (
    <SafeAreaView>
      <View>
        <View>
          <Text style={styles.Text}>Welcome Evchat</Text>
        </View>
        <View style={styles.Button}>
          <Button onPress={loginRoutHandler}>Log In</Button>
        </View>
        <View style={styles.Button}>
          <Button onPress={signUpHandler}>Sign Up</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Text: {
    marginTop: 30,
    textAlign: "center",
    color: Colors.primary100,
    fontSize: 40,
    fontWeight: "bold",
  },
  Button: {
    marginTop: 30,
    backgroundColor: 'red'
  },
});

export default WelcomeScreen;
