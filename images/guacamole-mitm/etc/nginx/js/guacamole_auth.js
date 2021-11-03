import querystring from "querystring";


// This function runs when the /api/tokens endpoint is requested
// It calls the proxied service, injecting the known credentials
const getApiTokenResponse = req => {
    if( req.method.toLowerCase() == "post" ) {
        const upstreamAddress = process.env.GUACAMOLE_MITM_UPSTREAM_ADDRESS || "127.0.0.1";
        const upstreamPort = process.env.GUACAMOLE_MITM_UPSTREAM_PORT || "8080";
        const upstreamURL = `http://${upstreamAddress}:${upstreamPort}/guacamole/api/tokens`;

        const username = process.env.GUACAMOLE_MITM_USERNAME || "portal";
        const password = process.env.GUACAMOLE_MITM_PASSWORD || "portal";
        const requestBody = querystring.stringify({ username, password });

        ngx.fetch(upstreamURL, { method: "POST", body: requestBody })
            .then(resp => resp.text().then(text => [resp.status, text]))
            .then(args => req.return(args[0], args[1]));
    }
    else {
        req.return(400);
    }
};


// Export functions for querying the user and groups
export default { getApiTokenResponse }
