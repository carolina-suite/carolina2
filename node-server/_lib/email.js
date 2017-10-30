
var config = require('../site/config');

class EmailManager {

  constructor(from_name, from_email) {
    this.from_name = from_name;
    this.from_email = from_email;
  }

  sendEmail(to, subject, text) {}
}

class ConsoleLogEmailManager extends EmailManager {
  sendEmail(to, subject, text) {
    console.log();
    console.log("EMAIL");
    console.log(`From: ${this.from_name} <${this.from_email}>`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log();
    console.log(text);
    console.log();
  }
}
class MailgunEmailManager extends EmailManager {

  constructor(from_name, from_email) {

    super(from_name, from_email);

    this.mailgun = require('mailgun-js')({
      domain: config.site.mailgunConfiguration.domain,
      apiKey: config.site.mailgunConfiguration.apiKey
    });
  }

  sendEmail(to, subject, text) {
    this.mailgun.messages().send({
      from: `${this.from_name} <${this.from_email}>`,
      to: to,
      subject: subject,
      text: text
    }, function (error, body) { console.log(body); });
  }
}

emailManager = new ConsoleLogEmailManager("Carolina Webmaster", "carolina@mail.example.com");
if (config.site.email) emailManager = new MailgunEmailManager(config.site.mailgunConfiguration.fromName, config.site.mailgunConfiguration.fromEmail);
module.exports = emailManager;
