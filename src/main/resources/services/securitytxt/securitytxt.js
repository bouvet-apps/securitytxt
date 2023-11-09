const libs = {
  portal: require('/lib/xp/portal'),
  util: require('/lib/util')
};

// Takes the old way of configuring app, puts them in the optionset for input fields configuration and removes the old config.
function createNewConfigOptions(siteConfig) {
  for (let key in siteConfig) {
    if (siteConfig.hasOwnProperty(key)) {
      siteConfig.options.fields = siteConfig[key];
      delete siteConfig.key;
    }
  }
  return siteConfig;
}

// Creates the securityTxt from the input fields, same way as done in previous versions of app.
function createFieldsSecurityTxt(siteConfig) {
  let securityTxt = "";

  if (siteConfig.comments) {
    securityTxt += siteConfig.comments + "\n";
  }

  libs.util.data.forceArray(siteConfig.contactOptions).forEach(function (item) {
    if (item._selected === "url" && item[item._selected].url) {
      securityTxt += "Contact: " + item[item._selected].url + "\n";
    } else if (item._selected === "tel" && item[item._selected].tel) {
      securityTxt += "Contact: tel:" + item[item._selected].tel + "\n";
    } else if (item._selected === "email" && item[item._selected].email) {
      securityTxt += "Contact: mailto:" + item[item._selected].email + "\n";
    }
  });

  if (siteConfig.displayCanonical) {
    const defaultUrl = libs.portal.pageUrl({ id: libs.portal.getSite()._id, type: "absolute" });
    securityTxt += "Canonical: " + defaultUrl + ".well-known/security.txt" + "\n" + 
    "Canonical: " + defaultUrl + "security.txt" + "\n";
  }

  if (siteConfig.encryption) {
    securityTxt += "Encryption: " + libs.portal.pageUrl({ id: libs.portal.getSite()._id, type: "absolute" }) + "pgp-key.txt\n";
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

  // Check if new config per version 2.2.0 is not present and if any of the old configuration options are available.
  if (!siteConfig.options && (siteConfig.contactOptions || siteConfig.encryption || siteConfig.hiring || siteConfig.policy || siteConfig.expiresOptions)) {
    siteConfig = createNewConfigOptions(siteConfig);
  }

  if (siteConfig.options.textarea) {
    securityTxt = siteConfig.options.textarea.text;
  } else {
    const fieldsConfig = siteConfig.options.fields;
    securityTxt = createFieldsSecurityTxt(fieldsConfig);
  }

  return {
    contentType: 'text/plain',
    body: securityTxt
  };
}
exports.get = handleGet;
