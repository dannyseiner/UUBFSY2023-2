import { Item } from "./item";
import { User } from "./user";

export type List = {
  uuid: string;
  owner: User;
  name: string;
  items: Item[];
  users: User[];
};
