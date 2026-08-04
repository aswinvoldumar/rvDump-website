import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TrustStats } from './components/TrustStats'
import { Comparison } from './components/Comparison'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { ProductShowcase } from './components/ProductShowcase'
import { MobileApp } from './components/MobileApp'
import { Benefits } from './components/Benefits'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Comparison />
        <HowItWorks />
        <Features />
        <ProductShowcase />
        <MobileApp />
        <Benefits />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
