# Busy Buy

Busy Buy is an e-commerce web application built with React. It allows users to sign up, sign in, browse products, add them to the cart, and place the order with the items in the cart.

## Features

- User authentication (Sign Up, Sign In, Logout) using Firebase
- Product browsing and filtering
- Shopping cart functionality
- Order history tracking feature

## Project Structure

The project is organized into several components, pages, and context files.

## src

- Assets
- Components
- Context
- Utils
- Pages
- Config

## Getting Started

## Firestore Database Structure

## For authentication I am using Firebase

#### collections:

- Producs: Store products information.
- cart: Store cart items of all users.
- orders: store orders of all users.

## Getting Started

To get a local copy of the project and run it on your machine, follow these steps:

### Prerequisites

- Node.js and npm/yarn installed on your machine
- Firebase project and credentials (Firestore setup)

### Installation

1. Clone the repository:

- git clone https://github.com/ammarayaz/E-ComBusyBuy1.git

2. Navigate to the project directory:

- cd BusyBuy1

3. Install dependencies:

- npm install

4. Set up Firebase:

- Create a Firebase project and set up Firestore.
- Obtain Firebase configuration credentials.
- Add Firebase config in firebaseConfig.js or similar, if not already present.

### Usage

1. Start the development server:

- npm start

2. Open the app in your browser:

- http://localhost:3000
