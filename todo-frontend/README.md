#### Operation Verification Steps

1. **Environment Setup**
    - Install Node.js (v16 or higher).
    - Run `npm install` in both `todo-frontend/todo-frontend` and `/todo-backend` directories.
    - Configure `src/app.module.ts` file in the `/todo-backend` folder:
      ```
      DB_HOST=localhost
      DB_USER=username
      DB_PASSWORD=password
      ```

2. **Running the Application**
    - Start the backend with `npm start` from the `backend` folder.
    - Start the frontend with `npm start` from the `frontend` folder.
    - Open `http://localhost:3000` in the browser.
    - Backend is configured to run on `http://localhost:3000`

3. **User Registration**
    - Site is only accessible to registered user. So for the 
    - Navigate to `/register`.
    - Create a new user with:
        - Username: `Test User`
        - Email: `test@example.com`
        - Password: `Test1234!`
    - Verify user is saved in the database under the `users` table.

4. **Login Functionality**
    - Use the email `test@example.com` and password `Test1234!` to log in.
    - Verify a user session is maintained for 24 hours.

5. **CRUD Operations**
    - Create, edit, and delete TODO items.
    - Verify that:
        - Created items appear in the list.
        - Edited items reflect updates in the UI and database.
        - Deleted items are removed from both the UI and database.

6. **Testing Filters**
    - Apply tag and status filters.
    - Verify that the filtered results are accurate.

7. **Pagination**
    - Add more than 10 TODO items.
    - Verify pagination works by navigating through pages.

8. **Additional Tests**
    - Run all automated tests with `npm run test`.
    - Confirm all tests pass successfully.