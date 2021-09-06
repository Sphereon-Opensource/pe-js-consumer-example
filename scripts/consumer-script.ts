// This can be a wallet project
// This can also be a Verifier-Backend-Server side project

import { EvaluationResults, PEJS, Presentation, VP } from "@sphereon/pe-js";
import jwt_decode from "jwt-decode";
import fs from "fs";
import { PresentationSubmission } from "@sphereon/pe-models";

// const holderDID = wallet.data.holder.did[i];
// const vcs = wallet.data.verifiable_credentials;

/**
 *
 * All the examples here copied from the address: https://github.com/w3c-ccg/vc-examples/tree/master/docs
 * All the presentationDefinition object are created by Sphereon.com based on the VCs above
 */
let pejs: PEJS = new PEJS(/*holderDID*/);

console.log(pejs);

function getFileAsJson(path: string) {
  return JSON.parse(getFileSimple(path));
}

function getFileSimple(path: string) {
  return fs.readFileSync(path, 'utf-8');
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/chapi-http-edu
 * We've changed the verifiableCredential Object to be a list instead of a single entity because of https://identity.foundation/presentation-exchange/#presentation-submissions
 */
function checkChapiHttpEdu() {
  const presentationDefinition = getFileAsJson('./resources/chapi-http-edu/pd-1.json').presentation_definition;
  const vpSimple = getFileAsJson('./resources/chapi-http-edu/sphereon-vp.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, new VP(vpSimple));
  const validated = pejs.validateSubmission(result.value)
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, vpSimple.verifiableCredential)
  console.log("result: ", result);
  console.log("validated:", validated);
  console.log("presentationSubmission:", presentationSubmission);
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/chapi-http-edu
 * We've changed the verifiableCredential Object to be a list instead of a single entity because of https://identity.foundation/presentation-exchange/#presentation-submissions
 */
 function checkChapiHttpEdu_selectFrom() {
  const presentationDefinition = getFileAsJson('./resources/chapi-http-edu/pd-1.json').presentation_definition;
  const vpSimple = getFileAsJson('./resources/chapi-http-edu/sphereon-vp.json');
  const result: EvaluationResults = pejs.selectFrom(presentationDefinition, vpSimple.verifiableCredential, null);
  console.log("result: ", result);
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.0
 */
function checkCmtrV0_0() {
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/cmtr/v0.0/pd-1.json').presentation_definition;
  const vc = getFileAsJson('./resources/cmtr/v0.0/cmtr-credential-v0.0.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, new VP(new Presentation(null, null, null, [vc], null, null)));
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(presentationSubmission);
  console.log(result)
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.1
 */
function checkCmtrV0_1() {
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/cmtr/v0.1/pd-1.json').presentation_definition;
  const vc = getFileAsJson('./resources/cmtr/v0.1/cmtr-credential-v0.1.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, new VP(new Presentation(null, null, null, [vc], null, null)));
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(presentationSubmission);
  console.log(result)
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.1
 * Here we only get a field from the report
 */
function checkCmtrV0_1_limited() {
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/cmtr/v0.1/pd-2.json').presentation_definition;
  const vc = getFileAsJson('./resources/cmtr/v0.1/cmtr-credential-v0.1.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, new VP(new Presentation(null, null, null, [vc], null, null)));
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(presentationSubmission);
  console.log(result)
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.1
 */
function checkCmtrV0_2() {
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/cmtr/v0.2/pd-1.json').presentation_definition;
  const vp:Presentation = getFileAsJson('./resources/cmtr/v0.2/cmtr-verifiable-presentation-v0.2.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, new VP(vp));
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, vp.verifiableCredential)
  console.log(presentationSubmission);
  console.log(result)
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/covid-19/v1
 */
function checkCovid_19V1() {
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/covid-19/v1/pd-1.json').presentation_definition;
  const vp:Presentation = getFileAsJson('./resources/covid-19/v1/verifiable-presentation.json');
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, new VP(vp));
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, vp.verifiableCredential)
  console.log(presentationSubmission);
  console.log(result)
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/covid-19/v2
 */
function checkCovid_19V2_jwt() {
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/covid-19/v2/pd-1.json').presentation_definition;
  const jwtEncoded = getFileSimple('./resources/covid-19/v2/qSARS-CoV-2-Rapid-Test-Credential.jwt');
  const vc:any = jwt_decode(jwtEncoded);
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, new VP(new Presentation(null, null, null, [vc], null, null)));
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(presentationSubmission);
  console.log(result)
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/crude/examples/v1.0
 */
function checkCrude() {
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/crude/v1.0/pd-1.json').presentation_definition;
  const vc:any = getFileAsJson("resources/crude/v1.0/bill-of-lading-verifiable-credential-v1.0.json");
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, new VP(new Presentation(null, null, null, [vc], null, null)));
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(presentationSubmission);
  console.log(result)
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/edu
 */
function checkEdu() {
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/edu/pd-1.json').presentation_definition;
  const vc:any = getFileAsJson("resources/edu/sphereon-university-degree-verifiable-credential.json");
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, new VP(new Presentation(null, null, null, [vc], null, null)));
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(presentationSubmission);
  console.log(result)
}

/**
 * this test is based on https://github.com/w3c-ccg/vc-examples/blob/master/docs/prc/danube
 * the VC in the prc.json file doesn't have a valid schema uri, therefore we added
 *   "credentialSchema": [{"id": "https://w3id.org/citizenship/v1"}]
 */
function checkPrc() {
  pejs = new PEJS();
  const presentationDefinition = getFileAsJson('./resources/edu/pd-1.json').presentation_definition;
  const vc:any = getFileAsJson("resources/edu/sphereon-university-degree-verifiable-credential.json");
  const result: EvaluationResults = pejs.evaluate(presentationDefinition, new VP(new Presentation(null, null, null, [vc], null, null)));
  const presentationSubmission: PresentationSubmission = pejs.submissionFrom(presentationDefinition, [vc])
  console.log(presentationSubmission);
  console.log(result)
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
