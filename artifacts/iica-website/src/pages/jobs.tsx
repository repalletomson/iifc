import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Jobs() {
  const jobs = [
    { id: 1, title: "Senior Faculty - Kathak", type: "Teaching", location: "Mumbai / Hybrid", deadline: "Oct 30, 2025" },
    { id: 2, title: "Sitar Accompanist for European Tour", type: "Performance", location: "Europe (Tour)", deadline: "Nov 15, 2025" },
    { id: 3, title: "Classical Fusion Producer", type: "Collaboration", location: "Remote", deadline: "Nov 05, 2025" },
    { id: 4, title: "Event Curator", type: "Events", location: "New Delhi", deadline: "Oct 25, 2025" },
    { id: 5, title: "Visiting Faculty - Hindustani Vocal", type: "Teaching", location: "Bangalore", deadline: "Dec 01, 2025" },
    { id: 6, title: "Tabla Player for Studio Recording", type: "Gigs", location: "Chennai", deadline: "Oct 20, 2025" },
    { id: 7, title: "Cultural Brand Manager", type: "Management", location: "Mumbai", deadline: "Nov 10, 2025" },
    { id: 8, title: "Odissi Soloist for Annual Fest", type: "Performance", location: "Kolkata", deadline: "Dec 15, 2025" },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Jobs & Gigs</h1>
          <p className="text-gray-400 text-lg">Premium opportunities for performers, educators, and arts management professionals across the globe.</p>
        </motion.div>

        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="w-full md:w-1/2">
            <Input 
              placeholder="Search roles, skills, or locations..." 
              className="bg-[#111] border-white/10 h-14 rounded-xl px-6 text-white"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {['All', 'Teaching', 'Performance', 'Collaboration', 'Management'].map((filter, i) => (
              <button 
                key={filter}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  i === 0 ? 'gradient-bg text-white' : 'bg-[#111] border border-white/10 text-gray-400 hover:text-white hover:bg-[#222]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#833AB4]/50 transition-colors group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
            >
              <div>
                <div className="flex items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C13584] bg-[#C13584]/10 px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {job.location}</div>
                  <div className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> Apply by: {job.deadline}</div>
                </div>
              </div>
              
              <Button className="gradient-bg text-white w-full sm:w-auto h-12 px-8 rounded-xl opacity-90 group-hover:opacity-100 shrink-0">
                Apply Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
