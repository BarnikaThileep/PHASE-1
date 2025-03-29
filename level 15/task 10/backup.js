import fs from "fs-extra";
import path from "path";
import cron from "node-cron";
import archiver from "archiver";


const SOURCE_DIR = path.resolve("source_folder"); 
const BACKUP_DIR = path.resolve("backups"); 
const MAX_BACKUPS = 5; 


fs.ensureDirSync(BACKUP_DIR);


async function createBackup() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(BACKUP_DIR, `backup-${timestamp}.zip`);

    console.log(`📂 Starting backup: ${backupFile}`);

   
    const output = fs.createWriteStream(backupFile);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(SOURCE_DIR, false);
    await archive.finalize();

    console.log(`✅ Backup completed: ${backupFile}`);

   
    await cleanupOldBackups();
  } catch (error) {
    console.error("❌ Backup failed:", error);
  }
}


async function cleanupOldBackups() {
  const files = (await fs.readdir(BACKUP_DIR))
    .filter(file => file.startsWith("backup-") && file.endsWith(".zip"))
    .sort()
    .reverse(); // Sort by newest first

  if (files.length > MAX_BACKUPS) {
    const filesToDelete = files.slice(MAX_BACKUPS);
    for (const file of filesToDelete) {
      await fs.remove(path.join(BACKUP_DIR, file));
      console.log(`🗑️ Deleted old backup: ${file}`);
    }
  }
}

function scheduleBackups() {
  cron.schedule("0 0 * * *", () => {
    console.log("⏳ Scheduled backup started...");
    createBackup();
  });
  console.log("⏰ Scheduled backups enabled (Runs at Midnight).");
}


async function mainMenu() {
  console.log("\n📦 Automated Backup System");
  console.log("1️⃣ Perform a one-time backup");
  console.log("2️⃣ Enable scheduled backups");
  console.log("3️⃣ Exit");

  const stdin = process.stdin;
  stdin.setEncoding("utf-8");
  stdin.on("data", (data) => {
    const choice = data.trim();
    if (choice === "1") {
      createBackup();
    } else if (choice === "2") {
      scheduleBackups();
    } else if (choice === "3") {
      console.log("👋 Exiting...");
      process.exit();
    } else {
      console.log("❌ Invalid choice. Try again.");
    }
  });
}

mainMenu();
