import { useContext, useEffect } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../context/AuthContext";
import { router } from "expo-router";

interface IHandler {
  email: string;
  password: string;
}

function SignInScreen() {
  const authCtx = useContext(AuthContext)

  const loginHandler = async ({ email, password }: IHandler): Promise<any> => {
    console.log(password);
    await authCtx.onLogIn!(email, password);
  };

  useEffect(() => {
    const checkIsLoggedIn = () => {
      if(authCtx.authentificated) {
        return router.replace('/start')
      }
    }
    checkIsLoggedIn();
  },[authCtx.authentificated])

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default SignInScreen;
