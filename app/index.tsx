import Button from "@/components/ui/Button";
import { Colors } from "@/constants/style";
import { Link, router } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
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
          <Button onPress={loginRoutHandler}>Home</Button>
        </View>
        <View style={styles.Button}>
          <Button onPress={signUpHandler}>Home</Button>
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

export default Welcome;
