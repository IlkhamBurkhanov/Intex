import Authentication from "./Authentication";
import useToken from "./Hook/useToken";
import Unauthentication from "./UnAuthentication";

function App() {
  const [token] = useToken();

  if (token) {
    return <Authentication />;
  } else {
    return <Unauthentication />;
  }
}

export default App;
