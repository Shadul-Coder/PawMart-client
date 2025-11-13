# 🐾 PawMart – Pet Adoption & Supply Portal

**Live Site URL:** [https://shadul-pawmart.netlify.app/]  

---

## 🐕 Project Overview

**PawMart** is a community-driven platform where pet owners, breeders, and shops can list pets for adoption or sell pet-related products. Buyers and adopters can browse, contact, and order directly through a seamless, pet-friendly interface.

---

## 🎯 Project Purpose

This full-stack MERN application combines **React frontend** with **Node.js/Express backend** and **MongoDB database** to create a comprehensive pet adoption and supply marketplace. The project demonstrates modern web development practices including authentication, CRUD operations, and responsive design.

---

## 🧩 Core Features

### 🔹 Authentication & User Management
- **Firebase Authentication** (Email/Password + Google Login)
- **Protected Routes** for authenticated users
- **User Profile Management** with photoURL support
- **Password Validation** (6+ chars, uppercase, lowercase)

### 🔹 Listing Management
- **Add New Listings** (Pets, Food, Accessories, Care Products)
- **Category-based Filtering** (Pets, Food, Accessories, Care Products)
- **My Listings Page** - View, edit, and delete user's own listings
- **Image URL Support** for product/pet photos

### 🔹 Order & Adoption System
- **Adopt/Order Now** functionality with modal form
- **My Orders Page** with complete order history
- **PDF Report Generation** for order downloads
- **Auto-filled Order Forms** with user and product data

### 🔹 Home Page Sections
1. **Banner Carousel** - 3+ meaningful pet adoption images
2. **Category Section** - 4 category cards with navigation
3. **Recent Listings** - Latest 6 listings from database
4. **Why Adopt from PawMart?** - Adoption awareness content
5. **Meet Our Pet Heroes** - Adopter and caregiver profiles

### 🔹 Advanced Features
- **Dark/Light Mode Toggle** using Tailwind CSS
- **Search Functionality** by product name
- **Animations** with Framer Motion and React Simple Typewriter
- **React Tooltip** for enhanced user experience

---

## 🔒 Protected Routes

- **/add-listing**
- **/my-listings**
- **/my-orders**
- **/listing-details/:id**

Unauthenticated users are redirected to login with return URL support.

---

## ⚙️ Technologies & Tools Used

### 🖥️ Frontend
- **React 19** with **React Router v7**
- **Tailwind CSS** with **DaisyUI** components
- **Firebase Authentication**
- **Swiper.js** for carousel/slider
- **Framer Motion** for animations
- **React Simple Typewriter** for typing effects

### 🗄️ Backend
- **Node.js** with **Express.js**
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests

### 📊 Utilities & Libraries
- **jsPDF & jsPDF-AutoTable** for PDF report generation
- **React Hot Toast** for notifications
- **Axios** for API calls
- **React Icons** for icon library

---

## 📦 NPM Packages Used

| Package | Purpose |
|----------|----------|
| `react` & `react-dom` | Core React library |
| `react-router` | Single Page Application routing |
| `firebase` | Authentication services |
| `axios` | HTTP client for API calls |
| `tailwindcss` + `daisyui` | Styling and UI components |
| `jspdf` + `jspdf-autotable` | PDF generation for order reports |
| `motion` (Framer Motion) | Smooth animations and transitions |
| `react-simple-typewriter` | Typing animation effects |
| `react-hot-toast` | User notification system |
| `react-icons` | Comprehensive icon library |
| `swiper` | Banner carousel and sliders |
| `@tailwindcss/vite` | Tailwind CSS integration |

---

## 🗃️ Database Structure (MongoDB)

### Listings Collection
```json
{
  "name": "String",
  "category": "Pets/Food/Accessories/Care Products",
  "price": "Number",
  "location": "String",
  "description": "String",
  "image": "URL String",
  "email": "String",
  "date": "Date"
}
```

### Orders Collection
```json
{
  "productId": "String",
  "productName": "String",
  "buyerName": "String",
  "email": "String",
  "quantity": "Number",
  "price": "Number",
  "address": "String",
  "phone": "String",
  "date": "Date",
  "additionalNotes": "String"
}
```

---

## 🚀 Deployment

- **Client:** Netlify/Firebase/Surge
- **Server:** Vercel
- **Database:** MongoDB Atlas
- **Authentication:** Firebase Auth

---

*Replace `[Insert Live URL Here]` with your actual deployed client URL when ready.*
