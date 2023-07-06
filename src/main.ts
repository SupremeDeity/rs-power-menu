import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
import { homeDir, join } from "@tauri-apps/api/path";
import { Command } from "@tauri-apps/api/shell";

let usernameOutput: string;

async function getUserInfo() {
  let avatarEl: HTMLElement = document.getElementById("avatar")!;
  let usernameEl: HTMLElement = document.getElementById("username")!;
  usernameOutput = await invoke("get_username");

  usernameEl.innerHTML = usernameOutput;
  var img = document.createElement("img");
  var homeDirPath = await homeDir();
  let filePath = await join(homeDirPath, ".face");
  img.src = convertFileSrc(filePath);
  img.classList.add("rounded-full", "aspect-square", "ring-2");
  avatarEl?.appendChild(img);
}

async function shutdown() {
  console.log("[Power Menu]: Shutdown Command issued.");
  await new Command("shutdown").execute();
}
async function suspend() {
  console.log("[Power Menu]: Suspend Command issued.");
  // await invoke("suspend");
}
async function logout() {
  console.log("[Power Menu]: Logout Command issued.");
  await new Command("logout", ["terminate-user", usernameOutput]).execute();
}
async function restart() {
  console.log("[Power Menu]: Restart Command issued.");
  await new Command("restart").execute();
}

document.getElementById("shutdown-btn")?.addEventListener("click", shutdown);
document.getElementById("logout-btn")?.addEventListener("click", logout);
document.getElementById("suspend-btn")?.addEventListener("click", suspend);
document.getElementById("restart-btn")?.addEventListener("click", restart);

await getUserInfo();
