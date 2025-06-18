'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import $axios from '@/lib/axios.instance';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

type BikeType = {
  name: string;
  price: string;
  year: string;
  mileage: string;
  brand: string;
  type: string;
  engine: string;
  fuelType: string;
  transmission: string;
  color: string;
  owners: string;
  insurance: string;
  registration: string;
  description: string;
  features: string[];
  specifications: { 'Engine Displacement': string };
  images: string[]; // URLs of images
};

export default function EditBikePage() {
  const router = useRouter();
  const { id } = useParams();

  const [bike, setBike] = useState<BikeType>({
    name: '',
    price: '',
    year: '',
    mileage: '',
    brand: '',
    type: '',
    engine: '',
    fuelType: '',
    transmission: '',
    color: '',
    owners: '',
    insurance: '',
    registration: '',
    description: '',
    features: [],
    specifications: { 'Engine Displacement': '' },
    images: [],
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBike = async () => {
      try {
        const res = await $axios.get(`/api/bike/${id}`);
        setBike(res.data.bike);
      } catch (error) {
        console.error('Error fetching bike:', error);
        toast.error('Failed to fetch bike details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'Engine Displacement') {
      setBike((prev) => ({
        ...prev,
        specifications: { ...prev.specifications, [name]: value },
      }));
    } else {
      setBike((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);
  };

  const convertFilesToBase64 = (files: File[]): Promise<{ name: string; content: string; mimeType: string }[]> => {
    return Promise.all(
      files.map(
        (file) =>
          new Promise<{ name: string; content: string; mimeType: string }>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                const base64 = reader.result.split(',')[1]; // Remove data:<mime>;base64,
                resolve({ name: file.name, content: base64, mimeType: file.type });
              } else {
                reject('FileReader result is not string');
              }
            };
            reader.onerror = (error) => reject(error);
          })
      )
    );
  };

  const handleUpdate = async () => {
    try {
      let filesPayload = null;
      if (selectedFiles.length > 0) {
        filesPayload = await convertFilesToBase64(selectedFiles);
      }

      await $axios.put(`/api/bike/${id}`, {
        ...bike,
        files: filesPayload, // array of base64 encoded files
      });

      toast.success('Bike updated successfully!');
      router.push('/admin/bike');
    } catch (error) {
      console.error('Error updating bike:', error);
      toast.error('Failed to update bike.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Bike</h1>

      <div className="bg-white p-6 shadow-md rounded-lg max-w-4xl">
        <div className="grid grid-cols-1 gap-6">
          {[
            'name',
            'price',
            'year',
            'mileage',
            'brand',
            'type',
            'engine',
            'fuelType',
            'transmission',
            'color',
            'owners',
            'insurance',
            'registration',
          ].map((field) => (
            <div key={field}>
              <Label className="capitalize">{field}</Label>
              <Input
                name={field}
                value={bike[field as keyof BikeType] as string}
                onChange={handleInputChange}
                placeholder={`Enter ${field}`}
                className="w-full mt-1"
              />
            </div>
          ))}

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={bike.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full mt-1"
            />
          </div>

          <div>
            <Label>Engine Displacement</Label>
            <Input
              name="Engine Displacement"
              value={bike.specifications['Engine Displacement']}
              onChange={handleInputChange}
              placeholder="e.g. 125cc"
            />
          </div>

          <div>
            <Label>Upload New Images (Optional)</Label>
            <Input type="file" accept="image/*" multiple onChange={handleFileChange} />
          </div>

          <div>
            <Label>Current Images</Label>
            <div className="flex space-x-4 overflow-x-auto">
              {bike.images.map((url, i) => (
                <Image
                width={20}
                height={20}
                  key={i}
                  src={url}
                  alt={`Bike Image ${i + 1}`}
                  className="h-20 w-20 object-cover rounded-md border"
                />
              ))}
            </div>
          </div>
        </div>

        <Button onClick={handleUpdate} className="mt-6 w-full bg-blue-600 text-white">
          Update Bike
        </Button>
      </div>
    </div>
  );
}
