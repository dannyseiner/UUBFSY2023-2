import { useMutation } from 'react-query';
import { api } from '../index';
import { List } from '../../../types/list';


async function updateShoppingList(list: List) {
    const { data } = await api.post(`/shopping-list/${list.uuid}`, list);
    return data;
}


export const useUpdateShoppingList = () => {
    return useMutation(updateShoppingList);
}
