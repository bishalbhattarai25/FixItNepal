# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution file
COPY *.sln ./

# Copy all project files
COPY FixItNepal.Application.Contracts/*.csproj FixItNepal.Application.Contracts/
COPY FixItNepal.Application/*.csproj FixItNepal.Application/
COPY FixItNepal.Domain.Shared/*.csproj FixItNepal.Domain.Shared/
COPY FixItNepal.Domain/*.csproj FixItNepal.Domain/
COPY FixItNepal.EntityFrameworkCore/*.csproj FixItNepal.EntityFrameworkCore/
COPY FixItNepal.Host/*.csproj FixItNepal.Host/

# Restore dependencies
RUN dotnet restore FixItNepalApi.slnx

# Copy everything else
COPY . .

# Publish only Host project
RUN dotnet publish FixItNepal.Host/FixItNepal.Host.csproj -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Expose port for Render
EXPOSE 10000

ENV ASPNETCORE_URLS=http://0.0.0.0:10000

ENTRYPOINT ["dotnet", "FixItNepal.Host.dll"]