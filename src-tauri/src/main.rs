// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_username() -> String {
    let username= env!("USER");
    format!("{}", username)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_username])
        .run(tauri::generate_context!())
        .expect("An error occured while opening the power menu.");
}
