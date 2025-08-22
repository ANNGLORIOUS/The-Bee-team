# The Bee Team - Backend API

## Features
- RESTful API endpoints for managing the library system
- User authentication using **Laravel Sanctum**
- Secure API routes
- Detailed API documentation using **Laravel Scramble**

---

## Requirements
- PHP >= 8.1
- Composer
- MySQL 
- Laravel >= 10
 
 ---

## Installation
1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/The-Bee-team.git
cd The-Bee-team/Backend/librarian
```
2. **Install PHP dependencies:**
```bash
composer install
```

3. **Copy the environment file and configure:**
```bash
cp .env.example .env
```

4. **Generate the application key:**
```bash
php artisan key:generate
```

5. **Run migrations and seed database**
```bash
php artisan migrate --seed
```

---

## Running the project
```bash
php artisan serve
```
---

## Accessing the api documentation
```bash
localhost/docs/api
```
