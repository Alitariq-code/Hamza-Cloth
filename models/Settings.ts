import { Schema, model, models, type Model } from "mongoose";

/** Singleton site-settings document (key: "site"). */
export interface SettingsDoc {
  key: string;
  announcementEnabled: boolean;
  announcementText: string;
  heroImage: string;
  heroBadgeTitle: string;
  heroBadgeSubtitle: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<SettingsDoc>(
  {
    key: { type: String, default: "site", unique: true, index: true },
    announcementEnabled: { type: Boolean, default: true },
    announcementText: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    heroBadgeTitle: { type: String, default: "" },
    heroBadgeSubtitle: { type: String, default: "" },
  },
  { timestamps: true },
);

const Settings: Model<SettingsDoc> =
  (models.Settings as Model<SettingsDoc>) ||
  model<SettingsDoc>("Settings", SettingsSchema);

export default Settings;
