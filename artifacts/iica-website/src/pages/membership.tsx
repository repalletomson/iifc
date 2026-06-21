import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const membershipFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  profession: z.string().min(2, "Please enter your profession."),
  artForm: z.string().min(2, "Please specify your art form."),
});

export default function Membership() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof membershipFormSchema>>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profession: "",
      artForm: "",
    },
  });

  function onSubmit(values: z.infer<typeof membershipFormSchema>) {
    console.log(values);
    setIsSubmitted(true);
  }

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#833AB4]/20 via-[#C13584]/10 to-black pointer-events-none" />
        </div>
        <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Exclusive Membership <br/>
            <span className="gradient-text">with IICA</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300"
          >
            Elevating your brand value beyond a lifetime. Join a curated network of India's finest classical and traditional artists.
          </motion.p>
        </div>
      </section>

      {/* Section A - SEO Life Journey */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl font-bold mb-6">SEO-Powered Life Journey</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                When authentic life journeys of artists are published on a secure web platform powered with latest technologies which enable visibility and enhance branding mileage of an artistic brand, it is possible to get authentic data-based proof of an artist's demand, in India & abroad.
              </p>
              <ul className="space-y-4">
                {[
                  "Digital Legacy Documentation",
                  "Search Engine Dominance",
                  "Verified Authentic Data",
                  "Global Visibility Metrics"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 rounded-full gradient-bg mr-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C13584] rounded-full filter blur-[64px] opacity-20" />
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <h4 className="font-medium text-white">Brand Analytics</h4>
                <span className="text-xs text-green-400">+24.5% Global Reach</span>
              </div>
              {/* Fake chart */}
              <div className="h-48 flex items-end justify-between space-x-2">
                {[40, 70, 45, 90, 65, 100, 85].map((h, i) => (
                  <div key={i} className="w-full bg-gradient-to-t from-[#833AB4] to-[#C13584] rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section B - HD Promotion */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">HD-Quality Promotion of Your Craft</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Showcase your artistry with premium production values that command respect on the global stage.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Sandipan Parial", "Neecia Majolly", "Abhishek Chouhan", "Shatavisha Mukherjee"].map((name, i) => (
              <motion.div 
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="aspect-[9/16] bg-[#111] relative p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-bold mr-2">{name.charAt(0)}</div>
                      <span className="text-sm font-medium">{name}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">Reel Coming Soon</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section C - Collaboration */}
      <section className="py-24 bg-[#0a0a0a] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Collaboration with Like-Minded Artists</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Connect, create, and elevate with peers who share your commitment to excellence.</p>
          </div>

          <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full text-white/20" viewBox="0 0 100 100">
              <motion.polygon 
                points="50,15 85,75 15,75" 
                fill="none" 
                stroke="url(#grad1)" 
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#833AB4" />
                  <stop offset="50%" stopColor="#C13584" />
                  <stop offset="100%" stopColor="#E1306C" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center">
              <div className="w-20 h-20 rounded-full gradient-bg mb-2 mx-auto flex items-center justify-center border-4 border-black">
                <span className="text-xl font-bold">DB</span>
              </div>
              <span className="text-sm font-medium">Debasmita Bhattacharya</span>
            </div>

            <div className="absolute bottom-[20%] right-[10%] text-center">
              <div className="w-20 h-20 rounded-full gradient-bg mb-2 mx-auto flex items-center justify-center border-4 border-black">
                <span className="text-xl font-bold">SV</span>
              </div>
              <span className="text-sm font-medium">Sandeep Vasishta</span>
            </div>

            <div className="absolute bottom-[20%] left-[10%] text-center">
              <div className="w-20 h-20 rounded-full gradient-bg mb-2 mx-auto flex items-center justify-center border-4 border-black">
                <span className="text-xl font-bold">AB</span>
              </div>
              <span className="text-sm font-medium">Anirban Bhattacharyya</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-black" id="apply">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="glass-card p-10 rounded-2xl gradient-border">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4">Application Received</h3>
                <p className="text-gray-400">Our curation committee will review your profile and contact you within 48 hours.</p>
              </motion.div>
            ) : (
              <>
                <h2 className="font-serif text-3xl font-bold mb-8 text-center">Apply for Membership</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" className="bg-[#111] border-white/10 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" className="bg-[#111] border-white/10 h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" className="bg-[#111] border-white/10 h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="profession"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Profession</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Musician, Dancer" className="bg-[#111] border-white/10 h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="artForm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Specific Art Form</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Sitar, Kathak" className="bg-[#111] border-white/10 h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full gradient-bg text-white h-14 text-lg mt-8 hover:opacity-90">
                      Submit Application
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
