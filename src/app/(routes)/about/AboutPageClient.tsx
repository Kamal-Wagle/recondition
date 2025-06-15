"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Clock, Shield, Target, Heart, Star } from "lucide-react"

const stats = [
  { icon: Users, label: "Happy Customers", value: "2500+" },
  { icon: Award, label: "Years Experience", value: "12+" },
  { icon: Clock, label: "Vehicles Sold", value: "5000+" },
  { icon: Shield, label: "Customer Rating", value: "4.9/5" },
]

const values = [
  {
    icon: Target,
    title: "Quality First",
    description:
      "We ensure every vehicle meets our high standards with 50-point inspection before offering it to customers.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description:
      "Your satisfaction is our priority. We provide honest advice, transparent dealings, and lifetime support.",
  },
  {
    icon: Shield,
    title: "Trust & Reliability",
    description:
      "Built on trust since 2012, we maintain long-term relationships with our customers across Karnali Pradesh.",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service, vehicle quality, and customer experience.",
  },
]

const team = [
  {
    name: "Ram Bahadur Shahi",
    role: "Founder & Owner",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "12+ years experience in automobile industry with expertise in vehicle evaluation and customer service",
  },
  {
    name: "Sita Kumari Shahi",
    role: "Sales Manager",
    image: "/placeholder.svg?height=300&width=300",
    description: "Expert in customer relations, vehicle consultation, and helping customers find their perfect ride",
  },
  {
    name: "Krishna Bahadur KC",
    role: "Technical Expert",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Certified mechanic with 10+ years expertise in vehicle inspection, maintenance, and quality assurance",
  },
]

export default function AboutPageClient() {
  return (
    <>
      {/* SEO Schema for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Abc Recondition Surkhet",
            description: "Learn about Karnali Pradesh's most trusted second-hand bike dealer since 2012",
            url: "https://abcreconditionsurkhet.com/about",
            mainEntity: {
              "@type": "AutoDealer",
              name: "Abc Recondition Surkhet",
              foundingDate: "2012",
              founder: {
                "@type": "Person",
                name: "Ram Bahadur Shahi",
              },
              employee: team.map((member) => ({
                "@type": "Person",
                name: member.name,
                jobTitle: member.role,
                description: member.description,
              })),
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg mb-4 sm:mb-6">
              🏢 Our Story
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
              About <span className="text-gradient">Abc Recondition Surkhet</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your most trusted partner for premium quality second-hand bikes and scooters in Surkhet, Karnali Pradesh.
              Serving the community with excellence and integrity since 2012.
            </p>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 sm:mb-20"
          >
            <Card className="overflow-hidden shadow-2xl border-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-6 sm:p-8 lg:p-16 bg-gradient-to-br from-purple-50 to-blue-50">
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base mb-4 sm:mb-6">
                    ⭐ Since 2012
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-6 sm:mb-8">
                    Serving Karnali Pradesh for <span className="text-gradient">12+ Years</span>
                  </h2>
                  <div className="space-y-4 sm:space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
                    <p>
                      <strong>Abc Recondition Surkhet</strong> has been the leading destination for quality second-hand
                      bikes and scooters in Karnali Pradesh. We started with a simple mission: to provide reliable,
                      affordable transportation solutions to the people of Surkhet and surrounding areas.
                    </p>
                    <p>
                      Over the years, we have built an unmatched reputation for{" "}
                      <strong>honesty, quality, and exceptional customer service</strong>. Every vehicle in our
                      inventory undergoes our rigorous <strong>50-point inspection</strong> and reconditioning process
                      to ensure it meets our high standards.
                    </p>
                    <p>
                      We understand that buying a vehicle is a significant investment, and we&apos;re committed to helping
                      you make the right choice that fits your needs and budget. Our <strong>6-month warranty</strong>{" "}
                      and lifetime support give you complete peace of mind.
                    </p>
                  </div>
                </div>
                <div className="relative h-64 sm:h-96 lg:h-auto">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Abc Recondition Surkhet showroom exterior - premium second-hand bike dealer in Karnali Pradesh"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <Badge className="bg-white/90 text-gray-900 font-bold px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
                      📍 Located in Heart of Surkhet
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-20"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
                Our <span className="text-gradient">Achievements</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Numbers that speak for our commitment and success
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="text-center p-4 sm:p-8 hover-lift bg-white shadow-xl border-0">
                    <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
                    </div>
                    <div className="text-2xl sm:text-4xl font-black text-gray-900 mb-2 sm:mb-3">{stat.value}</div>
                    <div className="text-sm sm:text-lg text-gray-600 font-semibold">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-20"
          >
            <div className="text-center mb-8 sm:mb-16">
              <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg mb-4 sm:mb-6">
                💎 Our Values
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
                The Principles That <span className="text-gradient">Guide Us</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                These core values shape every decision we make and every interaction we have with our customers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full p-6 sm:p-8 text-center hover-lift bg-white shadow-xl border-0 group">
                    <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">{value.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Team */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-20"
          >
            <div className="text-center mb-8 sm:mb-16">
              <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg mb-4 sm:mb-6">
                👥 Our Team
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
                Meet Our <span className="text-gradient">Expert Team</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The dedicated professionals who make our success possible and ensure every customer gets the best
                experience
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="text-center overflow-hidden hover-lift bg-white shadow-xl border-0 group">
                    <div className="relative">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={`${member.name} - ${member.role} at Abc Recondition Surkhet`}
                        width={300}
                        height={300}
                        className="w-full h-56 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader className="pb-2 sm:pb-3">
                      <CardTitle className="text-xl sm:text-2xl font-bold">{member.name}</CardTitle>
                      <CardDescription>
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-xs sm:text-sm">
                          {member.role}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              <Card className="p-6 sm:p-10 hover-lift bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-xl">
                <CardHeader className="p-0 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center">
                      <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl font-black text-gray-900">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    To provide the people of Surkhet and Karnali Pradesh with access to{" "}
                    <strong>premium quality, affordable, and reliable</strong>
                    second-hand bikes and scooters. We aim to make transportation accessible to everyone while
                    maintaining the highest standards of service, integrity, and customer satisfaction.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 sm:p-10 hover-lift bg-gradient-to-br from-cyan-50 to-green-50 border-0 shadow-xl">
                <CardHeader className="p-0 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="bg-gradient-to-r from-cyan-600 to-green-600 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center">
                      <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl font-black text-gray-900">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    To become <strong>Nepal&apos;s most trusted and preferred destination</strong> for second-hand vehicles,
                    known for our unwavering commitment to quality, customer satisfaction, and contribution to
                    sustainable transportation solutions across the nation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="p-6 sm:p-12 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white border-0 shadow-2xl">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg mb-6 sm:mb-8">
                🌟 Why Choose Us
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 sm:mb-8">
                Experience the{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  Difference
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
                <div className="space-y-2 sm:space-y-4">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">🔍 50-Point Inspection</div>
                  <p className="text-sm sm:text-base text-blue-100">Every vehicle undergoes comprehensive inspection before sale</p>
                </div>
                <div className="space-y-2 sm:space-y-4">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">🛡️ 6-Month Warranty</div>
                  <p className="text-sm sm:text-base text-blue-100">Complete peace of mind with our comprehensive warranty</p>
                </div>
                <div className="space-y-2 sm:space-y-4">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">💰 Best Prices</div>
                  <p className="text-sm sm:text-base text-blue-100">Competitive pricing with transparent, no-hidden-cost policy</p>
                </div>
                <div className="space-y-2 sm:space-y-4">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">📋 Documentation Help</div>
                  <p className="text-sm sm:text-base text-blue-100">Complete assistance with all paperwork and registration</p>
                </div>
                <div className="space-y-2 sm:space-y-4">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">🔄 Trade-in Options</div>
                  <p className="text-sm sm:text-base text-blue-100">Get the best value for your old vehicle with our trade-in service</p>
                </div>
                <div className="space-y-2 sm:space-y-4">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">🎯 Lifetime Support</div>
                  <p className="text-sm sm:text-base text-blue-100">Ongoing support and maintenance advice for life</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}
