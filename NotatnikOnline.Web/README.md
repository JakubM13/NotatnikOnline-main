
# NotatnikOnline - System zarządzania notatkami

## Wymagania systemowe

- .NET 8 SDK
- Node.js i npm (dla frontendu)
- Visual Studio 2022 lub Visual Studio Code
- SQLite (baza danych)

## Struktura projektu

- `NotatnikOnline.Web` - Frontend (React)
- `NotatnikOnline.API` - Backend (ASP.NET Core)

## Jak uruchomić projekt

### Backend (ASP.NET Core API)

1. Przejdź do katalogu API:
```sh
cd NotatnikOnline.API
```

2. Uruchom migracje bazy danych:
```sh
dotnet ef database update
```

3. Uruchom API:
```sh
dotnet run
```

API będzie dostępne pod adresem: https://localhost:5001

### Frontend (React)

1. Przejdź do katalogu Web:
```sh
cd NotatnikOnline.Web
```

2. Zainstaluj zależności:
```sh
npm install
```

3. Uruchom aplikację:
```sh
npm run dev
```

Frontend będzie dostępny pod adresem: http://localhost:8080

## Technologie

### Backend
- ASP.NET Core 8
- Entity Framework Core
- SQLite
- AutoMapper
- Identity dla uwierzytelniania

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (komponenty UI)
- React Router
- React Query

