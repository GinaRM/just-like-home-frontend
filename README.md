# Just Like Home - Frontend

## Description

"Just Like Home" is a responsive web application designed for booking houses. This project showcases a seamless integration between frontend and backend, featuring a user-friendly interface and robust functionalities for handling reservations, user management, and administrative tasks.

### Key Features
- Responsive Design: Ensures optimal user experience across all devices.
- Authentication & Authorization: Implements user registration, JWT-based authentication, and role-based authorization with CORS support.
- CRUD Operations: Enables users and administrators to perform Create, Read, Update, and Delete operations for reservations, houses, and user accounts.
- Admin Dashboard: A dedicated dashboard for product and reservation management.
- Data Handling: Processes nested JSON data for batch reservations and inserts data into an SQL database.
- API Integration: Leverages a containerized API environment hosted on AWS.

## Technologies Used
- Frontend: React, HTML, CSS, JavaScript
- Backend: Java, Spring Boot
- Database: SQL
- Other Tools: Swagger for API documentation, AWS for deployment

## Installation

1. Clone the repository:
   git clone https://github.com/GinaRM/just-like-home-frontend.git

2. Navigate to the project directory:
   cd just-like-home-frontend

3. Install dependencies:
   npm install

## Running the Application

1. Start the development server:
   npm start

2. Open your browser and navigate to:
   http://localhost:3000

## Project Structure

- `src/`: Contains the main source code, including components, services, and styles.
- `public/`: Includes static files such as `index.html`.
- `build/`: Contains the production-ready build of the application.

## Deployment

The project is containerized and deployed using AWS. Ensure you have the necessary environment variables configured for production deployment.


## Author

Gina Rodríguez Martínez
GitHub: https://github.com/GinaRM
LinkedIn: https://www.linkedin.com/in/ginarodriguez-desarrollador-backend/

---

Feel free to contribute or raise issues in this repository!
