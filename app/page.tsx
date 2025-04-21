"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, BarChart3, PieChart, LineChart, Database, Wand2, Brain, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">DataViz Cloud</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </a>
            <a href="#reviews" className="text-sm hover:text-primary transition-colors">
              Reviews
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">
              About
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:inline-flex">
              Log in
            </Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Turn Your Data Into <span className="text-primary">Powerful Insights</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Upload your JSON and CSV files to instantly visualize your data with beautiful charts, tables, and
                AI-powered insights that help you make better decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
               <Link href="/visualize"><Button size="lg" className="text-md group">
                  Visualize Your Data
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-md">
                  See Demo
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white/60 backdrop-blur border">
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="h-2 w-2 rounded-full bg-red-400" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400" />
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="flex flex-col gap-4">
                      <div className="h-40 rounded-lg bg-blue-50 flex items-center justify-center">
                        <motion.div
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <BarChart3 className="h-16 w-16 text-primary" />
                        </motion.div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-3/4 bg-slate-200 rounded-full" />
                        <div className="h-3 w-1/2 bg-slate-200 rounded-full" />
                        <div className="h-3 w-2/3 bg-slate-200 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="absolute -top-6 -right-6 h-24 w-24 bg-primary/10 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-8 -left-8 h-32 w-32 bg-secondary/10 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="hidden md:block">
          <motion.div
            className="absolute top-1/4 right-10 h-8 w-8 bg-primary/20 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-10 h-12 w-12 bg-secondary/20 rounded-full"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-slate-500 mb-6">TRUSTED BY INNOVATIVE COMPANIES</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {["ACME Inc.", "TechGlobe", "DataCorp", "Statify", "Visua"].map((company) => (
              <div key={company} className="text-slate-400 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Visualization Features</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Transform complex data into clear, actionable insights with our advanced visualization tools.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="h-10 w-10 text-primary" />,
                title: "Import Any Data Format",
                description:
                  "Easily upload JSON, CSV, Excel files, or connect to your database for seamless data integration.",
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-primary" />,
                title: "Interactive Charts & Graphs",
                description: "Create beautiful, interactive visualizations with just a few clicks. No coding required.",
              },
              {
                icon: <Brain className="h-10 w-10 text-primary" />,
                title: "AI-Powered Insights",
                description: "Our AI analyzes your data to find patterns and insights you might have missed.",
              },
              {
                icon: <Wand2 className="h-10 w-10 text-primary" />,
                title: "One-Click Customization",
                description:
                  "Personalize your visualizations with our intuitive editor to match your brand or preferences.",
              },
              {
                icon: <LineChart className="h-10 w-10 text-primary" />,
                title: "Real-Time Updates",
                description: "Connect to live data sources for real-time visualization and monitoring.",
              },
              {
                icon: <PieChart className="h-10 w-10 text-primary" />,
                title: "Collaborative Dashboards",
                description: "Share and collaborate on dashboards with your team for better decision making.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful AI Assistant</h2>
              <p className="text-lg text-slate-600 mb-6">
                Our AI assistant helps you understand your data better by providing insights, answering questions, and
                suggesting visualizations.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Ask questions about your data in plain language",
                  "Get automated insights and anomaly detection",
                  "Receive visualization recommendations based on your data",
                  "Generate natural language summaries of complex datasets",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button>
                Try AI Assistant
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-medium">AI Assistant</div>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-slate-100 rounded-lg text-sm max-w-[80%]">
                    How has our customer retention changed over the last quarter?
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg text-sm ml-auto max-w-[80%]">
                    Based on your data, customer retention has improved by 12% in the last quarter. The most significant
                    improvement was in the enterprise segment, where retention increased by 18%.
                  </div>
                  <div className="p-3 border rounded-lg bg-white">
                    <div className="h-32 rounded bg-slate-100 flex items-center justify-center mb-3">
                      <LineChart className="h-12 w-12 text-slate-300" />
                    </div>
                    <div className="text-xs text-slate-500 text-center">Customer Retention Trend (Last 12 Months)</div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg text-sm ml-auto max-w-[80%]">
                    Would you like me to analyze which factors contributed most to this improvement?
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Join thousands of satisfied users who have transformed how they work with data.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Data Analyst at TechCorp",
                image: "/placeholder.svg?height=80&width=80",
                review:
                  "DataViz Cloud has completely transformed how our team works with data. The AI insights have helped us discover patterns we would have missed otherwise.",
              },
              {
                name: "Michael Chen",
                role: "Marketing Director",
                image: "/placeholder.svg?height=80&width=80",
                review:
                  "The ease of visualizing our marketing campaign data has been game-changing. What used to take days now takes minutes, and the insights are much clearer.",
              },
              {
                name: "Aisha Patel",
                role: "Startup Founder",
                image: "/placeholder.svg?height=80&width=80",
                review:
                  "As a non-technical founder, I was struggling to make sense of our data. DataViz Cloud makes it easy to create professional visualizations without any coding.",
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar>
                        <AvatarImage src={review.image} alt={review.name} />
                        <AvatarFallback>{review.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-slate-500">{review.role}</div>
                      </div>
                    </div>
                    <div className="mb-3 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-600">{review.review}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Data?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of teams who have already discovered the power of DataViz Cloud.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="secondary" size="lg">
                Visualize Your Data
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">DataViz Cloud</span>
              </div>
              <p className="text-sm">Transforming complex data into clear, actionable insights.</p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <a key={social} href="#" className="hover:text-white transition-colors">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                      <span className="sr-only">{social}</span>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "Case Studies", "Integrations", "AI Assistant"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Blog", "Documentation", "Help Center", "API", "Community"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Careers", "Contact", "Terms", "Privacy Policy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} DataViz Cloud. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="mx-2">•</span>
              <a href="#" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

