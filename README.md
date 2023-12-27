# iStay - Accommodation Booking Platform

iStay is an accommodation booking platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It facilitates users in finding and booking accommodations at various locations.

## Features

- **User Authentication:** User registration and login using JWT for secure access.
- **Accommodation Search:** Search for accommodations based on location, dates, and preferences.
- **Accommodation Details:** View detailed information, images, and reviews for each accommodation.
- **Booking Management:** Reserve accommodations, manage bookings, and view booking history.
- **Admin Dashboard:** Admin access to manage accommodations, users, and bookings.

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB (with Mongoose)
- **Frontend:** React.js (with React Router), Bootstrap for styling
- **Authentication:** JSON Web Tokens (JWT)
- **Other Libraries:** Axios, Formik (for form handling), etc.

## File Structure
```
istay/
│
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ ├── index.js
│ │ └── ...
│ ├── package.json
│ └── ...
│
├── config/
│ ├── keys.js
│ └── ...
│
├── controllers/
│ ├── authController.js
│ ├── bookingController.js
│ ├── accommodationController.js
│ └── adminController.js
│
├── models/
│ ├── User.js
│ ├── Accommodation.js
│ ├── Booking.js
│ └── ...
│
├── routes/
│ ├── authRoutes.js
│ ├── bookingRoutes.js
│ ├── accommodationRoutes.js
│ └── adminRoutes.js
│
├── app.js
├── package.json
└── ...
```

bash


## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Athulraj10/istay.git
   cd istay

    Install dependencies:

    bash

npm install
cd client
npm install

Set up environment variables:

Create a .env file in the root directory with:

env
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Run the application:
bash

    npm run dev

    Access the application in your browser at: http://localhost:3000

Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to create a pull request or raise an issue on the repository.
