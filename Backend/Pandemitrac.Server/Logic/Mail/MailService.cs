using System;
using System.IO;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using Pandemitrac.Server.Models.Core;
using Pandemitrac.Server.Models.Input;
using Scriban;

namespace Pandemitrac.Server.Logic.Mail
{
    /// <summary>
    /// Stellt Funktionalitäten zum Versenden von Emails zur Verfügung.
    /// </summary>
    public sealed class MailService : IAsyncDisposable
    {
        private IConfiguration Configuration { get; }

        private ISmtpClient SmtpClient { get; }

        public MailService(IConfiguration configuration, ISmtpClient smtpClient)
        {
            Configuration = configuration;
            SmtpClient = smtpClient;
        }

        /// <summary>
        /// Sendet eine Statusbenachrichtigung an einen Besucher, der einem Fall zugeordnet ist.
        /// </summary>
        /// <param name="case">Verweis auf den <see cref="Case"/>, dem der Besucher zugeordnet ist.</param>
        /// <param name="visitor">Verweis auf den <see cref="Visitor"/>, an dem die Nachricht gesendet wird.</param>
        /// <returns>Informationen zum asynchronen Vorgang.</returns>
        public async Task SendStatusMail(Case @case, Visitor visitor)
        {
            if (string.IsNullOrEmpty(visitor.Mail))
                throw new InvalidOperationException("Dieser Besucher hat keine Emailadresse angegeben.");
            var templateText = await File.ReadAllTextAsync("/Views/statusMail.sbnhtml");
            var template = Template.Parse(templateText);
            var content = await template.RenderAsync(new { Case = @case, Visitor = visitor });
            await SendMail(visitor.Mail, "Statusbenachrichtigung", content);
        }

        /// <summary>
        /// Sendet eine Nachricht mittels des <see cref="SmtpClient"/>.
        /// </summary>
        /// <param name="receiver">Empfänger-Emailadresse.</param>
        /// <param name="subject">Betreff.</param>
        /// <param name="content">HTML-Inhalt.</param>
        /// <returns>Informationen zum asynchronen Vorgang.</returns>
        private async Task SendMail(string receiver, string subject, string content)
        {
            var mailSettings = Configuration.GetSection("MailSettings");
            var sender = mailSettings.GetValue<string>("Sender");
            await EnsureClientConnected(mailSettings);
            await SmtpClient.SendAsync(CreateMimeMessage(sender, receiver, subject, content));
        }

        /// <summary>
        /// Stellt sicher, dass der <see cref="SmtpClient"/> verbunden ist.
        /// </summary>
        /// <param name="mailSettings">Verweis auf den Settings-Bereich in dem die Smtp-Einstellungen enthalten sind.</param>
        /// <returns>Informationen zum asynchronen Vorgang.</returns>
        private async Task EnsureClientConnected(IConfigurationSection mailSettings)
        {
            if (!SmtpClient.IsConnected)
            {
                var host = mailSettings.GetValue<string>("SmtpServer");
                var port = mailSettings.GetValue<short>("SmtpPort");
                var username = mailSettings.GetValue<string>("SmtpUsername");
                var password = mailSettings.GetValue<string>("SmtpPassword");
                await SmtpClient.ConnectAsync(host, port);
                await SmtpClient.AuthenticateAsync(username, password);
            }
        }

        /// <summary>
        /// Fabrikmethode zum Erzeugen einer <see cref="MimeMessage"/>-Instanz für die Status-Mail.
        /// </summary>
        /// <param name="sender">Sender-Emailadresse.</param>
        /// <param name="receiver">Empfänger-Emailadresse.</param>
        /// <param name="subject">Betreff.</param>
        /// <param name="content">HTML-Inhalt.</param>
        /// <returns>Erzeugte <see cref="MimeMessage"/>-Instanz.</returns>
        private MimeMessage CreateMimeMessage(string sender, string receiver, string subject, string content)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(sender));
            message.To.Add(new MailboxAddress(receiver));
            message.Subject = subject;
            message.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = content };
            return message;
        }

        #region IAsyncDisosable support

        public async ValueTask DisposeAsync()
        {
            await SmtpClient.DisconnectAsync(true);
        }

        #endregion
    }
}