using FixItNepal.Application.Contracts.Customs.Email;
using FixItNepal.Domain.Customs.Emailer;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;

namespace FixItNepal.Application.Customs.Email;

public class EmailSender:IEmailerService
{
    private readonly SmtpSettings _smtpSettings;
    private readonly ILogger<EmailSender> _logger;
    
    public EmailSender(IOptions<SmtpSettings> smtpSettings, ILogger<EmailSender> logger)
    {
        _smtpSettings = smtpSettings.Value;
        _logger = logger;
    }

    public async Task SendEmailAsync(string email, string subject, string body)
    {
        _logger.LogInformation($"Sending email to {email}.");

        try
        {
            var message = new MimeMessage();

            message.From.Add(new MailboxAddress(_smtpSettings.FromName, _smtpSettings.FromEmail));
            message.To.Add(new MailboxAddress(email, email));
            message.Subject = subject;
            message.Body = new TextPart("html")
            {
                Text = body
            };

            using (var client = new SmtpClient())
            {
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                await client.ConnectAsync(_smtpSettings.Host);
                await client.AuthenticateAsync(_smtpSettings.Username, _smtpSettings.Password);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }

            _logger.LogInformation($"Email sent to {email}.");
        }
        catch (Exception e)
        {
            _logger.LogError("Error sending email");
            Console.WriteLine(e);
            throw new InvalidOperationException(e.Message);
        }
    }
}