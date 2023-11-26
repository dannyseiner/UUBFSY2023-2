import { useQuery } from 'react-query';
import { api } from '../index';


async function fetchShoppingList(uuid: string | undefined) {
    if(!uuid) return 
    const { data } = await api.get(`/shopping-list/${uuid}`);
    return data;
  }

  
export const  useShoppingList = (uuid: string | undefined) => {
    return useQuery(['shoppingList', uuid], () => fetchShoppingList(uuid), { });
}
  