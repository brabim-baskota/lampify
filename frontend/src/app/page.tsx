"use client";
import Link from "next/link";
import Navbar from "../app-components/Navbar";
import HeroSection from "../app-components/hero-section";
import FeaturedCollection from "../app-components/featured-collection";
import CategoriesPreview from "../app-components/categories-preview";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <HeroSection />

        {/* Categories Preview (Static for now) */}
        <CategoriesPreview />
        {/* Featured Collections */}
        <FeaturedCollection />
      </main>
    </>
  );
}
