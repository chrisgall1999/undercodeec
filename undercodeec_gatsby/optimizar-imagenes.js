const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Carpeta original con las imágenes
const inputDir = path.join(__dirname, "public", "assets", "img");
// Carpeta destino para las imágenes optimizadas
const outputDir = path.join(__dirname, "public", "assets", "img-optimized");

const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];

/**
 * Recorre recursivamente una carpeta y devuelve la lista completa de imágenes encontradas.
 */
const getAllImages = (dir, relativePath = "") => {
  const images = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      images.push(...getAllImages(fullPath, path.join(relativePath, entry.name)));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (validExtensions.includes(ext)) {
        images.push(path.join(dir, entry.name));
      }
    }
  }

  return images;
};

/**
 * Procesa una lista de rutas de imágenes, convierte cada una a .webp y la guarda en la ruta correspondiente.
 */
async function processImages(images) {
  for (const inputPath of images) {
    try {
      const outputPath = inputPath
        .replace(path.join("assets", "img"), path.join("assets", "img-optimized"))
        .replace(/\.(jpg|jpeg|png|webp)$/i, ".webp");

      // Asegura que el directorio de salida exista
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      try {
        // Intento de compresión en WebP
        await sharp(inputPath)
          .resize({ width: 2000, height: 2000, fit: "inside" })
          .toFormat("webp", { quality: 70 })
          .toFile(outputPath);

        console.log(`✅ Optimizada como WebP: ${outputPath}`);
      } catch (err) {
        if (err.message.includes("too large")) {
          const fallbackPath = outputPath.replace(/\.webp$/, ".jpg");

          await sharp(inputPath)
            .resize({ width: 2000, height: 2000, fit: "inside" })
            .jpeg({ quality: 60 })
            .toFile(fallbackPath);

          console.warn(`⚠️ WebP falló, guardada como JPEG: ${fallbackPath}`);
        } else {
          throw err;
        }
      }

    } catch (error) {
      console.error(`❌ Error con ${inputPath}:`, error.message);
    }
  }
}

// Asegura que el directorio de salida base exista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Obtener lista de imágenes y procesarlas
const images = getAllImages(inputDir);
processImages(images);
