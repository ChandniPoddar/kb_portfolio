import mongoose from "mongoose";

// AUTHORITATIVE MONGODB URI (with fallback to localhost)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/karayabandhu";

// Dynamic Mongoose Connection Caching for Hot-Reloading Resiliency
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000, // Timeout fast if local DB is down
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((instance) => {
      console.log("🟢 LIVE: Connected to MongoDB Database successfully");
      return instance;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}

// ==========================================
// 📋 DATABASE MONGOOSE SCHEMAS DEFINITION
// ==========================================

const BrandSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  industry: { type: String, required: true },
  status: { type: String, required: true },
  stats: { type: String, required: true },
  links: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true }
    }
  ]
});

const JobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  desc: { type: String, required: true }
});

const ApplicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  personal: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  professional: {
    currentTitle: { type: String },
    experience: { type: String },
    expectedCtc: { type: String },
    noticePeriod: { type: String }
  },
  credentials: {
    skills: [{ type: String }],
    portfolio: { type: String },
    fileName: { type: String },
    fileUrl: { type: String }
  },
  statement: {
    pitch: { type: String },
    project: { type: String }
  },
  read: { type: Boolean, default: false }
});

const CredentialSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  passcode: { type: String, required: true },
  createdAt: { type: String, required: true }
});

const CertificateClaimSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  passcode: { type: String, required: true },
  claimedAt: { type: String, required: true },
  read: { type: Boolean, default: false }
});

const AcademyModuleSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  stepTitle: { type: String, required: true },
  moduleTitle: { type: String, required: true },
  duration: { type: String, required: true },
  desc: { type: String, required: true },
  videoUrl: { type: String, required: true },
  bgTheme: { type: String },
  embedColor: { type: String }
});

const PressSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subTitle: { type: String },
  content: { type: String, required: true },
  imageUrl: { type: String },
  publishedDate: { type: String },
  source: { type: String },
  sourceUrl: { type: String }
});

// Avoid re-declaring compilation models on hot-reloading
const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
const Application = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
const Credential = mongoose.models.Credential || mongoose.model("Credential", CredentialSchema);
const CertificateClaim = mongoose.models.CertificateClaim || mongoose.model("CertificateClaim", CertificateClaimSchema);
const AcademyModule = mongoose.models.AcademyModule || mongoose.model("AcademyModule", AcademyModuleSchema);
const Press = mongoose.models.Press || mongoose.model("Press", PressSchema);

// Helper to remove Mongoose-specific fields before responding
function cleanDoc(doc) {
  if (!doc) return doc;
  const cleaned = { ...doc };
  delete cleaned._id;
  delete cleaned.__v;
  return cleaned;
}

// ==========================================
// 💾 MONGO DB API CONTROLLERS
// ==========================================

// 1. INCUBATED BRANDS
export async function readBrands() {
  try {
    await connectDB();
    const brands = await Brand.find({}).lean();
    return brands.map(cleanDoc);
  } catch (err) {
    console.warn("Database offline, using fallback brands");
    return []; // Return empty array to trigger fallback UI smoothly
  }
}

export async function writeBrands(brandsArray) {
  await connectDB();
  await Brand.deleteMany({});
  if (brandsArray.length > 0) {
    const raw = brandsArray.map((b) => ({
      id: b.id,
      name: b.name,
      desc: b.desc,
      industry: b.industry,
      status: b.status,
      stats: b.stats,
      links: Array.isArray(b.links) ? b.links.map(l => ({ name: l.name, url: l.url })) : []
    }));
    await Brand.insertMany(raw);
  }
}

// 2. ACTIVE JOB OPENINGS
export async function readJobs() {
  await connectDB();
  const jobs = await Job.find({}).lean();
  return jobs.map(cleanDoc);
}

export async function writeJobs(jobsArray) {
  await connectDB();
  await Job.deleteMany({});
  if (jobsArray.length > 0) {
    const raw = jobsArray.map((j) => ({
      id: j.id,
      title: j.title,
      department: j.department,
      location: j.location,
      desc: j.desc
    }));
    await Job.insertMany(raw);
  }
}

// 3. CANDIDATE ATS APPLICATIONS
export async function readApplications() {
  await connectDB();
  const apps = await Application.find({}).lean();
  return apps.map(cleanDoc);
}

export async function writeApplications(appsArray) {
  await connectDB();
  await Application.deleteMany({});
  if (appsArray.length > 0) {
    const raw = appsArray.map((a) => ({
      id: a.id,
      category: a.category,
      personal: a.personal,
      professional: a.professional,
      credentials: {
        skills: a.credentials?.skills || [],
        portfolio: a.credentials?.portfolio || "",
        fileName: a.credentials?.fileName || "",
        fileUrl: a.credentials?.fileUrl || ""
      },
      statement: a.statement,
      read: a.read === true
    }));
    await Application.insertMany(raw);
  }
}

// 4. PROVIDER PASSCODES REGISTRY
export async function readCredentials() {
  await connectDB();
  const creds = await Credential.find({}).lean();
  return creds.map(cleanDoc);
}

export async function writeCredentials(credsArray) {
  await connectDB();
  await Credential.deleteMany({});
  if (credsArray.length > 0) {
    const raw = credsArray.map((c) => ({
      id: c.id,
      name: c.name,
      mobile: c.mobile,
      passcode: c.passcode,
      createdAt: c.createdAt
    }));
    await Credential.insertMany(raw);
  }
}

// 5. CLAIMED CERTIFICATES REGISTRY
export async function readCertificates() {
  await connectDB();
  const certs = await CertificateClaim.find({}).lean();
  return certs.map(cleanDoc);
}

export async function writeCertificates(certsArray) {
  await connectDB();
  await CertificateClaim.deleteMany({});
  if (certsArray.length > 0) {
    const raw = certsArray.map((c) => ({
      id: c.id,
      name: c.name,
      mobile: c.mobile,
      passcode: c.passcode,
      claimedAt: c.claimedAt,
      read: c.read === true
    }));
    await CertificateClaim.insertMany(raw);
  }
}

// 6. ACADEMY TRAINING MODULES
export async function readAcademyModules() {
  await connectDB();
  const modules = await AcademyModule.find({}).sort({ id: 1 }).lean();
  return modules.map(cleanDoc);
}

export async function writeAcademyModules(modulesArray) {
  await connectDB();
  await AcademyModule.deleteMany({});
  if (modulesArray.length > 0) {
    const raw = modulesArray.map((m) => ({
      id: Number(m.id),
      stepTitle: m.stepTitle,
      moduleTitle: m.moduleTitle,
      duration: m.duration,
      desc: m.desc,
      videoUrl: m.videoUrl,
      bgTheme: m.bgTheme || "from-blue-900 to-indigo-950",
      embedColor: m.embedColor || "bg-blue-950"
    }));
    await AcademyModule.insertMany(raw);
  }
}

// 7. PRESS & MEDIA ARTICLES
export async function readPress() {
  await connectDB();
  const press = await Press.find({}).sort({ publishedDate: -1 }).lean();
  return press.map(cleanDoc);
}

export async function writePress(pressArray) {
  await connectDB();
  await Press.deleteMany({});
  if (pressArray.length > 0) {
    const raw = pressArray.map((p) => ({
      id: p.id,
      title: p.title,
      subTitle: p.subTitle || "",
      content: p.content,
      imageUrl: p.imageUrl || "",
      publishedDate: p.publishedDate || new Date().toISOString().split("T")[0],
      source: p.source || "",
      sourceUrl: p.sourceUrl || ""
    }));
    await Press.insertMany(raw);
  }
}
