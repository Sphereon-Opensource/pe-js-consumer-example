// This can be a wallet project
// This can also be a Verifier-Backend-Server side project

import {EvaluationResults, PEJS, Presentation, SelectResults, VerifiableCredential} from "@sphereon/pe-js";
import jwt_decode from "jwt-decode";
import fs from "fs";
import { PresentationSubmission } from "@sphereon/pe-models";
// @ts-ignore
import jp from 'jsonpath';

// const holderDID = wallet.data.holder.did[i];
// const vcs = wallet.data.verifiable_credentials;

/**
 * All the examples here copied from the address: https://github.com/w3c-ccg/vc-examples/tree/master/docs
 * All the presentationDefinition object are created by Sphereon.com based on the VCs above
 */
let pejs: PEJS = new PEJS();

console.log(pejs);

function getFileAsJson(path: string) {
  return JSON.parse(getFileSimple(path));
}

function getFileSimple(path: string) {
  return fs.readFileSync(path, 'utf-8');
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/chapi-http-edu
 * We've changed the verifiableCredential Object to be a list instead of a single entity because of https://identity.foundation/presentation-exchange/#presentation-submissions
 */
function checkChapiHttpEdu() {
  console.log("checkChapiHttpEdu");
  const presentationDefinition = getFileAsJson('./resources/chapi-http-edu/pd-1.json').presentation_definition;
  const vpSimple = getFileAsJson('./resources/chapi-http-edu/sphereon-vp.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, vpSimple);
  if (result.value) {
    const validated = pejs.validateSubmission(result.value)
    console.log("validated:", JSON.stringify(validated, null, 2));
  }
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, vpSimple.verifiableCredential)
  console.log("result: ", JSON.stringify(result, null, 2));
  console.log("presentationSubmission:", JSON.stringify(presentationSubmission, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/chapi-http-edu
 * We've changed the verifiableCredential Object to be a list instead of a single entity because of https://identity.foundation/presentation-exchange/#presentation-submissions
 */
function checkChapiHttpEdu_selectFrom() {
  console.log("checkChapiHttpEdu_selectFrom");
  const presentationDefinition = getFileAsJson('./resources/chapi-http-edu/pd-1.json').presentation_definition;
  const vpSimple:any = getFileAsJson('./resources/chapi-http-edu/sphereon-vp.json');
  const result: EvaluationResults = pejs.selectFrom(presentationDefinition, vpSimple.verifiableCredential, []);
  console.log("result: ", JSON.stringify(result, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.0
 */
function checkCmtrV0_0() {
  console.log("checkCmtrV0_0");
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/cmtr/v0.0/pd-1.json').presentation_definition;
  const vc = getFileAsJson('./resources/cmtr/v0.0/cmtr-credential-v0.0.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, {
    '@context': [],
    type:[],
    verifiableCredential: [vc],
    holder: undefined as unknown as string
  });
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(JSON.stringify(presentationSubmission, null, 2));
  console.log(JSON.stringify(result, null, 2))
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.1
 */
function checkCmtrV0_1() {
  console.log("checkCmtrV0_1");
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/cmtr/v0.1/pd-1.json').presentation_definition;
  const vc = getFileAsJson('./resources/cmtr/v0.1/cmtr-credential-v0.1.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, {
    '@context': [],
    type:[],
    verifiableCredential: [vc],
    holder: undefined as unknown as string
  });
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(JSON.stringify(presentationSubmission, null, 2));
  console.log(JSON.stringify(result, null, 2))
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.1
 * Here we only get a field from the report
 */
function checkCmtrV0_1_limited() {
  console.log("checkCmtrV0_1_limited");
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/cmtr/v0.1/pd-2.json').presentation_definition;
  const vc = getFileAsJson('./resources/cmtr/v0.1/cmtr-credential-v0.1.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, {
    '@context': [],
    type:[],
    verifiableCredential: [vc],
    holder: undefined as unknown as string
  });
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(JSON.stringify(presentationSubmission, null, 2));
  console.log(JSON.stringify(result, null, 2))
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.1
 */
function checkCmtrV0_2() {
  console.log("checkCmtrV0_2");
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/cmtr/v0.2/pd-1.json').presentation_definition;
  const vp: Presentation = getFileAsJson('./resources/cmtr/v0.2/cmtr-verifiable-presentation-v0.2.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, vp);
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, vp.verifiableCredential)
  console.log(JSON.stringify(presentationSubmission, null, 2));
  console.log(JSON.stringify(result, null, 2))
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/covid-19/v1
 */
function checkCovid_19V1() {
  console.log("checkCovid_19V1");
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/covid-19/v1/pd-1.json').presentation_definition;
  const vp: Presentation = getFileAsJson('./resources/covid-19/v1/verifiable-presentation.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, vp);
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, vp.verifiableCredential)
  console.log(JSON.stringify(presentationSubmission, null, 2));
  console.log(JSON.stringify(result, null, 2))
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/covid-19/v2
 */
function checkCovid_19V2_jwt() {
  console.log("checkCovid_19V2_jwt");
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/covid-19/v2/pd-1.json').presentation_definition;
  const jwtEncoded = getFileSimple('./resources/covid-19/v2/qSARS-CoV-2-Rapid-Test-Credential.jwt');
  const vc: any = jwt_decode(jwtEncoded);
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, {
    '@context': [],
    type:[],
    verifiableCredential: [vc],
    holder: undefined as unknown as string
  });
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(JSON.stringify(presentationSubmission, null, 2));
  console.log(JSON.stringify(result, null, 2))
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/crude/examples/v1.0
 */
function checkCrude() {
  console.log("checkCrude");
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/crude/v1.0/pd-1.json').presentation_definition;
  const vc: any = getFileAsJson("resources/crude/v1.0/bill-of-lading-verifiable-credential-v1.0.json");
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, {
    '@context': [],
    type:[],
    verifiableCredential: [vc],
    holder: undefined as unknown as string
  });
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(JSON.stringify(presentationSubmission, null, 2));
  console.log(JSON.stringify(result, null, 2))
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/edu
 */
function checkEdu() {
  console.log("checkEdu");
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/edu/pd-1.json').presentation_definition;
  const vc: any = getFileAsJson("resources/edu/sphereon-university-degree-verifiable-credential.json");
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, {
    '@context': [],
    type:[],
    verifiableCredential: [vc],
    holder: undefined as unknown as string
  });
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(JSON.stringify(presentationSubmission, null, 2));
  console.log(JSON.stringify(result, null, 2))
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/blob/master/docs/prc/danube
 * the VC in the prc.json file doesn't have a valid schema uri, therefore we added
 *   "credentialSchema": [{"id": "https://w3id.org/citizenship/v1"}]
 */
function checkPrc() {
  console.log("checkPrc");
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/edu/pd-1.json').presentation_definition;
  const vc: any = getFileAsJson("resources/edu/sphereon-university-degree-verifiable-credential.json");
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, {
    '@context': [],
    type:[],
    verifiableCredential: [vc],
    holder: undefined as unknown as string
  });
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(JSON.stringify(presentationSubmission, null, 2));
  console.log(JSON.stringify(result, null, 2))
}

function checkSelectFrom() {
  console.log("checkSelectFrom");
  pejs = new PEJS();
  const pd = getFileAsJson('./resources/smithbk/pd.json');
  const config: {"wallet": {"owner":{"identities": {"did": string, "other_attribtutes": string}[]}, "verifiable_credentials": VerifiableCredential[]}} = getFileAsJson("./resources/smithbk/config.json");
  const selectResults: SelectResults = pejs.selectFrom(pd, config.wallet.verifiable_credentials, [config.wallet.owner.identities[0].did]);

  if (selectResults?.matches) {
    let limitinglyDisclosedVC: { path: string | number, value: VerifiableCredential }[] =
        jp.nodes(
            config.wallet.verifiable_credentials,
            selectResults?.matches[0].matches[0].replace('.verifiableCredential', '')
        );
    let fullyDisclosedVC = config.wallet.verifiable_credentials
        .filter(
            (vc) =>
                vc.id === limitinglyDisclosedVC[0].value.id
        )[0];

    console.log(fullyDisclosedVC);
  }
}

checkChapiHttpEdu();
checkChapiHttpEdu_selectFrom();
checkCmtrV0_0();
checkCmtrV0_1();
checkCmtrV0_1_limited();
checkCmtrV0_2();
checkCovid_19V1();
checkCovid_19V2_jwt();
checkCrude();
checkEdu();
checkPrc();
checkSelectFrom();
