import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import {Toaster} from "sonner"

import Layout from "./layout/Main";

import Homepage from "./pages/Homepage";
import ShoppingList from "./pages/Homepage/[list]";
import CreateShoppingList from "./pages/create";

// AUTH PAGES
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
// ERRORS PAGES
import Error404 from "./pages/Errors/404";
import { UserProvider } from "./context/UserContext";
import { ShoppingListProvider } from "./context/ShoppingLists";



function Router() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}> 
      <UserProvider>
        <ShoppingListProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/list/create" element={<CreateShoppingList />} />
              <Route path="/list/:listUuid" element={<ShoppingList />} />
              <Route path="/auth/login" element={<Login/>} />
              <Route path="/auth/register" element={<Register/>} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Layout>
          <Toaster richColors visibleToasts={5} position={"bottom-left"}/>
        </ShoppingListProvider>
      </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default Router;
