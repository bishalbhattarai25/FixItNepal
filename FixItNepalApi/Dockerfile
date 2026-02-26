# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy everything else
COPY . .

# Restore dependencies
RUN dotnet restore FixItNepalApi.slnx

# Publish only Host project
RUN dotnet publish FixItNepal.Host/FixItNepal.Host.csproj -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .

# Expose port for Render
EXPOSE 10000

ENV ASPNETCORE_URLS=http://0.0.0.0:10000

ENTRYPOINT ["dotnet", "FixItNepal.Host.dll"]