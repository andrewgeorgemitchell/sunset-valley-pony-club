import Image, { ImageProps } from 'next/image';
import React, { useCallback } from 'react';

export const SanityImage = ({ height, width, alt, ...props }: ImageProps) => {
  const SanityImageLoader: ImageProps['loader'] = useCallback(
    ({ src: loaderSrc }) =>
      `${loaderSrc}?auto=format&fit=fill&fit=center&w=${width}&h=${height}&bg=fff`,
    [height, width],
  );

  return (
    <div
      style={{
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Image
        {...props}
        height={height}
        width={width}
        alt={alt}
        loader={SanityImageLoader}
      />
    </div>
  );
};
