import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Main";
import Homepage from "./pages/Homepage";
import { UserContext, UserProvider } from "./context/UserContext";
import { User } from "./types/user";
import ShoppingList from "./pages/Homepage/[list]";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/list/:listUuid" element={<ShoppingList />} />
          </Routes>
        </Layout>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
