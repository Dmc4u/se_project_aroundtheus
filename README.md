# Around The U.S

A responsive web application that allows users to share and explore beautiful locations across the United States. Users can create, like, and delete image-based cards, update their profile information, and change their profile pictures.

## Features

- **User Authentication**: Fetch and display user details from the API.

- **Profile Management**: Users can edit their name, bio, and profile picture.

- **Card Management**:

  - Add new location cards with images and descriptions.

  - Like and unlike cards.

  - Delete personal cards with confirmation.

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

- **Form Validation**: Ensures valid input before submitting data.

- **API Integration**: All interactions persist using a RESTful API.

### Tech Stack

- HTML5, CSS3, JavaScript (ES6)

- Webpack for bundling and optimization

- Babel for ES6+ transpilation

- OOP (Object-Oriented Programming) for modular code structure

- Fetch API for API communication

- PostCSS & Autoprefixer for CSS processing

## Project Structure

## API Endpoints

The app communicates with the following API:

- Base URL: https://around-api.en.tripleten-services.com/v1

| Endpoint            | Method | Description            |
| ------------------- | ------ | ---------------------- |
| `/users/me`         | GET    | Fetch user info        |
| `/users/me`         | PATCH  | Update user info       |
| `//users/me/avatar` | PATCH  | Update profile picture |
| `/cards`            | GET    | Get all cards          |
| `/cards`            | POST   | Add a new card         |
| `/cards/:id`        | DELETE | Delete a card          |
| `/cards/:id/likes`  | PUT    | Like a card            |
| `/cards/:id/likes`  | DELETE | Unlike a card          |

# **UI Design**

The interface follows a clean and modern design inspired by BEM methodology for CSS structure.

# Future Enhancements

- Add user authentication for better security.

- Implement real-time updates for likes and comments.

- Allow users to edit existing cards instead of just deleting them.

# Author

Developed by Moses Ademola Aina, based on a project by **Elise Bouer**.

`*Enjoy sharing beautiful locations around the U.S.!*`

| [Link](https://www.loom.com/share/8c6adaa29c06488e9544bf6fe41ec490?sid=07ac017e-cf6e-457e-aea9-2d33f6c64e59) |

`**TripleTen**!`

Stay tuned!
