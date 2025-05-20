# Fix Together

¡Bienvenidos a **Fix Together**! 🛠️🌍

## 📖 Descripción del proyecto

**Fix Together** se basa en una idea sencilla pero potente: cuando la comunidad se une, resolvemos problemas locales de forma más rápida y eficaz que con soluciones tradicionales. A través de la colaboración, cualquier miembro puede reportar incidencias o donar para apoyar iniciativas locales.

## 🔗 Enlace a la demo

Visita la aplicación desplegada en Vercel:

> 🌐 [https://fix-togheter.vercel.app/](https://fix-togheter.vercel.app/)

## 📸 Capturas de pantalla & GIFs

*(Agrega aquí capturas o GIFs de tu app para mostrar la interfaz y el flujo de usuario.)*

## 🛡️ Integración con Clerk

Este proyecto utiliza **Clerk** para la autenticación y gestión de sesiones de usuario, gracias a su patrocinio en la Hackathon Midudev 2025. He integrado Clerk siguiendo su documentación oficial, ubicando el componente de **Sign In / Sign Up** en la esquina superior derecha de la aplicación.

> **Importante:** Para poder:
>
> * ✨ Realizar donaciones
> * 🐛 Reportar incidencias en la comunidad
>
> los usuarios deben iniciar sesión con Clerk. Sin autenticación, la interacción queda limitada.

## 💻 Stack Tecnológico

* **Frontend:**

  * Next.js
  * Tailwind CSS
  * V0.dev (Maquetación)
* **Backend:**

  * Next.js 14 (App Router)
  * TypeScript
  * Clerk (autenticación y gestión de sesiones)
  * PostgreSQL (Supabase)
  * Stripe (pagos y donations)
* **Despliegue:** Vercel

## 💳 Pagos con Stripe

La integración con Stripe está en modo sandbox:

1. Haz clic en "Checkout" para ir a la página de pago.
2. Usa cualquiera de estas tarjetas de prueba:

   * **Pago exitoso:** `4242 4242 4242 4242`
   * **Requiere autenticación:** `4000 0025 0000 3155`
   * **Pago rechazado:** `4000 0000 0000 9995`

## ⚙️ Variables de entorno

Configura tu archivo `.env.local` con los siguientes placeholders (reemplaza por tus propios valores):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<TU_SUPABASE_URL>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<TU_SUPABASE_ANON_KEY>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<TU_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<TU_CLERK_SECRET_KEY>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<TU_STRIPE_PUBLISHABLE_KEY>
STRIPE_SECRET_KEY=<TU_STRIPE_SECRET_KEY>
# STRIPE_WEBHOOK_SECRET=<Tu webhook secret para verificar eventos>
```

## 🚀 Funcionalidades

* 🔐 Inicio de sesión y registro de usuarios con Clerk
* 📝 Reporte de issues/incidencias de manera sencilla
* 💰 Donaciones personalizables para apoyar causas locales
* 📦 Almacenamiento de datos en Supabase (PostgreSQL) y de imágenes en Storage
* 🌐 Navegación responsiva y adaptada a dispositivos móviles
* 🎨 Diseño intuitivo con Tailwind CSS
* 📈 Gestión de pagos vía Stripe (sandbox)
* 📸 Previsualización de imágenes en bulk storage

## 🧑 Autor

**Jose Arias** — desarrollo completo de la aplicación.

Repositorio: [github.com/JoseArias31/FixTogheter](https://github.com/JoseArias31/FixTogheter)

---

¡Gracias por visitar **Fix Together**! ¡Colabora, dona y mejora tu comunidad! 💪🌟
