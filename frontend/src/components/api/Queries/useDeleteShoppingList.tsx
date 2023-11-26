import { useMutation } from 'react-query';
import { api } from '../index'

async function deleteShoppingList(uuid: string) {
    const { data } = await api.delete(`/shopping-list/${uuid}`);
    return data;
}

  
export const  useDeleteShoppingList = () => {
    return useMutation(deleteShoppingList);
}
  
