import express from "express";
import cors from "cors";
import backdoorRoute from "./src/app/backdoor/backdoor.route.js";
import usersRoute from "./src/app/users/users.route.js";
import uploadRoute from "./src/app/upload/upload.route.js";
import mataPelajaranRoute from "./src/app/mata-pelajaran/mata-pelajaran.route.js";
import adminRoute from "./src/app/admin/admin.route.js";
import guruRoute from "./src/app/guru/guru.route.js";
import siswaRoute from "./src/app/siswa/siswa.route.js";

const app = express()
const PORT = process.env.PORT || 9000

app.use(cors({ credentials: true, origin: '*' }))
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Penjadwalan Amin'
    })
})
app.use('/backdoor', backdoorRoute);
app.use('/users', usersRoute);
app.use('/upload', uploadRoute);
app.use('/mata-pelajaran', mataPelajaranRoute)
app.use('/admin', adminRoute)
app.use('/guru', guruRoute)
app.use('/siswa', siswaRoute)

app.listen(PORT, () => {
    console.log(`Server has running on port: ${PORT}`)
})