const libs = {
  portal: require('/lib/xp/portal'),
  util: require('/lib/util')
};

function handleGet() {
  const siteConfig = libs.portal.getSiteConfig();

  if (siteConfig?.options?._selected === "textarea" && siteConfig?.options?.textarea?.encryption) {
    return {
      contentType: 'text/plain',
      body: siteConfig.options.textarea.encryption,
    };
  }

  if (siteConfig?.options?._selected === "fields" && siteConfig?.options?.fields?.encryption) {
    return {
      contentType: 'text/plain',
      body: siteConfig.options.fields.encryption,
    };
  }

  // Fallback for older config (in case people update the app but forget to set the new configuration)
  if (!siteConfig?.options?._selected && siteConfig?.encryption) {
    return {
      contentType: 'text/plain',
      body: siteConfig.encryption,
    };
  }

  return {
    status: 404
  };
}
exports.get = handleGet;
