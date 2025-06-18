"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, CheckCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query";
import $axios from "@/lib/axios.instance";

interface Album {
  _id: string;
  name: string;
  price: number;
  year: string;
  mileage: string;
  images?: string[];
  condition: string;
  type: string;
  brand: string;
  engine: string;
  features?: string[];
}

const allVehicles = [
  {
    id: 1,
    name: "Honda CB Shine",
    price: "Rs. 85,000",
    originalPrice: "Rs. 95,000",
    year: "2020",
    mileage: "15,000 km",
    image: "/placeholder.svg?height=300&width=400",
    condition: "Excellent",
    type: "Bike",
    brand: "Honda",
    engine: "125cc",
    discount: "10%",
    features: ["Electric Start", "LED Headlight", "Disc Brake"],
  },
  {
    id: 2,
    name: "TVS Jupiter",
    price: "Rs. 65,000",
    originalPrice: "Rs. 75,000",
    year: "2019",
    mileage: "12,000 km",
    image: "/placeholder.svg?height=300&width=400",
    condition: "Good",
    type: "Scooter",
    brand: "TVS",
    engine: "110cc",
    discount: "13%",
    features: ["Bluetooth", "USB Charging", "LED DRL"],
  },
  {
    id: 3,
    name: "Yamaha FZ",
    price: "Rs. 1,20,000",
    originalPrice: "Rs. 1,35,000",
    year: "2021",
    mileage: "8,000 km",
    image: "/placeholder.svg?height=300&width=400",
    condition: "Excellent",
    type: "Bike",
    brand: "Yamaha",
    engine: "150cc",
    discount: "11%",
    features: ["ABS", "Digital Display", "LED Lighting"],
  },
  {
    id: 4,
    name: "Honda Activa",
    price: "Rs. 70,000",
    originalPrice: "Rs. 80,000",
    year: "2020",
    mileage: "18,000 km",
    image: "/placeholder.svg?height=300&width=400",
    condition: "Good",
    type: "Scooter",
    brand: "Honda",
    engine: "110cc",
    discount: "12%",
    features: ["Combi Brake", "LED Headlight", "Mobile Charger"],
  },
  {
    id: 5,
    name: "Bajaj Pulsar",
    price: "Rs. 95,000",
    originalPrice: "Rs. 1,10,000",
    year: "2019",
    mileage: "22,000 km",
    image: "/placeholder.svg?height=300&width=400",
    condition: "Good",
    type: "Bike",
    brand: "Bajaj",
    engine: "150cc",
    discount: "14%",
    features: ["Digital Console", "Split Seats", "Alloy Wheels"],
  },
  {
    id: 6,
    name: "Suzuki Access",
    price: "Rs. 75,000",
    originalPrice: "Rs. 85,000",
    year: "2021",
    mileage: "10,000 km",
    image: "/placeholder.svg?height=300&width=400",
    condition: "Excellent",
    type: "Scooter",
    brand: "Suzuki",
    engine: "125cc",
    discount: "12%",
    features: ["Bluetooth", "LED Package", "USB Charger"],
  },
  {
    id: 7,
    name: "Hero Splendor",
    price: "Rs. 55,000",
    originalPrice: "Rs. 65,000",
    year: "2018",
    mileage: "25,000 km",
    image: "/placeholder.svg?height=300&width=400",
    condition: "Good",
    type: "Bike",
    brand: "Hero",
    engine: "100cc",
    discount: "15%",
    features: ["Kick Start", "Tubeless Tyres", "Self Start"],
  },
  {
    id: 8,
    name: "TVS Apache",
    price: "Rs. 1,05,000",
    originalPrice: "Rs. 1,20,000",
    year: "2020",
    mileage: "16,000 km",
    image: "/placeholder.svg?height=300&width=400",
    condition: "Excellent",
    type: "Bike",
    brand: "TVS",
    engine: "160cc",
    discount: "12%",
    features: ["Race Tuned FI", "ABS", "LED DRL"],
  },
]


export default function BikesClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")
  const [conditionFilter, setConditionFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")

  const filteredVehicles = allVehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || vehicle.type.toLowerCase() === typeFilter
    const matchesBrand = brandFilter === "all" || vehicle.brand.toLowerCase() === brandFilter
    const matchesCondition = conditionFilter === "all" || vehicle.condition.toLowerCase() === conditionFilter

    let matchesPrice = true
    if (priceFilter !== "all") {
      const price = Number.parseInt(vehicle.price.replace(/[^\d]/g, ""))
      switch (priceFilter) {
        case "under-50k":
          matchesPrice = price < 50000
          break
        case "50k-1l":
          matchesPrice = price >= 50000 && price <= 100000
          break
        case "1l-2l":
          matchesPrice = price > 100000 && price <= 200000
          break
        case "above-2l":
          matchesPrice = price > 200000
          break
      }
    }

    return matchesSearch && matchesType && matchesBrand && matchesCondition && matchesPrice
  })


// Format Google Drive image URL
const formatDriveUrl = (url: string) => {
  const match = url.match(/\/d\/(.+?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};

const { data, isLoading, isError } = useQuery<Album[], Error>({
  queryKey: ["bikes"],
  queryFn: async () => {
    const response = await $axios.get("/api/bike");
    return response.data.bikes;
  },
});

  return (
    <>
      {/* SEO Schema for Bikes Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Second Hand Bikes and Scooters for Sale in Surkhet",
            description: "Browse our complete collection of premium second-hand bikes and scooters",
            url: "https://abcreconditionsurkhet.com/bikes",
            numberOfItems: allVehicles.length,
            itemListElement: allVehicles.map((vehicle, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Vehicle",
                name: vehicle.name,
                description: `${vehicle.year} ${vehicle.name} - ${vehicle.condition} condition`,
                offers: {
                  "@type": "Offer",
                  price: vehicle.price.replace(/[^\d]/g, ""),
                  priceCurrency: "NPR",
                  availability: "https://schema.org/InStock",
                },
                vehicleModelDate: vehicle.year,
                mileageFromOdometer: vehicle.mileage,
                vehicleCondition: vehicle.condition,
                url: `https://abcreconditionsurkhet.com/bikes/${vehicle.id}`,
              },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-6 py-2 text-lg mb-6">
              🏍️ Complete Collection
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              All <span className="text-gradient">Bikes & Scooters</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Browse our complete collection of premium quality second-hand bikes and scooters. Each vehicle is
              thoroughly inspected and comes with our 6-month warranty guarantee.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl mb-12 border-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Filter Vehicles</h3>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-3 py-1">
                {allVehicles.length} Available
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                />
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl">
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="bike">🏍️ Bikes</SelectItem>
                  <SelectItem value="scooter">🛵 Scooters</SelectItem>
                </SelectContent>
              </Select>

              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="yamaha">Yamaha</SelectItem>
                  <SelectItem value="bajaj">Bajaj</SelectItem>
                  <SelectItem value="tvs">TVS</SelectItem>
                  <SelectItem value="suzuki">Suzuki</SelectItem>
                  <SelectItem value="hero">Hero</SelectItem>
                </SelectContent>
              </Select>

              <Select value={conditionFilter} onValueChange={setConditionFilter}>
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="excellent">⭐ Excellent</SelectItem>
                  <SelectItem value="good">✅ Good</SelectItem>
                  <SelectItem value="fair">⚠️ Fair</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-50k">Under Rs. 50,000</SelectItem>
                  <SelectItem value="50k-1l">Rs. 50,000 - 1,00,000</SelectItem>
                  <SelectItem value="1l-2l">Rs. 1,00,000 - 2,00,000</SelectItem>
                  <SelectItem value="above-2l">Above Rs. 2,00,000</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="h-12 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold rounded-xl"
                onClick={() => {
                  setSearchTerm("")
                  setTypeFilter("all")
                  setBrandFilter("all")
                  setConditionFilter("all")
                  setPriceFilter("all")
                }}
              >
                Clear All
              </Button>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-lg">
                Showing <span className="font-bold text-purple-600">{filteredVehicles.length}</span> of{" "}
                <span className="font-bold">{allVehicles.length}</span> vehicles
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-green-500 text-green-700">
                  ✅ All Inspected
                </Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-700">
                  🛡️ 6-Month Warranty
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Vehicle Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading vehicles...</p>
              </div>
            ) : isError ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-600">Error loading vehicles. Please try again later.</p>
              </div>
            ) : (
              data?.map((vehicle, index) => (
                <motion.div
                  key={vehicle._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="overflow-hidden hover-lift bg-white shadow-xl border-0 group h-full">
                    <div className="relative">
                      <Image
                        src={vehicle.images?.[0] ? formatDriveUrl(vehicle.images[0]) : "/placeholder.svg"}
                        alt={`${vehicle.name} ${vehicle.year} - ${vehicle.condition} condition second-hand ${vehicle.type?.toLowerCase() || 'vehicle'} for sale in Surkhet`}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                        {vehicle.type || 'Vehicle'}
                      </Badge>
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold">
                        {vehicle.condition || 'New'}
                      </Badge>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex justify-between items-start text-lg">
                        <span className="font-bold">{vehicle.name}</span>
                        <div className="text-right">
                          <div className="text-xl font-black text-green-600">Rs. {vehicle.price}</div>
                        </div>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <div className="flex items-center gap-3 text-gray-600">
                          <span className="font-semibold">{vehicle.year}</span>
                          <span>•</span>
                          <span className="font-semibold">{vehicle.mileage} km</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {vehicle.engine || 'N/A'}
                          </Badge>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {vehicle.features?.slice(0, 2).map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {vehicle.brand || 'N/A'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {vehicle.engine || 'N/A'}
                          </Badge>
                        </div>
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold"
                        >
                          <Link href={`/bikes/${vehicle._id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* No Results */}
          {filteredVehicles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="bg-white p-12 rounded-2xl shadow-xl border-0 max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No vehicles found</h3>
                <p className="text-gray-600 mb-6">
                  No vehicles match your current search criteria. Try adjusting your filters.
                </p>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold"
                  onClick={() => {
                    setSearchTerm("")
                    setTypeFilter("all")
                    setBrandFilter("all")
                    setConditionFilter("all")
                    setPriceFilter("all")
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          {filteredVehicles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Card className="p-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white border-0 shadow-2xl">
                <h2 className="text-3xl lg:text-4xl font-black mb-6">Can&apos;t Find What You&apos;re Looking For?</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  We get new vehicles every week! Contact us with your requirements and we&apos;ll help you find your perfect
                  ride.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-8 py-4"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold text-lg px-8 py-4"
                  >
                    <Link href="tel:+977-123-456-789">📞 Call Now</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
