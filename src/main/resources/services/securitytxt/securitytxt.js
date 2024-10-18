const libs = {
  portal: require('/lib/xp/portal'),
  util: require('/lib/util')
};

// Creates the securityTxt from the input fields, same way as done in previous versions of app.
function createFieldsSecurityTxt(siteConfig) {
  let securityTxt = "";

  if (siteConfig.comments) {
    securityTxt += siteConfig.comments + "\n";
  }

  if (siteConfig.contactOptions) {
    libs.util.data.forceArray(siteConfig.contactOptions).forEach(function (item) {
      if (item._selected === "url" && item[item._selected].url) {
        securityTxt += "Contact: " + item[item._selected].url + "\n";
      } else if (item._selected === "tel" && item[item._selected].tel) {
        securityTxt += "Contact: tel:" + item[item._selected].tel + "\n";
      } else if (item._selected === "email" && item[item._selected].email) {
        securityTxt += "Contact: mailto:" + item[item._selected].email + "\n";
      }
    });
  }

  if (siteConfig.displayCanonical) {
    const defaultUrl = libs.portal.pageUrl({ id: libs.portal.getSite()._id, type: "absolute" });
    securityTxt += "Canonical: " + defaultUrl + "/.well-known/security.txt" + "\n" +
    "Canonical: " + defaultUrl + "/security.txt" + "\n";
  }

  if (siteConfig.encryption) {
    securityTxt += "Encryption: " + libs.portal.pageUrl({ id: libs.portal.getSite()._id, type: "absolute" }) + "/.well-known/pgp-key.txt\n";
  }

  if (siteConfig.acknowledgements) {
    securityTxt += "Acknowledgements: " + siteConfig.acknowledgements + "\n";
  }

  if (siteConfig.policy) {
    securityTxt += "Policy: " + siteConfig.policy + "\n";
  }

  if (siteConfig.hiring) {
    securityTxt += "Hiring: " + siteConfig.hiring + "\n";
  }

  if (siteConfig.preferredLanguages) {
    securityTxt +=
      "Preferred-Languages: " + siteConfig.preferredLanguages + "\n";
  }

  if (siteConfig.expiresOptions && siteConfig.expiresOptions.static && siteConfig.expiresOptions.static.date) {
    const expiryDate = new Date(siteConfig.expiresOptions.static.date);
    securityTxt += "Expires: " + expiryDate.toISOString() + "\n";
  } else {
    // Expiry date is mandatory. Default to dynamic expiry date if options are missing.
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 60);
    securityTxt += "Expires: " + expiryDate.toISOString() + "\n";
  }

  return securityTxt;
}

function handleGet() {
  let siteConfig = libs.portal.getSiteConfig();
  let securityTxt = "";

  // We don't have Babel in this app to transpile es6, so we can't use optional chaining as long as EnonicXP uses the Nashorn engine.
  if (siteConfig.options && siteConfig.options._selected) {
    if (siteConfig.options._selected === "textarea" && siteConfig.options.textarea && siteConfig.options.textarea.text) {
      securityTxt = siteConfig.options.textarea.text;
    } else if (siteConfig.options._selected === "fields" && siteConfig.options.fields) {
      securityTxt = createFieldsSecurityTxt(siteConfig.options.fields);
    }
  } else if (siteConfig.contactOptions || siteConfig.encryption || siteConfig.hiring || siteConfig.policy || siteConfig.expiresOptions) {
    // Fallback for older config values (in case people update the app but forget to set the new configuration)
    securityTxt = createFieldsSecurityTxt(siteConfig);
  }

  if (securityTxt) {
    return {
      contentType: 'text/plain',
      body: securityTxt
    };
  }

  return {
    status: 404
  };
}
exports.get = handleGet;
