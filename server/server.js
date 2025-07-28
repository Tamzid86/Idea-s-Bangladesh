const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Passport = require("passport");
dotenv.config();
const path = require('path');


require("./controllers/auth");
const app = express();




// Middleware
app.use(session({
  secret: 'human',
  resave: false,                
  saveUninitialized: false}))
app.use(Passport.initialize());
app.use(Passport.session());

app.use(cors());

app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const postRoutes = require("./routes/postRoutes");
app.use("/api", postRoutes);

const getRoutes = require("./routes/getRoutes");
app.use("/api", getRoutes);

const ideaRoutes = require('./routes/ideaRoutes');
app.use('/api', ideaRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);



app.get('/api/google',
  Passport.authenticate('google', { scope: ['profile', 'email'] })    
)

app.get('/api/google/callback',
  Passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    const name = encodeURIComponent(req.user?.name || req.user?.displayName || "");
    const email = encodeURIComponent(req.user?.email || req.user?.emails?.[0]?.value || "");
    res.redirect(`http://localhost:3000/auth-success?name=${name}&email=${email}`);
  }
);


  app.get('auth/failure',
  (req, res) => {
    res.send("Something went wrong with authentication");
  })


app.get("/api/check-subscriber", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.json({ subscribed: false });
  const exists = await Subscriber.exists({ email });
  res.json({ subscribed: !!exists });
});


const adRoutes = require('./routes/adRoute');
app.use('/api', adRoutes);

const commentRoutes = require('./routes/comments');
app.use('/api/comments', commentRoutes);

const likeRoutes = require('./routes/likes');
app.use('/api', likeRoutes);

const newsletterRoutes = require('./routes/newsletter');
app.use('/api', newsletterRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//for auto add deletion
const cron = require('node-cron');
const Ad = require('./models/Ad'); // your ad model

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    const result = await Ad.deleteMany({ expiresAt: { $lt: now } });
    console.log(`🗑️ Deleted ${result.deletedCount} expired ads`);
  } catch (error) {
    console.error('Error deleting expired ads:', error);
  }
});
