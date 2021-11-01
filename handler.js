export default async function handleRequest(request) {
  let authorization = request.headers.get("Authorization");
  if(authorization !== null)
      console.log(parseJwt(authorization))
  
  const printTypes = await PRINT_TYPES.get("printTypes")
  if(printTypes === null)
    {  
      const resp = await fetch("https://zakeke-testing-webapi-5.azurewebsites.net/api/graphql",
        {
          headers:{
            'Authorization': `${AUTH_BEARER}`,
            'Content-Type': "application/json"
          },
          
          body:JSON.stringify({"name":"printTypesQuery","query":"query printTypesQuery {\n  ...printTypesPaginationFragment_list\n}\n\nfragment printTypesPaginationFragment_list on Query {\n  printTypes(first: 50) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n","variables":{}}),
          method:"POST"
        })
        const data = await resp.json()
        await PRINT_TYPES.put("printTypes", JSON.stringify(data))

        return new Response(JSON.stringify(data), {
          headers: { 'content-type': 'application/json' },
        })
    }
    else
    {
      return new Response(printTypes, {
        headers: { 'content-type': 'application/json' },
      })
    }
  }
  
  function parseJwt(token) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }