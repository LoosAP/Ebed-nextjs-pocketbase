import { slideshowphoto1, slideshowphoto2 } from "@/public/img";
import Image from "next/image";
import { useEffect, useState } from "react";

const Slideshow = ({ interval = 3000, className }) => {
  const [index, setIndex] = useState(0);
  const images = [slideshowphoto1, slideshowphoto2];
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((index) => (index + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div
      className={`relative  object-cover w-[400px] h-[600px] shadow-xl hidden sm:block ${className}`}
    >
      {images.map((image, i) => (
        <div
          key={i}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Slide ${i}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
    </div>
    // <Image className={className} src={images[index]} alt={`Slide ${index}`} />
  );
};

export default Slideshow;
