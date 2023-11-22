<template>
  <div class="hello">
    <h1>Hi</h1>    
    <button @click="initializeChainlink">Execute</button>
  </div>
</template>

<script>
import { ethers } from "ethers";
import abi from "../ABI/functionClient.json";
const {
  SubscriptionManager,
  // simulateScript,
  ResponseListener,
  ReturnType,
  decodeResult,
  FulfillmentCode,
} = require("@chainlink/functions-toolkit");
export default {
  name: "HelloWorld",
  data() {
    return {
      vp:{
  "presentation": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "type": [
      "VerifiablePresentation"
    ],
    "verifiableCredential": [
      {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          {
            "hs": "https://api.jagrat.hypersign.id/hypersign-protocol/hidnode/ssi/schema/sch:hid:testnet:zHk2HSjE2vQUXkbxxfcQky7jnP6bz1Us5rhSzYvNiecZT:1.0:"
          },
          {
            "zkProof": "hs:zkProof"
          },
          "https://w3id.org/security/suites/ed25519-2020/v1"
        ],
        "id": "vc:hid:testnet:zHUbYbxJyJ6qedBcBmyhiHUHVYe4frmskC6UzU9GqR6qH",
        "type": [
          "VerifiableCredential",
          "ZKAGEVC"
        ],
        "expirationDate": "2027-12-10T18:30:00Z",
        "issuanceDate": "2023-11-21T05:24:12Z",
        "issuer": "did:hid:testnet:zHfG5jtCiZLarsiPENH4LZ1u9uUfCWpiXicWshJFZQXTn",
        "credentialSubject": {
          "zkProof": "[\"0x2111c902a23f2fdf02bc4c35283ff036cb7acf1dafe72e4217598be558a453bd\", \"0x1727fab35d60c9fa68f1961e9c4082f8cf269c1fded8d97b1ded778f37bccf98\"],[[\"0x0707a233c4370137033ecbb897cfdbed602a9ead073e59700169244bc4a10d67\", \"0x02338bc637524d348f3fa499f60512fec3730cb2d1d7a16acbfcfc2587c0cc6e\"],[\"0x120946360da85a1c98ebd1c80300666f96f95f3a8a3d3ca858d848aafff4d2f8\", \"0x12574056851cfe16f64f1cb0b6591c9c16ced9fd0e3a84dd3d0fa1e82ae706a7\"]],[\"0x1bafa6b4f36d55cdd5df94a81179edbac950d3f0f5bb7201f8e212c82fd39033\", \"0x29a5bcee808705d71a9a695a75cbd5344e38f07b2787ff32dfe74c1cc95bab35\"],[\"0x0000000000000000000000000000000000000000000000000000000000000021\"]",
          "id": "did:hid:testnet:zAJ7HASW3vqvk4YbSuTmBfxqTQte4mkFazjSiNyQNeWDS"
        },
        "credentialSchema": {
          "id": "sch:hid:testnet:zHk2HSjE2vQUXkbxxfcQky7jnP6bz1Us5rhSzYvNiecZT:1.0",
          "type": "JsonSchemaValidator2018"
        },
        "credentialStatus": {
          "id": "https://api.jagrat.hypersign.id/hypersign-protocol/hidnode/ssi/credential/vc:hid:testnet:zHUbYbxJyJ6qedBcBmyhiHUHVYe4frmskC6UzU9GqR6qH",
          "type": "CredentialStatusList2017"
        },
        "proof": {
          "type": "Ed25519Signature2020",
          "created": "2023-11-21T05:25:53Z",
          "verificationMethod": "did:hid:testnet:zHfG5jtCiZLarsiPENH4LZ1u9uUfCWpiXicWshJFZQXTn#key-1",
          "proofPurpose": "assertionMethod",
          "proofValue": "z4dYC6wqmi3PNh3hK1s8P4N2rUbMGXDfyX6y9u2cFQ3yPbxyWTsKiUYoWK5WEo7EtchuuU5ZRXBd2S2usdeQWX4Zw"
        }
      }
    ],
    "id": "vp:hid:testnet:zDdEAxYxkUmojZYNpEvjkXADF9U9KTZGE19nNY7ZUQBpF",
    "holder": "did:hid:testnet:zAJ7HASW3vqvk4YbSuTmBfxqTQte4mkFazjSiNyQNeWDS",
    "proof": {
      "type": "Ed25519Signature2020",
      "created": "2023-11-21T05:34:44Z",
      "verificationMethod": "did:hid:testnet:zAJ7HASW3vqvk4YbSuTmBfxqTQte4mkFazjSiNyQNeWDS#key-1",
      "proofPurpose": "authentication",
      "challenge": "raj",
      "proofValue": "z4vu31NCJieXgGuCS5Qh7rFtQ8JEtkezgUkhQXxXfv1YTCR8saktgjr8kPAuV3rdBbEUAGawzicCH9wRbci4vR4JB"
    }
  }
},
      did: "did:hid:testnet:0x39613B3F3B4260287537AA25FD40aFe1BE371D98",
      pubMultibase: "",
      address: "",
      consumerAddress: "0x3d83b2bcad0d313a91578a075761e870281f244e",
      consumerId: "413",
      contractAddress:'0x90705e209aA24869B383cE35bD5eB7C7F1Fb01fE'
    };
  },
  methods: {
    updateSchemaInSource(sourceText){
      const regex = /let\s+schema\s*=\s*null\s*/;
      const match = sourceText.match(regex);

      if (match) {
        // Update the schema variable with a new object
        const updatedSourceText = sourceText.replace(
          regex,
          `let schema = ${JSON.stringify(this.vp)};`
        );

        return updatedSourceText;
      } else {
        console.error("Schema variable not found in source.js");
        return sourceText;
      }
    },
    async initializeChainlink() {
      const consumerAddress = "0x17b53fe4de36938f68968743a6f3b7520bd3b92a";
      const subscriptionId = 1685;

      const routerAddress = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
      const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
      const donId = "fun-ethereum-sepolia-1";
      const explorerUrl = "https://sepolia.etherscan.io/";

      const filePath = "source.js"
      let source
      try {
        const res = await fetch(filePath)
        if(!res.ok){
          throw new Error('not fetched')
        } 
        const executeMathString = await res.text()
        const updatedSourceText = this.updateSchemaInSource(executeMathString);
        console.log("updated",updatedSourceText)
      source = updatedSourceText
      console.log("source",source)
      } catch (error) {
        console.log(error)
      }                      
    
      const args = [];
      const gasLimit = 300000;

      // Initialize ethers signer and provider to interact with the contracts onchain
      const privateKey =
        "003f66d271a0ed4ecf726d7479ebd2c28e40178291c56300dc1c0ade180e6ec5"; // fetch PRIVATE_KEY
      if (!privateKey)
        throw new Error(
          "private key not provided - check your environment variables"
        );

      const rpcUrl =
        "https://sepolia.infura.io/v3/ba6af972eaef44d396df727032ebaed0"; // fetch mumbai RPC URL

      if (!rpcUrl)
        throw new Error(
          `rpcUrl not provided  - check your environment variables`
        );

      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      const wallet = new ethers.Wallet(privateKey);
      const signer = wallet.connect(provider); // create ethers signer for signing transactions
      console.log(signer);      
      //////// ESTIMATE REQUEST COSTS ////////
      console.log("\nEstimate request costs...");
      // Initialize and return SubscriptionManager
      const subscriptionManager = new SubscriptionManager({
        signer: signer,
        linkTokenAddress: linkTokenAddress,
        functionsRouterAddress: routerAddress,
      });
      // console.log("subManager",subscriptionManager)
      await subscriptionManager.initialize();


      //////// MAKE REQUEST ////////

      console.log("\nMake request...");

      const functionsConsumer = new ethers.Contract(
        consumerAddress,
        abi,
        signer
      );

      // To simulate the call and get the requestId.
      const requestId = await functionsConsumer.callStatic.sendRequest(
        source, // source
        "0x", // user hosted secrets - encryptedSecretsUrls - empty in this example
        0, // don hosted secrets - slot ID - empty in this example
        0, // don hosted secrets - version - empty in this example
        args,
        [], // bytesArgs - arguments can be encoded off-chain to bytes.
        subscriptionId,
        gasLimit,
        ethers.utils.formatBytes32String(donId) // jobId is bytes32 representation of donId
      );

      // Actual transaction call
      const transaction = await functionsConsumer.sendRequest(
        source, // source
        "0x", // user hosted secrets - encryptedSecretsUrls - empty in this example
        0, // don hosted secrets - slot ID - empty in this example
        0, // don hosted secrets - version - empty in this example
        args,
        [], // bytesArgs - arguments can be encoded off-chain to bytes.
        subscriptionId,
        gasLimit,
        ethers.utils.formatBytes32String(donId) // jobId is bytes32 representation of donId
      );

      // Log transaction details
      console.log(
        `\n✅ Functions request sent! Transaction hash ${transaction.hash} -  Request id is ${requestId}. Waiting for a response...`
      );

      console.log(
        `See your request in the explorer ${explorerUrl}/tx/${transaction.hash}`
      );

      const responseListener = new ResponseListener({
        provider: provider,
        functionsRouterAddress: routerAddress,
      }); // Instantiate a ResponseListener object to wait for fulfillment. 
      console.log("responseListener",responseListener)     
    try {
      const response = await new Promise((resolve, reject) => {
      responseListener
        .listenForResponseFromTransaction(transaction.hash)
        .then((response) => {
          resolve(response); // Resolves once the request has been fulfilled.
        })
        .catch((error) => {
          reject(error); // Indicate that an error occurred while waiting for fulfillment.
        });
    });
    console.log("Response received",response);
    const fulfillmentCode = response.fulfillmentCode;
    if (fulfillmentCode === FulfillmentCode.FULFILLED) {
      console.log(
        `\n✅ Request ${requestId} successfully fulfilled. Cost is ${ethers.utils.formatEther(
          response.totalCostInJuels
        )} LINK.Complete reponse: `,
        response
      );
    } else if (fulfillmentCode === FulfillmentCode.USER_CALLBACK_ERROR) {
      console.log(
        `\n⚠️ Request ${requestId} fulfilled. However, the consumer contract callback failed. Cost is ${ethers.utils.formatEther(
          response.totalCostInJuels
        )} LINK.Complete reponse: `,
        response
      );
    } else {
      console.log(
        `\n❌ Request ${requestId} not fulfilled. Code: ${fulfillmentCode}. Cost is ${ethers.utils.formatEther(
          response.totalCostInJuels
        )} LINK.Complete reponse: `,
        response
      );
    }
    const errorString = response.errorString;
    if (errorString) {
      console.log(`\n❌ Error during the execution: `, errorString);
    } else {
      const responseBytesHexstring = response.responseBytesHexstring;
      if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
        const decodedResponse = decodeResult(
          response.responseBytesHexstring,
          ReturnType.string
        );
        console.log(
          `\n✅ Decoded response to ${ReturnType.string}: `,
          decodedResponse
        );
      }
    }
    const requestIdForZK = response.requestId.toString()
      const responseFromSendReq =  response.responseBytesHexstring.toString()
      const a = ["0x2111c902a23f2fdf02bc4c35283ff036cb7acf1dafe72e4217598be558a453bd", "0x1727fab35d60c9fa68f1961e9c4082f8cf269c1fded8d97b1ded778f37bccf98"]
      const b = [["0x0707a233c4370137033ecbb897cfdbed602a9ead073e59700169244bc4a10d67", "0x02338bc637524d348f3fa499f60512fec3730cb2d1d7a16acbfcfc2587c0cc6e"],["0x120946360da85a1c98ebd1c80300666f96f95f3a8a3d3ca858d848aafff4d2f8", "0x12574056851cfe16f64f1cb0b6591c9c16ced9fd0e3a84dd3d0fa1e82ae706a7"]]
      const c = ["0x1bafa6b4f36d55cdd5df94a81179edbac950d3f0f5bb7201f8e212c82fd39033", "0x29a5bcee808705d71a9a695a75cbd5344e38f07b2787ff32dfe74c1cc95bab35"]
      const pubSignals = ["0x0000000000000000000000000000000000000000000000000000000000000021"]

      const verifyProof = await functionsConsumer.callVerifyProof(
        requestIdForZK,
        responseFromSendReq,
        a,
        b,
        c,
        pubSignals
      )
      console.log(
        `\n✅ Verifing ZK Proof On-chain: `,
        verifyProof
      );
  } catch (error) {
    console.error("Error executing function:", error); 
  }
  }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
