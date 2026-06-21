import React from 'react';
import { motion } from 'framer-motion';

export default function CEO() {
  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="sticky top-32"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative gradient-border p-1">
                <div className="w-full h-full bg-[#111] rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                  <img src="/images/ceo.png" alt="A. Sharma" className="w-full h-full object-cover z-0" />
                  <div className="absolute bottom-6 left-6 z-20">
                    <h2 className="font-serif text-3xl font-bold text-white mb-1">A. Sharma</h2>
                    <p className="text-[#d4a853] font-medium tracking-wider text-sm uppercase">Founder & CEO, IICA</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Editorial Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-12">A Message from Our CEO</h1>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 lead font-serif text-2xl italic leading-relaxed text-[#d4a853] border-l-4 border-gradient-l pl-6 mb-12">
                  "For too long, the brilliant classical artists of India have been revered for their talent but underserved by the systems meant to support them. Our mission is to change that narrative."
                </p>

                <p className="text-gray-300">
                  When I founded the International Indian Culture & Arts, I had one clear objective: to build a platform that treats Indian classical and traditional arts with the same premium positioning, respect, and market value as global western classical arts.
                </p>

                <p className="text-gray-300">
                  We observed a glaring gap. Exceptionally talented artists were struggling to navigate the digital landscape, build sustainable brands, and reach international audiences. They were masters of their craft but lacked the modern tools of legacy building.
                </p>

                <h3 className="font-serif text-3xl text-white mt-12 mb-6">Bridging the Gap</h3>

                <p className="text-gray-300">
                  At IICA, we are not just an agency; we are a cultural movement powered by technology. We provide SEO-driven life journeys, HD-quality promotional tools, and strategic collaborations that ensure an artist's brand outlives any single performance.
                </p>

                <p className="text-gray-300">
                  True artistry requires dedication, riyaz, and soul. Our job is to handle everything else. From ensuring you rank at the top of search results to positioning your brand for lucrative international opportunities, we build the infrastructure so you can focus on the art.
                </p>

                <h3 className="font-serif text-3xl text-white mt-12 mb-6">The Road Ahead</h3>

                <p className="text-gray-300">
                  As we look to the future, IICA is expanding its footprint globally. We are building exclusive networks in Europe and the Americas to facilitate seamless cultural exchange. We are committed to making our artists not just performers, but global cultural ambassadors.
                </p>

                <div className="mt-16 pt-8 border-t border-white/10">
                  <div className="font-serif text-4xl mb-2 gradient-text w-max">A. Sharma</div>
                  <div className="text-gray-500 uppercase tracking-widest text-xs">Chief Executive Officer</div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
