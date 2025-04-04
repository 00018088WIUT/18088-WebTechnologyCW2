# Language Learning App

A web application for managing vocabulary and language learning materials. This application allows users to create, read, update, and delete vocabulary entries with additional features like categorization, difficulty levels, and cultural notes.

## Features

- Create, read, update, and delete vocabulary entries
- Categorize words by language and topic
- Add example sentences and cultural notes
- Track difficulty levels
- Include pronunciation guides and memory tips
- Responsive design for all devices
- Dark mode support
- Search functionality
- Flashcard view

## Project Structure

```
language-learning-app/
├── app.js                 # Main application file
├── package.json           # Project configuration and dependencies
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── models/               # Database models
│   └── Vocabulary.js     # Vocabulary model
├── routes/               # Route definitions
│   └── vocabulary.js     # Vocabulary routes
├── views/                # EJS templates
│   ├── layout.ejs        # Main layout template
│   └── vocabulary/       # Vocabulary-related views
│       ├── index.ejs     # List all vocabulary
│       ├── new.ejs       # Create new vocabulary
│       └── edit.ejs      # Edit vocabulary
├── public/               # Static files
│   ├── images/          # Image assets
│   ├── javascripts/     # Client-side JavaScript
│   │   └── main.js      # Main JavaScript file
│   └── styles/          # CSS styles
│       └── style.css    # Main stylesheet
└── README.md            # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/language-learning-app.git
   cd language-learning-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/language-learning-app
   SESSION_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Dependencies

- express: Web framework
- ejs: Template engine
- mongoose: MongoDB ODM
- dotenv: Environment variable management
- express-validator: Form validation
- bcrypt: Password hashing
- express-session: Session management

## API Endpoints

- GET `/vocabulary` - List all vocabulary items
- GET `/vocabulary/new` - Show form to create new vocabulary
- POST `/vocabulary` - Create new vocabulary
- GET `/vocabulary/:id/edit` - Show form to edit vocabulary
- PUT `/vocabulary/:id` - Update vocabulary
- DELETE `/vocabulary/:id` - Delete vocabulary

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This web application was created to fulfill Web Technology module's requirements and does not represent an actual company or service.
- Bootstrap for the UI components
- MongoDB for the database
- Express.js for the web framework