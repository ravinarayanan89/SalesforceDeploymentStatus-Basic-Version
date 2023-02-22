let sfGet = async function(endpoint,sessionId){
    return await fetch(endpoint, {
       headers: { 
           "Content-Type": "application/json; charset=utf-8" ,
           "Authorization":"Bearer "+sessionId
       },
       method: 'GET',
    });
}

let sfPatch = async function(endpoint,sessionId,body){
   
   return await fetch(endpoint, {
      headers: { 
          "Content-Type": "application/json; charset=utf-8" ,
          "Authorization":"Bearer "+sessionId
      },
      body : JSON.stringify(body),
      method: 'PATCH',
   });
}

export {sfGet,sfPatch};