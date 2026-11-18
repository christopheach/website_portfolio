import { isAuthenticated } from "@/lib/auth";
import { uploadToZipline } from "@/lib/zipline";

/**
 * Receives one image from the backoffice and forwards it to Zipline.
 * A route handler is used instead of a server action because actions cap request bodies at 1 MB.
 */

const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Session expirée, reconnectez-vous." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return Response.json({ error: "Format non pris en charge (JPG, PNG, WebP, AVIF ou GIF)." }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Image trop lourde (20 Mo maximum)." }, { status: 413 });
  }

  try {
    const uploaded = await uploadToZipline(file);
    return Response.json({ url: uploaded.url, fileId: uploaded.id });
  } catch (error) {
    console.error("[admin/upload]", error);
    return Response.json({ error: "L'envoi vers le serveur d'images a échoué. Réessayez." }, { status: 502 });
  }
}
