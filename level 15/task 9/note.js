import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { marked } from "marked";


const NOTES_DIR = path.join(process.cwd(), "notes");


fs.ensureDirSync(NOTES_DIR);


async function createNote() {
  const { title, content } = await inquirer.prompt([
    { type: "input", name: "title", message: "Enter note title:" },
    { type: "editor", name: "content", message: "Enter note content (Markdown supported):" },
  ]);

  const filePath = path.join(NOTES_DIR, `${title}.md`);
  await fs.writeFile(filePath, content);
  console.log(`✅ Note "${title}" saved successfully!`);
}

async function listNotes() {
  const files = await fs.readdir(NOTES_DIR);
  if (files.length === 0) {
    console.log("📂 No notes found.");
    return;
  }
  console.log("📜 Your Notes:");
  files.forEach((file, index) => console.log(`${index + 1}. ${file.replace(".md", "")}`));
}


async function viewNote() {
  const files = await fs.readdir(NOTES_DIR);
  if (files.length === 0) {
    console.log("📂 No notes available.");
    return;
  }

  const { file } = await inquirer.prompt([
    { type: "list", name: "file", message: "Select a note to view:", choices: files },
  ]);

  const content = await fs.readFile(path.join(NOTES_DIR, file), "utf-8");
  console.log(`\n📝 ${file.replace(".md", "")}:\n`);
  console.log(marked(content)); 
}


async function editNote() {
  const files = await fs.readdir(NOTES_DIR);
  if (files.length === 0) {
    console.log("📂 No notes available to edit.");
    return;
  }

  const { file } = await inquirer.prompt([
    { type: "list", name: "file", message: "Select a note to edit:", choices: files },
  ]);

  const oldContent = await fs.readFile(path.join(NOTES_DIR, file), "utf-8");

  const { newContent } = await inquirer.prompt([
    { type: "editor", name: "newContent", message: "Edit your note:", default: oldContent },
  ]);

  await fs.writeFile(path.join(NOTES_DIR, file), newContent);
  console.log(`✅ Note "${file.replace(".md", "")}" updated successfully!`);
}


async function deleteNote() {
  const files = await fs.readdir(NOTES_DIR);
  if (files.length === 0) {
    console.log("📂 No notes available to delete.");
    return;
  }

  const { file } = await inquirer.prompt([
    { type: "list", name: "file", message: "Select a note to delete:", choices: files },
  ]);

  await fs.remove(path.join(NOTES_DIR, file));
  console.log(`🗑️ Note "${file.replace(".md", "")}" deleted successfully!`);
}


async function searchNotes() {
  const { query } = await inquirer.prompt([
    { type: "input", name: "query", message: "Enter search keyword:" },
  ]);

  const files = await fs.readdir(NOTES_DIR);
  let results = [];

  for (const file of files) {
    const content = await fs.readFile(path.join(NOTES_DIR, file), "utf-8");
    if (content.toLowerCase().includes(query.toLowerCase())) {
      results.push(file.replace(".md", ""));
    }
  }

  if (results.length === 0) {
    console.log("❌ No notes found with that keyword.");
  } else {
    console.log("🔍 Search Results:");
    results.forEach((note, index) => console.log(`${index + 1}. ${note}`));
  }
}


async function mainMenu() {
  while (true) {
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "📒 Markdown Notes - Choose an action:",
        choices: [
          "📌 Create a new note",
          "📜 List all notes",
          "📝 View a note",
          "✏️ Edit a note",
          "🗑️ Delete a note",
          "🔍 Search notes",
          "🚪 Exit",
        ],
      },
    ]);

    switch (choice) {
      case "📌 Create a new note":
        await createNote();
        break;
      case "📜 List all notes":
        await listNotes();
        break;
      case "📝 View a note":
        await viewNote();
        break;
      case "✏️ Edit a note":
        await editNote();
        break;
      case "🗑️ Delete a note":
        await deleteNote();
        break;
      case "🔍 Search notes":
        await searchNotes();
        break;
      case "🚪 Exit":
        console.log("👋 Exiting...");
        return;
    }
  }
}

mainMenu();
