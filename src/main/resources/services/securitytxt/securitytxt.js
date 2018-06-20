var libs = {
    portal: require('/lib/xp/portal'),
    util: require('/lib/enonic/util')
};

function handleGet() {

    var siteConfig = libs.portal.getSiteConfig();
    var securityTxt = "";

    libs.util.data.forceArray(siteConfig.contactOptions).forEach(function(item) {
        log.info(JSON.stringify(item, null, 2));
        if (item._selected === 'url' && item[item._selected].url) {
            securityTxt += 'Contact: ' + item[item._selected].url + '\n';
        } else if (item._selected === 'tel' && item[item._selected].tel) {
            securityTxt += 'Contact: tel:' + item[item._selected].tel + '\n';
        } else if (item._selected === 'email' && item[item._selected].email) {
            securityTxt += 'Contact: mailto:' + item[item._selected].email+ '\n';
        }
    });

    if (siteConfig.encryption) {
        securityTxt += 'Encryption: ' + libs.portal.pageUrl({type: 'absolute'}) + 'pgp-key.txt\n';
    }

    if (siteConfig.acknowledgements) {
        securityTxt += 'Acknowledgements: ' + siteConfig.acknowledgements + '\n';
    }

    if (siteConfig.policy) {
        securityTxt += 'Policy: ' + siteConfig.policy + '\n';
    }

    if (siteConfig.signature) {
        securityTxt += 'Signature: ' + libs.portal.pageUrl({type: 'absolute'}) + '.well-known/security.txt.sig\n';
    }

    if (siteConfig.hiring) {
        securityTxt += 'Hiring: ' + siteConfig.hiring + '\n';
    }

    return {
        contentType: 'text/plain',
        body: securityTxt
    };
}
exports.get = handleGet;