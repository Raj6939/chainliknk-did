const url = `https://api.entity.hypersign.id/api/v1/presentation/verify`;
let schema = null
try {
  const regSchemaResp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImExMjYxMWQ4MmM3MzMyMzNhMzAzMzM0YTkxNGI4YWY4ZWM4ZSIsInVzZXJJZCI6InJhai52LnBhdGlsMTA4QGdtYWlsLmNvbSIsImdyYW50VHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsImlhdCI6MTcwMDY0NzAxMiwiZXhwIjoxNzAwNjYxNDEyfQ.3eTn_EvKiXJdCcqyCPf94oGW2P1TWweibkNOMXsrRB8'
    },
    body:JSON.stringify(schema)
  });

  const schemaResp = await regSchemaResp.json();

  if (schemaResp.error) {
    console.error(schemaResp.error);
    throw new Error("Request failed");
  }

  const data = schemaResp;
  console.log("data console response", data);  
  if (data.Response === "Error") {
    console.error(data.Message);
    throw new Error(`Functional error. Read message: ${data.Message}`);
  }
  const result = data.verified
  console.log(result)
  return Functions.encodeString(JSON.stringify(result));
} catch (error) {
  console.error("Error during API call:", error);
  throw error;
}