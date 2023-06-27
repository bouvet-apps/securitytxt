const libs = {
    portal: require('/lib/xp/portal'),
    util: require('/lib/util')
};

function handleGet() {

    const siteConfig = libs.portal.getSiteConfig();
    let securityTxt = "";

    libs.util.data.forceArray(siteConfig.contactOptions).forEach(function (item) {
        if (item._selected === 'url' && item[item._selected].url) {
            securityTxt += 'Contact: ' + item[item._selected].url + '\n';
        } else if (item._selected === 'tel' && item[item._selected].tel) {
            securityTxt += 'Contact: tel:' + item[item._selected].tel + '\n';
        } else if (item._selected === 'email' && item[item._selected].email) {
            securityTxt += 'Contact: mailto:' + item[item._selected].email + '\n';
        }
    });

    if (siteConfig.encryption) {
        securityTxt += 'Encryption: ' + libs.portal.pageUrl({ id: libs.portal.getSite()._id,type: 'absolute' }) + 'pgp-key.txt\n';
    }

    if (siteConfig.acknowledgements) {
        securityTxt += 'Acknowledgements: ' + siteConfig.acknowledgements + '\n';
    }

    if (siteConfig.policy) {
        securityTxt += 'Policy: ' + siteConfig.policy + '\n';
    }

    if (siteConfig.signature) {
      securityTxt += 'Signature: ' + libs.portal.pageUrl({ id: libs.portal.getSite()._id, type: 'absolute' }) + '.well-known/security.txt.sig\n';
    }

    if (siteConfig.hiring) {
        securityTxt += 'Hiring: ' + siteConfig.hiring + '\n';
    }

    if (siteConfig.expiresOptions &&
        siteConfig.expiresOptions.static &&
        siteConfig.expiresOptions.static.date) {

        const expiryDate = new Date(siteConfig.expiresOptions.static.date);

        securityTxt += 'Expires: ' + expiryDate.toISOString() + '\n';

    } else {
        // Expiry date is mandatory. Default to dynamic expiry date if options are missing.
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 60);

        securityTxt += 'Expires: ' + expiryDate.toISOString() + '\n';
    }

    return {
        contentType: 'text/plain',
        body: securityTxt
    };
}
exports.get = handleGet;
