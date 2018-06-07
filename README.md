# Security.txt for Enonic XP
Easy to set up and use security.txt for Enonic XP.

## How to use
The application is available through [Enonic Market](https://market.enonic.com/vendors/bouvet/securitytxt).

### Install application
Open the Applications section of your Enonic XP installation. Click 'Install', 
and locate the 'Security.txt' app in the 'Enonic Market' tab. Now click the 'Install'
button.

### Apply the application to your site
Edit your site settings by clicking 'edit' on the site node in Content Manager. Select 'Security.txt'
in the 'Applications' search box, and click to select it. It is now added to your site.

## Set up the security.txt for your site
All security.txt options are available through site configuration of this app.

### Site configuration
You can any of the available entries by entering text in the available input fields. You should consult [https://securitytxt.org](https://securitytxt.org/) for details on Security.txt and how to use it on your site. The "Contact" directive is not optional. 

#### Contact
Add one or more ways that researchers MAY use for reporting security issues.  The value can be an email address, a phone number and/or a contact page with more information.  The "Contact:" directive MUST always be present in a security.txt file.  URIs SHOULD be loaded over HTTPS.  Security email addresses SHOULD use the conventions defined in [section 4 of [RFC2142]](https://tools.ietf.org/html/rfc2142#section-4), but there is no requirement for this directive to be an email address.

[Documentation for the Contact directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.3)

#### Encryption
This directive allows you to point to an encryption key that you want security researchers to use for encrypted communication.  You MUST NOT directly add your key to the field, instead the value of this field MUST be a URI pointing to a location where the key can be retrieved from.  If the key is being retrieved from a website, then the key MUST be loaded over HTTPS.

When it comes to verifying the authenticity of the key, it is always the security researcher's responsibility to make sure the key being specified is indeed one they trust.  Researchers MUST NOT assume that this key is used to generate the signature file.

[Documentation for the Encryption directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.4)

#### Signature
In order to ensure the authenticity of the security.txt file one SHOULD use the "Signature:" directive.

When it comes to verifying the authenticity of the file, it is always the security researcher's responsibility to make sure the key being specified is indeed one they trust.

[Documentation for the Signature directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.5)

#### Policy
With the Policy directive, you can link to where your security policy and/or disclosure policy is located.  This can help security researchers understand what you are looking for and how to report security vulnerabilities.

[Documentation for the Policy directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.6)

#### Acknowledgments
This directive allows you to link to a page where security researchers are recognized for their reports.  The page SHOULD list individuals or companies that disclosed security vulnerabilities and worked with you to remediate the issue.

[Documentation for the Acknowledgments directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.7)

#### Hiring
The "Hiring" directive is for linking to the vendor's security-related job positions.

[Documentation for the Hiring directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.8)

## Language
This app is available in English and Norwegian. Language is automatically detected by Enonic XP and applied accordingly.

## Links
[Read the entire spec and more at securitytext.org](https://securitytext.org/)