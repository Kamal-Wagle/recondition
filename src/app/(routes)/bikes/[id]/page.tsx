"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Gauge, Fuel, Settings, Shield, Phone, Mail } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import $axios from "@/lib/axios.instance"
import { useParams } from "next/navigation";
import { ReactNode } from "react";

// Define types for the bike data
interface BikeSpecifications {
  [key: string]: string | number;
}

interface Bike {
  name: string;
  brand?: string;
  year: number;
  engine?: string;
  price: number;
  condition?: string;
  mileage: number;
  fuelType?: string;
  transmission?: string;
  description?: string;
  features?: string[];
  specifications?: BikeSpecifications;
  images?: string[];
  color?: string;
  owners?: string;
  insurance?: string;
  registration?: string;
}



const formatDriveUrl = (url: string) => {
  const match = url.match(/\/d\/(.+?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};

export default function BikeDetailPage( ) {

  const params = useParams();
  const id = params?.id as string;

  const { data: bike, isLoading, isError } = useQuery<Bike>({
    queryKey: ["bike", params.id],
    queryFn: async () => {
      const response = await $axios.get(`/api/bike/${id}`);
      return response.data.bike;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (isError || !bike) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading bike details</h2>
          <Button asChild>
            <Link href="/bikes">Back to Bikes</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/bikes">
              <ArrowLeft className="w-4 h-4" />
              Back to All Vehicles
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                      <Image
                        src={bike.images?.[0] ? formatDriveUrl(bike.images[0]) : "/placeholder.svg"}
                        alt={bike.name}
                        width={600}
                        height={400}
                        className="w-full  rounded-t-lg"
                      />
                    </div>
                    {bike.images?.slice(1, 6).map((image: string, index: number) => (
  <Image
    key={index}
    src={formatDriveUrl(image)}
    alt={`${bike.name} ${index + 2}`}
    width={800}
    height={600}
    className="w-full rounded"
/>
))}

                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vehicle Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{bike.name}</CardTitle>
                      <CardDescription className="text-lg mt-2">
                        {bike.brand || 'N/A'} • {bike.year} • {bike.engine || 'N/A'}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">Rs. {bike.price}</div>
                      <Badge className="mt-2">{bike.condition || 'N/A'}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Year</div>
                        <div className="font-semibold">{bike.year}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Mileage</div>
                        <div className="font-semibold">{bike.mileage} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Fuel Type</div>
                        <div className="font-semibold">{bike.fuelType || 'N/A'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Transmission</div>
                        <div className="font-semibold">{bike.transmission || 'N/A'}</div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-gray-600">{bike.description || 'No description available.'}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features */}
            {bike.features && bike.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {bike.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Specifications */}
            {bike.specifications && Object.keys(bike.specifications).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(bike.specifications).map(([key, value]: [string, string | number]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <span className="text-gray-600">{key}</span>
                          <span className="font-semibold">{String(value) as ReactNode}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Interested in this vehicle?</CardTitle>
                  <CardDescription>Contact us for more details or to schedule a visit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button asChild variant="secondary" className="w-full" size="lg">
                    <Link href="/contact">Visit Showroom</Link>
                  </Button>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-semibold">{bike.color || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ownership:</span>
                      <span className="font-semibold">{bike.owners || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance:</span>
                      <span className="font-semibold">{bike.insurance || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration:</span>
                      <span className="font-semibold">{bike.registration || 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
