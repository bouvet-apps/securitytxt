const libs = {
  portal: require("/lib/xp/portal"),
  util: require("/lib/util"),
};

function handleGet() {
  const siteConfig = libs.portal.getSiteConfig();

  if (siteConfig.option.fields.encryption !== "") {
    return {
      contentType: "text/plain",
      body: siteConfig.option.fields.encryption !== "",
    };
  } else {
    return {
      status: 404,
    };
  }
}
exports.get = handleGet;
