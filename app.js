// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Identity and Access Management (IAM) API
//    and check the quota for your project at
//    https://console.developers.google.com/apis/api/iam
// 2. This sample uses Application Default Credentials for authentication.
//    If not already done, install the gcloud CLI from
//    https://cloud.google.com/sdk and run
//    `gcloud beta auth application-default login`.
//    For more information, see
//    https://developers.google.com/identity/protocols/application-default-credentials
// 3. Install the Node.js client library by running
//    `npm install googleapis --save`

const {google} = require('googleapis');
const iam = google.iam('v1');

async function main () {
  const authClient = await authorize();
  const request = {
    // Required. The resource name of the service account in the following format:
    // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
    // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
    // the account. The `ACCOUNT` value can be the `email` address or the
    // `unique_id` of the service account.
    name: 'projects/experiment-lab-290806/serviceAccounts/experiment-lab-290806@appspot.gserviceaccount.com',  // TODO: Update placeholder value.

    resource: {
        "payload": "{\"sub\": \"experiment-lab-290806@appspot.gserviceaccount.com\", \"aud\": \"vault/myrole\"}"
    },

    auth: authClient,
  };

  try {
    const response = (await iam.projects.serviceAccounts.signJwt(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}
main();

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });
  return await auth.getClient();
}