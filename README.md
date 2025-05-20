# Fix Together

¡Bienvenidos a **Fix Together**! 🛠️🌍

## 📖 Descripción del proyecto

**Fix Together** se basa en una idea sencilla pero potente: unir a la comunidad para resolver problemas locales de manera rápida y colaborativa. Aquí, cualquier miembro puede reportar incidencias y apoyar con donaciones para impulsar soluciones efectivas.

## 🔗 Enlace a la demo

Visita la aplicación desplegada en Vercel:

> 🌐 [https://fix-togheter.vercel.app/](https://fix-togheter.vercel.app/)

## 📸 Capturas de pantalla & GIFs
<img width="800" alt="Screenshot 2025-05-20 at 4 53 54 PM" src="https://github.com/user-attachments/assets/828664c9-4056-4b81-8c6d-d016f6e68f3e" />

<img width="800" alt="Screenshot 2025-05-20 at 4 56 11 PM" src="https://github.com/user-attachments/assets/4dcdc2a3-1ac0-4dea-9f83-cdb30700db1d" />

<img width="800" alt="Screenshot 2025-05-20 at 4 55 34 PM" src="https://github.com/user-attachments/assets/a5c330ee-6fb4-4fc4-84b7-3f4b57fe089e" />



## 🛡️ Integración con Clerk y Modales

Este proyecto utiliza **Clerk** para la autenticación y gestión de sesiones de usuario, patrocinado por la Hackathon Midudev 2025.

* La autenticación se realiza mediante **modales** emergentes (modals) para **Sign In / Sign Up**, ubicados en la esquina superior derecha.
* Sin iniciar sesión, no se pueden:

  * ✨ Realizar donaciones
  * 🐛 Reportar incidencias

He seguido la documentación oficial de Clerk para una integración limpia y sencilla.

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

## 💳 Donaciones y Pagos con Stripe (modales)

La integración con Stripe está en modo **sandbox** y también usa **modales** para mejorar la UX antes de confirmar un pago:

1. Haz clic en el botón **"\$ Support"** 🔘
2. Se abre un modal donde puedes elegir el monto (mínimo **\$5 CAD**) y ver la vista previa.
3. Confirma para abrir el modal de Stripe Checkout.
4. Usa cualquiera de estas tarjetas de prueba:

   * **Pago exitoso:** `4242 4242 4242 4242`
   * **Requiere autenticación:** `4000 0025 0000 3155`
   * **Pago rechazado:** `4000 0000 0000 9995`

* **Expiración/CVC:** La fecha de expiración debe ser posterior al día de hoy y se puede usar cualquier CVC de 3 dígitos

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

* 🔐 **Modales** de inicio de sesión y registro con Clerk
* 📝 Reporte de issues/incidencias de manera sencilla (requiere login)
* 💰 Donaciones personalizables (mín. \$5 CAD) mediante modal **\$ Support**
* 📦 Almacenamiento de datos en Supabase (PostgreSQL) y de imágenes en Storage bulk
* 🌐 Navegación responsiva y adaptada a dispositivos móviles
* 🎨 Diseño intuitivo con Tailwind CSS
* 📈 Gestión de pagos via Stripe (sandbox) con opciones de autenticación
* 🖼️ Previsualización de imágenes en bulk storage

## 🧑 Autor

**Jose Arias** — desarrollo completo de la aplicación.

Repositorio: [github.com/JoseArias31/FixTogheter](https://github.com/JoseArias31/FixTogheter)

---

¡Gracias por visitar **Fix Together**! ¡Colabora, dona y mejora tu comunidad! 💪🌟
