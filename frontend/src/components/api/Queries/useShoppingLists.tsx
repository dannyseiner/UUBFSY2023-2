import { useQuery } from 'react-query';
import { api } from '../index';


async function fetchShoppingLists() {
    const { data } = await api.get(`/shopping-lists`);
    return data;
  }

  
export const  useShoppingLists = () => {
    return useQuery(['shoppingLists'], () => fetchShoppingLists(), { });
}
  