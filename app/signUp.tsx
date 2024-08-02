import { useContext } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../context/AuthContext";
import { KeyboardAvoidingView, ScrollView } from "react-native";

interface IHandler {
  email: string;
  password: string;
  name?: string;
  age?: number;
}

function SignUpScreen() {
  const authCtx = useContext(AuthContext);

  const signUpHandler = async ({
    name,
    age,
    email,
    password,
  }: IHandler): Promise<any> => {
    console.log(email)
    await authCtx.onRegister!(email, password, name, age);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <AuthContent isLogin={false} onAuthenticate={signUpHandler} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}



export default SignUpScreen;
