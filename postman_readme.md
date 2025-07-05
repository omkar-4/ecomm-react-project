## Signup

POST http://localhost:3000/user/signup

Body > x-www-form-urlencoded

<!-- send this in key-value, no : -->
username: Sarthak
email: s@s.com
password: 1234

# Login

POSt http://localhost:3000/user/login

Body > x-www-form-urlencoded

<!-- send this in key-value, no : -->
email: s@s.com
password: 1234

# Get UserProfile

GET http://localhost:3000/user/profile

Headers
<!-- send this in key-value, no : -->
<!-- carefully add a space " " after Bearer then write token -->
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODY1NjVjNzEzMDhjZjUwMmFmZTNjZTUiLCJpYXQiOjE3NTE0NzU2NTUsImV4cCI6MTc1MTQ3OTI1NX0.2xnnpanMeOB3WpwDbwt6JXmZiovb9x71xLYJDHuQaSc


# Something
