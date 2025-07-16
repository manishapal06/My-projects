// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZp1DcBbeUxlmpVVtUqsS2sQ3_v6s5mss",
  authDomain: "grocery-app-6e639.firebaseapp.com",
  database: "https://console.firebase.google.com/u/0/project/grocery-app-6e639/database/grocery-app-6e639-default-rtdb/data/~2F",
  projectId: "grocery-app-6e639",
  storageBucket: "grocery-app-6e639.firebasestorage.app",
  messagingSenderId: "337848218985",
  appId: "1:337848218985:web:ee581ebb1fa31f6a6ff9f8",
  measurementId: "G-YC1DTPH4MT"
};

firebaseConfig.initializeApp(firebaseConfig);
const db= firebaseConfig.database();
const form= document.getElementById("itemForm");
const itemList= document.getElementById("itemList");
const undoToast= document.getElementById("undoToast");
let filterCategory = "All";
form.onsubmit = async (e) => {
  e.preventDefault();
  const name = form.name.value;
  const qty = +form.qty.value;
  const price = +form.price.value;
  const category = form.category.value;

  const item = { name, qty, price, category };

  if (navigator.onLine) {
    await db.ref("items").push(item);
  } else {
    const pending = JSON.parse(localStorage.getItem("pending")) || [];
    pending.push(item);
    localStorage.setItem("pending", JSON.stringify(pending));
  }

  form.reset();
  form.name.focus();
};

function renderList(items) {
  itemList.innerHTML = "";
  let total = 0, count = 0;
  for (const [key, item] of Object.entries(items || {})) {
    if (filterCategory !== "All" && item.category !== filterCategory) continue;
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.qty} — ₹${item.qty * item.price}`;
    const btn = document.createElement("button");
    btn.textContent = "🗑";
    btn.onclick = () => deleteItem(key, item);
    li.append(btn);
    itemList.append(li);
    total += item.qty * item.price;
    count += item.qty;
  }
  document.getElementById("grandCost").textContent = total;
  document.getElementById("totalItems").textContent = count;
}

function deleteItem(key, data) {
  localStorage.setItem("lastDeleted", JSON.stringify({ key, data }));
  db.ref("items").child(key).remove();
  undoToast.style.display = "block";
  setTimeout(() => undoToast.style.display = "none", 5000);
}

function undoDelete() {
  const last = JSON.parse(localStorage.getItem("lastDeleted"));
  if (last) {
    db.ref("items").child(last.key).set(last.data);
    undoToast.style.display = "none";
  }
}

function filterItems(category) {
  filterCategory = category;
  db.ref("items").once("value", snap => renderList(snap.val()));
}

db.ref("items").on("value", snap => renderList(snap.val()));

// Offline sync
window.addEventListener("online", () => {
  const pending = JSON.parse(localStorage.getItem("pending")) || [];
  pending.forEach(item => db.ref("items").push(item));
  localStorage.removeItem("pending");
});
