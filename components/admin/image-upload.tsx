"use client";

import { useId, useRef, useState } from "react";
import { ImageUpIcon, XIcon } from "lucide-react";

import type { StoredMedia } from "@/types/project";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  /** Prefix of the hidden inputs submitted with the form: `<name>Url` and `<name>FileId`. */
  name: string;
  label: string;
  hint?: string;
  defaultValue?: StoredMedia;
  error?: string;
  /** Preview frame shape. */
  shape?: "portrait" | "round";
  removable?: boolean;
  onUploadingChange?: (uploading: boolean) => void;
};

/**
 * Uploads the picked image to Zipline (through /admin/api/upload) right away, then keeps
 * the resulting URL in hidden inputs so the project form only submits small text fields.
 */
export function ImageUpload({ name, label, hint, defaultValue, error, shape = "portrait", removable, onUploadingChange }: Props) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<StoredMedia | undefined>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>();
  const message = uploadError ?? error;

  async function upload(file: File) {
    setUploading(true);
    onUploadingChange?.(true);
    setUploadError(undefined);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/admin/api/upload", { method: "POST", body });
      const data = (await response.json().catch(() => ({}))) as { url?: string; fileId?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error ?? "L'envoi a échoué.");
      setValue({ url: data.url, fileId: data.fileId });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "L'envoi a échoué.");
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <span id={`${id}-label`} className="text-sm font-medium">
        {label}
      </span>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative grid shrink-0 place-items-center overflow-hidden border bg-surface bg-stripes",
            shape === "round" ? "size-16 rounded-full" : "aspect-[4/5] w-28 rounded-lg",
            message && "border-destructive",
          )}
        >
          {value?.url ? (
            <img src={value.url} alt="" className="absolute inset-0 size-full object-cover" />
          ) : (
            <ImageUpIcon aria-hidden className="size-5 text-muted-foreground" />
          )}
          {uploading && (
            <div className="absolute inset-0 grid place-items-center bg-black/60">
              <Spinner tone="overlay" label="Envoi en cours" />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              aria-describedby={`${id}-label`}
            >
              {uploading ? "Envoi…" : value?.url ? "Remplacer" : "Choisir une image"}
            </Button>
            {removable && value?.url && !uploading && (
              <Button type="button" variant="ghost" size="sm" onClick={() => setValue(undefined)}>
                <XIcon aria-hidden />
                Retirer
              </Button>
            )}
          </div>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {message && (
        <p role="alert" className="text-sm text-destructive">
          {message}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
        }}
      />
      <input type="hidden" name={`${name}Url`} value={value?.url ?? ""} />
      <input type="hidden" name={`${name}FileId`} value={value?.fileId ?? ""} />
    </div>
  );
}
