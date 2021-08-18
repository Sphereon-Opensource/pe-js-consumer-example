// This can be a wallet project
// This can also be a Verifier-Backend-Server side project

import {PEJS} from "@sphereon/pe-js";

// const holderDID = wallet.data.holder.did[i];
// const vcs = wallet.data.verfiable_credentials;

var pejs : PEJS = new PEJS(/*holderDID*/);

console.log(pejs);

// pejs.evaluate(..., vcs);
//  // DO NOT WRITE TEST CASES
//
//  // make sure the messages are in a language similar to following:
//  // Our Library's response to the caller:
//  // Holder needs to have a College-Degree Credential that is issued to 'holder'
//  // For example College-Degree is coming from input_descriptor_name
//
// pejs.validateDefinition();
//
// pejs.validateSubmission();
//
// pejs.selectFrom();
