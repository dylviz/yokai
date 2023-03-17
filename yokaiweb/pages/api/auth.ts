import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/redis";
import client from "@/utils/redis";
import { users, user_i } from "@/utils/users";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  var params = req.query;
  var address_i: string = "";

  if (typeof params.address == "string") {
    address_i = params.address;
  } else {
    res.status(502).send({ error: "URL parse error" });
  }

  //Connect to DB
  await connect();

  //Try to get existing user from DB
  const resp = await client.get(address_i);
  var user = resp !== null ? JSON.parse(resp) : {};

  //Update User nonce - Can't get user.nonce to work
  if (!user) {
    user = {
      address: address_i,
      nonce: Math.floor(Math.random() * 10000000),
    };
  } else {
    const nonce = Math.floor(Math.random() * 10000000);
    user.nonce = nonce as number;
  }

  //Set new user data
  await client.set(address_i, JSON.stringify(user));

  res.status(200).json(user);
}
