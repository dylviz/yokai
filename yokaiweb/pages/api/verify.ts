import { users } from "@/utils/users";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Address,
  ByteArray,
  Hex,
  recoverMessageAddress,
  verifyMessage,
  stringToHex,
} from "viem";
import { connect } from "@/utils/redis";
import client from "@/utils/redis";

type jsonreturn = {
  authenticated: boolean;
};

export default async function verify(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let authenticated = false;
  const { address, signature } = req.query;

  // Enforce required parameters
  if (!address || !signature) {
    res.status(502).send({ error: "Missing parameters" });
  }

  if (typeof address == "string") {
    //connect to DB
    await connect();

    //Read from DB
    const resp = await client.get(address);
    const user_db = resp !== null ? JSON.parse(resp) : {};

    // //If User is found, verifymsg. Else error.
    if (!user_db) {
      res.status(502).send({ error: "No user defined" });
    } else {
      authenticated = verifyMessage({
        address: address as Hex,
        message: user_db.nonce.toString(),
        signature: signature as Hex,
      });
    }
  } else {
    console.log("URL verification error");
  }

  const retObj: jsonreturn = {
    authenticated: authenticated,
  };
  res.status(200).json(retObj);
}
