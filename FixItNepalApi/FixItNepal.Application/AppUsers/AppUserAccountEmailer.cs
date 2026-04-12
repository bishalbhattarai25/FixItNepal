using FixItNepal.Application.Contracts.AppUsers;
using FixItNepal.Application.Contracts.Customs.Email;
using FixItNepal.Application.Customs.Email;
using FixItNepal.Domain.Shared.BackgroundJobs;
using Hangfire;
using Microsoft.AspNetCore.Hosting;
using Scriban;

namespace FixItNepal.Application.AppUsers;

[Queue(BackgroundJobPriority.High)]
public class AppUserAccountEmailer:IAppUserEmailer
{
    private readonly string _templateRoot;
    private readonly IEmailerService _emailSender;

    public AppUserAccountEmailer(string templateRoot, IEmailerService emailerService)
    {
        _emailSender = emailerService;
        _templateRoot = templateRoot;
    }

    private async Task<string> RenderTemplateAsync(string templateName, object model)
    {
        var path = Path.Combine(_templateRoot, templateName);

        if (!File.Exists(path))
            throw new FileNotFoundException($"Email template not found: {path}");

        var templateContent = await File.ReadAllTextAsync(path);
        var template = Template.Parse(templateContent);

        return await template.RenderAsync(model);
    }
    public async Task SendApprovalEmailAsync(string email, string name, string role, string status)
    {
        
        var html = await RenderTemplateAsync("ApprovalEmail.tpl", new
        {
            name,
            role,
            status,
            dashboard_url = "https://fix-it-nepal.vercel.app/dashboard",
            year = DateTime.UtcNow.Year
        });
        
        await _emailSender.SendEmailAsync(
            email,
            "Approval Notification",
            html
        );
    }
    
    
}