"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

interface MemberPhotoProps {
  photo: string;
  alt: string;
  className?: string;
  sizes?: string;
}

const PHOTO_ROOT = "/images/leadership";
const PLACEHOLDER_PHOTO = "/images/leadership/placeholder.jpg";

export function MemberPhoto({ photo, alt, className = "", sizes = "96px" }: MemberPhotoProps) {
  const initialSrc = useMemo(() => (photo.startsWith("/") ? photo : `${PHOTO_ROOT}/${photo}`), [photo]);
  const [src, setSrc] = useState(initialSrc);

  useEffect(() => {
    setSrc(initialSrc);
  }, [initialSrc]);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={`object-cover ${className}`.trim()}
      onError={() => {
        if (src !== PLACEHOLDER_PHOTO) {
          setSrc(PLACEHOLDER_PHOTO);
        }
      }}
    />
  );
}
