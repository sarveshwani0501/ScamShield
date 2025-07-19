import React, { useRef, useState } from "react";
import HeroSection from "../home/HeroSection";
import UploadSection from "../home/UploadSection";
import FeaturesGrid from "../home/FeaturesGrid";
import TestimonialsCarousel from "../home/TesTestimonialsCarousel";
import ScanResultsModal from "../ScanResultsModal";

export default function HomePage({ onPageChange }) {
  const uploadRef = useRef(null);
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [scanFile, setScanFile] = useState(null);
  const [scanType, setScanType] = useState("call"); // 'call' or 'email'
  const [scanLanguage, setScanLanguage] = useState("auto");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const scrollToUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAnalyze = (file, type, language) => {
    setScanFile(file);
    setScanType(type);
    setScanLanguage(language);
    setIsAnalyzing(true);
    setScanModalOpen(true);
  };

  const handleModalClose = () => {
    setScanModalOpen(false);
    setIsAnalyzing(false);
    setScanFile(null);
  };

  return (
    <>
      <HeroSection onScrollToUpload={scrollToUpload} />
      <div ref={uploadRef}>
        <UploadSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      </div>
      <FeaturesGrid />
      <TestimonialsCarousel />

      <ScanResultsModal
        isOpen={scanModalOpen}
        onClose={handleModalClose}
        file={scanFile}
        type={scanType}
        language={scanLanguage}
      />
    </>
  );
}
