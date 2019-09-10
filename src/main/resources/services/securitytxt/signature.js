var libs = {
    portal: require('/lib/xp/portal'),
    util: require('/lib/util')
};

function handleGet() {

    var siteConfig = libs.portal.getSiteConfig();

    if (siteConfig.signature !== '') {
        return {
            contentType: 'text/plain',
            body: siteConfig.signature
        };
    } else {
        return {
            status: 404
        };
    }
}
exports.get = handleGet;