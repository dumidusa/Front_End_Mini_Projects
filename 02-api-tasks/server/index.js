import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const Task = mongoose.model("Task", new mongoose.Schema({
    title: {type: String, required: true },
    done: { type:Boolean, default: false },
}));

app.get("/api/tasks",async(req, res)=>{
    res.json(await Task.find());
});

app.post("/api/tasks", async(req, res)=>{
    res.status(201).json(await Task.create( {title: req.body.title} ));
});

app.patch("/api/tasks/:id", async(req, res)=>{
    const t = await Task.findById(req.params.id);
    if(!t) return res.status(404).json({ error: "Not Found"});
    t.done = !t.done;
    res.json(await t.save());
});

app.delete("/api/tasks/:id", async(req, res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

await mongoose.connect(process.env.MONGO_URI);
app.listen(process.env.PORT, ()=>console.log("API on : 5018"));