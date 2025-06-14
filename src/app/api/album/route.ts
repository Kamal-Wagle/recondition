import { google } from "googleapis";
import { NextResponse } from "next/server";
import mime from "mime-types";
import { Readable } from "stream";
import connectDB from "@/lib/db";
import Album from "@/lib/models/album";

const folderId = process.env.GDRIVE_Album_FOLDER_ID;
if (!folderId) {
  throw new Error("GDRIVE_Album_FOLDER_ID is not defined");
}
     
const privateKey = process.env.GDRIVE_PRIVATE_KEY
  ?.replace(/\\n/g, "\n")       // replace literal \n with actual newlines
  .replace(/^"(.*)"$/, '$1')    // remove wrapping quotes if any
  .trim();                     // remove leading/trailing whitespace
  
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
    client_email:process.env.GDRIVE_CLIENT_EMAIL,
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
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileMetadata = {
    name: file.name,
    parents: [folderId],
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: "id",
  });

  const fileLink = await drive.files.get({
    fileId: response.data.id!,
    fields: "webViewLink",
  });

  return {
    id: response.data.id!,
    link: fileLink.data.webViewLink || "",
  };
};

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const albumName = formData.get("albumName") as string | null;
    const description = formData.get("description") as string | null;
    const imageFiles = formData.getAll("images") as File[];

    if (!albumName || !description || imageFiles.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: albumName, description, or images" },
        { status: 400 }
      );
    }

    const uploadedImages = await Promise.all(
      imageFiles.map(file => uploadFileToDrive(folderId as string, file))
    );

    const imageUrls = uploadedImages.map(img => img.link);
    const fileId = uploadedImages[0]?.id || null; // Just storing first image's fileId for now

    const newAlbum = await Album.create({
      albumName,
      description,
      imagesUrl: imageUrls,
      fileId,
    });

    return NextResponse.json(
      { message: "Album created successfully", album: newAlbum },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error uploading album:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const albums = await Album.find().sort({ createdAt: -1 });

    return NextResponse.json({
      message: "Albums fetched successfully",
      success: true,
      albums,
    });
  } catch (error: unknown) {
    console.error("Fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
