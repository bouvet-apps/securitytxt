# Security.txt for Enonic XP
Easy to set up and use security.txt for Enonic XP. You should consult [securitytxt.org](https://securitytxt.org/) for details on Security.txt and how to best use it on your site.

## How to use
The application is available through [Enonic Market](https://market.enonic.com/vendors/bouvet/securitytxt).

## Install application

### Enonic Market
Open the Applications section of your Enonic XP installation. Click 'Install', 
and locate the 'Security.txt' app in the 'Enonic Market' tab. Now click the 'Install'
button.

### Build yourself
Build this app with gradle. In the terminal, from the root of the project, enter `./gradlew build`. On Windows, just enter `gradlew build`
in the command line from the project root. Next, move the JAR file from build/libs to your `$XP_HOME/deploy` directory. The Security.txt
app will now be available to add to your websites through the Content Manager app.

## Apply the application to your site
Edit your site settings by clicking 'edit' on the site node in Content Manager. Select 'Security.txt'
in the 'Applications' search box, and click to select it. It is now added to your site.

## Set up the security.txt for your site
The app offers two different options for adding security.txt to your site. Either enter your information in text area provided by the 'Textarea' option or use the inputfields available through the 'Inputfields' alternative. The 'Textarea' provides the possiblity to add a PGP signature to the security.txt. 

For more information regarding PGP-signature see [section 2.3 of [RFC 9116]](https://datatracker.ietf.org/doc/html/rfc9116#name-digital-signature)

### Site configuration
You can add any of the available entries by entering text in the available inputfields or by using the textarea option.  

You should consult [securitytxt.org](https://securitytxt.org/) for details on Security.txt and how to use it on your site. The "Contact" and "Expires" directive is not optional. 

#### Comments
Textarea for adding comments if needed. Use a "#" followed by the comment and start each new line with "#". The comments are placed at the top to the security.txt files.

#### Contact
Add one or more ways that researchers MAY use for reporting security issues.  The value can be an email address, a phone number and/or a contact page with more information.  The "Contact:" directive MUST always be present in a security.txt file.  URIs SHOULD be loaded over HTTPS.  Security email addresses SHOULD use the conventions defined in [section 4 of [RFC2142]](https://tools.ietf.org/html/rfc2142#section-4), but there is no requirement for this directive to be an email address.

[Documentation for the Contact directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.3)

#### Encryption
This directive allows you to point to an encryption key that you want security researchers to use for encrypted communication.  The Securitytxt app allows you to simply paste the key into the appropriate textarea, and will serve the key at a separate URI. The key MUST be loaded over HTTPS.

When it comes to verifying the authenticity of the key, it is always the security researcher's responsibility to make sure the key being specified is indeed one they trust.  Researchers MUST NOT assume that this key is used to generate the signature file.

[Documentation for the Encryption directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.4)

#### Policy
With the Policy directive, you can link to where your security policy and/or disclosure policy is located.  This can help security researchers understand what you are looking for and how to report security vulnerabilities.

[Documentation for the Policy directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.6)

#### Acknowledgments
This directive allows you to link to a page where security researchers are recognized for their reports.  The page SHOULD list individuals or companies that disclosed security vulnerabilities and worked with you to remediate the issue.

[Documentation for the Acknowledgments directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.7)

#### Hiring
The "Hiring" directive is for linking to the vendor's security-related job positions.

[Documentation for the Hiring directive](https://tools.ietf.org/html/draft-foudil-securitytxt-03#section-3.8)

#### Preferred-Languages
The "Preferred-Languages" field can be used to indicate a set of natural languages that are preferred when submitting security reports. Enter language tags, for example: "en, es, fr". 

[Documentation for the Preferred-Languages directive](https://www.rfc-editor.org/rfc/rfc9116#section-2.5.8)

#### Canonical
The "Canonical" field indicates the canonical URIs where the "security.txt" file is located, which is usually something like "https://example.com/.well-known/security.txt". When checked the canonical URIs will be added to the security.txt.

[Documentation for the Canonical directive](https://www.rfc-editor.org/rfc/rfc9116#name-canonical)

#### Expires
The date and time when the content of the security.txt file should be considered stale (so security researchers should then not trust it). Choose between a auto-generated dynamic date or set a date. 

[Documentation for the Expires directive](https://www.rfc-editor.org/rfc/rfc9116#section-2.5.5)

## Language
This app is available in English and Norwegian. Language is automatically detected by Enonic XP and applied accordingly.

## Links
[Read the entire spec and more at securitytext.org](https://securitytext.org/)

## Compatibility

| App version | XP version |
| ----------- | ---------- |
| 2.x.x | 7.10.0 |
| 1.0.x | 6.7.0 |

## Changelog

### 2.1.0
* Support for "Expires" field

### 2.0.1
* Enonic XP 7 compatibility

### 1.0.2

* Empty input fields will now no longer output "undefined".

### 1.0.1

* Fixed norwegian titles for e-mail-label in app config form.

### 1.0.0

* Initial version
