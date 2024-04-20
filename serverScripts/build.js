const fs = require('fs');
const path = require("path");
const minifyHtml = require("@minify-html/node");
const esbuild = require('esbuild');
const sharp = require("sharp");
const { JSDOM } = require("jsdom");
const fsExtra = require('fs-extra');

const distDir = path.join(__dirname, "dist");

if (!process.cwd().toString().includes("serverScripts")) {
  console.log("Please enter the serverScripts directory and run the code from there.");
  process.exit(1);
}

clean();
createEnv();

try {
  const files = fs.readdirSync("..", { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(file.path, file.name);

    if (file.isDirectory()) {
      const dirFiles = fs.readdirSync(filePath, { recursive: true });
      for (const dirFile of dirFiles) {
        const subFilePath = path.join(filePath, dirFile);
        if (dirFile.includes(".html")) htmlHandler(subFilePath);
        else if (dirFile.includes(".css")) cssHandler(subFilePath);
        else if (dirFile.includes(".js")) jsHandler(subFilePath);
        else miscFiles.push(subFilePath);
      }
    } else {
      if (file.name.includes(".html")) htmlHandler(filePath);
      else if (file.name.includes(".css")) cssHandler(filePath);
      else if (file.name.includes(".js")) jsHandler(filePath);
      else miscFiles.push(filePath);
    }
  }
  
  (async () => {
    await loadImagesAndConvert(htmlFiles, true);
  })();

} catch (err) {
  console.error(err.message);
}

async function clean() {
  try {
    await fsExtra.emptyDir(distDir);
    console.log("Cleaning successful");
  } catch (err) {
    console.error("Error during clean:", err);
  }
}

async function createEnv() {
  try {
    await fsExtra.ensureDir(distDir);
    await fsExtra.ensureDir(path.join(distDir, "pages"));
    await fsExtra.ensureDir(path.join(distDir, "assets"));
    
    await fsExtra.copy(path.join("..", "assets"), path.join(distDir, "assets"), { overwrite: true });

    console.log("Environment setup completed successfully.");
  } catch (err) {
    console.error(err.message);
  }
}

function htmlHandler(filePath) {
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const minifiedHtml = minifyHtml.minify(Buffer.from(htmlContent), { minify_css: true, minify_js: true });
    const outputname = path.relative("..", filePath);
    fs.writeFileSync(path.join(distDir, outputname), minifiedHtml, 'utf8');
  } catch (err) {
    console.error(err.message);
  }
}

async function jsHandler(filePath) {
  const outputname = path.relative("..", filePath);
  try {
    await esbuild.build({
      entryPoints: [filePath],
      bundle: false,
      minify: true,
      sourcemap: false,
      outfile: path.join(distDir, outputname),
    });
  } catch (error) {
    console.error(error);
  }
}

async function cssHandler(filePath) {
  const outputname = path.relative("..", filePath);
  try {
    await esbuild.build({
      entryPoints: [filePath],
      bundle: false,
      minify: true,
      sourcemap: false,
      outfile: path.join(distDir, outputname),
      loader: { '.ttf': 'empty' },
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadImagesAndConvert(htmlFiles, removeOriginal) {
  const imageSrcs = [];

  for (let file of htmlFiles) {
    try {
      const input = fs.readFileSync(file, 'utf8');
      const dom = new JSDOM(input.toString());
      const images = Array.from(dom.window.document.querySelectorAll("img")).map(image => image.src);
      imageSrcs.push(...images.filter(src => !/^https?:\/\//.test(src)));
    } catch (err) {
      console.error(err.message);
    }
  }

  await webpHandler(imageSrcs, removeOriginal);
}

async function webpHandler(imageSrcs, removeOriginal) {
  for (let image of imageSrcs) {
    const inputPath = path.join(__dirname, '..', 'assets', image);
    const outputname = image.replace(/\.\.|\.[^.]+$/g, '') + ".webp";
    const outputPath = path.join(distDir, "assets", outputname);

    console.log(`Processing: ${inputPath} -> ${outputPath}`);
    try {
      await sharp(inputPath)
        .toFormat("webp", { quality: 40, effort: 0 })
        .toFile(outputPath, { force: true });

      if (removeOriginal) {
        await fsExtra.unlink(inputPath);
        console.log(`Original file removed: ${inputPath}`);
      }
    } catch (error) {
      console.log(`An error occurred during processing: ${error}`);
    }
  }
}
