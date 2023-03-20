// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const server = express();
module.exports = server; // SERVERINIZI EXPORT EDİN {}

const User = require("./users/model");

server.use(express.json());

server.post("/api/users", async (req, res) => {
  let user = req.body;
  if (!user.bio || !user.name) {
    res
      .status(400)
      .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  } else {
    let newUser = await User.insert(user);
    res.status(201).json(newUser);
  }
});

server.get("/api/users", async (req, res) => {
  try {
    let users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    let users = await User.findById(req.params.id);

    if (!users) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  //update
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      let updated = req.body;
      if (!updated.bio || !updated.name) {
        res
          .status(400)
          .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
      } else {
        let updateUser = await User.update(req.params.id, updated);
        res.status(201).json(updateUser);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  //delete
  const { id } = req.params;
  try {
    let deletedUSer = await User.remove(id);
    if (!deletedUSer) {
      res
        .status(404)
        .json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    } else {
      await User.remove(id);
      res.json(deletedUSer);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});
