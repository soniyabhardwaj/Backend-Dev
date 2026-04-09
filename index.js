import express from "express"
import helmet from "helmet"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import router from "./employee/router/app.route.js"

dotenv.config()

const app = express()
app.locals.sessions = new Map()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("views", path.join(__dirname, "employee/views"))
app.set("view engine", "ejs")

app.use(helmet())
app.use(express.static(path.join(__dirname, "employee", "public")))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    const cookieHeader = req.headers.cookie || ""
    const cookies = {}

    cookieHeader.split(";").forEach((chunk) => {
        const part = chunk.trim()
        if (!part) {
            return
        }

        const separatorIndex = part.indexOf("=")
        if (separatorIndex === -1) {
            return
        }

        const key = part.slice(0, separatorIndex)
        const value = part.slice(separatorIndex + 1)
        cookies[key] = decodeURIComponent(value)
    })

    const sid = cookies.sid
    if (sid && app.locals.sessions.has(sid)) {
        req.sessionUser = app.locals.sessions.get(sid)
        req.sessionId = sid
    }

    next()
})

const port = process.env.PORT || 8000

function getEmployees() {
    try {
        if (!fs.existsSync("Employee.json")) {
            return []
        }
        const data = fs.readFileSync("Employee.json", "utf-8")
        return JSON.parse(data || "[]")
    } catch (error) {
        console.log("index/getEmployees: ", error)
        return []
    }
}

app.get("/", (req, res) => {
    if (req.sessionUser) {
        return res.redirect("/home")
    }

    return res.redirect("/employee/login")
})

app.get("/home", (req, res) => {
    if (!req.sessionUser) {
        return res.redirect("/employee/login")
    }

    const employees = getEmployees()

    if (req.sessionUser.role === "admin") {
        return res.render("index", {
            employees,
            role: "admin",
            currentUser: req.sessionUser
        })
    }

    const employeeData = employees.filter((value) => value.email === req.sessionUser.email)
    return res.render("index", {
        employees: employeeData,
        role: "employee",
        currentUser: req.sessionUser
    })
})

app.post("/logout", (req, res) => {
    if (req.sessionId) {
        app.locals.sessions.delete(req.sessionId)
    }

    res.setHeader("Set-Cookie", "sid=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax")
    return res.redirect("/employee/login")
})

app.get("/employee/add", (req, res) => {
    if (!req.sessionUser || req.sessionUser.role !== "admin") {
        return res.redirect("/home")
    }

    res.render("add")
})

app.get("/employee/login", (req, res) => {
    res.render("login", { role: "employee" })
})

app.get("/admin/login", (req, res) => {
    res.render("login", { role: "admin" })
})

app.get("/employee/signup", (req, res) => {
    res.render("signup", { role: "employee" })
})

app.get("/admin/signup", (req, res) => {
    res.render("signup", { role: "admin" })
})

app.get("/employee/edit/:id", (req, res) => {
    if (!req.sessionUser) {
        return res.redirect("/employee/login")
    }

    const id = Number(req.params.id)
    const employees = getEmployees()
    const employee = employees.find((value) => value.id === id)

    if (!employee) {
        return res.redirect("/home")
    }

    if (req.sessionUser.role === "employee" && req.sessionUser.email !== employee.email) {
        return res.redirect("/home")
    }

    res.render("edit", { employee, role: req.sessionUser.role })
})

app.use("/", router)

app.listen(port, () => {
    console.log("connected to the server.")
})