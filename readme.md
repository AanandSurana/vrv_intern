# VRV Security: Role-Based Access Control (RBAC) UI

## **Overview**

This project implements a **Role-Based Access Control (RBAC)** User Interface designed to manage users, roles, and permissions efficiently. The application provides a secure and user-friendly admin dashboard to assign roles, define permissions, and manage users dynamically.

---

## **Features**

### **User Management**
- View, add, edit, and delete users.
- Assign roles to users and toggle their status (Active/Inactive).

### **Role Management**
- Create, view, and edit roles.
- Assign permissions (e.g., Read, Write, Delete) to roles.

### **Dynamic Permissions**
- Add, modify, and view permissions for specific roles dynamically.
- User-friendly table views and modals for permissions management.

### **Mock API Integration**
- Simulated API calls for CRUD operations on users and roles.
- Responses mimic server-side functionality.

---

## **Tech Stack**
- **Frontend:** React.js, Tailwind CSS, Axios
- **Mock Backend:** Node.js, Express.js, mongoose, mongoDB
- **Icons & UI Enhancements:** React Icons
---

## **Installation & Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/AanandSurana/vrv_intern.git

cd api

npm i 

cd ..

cd vrv_rbac

npm i 

```

After that run the vrv_rbac using
```bash

npm start

```

And the backend api using 

```bash
node index.js
```


