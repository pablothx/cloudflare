export default async function handleRequest(request) {
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
    
    return new Response(JSON.stringify(data), {
      headers: { 'content-type': 'application/json' },
    })
  }
  