module.exports = (baseUrl) => (req, res) => {

    const parseUrl = new URL(req.url, baseUrl);

    const params = {}
    parseUrl.searchParams.forEach((val, key) => {
        params[key] = val;
    })
    req.pathname = parseUrl.pathname;
    req.params = params;
}