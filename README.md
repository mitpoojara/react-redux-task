# 🚀 Logic Flow Builder

## 📌 Project kya hai?

Ye ek Logic Flow Builder app hai jisme user apni conditions bana sakta hai (IF-THEN type) aur unko connect kar sakta hai.

User:

* Node add kar sakta hai
* Node ke andar child node bana sakta hai
* Ek node ko dusre node se link kar sakta hai

---

## ✨ Features

* ✔ Infinite child nodes (recursive structure)
* ✔ Node linking (graph jaisa system)
* ✔ Cycle detection (A → B → C → A detect karta hai)
* ✔ Real-time validation (error turant show hota hai)
* ✔ Clean UI with nested structure

---

## 🧠 Maine kya use kiya?

### 🔁 Recursion

Node ke andar node banane ke liye recursion use kiya
Matlab component khud ko hi call karta hai

---

### 🔗 Node Linking

Har node ko dusre node se connect karne ke liye `linkedTo` use kiya

Example:
A → B
B → C

---

### 💣 Cycle Detection (IMPORTANT)

Agar user galti se loop bana de:

A → B → C → A ❌

To system detect karta hai aur error show karta hai

Iske liye maine simple DFS logic use kiya:

* node se start kiya
* linked nodes follow kiye
* agar same node dubara mila → cycle

---

## 🧪 Example

Valid:
A → B → C ✔

Invalid:
A → B → C → A ❌ (Cycle)

---

## 🛠️ Tech Used

* React.js
* JavaScript
* useState hook
* Recursive components

---

## ▶️ Run kaise kare?

```bash
npm install
npm start
```

---

## 🚀 Deployment

Project ko Vercel pe deploy kiya ja sakta hai

---

## 📈 Future Improvement

* Specific node highlight (jo cycle create kare)
* Drag & drop feature
* Better UI design (MUI ya Tailwind)

---

## 🙋‍♂️ Conclusion

Is project me maine:

* recursion use kiya
* nested state handle kiya
* graph logic implement kiya
* cycle detection banaya

Ye ek thoda advanced frontend problem tha jisme UI + logic dono handle karna pada.

# logic-flow-mapper