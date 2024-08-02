import Button from "@/components/ui/Button";
import { Colors } from "@/constants/style";
import { Link, router } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";

const HomeScreen = () => {
  const authCtx = useContext(AuthContext);

  const logOutHandler = async () => {
    await authCtx.onLogOut!();
  };

  const isAuth = authCtx.authentificated

  useEffect(() => {
    const pageRedirection = () => {
      if(!isAuth){
        router.replace("/")
      }
    }

    pageRedirection()
  },[isAuth])
  
  return (
    <SafeAreaView>
      <View style={styles.Button}>
        <Button onPress={logOutHandler}>Sign Out</Button>
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
    backgroundColor: "red",
  },
});

export default HomeScreen;
