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
import { useTheme } from '@/lib/themeContext';
import { extractInstagramCode } from '@/lib/googleSheets';

const membershipFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  profession: z.string().min(2, "Please enter your profession."),
  artForm: z.string().min(2, "Please specify your art form."),
});

export default function Membership() {
  const { toast } = useToast();
  const { theme } = useTheme();
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
    const msg = `*IICA Membership Application*%0A%0A*Name:* ${encodeURIComponent(values.name)}%0A*Email:* ${encodeURIComponent(values.email)}%0A*Phone:* ${encodeURIComponent(values.phone)}%0A*Profession:* ${encodeURIComponent(values.profession)}%0A*Art Form:* ${encodeURIComponent(values.artForm)}`;
    window.open(`https://wa.me/919542758814?text=${msg}`, '_blank', 'noopener,noreferrer');
    toast({
      title: "Application Submitted",
      description: "You are being redirected to WhatsApp. We will get back to you shortly!",
    });
    setIsSubmitted(true);
    form.reset();
  }

  return (
    <div className="bg-background text-foreground min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 bg-gradient-to-b pointer-events-none ${theme === 'light' ? 'from-[#833AB4]/10 via-[#C13584]/5 to-background' : 'from-[#833AB4]/20 via-[#C13584]/10 to-black'}`} />
        </div>
        <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight ${theme === 'light' ? 'text-foreground' : 'text-white'}`}
          >
            Exclusive Membership <br/>
            <span className="gradient-text">with IICA</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'}`}
          >
            Elevating your brand value beyond a lifetime. Join a curated network of India's finest classical and traditional artists.
          </motion.p>
        </div>
      </section>

      {/* Section A - SEO Life Journey */}
      <section className={`py-24 transition-colors ${theme === 'light' ? 'bg-muted' : 'bg-[#0a0a0a]'}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`font-serif text-4xl font-bold mb-6 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>SEO-Powered Life Journey</h2>
              <p className={`text-lg leading-relaxed mb-8 ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>
                When authentic life journeys of artists are published on a secure web platform powered with latest technologies which enable visibility and enhance branding mileage of an artistic brand, it is possible to get authentic data-based proof of an artist's demand, in India & abroad.
              </p>
              <ul className="space-y-4">
                {[
                  "Digital Legacy Documentation",
                  "Search Engine Dominance",
                  "Verified Authentic Data",
                  "Global Visibility Metrics"
                ].map((item, i) => (
                  <li key={i} className={`flex items-center ${theme === 'light' ? 'text-foreground' : 'text-gray-300'}`}>
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
              className={`glass-card p-6 rounded-2xl border relative overflow-hidden ${theme === 'light' ? 'border-border' : 'border-white/10'}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C13584] rounded-full filter blur-[64px] opacity-20" />
              <div className={`flex items-center justify-between mb-8 pb-4 ${theme === 'light' ? 'border-b border-border' : 'border-b border-white/10'}`}>
                <h4 className={`font-medium ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>Brand Analytics</h4>
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
      <section className={`py-24 transition-colors ${theme === 'light' ? 'bg-background' : 'bg-black'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`font-serif text-4xl font-bold mb-4 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>HD-Quality Promotion of Your Craft</h2>
            <p className={`max-w-2xl mx-auto ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>Showcase your artistry with premium production values that command respect on the global stage.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Sandipan Parial", code: "DSKrHNPCa33", type: "reel" },
              { name: "Neecia Majolly", code: "DSHnkrAiZRI", type: "p" },
              { name: "Abhishek Chouhan", code: "DYANQQ9OZ5k", type: "reel" },
              { name: "Shatavisha Mukherjee", code: "DRl6iF2ibNS", type: "reel" },
            ].map((item, i) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl overflow-hidden border transition-colors ${theme === 'light' ? 'bg-card border-border' : 'bg-[#111] border-white/5'}`}
              >
                <iframe
                  src={`https://www.instagram.com/${item.type}/${item.code}/embed/`}
                  className="w-full aspect-[9/16]"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  loading="lazy"
                />
                <div className="p-3">
                  <p className={`text-xs font-medium text-center truncate ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{item.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section C - Collaboration */}
      <section className={`py-24 overflow-hidden transition-colors ${theme === 'light' ? 'bg-muted' : 'bg-[#0a0a0a]'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`font-serif text-4xl font-bold mb-4 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>Collaboration with Like-Minded Artists</h2>
            <p className={`max-w-2xl mx-auto ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>Connect, create, and elevate with peers who share your commitment to excellence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "Debasmita Bhattacharya", code: "DO3c-GgjGyM" },
              { name: "Sandeep Vasishta", code: "CdV4q2BPDKR" },
              { name: "Anirban Bhattacharyya", code: "DXLcnKKDFrX" },
            ].map((item, i) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl overflow-hidden border transition-colors ${theme === 'light' ? 'bg-card border-border' : 'bg-[#111] border-white/5'}`}
              >
                <iframe
                  src={`https://www.instagram.com/reel/${extractInstagramCode(item.code)}/embed/`}
                  className="w-full aspect-[9/16]"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  loading="lazy"
                />
                <div className="p-3">
                  <p className={`text-xs font-medium text-center truncate ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>{item.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className={`py-24 transition-colors ${theme === 'light' ? 'bg-background' : 'bg-black'}`} id="apply">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className={`glass-card p-10 rounded-2xl gradient-border ${theme === 'light' ? 'bg-card' : ''}`}>
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
                <h3 className={`font-serif text-3xl font-bold mb-4 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>Application Received</h3>
                <p className={theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}>Our curation committee will review your profile and contact you within 48 hours.</p>
              </motion.div>
            ) : (
              <>
                <h2 className={`font-serif text-3xl font-bold mb-8 text-center ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>Apply for Membership</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={theme === 'light' ? 'text-foreground' : 'text-gray-300'}>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" className={`h-12 ${theme === 'light' ? 'bg-background border-border' : 'bg-[#111] border-white/10'}`} {...field} />
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
                            <FormLabel className={theme === 'light' ? 'text-foreground' : 'text-gray-300'}>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" className={`h-12 ${theme === 'light' ? 'bg-background border-border' : 'bg-[#111] border-white/10'}`} {...field} />
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
                            <FormLabel className={theme === 'light' ? 'text-foreground' : 'text-gray-300'}>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" className={`h-12 ${theme === 'light' ? 'bg-background border-border' : 'bg-[#111] border-white/10'}`} {...field} />
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
                            <FormLabel className={theme === 'light' ? 'text-foreground' : 'text-gray-300'}>Profession</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Musician, Dancer" className={`h-12 ${theme === 'light' ? 'bg-background border-border' : 'bg-[#111] border-white/10'}`} {...field} />
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
                            <FormLabel className={theme === 'light' ? 'text-foreground' : 'text-gray-300'}>Specific Art Form</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Sitar, Kathak" className={`h-12 ${theme === 'light' ? 'bg-background border-border' : 'bg-[#111] border-white/10'}`} {...field} />
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
