import { List } from "../types/list";

export const mockLists: List[] = [
  {
    uuid: "34f0e830-7665-11ee-b962-0242ac120002",
    owner: {
      uuid: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
      name: "Anna Novakova",
    },
    name: "Týdenní nákup",
    items: [
      {
        uuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
        name: "Chléb",
        archived: false,
      },
      {
        uuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
        name: "Mléko",
        archived: false,
      },
    ],
    users: [
      {
        uuid: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        name: "Anna Novakova",
      },
      {
        uuid: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
        name: "Petr Svoboda",
      },
    ],
  },
];
