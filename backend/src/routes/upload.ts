import { Router } from "express";
import multer from "multer";
import { requireAdmin } from "./auth.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

router.post("/image", requireAdmin, upload.array("files", 10), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files?.length) return res.status(400).json({ error: "No files uploaded" });

    const bucketName = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
    if (!bucketName) {
      return res.status(500).json({ error: "Object storage not configured" });
    }

    const { Storage } = await import("@google-cloud/storage");
    const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
    const storageClient = new Storage({
      credentials: {
        audience: "replit",
        subject_token_type: "access_token",
        token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
        type: "external_account",
        credential_source: {
          url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
          format: { type: "json", subject_token_field_name: "access_token" },
        },
        universe_domain: "googleapis.com",
      } as Record<string, unknown>,
      projectId: "",
    });

    const bucket = storageClient.bucket(bucketName);
    const urls: string[] = [];

    for (const file of files) {
      const ext = file.originalname.split(".").pop()?.toLowerCase() || "jpg";
      const filename = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const gcsFile = bucket.file(filename);
      await gcsFile.save(file.buffer, { metadata: { contentType: file.mimetype }, resumable: false });
      await gcsFile.makePublic();
      urls.push(`https://storage.googleapis.com/${bucketName}/${filename}`);
    }

    return res.json({ urls });
  } catch (err) {
    req.log.error({ err }, "Upload failed");
    return res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
