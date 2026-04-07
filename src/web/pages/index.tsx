import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { ProblemFraming } from '../components/ProblemFraming';
import { ProductExplanation } from '../components/ProductExplanation';
import { DiagnosticPreview } from '../components/DiagnosticPreview';
import { InteractiveDemo } from '../components/InteractiveDemo';
import { ReportIncludes } from '../components/ReportIncludes';
import { CostOfInaction } from '../components/CostOfInaction';
import { Industries } from '../components/Industries';
import { CTA } from '../components/CTA';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';

export default function Index() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <ProblemFraming />
      <ProductExplanation />
      <DiagnosticPreview />
      <InteractiveDemo />
      <ReportIncludes />
      <CostOfInaction />
      <Industries />
      <CTA />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
