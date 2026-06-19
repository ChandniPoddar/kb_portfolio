"use client";

import React, { useState, useEffect } from "react";

export default function AdminPortal() {
  const [theme, setTheme] = useState("dark");
  const [modalConfig, setModalConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const showAlert = (message, title = "Notification") => {
    setModalConfig({
      type: "alert",
      title,
      message,
      onConfirm: () => setModalConfig(null)
    });
  };

  const showConfirm = (message, title = "Confirm Action") => {
    return new Promise((resolve) => {
      setModalConfig({
        type: "confirm",
        title,
        message,
        onConfirm: () => {
          setModalConfig(null);
          resolve(true);
        },
        onCancel: () => {
          setModalConfig(null);
          resolve(false);
        }
      });
    });
  };

  // Shadow standard window alert in local scope
  const alert = (msg) => {
    showAlert(msg);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("kb-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  const isDark = theme === "dark";

  // Sidebar Tabs Navigation
  const [activeTab, setActiveTab] = useState("brands"); // brands | candidates | jobs | credentials | press
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Database States
  const [brands, setBrands] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [providerCredentials, setProviderCredentials] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [academyModules, setAcademyModules] = useState([]);
  const [pressArticles, setPressArticles] = useState([]);

  // Selected Detail Modal State for Candidate Review
  const [reviewCandidate, setReviewCandidate] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  // New Brand Input States
  const [brandName, setBrandName] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [brandIndustry, setBrandIndustry] = useState("");
  const [brandStatus, setBrandStatus] = useState("Conceptualization");
  const [brandStats, setBrandStats] = useState("");
  const [brandLinks, setBrandLinks] = useState([{ name: "", url: "" }]);

  // New Job Opening Input States
  const [jobTitle, setJobTitle] = useState("");
  const [jobDepartment, setJobDepartment] = useState("Engineering & Product");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  // New Provider Access Generator Input States
  const [providerName, setProviderName] = useState("");
  const [providerMobile, setProviderMobile] = useState("");
  const [createdAccount, setCreatedAccount] = useState(null);

  // New Academy Module States
  const [modStepTitle, setModStepTitle] = useState("");
  const [modModuleTitle, setModModuleTitle] = useState("");
  const [modDuration, setModDuration] = useState("");
  const [modDesc, setModDesc] = useState("");
  const [modVideoUrl, setModVideoUrl] = useState("");
  const [modId, setModId] = useState("");
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  // New Press Article Input States
  const [pressTitle, setPressTitle] = useState("");
  const [pressSubTitle, setPressSubTitle] = useState("");
  const [pressContent, setPressContent] = useState("");
  const [pressImage, setPressImage] = useState("");
  const [pressSource, setPressSource] = useState("");
  const [pressSourceUrl, setPressSourceUrl] = useState("");
  const [pressPublishedDate, setPressPublishedDate] = useState("");
  const [editingPress, setEditingPress] = useState(null);
  const [isUploadingPressImage, setIsUploadingPressImage] = useState(false);

  const loadData = async () => {
    try {
      const [brandsRes, jobsRes, appsRes, credsRes, certsRes, academyRes, pressRes] = await Promise.all([
        fetch("/api/brands").then(r => r.ok ? r.json() : null),
        fetch("/api/jobs").then(r => r.ok ? r.json() : null),
        fetch("/api/applications").then(r => r.ok ? r.json() : null),
        fetch("/api/credentials").then(r => r.ok ? r.json() : null),
        fetch("/api/certificates").then(r => r.ok ? r.json() : null),
        fetch("/api/academy").then(r => r.ok ? r.json() : null),
        fetch("/api/press").then(r => r.ok ? r.json() : null)
      ]);

      if (brandsRes) {
        setBrands(brandsRes);
        localStorage.setItem("kb-portfolio-brands", JSON.stringify(brandsRes));
      }
      if (jobsRes) {
        setJobs(jobsRes);
        localStorage.setItem("kb-job-openings", JSON.stringify(jobsRes));
      }
      if (appsRes) {
        setApplications(appsRes);
        localStorage.setItem("kb-careers-applications", JSON.stringify(appsRes));
      }
      if (credsRes) {
        setProviderCredentials(credsRes);
        localStorage.setItem("kb-provider-credentials", JSON.stringify(credsRes));
      }
      if (certsRes) {
        setCertificates(certsRes);
        localStorage.setItem("kb-claimed-certificates", JSON.stringify(certsRes));
      }
      if (academyRes) {
        setAcademyModules(academyRes);
        localStorage.setItem("kb-academy-modules", JSON.stringify(academyRes));
      }
      if (pressRes) {
        setPressArticles(pressRes);
        localStorage.setItem("kb-press-articles", JSON.stringify(pressRes));
      }
    } catch (err) {
      console.error("Failed to load databases from API:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Dynamic Storage Listener for Multi-Tab Sync
    const handleStorageChange = (e) => {
      if (e.key === "kb-careers-applications" && e.newValue) {
        setApplications(JSON.parse(e.newValue));
      }
      if (e.key === "kb-provider-credentials" && e.newValue) {
        setProviderCredentials(JSON.parse(e.newValue));
      }
      if (e.key === "kb-job-openings" && e.newValue) {
        setJobs(JSON.parse(e.newValue));
      }
      if (e.key === "kb-portfolio-brands" && e.newValue) {
        setBrands(JSON.parse(e.newValue));
      }
      if (e.key === "kb-claimed-certificates" && e.newValue) {
        setCertificates(JSON.parse(e.newValue));
      }
      if (e.key === "kb-academy-modules" && e.newValue) {
        setAcademyModules(JSON.parse(e.newValue));
      }
      if (e.key === "kb-press-articles" && e.newValue) {
        setPressArticles(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (activeTab === "certificates" && certificates.length > 0) {
      const unreadCerts = certificates.filter(c => !c.read);
      if (unreadCerts.length > 0) {
        const ids = unreadCerts.map(c => c.id);
        fetch("/api/certificates", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids, read: true })
        })
        .then(res => {
          if (res.ok) {
            const updated = certificates.map(c => ids.includes(c.id) ? { ...c, read: true } : c);
            setCertificates(updated);
            localStorage.setItem("kb-claimed-certificates", JSON.stringify(updated));
          }
        })
        .catch(err => console.error("Failed to mark certificates as read:", err));
      }
    }
  }, [activeTab, certificates]);

  // --- ACTIONS: AUTH SYSTEM ---
  const handleLogout = async () => {
    if (await showConfirm("Are you sure you want to sign out from the Admin Control Panel?")) {
      try {
        await fetch("/api/admin/logout", { method: "POST" });
      } catch (err) {
        console.error("Logout request failed:", err);
      }
      window.location.reload();
    }
  };

  // --- ACTIONS: BRANDS MANAGER ---
  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!brandName.trim() || !brandDesc.trim() || !brandIndustry.trim() || !brandStats.trim()) {
      alert("Please fill in all portfolio brand inputs.");
      return;
    }

    const filteredLinks = brandLinks.filter(l => l.name.trim() !== "" && l.url.trim() !== "");

    const newBrandObj = {
      id: "brand-" + Date.now(),
      name: brandName,
      desc: brandDesc,
      industry: brandIndustry,
      status: brandStatus,
      stats: brandStats,
      links: filteredLinks
    };

    try {
      const res = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBrandObj)
      });
      if (res.ok) {
        const updated = [...brands, newBrandObj];
        setBrands(updated);
        localStorage.setItem("kb-portfolio-brands", JSON.stringify(updated));

        // Clear inputs
        setBrandName("");
        setBrandDesc("");
        setBrandIndustry("");
        setBrandStatus("Conceptualization");
        setBrandStats("");
        setBrandLinks([{ name: "", url: "" }]);
        alert("New digital portfolio brand added successfully!");
      } else {
        alert("Failed to save brand to backend database.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting API database server.");
    }
  };

  const handleDeleteBrand = async (id) => {
    if (await showConfirm("Are you sure you want to delete this incubated brand?")) {
      try {
        const res = await fetch(`/api/brands?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          const updated = brands.filter((b) => b.id !== id);
          setBrands(updated);
          localStorage.setItem("kb-portfolio-brands", JSON.stringify(updated));
        } else {
          alert("Failed to delete brand from backend.");
        }
      } catch (err) {
        console.error(err);
        alert("Network error deleting brand.");
      }
    }
  };

  const handleStartEditBrand = (b) => {
    setEditingBrand(b);
    setBrandName(b.name);
    setBrandDesc(b.desc);
    setBrandIndustry(b.industry);
    setBrandStatus(b.status);
    setBrandStats(b.stats);
    setBrandLinks(b.links && b.links.length > 0 ? b.links.map(l => ({ name: l.name, url: l.url })) : [{ name: "", url: "" }]);
  };

  const handleCancelEditBrand = () => {
    setEditingBrand(null);
    setBrandName("");
    setBrandDesc("");
    setBrandIndustry("");
    setBrandStatus("Conceptualization");
    setBrandStats("");
    setBrandLinks([{ name: "", url: "" }]);
  };

  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    if (!brandName.trim() || !brandDesc.trim() || !brandIndustry.trim() || !brandStats.trim()) {
      alert("Please fill in all portfolio brand inputs.");
      return;
    }

    const filteredLinks = brandLinks.filter(l => l.name.trim() !== "" && l.url.trim() !== "");

    const updatedBrandObj = {
      ...editingBrand,
      name: brandName,
      desc: brandDesc,
      industry: brandIndustry,
      status: brandStatus,
      stats: brandStats,
      links: filteredLinks
    };

    try {
      const res = await fetch("/api/brands", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBrandObj)
      });
      if (res.ok) {
        const updated = brands.map((b) => (b.id === editingBrand.id ? updatedBrandObj : b));
        setBrands(updated);
        localStorage.setItem("kb-portfolio-brands", JSON.stringify(updated));
        handleCancelEditBrand();
        alert("Portfolio brand updated successfully!");
      } else {
        alert("Failed to update brand in database.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting API database server.");
    }
  };

  // --- ACTIONS: JOB BOARD MANAGER ---
  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!jobTitle.trim() || !jobLocation.trim() || !jobDesc.trim() || !jobDepartment.trim()) {
      alert("Please fill in all job opening inputs.");
      return;
    }

    const newJobObj = {
      id: "job-" + Date.now(),
      title: jobTitle,
      department: jobDepartment,
      location: jobLocation,
      desc: jobDesc
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJobObj)
      });
      if (res.ok) {
        const updated = [...jobs, newJobObj];
        setJobs(updated);
        localStorage.setItem("kb-job-openings", JSON.stringify(updated));

        // Clear inputs
        setJobTitle("");
        setJobLocation("");
        setJobDesc("");
        alert("New job opening added successfully to core board!");
      } else {
        alert("Failed to save job to backend database.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting API database server.");
    }
  };

  const handleDeleteJob = async (id) => {
    if (await showConfirm("Are you sure you want to delete this career opening?")) {
      try {
        const res = await fetch(`/api/jobs?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          const updated = jobs.filter((j) => j.id !== id);
          setJobs(updated);
          localStorage.setItem("kb-job-openings", JSON.stringify(updated));
        } else {
          alert("Failed to delete job from backend.");
        }
      } catch (err) {
        console.error(err);
        alert("Network error deleting job.");
      }
    }
  };

  const handleStartEditJob = (j) => {
    setEditingJob(j);
    setJobTitle(j.title);
    setJobDepartment(j.department);
    setJobLocation(j.location);
    setJobDesc(j.desc);
  };

  const handleCancelEditJob = () => {
    setEditingJob(null);
    setJobTitle("");
    setJobDepartment("Engineering & Product");
    setJobLocation("");
    setJobDesc("");
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    if (!jobTitle.trim() || !jobLocation.trim() || !jobDesc.trim() || !jobDepartment.trim()) {
      alert("Please fill in all job opening inputs.");
      return;
    }

    const updatedJobObj = {
      ...editingJob,
      title: jobTitle,
      department: jobDepartment,
      location: jobLocation,
      desc: jobDesc
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedJobObj)
      });
      if (res.ok) {
        const updated = jobs.map((j) => (j.id === editingJob.id ? updatedJobObj : j));
        setJobs(updated);
        localStorage.setItem("kb-job-openings", JSON.stringify(updated));
        handleCancelEditJob();
        alert("Job opening updated successfully!");
      } else {
        alert("Failed to update job in database.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting API database server.");
    }
  };

  // --- ACTIONS: CANDIDATE HUB ---
  const handleReviewCandidate = async (app) => {
    setReviewCandidate(app);
    if (!app.read) {
      try {
        const res = await fetch("/api/applications", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: app.id, read: true })
        });
        if (res.ok) {
          const updated = applications.map((a) => a.id === app.id ? { ...a, read: true } : a);
          setApplications(updated);
          localStorage.setItem("kb-careers-applications", JSON.stringify(updated));
        }
      } catch (err) {
        console.error("Failed to mark application as read:", err);
      }
    }
  };

  const handleDeleteApplication = async (index) => {
    if (await showConfirm("Are you sure you want to delete this candidate application record?")) {
      try {
        const appObj = applications[index];
        const deleteParam = appObj && appObj.id ? `id=${appObj.id}` : `index=${index}`;
        const res = await fetch(`/api/applications?${deleteParam}`, { method: "DELETE" });
        if (res.ok) {
          const updated = applications.filter((_, i) => i !== index);
          setApplications(updated);
          localStorage.setItem("kb-careers-applications", JSON.stringify(updated));
        } else {
          alert("Failed to delete candidate application from backend.");
        }
      } catch (err) {
        console.error(err);
        alert("Network error deleting application.");
      }
    }
  };

  // --- ACTIONS: PROVIDER REGISTER & PASSWORD GENERATOR ---
  const handleGenerateProviderCredentials = async (e) => {
    e.preventDefault();
    if (!providerName.trim() || !providerMobile.trim()) {
      alert("Please enter both provider name and mobile number.");
      return;
    }

    if (providerMobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    // Check if mobile number is already registered in registry
    const exists = providerCredentials.some((c) => c.mobile === providerMobile);
    if (exists) {
      alert("This mobile number is already registered in the provider registry.");
      return;
    }

    // Auto-generate a secure custom passcode like 'KB-BANDHU-XXXX'
    const code = "KB-BANDHU-" + Math.floor(1000 + Math.random() * 9000);

    const newCredObj = {
      id: "provider-" + Date.now(),
      name: providerName,
      mobile: providerMobile,
      passcode: code,
      createdAt: new Date().toLocaleDateString()
    };

    try {
      const res = await fetch("/api/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCredObj)
      });
      if (res.ok) {
        const updated = [...providerCredentials, newCredObj];
        setProviderCredentials(updated);
        localStorage.setItem("kb-provider-credentials", JSON.stringify(updated));

        setCreatedAccount(newCredObj);
        setProviderName("");
        setProviderMobile("");
      } else {
        alert("Failed to save credentials to backend database.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting API database server.");
    }
  };

  const handleDeleteCredentials = async (id) => {
    if (await showConfirm("Are you sure you want to revoke training access for this partner?")) {
      try {
        const res = await fetch(`/api/credentials?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          const updated = providerCredentials.filter((c) => c.id !== id);
          setProviderCredentials(updated);
          localStorage.setItem("kb-provider-credentials", JSON.stringify(updated));
          if (createdAccount && createdAccount.id === id) {
            setCreatedAccount(null);
          }
        } else {
          alert("Failed to revoke partner access from backend.");
        }
      } catch (err) {
        console.error(err);
        alert("Network error revoking access.");
      }
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (await showConfirm("Are you sure you want to delete this certificate claim record?")) {
      try {
        const res = await fetch(`/api/certificates?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          const updated = certificates.filter((c) => c.id !== id);
          setCertificates(updated);
          localStorage.setItem("kb-claimed-certificates", JSON.stringify(updated));
        } else {
          alert("Failed to delete certificate record from backend database.");
        }
      } catch (err) {
        console.error(err);
        alert("Network error deleting certificate.");
      }
    }
  };

  const handleVideoFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit video file size to 150MB to ensure smooth loading and processing
    const limitBytes = 150 * 1024 * 1024;
    if (file.size > limitBytes) {
      alert("Selected video file is too large (max 150MB allowed). Please compress it first.");
      return;
    }

    setIsUploadingVideo(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setModVideoUrl(data.url);
          alert("Video file uploaded successfully! Ready to publish.");
        } else {
          alert("Upload returned an invalid payload.");
        }
      } else {
        const errData = await res.json();
        alert("Upload failed: " + (errData.error || "Server error"));
      }
    } catch (err) {
      console.error("Video upload error:", err);
      alert("Error sending video file to upload API.");
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleAddAcademyModule = async (e) => {
    e.preventDefault();
    if (!modStepTitle.trim() || !modModuleTitle.trim() || !modVideoUrl.trim()) {
      alert("Please enter Step Title, Module Title, and Video URL.");
      return;
    }

    const parsedId = modId ? Number(modId) : (academyModules.length > 0 ? Math.max(...academyModules.map(m => m.id)) + 1 : 1);

    const newMod = {
      id: parsedId,
      stepTitle: modStepTitle.trim(),
      moduleTitle: modModuleTitle.trim(),
      duration: modDuration.trim() || "5 mins",
      desc: modDesc.trim(),
      videoUrl: modVideoUrl.trim(),
      bgTheme: parsedId % 3 === 1
        ? "from-blue-900 to-indigo-950"
        : parsedId % 3 === 2
          ? "from-indigo-900 to-slate-950"
          : "from-slate-900 to-emerald-950",
      embedColor: parsedId % 3 === 1
        ? "bg-blue-950"
        : parsedId % 3 === 2
          ? "bg-slate-950"
          : "bg-emerald-950"
    };

    try {
      const res = await fetch("/api/academy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMod)
      });
      if (res.ok) {
        const updatedRes = await fetch("/api/academy").then(r => r.json());
        setAcademyModules(updatedRes);
        localStorage.setItem("kb-academy-modules", JSON.stringify(updatedRes));

        setModStepTitle("");
        setModModuleTitle("");
        setModDuration("");
        setModDesc("");
        setModVideoUrl("");
        setModId("");
        alert("Training Academy module added successfully!");
      } else {
        alert("Failed to save training module to backend.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error saving training module.");
    }
  };

  const handleDeleteAcademyModule = async (id) => {
    if (await showConfirm(`Are you sure you want to delete Module Step ${id}?`)) {
      try {
        const res = await fetch(`/api/academy?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          const updated = academyModules.filter((m) => m.id !== id);
          setAcademyModules(updated);
          localStorage.setItem("kb-academy-modules", JSON.stringify(updated));
        } else {
          alert("Failed to delete module from backend.");
        }
      } catch (err) {
        console.error(err);
        alert("Network error deleting module.");
      }
    }
  };

  const handleUploadPressImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingPressImage(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setPressImage(data.url);
        alert("Press image uploaded successfully!");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error uploading image.");
    } finally {
      setIsUploadingPressImage(false);
    }
  };

  const handleSavePressArticle = async (e) => {
    e.preventDefault();
    if (!pressTitle || !pressContent) {
      alert("Title and Content are required.");
      return;
    }
    const payload = {
      id: editingPress ? editingPress.id : "press_" + Date.now(),
      title: pressTitle,
      subTitle: pressSubTitle,
      content: pressContent,
      imageUrl: pressImage,
      source: pressSource,
      sourceUrl: pressSourceUrl,
      publishedDate: pressPublishedDate || new Date().toISOString().split("T")[0]
    };
    try {
      const res = await fetch("/api/press", {
        method: editingPress ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const updated = await fetch("/api/press").then(r => r.json());
        setPressArticles(updated);
        localStorage.setItem("kb-press-articles", JSON.stringify(updated));

        setPressTitle("");
        setPressSubTitle("");
        setPressContent("");
        setPressImage("");
        setPressSource("");
        setPressSourceUrl("");
        setPressPublishedDate("");
        setEditingPress(null);
        alert(editingPress ? "Press article updated successfully!" : "Press article published successfully!");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save press article.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error saving press article.");
    }
  };

  const handleDeletePressArticle = async (id) => {
    if (await showConfirm("Are you sure you want to delete this press article?")) {
      try {
        const res = await fetch(`/api/press?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          const updated = pressArticles.filter((p) => p.id !== id);
          setPressArticles(updated);
          localStorage.setItem("kb-press-articles", JSON.stringify(updated));
        } else {
          alert("Failed to delete press article.");
        }
      } catch (err) {
        console.error(err);
        alert("Network error deleting press article.");
      }
    }
  };

  const handleEditPressArticle = (art) => {
    setEditingPress(art);
    setPressTitle(art.title);
    setPressSubTitle(art.subTitle || "");
    setPressContent(art.content);
    setPressImage(art.imageUrl || "");
    setPressSource(art.source || "");
    setPressSourceUrl(art.sourceUrl || "");
    setPressPublishedDate(art.publishedDate || "");
  };

  const handleCancelEditPress = () => {
    setEditingPress(null);
    setPressTitle("");
    setPressSubTitle("");
    setPressContent("");
    setPressImage("");
    setPressSource("");
    setPressSourceUrl("");
    setPressPublishedDate("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Syncing Admin Control Databases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">

      {/* Dynamic Scoped Styles override for clean custom layout */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: fadeInDown 0.2s ease-out forwards;
        }
      `}} />

      {/* Top Banner Navigation bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <img
            src="/logo-removebg-preview.png"
            alt="Karaya Bandhu Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span className="font-bold text-sm sm:text-base text-white tracking-tight">
            Karaya Bandhu Administrative Panel
          </span>
          <span className="hidden sm:inline-block text-[9px] sm:text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase tracking-widest whitespace-nowrap">
            Control Center v1
          </span>
        </div>

        {/* Desktop Header Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href="/"
            className="text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 px-3.5 py-2 rounded-xl transition-all border border-slate-700/60"
          >
            ← View Main Website
          </a>
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-red-400 hover:text-white bg-red-950/20 hover:bg-red-650 px-3.5 py-2 rounded-xl transition-all border border-red-900/30 cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-700/60 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-6 space-y-5 animate-slideDown z-30 relative">
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1">
              Navigation Dashboard
            </span>

            <button
              onClick={() => {
                setActiveTab("brands");
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "brands"
                ? "bg-blue-600 text-white"
                : "bg-slate-950/40 border border-slate-950 text-slate-400 hover:text-white"
                }`}
            >
              <span>📁</span>
              <span>Incubated Brands</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("candidates");
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "candidates"
                ? "bg-blue-600 text-white"
                : "bg-slate-950/40 border border-slate-950 text-slate-400 hover:text-white"
                }`}
            >
              <span className="flex items-center space-x-2.5">
                <span>✉️</span>
                <span>Candidate Hub</span>
              </span>
              {applications.filter(a => !a.read).length > 0 && (
                <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                  {applications.filter(a => !a.read).length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("jobs");
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "jobs"
                ? "bg-blue-600 text-white"
                : "bg-slate-950/40 border border-slate-950 text-slate-400 hover:text-white"
                }`}
            >
              <span>💼</span>
              <span>Job Board Manager</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("credentials");
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "credentials"
                ? "bg-blue-600 text-white"
                : "bg-slate-950/40 border border-slate-950 text-slate-400 hover:text-white"
                }`}
            >
              <span>🔑</span>
              <span>Provider Registry</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("certificates");
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "certificates"
                ? "bg-blue-600 text-white"
                : "bg-slate-950/40 border border-slate-950 text-slate-400 hover:text-white"
                }`}
            >
              <span className="flex items-center space-x-2.5">
                <span>Certificates Claim</span>
              </span>
              {certificates.filter(c => !c.read).length > 0 && (
                <span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                  {certificates.filter(c => !c.read).length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("academy");
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "academy"
                ? "bg-blue-600 text-white"
                : "bg-slate-950/40 border border-slate-950 text-slate-400 hover:text-white"
                }`}
            >
              <span>Academy Modules</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("press");
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "press"
                ? "bg-blue-600 text-white"
                : "bg-slate-950/40 border border-slate-950 text-slate-400 hover:text-white"
                }`}
            >
              <span>Press & Media</span>
            </button>
          </div>

          <div className="border-t border-slate-800 pt-4 flex items-center gap-3">
            <a
              href="/"
              className="text-xs font-bold text-slate-400 hover:text-white bg-slate-850 hover:bg-slate-800 px-3.5 py-2.5 rounded-xl transition-all border border-slate-800 text-center flex-1"
            >
              ← View Website
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="text-xs font-bold text-red-400 hover:text-white bg-red-950/20 hover:bg-red-955 px-3.5 py-2.5 rounded-xl transition-all border border-red-900/20 cursor-pointer text-center flex-1"
            >
              LogOut
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Layout Container */}
      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto px-4 sm:px-6 py-8 gap-8 lg:h-[calc(100vh-140px)] lg:overflow-hidden">

        {/* Left Control Sidebar */}
        <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col bg-slate-900/40 border border-slate-900 p-6 rounded-3xl h-full overflow-y-auto no-scrollbar">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-3 mb-2.5 block">
            Navigation Dashboard
          </span>

          <div className="flex flex-col gap-5">
            <button
              onClick={() => setActiveTab("brands")}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "brands"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                : "bg-slate-950/40 hover:bg-slate-900 border border-slate-950 hover:border-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              <span className="truncate">Incubated Brands</span>
            </button>

            <button
              onClick={() => setActiveTab("candidates")}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "candidates"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                : "bg-slate-950/40 hover:bg-slate-900 border border-slate-950 hover:border-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              <span className="flex items-center space-x-2.5 truncate">
                <span className="truncate">Candidate Hub</span>
              </span>
              {applications.filter(a => !a.read).length > 0 && (
                <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ml-1">
                  {applications.filter(a => !a.read).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "jobs"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                : "bg-slate-950/40 hover:bg-slate-900 border border-slate-950 hover:border-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              <span className="truncate">Job Board Manager</span>
            </button>

            <button
              onClick={() => setActiveTab("credentials")}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "credentials"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                : "bg-slate-950/40 hover:bg-slate-900 border border-slate-950 hover:border-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              <span className="truncate">Provider Registry</span>
            </button>

            <button
              onClick={() => setActiveTab("certificates")}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "certificates"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                : "bg-slate-950/40 hover:bg-slate-900 border border-slate-950 hover:border-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              <span className="flex items-center space-x-2.5 truncate">
                <span className="truncate">Certificates Claims</span>
              </span>
              {certificates.filter(c => !c.read).length > 0 && (
                <span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ml-1">
                  {certificates.filter(c => !c.read).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("academy")}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "academy"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                : "bg-slate-950/40 hover:bg-slate-900 border border-slate-950 hover:border-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              <span className="truncate">Academy Modules</span>
            </button>

            <button
              onClick={() => setActiveTab("press")}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === "press"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                : "bg-slate-950/40 hover:bg-slate-900 border border-slate-950 hover:border-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              <span className="truncate">Press & Media</span>
            </button>
          </div>
        </aside>

        {/* Right Main Management Hub */}
        <main className="flex-1 bg-slate-900/40 border border-slate-900 p-6 sm:p-8 rounded-3xl h-full overflow-y-auto no-scrollbar">

          {/* TAB 1: INCUBATED BRANDS MANAGER */}
          {activeTab === "brands" && (
            <div className="space-y-8">
              <div className="flex justify-between items-start border-b border-slate-850 pb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Incubated Brands</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage your portfolio grid displayed on the homepage. Any additions or edits will dynamically update the front-end layout!
                  </p>
                </div>
              </div>

              {/* Add/Edit Brand Form */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-4">
                  {editingBrand ? `Edit Brand: ${editingBrand.name}` : "Add Brand to Portfolio"}
                </h3>
                <form onSubmit={editingBrand ? handleUpdateBrand : handleAddBrand} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Brand Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KB FinTech"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Industry *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Micro-Financing & SaaS"
                      value={brandIndustry}
                      onChange={(e) => setBrandIndustry(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Launch Status *</label>
                    <select
                      value={brandStatus}
                      onChange={(e) => setBrandStatus(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white dark:bg-slate-950"
                    >
                      <option value="Live & Scaling">Live & Scaling</option>
                      <option value="Beta Launch">Beta Launch</option>
                      <option value="Conceptualization">Conceptualization</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Active Metrics/Stats *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5,000+ Partners / Future Launch"
                      value={brandStats}
                      onChange={(e) => setBrandStats(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 md:col-span-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Detailed Description *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Describe the operations, core systems, and target audience..."
                      value={brandDesc}
                      onChange={(e) => setBrandDesc(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white resize-none no-scrollbar"
                    />
                  </div>

                  {/* Custom Links Section */}
                  <div className="md:col-span-2 border-t border-slate-800 pt-4 mt-2">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold text-slate-350 uppercase tracking-wider">
                        Brand Call-to-Action Links
                      </span>
                      <button
                        type="button"
                        onClick={() => setBrandLinks([...brandLinks, { name: "", url: "" }])}
                        className="bg-slate-850 hover:bg-slate-800 text-slate-200 text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                      >
                        + Add Custom Link
                      </button>
                    </div>

                    <div className="space-y-3">
                      {brandLinks.map((link, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-slate-950/40 p-3 border border-slate-850 rounded-xl">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex flex-col space-y-1">
                              <label className="text-[8px] font-bold text-slate-455 uppercase tracking-wider">Link Name *</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Explore Platform"
                                value={link.name}
                                onChange={(e) => {
                                  const updated = [...brandLinks];
                                  updated[index].name = e.target.value;
                                  setBrandLinks(updated);
                                }}
                                className="bg-slate-950 border border-slate-800 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                              />
                            </div>
                            <div className="flex flex-col space-y-1">
                              <label className="text-[8px] font-bold text-slate-455 uppercase tracking-wider">Destination URL *</label>
                              <input
                                type="url"
                                required
                                placeholder="e.g. https://marketplace.karayabandhu.com"
                                value={link.url}
                                onChange={(e) => {
                                  const updated = [...brandLinks];
                                  updated[index].url = e.target.value;
                                  setBrandLinks(updated);
                                }}
                                className="bg-slate-950 border border-slate-800 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = brandLinks.filter((_, i) => i !== index);
                              setBrandLinks(updated.length > 0 ? updated : [{ name: "", url: "" }]);
                            }}
                            className="text-red-400 hover:text-red-300 text-xs font-bold pt-4 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 pt-2 text-right space-x-3">
                    {editingBrand && (
                      <button
                        type="button"
                        onClick={handleCancelEditBrand}
                        className="bg-slate-850 hover:bg-slate-800 text-slate-350 hover:text-white text-xs font-bold px-6 py-3 rounded-xl cursor-pointer transition-colors"
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-750 text-white text-xs font-bold px-6 py-3 rounded-xl cursor-pointer transition-colors shadow-md shadow-blue-500/10"
                    >
                      {editingBrand ? "Save Brand Changes" : "Publish Brand to Ecosystem"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Active Portfolio Grid List */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 block">
                  Ecosystem Portfolio Registry ({brands.length})
                </span>

                <div className="overflow-x-auto border border-slate-850 rounded-2xl bg-slate-950/20">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-6 py-4">Brand Profile</th>
                        <th className="px-6 py-4">Industry Sector</th>
                        <th className="px-6 py-4">Launch Status</th>
                        <th className="px-6 py-4">Active Stats</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {brands.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-900/40">
                          <td className="px-6 py-4 font-bold text-white">
                            <div>{b.name}</div>
                            <div className="text-[10px] text-slate-500 font-normal mt-1 line-clamp-1 max-w-xs">{b.desc}</div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-350">{b.industry}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${b.status.includes("Live")
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : b.status.includes("Beta")
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-200">{b.stats}</td>
                          <td className="px-6 py-4 text-center space-x-3">
                            <button
                              onClick={() => handleStartEditBrand(b)}
                              className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-slate-800">|</span>
                            <button
                              onClick={() => handleDeleteBrand(b.id)}
                              className="text-red-400 hover:text-red-300 font-bold cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CANDIDATE HUB */}
          {activeTab === "candidates" && (
            <div className="space-y-8">
              <div className="flex justify-between items-start border-b border-slate-850 pb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Candidate Hub (ATS)</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Review and verify applicants who applied through your frontend Jobs matrix.
                  </p>
                </div>
              </div>

              {applications.length === 0 ? (
                <div className="border border-dashed border-slate-800 rounded-3xl p-16 text-center">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-slate-500 mx-auto mb-4">
                    ✉️
                  </div>
                  <h3 className="text-sm font-bold text-slate-350">No Candidates Logged Yet</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    When applicants submit their details through the Careers Application Modal, their complete profile parameters will automatically populate here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 block">
                    Active Candidates Registry ({applications.length})
                  </span>

                  <div className="overflow-x-auto border border-slate-850 rounded-2xl bg-slate-950/20">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="px-6 py-4">Applicant</th>
                          <th className="px-6 py-4">Applied Division</th>
                          <th className="px-6 py-4">Experience</th>
                          <th className="px-6 py-4">Expected CTC</th>
                          <th className="px-6 py-4">Resume / CV</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {applications.map((app, index) => (
                          <tr key={index} className={`hover:bg-slate-900/40 ${!app.read ? "border-l-2 border-blue-500" : ""}`}>
                            <td className="px-6 py-4">
                              <div className="font-bold text-white flex items-center gap-2">
                                {!app.read && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />}
                                {app.personal.name}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{app.personal.email}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{app.personal.phone}</div>
                            </td>
                            <td className="px-6 py-4 font-bold text-blue-400">{app.category}</td>
                            <td className="px-6 py-4 font-semibold text-slate-300">{app.professional.experience}</td>
                            <td className="px-6 py-4 font-bold text-slate-200">{app.professional.expectedCtc}</td>
                            <td className="px-6 py-4 font-mono font-bold text-green-400">
                              {app.credentials.fileUrl ? (
                                <a
                                  href={app.credentials.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="truncate max-w-[150px] inline-block hover:text-green-300 hover:underline transition-colors"
                                >
                                  📄 {app.credentials.fileName}
                                </a>
                              ) : app.credentials.fileName !== "None provided" ? (
                                <span className="truncate max-w-[150px] inline-block text-slate-400">📄 {app.credentials.fileName}</span>
                              ) : (
                                <span className="text-slate-600 font-normal">No file</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center space-x-3">
                              <button
                                onClick={() => handleReviewCandidate(app)}
                                className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
                              >
                                View Profile
                              </button>
                              <span className="text-slate-700">|</span>
                              <button
                                onClick={() => handleDeleteApplication(index)}
                                className="text-red-400 hover:text-red-300 font-bold cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: JOB BOARD MANAGER */}
          {activeTab === "jobs" && (
            <div className="space-y-8">
              <div className="flex justify-between items-start border-b border-slate-850 pb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Job Board Management</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage active employment vacancies inside the Careers grid. Additions instantly sync with the Careers segment in real-time!
                  </p>
                </div>
              </div>

              {/* Add/Edit Job Form */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-4">
                  {editingJob ? `Edit Vacancy: ${editingJob.title}` : "Post a New Vacancy"}
                </h3>
                <form onSubmit={editingJob ? handleUpdateJob : handleAddJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Job Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lead Business Analyst"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hiring Department *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engineering & Product / Security & Cloud Operations"
                      value={jobDepartment}
                      onChange={(e) => setJobDepartment(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Work Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Patna HQ / Chandigarh / Mohali"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 md:col-span-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Brief Overview of Duties *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. Direct operations, analyze financial metrics, and lead field launches..."
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white resize-none"
                    />
                  </div>
                  <div className="md:col-span-2 pt-2 text-right space-x-3">
                    {editingJob && (
                      <button
                        type="button"
                        onClick={handleCancelEditJob}
                        className="bg-slate-850 hover:bg-slate-800 text-slate-350 hover:text-white text-xs font-bold px-6 py-3 rounded-xl cursor-pointer transition-colors"
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-750 text-white text-xs font-bold px-6 py-3 rounded-xl cursor-pointer transition-colors shadow-md shadow-blue-500/10"
                    >
                      {editingJob ? "Save Vacancy Changes" : "Publish Vacancy to Portal"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Active Jobs Grid List */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-550 uppercase tracking-widest pl-1 block">
                  Active Vacancies Index ({jobs.length})
                </span>

                <div className="overflow-x-auto border border-slate-850 rounded-2xl bg-slate-950/20">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-6 py-4">Job Title</th>
                        <th className="px-6 py-4">Division</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Short Description</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {jobs.map((j) => (
                        <tr key={j.id} className="hover:bg-slate-900/40">
                          <td className="px-6 py-4 font-bold text-white">{j.title}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${j.department.includes("Eng")
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : j.department.includes("Ops")
                                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              }`}>
                              {j.department}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-350">{j.location}</td>
                          <td className="px-6 py-4 text-slate-400 truncate max-w-[200px]">{j.desc}</td>
                          <td className="px-6 py-4 text-center space-x-3">
                            <button
                              onClick={() => handleStartEditJob(j)}
                              className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-slate-800">|</span>
                            <button
                              onClick={() => handleDeleteJob(j.id)}
                              className="text-red-400 hover:text-red-300 font-bold cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PROVIDER ACCESS GENERATOR */}
          {activeTab === "credentials" && (
            <div className="space-y-8">
              <div className="flex justify-between items-start border-b border-slate-850 pb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Provider Credentials Generator</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Add verified providers who want to access the Training Academy. Passkeys created here **will immediately work** for logins!
                  </p>
                </div>
              </div>

              {/* Access Key Generator Form */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-4">
                  Generate Secure Access Passkey
                </h3>
                <form onSubmit={handleGenerateProviderCredentials} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Provider Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={providerName}
                      onChange={(e) => setProviderName(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Mobile Number (10 Digits) *</label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      placeholder="e.g. 9876500000"
                      value={providerMobile}
                      onChange={(e) => setProviderMobile(e.target.value.replace(/\D/g, ""))}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white font-mono"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-750 text-white text-xs font-bold px-6 py-3 rounded-xl cursor-pointer transition-colors shadow-md shadow-blue-500/10"
                    >
                      Generate Secure Key →
                    </button>
                  </div>
                </form>

                {/* Display Newly Created Key Box */}
                {createdAccount && (
                  <div className="mt-6 border border-emerald-900/35 bg-emerald-950/20 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-[bounce_0.6s_ease-out_1]">
                    <div>
                      <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                        SUCCESSFULLY REGISTERED
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1.5">
                        Account Generated for {createdAccount.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        This partner can now bypass the Training Gate immediately on the homepage with these credentials.
                      </p>
                    </div>

                    <div className="bg-slate-950 border border-slate-850 px-4 py-3 rounded-xl flex items-center gap-4">
                      <div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Mobile</div>
                        <div className="text-xs font-mono font-bold text-white">{createdAccount.mobile}</div>
                      </div>
                      <div className="w-px h-6 bg-slate-800" />
                      <div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Passkey</div>
                        <div className="text-xs font-mono font-bold text-emerald-400">{createdAccount.passcode}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Active Provider Registry Table List */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 block">
                  Registered Bandhu Registry ({providerCredentials.length})
                </span>

                {providerCredentials.length === 0 ? (
                  <div className="border border-slate-850 rounded-2xl bg-slate-950/25 p-8 text-center text-xs text-slate-500">
                    No generated credentials yet. Fill in the form above to register your first Provider.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-slate-850 rounded-2xl bg-slate-950/20">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="px-6 py-4">Provider Account</th>
                          <th className="px-6 py-4">Registered Mobile</th>
                          <th className="px-6 py-4">Secure Passkey</th>
                          <th className="px-6 py-4">Registration Date</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {providerCredentials.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-900/40">
                            <td className="px-6 py-4 font-bold text-white">{c.name}</td>
                            <td className="px-6 py-4 font-mono font-bold text-slate-350">+91 {c.mobile}</td>
                            <td className="px-6 py-4 font-mono font-bold text-emerald-400">{c.passcode}</td>
                            <td className="px-6 py-4 font-medium text-slate-450">{c.createdAt}</td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleDeleteCredentials(c.id)}
                                className="text-red-400 hover:text-red-300 font-bold cursor-pointer"
                              >
                                Revoke Access
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 5: CERTIFICATES MANAGER */}
          {activeTab === "certificates" && (
            <div className="space-y-8">
              <div className="flex justify-between items-start border-b border-slate-850 pb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Certificate Claims</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Monitor which providers have successfully unlocked and generated their compliance certificates.
                  </p>
                </div>
              </div>

              {/* Active Provider Certificates List */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 block">
                  Generated Certificates Registry ({certificates.length})
                </span>

                {certificates.length === 0 ? (
                  <div className="border border-slate-850 rounded-2xl bg-slate-950/25 p-8 text-center text-xs text-slate-500">
                    No compliance certificates generated by providers yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-slate-850 rounded-2xl bg-slate-950/20">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="px-6 py-4">Provider Name</th>
                          <th className="px-6 py-4">Mobile Credentials</th>
                          <th className="px-6 py-4">Secure Passkey Used</th>
                          <th className="px-6 py-4">Claimed Date</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {certificates.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-900/40">
                            <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                              <span>🎓</span>
                              <span>{c.name}</span>
                            </td>
                            <td className="px-6 py-4 font-mono font-bold text-slate-350">+91 {c.mobile}</td>
                            <td className="px-6 py-4 font-mono font-bold text-emerald-400">{c.passcode}</td>
                            <td className="px-6 py-4 font-medium text-slate-450">{c.claimedAt}</td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleDeleteCertificate(c.id)}
                                className="text-red-400 hover:text-red-300 font-bold cursor-pointer"
                              >
                                Revoke Claim
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 6: ACADEMY TRAINING MODULES MANAGER */}
          {activeTab === "academy" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-start border-b border-slate-850 pb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Training Academy Modules</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload training videos, set headlines, subtitles, step orders, and descriptions. These will automatically update the provider Academy on the homepage.
                  </p>
                </div>
              </div>

              {/* Summary Dashboard Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Total Videos Uploaded</span>
                    <span className="text-2xl font-black text-white mt-1.5 block">{academyModules.length} Videos</span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 mt-3 block">Currently live and streaming on the partner certificate onboarding gateway.</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Curriculum Milestones</span>
                    <span className="text-2xl font-black text-blue-400 mt-1.5 block">{academyModules.length} Steps Sequence</span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 mt-3 block">Partners must complete all steps sequentially to unlock the certificate.</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Certificate Gateway Status</span>
                    <span className="text-2xl font-black text-emerald-400 mt-1.5 block">Online & Active</span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 mt-3 block">Validation checks are fully synchronized with MongoDB databases.</span>
                </div>
              </div>

              {/* Upload Manual Guide */}
              <div className="bg-gradient-to-r from-blue-955/20 to-indigo-955/20 border border-blue-900/30 p-6 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> How to Upload Any Other Video
                </h4>
                <p className="text-xs text-slate-350 leading-relaxed">
                  You can append new lessons to the curriculum or overwrite current ones. Follow these rules to configure your video:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-200 block">1. Step Sequence Number</span>
                    <span className="block">Specify the sequence index (e.g. <code className="text-blue-400 font-mono font-bold">1</code>, <code className="text-blue-400 font-mono font-bold">2</code>, <code className="text-blue-400 font-mono font-bold">4</code>) at which the video should appear. Leave blank to automatically append it to the end.</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-200 block">2. Headline & Subtitle</span>
                    <span className="block">Input a brief catchy headline (e.g. <code className="text-blue-400 font-mono font-bold">Road Etiquette</code>) and a long subtitle title (e.g. <code className="text-blue-400 font-mono font-bold">Module 4: Safe Driving & Communication</code>).</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-200 block">3. Video Embed/Share Link</span>
                    <span className="block">Enter any YouTube embed link (<code className="text-blue-400 font-mono font-bold">/embed/...</code>), YouTube watch URL, or raw MP4 files. The video engine handles conversion automatically.</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-200 block">4. Certificate Compliance Unlock</span>
                    <span className="block">The final exam and Code of Conduct checklist will automatically adjust to render right after the last video step is viewed.</span>
                  </div>
                </div>
              </div>

              {/* Add Module Form */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-4">
                  Publish New Training Module
                </h3>
                <form onSubmit={handleAddAcademyModule} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Step Sequence Order Number (Optional)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g. 4 (auto-increment if blank)"
                      value={modId}
                      onChange={(e) => setModId(e.target.value.replace(/[^0-9]/g, ""))}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Headline (Step Short Title) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Safety Basics"
                      value={modStepTitle}
                      onChange={(e) => setModStepTitle(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Duration Label</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 mins 30 secs"
                      value={modDuration}
                      onChange={(e) => setModDuration(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 md:col-span-3">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Subtitle (Module Display Title) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Module 4: Road Guidelines & Live Traffic Tracking Rules"
                      value={modModuleTitle}
                      onChange={(e) => setModModuleTitle(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-3">
                    {/* Option A: Local File Upload */}
                    <div className="flex flex-col space-y-2 border border-dashed border-slate-800 p-4 rounded-xl bg-slate-950/20">
                      <label className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span>📤</span> Option 1: Upload Video from Laptop/Phone
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoFileUpload}
                        disabled={isUploadingVideo}
                        className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer disabled:opacity-50"
                      />
                      {isUploadingVideo ? (
                        <span className="text-[10px] text-yellow-500 font-bold animate-pulse flex items-center gap-1">
                          ⚡ Uploading file... Please do not close page.
                        </span>
                      ) : modVideoUrl && modVideoUrl.startsWith("/uploads/") ? (
                        <span className="text-[10px] text-green-400 font-bold flex items-center gap-1.5">
                          ✓ File uploaded: {modVideoUrl.split("/").pop()}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-550">Supports MP4, MOV, WebM, etc. (max 150MB)</span>
                      )}
                    </div>

                    {/* Option B: External Video URL */}
                    <div className="flex flex-col space-y-2 border border-slate-850 p-4 rounded-xl bg-slate-950/20">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span>🔗</span> Option 2: Paste External Video Link
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. YouTube URL or direct MP4 link"
                        value={modVideoUrl}
                        onChange={(e) => setModVideoUrl(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white font-mono"
                      />
                      <span className="text-[10px] text-slate-550">Use this if the video is already hosted elsewhere.</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1 md:col-span-3">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Detailed Description *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the lessons covered in this video..."
                      value={modDesc}
                      onChange={(e) => setModDesc(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white resize-none"
                    />
                  </div>
                  <div className="md:col-span-3 text-right">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-750 text-white text-xs font-bold px-6 py-3 rounded-xl cursor-pointer transition-colors shadow-md shadow-blue-500/10"
                    >
                      Publish Training Video
                    </button>
                  </div>
                </form>
              </div>

              {/* Modules List Grid */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 block">
                  Academy Course Curriculum ({academyModules.length})
                </span>
                {academyModules.length === 0 ? (
                  <div className="border border-slate-850 rounded-2xl bg-slate-950/25 p-8 text-center text-xs text-slate-500">
                    No training modules uploaded yet. Add one above!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {academyModules.map((m) => (
                      <div key={m.id} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                              Step Sequence Number: {m.id} • {m.duration}
                            </span>
                            <button
                              onClick={() => handleDeleteAcademyModule(m.id)}
                              className="text-red-400 hover:text-red-300 font-bold text-xs cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                          <div className="mt-2.5 space-y-1">
                            <div className="text-[10px] text-slate-555 uppercase tracking-wider font-bold">Headline (Short Title):</div>
                            <h4 className="text-sm font-bold text-white leading-snug">{m.stepTitle}</h4>
                          </div>
                          <div className="mt-2 space-y-1">
                            <div className="text-[10px] text-slate-555 uppercase tracking-wider font-bold">Subtitle (Module Title):</div>
                            <p className="text-[11.5px] text-slate-300 font-semibold leading-relaxed">{m.moduleTitle}</p>
                          </div>
                          <div className="mt-2 space-y-1">
                            <div className="text-[10px] text-slate-555 uppercase tracking-wider font-bold">Detailed Description:</div>
                            <p className="text-xs text-slate-400 font-normal leading-relaxed">{m.desc}</p>
                          </div>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 px-3 py-2 rounded-xl text-[10px] font-mono text-slate-350 truncate">
                          🎥 Video Source Link: {m.videoUrl}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: PRESS & MEDIA MANAGER */}
          {activeTab === "press" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-start border-b border-slate-850 pb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Press & Media Center</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Publish, edit, and manage media coverages, news articles, and press releases that display dynamically to the public.
                  </p>
                </div>
              </div>

              {/* Summary Dashboard Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-550 block font-bold uppercase tracking-widest">Total Articles Published</span>
                    <span className="text-2xl font-black text-white mt-1.5 block">{pressArticles.length} Articles</span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 mt-3 block">Currently live and rendering on the customer-facing Press & Media page.</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-550 block font-bold uppercase tracking-widest">Primary Media Reach</span>
                    <span className="text-2xl font-black text-blue-400 mt-1.5 block">15M+ Impressions</span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 mt-3 block">Combined reach through tier-1 publishing channels.</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-555 block font-bold uppercase tracking-widest">Sentiment Index</span>
                    <span className="text-2xl font-black text-emerald-400 mt-1.5 block">98% Positive</span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 mt-3 block">Average sentiment score based on latest coverage indices.</span>
                </div>
              </div>

              {/* Form: Add/Edit Article */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-4">
                  {editingPress ? "Modify Selected Press Article" : "Publish New Press Article"}
                </h3>
                <form onSubmit={handleSavePressArticle} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Article Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Karaya Bandhu Expands Digital footprint to Tier-2 India"
                        value={pressTitle}
                        onChange={(e) => setPressTitle(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Subtitle / Short Headline</label>
                      <input
                        type="text"
                        placeholder="e.g. Scaling rural tech integrations and training initiatives"
                        value={pressSubTitle}
                        onChange={(e) => setPressSubTitle(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Source (e.g. Economic Times)</label>
                      <input
                        type="text"
                        placeholder="e.g. Economic Times"
                        value={pressSource}
                        onChange={(e) => setPressSource(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Source Article URL (Optional)</label>
                      <input
                        type="url"
                        placeholder="e.g. https://economictimes.indiatimes.com/..."
                        value={pressSourceUrl}
                        onChange={(e) => setPressSourceUrl(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Published Date (YYYY-MM-DD)</label>
                      <input
                        type="date"
                        value={pressPublishedDate}
                        onChange={(e) => setPressPublishedDate(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="flex flex-col space-y-1 md:col-span-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Featured Image Cover</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Upload image or enter image URL"
                          value={pressImage}
                          onChange={(e) => setPressImage(e.target.value)}
                          className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white flex-1"
                        />
                        <label className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors border border-slate-700 flex items-center justify-center min-w-[100px]">
                          {isUploadingPressImage ? "Uploading..." : "Upload File"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleUploadPressImage}
                            className="hidden"
                            disabled={isUploadingPressImage}
                          />
                        </label>
                      </div>
                    </div>
                    {pressImage && (
                      <div className="h-[44px] flex items-center justify-start gap-2 bg-slate-950 border border-slate-800 p-2 rounded-xl">
                        <img src={pressImage} alt="Preview" className="h-full w-12 object-cover rounded" />
                        <span className="text-[10px] text-slate-400 truncate">Image Selected</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Article Content *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write the summary or full content of the press release..."
                      value={pressContent}
                      onChange={(e) => setPressContent(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-white resize-none"
                    />
                  </div>

                  <div className="text-right space-x-3">
                    {editingPress && (
                      <button
                        type="button"
                        onClick={handleCancelEditPress}
                        className="bg-slate-850 hover:bg-slate-850 text-slate-350 hover:text-white text-xs font-bold px-6 py-3 rounded-xl cursor-pointer transition-colors"
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-750 text-white text-xs font-bold px-6 py-3 rounded-xl cursor-pointer transition-colors shadow-md shadow-blue-500/10"
                    >
                      {editingPress ? "Save Article Changes" : "Publish Press Coverage"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Published Articles List */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 block">
                  Live Press Archive ({pressArticles.length})
                </span>
                {pressArticles.length === 0 ? (
                  <div className="border border-slate-850 rounded-2xl bg-slate-950/25 p-8 text-center text-xs text-slate-500">
                    No press articles published yet. Publish one above!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pressArticles.map((p) => (
                      <div key={p.id} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                              {p.publishedDate} • {p.source || "Direct"}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditPressArticle(p)}
                                className="text-blue-400 hover:text-blue-300 font-bold text-xs cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeletePressArticle(p.id)}
                                className="text-red-400 hover:text-red-300 font-bold text-xs cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <div className="mt-2.5 flex gap-3">
                            {p.imageUrl && (
                              <img src={p.imageUrl} alt="Thumb" className="w-16 h-16 object-cover rounded-lg border border-slate-800 flex-shrink-0" />
                            )}
                            <div className="space-y-1 min-w-0">
                              <h4 className="text-sm font-bold text-white leading-snug truncate">{p.title}</h4>
                              {p.subTitle && <p className="text-[11.5px] text-slate-350 leading-snug truncate">{p.subTitle}</p>}
                              <p className="text-xs text-slate-450 font-normal line-clamp-2 leading-relaxed">{p.content}</p>
                            </div>
                          </div>
                        </div>
                        {p.sourceUrl && (
                          <div className="bg-slate-950 border border-slate-850 px-3 py-2 rounded-xl text-[10px] font-mono text-slate-350 truncate">
                            🔗 Source Link: <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-450">{p.sourceUrl}</a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* deep dive modal for candidates profiles */}
      {reviewCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">

          <div className="relative w-full max-w-[600px] rounded-3xl border border-slate-800 bg-slate-900 text-white shadow-2xl p-8 max-h-[85vh] overflow-y-auto no-scrollbar">

            {/* Close Button */}
            <button
              onClick={() => setReviewCandidate(null)}
              className="absolute top-4 right-4 p-2 text-slate-455 hover:text-white rounded-full hover:bg-slate-800 transition-colors z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Profile Info */}
            <div className="space-y-6">

              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                  Candidate Profile Deep-Dive
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white mt-4">
                  {reviewCandidate.personal.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Applied for the <span className="font-bold text-white">{reviewCandidate.category}</span> division.
                </p>
              </div>

              {/* Grid Contact Matrix */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Email</div>
                  <a href={`mailto:${reviewCandidate.personal.email}`} className="text-blue-400 hover:underline font-mono">
                    {reviewCandidate.personal.email}
                  </a>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Mobile Phone</div>
                  <div className="font-mono font-bold text-slate-200">+91 {reviewCandidate.personal.phone}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Experience Level</div>
                  <div className="font-semibold text-slate-200">{reviewCandidate.professional.experience}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Expected Salary (CTC)</div>
                  <div className="font-bold text-slate-200">{reviewCandidate.professional.expectedCtc}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Current Title / Role</div>
                  <div className="font-bold text-slate-200">{reviewCandidate.professional.currentTitle}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Notice Period</div>
                  <div className="font-semibold text-slate-200">{reviewCandidate.professional.noticePeriod}</div>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="space-y-1">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                  Core Professional Skills
                </h5>
                <div className="flex flex-wrap gap-2 pt-1">
                  {reviewCandidate.credentials.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold text-slate-350 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* CV Attachment & URLs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uploaded Resume CV</h5>
                  <div className="text-xs font-mono font-bold truncate bg-slate-950 border border-slate-855 p-2.5 rounded-lg flex items-center gap-1.5">
                    {reviewCandidate.credentials.fileUrl ? (
                      <a
                        href={reviewCandidate.credentials.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 hover:underline transition-colors flex items-center gap-1.5 truncate"
                      >
                        📄 {reviewCandidate.credentials.fileName}
                        <span className="text-[9px] text-green-500/70 font-normal ml-1">↗ Open</span>
                      </a>
                    ) : (
                      <span className="text-slate-400">📄 {reviewCandidate.credentials.fileName}</span>
                    )}
                  </div>
                </div>
                {reviewCandidate.credentials.portfolio && (
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Portfolio / LinkedIn Link</h5>
                    <a
                      href={reviewCandidate.credentials.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-400 truncate bg-slate-950 border border-slate-850 p-2.5 rounded-lg block hover:underline"
                    >
                      🔗 Visit External Link →
                    </a>
                  </div>
                )}
              </div>

              {/* Statement 1: Why KB */}
              <div className="space-y-1.5">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                  Why Karaya Bandhu? (Cover Pitch)
                </h5>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-855 text-xs text-slate-350 leading-relaxed font-normal">
                  {reviewCandidate.statement.pitch}
                </div>
              </div>

              {/* Statement 2: Highlight Project */}
              <div className="space-y-1.5">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                  Complex Project Achievement Summary
                </h5>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-855 text-xs text-slate-350 leading-relaxed font-normal">
                  {reviewCandidate.statement.project}
                </div>
              </div>

              {/* Closing Action */}
              <div className="pt-4 text-right">
                <button
                  onClick={() => setReviewCandidate(null)}
                  className="bg-blue-600 hover:bg-blue-750 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer transition-colors shadow-md"
                >
                  Return to Dashboard
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ── CUSTOM ALERT / CONFIRM MODAL ── */}
      {modalConfig && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(2,6,23,0.85)", backdropFilter: "blur(6px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              if (modalConfig.type === "alert") modalConfig.onConfirm();
              else if (modalConfig.onCancel) modalConfig.onCancel();
            }
          }}
        >
          <div
            className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
            style={{ animation: "fadeInDown 0.18s ease-out forwards" }}
          >
            {/* Glowing top accent line */}
            <div className={`h-0.5 w-full ${modalConfig.type === "confirm" ? "bg-gradient-to-r from-red-600 via-red-500 to-orange-500" : "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500"}`} />

            <div className="p-6 space-y-4">
              {/* Icon + Title row */}
              <div className="flex items-start gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  modalConfig.type === "confirm"
                    ? "bg-red-500/10 border border-red-500/20"
                    : "bg-blue-500/10 border border-blue-500/20"
                }`}>
                  {modalConfig.type === "confirm" ? (
                    <svg className="w-4.5 h-4.5 text-red-400" style={{width:"18px",height:"18px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                  ) : (
                    <svg className="text-blue-400" style={{width:"18px",height:"18px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">{modalConfig.title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{modalConfig.message}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5 pt-1 justify-end">
                {modalConfig.type === "confirm" && (
                  <button
                    onClick={modalConfig.onCancel}
                    className="flex-1 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={modalConfig.onConfirm}
                  className={`flex-1 text-xs font-bold text-white px-4 py-2.5 rounded-xl cursor-pointer transition-all shadow-md ${
                    modalConfig.type === "confirm"
                      ? "bg-red-600 hover:bg-red-500 shadow-red-900/30"
                      : "bg-blue-600 hover:bg-blue-500 shadow-blue-900/30"
                  }`}
                >
                  {modalConfig.type === "confirm" ? "Yes, Confirm" : "Got it"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
