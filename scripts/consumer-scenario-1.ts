// This can be a wallet project
// This can also be a Verifier-Backend-Server side project

import {EvaluationResults, PEJS, SelectResults, VerifiableCredential} from "@sphereon/pe-js";
import { PresentationDefinition, PresentationSubmission } from "@sphereon/pe-models";
import { Wallet } from "./Wallet";

/**
 * This scenario contains a flow in which Alice wants to prove to Bob that she has some kind of Credentials.
 * Alice has previously contacted Bob and therefore know what he's expecting.
 * It means that Bob has already sent her a PresentationDefinition object.
 * Alice's wallet sends all of her available credentials to PEJS to see which one is useful
 * In the first example the PresentationDefinition object is a simple one. Bob is sending her a presentationDefinition with two InputDescriptors
 * Alice has only one credential in her wallet that have the properties requested by Bob
 */
function checkScenario_1() {
  const wallet: { holder: string; verifiableCredentials: VerifiableCredential[] } = new Wallet().getWallet();
  const presentationDefinition = getPresentationDefinition();
  let holderPE: PEJS = new PEJS();
  const evaluateResult: EvaluationResults = holderPE.evaluate(presentationDefinition, {
    "@context": [],
    type: [],
    verifiableCredential: wallet.verifiableCredentials,
    holder: ''
  });
  const selectFromResult: SelectResults = holderPE.selectFrom(presentationDefinition, wallet.verifiableCredentials, [wallet.holder])
  const presentationSubmission: PresentationSubmission = holderPE.submissionFrom(presentationDefinition, wallet.verifiableCredentials)
  console.log("evaluateResult: ", JSON.stringify(evaluateResult, null, 2));
  console.log("selectFromResult: ", JSON.stringify(selectFromResult, null, 2));
  console.log("presentationSubmission:", JSON.stringify(presentationSubmission, null, 2));
}

function getPresentationDefinition(): PresentationDefinition {
  return {
    id: '31e2f0f1-6b70-411d-b239-56aed5321884',
    purpose: 'To check if you have a valid college degree.',
    input_descriptors: [
      {
        id: 'e73646de-43e2-4d72-ba4f-090d01c11eac',
        purpose: 'The issuer of your Bachelor degree should be a valid one.',
        schema: [
          {
            uri: 'https://www.w3.org/2018/credentials/v1',
          },
        ],
        constraints: {
          fields: [
            {
              path: ['$.issuer', '$.vc.issuer', '$.iss'],
              filter: {
                type: 'string',
                pattern: 'did:web:vc.transmute.world',
              },
            },
          ],
        },
      },
      {
        id: '867bfe7a-5b91-46b2-9ba4-70028b8d9cc8',
        purpose: 'Your degree must be from type BachelorDegree.',
        schema: [
          {
            uri: 'https://www.w3.org/2018/credentials/v1',
          },
        ],
        constraints: {
          fields: [
            {
              path: ['$.credentialSubject.degree.type', '$.vc.credentialSubject.degree.type'],
              filter: {
                type: 'string',
                pattern: 'BachelorDegree',
              },
            },
          ],
        },
      },
    ],
  };
}

checkScenario_1();
