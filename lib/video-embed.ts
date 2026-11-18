/**
 * Turns a video link into something the project modal can play.
 * Supports YouTube (watch, youtu.be, shorts, embed, live), Vimeo (incl. unlisted hashes)
 * and direct video files (.mp4, .webm, .mov — e.g. a Zipline upload).
 */

export type VideoEmbed =
  | { kind: "iframe"; src: string; provider: "youtube" | "vimeo"; vertical: boolean }
  | { kind: "file"; src: string };

const YOUTUBE_ID = /^[\w-]{11}$/;

function youtube(url: URL): VideoEmbed | null {
  const host = url.hostname.replace(/^(www\.|m\.|music\.)/, "");
  let id: string | null = null;
  let vertical = false;

  if (host === "youtu.be") {
    id = url.pathname.slice(1).split("/")[0];
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const [, first, second] = url.pathname.split("/");
    if (first === "watch") id = url.searchParams.get("v");
    else if (first === "shorts") [id, vertical] = [second, true];
    else if (first === "embed" || first === "live" || first === "v") id = second;
  } else {
    return null;
  }
  if (!id || !YOUTUBE_ID.test(id)) return null;

  const params = new URLSearchParams({ autoplay: "1", rel: "0", playsinline: "1" });
  const start = url.searchParams.get("t") ?? url.searchParams.get("start");
  const seconds = start ? parseInt(start, 10) : NaN;
  if (seconds > 0) params.set("start", String(seconds));
  return { kind: "iframe", provider: "youtube", vertical, src: `https://www.youtube-nocookie.com/embed/${id}?${params}` };
}

function vimeo(url: URL): VideoEmbed | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;
  // vimeo.com/123, vimeo.com/123/abcdef (unlisted), vimeo.com/channels/x/123, player.vimeo.com/video/123?h=abc
  const parts = url.pathname.split("/").filter(Boolean);
  const index = parts.findIndex((part) => /^\d+$/.test(part));
  if (index === -1) return null;

  const params = new URLSearchParams({ autoplay: "1", dnt: "1" });
  const hash = url.searchParams.get("h") ?? (parts[index + 1] && /^[\da-f]+$/i.test(parts[index + 1]) ? parts[index + 1] : null);
  if (hash) params.set("h", hash);
  return { kind: "iframe", provider: "vimeo", vertical: false, src: `https://player.vimeo.com/video/${parts[index]}?${params}` };
}

export function getVideoEmbed(link: string | undefined): VideoEmbed | null {
  if (!link) return null;
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (/\.(mp4|webm|mov|m4v)$/i.test(url.pathname)) return { kind: "file", src: url.toString() };
  return youtube(url) ?? vimeo(url);
}
