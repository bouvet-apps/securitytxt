var libs = {
    portal: require('/lib/xp/portal'),
    util: require('/lib/util')
};

function handleGet() {

    var siteConfig = libs.portal.getSiteConfig();

    if (siteConfig.encryption !== '') {
        return {
            contentType: 'text/plain',
            body: siteConfig.encryption
        };
    } else {
        return {
            status: 404
        };
    }
}
exports.get = handleGet;