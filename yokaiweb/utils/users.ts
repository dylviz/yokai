export type user_i = {
  address: string;
  nonce: Number;
};

export const users: {
  [key: string]: user_i;
} = {};
