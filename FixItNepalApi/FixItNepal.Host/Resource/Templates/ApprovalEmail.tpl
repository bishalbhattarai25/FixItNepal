<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Approval Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 30px;
        }
        h2 {
            color: #333333;
            text-align: center;
        }
        p {
            color: #555555;
            line-height: 1.5;
            font-size: 16px;
        }
        .highlight {
            color: #007bff;
            font-weight: bold;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            margin-top: 20px;
            background-color: #007bff;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999999;
            text-align: center;
        }
    </style>
</head>
<body>
<div class="container">
    <p>Dear <span class="highlight">{{ name }}</span>,</p>
    
    <p>
    We are pleased to inform you that your registration as a 
    <span class="highlight">{{ role }}</span> 
    has been <strong>{{ status }}</strong>.
    </p>
    
    <p>
    <a href="{{ dashboard_url }}" class="button">Go to Dashboard</a>
    </p>
    
    <div class="footer">
        &copy; {{ year }} FixItNepal. All rights reserved.
    </div>
</div>
</body>
</html>