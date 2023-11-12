import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layout/Main";

import Homepage from "./pages/Homepage";
import ShoppingList from "./pages/Homepage/[list]";
import CreateShoppingList from "./pages/create";

import { UserProvider } from "./context/UserContext";
import { ShoppingListProvider } from "./context/ShoppingLists";


function Router() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ShoppingListProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/list/create" element={<CreateShoppingList />} />
              <Route path="/list/:listUuid" element={<ShoppingList />} />
            </Routes>
          </Layout>
        </ShoppingListProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default Router;
