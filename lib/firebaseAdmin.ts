import admin from "firebase-admin";

const serviceAccount = {
  projectId: "tripping-968ad",
  clientEmail: "firebase-adminsdk-fbsvc@tripping-968ad.iam.gserviceaccount.com",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDGViVrTQmdUWB0\nAqzZ2ku04UuglM7G/iMgHdm64aybzdgB8AbRzt+IIgBcB6zLF5kb4FhrEOPt1359\n1o4JOYKg60tDFwboC0282jk1Z2Mxo+Uylh6emFjRnXxiyV5TWsWVQvl8in+fIQtr\ngITxGc8PXiQW/7En7rX8vdPTN8RMp2xE11FDL1Ca4/5cOjKCNpKzJfInJu6QxasS\n8M0QJsoxxHOafcS4kkNssN0iRJuR9eSnfEdcHXIrL0JiTKLQW+aTBFTlQ7iPCVm/\n1YMt2Llk1apZQUB+k2HRqTfkCv0ApV/vj/ORxEslW47gWNUur0uKPQwTUIYTWrED\n8kktUJiZAgMBAAECggEABUeOl8qOxlBleAIIk0h3qTRt2dIHiLc4piS9vtF6OxHc\nFBRra+9jhaX84UkWi6i76pP9eV2LyzizdEjIsk6Et/P+TB7VNdHVzFNTeqS9QBtS\nARd8JNIkiMQjUH+FRTV2Aka7mNJU3ku0PfD8KAPIZAGv0U8G4vq02ZNqXn4bW4eq\nRdIKMywbV8ga9Hownb7iQp/bfNerHYVcadsbWbFJq/nG3e8WnV2YoyUnLDN/zAmq\nk1IVMR35l0uj5q6Vl5kUJXc0j2/UQ71Gl4cAJqZ5TOqA4m8pGnlSBkgSsUtNNjfe\nV/o/Neu2DqA2TgplRzmEjKFKoAYlHoXXveWhnKlr1QKBgQD4Z03EVjehOvdt9ey9\nroD094H2CV8hFJ7fZ2Q8dhwjDxel7z1it0bpqFzTaE17J/vkgPg/fLW6PRIIldh1\nj16afrDEpaEPulTgRjHykfBOm2LXEgYUT3kQLZIOWfCe2a0ER18pv44z9ekMiUWl\nfz8HFPy4Dxdzclrp8OclJnq2ZwKBgQDMZuD2ys8J94gZm0PB66IShwLXzWKA37Qw\nbQLqCHa7mQyZTDgt+UC7mxA9FALQjKKda1QgIA95Ez/upOQcdrYwhhaMaqtYDiZG\nENhy3wIEsMW/d9/nrGdNygFaWfr1k55JZZ67lpWHjP8IDDOYjRQX4Ler8qOCsgkj\nmtBOzqLY/wKBgQCVfRW/4mL4FJRzCFzAihPxWEJN3rXxIoe5ym74M9wa/SouIhu/\nHK0AUOIMF+kJBLcCfNro2hRDUB1aLVNm7DDyqOuYbFTRMkGB9rx4Tntf0wNYivA9\nqNYidko/eMDl1/nXaVxLs4vQmVz2vmW7gyhbCrZLzkk+oMM1plR0dwPCYQKBgQCb\ntb+ooaUI/bWDdEEwyBVGMe2bgg2JCWGWBmVS7bGthZEQcvzVIO0MPbsoHEdsocX7\nT9jdRC8lV+G7JYfUmyZ9XphszZHL2bOUap7JG1PJSPTLwEEklrR3kOxo7OT+ET9i\nwHQkiTlN8r4RXmIr00U8T2b8KTIgjQnjQrtvXYC29wKBgQCbXJnDb9yT3IRWWIbU\nSYCnUuf2/FF1+7rCqc+cKwynIMXEaoOXWxMKkOZIWKyWZjjyYTx5QRnXfXqvvoF0\nryIpqmbeGGpDneuoW+dlt8YSWO7ve+ioD6N30ghG6E2jZ1g+PHDAwlUDMxSgehYQ\n2oT4g+GuH9JFZsDE6m9+c0pktw==\n-----END PRIVATE KEY-----\n"?.replace(
      /\\n/g,
      "\n",
    ),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const firebaseAdmin = admin;
