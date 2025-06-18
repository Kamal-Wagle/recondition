import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";
import connectDB from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";
import BikeDetails from "@/lib/models/bike";

// Auth setup
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

interface FileUpload {
  name: string;
  mimeType: string;
  content: string;
}


const uploadFileToDrive = async (
  folderId: string,
  file: FileUpload
): Promise<{ id: string; link: string; name: string; mimeType: string }> => {
  const auth = authenticateGoogle();
  const drive = google.drive({ version: "v3", auth });

  const buffer = Buffer.from(file.content, "base64");
  const stream = Readable.from(buffer);

  const createRes = await drive.files.create({
    requestBody: {
      name: file.name,
      parents: [folderId],
      mimeType: file.mimeType,
    },
    media: {
      mimeType: file.mimeType,
      body: stream,
    },
    fields: "id",
  });

  const getRes = await drive.files.get({
    fileId: createRes.data.id!,
    fields: "webViewLink",
  });

  return {
    id: createRes.data.id!,
    link: getRes.data.webViewLink || "",
    name: file.name,
    mimeType: file.mimeType,
  };
};


// GET
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();
    if (!id) return NextResponse.json({ error: "Bike ID is required" }, { status: 400 });

    await connectDB();
    const bike = await BikeDetails.findById(id);
    if (!bike) return NextResponse.json({ error: "Bike not found" }, { status: 404 });

    return NextResponse.json({ message: "Bike fetched successfully", success: true, bike });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal error" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();
    if (!id) return NextResponse.json({ error: "Bike ID is required" }, { status: 400 });

    await connectDB();
    const user = await verifyAdmin(request);
    if (user instanceof NextResponse) return user;

    const bike = await BikeDetails.findById(id);
    if (!bike) return NextResponse.json({ error: "Bike not found" }, { status: 404 });

    const drive = google.drive({ version: "v3", auth: authenticateGoogle() });

    // ✅ Delete multiple files
    if (Array.isArray(bike.fileId) && bike.fileId.length > 0) {
      for (const fileId of bike.fileId) {
        try {
          await drive.files.delete({ fileId });
          console.log("✅ Deleted file:", fileId);
        } catch (err: unknown) {
          const error = err as { status?: number; message?: string };
          if (error?.status === 404) {
            console.warn("⚠️ File already deleted or not found:", fileId);
          } else {
            console.error("❌ Failed to delete file:", fileId, error.message);
          }
        }
      }
    } else {
      console.log("ℹ️ No fileId array found or it's empty.");
    }

    const deletedBike = await BikeDetails.findByIdAndDelete(id);
    return NextResponse.json({ message: "Bike deleted successfully", success: true, deletedBike });
  } catch (error) {
    console.error("❌ Delete API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}


export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();
    if (!id) return NextResponse.json({ error: "Bike ID is required" }, { status: 400 });

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "multipart/form-data not supported" }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      price,
      year,
      mileage,
      condition,
      type,
      brand,
      engine,
      fuelType,
      transmission,
      color,
      owners,
      insurance,
      registration,
      description,
      features,
      specifications,
      files, // this must be base64 or file-like content
    } = body;

    await connectDB();
    const user = await verifyAdmin(request);
    if (user instanceof NextResponse) return user;

    const existingBike = await BikeDetails.findById(id);
    if (!existingBike) return NextResponse.json({ error: "Bike not found" }, { status: 404 });

    const folderId = process.env.GDRIVE_Bike_FOLDER_ID!;
    const drive = google.drive({ version: "v3", auth: authenticateGoogle() });

    // 🧹 Delete old files only if new files are actually provided
    const newImageUrls: string[] = [];
    const newFileIds: string[] = [];

    if (Array.isArray(files) && files.length > 0) {
      if (Array.isArray(existingBike.fileId) && existingBike.fileId.length > 0) {
        for (const fileId of existingBike.fileId) {
          try {
            await drive.files.delete({ fileId });
            console.log("✅ Deleted old file:", fileId);
          } catch (err: unknown) {
            const error = err as { status?: number; message?: string };
            if (error?.status === 404) {
              console.warn("⚠️ File already deleted:", fileId);
            } else {
              console.error("❌ Failed to delete file:", fileId, error.message);
            }
          }
        }
      }

      console.log(`📤 Uploading ${files.length} new file(s)`);
      for (const file of files) {
        // ⚠️ Make sure file format is { name: string, buffer/base64: string, mimeType: string }
        const uploaded = await uploadFileToDrive(folderId, file);
        const previewUrl = uploaded.link.replace("/view?", "/preview?");
        newImageUrls.push(previewUrl);
        newFileIds.push(uploaded.id);
        console.log("✅ Uploaded:", uploaded.id);
      }
    } else {
      console.log("ℹ️ No new files to upload");
    }

    const updatedBike = await BikeDetails.findByIdAndUpdate(
      id,
      {
        name,
        price,
        year,
        mileage,
        condition,
        type,
        brand,
        engine,
        fuelType,
        transmission,
        color,
        owners,
        insurance,
        registration,
        description,
        features,
        specifications,
        images: newImageUrls.length ? newImageUrls : existingBike.images,
        fileId: newFileIds.length ? newFileIds : existingBike.fileId,
      },
      { new: true }
    );

    return NextResponse.json({ message: "Bike updated successfully", success: true, updatedBike });
  } catch (error) {
    console.error("PUT bike error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}

