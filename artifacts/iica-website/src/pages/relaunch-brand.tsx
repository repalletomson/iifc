import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/themeContext';
import { ConsultationModal } from '@/components/sections/ConsultationModal';

const marketData = [
  { segment: "Television",        y2019: "737",   y2020: "720",    y2021: "756",   y2022: "810",   y2023: "874",   y2024: "943",   cagr: "5.0%"  },
  { segment: "Digital (OTT)",     y2019: "9.8",   y2020: "524",    y2021: "499",   y2022: "521",   y2023: "471",   y2024: "562",   cagr: "10.6%" },
  { segment: "Print",             y2019: "308",   y2020: "207",    y2021: "213",   y2022: "228",   y2023: "248",   y2024: "266",   cagr: "2.8%"  },
  { segment: "Films",             y2019: "191",   y2020: "72",     y2021: "172",   y2022: "195",   y2023: "202",   y2024: "222",   cagr: "3.0%"  },
  { segment: "Online gaming",     y2019: "49",    y2020: "79",     y2021: "101",   y2022: "130",   y2023: "147",   y2024: "181",   cagr: "29.8%" },
  { segment: "Animation and VFX", y2019: "95",    y2020: "83",     y2021: "90",    y2022: "100",   y2023: "113",   y2024: "128",   cagr: "6.1%"  },
  { segment: "Live Events/OOH",   y2019: "90",    y2020: "31",     y2021: "34",    y2022: "73",    y2023: "73",    y2024: "80",    cagr: "22.2%" },
  { segment: "Out of Home (OOH)", y2019: "37",    y2020: "15",     y2021: "20",    y2022: "37",    y2023: "45",    y2024: "52",    cagr: "14.9%" },
  { segment: "Radio",             y2019: "31",    y2020: "18",     y2021: "18",    y2022: "21",    y2023: "24",    y2024: "26",    cagr: "2.9%"  },
  { segment: "Music",             y2019: "14",    y2020: "14",     y2021: "17",    y2022: "18",    y2023: "22",    y2024: "26",    cagr: "16.4%" },
  { segment: "Total",             y2019: "1,769", y2020: "1,475",  y2021: "1,780", y2022: "2,048", y2023: "2,346", y2024: "2,731", cagr: "9.0%", bold: true },
  { segment: "Growth",            y2019: "",      y2020: "-16.6%", y2021: "20.7%", y2022: "19.9%", y2023: "13.8%", y2024: "",      cagr: "",     bold: true },
];

const stepwiseSections = [
  {
    title: "Deep Dive Analysis & Brand Solutioning",
    items: [
      { label: "", desc: "Designing a 360-degree view of your prospective career-path based on \"first principles\" thinking and industry standard branding principles" },
      { label: "Making the Connections: Mentors, Employers, & Others", desc: "" },
      { label: "", desc: "Our intuitive App allows visibility of your brand name, with video channels, and you can create your performances & events listings" },
      { label: "Done-for-you Digital Marketing Services", desc: "" },
      { label: "", desc: "Built right in is the ability to celebrate your LEGACY. You can invite your students & external audiences into the rich treasure trove" },
      { label: "1:1 LIVE Support by Community Champions", desc: "" },
      { label: "", desc: "The major step for many artistic brands is to capture new audience appointments. Our built-in calendar application solves the problem in a straightforward flow" },
    ],
  },
];

export default function RelaunchBrand() {
  const { theme } = useTheme();
  const light = theme === 'light';

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${light ? 'bg-background text-foreground' : 'bg-black text-gray-100'}`}>

      {/* ── Hero Title ── */}
      <section className={`py-16 text-center transition-colors ${light ? 'bg-background' : 'bg-black'}`}>
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-4xl font-bold mb-6 text-[#C13584]"
          >
            Prepare to Succeed as Performing Arts Professionals
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-sm md:text-base leading-relaxed text-left space-y-3 ${light ? 'text-muted-foreground' : 'text-gray-300'}`}
          >
            <p>
              India's performing arts market is valued at $3.8 billion in 2023 and it is expected to grow to $7 billion by 2027. Worldwide, the arts, entertainment and recreation industry is worth $1.5 Trillion. This sector comprises (1) companies that are involved in producing, promoting, or participating in live performances, events, or exhibits intended for public viewing; (2) companies that preserve and exhibit objects and sites of historical, cultural, or educational interest; (3) companies that operate facilities or provide services that enable patrons to participate in recreational activities or pursue amusement, hobby, and leisure time interests: and (4) independent artists, educators, and educational institutes.
            </p>
            <p>
              No wonder, more and more talented individuals are switching careers to pursue performing arts, full-time. However, there is a lot of confusion around how to structure a career path that is financially sustainable yet creatively fulfilling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Personalized Solutions ── */}
      <section className={`py-8 border-y transition-colors ${light ? 'bg-muted border-border' : 'bg-[#0a0a0a] border-white/8'}`}>
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-serif text-2xl font-bold mb-4 text-center text-[#C13584]">
            Personalized Solutions for Flourishing Career-Paths
          </h2>
          <div className={`text-sm md:text-base leading-relaxed space-y-3 ${light ? 'text-muted-foreground' : 'text-gray-300'}`}>
            <p>
              If you are <strong className={light ? 'text-foreground' : 'text-white'}>getting serious</strong> about pursuing performing arts as a career or <strong className={light ? 'text-foreground' : 'text-white'}>switch careers</strong> to be a creative professional, or, if you are parents to a talented child, we are grateful to introduce our award-winning scientific methodology that weaves together creative potential, emotional intelligence, and youth mindset, to offer a personalized solution that just works for you.
            </p>
            <p>
              It's an exciting time to be in the industry as it is only going to get bigger and better as the sector is expected to grow 11.5% in 2023 to reach INR 2.34 trillion and further grow at a CAGR of 10.5% to reach INR 2.83 trillion by 2025.
            </p>
            <p className={`font-semibold ${light ? 'text-foreground' : 'text-white'}`}>Indian arts & entertainment sector grew 20% in 2022 to reach Rs. 2.1 Trillion.</p>
            <p className={`font-semibold ${light ? 'text-foreground' : 'text-white'}`}>Segment-wise business numbers are given below:</p>
          </div>
        </div>
      </section>

      {/* ── Market Data Table ── */}
      <section className={`py-10 transition-colors ${light ? 'bg-background' : 'bg-black'}`}>
        <div className="container mx-auto px-4 max-w-4xl overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className={`border transition-colors ${light ? 'bg-muted border-border' : 'bg-[#111] border-white/10'}`}>
                {["Segment","2019","2020","2021","2022","2023E","2024E","CAGR"].map(h => (
                  <th key={h} className={`border px-3 py-2 font-bold text-left first:text-left text-center first-of-type:text-left transition-colors ${light ? 'border-border text-foreground' : 'border-white/10 text-gray-200'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marketData.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b transition-colors ${
                    row.bold
                      ? light ? 'bg-muted font-bold' : 'bg-[#111] font-bold'
                      : i % 2 === 0
                        ? light ? 'bg-background' : 'bg-black'
                        : light ? 'bg-muted/50' : 'bg-[#0a0a0a]'
                  } ${light ? 'border-border' : 'border-white/5'}`}
                >
                  <td className={`border px-3 py-1.5 ${light ? 'border-border text-foreground' : 'border-white/5 text-gray-200'}`}>{row.segment}</td>
                  {[row.y2019, row.y2020, row.y2021, row.y2022, row.y2023, row.y2024].map((val, vi) => (
                    <td key={vi} className={`border px-2 py-1.5 text-center ${light ? 'border-border text-muted-foreground' : 'border-white/5 text-gray-400'}`}>{val}</td>
                  ))}
                  <td className={`border px-2 py-1.5 text-center font-semibold text-[#C13584] ${light ? 'border-border' : 'border-white/5'}`}>{row.cagr}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={`text-xs mt-2 text-center ${light ? 'text-muted-foreground' : 'text-gray-500'}`}>(Values in INR Billion)</p>
        </div>
      </section>

      {/* ── Key Trends ── */}
      <section className={`py-10 border-t transition-colors ${light ? 'bg-muted border-border' : 'bg-[#0a0a0a] border-white/8'}`}>
        <div className="container mx-auto px-6 max-w-3xl space-y-8">
          <p className={`text-sm font-semibold ${light ? 'text-foreground' : 'text-white'}`}>Some of the key trends to follow in futures:</p>

          <div>
            <h3 className="font-serif text-lg font-bold text-[#C13584] mb-3">"Events" will continue their growth trajectory:</h3>
            <p className={`text-sm mb-2 ${light ? 'text-muted-foreground' : 'text-gray-300'}`}>
              Organised events will grow to INR134 billion due to growth across all its verticals:
            </p>
            <ul className={`space-y-1 text-sm ${light ? 'text-muted-foreground' : 'text-gray-300'}`}>
              <li className="flex gap-2"><span className="text-[#C13584] shrink-0">•</span>Companies and brands will spend more on events; 53% of respondents planned to increase their event spending in the next five years, while 27% would maintain them</li>
              <li className="flex gap-2"><span className="text-[#C13584] shrink-0">•</span>Ticketed events, across sports and concerts, backed by several new properties and a growing middle class</li>
              <li className="flex gap-2"><span className="text-[#C13584] shrink-0">•</span>Government events to support the several new initiatives and the upcoming elections in 2023 and 2024</li>
              <li className="flex gap-2"><span className="text-[#C13584] shrink-0">•</span>Weddings and personal events catering to a growing segment of rich families</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-[#C13584] mb-3">"Cinema" will focus on two different segments</h3>
            <ul className={`space-y-2 text-sm ${light ? 'text-muted-foreground' : 'text-gray-300'}`}>
              <li className="flex gap-2">
                <span className="text-[#C13584] shrink-0">•</span>
                High-end cinemas will evolve into "experience zones" to cater to top-end multiplex audiences who watch movies for their spectacular experiences and to enjoy an evening out with friends and family with at around over 130C million customers / 40 million households by 2025.
              </li>
              <li className="flex gap-2">
                <span className="text-[#C13584] shrink-0">•</span>
                It will emerge for a set of lower-priced "cinema products" will emerge for the next 100 to 150 million audiences across the top 75 cities of India, which will also require a change to the type of content being produced for these audiences, and which could even see regional OTT products releasing in a windowed manner.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── So, What Exactly Do We Do ── */}
      <section className={`py-10 text-center transition-colors ${light ? 'bg-background' : 'bg-black'}`}>
        <div className="container mx-auto px-6">
          <h2 className={`font-serif text-2xl md:text-3xl font-bold ${light ? 'text-foreground' : 'text-white'}`}>
            So, What Exactly Do We Do?
          </h2>
          <p className="font-serif text-2xl md:text-3xl font-bold text-[#C13584]">
            A Step-wise Clarity is Provided Below
          </p>
        </div>
      </section>

      {/* ── Stepwise Section ── */}
      <section className={`pb-16 transition-colors ${light ? 'bg-background' : 'bg-black'}`}>
        <div className="container mx-auto px-6 max-w-3xl space-y-6">
          {stepwiseSections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-8 border transition-colors ${
                light ? 'bg-card border-border shadow-sm' : 'bg-[#0d0d0d] border-white/8'
              }`}
            >
              <h3 className={`font-serif text-xl font-bold mb-4 ${light ? 'text-foreground' : 'text-white'}`}>{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className={`text-sm leading-relaxed flex gap-2 ${light ? 'text-muted-foreground' : 'text-gray-300'}`}>
                    {item.label && (
                      <span className={`font-semibold shrink-0 ${light ? 'text-foreground' : 'text-white'}`}>{item.label}</span>
                    )}
                    {item.desc && <span>{item.desc}</span>}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Book Free Consultation ── */}
      <section className={`py-12 border-t transition-colors ${light ? 'bg-muted border-border' : 'bg-[#0a0a0a] border-white/8'}`}>
        <div className="container mx-auto px-6 max-w-3xl text-center space-y-4">
          <p className={`text-sm leading-relaxed ${light ? 'text-muted-foreground' : 'text-gray-400'}`}>
            Also, once you sign up as a Premium Artist, we will send you a FREE copy of the book titled{' '}
            <em className={light ? 'text-foreground' : 'text-gray-200'}>"Creative Communication Excellence in Arts & Entertainment"</em>, a Powerful Six-Step Process To Live In Deep Creativity And Financial Abundance In 2023 & Beyond.
          </p>
          <ConsultationModal>
            <button className="relative inline-flex items-center gap-2 bg-gradient-to-r from-[#C13584] via-[#833AB4] to-[#405DE6] text-white font-bold text-base px-10 py-4 rounded-full
              shadow-[0_0_40px_rgba(193,53,132,0.3)] hover:shadow-[0_0_60px_rgba(193,53,132,0.5)]
              transition-all duration-300 hover:scale-105 active:scale-95
              before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-[#C13584] before:via-[#833AB4] before:to-[#405DE6] before:blur-xl before:opacity-40 before:-z-10">
              <span className="relative z-10">Book a FREE Consultation</span>
              <svg className="relative z-10 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </ConsultationModal>
          {/* <p className={`text-xs ${light ? 'text-muted-foreground' : 'text-gray-600'}`}>No credit card required · Free 30-min session</p> */}
        </div>
      </section>

    </div>
  );
}
