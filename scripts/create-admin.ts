/**
 * Create (or update) the admin user in MongoDB.
 * Usage:  npm run create-admin
 * Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env.local.
 * Safe to re-run — it upserts and re-hashes the password.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { serverEnv } from "../lib/serverEnv";

async function run() {
  const MONGODB_URI = serverEnv("MONGODB_URI");
  const ADMIN_EMAIL = serverEnv("ADMIN_EMAIL");
  const ADMIN_PASSWORD = serverEnv("ADMIN_PASSWORD");

  if (!MONGODB_URI) {
    console.error("✗ MONGODB_URI not set in .env.local");
    process.exit(1);
  }
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("✗ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const email = ADMIN_EMAIL.toLowerCase().trim();
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const existing = await User.findOne({ email });
  if (existing) {
    existing.passwordHash = passwordHash;
    existing.role = "admin";
    await existing.save();
    console.log(`✓ Updated existing admin: ${email}`);
  } else {
    await User.create({ email, passwordHash, name: "Admin", role: "admin" });
    console.log(`✓ Created admin: ${email}`);
  }

  console.log("  Log in at /admin/login with these credentials.");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
