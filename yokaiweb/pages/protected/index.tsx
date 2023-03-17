// import { getSession } from 'next-auth/react';
import "viem/window";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createWalletClient,
  custom,
  Account,
  getAccount,
  WalletClient,
} from "viem";
import { Button } from "@chakra-ui/react";
import { users } from "@/utils/users";

// function Protected({ message, nftList }) {
function Protected() {
  var walletClient: WalletClient;
  var userAcct: Account;
  const [account, setAccount] = useState<Account>();

  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
  }

  async function connect() {
    try {
      //Get a web3 account
      const [address] = await walletClient.requestAddresses();
      userAcct = getAccount(address);
      setAccount(userAcct);

      //Store user in registry - generate random nonce
      const authData = await fetch(`/api/auth?address=${userAcct.address}`);
      const a_data = await authData.json();

      console.log("from db: " + JSON.stringify(a_data));

      //Ask user to sign message
      const signature = await walletClient.signMessage({
        account: userAcct,
        message: a_data.nonce.toString(),
      });

      //Verify the user's response
      const response = await fetch(
        `/api/verify?address=${userAcct.address}&signature=${signature}`
      );
      const verifyData = await response.json();

      console.log("Authenticated: " + verifyData.authenticated);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  return (
    <div>
      <h3>Protected content</h3>
      {/* <p>{message}</p>
      <pre>{JSON.stringify(nftList, null, 2)}</pre> */}
      <Button onClick={connect}>Connect</Button>
    </div>
  );
}

// export async function getServerSideProps() {

//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/signin",
//         permanent: false,
//       },
//     };
//   }
//   if (!Moralis.Core.isStarted) {
//     await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
//   }
//   const nftList = await Moralis.EvmApi.nft.getWalletNFTs({
//     chain: EvmChain.ETHEREUM,
//     address: session.user.address,
//     // replace "0x..." with your NFT token address
//     tokenAddresses: ["0x..."],
//   });
//   return {
//     props: {
//       message:
//         // if user has at least one NFT he will get protected content
//         nftList.raw.total > 0
//           ? "Nice! You have our NFT"
//           : "Sorry, you don't have our NFT",
//       nftList: nftList.raw.result,
//     },
//   };
// }
export default Protected;
