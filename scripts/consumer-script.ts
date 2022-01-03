// This can be a wallet project
// This can also be a Verifier-Backend-Server side project

import fs from "fs";

import {
    EvaluationResults,
    IPresentation,
    IVerifiableCredential,
    IVerifiablePresentation,
    ProofType,
    SelectResults,
} from "@sphereon/pex";
import {PresentationDefinitionV1, PresentationSubmission} from "@sphereon/pex-models";
import {PEX} from "@sphereon/pex/dist/main/lib";
import jp, {PathComponent} from "jsonpath";
import jwt_decode from "jwt-decode";

import {Wallet} from "./Wallet";


// const holderDID = wallet.data.holder.did[i];
// const vcs = wallet.data.verifiable_credentials;

/**
 * All the examples here copied from the address: https://github.com/w3c-ccg/vc-examples/tree/master/docs
 * All the presentationDefinition object are created by Sphereon.com based on the VCs above
 */
let pex: PEX = new PEX();

console.log(pex);

function getFileAsJson(path: string) {
    return JSON.parse(getFileSimple(path));
}

function getFileSimple(path: string) {
    return fs.readFileSync(path, "utf-8");
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/chapi-http-edu
 * We've changed the verifiableCredential Object to be a list instead of a single entity because of https://identity.foundation/presentation-exchange/#presentation-submissions
 */
function checkChapiHttpEdu() {
    console.log("checkChapiHttpEdu");
    const presentationDefinition = getFileAsJson(
        "./resources/chapi-http-edu/pd-1.json"
    ).presentation_definition;
    const vpSimple = getFileAsJson("./resources/chapi-http-edu/sphereon-vp.json");
    const result: EvaluationResults = pex.evaluatePresentation(
        presentationDefinition,
        vpSimple
    );
    const validated = pex.validateSubmission(
        result.value as PresentationSubmission
    );
    const presentation: IPresentation = pex.presentationFrom(
        presentationDefinition,
        vpSimple.verifiableCredential
    );
    console.log("result: ", JSON.stringify(result, null, 2));
    console.log("validated:", JSON.stringify(validated, null, 2));
    console.log("presentationSubmission:", JSON.stringify(presentation, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/chapi-http-edu
 * We've changed the verifiableCredential Object to be a list instead of a single entity because of https://identity.foundation/presentation-exchange/#presentation-submissions
 */
function checkChapiHttpEdu_selectFrom() {
    console.log("checkChapiHttpEdu_selectFrom");
    const wallet: {
        holder: string;
        verifiableCredentials: IVerifiableCredential[];
    } = new Wallet().getWallet(0);
    const presentationDefinition = getFileAsJson(
        "./resources/chapi-http-edu/pd-1.json"
    ).presentation_definition;
    const vpSimple: IVerifiablePresentation = getFileAsJson(
        "./resources/chapi-http-edu/sphereon-vp.json"
    );
    const result: SelectResults = pex.selectFrom(
        presentationDefinition,
        vpSimple.verifiableCredential,
        [wallet.holder],
        [ProofType.BbsBlsSignatureProof2020]
    );
    console.log("result: ", JSON.stringify(result, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.0
 */
function checkCmtrV0_0() {
    console.log("checkCmtrV0_0");
    pex = new PEX();
    const presentationDefinition = getFileAsJson(
        "./resources/cmtr/v0.0/pd-1.json"
    ).presentation_definition;
    const vc = getFileAsJson("./resources/cmtr/v0.0/cmtr-credential-v0.0.json");
    const result: EvaluationResults = pex.evaluatePresentation(
        presentationDefinition,
        {
            "@context": [],
            type: [],
            verifiableCredential: [vc],
            holder: undefined,
        }
    );
    const presentation: IPresentation = pex.presentationFrom(
        presentationDefinition,
        [vc]
    );
    console.log(JSON.stringify(presentation, null, 2));
    console.log(JSON.stringify(result, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.1
 */
function checkCmtrV0_1() {
    console.log("checkCmtrV0_1");
    pex = new PEX();
    const presentationDefinition = getFileAsJson(
        "./resources/cmtr/v0.1/pd-1.json"
    ).presentation_definition;
    const vc = getFileAsJson("./resources/cmtr/v0.1/cmtr-credential-v0.1.json");
    const result: EvaluationResults = pex.evaluatePresentation(
        presentationDefinition,
        {
            "@context": [],
            type: [],
            verifiableCredential: [vc],
            holder: undefined,
        }
    );
    const presentation:  IPresentation = pex.presentationFrom(
        presentationDefinition,
        [vc]
    );
    console.log(JSON.stringify(presentation, null, 2));
    console.log(JSON.stringify(result, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.1
 * Here we only get a field from the report
 */
function checkCmtrV0_1_limited() {
    console.log("checkCmtrV0_1_limited");
    pex = new PEX();
    const presentationDefinition = getFileAsJson(
        "./resources/cmtr/v0.1/pd-2.json"
    ).presentation_definition;
    const vc = getFileAsJson("./resources/cmtr/v0.1/cmtr-credential-v0.1.json");
    const result: EvaluationResults = pex.evaluatePresentation(
        presentationDefinition,
        {
            "@context": [],
            type: [],
            verifiableCredential: [vc],
            holder: undefined,
        }
    );
    const presentation:  IPresentation = pex.presentationFrom(
        presentationDefinition,
        [vc]
    );
    console.log(JSON.stringify(presentation, null, 2));
    console.log(JSON.stringify(result, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/cmtr/examples/v0.1
 */
function checkCmtrV0_2() {
    console.log("checkCmtrV0_2");
    pex = new PEX();
    const presentationDefinition = getFileAsJson(
        "./resources/cmtr/v0.2/pd-1.json"
    ).presentation_definition;
    const vp:  IPresentation = getFileAsJson(
        "./resources/cmtr/v0.2/cmtr-verifiable-presentation-v0.2.json"
    );
    const result: EvaluationResults = pex.evaluatePresentation(
        presentationDefinition,
        vp
    );
    const presentation:  IPresentation = pex.presentationFrom(
        presentationDefinition,
        vp.verifiableCredential
    );
    console.log(JSON.stringify(presentation, null, 2));
    console.log(JSON.stringify(result, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/covid-19/v1
 */
function checkCovid_19V1() {
    console.log("checkCovid_19V1");
    pex = new PEX();
    const presentationDefinition = getFileAsJson(
        "./resources/covid-19/v1/pd-1.json"
    ).presentation_definition;
    const vp:  IPresentation = getFileAsJson(
        "./resources/covid-19/v1/verifiable-presentation.json"
    );
    const result: EvaluationResults = pex.evaluatePresentation(
        presentationDefinition,
        vp
    );
    const presentation:  IPresentation = pex.presentationFrom(
        presentationDefinition,
        vp.verifiableCredential
    );
    console.log(JSON.stringify(presentation, null, 2));
    console.log(JSON.stringify(result, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/covid-19/v2
 */
function checkCovid_19V2_jwt() {
    console.log("checkCovid_19V2_jwt");
    pex = new PEX();
    const presentationDefinition = getFileAsJson(
        "./resources/covid-19/v2/pd-1.json"
    ).presentation_definition;
    const jwtEncoded = getFileSimple(
        "./resources/covid-19/v2/qSARS-CoV-2-Rapid-Test-Credential.jwt"
    );
    const vc: IVerifiableCredential = jwt_decode(jwtEncoded);
    const result: EvaluationResults = pex.evaluatePresentation(
        presentationDefinition,
        {
            "@context": [],
            type: [],
            verifiableCredential: [vc],
            holder: undefined,
        }
    );
    const presentation:  IPresentation = pex.presentationFrom(
        presentationDefinition,
        [vc]
    );
    console.log(JSON.stringify(presentation, null, 2));
    console.log(JSON.stringify(result, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/crude/examples/v1.0
 */
function checkCrude() {
    console.log("checkCrude");
    pex = new PEX();
    const presentationDefinition = getFileAsJson(
        "./resources/crude/v1.0/pd-1.json"
    ).presentation_definition;
    const vc: IVerifiableCredential = getFileAsJson(
        "resources/crude/v1.0/bill-of-lading-verifiable-credential-v1.0.json"
    );
    const result: EvaluationResults = pex.evaluatePresentation(
        presentationDefinition,
        {
            "@context": [],
            type: [],
            verifiableCredential: [vc],
            holder: undefined,
        }
    );
    const presentation:  IPresentation = pex.presentationFrom(
        presentationDefinition,
        [vc]
    );
    console.log(JSON.stringify(presentation, null, 2));
    console.log(JSON.stringify(result, null, 2));
}

/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/tree/master/docs/edu
 */
function checkEdu() {
    console.log("checkEdu");
    pex = new PEX();
    const presentationDefinition = getFileAsJson(
        "./resources/edu/pd-1.json"
    ).presentation_definition;
    const vc: IVerifiableCredential = getFileAsJson(
        "resources/edu/sphereon-university-degree-verifiable-credential.json"
    );
    const result: EvaluationResults = pex.evaluatePresentation(
        presentationDefinition,
        {
            "@context": [],
            type: [],
            verifiableCredential: [vc],
            holder: undefined,
        }
    );
    const presentation:  IPresentation = pex.presentationFrom(
        presentationDefinition,
        [vc]
    );
    console.log(JSON.stringify(presentation, null, 2));
    console.log(JSON.stringify(result, null, 2));
}



/**
 * this example is based on https://www.w3.org/TR/vc-data-model/#example-a-simple-example-of-a-verifiable-credential after a DIF Slack request from Snorre Lothar von Gohren Edwin
 *
 * So PE, how should a wallet know what the PE is asking for based on just a VC? Lets say we have this VC:
 * https://www.w3.org/TR/vc-data-model/#example-a-simple-example-of-a-verifiable-credential,
 * how can the values of minimal example here: https://identity.foundation/presentation-exchange/spec/v1.0.0/#presentation-definition be adjusted to acctually find that example verfiable credential? I just dont see how that schema in PE is reflected into a verfiable credential?
 * Or am I looking at the wrong link between the data here?
 * Is it the schemas of a VC context that we are talking about as schema in the minimalistic PE? (edited)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function checkDiwala() {
    console.log("checkDiwala");
    pex = new PEX();
    const presentationDefinition: PresentationDefinitionV1 = getFileAsJson("./resources/diwala/pd.json");
    const config: any = getFileAsJson("./resources/diwala/config.json");
    const result: EvaluationResults = pex.evaluateCredentials(
        presentationDefinition,
        config.wallet.verifiable_credentials as IVerifiableCredential[],
        [config.wallet.owner.identities.did],
        []
    );
    console.log(JSON.stringify(result, null, 2));
}


/**
 * this example is based on https://github.com/w3c-ccg/vc-examples/blob/master/docs/prc/danube
 * the VC in the prc.json file doesn't have a valid schema uri, therefore we added
 *   "credentialSchema": [{"id": "https://w3id.org/citizenship/v1"}]
 */
function checkPrc() {
    console.log("checkPrc");
    pex = new PEX();
    const presentationDefinition = getFileAsJson(
        "./resources/edu/pd-1.json"
    ).presentation_definition;
    const vc: IVerifiableCredential = getFileAsJson(
        "resources/edu/sphereon-university-degree-verifiable-credential.json"
    );
    const result: EvaluationResults = pex.evaluatePresentation(
        presentationDefinition,
        {
            "@context": [],
            type: [],
            verifiableCredential: [vc],
            holder: undefined,
        }
    );
    const presentation:  IPresentation = pex.presentationFrom(
        presentationDefinition,
        [vc]
    );
    console.log(JSON.stringify(presentation, null, 2));
    console.log(JSON.stringify(result, null, 2));
}

function checkSelectFrom() {
    console.log("checkSelectFrom");
    pex = new PEX();
    const pd = getFileAsJson("./resources/smithbk/pd.json");
    const config: any = getFileAsJson("./resources/smithbk/config.json");
    const selectResults: SelectResults = pex.selectFrom(
        pd,
        config.wallet.verifiable_credentials,
        config.wallet.owner.identities[0].did,
        [ProofType.BbsBlsSignatureProof2020]
    );

    if (selectResults?.matches) {
        const limitinglyDisclosedVC: {
            path: PathComponent[];
            value: IVerifiableCredential;
        }[] = jp.nodes(
            config.wallet.verifiable_credentials,
            selectResults?.matches[0].vc_path[0].replace(".verifiableCredential", "")
        );
        const fullyDisclosedVC = config.wallet.verifiable_credentials.filter(
            (vc: IVerifiableCredential) => vc.id === limitinglyDisclosedVC[0].value.id
        )[0];

        console.log(fullyDisclosedVC);
    }
}

function tests() {
    /*if (true) {
        return
    }*/
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
}
tests();
checkDiwala();
