# Hamza Cloth House

A full-stack **Next.js 14** (App Router) product-showcase website for a Pakistani
women's clothing brand based in Multan. Customers browse products and **order via
WhatsApp** (no checkout). A secure **admin panel** manages products & collections.

Built with TypeScript, Tailwind CSS, MongoDB (Mongoose), NextAuth, and Cloudinary.

---

## ✨ Features

- **Luxury blush-and-gold design system** — Playfair Display + Inter + Noto Nastaliq Urdu (bilingual EN/UR).
- **Public storefront** — home (hero, bestsellers, new arrivals, collections, newsletter), products with filters & sorting, product detail with image gallery + size/color selectors, collections, new-arrivals, sale, debounced search, about, contact.
- **WhatsApp ordering** — every product opens WhatsApp with a pre-filled message; floating WhatsApp button on every page.
- **Admin panel** (`/admin`) — NextAuth-protected dashboard with stats, products table (search, pagination, visibility toggle, bulk hide/delete), drag-to-reorder multi-image uploader (Cloudinary), and a collections manager.
- **Performance** — `next/image` everywhere, skeleton loaders, ISR (`revalidate: 60`), MongoDB indexes on filterable fields + a text index for search.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
#   …then fill in MONGODB_URI, NEXTAUTH_SECRET, ADMIN_*, CLOUDINARY_*, etc.
#   Generate a secret:  openssl rand -base64 32

# 3. Start the local MongoDB (Docker)
docker compose up -d        # MongoDB on host port 27018, Mongo Express on :8081

# 4. Create the admin user in the database
npm run create-admin        # uses ADMIN_EMAIL / ADMIN_PASSWORD from .env.local

# 5. Run the dev server
npm run dev                 # http://localhost:3000

# 6. Production build
npm run build && npm start
```

The store starts **empty** — add your real products and collections from the
admin panel.

### Admin login

Admin accounts live in the MongoDB `users` collection with **bcrypt-hashed**
passwords. Create or reset the admin any time with:

```bash
npm run create-admin        # reads ADMIN_EMAIL / ADMIN_PASSWORD from .env.local
```

Then sign in at `/admin/login`. NextAuth issues a JWT session; all `/admin/*`
pages (except the login page) and every mutating API route are protected.

### 🐳 Local database (Docker)

`docker-compose.yml` runs MongoDB on host port **27018** (to avoid clashing with
any existing Mongo on 27017) plus an optional **Mongo Express** GUI:

```bash
docker compose up -d        # start
docker compose ps           # status
docker compose down         # stop (data persists in the named volume)
docker compose down -v      # stop AND wipe the database
```

- Mongo Express UI: <http://localhost:8081> (login `admin` / `admin`)

---

## 🔧 Environment variables

See [`.env.example`](.env.example) for the full list. Key groups:

| Group | Vars |
|---|---|
| Database | `MONGODB_URI` |
| Auth | `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` |
| Images | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` |
| Public | `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_NAME`, social URLs |

> Without Cloudinary credentials the image uploader falls back to local
> data-URI previews so the admin form still works during development.

---

## 🗂️ Project structure

```
app/
  (public)/        # storefront pages + shared layout (navbar/footer/whatsapp)
  admin/           # protected admin panel (login, dashboard, products, collections)
  api/             # products, collections, upload, NextAuth routes
components/         # layout/, home/, products/, admin/ + shared Icons
lib/               # mongodb, cloudinary, auth, data-access, constants
models/            # Mongoose Product & Collection schemas
types/             # shared TypeScript types & enums
scripts/seed.ts    # sample-data seeder
```

---

## 🌐 API routes

| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/api/products` | public | list (filters, sort, pagination) |
| POST | `/api/products` | admin | create |
| GET / PUT / DELETE | `/api/products/[id]` | get public · mutate admin | single product (by id or slug) |
| GET | `/api/collections` | public | list with item counts |
| POST | `/api/collections` | admin | create |
| PUT / DELETE | `/api/collections/[id]` | admin | update / delete |
| POST | `/api/upload` | admin | upload image to Cloudinary |

---

## 📦 Deploy (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Add all environment variables from `.env.example` in the Vercel dashboard
   (set `NEXTAUTH_URL` to your production domain).
3. Deploy. ISR keeps product pages fresh every 60 seconds.

---

Made with ❤️ in Multan, Pakistan.
# Hamza-Cloth
