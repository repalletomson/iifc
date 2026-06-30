import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/lib/themeContext";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  profession: z.string().min(2, "Please enter your profession."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

interface ConsultationModalProps {
  children: React.ReactNode;
}

export function ConsultationModal({ children }: ConsultationModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profession: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const msg = `*Free Consultation Request*%0A%0A*Name:* ${encodeURIComponent(values.name)}%0A*Email:* ${encodeURIComponent(values.email)}%0A*Phone:* ${encodeURIComponent(values.phone)}%0A*Profession:* ${encodeURIComponent(values.profession)}%0A*Message:* ${encodeURIComponent(values.message)}`;
    window.open(`https://wa.me/919542758814?text=${msg}`, '_blank', 'noopener,noreferrer');
    toast({
      title: "Request Submitted",
      description: "You are being redirected to WhatsApp. We will get back to you shortly!",
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[500px] border transition-colors ${
        theme === 'light'
          ? 'bg-white border-border text-foreground'
          : 'bg-[#0a0a0a] border-white/10 text-white'
      }`}>
        <DialogHeader>
          <DialogTitle className={`font-serif text-2xl ${
            theme === 'light' ? 'text-foreground' : 'text-white'
          }`}>Book a Free Consultation</DialogTitle>
          <DialogDescription className={theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}>
            Fill out the form below and our legacy advisors will contact you to discuss your brand.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Pt. Ravi Shankar" 
                        className={theme === 'light' ? 'bg-background border-input' : 'bg-black/50 border-white/10'} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="artist@example.com" 
                          type="email" 
                          className={theme === 'light' ? 'bg-background border-input' : 'bg-black/50 border-white/10'} 
                          {...field} 
                        />
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
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+91 98765 43210" 
                          className={theme === 'light' ? 'bg-background border-input' : 'bg-black/50 border-white/10'} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession / Art Form</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Sitar Player, Kathak Dancer, etc." 
                        className={theme === 'light' ? 'bg-background border-input' : 'bg-black/50 border-white/10'} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your current branding goals..." 
                        className={`resize-none h-24 ${
                          theme === 'light' ? 'bg-background border-input' : 'bg-black/50 border-white/10'
                        }`}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-2">
                <Button type="submit" className="w-full gradient-bg text-white h-12 text-md">
                  Submit Request
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
