"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  MapPin,
  Wrench,
  Shield,
  Clock,
  Users,
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
  Heart,
  ThumbsUp,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import { useQuery } from "@tanstack/react-query";
import $axios from "@/lib/axios.instance"
import Footer from "@/components/Footer"

interface Bike {
  _id: string;
  name: string;
  price: string;
  year: string;
  mileage: string;
  images: string[];
  condition: string;
  type: string;
  brand: string;
  engine: string;
  fuelType: string;
  transmission: string;
  color: string;
  owners: string;
  insurance: string;
  registration: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  fileId?: string;
  createdAt: string;
  updatedAt?: string;
  discount?: string;
  originalPrice?: string;
}

const services = [
  {
    icon: Wrench,
    title: "Expert Inspection",
    description: "Every vehicle undergoes thorough 50-point inspection before sale",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "We guarantee the quality and condition with 6-month warranty",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Fast and efficient buying process completed within 2 hours",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Customer Support",
    description: "24/7 dedicated support team to help you find your perfect ride",
    color: "from-orange-500 to-red-500",
  },
]

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Surkhet",
    rating: 5,
    comment: "Excellent service! Got my dream bike at an amazing price. The team was very helpful and professional.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Sita Sharma",
    location: "Birendranagar",
    rating: 5,
    comment: "Best place for second-hand vehicles in Karnali. Quality is top-notch and prices are very reasonable.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Mohan Thapa",
    location: "Dailekh",
    rating: 5,
    comment: "Bought a scooter last month. Still running perfectly! Great after-sales support too.",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const stats = [
  { icon: Users, label: "Happy Customers", value: "2500+", color: "text-blue-600" },
  { icon: Award, label: "Years Experience", value: "12+", color: "text-green-600" },
  { icon: TrendingUp, label: "Vehicles Sold", value: "5000+", color: "text-purple-600" },
  { icon: ThumbsUp, label: "Customer Rating", value: "4.9/5", color: "text-orange-600" },
]

const brands = [
  { name: "Honda", logo: "/honda.jpg" },
  { name: "Yamaha", logo: "/yamaha.png" },
  { name: "TVS", logo: "/tvs.jpg" },
  { name: "Bajaj", logo: "/bajaj.png" },
  { name: "Suzuki", logo: "/suzuki.png" },
  { name: "Hero", logo: "/hero.png" },
]

export default function HomePage() {
  // for map bike
  const { data: bikes, isLoading, isError } = useQuery<Bike[], Error>({
    queryKey: ["bikes"],
    queryFn: async () => {
      const response = await $axios.get("/api/bike");
      return response.data.bikes;
    },
  });

  // Get first 6 bikes from the data
  const displayBikes = bikes?.slice(0, 6) || [];

// Format Google Drive image URL
const formatDriveUrl = (url: string) => {
  const match = url.match(/\/d\/(.+?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading bikes. Please try again later.</p>
        </div>
      </div>
    );
  }

  // here map only six bikes
  return (
    <>
      {/* SEO Schema for HomePage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Home - Abc Recondition Surkhet",
            description:
              "Premium second-hand bikes and scooters in Surkhet, Karnali Pradesh. Trusted by 2500+ customers.",
            url: "https://abcreconditionsurkhet.com",
            mainEntity: {
              "@type": "AutoDealer",
              name: "Abc Recondition Surkhet",
              offers: displayBikes.map((bike) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Vehicle",
                  name: bike.name,
                  vehicleModelDate: bike.year,
                  mileageFromOdometer: bike.mileage,
                  vehicleCondition: bike.condition,
                },
                price: bike.price.replace("Rs. ", "").replace(",", ""),
                priceCurrency: "NPR",
              })),
            },
          }),
        }}
      />
      <Navbar/>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-float" />
            <div
              className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-500/20 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 sm:space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm mb-4 sm:mb-6">
                    🔥 #1 Trusted Dealer in Karnali Pradesh
                  </Badge>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
                  Find Your Perfect
                  <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                    Dream Ride
                  </span>
                </h1>

                <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-lg leading-relaxed">
                  Premium quality pre-owned bikes and scooters in Surkhet.
                  <span className="text-yellow-400 font-semibold"> Trusted by 2500+ happy customers</span> across
                  Karnali Pradesh.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-2xl hover:shadow-yellow-500/25"
                    >
                      <Link href="/bikes">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Browse All Vehicles
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-white text-white hover:bg-white hover:text-purple-900 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-sm"
                    >
                      <Link href="/contact">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Contact Us
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 sm:pt-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                    <span className="text-base sm:text-lg font-medium">Surkhet, Karnali Pradesh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-base sm:text-lg font-medium">4.9/5 Rating (500+ Reviews)</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative hidden lg:block"
              >
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=600&width=700"
                    alt="Premium second-hand bikes and scooters at Abc Recondition Surkhet showroom"
                    width={700}
                    height={600}
                    className="rounded-2xl shadow-2xl hover-lift"
                    priority
                  />
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow-lg animate-bounce">
                    Special Offer!
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6">
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
                  <Card className="text-center p-4 sm:p-8 hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <div
                      className={`bg-gradient-to-br from-purple-100 to-blue-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}
                    >
                      <stat.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.color}`} />
                    </div>
                    <div className="text-2xl sm:text-4xl font-black text-gray-900 mb-2 sm:mb-3">{stat.value}</div>
                    <div className="text-sm sm:text-lg text-gray-600 font-semibold">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Vehicles */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-16"
            >
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg mb-4 sm:mb-6">
                ⭐ Featured Collection
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
                Premium <span className="text-gradient">Vehicles</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Handpicked selection of the finest second-hand bikes and scooters, each thoroughly inspected and
                certified for your peace of mind.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12 sm:py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading bikes...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {displayBikes.map((bike, index) => (
                  <motion.div
                    key={bike._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <Card className="overflow-hidden hover-lift bg-white shadow-xl border-0 group">
                      <div className="relative">
                        <Image
                          src={bike.images?.[0] ? formatDriveUrl(bike.images[0]) : "/placeholder.svg"}
                          alt={`${bike.name} ${bike.year} - ${bike.condition} condition second-hand ${bike.type.toLowerCase()} for sale in Surkhet`}
                          width={400}
                          height={300}
                          className="w-full h-80 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs sm:text-sm">
                          {bike.type}
                        </Badge>
                        <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xs sm:text-sm">
                          {bike.discount} OFF
                        </Badge>
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                          <div className="flex flex-wrap gap-1">
                            {bike.features?.slice(0, 2).map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-white/90 text-gray-700">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <CardHeader className="pb-2 sm:pb-3">
                        <CardTitle className="flex justify-between items-start text-lg sm:text-xl">
                          <span className="font-bold">{bike.name}</span>
                          <div className="text-right">
                            <div className="text-xl sm:text-2xl font-black text-green-600">{bike.price}</div>
                            <div className="text-xs sm:text-sm text-gray-500 line-through">{bike.originalPrice}</div>
                          </div>
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                          <div className="flex items-center gap-2 sm:gap-4 text-gray-600">
                            <span className="font-semibold">{bike.year}</span>
                            <span>•</span>
                            <span className="font-semibold">{bike.mileage}</span>
                            <span>•</span>
                            <Badge
                              variant="outline"
                              className={`text-xs sm:text-sm ${
                                bike.condition === "Excellent"
                                  ? "border-green-500 text-green-700"
                                  : "border-yellow-500 text-yellow-700"
                              }`}
                            >
                              {bike.condition}
                            </Badge>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            {bike.features?.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                                <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <Button
                            asChild
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-sm sm:text-lg py-2 sm:py-3"
                          >
                            <Link href={`/bikes/${bike._id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="text-center mt-8 sm:mt-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto mx-auto">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                >
                  <Link href="/bikes">View All 200+ Vehicles</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-16"
            >
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg mb-4 sm:mb-6">
                🛡️ Our Promise
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
                Why Choose <span className="text-gradient">Us?</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We provide unmatched service quality and customer satisfaction that sets us apart from other dealers in
                the region.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="text-center p-6 sm:p-8 hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-xl group h-full">
                    <div
                      className={`bg-gradient-to-br ${service.color} w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">{service.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Trusted <span className="text-gradient">Brands</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">We deal with all major motorcycle and scooter brands</p>
            </motion.div>

            <div className="overflow-hidden w-full py-6">
  <div className="flex w-max animate-[scroll_25s_linear_infinite] space-x-8">
    {[...brands, ...brands].map((brand, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        className="text-center flex-shrink-0 w-32 h-20 flex items-center justify-center"
      >
        <Image
          src={brand.logo || "/placeholder.svg"}
          alt={`${brand.name} motorcycles and scooters available at Abc Recondition Surkhet`}
          width={120}
          height={60}
          className="mx-auto hover:grayscale-0 transition-all duration-300"
        />
      </motion.div>
    ))}
  </div>

  {/* 👇 Marquee keyframes inline */}
  <style jsx>{`
    @keyframes scroll {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  `}</style>
</div>

          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-16"
            >
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg mb-4 sm:mb-6">
                💬 Customer Stories
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6">
                What Our{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  Customers
                </span>{" "}
                Say
              </h2>
              <p className="text-base sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-6 sm:p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover-lift">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={`${testimonial.name} - Happy customer from ${testimonial.location}`}
                        width={60}
                        height={60}
                        className="rounded-full w-12 h-12 sm:w-14 sm:h-14"
                      />
                      <div>
                        <h4 className="font-bold text-base sm:text-lg">{testimonial.name}</h4>
                        <p className="text-sm sm:text-base text-blue-200">{testimonial.location}</p>
                      </div>
                    </div>
                    <div className="flex mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-blue-100 leading-relaxed italic">&quot;{testimonial.comment}&quot;</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl animate-float" />
            <div
              className="absolute bottom-10 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-white/10 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge className="bg-white/20 text-white font-semibold px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg mb-6 sm:mb-8">🚀 Ready to Ride?</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 sm:mb-8">
                Find Your Perfect Ride <span className="text-yellow-300">Today!</span>
              </h2>
              <p className="text-base sm:text-xl lg:text-2xl text-blue-100 mb-8 sm:mb-12 leading-relaxed">
                Visit our showroom in Surkhet or contact us for personalized assistance.
                <span className="text-yellow-300 font-semibold"> Special financing options available!</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold text-base sm:text-xl px-6 sm:px-10 py-4 sm:py-6 shadow-2xl"
                  >
                    <Link href="/contact">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                      Visit Our Showroom
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold text-base sm:text-xl px-6 sm:px-10 py-4 sm:py-6 backdrop-blur-sm"
                  >
                    <Link href="tel:+977-123-456-789">📞 Call: +977-123-456-789</Link>
                  </Button>
                </motion.div>
              </div>

              <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2">Open Daily</div>
                  <div className="text-sm sm:text-base text-blue-100">9:00 AM - 6:00 PM</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2">Free Inspection</div>
                  <div className="text-sm sm:text-base text-blue-100">For All Vehicles</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2">Easy Financing</div>
                  <div className="text-sm sm:text-base text-blue-100">Low Interest Rates</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
