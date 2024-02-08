# Sistema de Gestión de Clínica

Este proyecto es un sistema de gestión de clínica que permite a los usuarios realizar diversas acciones relacionadas con la reserva de turnos, gestión de doctores y especialidades, así como administrar la información del usuario. Está desarrollado principalmente en ReactJS para el frontend, con algunas bibliotecas adicionales para funcionalidades específicas.

## Características

- **Inicio de Sesión y Registro de Usuario**: Los usuarios pueden iniciar sesión en el sistema utilizando sus credenciales existentes o registrarse como nuevos usuarios.

- **Recuperación de Contraseña**: Se proporciona la funcionalidad de recuperación de contraseña para que los usuarios puedan restablecer sus contraseñas en caso de olvido.

- **Reserva de Turnos**: Los pacientes pueden reservar turnos disponibles con cualquier doctor y tienen la capacidad de cancelarlos posteriormente si es necesario.

- **Administración de Doctores y Especialidades**: Los administradores pueden agregar, modificar y eliminar información sobre doctores y especialidades médicas disponibles en la clínica.

- **Administración de Turnos**: Los administradores pueden ver todos los turnos disponibles, así como los turnos reservados por los pacientes. También tienen la capacidad de agregar nuevos turnos y modificar la información existente.

- **Gestión de Roles**: Se implementa un sistema de roles que permite mostrar funcionalidades específicas según el tipo de usuario (paciente o administrador).

## Tecnologías Utilizadas

# Frontend

- **Font Awesome Icon**: Se utiliza para la incorporación de iconos en la interfaz de usuario.

- **MaterialUI**: Se emplea para utilizar componentes predefinidos y mejorar la apariencia de la aplicación.

- **Framer Motion**: Se utiliza para agregar animaciones a elementos de la interfaz de usuario y mejorar la experiencia del usuario.

- **JS-Cookies**: Se utiliza para gestionar el token y el rol del usuario, permitiendo realizar condicionales y mostrar contenido específico según el rol del usuario.

- **React-Router-Dom**: Se utiliza para generar rutas dinámicas con IDs para la navegación dentro de la aplicación.

- **Redux Toolkit**: Se utiliza para administrar el estado global de la aplicación, lo que facilita el intercambio de datos entre componentes y mejora la eficiencia.

- **React-Spinners**: Se utiliza para mostrar un spinner mientras se carga la información de los endpoints, mejorando la experiencia del usuario durante la espera.

- **React-Toastify**: Se utiliza para mostrar mensajes emergentes y notificaciones en la aplicación, lo que ayuda a informar al usuario sobre acciones realizadas con éxito o errores.

# Backend

En el backend de este proyecto se utilizan varias tecnologías y bibliotecas para facilitar el desarrollo y el funcionamiento del servidor. A continuación, se detallan algunas de estas tecnologías:

- **Bcrypt**: Esta biblioteca se utiliza para encriptar las contraseñas de los usuarios que se registran en el sistema. Esto proporciona una capa adicional de seguridad al almacenar las contraseñas en la base de datos.

- **Cors**: Se utiliza para gestionar el problema de CORS (Cross-Origin Resource Sharing) al permitir conexiones entre el backend y el frontend desde diferentes orígenes. Esto es esencial para evitar errores de seguridad y permitir una comunicación fluida entre el cliente y el servidor.

- **Express**: Este es un framework de Node.js que se utiliza para construir aplicaciones web y APIs de manera rápida y eficiente. Express simplifica el manejo de rutas, solicitudes y respuestas HTTP, lo que facilita el desarrollo del servidor.

- **JSONWebToken (JWT)**: Se utiliza para generar tokens de acceso que se utilizan para autenticar y autorizar a los usuarios en el sistema. Estos tokens se generan cuando un usuario inicia sesión correctamente y se utilizan para identificar al usuario en las solicitudes posteriores.

- **Mongoose**: Mongoose es una biblioteca de modelado de objetos MongoDB para Node.js. Se utiliza para simplificar la interacción con la base de datos MongoDB y proporciona una capa de abstracción sobre las consultas de base de datos.

- **Nodemailer**: Esta biblioteca se utiliza para enviar correos electrónicos desde el servidor. Se puede utilizar para enviar notificaciones por correo electrónico, confirmaciones de cuenta, restablecimiento de contraseñas, entre otros.

## Instalación y Uso

Para poder utilizar este proyecto en tu entorno local, tiene que seguir estos pasos:

1. Clona este repositorio

```bash
git clone https://github.com/Gonza1065/Proyecto-Final-Vortex-IT-Redux/
```

2. Instale todas las dependencias

```bash
npm install
```

3. Inicie el proyecto

```bash
npm run dev
```

4. Abra el navegador e ingrese a la URL de "http://localhost:5173/login" para poder iniciar sesión
