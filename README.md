# Wanderlust

Wanderlust is a fully backend web application designed to help users explore hotels, leave reviews, and manage hotel listings. It includes a secure authentication system and supports all CRUD (Create, Read, Update, Delete) operations for hotel management.

## Features

- **User Authentication**:
  - Secure login and signup functionality for users.
  - Protects sensitive user information using secure authentication techniques.

- **Hotel Listings**:
  - View a list of hotels with details.
  - Users can explore available hotels effortlessly.

- **Reviews**:
  - Leave reviews for hotels and share feedback with the community.

- **Hotel Management**:
  - Authenticated users can:
    - Create new hotel listings.
    - Edit existing hotel details.
    - Delete hotel listings.

- **CRUD Operations**:
  - Full Create, Read, Update, and Delete operations for hotels and reviews.

## Technologies Used

### Backend
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.

### Database
- **MongoDB**: NoSQL database for storing application data.

### Templating
- **EJS (Embedded JavaScript)**: For dynamic HTML rendering.

### Authentication
- **Passport.js**: Authentication middleware with local strategy.
- **Passport-Local**: For local user authentication.

### Image Storage
- **Cloudinary**: For storing and managing hotel images.

### Other Dependencies
- **express-session**: Session management.
- **connect-flash**: Flash messages for feedback.
- **method-override**: HTTP method overrides for form submissions.
- **multer**: File uploading.
- **multer-storage-cloudinary**: Cloudinary integration for multer.
- **mongoose**: MongoDB object modeling.
- **joi**: Schema validation for user input.
- **dotenv**: Environment variable management.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SaiKrishna680/Wanderlust-.git
   cd Wanderlust-
