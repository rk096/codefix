# CodeFix

Welcome to CodeFix, your one-stop platform for all programming-related concerns. Below is an overview of the modules and features of the CodeFix project:

## Modules

### 1. User Module
- Defines user information including email, password, username, and bio.
- Enforces rules for signup, ensuring required fields are provided.
- Allows users to login by checking credentials against the user table.

### 2. Question Module
- Fields for title, body, tags, creation date, and references to users who interacted with the question.
- Establishes relationships with the "User" model for users who posted, upvoted, or downvoted the question.

### 3. Answer Module
- Includes fields for body, creation timestamp, and references to users and questions.
- Ensures mandatory fields for substantive content.
- Establishes relationships with the "User" and "Question" models.

### 4. Blog Module
- Fields for title, body, tags, creation date, view count, and references to users who interacted with the blog.
- Establishes relationships with the "User" model for users who posted, upvoted, or downvoted the blog.

### 5. Comment Module
- Consists of fields for comment body, creation timestamp, and references to the user who posted the comment.
- Can reference either a question or a blog post for association with specific content items.

## Features

- One platform for all programming-related concerns.
- Users can manage their questions, answers, and blogs.
- Easily track contribution activity.
- Update profile information effortlessly.

## Getting Started

To start using CodeFix, follow these steps:

## Getting Started with CodeFix (MERN Stack)

To start using CodeFix, a MERN (MongoDB, Express.js, React.js, Node.js) stack application, follow these steps:

1. **Clone Repository**: Clone this repository to your local machine.
   git clone <repository_url>
   
2. **Set Up Database**: Set up your MongoDB database according to the provided schema. You can use tools like MongoDB Compass or the mongo shell to create your database and collections.

3. **Configure Database Connection**: Navigate to the server directory (cd server) and configure your database connection settings in the .env file. Ensure you have the           correct MongoDB URI specified.

4. **Install Dependencies**: Navigate to the root directory of the project and install the necessary dependencies for both the server and the client.
   npm install

5. **Start the Server with Nodemon**: In the server directory, start the Node.js server using nodemon for automatic server restarts during development.

6. **Start the Client**: In a separate terminal, navigate to the client directory and start the React.js client.

Access CodeFix: Open your web browser and navigate to http://localhost:3000 to access the CodeFix application. You should now be able to use the application to manage questions, answers, blogs, and comments.

## Contributing

We welcome contributions from the community to improve CodeFix. If you'd like to contribute, please follow these guidelines:
- Fork the repository and create a new branch for your feature or bug fix.
- Commit your changes with clear and descriptive messages.
- Submit a pull request detailing the changes you've made and why they're beneficial.


