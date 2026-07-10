import { PromoBanner } from "../components/PromoBanner"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Philosophy } from "../components/Philosophy"
import { Projects } from "../components/Projects"
import { Expertise } from "../components/Expertise"
import { Calculator } from "../components/Calculator"
import { AirConditioners } from "../components/AirConditioners"
import { VentEquipment } from "../components/VentEquipment"
import { VentParts } from "../components/VentParts"
import { FAQ } from "../components/FAQ"
import { CallToAction } from "../components/CallToAction"
import { Footer } from "../components/Footer"
import { ConsultationWidget } from "../components/ConsultationWidget"

export default function Index() {
  return (
    <main className="min-h-screen pb-16">
      <PromoBanner />
      <Header />
      <Hero />
      <Calculator />
      <Philosophy />
      <Expertise />
      <Projects />
      <FAQ />
      <CallToAction />
      <AirConditioners />
      <VentEquipment />
      <VentParts />
      <Footer />
      <ConsultationWidget />
    </main>
  )
}