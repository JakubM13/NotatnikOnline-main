
# NotatnikOnline - Dokumentacja

## Spis treści
1. Opis aplikacji
2. Funkcjonalności
3. Technologie
4. Architektura
5. Instrukcja użytkowania
6. Instalacja i uruchomienie
7. Bezpieczeństwo
8. Wsparcie

## Opis aplikacji
NotatnikOnline to aplikacja webowa służąca do zarządzania notatkami. Umożliwia użytkownikom tworzenie, edycję i organizację notatek w bezpiecznym, internetowym środowisku. Aplikacja obsługuje system kont użytkowników i pozwala na udostępnianie wybranych notatek publicznie.

## Funkcjonalności

### System użytkowników
- Rejestracja nowych użytkowników
- Logowanie do istniejącego konta
- Wylogowywanie
- Zarządzanie profilem użytkownika

### Zarządzanie notatkami
- Tworzenie nowych notatek
- Edycja istniejących notatek
- Usuwanie notatek
- Ustawianie statusu notatki (publiczna/prywatna)
- Przeglądanie publicznych notatek innych użytkowników

### Interfejs użytkownika
- Responsywny design dostosowany do różnych urządzeń
- Intuicyjny system nawigacji
- Przejrzysty podgląd listy notatek
- System powiadomień o wykonanych akcjach

## Technologie

### Frontend
- React 18
- TypeScript
- Vite (system budowania)
- Tailwind CSS (stylowanie)
- shadcn/ui (komponenty interfejsu)
- React Router (nawigacja)
- React Query (zarządzanie stanem i zapytaniami)

### Backend
- ASP.NET Core 8
- Entity Framework Core
- SQLite (baza danych)
- AutoMapper
- ASP.NET Core Identity (autentykacja)

## Architektura

### Struktura projektu
```
NotatnikOnline/
├── NotatnikOnline.API/     # Backend ASP.NET Core
│   ├── Controllers/        # Kontrolery API
│   ├── Models/            # Modele danych
│   ├── Services/          # Logika biznesowa
│   └── Data/              # Kontekst bazy danych
│
└── NotatnikOnline.Web/     # Frontend React
    ├── src/
    │   ├── components/    # Komponenty React
    │   ├── pages/        # Komponenty stron
    │   ├── lib/          # Biblioteki i utilities
    │   └── types/        # Definicje TypeScript
    └── public/           # Statyczne zasoby
```

### Główne komponenty
1. Layout.tsx - Główny układ aplikacji
2. Auth.tsx - System autentykacji
3. Index.tsx - Strona główna z listą notatek
4. PublicNotes.tsx - Strona z publicznymi notatkami

## Instrukcja użytkowania

### Rejestracja i logowanie
1. Kliknij przycisk "Zarejestruj się" na stronie głównej
2. Wypełnij formularz rejestracji podając:
   - Adres email
   - Hasło
   - Potwierdzenie hasła
3. Po rejestracji możesz zalogować się używając emaila i hasła

### Zarządzanie notatkami
1. Tworzenie notatki:
   - Wypełnij pole tytułu
   - Wprowadź treść notatki
   - Opcjonalnie ustaw notatkę jako publiczną
   - Kliknij "Utwórz notatkę"

2. Edycja notatki:
   - Znajdź notatkę na liście
   - Kliknij ikonę edycji
   - Wprowadź zmiany
   - Zapisz zmiany

3. Usuwanie notatki:
   - Znajdź notatkę na liście
   - Kliknij ikonę kosza
   - Potwierdź usunięcie

### Przeglądanie notatek publicznych
1. Przejdź do zakładki "Publiczne Notatki"
2. Przeglądaj notatki udostępnione przez innych użytkowników

## Instalacja i uruchomienie

### Wymagania systemowe
- .NET 8 SDK
- Node.js (wersja 14 lub wyższa)
- npm lub yarn
- Visual Studio 2022 lub Visual Studio Code
- SQLite

### Kroki instalacji

#### Backend (ASP.NET Core API)
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

#### Frontend (React)
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

## Bezpieczeństwo
- Wszystkie hasła są bezpiecznie hashowane przez ASP.NET Core Identity
- Połączenie z bazą danych jest szyfrowane
- Prywatne notatki są dostępne tylko dla ich właścicieli
- Implementacja autoryzacji na poziomie kontrolerów API
- Bezpieczne przechowywanie tokenów JWT
- Walidacja danych wejściowych na poziomie API i interfejsu użytkownika

## Wsparcie
W razie problemów lub pytań:
1. Sprawdź sekcję FAQ w dokumentacji
2. Skontaktuj się z zespołem wsparcia poprzez system zgłoszeń
3. Zgłoś problem w systemie śledzenia błędów na GitHub
