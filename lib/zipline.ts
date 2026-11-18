import "server-only";

/**
 * Minimal client for a self-hosted Zipline v4 instance (https://zipline.diced.sh).
 * The token belongs to a Zipline account, so this module must never reach the browser.
 */

export type ZiplineFile = {
  /** Zipline file id, needed to delete the file later. */
  id: string;
  /** Stored file name, e.g. "xNtMqu.jpg". */
  name: string;
  /** MIME type reported by Zipline. */
  type: string;
  /** Direct link to the file bytes (`/raw/<name>`), usable by next/image. */
  url: string;
};

function config() {
  const url = process.env.ZIPLINE_URL?.replace(/\/+$/, "");
  const token = process.env.ZIPLINE_TOKEN;
  if (!url || !token) throw new Error("ZIPLINE_URL and ZIPLINE_TOKEN must be set.");
  return { url, token, folderId: process.env.ZIPLINE_FOLDER_ID || undefined };
}

/** Zipline's own `url` points at `/u/<name>` (a redirect, sometimes over http), so build the raw link ourselves. */
export function ziplineRawUrl(name: string) {
  return `${config().url}/raw/${encodeURIComponent(name)}`;
}

async function readError(response: Response) {
  const body = await response.text().catch(() => "");
  try {
    const json = JSON.parse(body) as { error?: string };
    return json.error ?? body;
  } catch {
    return body || response.statusText;
  }
}

export async function uploadToZipline(file: File): Promise<ZiplineFile> {
  const { url, token, folderId } = config();

  const body = new FormData();
  body.append("file", file, file.name);

  const headers: Record<string, string> = { authorization: token };
  if (folderId) headers["x-zipline-folder"] = folderId;

  const response = await fetch(`${url}/api/upload`, { method: "POST", headers, body, cache: "no-store" });
  if (!response.ok) throw new Error(`Zipline upload failed (${response.status}): ${await readError(response)}`);

  const data = (await response.json()) as { files?: { id: string; name: string; type: string }[] };
  const uploaded = data.files?.[0];
  if (!uploaded) throw new Error("Zipline upload returned no file.");

  return { id: uploaded.id, name: uploaded.name, type: uploaded.type, url: ziplineRawUrl(uploaded.name) };
}

/** Deletes a file. Missing files are ignored so cleanup can be retried safely. */
export async function deleteFromZipline(id: string): Promise<void> {
  const { url, token } = config();
  const response = await fetch(`${url}/api/user/files/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { authorization: token },
    cache: "no-store",
  });
  if (!response.ok && response.status !== 404) {
    throw new Error(`Zipline delete failed (${response.status}): ${await readError(response)}`);
  }
}

/** Best-effort cleanup: logs instead of throwing, so a Zipline hiccup never blocks saving a project. */
export async function deleteFromZiplineQuietly(ids: (string | undefined)[]) {
  await Promise.all(
    ids
      .filter((id): id is string => Boolean(id))
      .map((id) => deleteFromZipline(id).catch((error) => console.error(`[zipline] could not delete ${id}`, error))),
  );
}
