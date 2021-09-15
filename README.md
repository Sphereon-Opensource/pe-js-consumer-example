## PE-JS Consumer Examples

This project is testing the **`pe-js`** library against the examples in [vc-examples](https://github.com/w3c-ccg/vc-examples). These examples are just made to show you how you can use the @sphereon/pe-js library. you can change our examples in `resources/*` folders to suit your needs.
## How to run
To run this project you need to first, resolve the dependencies:

`yarn install`

and then run the `consumer-script.ts` scripts.
using the command existing in `package.json`

`ts-node scripts/consumer-script.ts`

## Important Notes:
Two of these examples are partially changed:

* In [chapi-http-edu](https://github.com/w3c-ccg/vc-examples/tree/master/docs/chapi-http-edu) We've changed the verifiableCredential Object to be a list instead of a single entity because of [presentation-submissions](https://identity.foundation/presentation-exchange/#presentation-submissions)
* In [danube](https://github.com/w3c-ccg/vc-examples/blob/master/docs/prc/danube) * the VC in the `prc.json` file doesn't have a valid schema uri, therefore we added: `"credentialSchema": [{"id": "https://w3id.org/citizenship/v1"}]`

And since [vc-examples](https://github.com/w3c-ccg/vc-examples) didn't have any *presentation-definitions* in it, we generated them based on our known examples.
