"use client";

import * as React from "react";
import Image from "next/image";

import type { VideoAsset } from "@/config/media";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

type BackgroundVideoProps = {
  video: VideoAsset;
  /** Classes for the wrapper (size, position). The video and poster fill it. */
  className?: string;
  /** Poster `sizes`, like next/image: how wide the frame is on screen. */
  sizes?: string;
  /** Describe the video when it carries meaning; leave out for decorative backgrounds. */
  label?: string;
};

/**
 * Muted, looping video that costs nothing until it is about to scroll into view:
 * - nothing is downloaded up front (`preload="none"`), only the optimised poster image, lazily;
 * - near the viewport it picks the phone or desktop file and plays; off-screen it pauses;
 * - playback is started from JS, which also works where the `autoplay` attribute is blocked or ignored;
 * - with "reduce motion" turned on, the poster stays and the video never loads;
 * - while it is fetching or stalls, a small aperture spinner shows in the corner.
 */
export function BackgroundVideo({ video, className, sizes = "100vw", label }: BackgroundVideoProps) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [buffering, setBuffering] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reducedMotion.matches) {
          // Set as a property too: some browsers only honour the property for autoplay rules.
          element.muted = true;
          if (element.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) setBuffering(true);
          element.play().catch(() => {
            // Blocked (e.g. iOS Low Power Mode): the poster stays visible.
            setBuffering(false);
          });
        } else {
          element.pause();
          setBuffering(false);
        }
      },
      // Start a little before it appears, so the first frames are ready when it does.
      { rootMargin: "300px 0px" },
    );
    observer.observe(element);

    const onMotionChange = () => {
      if (reducedMotion.matches) element.pause();
    };
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className={cn("relative overflow-hidden bg-black", className)}>
      <video
        ref={ref}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        onPlaying={() => {
          setPlaying(true);
          setBuffering(false);
        }}
        onWaiting={() => setBuffering(true)}
        onError={() => setBuffering(false)}
        className="absolute inset-0 size-full object-cover"
      >
        {/* The first <source> whose media query matches is used; browsers that ignore `media` take the small file. */}
        {video.srcSmall && <source src={video.srcSmall} type="video/mp4" media="(max-width: 767px)" />}
        <source src={video.src} type="video/mp4" />
      </video>
      {video.poster && (
        <Image
          src={video.poster}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className={cn(
            "pointer-events-none object-cover transition-opacity duration-500 motion-reduce:transition-none",
            playing && "opacity-0",
          )}
        />
      )}
      {buffering && (
        <Spinner
          tone="overlay"
          label=""
          className="absolute right-3 bottom-3 z-1 opacity-90 motion-safe:animate-in motion-safe:fade-in-0 md:right-4 md:bottom-4"
        />
      )}
    </div>
  );
}
