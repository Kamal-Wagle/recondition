import { google } from "googleapis";
import { NextResponse } from "next/server";
import mime from "mime-types";
import { Readable } from "stream";
import connectDB from "@/lib/db";
import BikeDetails from "@/lib/models/bike";

const folderId = process.env.GDRIVE_Bike_FOLDER_ID;
if (!folderId) {
  throw new Error("GDRIVE_Bike_FOLDER_ID is not defined");
}

const privateKey = process.env.GDRIVE_PRIVATE_KEY
  ?.replace(/\\n/g, "\n")
  .replace(/^"(.*)"$/, '$1')
  .trim();

const authenticateGoogle = () => {
  const credentials = {
    type: "service_account",
    project_id: process.env.GDRIVE_PROJECT_ID,
    private_key_id: process.env.GDRIVE_PRIVATE_KEY_ID,
    private_key: privateKey!,
    client_id: process.env.GDRIVE_CLIENT_ID,
    auth_uri: process.env.GDRIVE_AUTH_URI,
    token_uri: process.env.GDRIVE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GDRIVE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.GDRIVE_CLIENT_CERT_URL,
    client_email: process.env.GDRIVE_CLIENT_EMAIL,
  };

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
};

const uploadFileToDrive = async (folderId: string, file: File) => {
  const auth = authenticateGoogle();
  const drive = google.drive({ version: "v3", auth });

  const mimeType = mime.lookup(file.name) || "application/octet-stream";
  const buffer = Buffer.from(await file.arrayBuffer());

  const fileMetadata = {
    name: file.name,
    parents: [folderId],
  };

  const uploadedFile = await drive.files.create({
    requestBody: fileMetadata,
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: "id",
  });

  const fileLink = await drive.files.get({
    fileId: uploadedFile.data.id!,
    fields: "webViewLink",
  });

  return {
    id: uploadedFile.data.id!,
    link: fileLink.data.webViewLink || "",
  };
};

// POST: Upload a bike
export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const fields = [
      "name", "price", "year", "mileage", "condition", "type", "brand",
      "engine", "fuelType", "transmission", "color", "owners",
      "insurance", "registration", "description",
    ];

    const data: Record<string, string> = {};
    for (const field of fields) {
      const value = formData.get(field);
      if (!value) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
      data[field] = value as string;
    }

    const features = JSON.parse(formData.get("features") as string);
    const specifications = JSON.parse(formData.get("specifications") as string);
    const imageFiles = formData.getAll("images") as File[];

    if (!Array.isArray(features) || typeof specifications !== "object" || imageFiles.length === 0) {
      return NextResponse.json({ error: "Invalid features/specifications/images" }, { status: 400 });
    }

    const uploadedImages = await Promise.all(
      imageFiles.map((file) => uploadFileToDrive(folderId as string, file))
    );

    const imageUrls = uploadedImages.map((img) => img.link.replace("/view?", "/preview?"));
    const fileIds = uploadedImages.map((img) => img.id);

    const newBike = await BikeDetails.create({
      ...data,
      features,
      specifications,
      images: imageUrls,
      fileId: fileIds, // now storing multiple
    });

    return NextResponse.json({ message: "Bike uploaded", bike: newBike }, { status: 200 });

  } catch (error) {
    console.error("Upload error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


// GET: Fetch all bikes
export async function GET() {
  try {
    await connectDB();
    const bikes = await BikeDetails.find().sort({ createdAt: -1 });

    return NextResponse.json({
      message: "Bikes fetched successfully",
      success: true,
      bikes,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
