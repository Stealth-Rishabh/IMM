/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Link } from "react-router-dom";
import AccreditationLogo from "./AccreditationLogo";
import { AccreditationLogoMobile } from "./AccreditationLogoMobile";

export default function Slider({
  slides,
  autoPlay = true,
  autoPlayInterval = 50000,
  indicators = true,
  arrows = true,
  effect = "cube",
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");

  const slideCount = slides.length;

  const variants = {
    cube: {
      initial: (direction) => ({
        rotateY: direction === "right" ? 90 : -90,
        opacity: 1,
      }),
      animate: {
        rotateY: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
      },
      exit: (direction) => ({
        rotateY: direction === "right" ? -90 : 90,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
      }),
    },
    flip: {
      initial: (direction) => ({
        rotateY: direction === "right" ? 180 : -180,
        opacity: 1,
      }),
      animate: {
        rotateY: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
      },
      exit: (direction) => ({
        rotateY: direction === "right" ? -180 : 180,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
      }),
    },
    fade: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      },
    },
    slide: {
      initial: (direction) => ({
        x: direction === "right" ? "100%" : "-100%",
        opacity: 1,
      }),
      animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
      },
      exit: (direction) => ({
        x: direction === "right" ? "-100%" : "100%",
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
      }),
    },
  };

  const getVariant = () => {
    switch (effect) {
      case "cube":
        return variants.cube;
      case "flip":
        return variants.flip;
      case "fade":
        return variants.fade;
      default:
        return variants.slide;
    }
  };

  const animateSlideTransition = useCallback(
    (nextIndex, direction) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setDirection(direction);
      setCurrentSlide(nextIndex);
    },
    [isAnimating]
  );

  const nextSlideFunc = useCallback(() => {
    if (isAnimating) return;

    const nextIndex = (currentSlide + 1) % slideCount;
    animateSlideTransition(nextIndex, "right");
  }, [currentSlide, slideCount, isAnimating, animateSlideTransition]);

  const prevSlideFunc = useCallback(() => {
    if (isAnimating) return;

    const nextIndex = (currentSlide - 1 + slideCount) % slideCount;
    animateSlideTransition(nextIndex, "left");
  }, [currentSlide, slideCount, isAnimating, animateSlideTransition]);

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;

    const direction = index > currentSlide ? "right" : "left";
    animateSlideTransition(index, direction);
  };

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextSlideFunc();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlideFunc]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlideFunc();
      } else if (e.key === "ArrowRight") {
        nextSlideFunc();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlideFunc, prevSlideFunc]);

  // Handle touch events for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlideFunc();
    } else if (isRightSwipe) {
      prevSlideFunc();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: 1000 }}
    >
      <AnimatePresence
        custom={direction}
        initial={false}
        onExitComplete={() => setIsAnimating(false)}
      >
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={getVariant()}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 left-0 w-full h-full"
          style={{
            transformStyle:
              effect === "cube" || effect === "flip" ? "preserve-3d" : "flat",
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent" />
            <img
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/10" />
            {currentSlide === 0 && slides[currentSlide].slider && (
              <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full h-full gap-10 md:p-12 lg:p-16">
                <div className="max-w-4xl ml-10 sm:space-y-8 ">
                  <h1 className="mb-4 space-y-4 text-4xl font-bold leading-tight lg:text-7xl md:text-6xl">
                    <SparklesText
                      className="text-4xl text-transparent bg-gradient-to-r from-white via-white/80 to-white/70 bg-clip-text sm:text-5xl md:text-5xl lg:text-7xl"
                      text={slides[currentSlide].heading1}
                      colors={{
                        first: "#DDC99F",
                        second: "#C4184B",
                      }}
                    />

                    <SparklesText
                      className="text-4xl text-transparent bg-gradient-to-r from-white via-white/80 to-white/70 bg-clip-text sm:text-5xl md:text-5xl lg:text-7xl"
                      text={slides[currentSlide].heading2}
                      colors={{
                        first: "#DDC99F",
                        second: "#C4184B",
                      }}
                    />
                  </h1>

                  <p className="mb-6 text-xl lg:text-3xl text-white/90 md:text-2xl">
                    {slides[currentSlide].description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-5 sm:mt-14">
                    <Link
                      to="/programs/pgdm"
                      className="relative overflow-hidden rounded-full bg-[#C4184B] px-6 py-2 text-sm lg:text-lg font-semibold text-white hover:bg-white hover:text-black duration-150 transition-all hover:-translate-y-2"
                    >
                      <span>
                        <BorderBeam className="absolute inset-0" />
                        PGDM Program
                      </span>
                    </Link>
                    <Link
                      to="/programs/bba"
                      className="relative overflow-hidden rounded-full bg-[#C4184B] px-6 py-2 text-sm lg:text-lg font-semibold text-white hover:bg-white hover:text-black duration-150 transition-all hover:-translate-y-2"
                    >
                      <span>
                        <BorderBeam className="absolute inset-0" />
                        BBA Program
                      </span>
                    </Link>
                  </div>
                </div>
                {/* <div className="hidden md:block px-5 py-1 rounded-lg bg-black/40 backdrop-blur-3xl">
                  <AccreditationLogo />
                </div> */}
                <div className="block sm:hidden px-5 py-1 rounded-lg bg-black/40 backdrop-blur-3xl">
                  <AccreditationLogoMobile />
                </div>
              </div>
            )}

            {!slides[currentSlide].slider && (
              <div className="absolute left-0 right-0 z-20 bottom-10">
                <div className="max-w-4xl mx-auto">
                  {/* <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl md:mb-6">{slides[currentSlide].title}</h2> */}
                  {/* <p className="max-w-2xl text-base md:text-lg lg:text-xl text-white/90">{slides[currentSlide].description}</p> */}
                </div>

                {/* <div className="w-full bg-black/40 backdrop-blur-sm">
                  <h1 className="px-3 py-2 mx-auto text-lg text-white rounded-md w-max">
                    {"📍" + slides[currentSlide].category}
                  </h1>
                </div> */}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {arrows && (
        <div className="hidden sm:flex ">
          <Button
            onClick={prevSlideFunc}
            disabled={isAnimating}
            className="z-20 p-2 -translate-y-1/2 border rounded-full sm:absolute left-4 top-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 md:p-3"
            size="icon"
            variant="ghost"
          >
            <ChevronLeft className="w-5 h-5 text-white md:h-6 md:w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            onClick={nextSlideFunc}
            disabled={isAnimating}
            className="absolute z-20 p-2 -translate-y-1/2 border rounded-full right-6 top-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 md:p-3"
            size="icon"
            variant="ghost"
          >
            <ChevronRight className="w-5 h-5 text-white md:h-6 md:w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      )}

      {/* Indicators */}
      {indicators && (
        <div className="absolute z-20 flex space-x-2 -translate-x-1/2 bottom-6 left-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "hidden md:block w-2 h-2 md:w-4 md:h-[5px] rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/20 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
