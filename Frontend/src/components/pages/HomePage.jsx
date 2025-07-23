import React from "react";
import HeroSection from "../home/HeroSection";
import FeaturesGrid from "../home/FeaturesGrid";
import TestimonialsCarousel from "../home/TestimonialsCarousel";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <HeroSection navigate={useNavigate} />
      <FeaturesGrid />
      <TestimonialsCarousel />
    </>
  );
}
