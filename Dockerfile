FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY Backend/Pandemitrac.Server/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY ./Backend/Pandemitrac.Server ./
RUN dotnet publish -c Release -o out

# Build Frontend
FROM node:13.0.1-stretch AS frontend-build
WORKDIR /frontend
COPY ./pandemitrack.ui .
RUN npm install
RUN npm run build

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
COPY --from=frontend-build ./pandemitrack.ui ./wwwroot
ENTRYPOINT ["dotnet", "Pandemitrac.Server.dll"]