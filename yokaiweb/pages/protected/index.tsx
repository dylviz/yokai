// import { getSession } from 'next-auth/react';
import "viem/window";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createWalletClient, custom, Account, getAccount } from "viem";
import { Button } from "@chakra-ui/react";

var walletClient: any;

// function Protected({ message, nftList }) {
function Protected() {
  const [account, setAccount] = useState<Account>();
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    console.log("Connected");
  }

  const connect = async () => {
    function connectW() {}
    const [address] = await walletClient.requestAddresses();
    setAccount(getAccount(address));
  };

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
