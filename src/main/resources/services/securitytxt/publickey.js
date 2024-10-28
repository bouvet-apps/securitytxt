const libs = {
  portal: require('/lib/xp/portal'),
  util: require('/lib/util')
};

function handleGet() {
  const siteConfig = libs.portal.getSiteConfig();
  let encryptionTxt = "";

  // We don't have Babel in this app to transpile es6, so we can't use optional chaining as long as EnonicXP uses the Nashorn engine.
  if (siteConfig.options && siteConfig.options._selected) {
    if (siteConfig.options._selected === "textarea" && siteConfig.options.textarea && siteConfig.options.textarea.encryption) {
      encryptionTxt = siteConfig.options.textarea.encryption;
    } else if (siteConfig.options._selected === "fields" && siteConfig.options.fields && siteConfig.options.fields.encryption) {
      encryptionTxt = siteConfig.options.fields.encryption;
    }
  } else if (siteConfig.encryption) {
    // Fallback for older config values (in case people update the app but forget to set the new configuration)
    encryptionTxt = siteConfig.encryption;
  }

  if (encryptionTxt) {
    return {
      contentType: 'text/plain',
      body: encryptionTxt
    };
  }

  return {
    status: 404
  };
}
exports.get = handleGet;
