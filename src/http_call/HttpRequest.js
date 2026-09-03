export default async function sendHttpRequest(
    url,
    method = 'GET',
    body = null
) {

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Only attach body for non-GET methods
    if (body && method !== 'GET') {
        options.body = JSON.stringify(body)
    }

    let response = await fetch(url, options)

    let jsonData = ""

    try {
        jsonData = await response.json()
    } catch {
        jsonData = "{}"
    }

    return {
        json: jsonData,
        status: response.status,
        responseHeader: response.headers
    }
}
