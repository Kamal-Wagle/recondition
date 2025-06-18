import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

export interface Bike {
  _id: string;
  name: string;
  price: string;
  year: string;
  mileage: string;
  brand: string;
  fuelType: string;
  fileId: string;
  features: string[];
  createdAt: string;
  // additional fields can be added if needed
}

export default function BikeTable({
  items = [],
  onEdit,
  onDelete,
}: {
  items: Bike[];
  onEdit: (item: Bike) => void;
  onDelete: (id: string) => void;
}) {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  if (!Array.isArray(items)) {
    console.error("Expected 'items' to be an array but received:", items);
    return <p className="text-center text-gray-500">Error: Invalid bike data.</p>;
  }

  if (items.length === 0) {
    return <p className="text-center text-gray-500">No bikes available.</p>;
  }

  // const getDrivePreviewUrl = (fileId: string) =>
  //   `https://drive.google.com/file/d/${fileId}/preview`;


  const getDrivePreviewUrl = (url: string) => {
    const match = url.match(/\/d\/(.+?)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  };
  return (
    <>
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price (NPR)</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Mileage (km)</TableHead>
              <TableHead>Fuel</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>View</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>रु {item.price}</TableCell>
                <TableCell>{item.brand || "-"}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.mileage}</TableCell>
                <TableCell>{item.fuelType || "-"}</TableCell>
                <TableCell>
                  {Array.isArray(item.features) && item.features.length > 0
                    ? item.features.join(", ")
                    : "-"}
                </TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (selectedFileId === item.fileId) {
                        setSelectedFileId(null);
                        setSelectedTitle(null);
                      } else {
                        setSelectedFileId(item.fileId);
                        setSelectedTitle(item.name);
                      }
                    }}
                  >
                    {selectedFileId === item.fileId ? "Hide" : "View"}
                  </Button>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item._id)}
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedFileId && (
        <div className="mt-4 border rounded p-4 h-[600px] w-full">
          <h3 className="mb-2 font-semibold">{selectedTitle}</h3>
          <iframe
            src={getDrivePreviewUrl(selectedFileId)}
            width="100%"
            height="100%"
            frameBorder="0"
            title={selectedTitle ?? "File Viewer"}
            allow="autoplay"
          />
        </div>
      )}
    </>
  );
}
