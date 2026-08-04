import { Accordion } from './ui/Accordion'
import { Container } from './ui/Container'
import { FadeIn } from './ui/FadeIn'
import { SectionHeading } from './ui/SectionHeading'

const items = [
  {
    question: 'How does the automation work?',
    answer:
      'After you connect the disposal hose and press Start, the controller reads tank levels, sequences electronic valves, runs the pump, monitors flow, executes a flush and cleaning cycle, then seals the system and notifies your phone.',
  },
  {
    question: 'Can it be installed on existing RVs?',
    answer:
      'Yes. The system is designed for retrofit on most modern RVs using modular sensor, valve, and pump interfaces. A certified installer or experienced technician can typically complete setup in a few hours.',
  },
  {
    question: 'Do I still need to operate the valves manually?',
    answer:
      'No. Electronic valve control handles open and close sequences automatically. Manual override remains available for service scenarios.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'Most installations take approximately 2–4 hours depending on RV layout, existing plumbing access, and whether optional cellular connectivity is added.',
  },
  {
    question: 'Can I monitor everything from my phone?',
    answer:
      'Yes. The companion app shows Black, Grey, and Fresh Water levels, pump and valve status, cleaning cycles, alerts, history, dump station locator, and maintenance reminders.',
  },
  {
    question: 'What happens if power is lost?',
    answer:
      'Valves fail safe to a sealed state. When power returns, the system runs a diagnostic check and resumes monitoring. Critical status is cached for sync once connectivity restores.',
  },
  {
    question: 'Is the system waterproof?',
    answer:
      'The enclosure is rated IP67 for outdoor and underbody environments. Connectors and sensor nodes use sealed industrial fittings.',
  },
  {
    question: 'What warranty is included?',
    answer:
      'Every system includes a 3-year limited hardware warranty and OTA firmware updates for the life of supported controllers.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Answers, Clearly"
          description="Everything you need to know about intelligent, hands-free RV waste automation."
        />
        <FadeIn delay={0.1}>
          <div className="mt-12">
            <Accordion items={items} />
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
