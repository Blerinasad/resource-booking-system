/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         SMART BOOKING — SEED SCRIPT v2.0                    ║
 * ║  Run: node seed.js                                          ║
 * ║  Kërkon: docker compose up -d  (para ekzekutimit)          ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import mysql from "mysql2/promise";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

/* ─── KONFIGURIMI ────────────────────────────────────────────── */
const MYSQL = {
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "root",
  multipleStatements: true,
};
const MONGO_URI = "mongodb://127.0.0.1:27017";

/* ─── LOG HELPERS ────────────────────────────────────────────── */
const log = (m) => console.log(`\x1b[32m  ✓\x1b[0m ${m}`);
const info = (m) => console.log(`\x1b[36m  →\x1b[0m ${m}`);
const head = (m) => console.log(`\n\x1b[1m\x1b[35m${m}\x1b[0m`);
const fail = (m) => console.log(`\x1b[31m  ✗\x1b[0m ${m}`);

/* ─── HELPERS ────────────────────────────────────────────────── */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

function rndDate(daysAgo, daysAhead = 0) {
  const now = Date.now();
  const from = now - daysAgo * 86_400_000;
  const to = now + daysAhead * 86_400_000;
  return new Date(from + Math.random() * (to - from));
}

function workHour(date) {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  const h = d.getHours();
  if (h < 8) d.setHours(8);
  if (h > 17) d.setHours(17);
  return d;
}

/* ─── TË DHËNAT E USERS ──────────────────────────────────────── */
const USERS = [
  {
    name: "Admin Kryesor",
    email: "admin@test.js",
    password: "123456",
    role: "admin",
  },
  {
    name: "Blerima Sadiku",
    email: "blerima.sadiku@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Fisnik Berisha",
    email: "fisnik.berisha@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Ariana Krasniqi",
    email: "ariana.krasniqi@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Driton Hyseni",
    email: "driton.hyseni@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Valbona Gashi",
    email: "valbona.gashi@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Mentor Shala",
    email: "mentor.shala@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Rinora Musliu",
    email: "rinora.musliu@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Granit Bajrami",
    email: "granit.bajrami@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Drita Osmani",
    email: "drita.osmani@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Kushtrim Halili",
    email: "kushtrim.halili@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Teuta Morina",
    email: "teuta.morina@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Alban Loshi",
    email: "alban.loshi@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Shpend Demolli",
    email: "shpend.demolli@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Mimoza Ademi",
    email: "mimoza.ademi@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Blerim Qerimi",
    email: "blerim.qerimi@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Flutura Rexhepi",
    email: "flutura.rexhepi@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Ardian Jakupi",
    email: "ardian.jakupi@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Zana Ismaili",
    email: "zana.ismaili@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Enis Rrustemi",
    email: "enis.rrustemi@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Valdete Musa",
    email: "valdete.musa@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Fatmir Kelmendi",
    email: "fatmir.kelmendi@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Lirije Bytyqi",
    email: "lirije.bytyqi@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Naim Berisha",
    email: "naim.berisha@test.js",
    password: "123456",
    role: "user",
  },
  {
    name: "Vjosa Salihu",
    email: "vjosa.salihu@test.js",
    password: "123456",
    role: "user",
  },
];

/* ─── TË DHËNAT E RESOURCES ──────────────────────────────────── */
const RESOURCES = [
  {
    name: "Salla A101",
    type: "room",
    capacity: 35,
    location: "Ndertesa A, Kati 1",
    status: "available",
    description:
      "Salle mesimi me projektor Full HD, tabele inteligjente dhe sistem audio profesional.",
  },
  {
    name: "Salla A102",
    type: "room",
    capacity: 30,
    location: "Ndertesa A, Kati 1",
    status: "available",
    description: "Salle mesimi standarde me projektor dhe tabele te bardhe.",
  },
  {
    name: "Salla A205",
    type: "room",
    capacity: 40,
    location: "Ndertesa A, Kati 2",
    status: "available",
    description: "Salle seminaresh me kapacitet 40 vende, klime dhe WiFi 5GHz.",
  },
  {
    name: "Salla A301",
    type: "room",
    capacity: 45,
    location: "Ndertesa A, Kati 3",
    status: "available",
    description:
      "Salle e madhe me sistem ndricimi te avancuar dhe audio surround.",
  },
  {
    name: "Salla B102",
    type: "room",
    capacity: 28,
    location: "Ndertesa B, Kati 1",
    status: "available",
    description: "Salle e mesme per grupe studimore dhe prezantime.",
  },
  {
    name: "Salla B205",
    type: "room",
    capacity: 25,
    location: "Ndertesa B, Kati 2",
    status: "available",
    description: "Salle seminaresh me tabele inteligjente dhe projektor laser.",
  },
  {
    name: "Salla B305",
    type: "room",
    capacity: 22,
    location: "Ndertesa B, Kati 3",
    status: "available",
    description: "Salle seminaresh me tabele te zeze dhe projektor.",
  },
  {
    name: "Salla Konferencave",
    type: "room",
    capacity: 80,
    location: "Ndertesa A, Kati 3",
    status: "available",
    description:
      "Salle e madhe per konferenca dhe seminare akademike. Sistem audio profesional dhe 2 projektore.",
  },
  {
    name: "Salla VIP",
    type: "room",
    capacity: 15,
    location: "Ndertesa C, Kati 3",
    status: "available",
    description:
      "Salle takimesh premium me Smartboard dhe sistem videokonference 4K.",
  },
  {
    name: "Salla C110",
    type: "room",
    capacity: 30,
    location: "Ndertesa C, Kati 1",
    status: "maintenance",
    description:
      "Ne rinovim - riparimi i sistemit te ajrosjes. Hapet pas 2 javesh.",
  },
  {
    name: "Salla Mbrojtjeve",
    type: "room",
    capacity: 20,
    location: "Ndertesa A, Kati 2",
    status: "available",
    description:
      "Salle e dedikuar per mbrojtje te punimeve te diplomes dhe masterit.",
  },
  {
    name: "Lab Informatikes I",
    type: "lab",
    capacity: 24,
    location: "Ndertesa B, Kati 2",
    status: "available",
    description:
      "24 kompjuter Dell i7 Gen12, 16GB RAM. VS Code, IntelliJ IDEA, Docker Desktop.",
  },
  {
    name: "Lab Informatikes II",
    type: "lab",
    capacity: 24,
    location: "Ndertesa B, Kati 2",
    status: "available",
    description:
      "24 kompjuter HP EliteDesk. Machine Learning: Jupyter, TensorFlow, PyCharm, Anaconda.",
  },
  {
    name: "Lab Rrjeteve",
    type: "lab",
    capacity: 20,
    location: "Ndertesa B, Kati 3",
    status: "available",
    description:
      "Lab Cisco Packet Tracer, switch-a dhe router-a fizike per konfigurim rrjeti.",
  },
  {
    name: "Lab Fizikes",
    type: "lab",
    capacity: 20,
    location: "Ndertesa D, Kati 1",
    status: "available",
    description:
      "Laborator eksperimental me pajisje matese dhe osciloskope dixhitale.",
  },
  {
    name: "Lab Kimise",
    type: "lab",
    capacity: 18,
    location: "Ndertesa D, Kati 2",
    status: "unavailable",
    description: "Mbyllur per ricertifikim te pajisjeve. Hapet muajin tjeter.",
  },
  {
    name: "Lab Elektronikes",
    type: "lab",
    capacity: 16,
    location: "Ndertesa D, Kati 3",
    status: "available",
    description:
      "Lab me osciloskope Rigol 4CH, saldatore Hakko dhe komponente elektronike.",
  },
  {
    name: "Lab Dizajnit",
    type: "lab",
    capacity: 20,
    location: "Ndertesa C, Kati 2",
    status: "available",
    description:
      "20 kompjuter iMac 27 inch, Adobe Creative Suite, Figma, AutoCAD.",
  },
  {
    name: "Workspace Krijues",
    type: "workspace",
    capacity: 12,
    location: "Ndertesa C, Kati 1",
    status: "available",
    description:
      "Hapesire open-space per grupe inovative. 4 ekrane te medha, whiteboards magnetike.",
  },
  {
    name: "Studio Podcast",
    type: "workspace",
    capacity: 4,
    location: "Ndertesa C, Kati 2",
    status: "available",
    description:
      "Studio regjistrimi profesionale me mikrofon Shure SM7B, interface audio Focusrite.",
  },
  {
    name: "Startup Hub",
    type: "workspace",
    capacity: 20,
    location: "Ndertesa E, Kati 1",
    status: "available",
    description:
      "Hapesire bashkepunuese me zona pune private dhe kolektive, kuzhine dhe takim-dhome.",
  },
  {
    name: "Design Studio",
    type: "workspace",
    capacity: 8,
    location: "Ndertesa C, Kati 2",
    status: "available",
    description:
      "Studio dizajni me tablet Wacom Cintiq, ekrane 4K Dell UltraSharp dhe Adobe CC.",
  },
  {
    name: "Dhoma Qete",
    type: "workspace",
    capacity: 6,
    location: "Ndertesa A, Kati 1",
    status: "available",
    description:
      "Hapesire e qete per studim individual ose pune te koncentruar. Pa zhurma.",
  },
  {
    name: "Projektor Epson 1",
    type: "equipment",
    capacity: null,
    location: "Sekretaria Kati 1",
    status: "available",
    description:
      "Projektor Epson EB-X51, 3800 lm, rezolucion XGA. Kabel HDMI dhe VGA te perfshira.",
  },
  {
    name: "Projektor Epson 2",
    type: "equipment",
    capacity: null,
    location: "Sekretaria Kati 1",
    status: "available",
    description:
      "Projektor Epson EB-W52, 4000 lm, WXGA. Wireless prezantim i integruar.",
  },
  {
    name: "Projektor BenQ",
    type: "equipment",
    capacity: null,
    location: "Sekretaria Kati 1",
    status: "available",
    description:
      "Projektor BenQ MX550, 3600 lm, wireless prezantim permes aplikacionit.",
  },
  {
    name: "Kamera Canon EOS",
    type: "equipment",
    capacity: null,
    location: "Sekretaria Kati 2",
    status: "available",
    description:
      "Canon EOS 850D, objektiv 18-55mm STM, 2 bateri, tripod dhe memory card 64GB.",
  },
  {
    name: "Kamera Sony A7",
    type: "equipment",
    capacity: null,
    location: "Sekretaria Kati 2",
    status: "available",
    description: "Sony A7 III mirrorless, full-frame 24MP, objektiv 28-70mm.",
  },
  {
    name: "Drone DJI Mini 3",
    type: "equipment",
    capacity: null,
    location: "Sekretaria Kati 2",
    status: "available",
    description:
      "DJI Mini 3 Pro, 4K/60fps, 3 bateri, filtrat ND. Vetem per projekte akademike.",
  },
  {
    name: "Laptop Prezantimi",
    type: "equipment",
    capacity: null,
    location: "Sekretaria Kati 1",
    status: "available",
    description:
      "Dell XPS 15, i7-13700H, 16GB RAM. Office 365, Zoom dhe Teams te instaluara.",
  },
  {
    name: "Set Mikrofona",
    type: "equipment",
    capacity: null,
    location: "Sekretaria Kati 2",
    status: "maintenance",
    description:
      "Set me 4 mikrofona wireless Rode Wireless GO II. Momentalisht ne servisim.",
  },
  {
    name: "Ekran 75 inch",
    type: "equipment",
    capacity: null,
    location: "Sekretaria Kati 1",
    status: "available",
    description:
      "Samsung Smart Display 75 inch, 4K UHD, HDMI, USB-C dhe wireless Miracast.",
  },
];

/* ─── QËLLIMET E REZERVIMEVE ─────────────────────────────────── */
const PURPOSES = [
  "Mesim i shkencave kompjuterike - Semestri 5",
  "Prezantim i projektit semestral SPDD",
  "Laborator praktik - Strukturat e te dhenave",
  "Konference studentore UBT Innovation 2026",
  "Sesion studimi ne grup - Provimi final",
  "Workshop Agile dhe Scrum metodologji",
  "Mbrojtje e punimit te diplomes - Informatike",
  "Seminar mbi sigurine kibernetike",
  "Trajnim Docker, Kubernetes dhe DevOps",
  "Sesion regjistrimi podcast akademik",
  "Projektim i bazes se te dhenave SPDD",
  "Takime koordinuese grupit te projektit",
  "Demonstrim i sistemit mikro-sherbimesh",
  "Prezantim i hulumtimit shkencor",
  "Sprint Planning - Metodologji Agile",
  "Zhvillim i aplikacionit React dhe Node.js",
  "Testim i sistemit - QA Session",
  "Code Review seance grupore",
  "Trajnim Machine Learning me Python",
  "Diskutim teme diplome me mentorin",
  "Mbrojtje e punimit te masterit",
  "Laborator rrjeteve - Konfigurimi Cisco",
  "Seminar i jashtem - Kompania IT",
  "Sesion mentorimi karriere - Career Center",
  "Hackathon UBT - 24 ore kodim",
];

const APPROVE_NOTES = [
  "Aprovuar - salla eshte e disponueshme ne kete interval.",
  "Konfirmuar nga administrata akademike.",
  "Aprovuar. Ju lutem lini hapesiren pastrua pas perdorimit.",
  "Aprovuar - prioritet akademik i konfirmuar.",
  "Konfirmuar. Celesi merret 15 min para nga sekretaria.",
  "Aprovuar nga koordinatori i kursit.",
];
const REJECT_NOTES = [
  "Refuzuar - hapesira eshte rezervuar nga nje grup tjeter.",
  "Konflikt me ngjarje institucionale te planifikuar.",
  "Refuzuar - kerkesa nuk ploteson kriteret e rezervimit.",
  "Kapaciteti i nevojshem tejkalon kapacitetin e hapesires.",
  "Refuzuar - orari bie ndesh me mirembajtjen e planifikuar.",
];

/* ─── MYSQL SEED ─────────────────────────────────────────────── */
async function seedMySQL() {
  head("━━━ MySQL Seed ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const db = await mysql.createConnection(MYSQL);
  info("U lidh me MySQL");

  /* ══ USERS ══════════════════════════════════════════════════ */
  await db.query("USE smart_booking_auth");
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id                 INT          NOT NULL AUTO_INCREMENT,
      name               VARCHAR(255) NOT NULL,
      email              VARCHAR(255) NOT NULL,
      password           VARCHAR(255) NOT NULL,
      role               ENUM('user','admin') NOT NULL DEFAULT 'user',
      status             ENUM('active','inactive') NOT NULL DEFAULT 'active',
      refresh_token_hash VARCHAR(255) DEFAULT NULL,
      createdAt          DATETIME     NOT NULL,
      updatedAt          DATETIME     NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY users_email_unique (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  await db.query("SET FOREIGN_KEY_CHECKS = 0");
  await db.query("TRUNCATE TABLE users");
  await db.query("SET FOREIGN_KEY_CHECKS = 1");
  log("Tabela users u pastrua");

  const insertedUsers = [];
  for (const u of USERS) {
    const hash = await bcrypt.hash(u.password, 10);
    const now = new Date();
    const [r] = await db.query(
      `INSERT INTO users (name, email, password, role, status, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, 'active', ?, ?)`,
      [u.name, u.email, hash, u.role, now, now],
    );
    insertedUsers.push({ id: r.insertId, name: u.name, role: u.role });
  }
  log(
    `${insertedUsers.length} users u insertuan — ${insertedUsers.filter((u) => u.role === "admin").length} admin, ${insertedUsers.filter((u) => u.role === "user").length} user`,
  );

  /* ══ RESOURCES ══════════════════════════════════════════════ */
  await db.query("USE smart_booking_resources");
  await db.query(`
    CREATE TABLE IF NOT EXISTS resources (
      id          INT          NOT NULL AUTO_INCREMENT,
      name        VARCHAR(255) NOT NULL,
      type        ENUM('room','lab','equipment','workspace') NOT NULL,
      capacity    INT          DEFAULT NULL,
      location    VARCHAR(255) NOT NULL,
      status      ENUM('available','unavailable','maintenance') NOT NULL DEFAULT 'available',
      description LONGTEXT     DEFAULT NULL,
      created_by  INT          DEFAULT NULL,
      createdAt   DATETIME     NOT NULL,
      updatedAt   DATETIME     NOT NULL,
      PRIMARY KEY (id),
      KEY resources_type   (type),
      KEY resources_status (status),
      KEY resources_location (location)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  await db.query("SET FOREIGN_KEY_CHECKS = 0");
  await db.query("TRUNCATE TABLE resources");
  await db.query("SET FOREIGN_KEY_CHECKS = 1");
  log("Tabela resources u pastrua");

  const adminId = insertedUsers.find((u) => u.role === "admin").id;
  const insertedResources = [];

  for (const r of RESOURCES) {
    const now = new Date();
    const [res] = await db.query(
      `INSERT INTO resources (name, type, capacity, location, status, description, created_by, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        r.name,
        r.type,
        r.capacity ?? null,
        r.location,
        r.status,
        r.description,
        adminId,
        now,
        now,
      ],
    );
    insertedResources.push({
      id: res.insertId,
      name: r.name,
      status: r.status,
    });
  }
  log(`${insertedResources.length} resources u insertuan`);

  /* ══ BOOKINGS ═══════════════════════════════════════════════ */
  await db.query("USE smart_booking_bookings");
  await db.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id            INT          NOT NULL AUTO_INCREMENT,
      user_id       INT          NOT NULL,
      resource_id   INT          NOT NULL,
      start_time    DATETIME     NOT NULL,
      end_time      DATETIME     NOT NULL,
      purpose       VARCHAR(500) DEFAULT NULL,
      status        ENUM('pending','approved','rejected','cancelled','completed','no-show') NOT NULL DEFAULT 'pending',
      decision_note LONGTEXT     DEFAULT NULL,
      createdAt     DATETIME     NOT NULL,
      updatedAt     DATETIME     NOT NULL,
      PRIMARY KEY (id),
      KEY bookings_user_id     (user_id),
      KEY bookings_resource_id (resource_id),
      KEY bookings_status      (status),
      KEY bookings_start_time  (start_time)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  await db.query("SET FOREIGN_KEY_CHECKS = 0");
  await db.query("TRUNCATE TABLE bookings");
  await db.query("SET FOREIGN_KEY_CHECKS = 1");
  log("Tabela bookings u pastrua");

  const regularUsers = insertedUsers.filter((u) => u.role === "user");
  const availableResources = insertedResources.filter(
    (r) => r.status === "available",
  );

  const STATUS_POOL = [
    ...Array(40).fill("approved"),
    ...Array(25).fill("pending"),
    ...Array(20).fill("completed"),
    ...Array(10).fill("cancelled"),
    ...Array(8).fill("rejected"),
    ...Array(5).fill("no-show"),
  ];

  let bookingCount = 0;
  const statusCounts = {};

  for (let i = 0; i < 200; i++) {
    const user = pick(regularUsers);
    const resource = pick(availableResources);
    const status = pick(STATUS_POOL);

    const isPast = ["completed", "cancelled", "rejected", "no-show"].includes(
      status,
    );
    const startRaw = workHour(rndDate(isPast ? 90 : 1, isPast ? 1 : 30));
    const hours = pick([1, 1, 2, 2, 2, 3, 3]);
    const endDate = new Date(startRaw.getTime() + hours * 3_600_000);

    const purpose = pick(PURPOSES);
    const decisionNote =
      status === "approved"
        ? pick(APPROVE_NOTES)
        : status === "completed"
          ? pick(APPROVE_NOTES)
          : status === "rejected"
            ? pick(REJECT_NOTES)
            : null;

    const createdAt = new Date(startRaw.getTime() - rand(1, 7) * 86_400_000);
    const updatedAt = new Date(createdAt.getTime() + rand(0, 3) * 86_400_000);

    await db.query(
      `INSERT INTO bookings
         (user_id, resource_id, start_time, end_time, purpose, status, decision_note, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        resource.id,
        startRaw,
        endDate,
        purpose,
        status,
        decisionNote,
        createdAt,
        updatedAt,
      ],
    );

    bookingCount++;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  }

  log(`${bookingCount} bookings u insertuan`);
  Object.entries(statusCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([s, c]) => info(`  ${s.padEnd(12)}: ${c}`));

  await db.end();
  log("MySQL u mbyll");
}

/* ─── MONGODB SEED ───────────────────────────────────────────── */
async function seedMongoDB() {
  head("━━━ MongoDB Seed ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  info("U lidh me MongoDB");

  const db = client.db("smart_booking_analytics");

  /* ══ UsageAnalytics ═════════════════════════════════════════ */
  const analyticsCol = db.collection("usageanalytics");
  await analyticsCol.deleteMany({});

  const EVENT_TYPES = [
    "booking_created",
    "booking_approved",
    "booking_rejected",
    "booking_cancelled",
    "booking_completed",
    "booking_no_show",
  ];

  const analyticsEvents = [];
  for (let i = 1; i <= 200; i++) {
    const eventType = pick(EVENT_TYPES);
    const createdAt = rndDate(90, 0);
    analyticsEvents.push({
      eventType,
      resourceId: rand(1, RESOURCES.length),
      userId: rand(2, USERS.length),
      bookingId: i,
      status: eventType.replace("booking_", ""),
      startTime: rndDate(90, 30),
      endTime: rndDate(90, 30),
      metadata: {
        duration: pick([60, 120, 120, 120, 180, 180, 240]),
        source: "web",
        userAgent: pick(["Chrome/124", "Firefox/125", "Safari/17", "Edge/124"]),
        ip: `192.168.${rand(1, 10)}.${rand(1, 254)}`,
      },
      createdAt,
      updatedAt: createdAt,
    });
  }
  await analyticsCol.insertMany(analyticsEvents);
  log(`${analyticsEvents.length} analytics events u insertuan`);

  /* ══ AuditLogs ══════════════════════════════════════════════ */
  const auditCol = db.collection("auditlogs");
  await auditCol.deleteMany({});

  const AUDIT_ACTIONS = [
    { action: "LOGIN", entity: "User" },
    { action: "LOGOUT", entity: "User" },
    { action: "REGISTER", entity: "User" },
    { action: "BOOKING_CREATED", entity: "Booking" },
    { action: "BOOKING_APPROVED", entity: "Booking" },
    { action: "BOOKING_REJECTED", entity: "Booking" },
    { action: "BOOKING_CANCELLED", entity: "Booking" },
    { action: "BOOKING_COMPLETED", entity: "Booking" },
    { action: "RESOURCE_CREATED", entity: "Resource" },
    { action: "RESOURCE_UPDATED", entity: "Resource" },
    { action: "RESOURCE_DELETED", entity: "Resource" },
  ];

  const auditLogs = [];
  for (let i = 0; i < 300; i++) {
    const { action, entity } = pick(AUDIT_ACTIONS);
    const createdAt = rndDate(90, 5);
    auditLogs.push({
      userId: rand(1, USERS.length),
      action,
      entity,
      entityId: String(rand(1, 200)),
      details: {
        method: pick(["GET", "POST", "PATCH", "PUT", "DELETE"]),
        endpoint: `/${entity.toLowerCase()}s/${rand(1, 50)}`,
        statusCode: pick([200, 200, 200, 201, 204, 400, 401, 403, 404]),
        duration: `${rand(10, 800)}ms`,
      },
      ipAddress: `192.168.${rand(1, 10)}.${rand(1, 254)}`,
      createdAt,
      updatedAt: createdAt,
    });
  }
  await auditCol.insertMany(auditLogs);
  log(`${auditLogs.length} audit logs u insertuan`);

  await analyticsCol.createIndex({ eventType: 1 });
  await analyticsCol.createIndex({ resourceId: 1 });
  await analyticsCol.createIndex({ userId: 1 });
  await analyticsCol.createIndex({ createdAt: -1 });
  await auditCol.createIndex({ userId: 1 });
  await auditCol.createIndex({ action: 1 });
  await auditCol.createIndex({ createdAt: -1 });
  log("MongoDB indexes u krijuan");

  await client.close();
  log("MongoDB u mbyll");
}

/* ─── SUMMARY ────────────────────────────────────────────────── */
function summary() {
  head("━━━ Permbledhje ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`
  MySQL - smart_booking_auth
    users      -> ${USERS.length} (1 admin + ${USERS.length - 1} studente)

  MySQL - smart_booking_resources
    resources  -> ${RESOURCES.length} (salla, laboratore, workspace, pajisje)

  MySQL - smart_booking_bookings
    bookings   -> 200 rezervime

  MongoDB - smart_booking_analytics
    analytics  -> 200 events
    auditlogs  -> 300 entries

  Kredenciale:
    Admin -> admin@test.js     / 123456
    User  -> blerima.sadiku@test.js  / 123456
    User  -> fisnik.berisha@test.js  / 123456
    (te gjithe studentet: password = 123456)
  `);
}

/* ─── MAIN ───────────────────────────────────────────────────── */
async function main() {
  console.log(
    "\n\x1b[1m\x1b[32m╔════════════════════════════════════════════╗\x1b[0m",
  );
  console.log(
    "\x1b[1m\x1b[32m║   Smart Booking - Seed Script v2.0         ║\x1b[0m",
  );
  console.log(
    "\x1b[1m\x1b[32m╚════════════════════════════════════════════╝\x1b[0m",
  );

  try {
    await seedMySQL();
    await seedMongoDB();
    summary();
    console.log("\x1b[1m\x1b[32m\n  Seed u krye me sukses!\x1b[0m\n");
  } catch (e) {
    fail(`Gabim: ${e.message}`);
    if (e.code === "ECONNREFUSED") {
      console.log(
        "\x1b[33m  Sigurohu qe Docker eshte duke punuar: docker compose up -d\x1b[0m",
      );
    }
    console.error(e);
    process.exit(1);
  }
}

main();
