import HeroSection from "@/components/sections/HeroSection";
import ConceptsSection from "@/components/sections/ConceptsSection";
import SchemaExplorer from "@/components/sections/SchemaExplorer";
import SmartAssistant from "@/components/sections/SmartAssistant";
import RealWorldFriction from "@/components/sections/RealWorldFriction";
import GoogleServices from "@/components/sections/GoogleServices";
import EvalDashboard from "@/components/sections/EvalDashboard";
import SubmissionSection from "@/components/sections/SubmissionSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ConceptsSection />
      <SchemaExplorer />
      <SmartAssistant />
      <RealWorldFriction />
      <GoogleServices />
      <EvalDashboard />
      <SubmissionSection />
      <Footer />
    </main>
  );
}
