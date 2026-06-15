/**
 * Convert a Mongoose lean() document (with ObjectId / Date values) into a
 * plain, JSON-safe object that can be passed from Server to Client Components.
 */
export function serialize<T = Record<string, unknown>>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc));
}
