export async function uploadImage(file, folder = "products") {
  try {
    const formData = new FormData();
    
    // support both single file or multiple files
    if (Array.isArray(file)) {
      file.forEach(f => formData.append("images", file));
    } else {
      formData.append("images", file); // matches backend field name
    }

    formData.append("folder", folder);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Upload failed");

    // backend returns `urls` array for multiple images
    return data.urls || [data.url];
  } catch (err) {
    console.error("Upload Failed:", err);
    throw err;
  }
}
