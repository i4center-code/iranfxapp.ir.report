export type Side = "buy" | "sell";

/* منوهای هدر — لینک‌ها بعدا جایگذاری می‌شوند */
export const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "سایت", href: "#" },
  { label: "دانلود", href: "#" },
  { label: "تقویم", href: "#" },
  { label: "بلاگ", href: "#" },
  { label: "مقالات", href: "#" },
];

export const TICKER_ITEMS: { pair: string; price: string; change: number }[] = [
  { pair: "انس طلا XAUUSD", price: "۲٬۳۸۴٫۵۰", change: 0.42 },
  { pair: "بیت‌کوین BTCUSDT", price: "۶۷٬۲۴۰", change: 1.87 },
  { pair: "اتریوم ETHUSDT", price: "۳٬۵۱۲٫۸", change: -0.64 },
  { pair: "یورو/دلار EURUSD", price: "۱٫۰۸۴۲", change: 0.11 },
  { pair: "پوند/دلار GBPUSD", price: "۱٫۲۷۰۵", change: -0.23 },
  { pair: "دلار/ین USDJPY", price: "۱۵۷٫۳۲", change: 0.35 },
  { pair: "دلار/تتر USDIRT", price: "۵۸٬۹۵۰", change: 0.08 },
  { pair: "سکه امامی", price: "۴۰٬۸۵۰٬۰۰۰", change: 1.12 },
  { pair: "نقره XAGUSD", price: "۲۸٫۶۴", change: -0.91 },
  { pair: "شاخص داوجونز", price: "۳۹٬۱۱۲", change: 0.27 },
];

/* ---------- ۳ سامانه معاملاتی (هرو اسکرول‌محور) ---------- */
export type System = {
  id: string;
  name: string;
  assistant: string;
  desc: string;
  accent: string;
  accentSoft: string;
};

export const SYSTEMS: System[] = [
  {
    id: "coin",
    name: "سامانه کوین افیکس",
    assistant: "دستیار هوشمند ارز دیجیتال",
    desc: "سامانه جامع پایش و تحلیل بازار ارزهای دیجیتال با نمودارهای زنده و اطلاعات لحظه‌ای",
    accent: "#ef9656",
    accentSoft: "rgba(239,150,86,0.14)",
  },
  {
    id: "delta",
    name: "سامانه دلتا افیکس",
    assistant: "دستیار هوشمند فارکس",
    desc: "سامانه پیشرفته رصد و تحلیل بازار فارکس با ابزارهای حرفه‌ای و داده‌های به‌روز",
    accent: "#5cb8de",
    accentSoft: "rgba(92,184,222,0.14)",
  },
  {
    id: "gold",
    name: "سامانه گلد افیکس",
    assistant: "دستیار هوشمند طلای آب شده",
    desc: "سامانه تخصصی رصد و تحلیل بازار طلای آب شده با قیمت‌های لحظه‌ای و نمودارهای پیشرفته",
    accent: "#e6b45a",
    accentSoft: "rgba(230,180,90,0.14)",
  },
];

/* ---------- چرا ایران افیکس ---------- */
export const WHY_INTRO = {
  kicker: "انتخاب هوشمند",
  title: "چرا ایران افیکس را انتخاب کنید؟",
  desc: "با تجربه‌ای غنی در بازارهای مالی جهانی، ما مأموریتی روشن داریم: دموکراتیک کردن دسترسی به ابزارهای حرفه‌ای معاملاتی برای همه معامله‌گران ایرانی. بنابراین، پلتفرم جامع ما با اپلیکیشن موبایل، ربات‌های هوشمند، سیگنال‌های دقیق و پشتیبانی ۲۴ ساعته طراحی شده است.",
};

export const WHY_ITEMS: { id: string; title: string; desc: string; accent: string }[] = [
  {
    id: "founded",
    title: "تأسیس مجموعه",
    desc: "ایران افیکس در سال ۱۳۹۹ با چشم‌اندازی روشن برای تحول در بازار مالی ایران تأسیس شد. از ابتدا به دنبال ایجاد تحولی اساسی در نحوه معامله‌گری بودیم.",
    accent: "#3ecf9a",
  },
  {
    id: "goal",
    title: "هدف اصلی",
    desc: "ارائه خدمات نوین و پیشرفته به معامله‌گران ایرانی؛ با باور اینکه هر معامله‌گری شایسته بهترین ابزارها و فناوری‌های روز دنیاست.",
    accent: "#e6b45a",
  },
  {
    id: "expertise",
    title: "تخصص در بازارهای مالی",
    desc: "تیم ما با تجربه در بازارهای جهانی، تخصصی عمیق در تحلیل و پیش‌بینی روندها دارد و این اساس تمام خدمات ماست.",
    accent: "#5cb8de",
  },
  {
    id: "mission",
    title: "ماموریت ما",
    desc: "هدف ما دموکراتیک کردن دسترسی به ابزارهای حرفه‌ای است تا موفقیت مالی برای همه در دسترس باشد.",
    accent: "#ef9656",
  },
  {
    id: "platform",
    title: "پلتفرم جامع",
    desc: "اپلیکیشن موبایل، ربات‌های معاملاتی هوشمند، سیگنال‌های دقیق و پشتیبانی ۲۴ ساعته را در یک پلتفرم یکپارچه ارائه می‌دهیم.",
    accent: "#3ecf9a",
  },
];

/* ---------- مزایای اپلیکیشن ---------- */
export const DOWNLOAD_PERKS = [
  "حجم سبک؛ فقط ۳۸ مگابایت",
  "اعلان لحظه‌ای سیگنال ربات‌ها",
  "ورود امن با اثر انگشت و چهره",
  "حالت تاریک کامل، هم‌رنگ چشم معامله‌گر",
];

/* ---------- ربات‌ها ---------- */
export type Robot = {
  id: string;
  name: string;
  role: string;
  desc: string;
  accent: string;
  winRate: number;
  daily: string;
  markets: string[];
  timeframe: string;
  tag: string;
  lastSignal: string;
  priceLabel: string;
  priceNum: number;
};

export const ROBOTS: Robot[] = [
  {
    id: "microbot",
    name: "میکوبات",
    role: "ربات معاملاتی",
    desc: "ربات سیگنال‌دهی برای فارکس و ارز دیجیتال با دقت ۹۴٪. پشتیبانی از تمامی جفت‌ارزها و تایم‌فریم‌ها.",
    accent: "#e6b45a",
    winRate: 94,
    daily: "۲۰+ سیگنال",
    markets: ["فارکس", "رمزارز"],
    timeframe: "همه تایم‌فریم‌ها",
    tag: "دقت ۹۴٪",
    lastSignal: "همین حالا",
    priceLabel: "۵۵۰٬۰۰۰",
    priceNum: 550000,
  },
  {
    id: "orobat",
    name: "اُروبات",
    role: "ربات تخصصی طلا",
    desc: "ربات تخصصی معاملات طلا با دقت ۹۶٪ که با تمرکز روی نماد طلا عملکردی فوق‌العاده ارائه می‌دهد.",
    accent: "#3ecf9a",
    winRate: 96,
    daily: "۳ تا ۵ سیگنال",
    markets: ["طلا"],
    timeframe: "تمرکز روی XAUUSD",
    tag: "دقت ۹۶٪",
    lastSignal: "۴ دقیقه پیش",
    priceLabel: "۴۵۰٬۰۰۰",
    priceNum: 450000,
  },
  {
    id: "yuz",
    name: "یوز",
    role: "شکارچی خبر",
    desc: "مثل یوزپلنگ، در لحظه انتشار اخبار مهم اقتصادی وارد عمل می‌شود و جهش‌های لحظه‌ای بازار را به سود شما ثبت می‌کند.",
    accent: "#5cb8de",
    winRate: 79,
    daily: "در زمان اخبار",
    markets: ["فارکس", "شاخص‌ها"],
    timeframe: "معاملات خبری",
    tag: "سرعتی",
    lastSignal: "۱۲ دقیقه پیش",
    priceLabel: "۶۵۰٬۰۰۰",
    priceNum: 650000,
  },
];

export const SIGNAL_POOL: { robot: string; side: Side; pair: string; price: string }[] = [
  { robot: "microbot", side: "buy", pair: "BTC/USDT", price: "۶۷٬۲۱۴" },
  { robot: "orobat", side: "buy", pair: "XAU/USD", price: "۲٬۳۸۱٫۴" },
  { robot: "yuz", side: "sell", pair: "EUR/USD", price: "۱٫۰۸۵۶" },
  { robot: "microbot", side: "sell", pair: "ETH/USDT", price: "۳٬۵۲۰٫۲" },
  { robot: "orobat", side: "buy", pair: "GBP/USD", price: "۱٫۲۶۹۰" },
  { robot: "yuz", side: "buy", pair: "US30", price: "۳۹٬۰۸۵" },
  { robot: "microbot", side: "buy", pair: "SOL/USDT", price: "۱۴۸٫۷" },
  { robot: "orobat", side: "sell", pair: "USD/JPY", price: "۱۵۷٫۶۵" },
  { robot: "yuz", side: "buy", pair: "XAU/USD", price: "۲٬۳۷۷٫۹" },
  { robot: "microbot", side: "buy", pair: "XRP/USDT", price: "۰٫۵۲۸۴" },
];

/* ---------- خدمات تخصصی ---------- */
export const SERVICES_INTRO = {
  kicker: "خدمات تخصصی",
  title: "محصولات ایران افیکس",
  desc: "در ادامه، با خدمات اصلی ایران افیکس آشنا شوید. بنابراین، هر محصول با استانداردهای جهانی طراحی شده و دقت بالایی دارد. علاوه بر این، پشتیبانی ۲۴ ساعته و آموزش‌های تخصصی همراه شماست.",
};

export const SERVICE_TILES: { id: string; title: string; desc: string; accent: string; icon: "standard" | "app" | "support" | "forum"; wide?: boolean }[] = [
  {
    id: "standard",
    title: "استانداردهای جهانی",
    desc: "محصولات ما با رعایت کامل استانداردهای جهانی طراحی شده‌اند تا بالاترین کارایی و امنیت را فراهم کنند.",
    accent: "#3ecf9a",
    icon: "standard",
    wide: true,
  },
  {
    id: "app",
    title: "اپلیکیشن موبایل",
    desc: "اپلیکیشن ایران افیکس رایگان است و شامل تحلیل، سیگنال و پشتیبانی ۲۴ ساعته برای معامله‌گران می‌شود.",
    accent: "#ef9656",
    icon: "app",
  },
  {
    id: "support",
    title: "آموزش و پشتیبانی",
    desc: "آموزش‌های تخصصی و پشتیبانی ۲۴/۷ به‌صورت رایگان ارائه می‌شوند تا در مسیر موفقیت همراه شما باشیم.",
    accent: "#5cb8de",
    icon: "support",
  },
  {
    id: "forum",
    title: "تالار گفتگو",
    desc: "تالار اختصاصی همه کاربران برای تبادل نظر، پرسش و پاسخ و اشتراک‌گذاری استراتژی‌ها — محیطی امن برای بحث و همکاری بین تریدرها.",
    accent: "#e6b45a",
    icon: "forum",
  },
];

/* ---------- دوره‌ها ---------- */
export type Course = {
  id: string;
  title: string;
  level: "مبتدی" | "متوسط" | "حرفه‌ای";
  levelColor: string;
  sessions: string;
  hours: string;
  teacher: string;
  rating: string;
  pattern: "channel" | "doubletop" | "fib" | "flag" | "triangle" | "steps";
  desc: string;
  priceLabel: string;
  priceNum: number;
  featured?: boolean;
};

export const COURSES: Course[] = [
  {
    id: "c1",
    title: "صفر تا صد بازارهای مالی",
    level: "مبتدی",
    levelColor: "#3ecf9a",
    sessions: "۲۸ جلسه",
    hours: "۱۴ ساعت",
    teacher: "سارا محمدی",
    rating: "۴٫۹",
    pattern: "channel",
    desc: "مسیر کامل ورود به بازارهای مالی؛ از شناخت کندل‌ها و ساختار بازار تا افتتاح حساب، مدیریت ریسک و انجام اولین معامله واقعی — با تمرین‌های عملی روی چارت زنده.",
    priceLabel: "۳۹۰٬۰۰۰",
    priceNum: 390000,
    featured: true,
  },
  {
    id: "c2",
    title: "پرایس اکشن به سبک RTM",
    level: "حرفه‌ای",
    levelColor: "#e5656c",
    sessions: "۱۹ جلسه",
    hours: "۹٫۵ ساعت",
    teacher: "امیر تهرانی",
    rating: "۴٫۸",
    pattern: "doubletop",
    desc: "سبک پیشرفته RTM برای خواندن ردپای پول هوشمند؛ ناحیه‌های عرضه و تقاضا، نقدینگی و ستاپ‌های ورود دقیق با مثال‌های واقعی از طلا و فارکس.",
    priceLabel: "۴۵۰٬۰۰۰",
    priceNum: 450000,
  },
  {
    id: "c3",
    title: "مدیریت سرمایه و کنترل ریسک",
    level: "متوسط",
    levelColor: "#e6b45a",
    sessions: "۱۲ جلسه",
    hours: "۶ ساعت",
    teacher: "نگار کیان",
    rating: "۴٫۹",
    pattern: "fib",
    desc: "مهم‌ترین مهارت بقا در بازار؛ محاسبه حجم پوزیشن، ریسک به ریوارد استاندارد و ساخت یک سیستم مدیریت سرمایه شخصی‌سازی‌شده.",
    priceLabel: "۲۹۰٬۰۰۰",
    priceNum: 290000,
  },
  {
    id: "c4",
    title: "روانشناسی معامله‌گری",
    level: "متوسط",
    levelColor: "#e6b45a",
    sessions: "۱۰ جلسه",
    hours: "۵ ساعت",
    teacher: "دکتر رامین شریف",
    rating: "۴٫۷",
    pattern: "steps",
    desc: "کنترل ترس و طمع، ساخت ژورنال معاملاتی و روتین ذهنی معامله‌گران حرفه‌ای؛ با تمرین‌های عملی بعد از هر جلسه.",
    priceLabel: "۲۵۰٬۰۰۰",
    priceNum: 250000,
  },
  {
    id: "c5",
    title: "فاندامنتال و معامله با اخبار",
    level: "حرفه‌ای",
    levelColor: "#e5656c",
    sessions: "۱۵ جلسه",
    hours: "۷ ساعت",
    teacher: "لیلا احمدی",
    rating: "۴٫۶",
    pattern: "triangle",
    desc: "تحلیل رویدادهای کلان، تقویم اقتصادی و معامله حرفه‌ای در زمان اخبار؛ از NFP تا تصمیم‌های نرخ بهره.",
    priceLabel: "۳۲۰٬۰۰۰",
    priceNum: 320000,
  },
  {
    id: "c6",
    title: "اتوماسیون با ربات‌های سیگنال",
    level: "متوسط",
    levelColor: "#e6b45a",
    sessions: "۸ جلسه",
    hours: "۴ ساعت",
    teacher: "امیر تهرانی",
    rating: "۴٫۸",
    pattern: "flag",
    desc: "اتصال ربات‌های اُروبات، میکوبات و یوز به حساب معاملاتی، تنظیم فیلترهای شخصی و ساخت استراتژی نیمه‌خودکار.",
    priceLabel: "۳۶۰٬۰۰۰",
    priceNum: 360000,
  },
];

/* ---------- مرجع معامله‌گران ---------- */
export const REFERENCE = {
  kicker: "مرجع معامله‌گران",
  title: "ایران اِفیکس مرجع کاملی برای معامله‌گران",
  desc: "اپلیکیشن ایران اِفیکس، به عنوان دستیار هوشمند تریدرها، با ارائه ابزارها و امکانات پیشرفته، تجربه‌ای حرفه‌ای از معاملات را برایتان فراهم می‌کند.",
};

export const REFERENCE_PILLARS: { title: string; desc: string; accent: string }[] = [
  {
    title: "آموزش جامع",
    desc: "مجموعه‌ای کامل از دوره‌های آموزشی، مقالات و وبینارهای تخصصی برای ارتقای دانش و مهارت شما",
    accent: "#3ecf9a",
  },
  {
    title: "پشتیبانی ۲۴ ساعته",
    desc: "تیم پشتیبانی ایران اِفیکس به صورت ۲۴ ساعته برای پاسخگویی به سوالات و مشکلات شما در دسترس است",
    accent: "#5cb8de",
  },
  {
    title: "تحلیل دقیق بازار",
    desc: "ارائه سیگنال و تحلیل‌های تخصصی از بازارهای مالی، به شما کمک می‌کند تصمیمات آگاهانه‌تری بگیرید",
    accent: "#e6b45a",
  },
  {
    title: "ابزارهای معاملاتی",
    desc: "دسترسی به ابزارهای متنوع که تجربه‌ای حرفه‌ای از معامله‌گری را برای شما به ارمغان می‌آورد",
    accent: "#ef9656",
  },
];

/* ---------- ۳ گام آموزشی ---------- */
export const STEPS_HEAD = {
  kicker: "سه مرحله ساده",
  title: "۳ گام آموزشی",
  desc: "انتخاب رشته کنید، آزمون بدید، گواهینامه بگیرید؛ فقط ۳ مرحله تا بازارهای مالی.",
};

export const STEPS: { num: string; title: string; desc: string; accent: string }[] = [
  {
    num: "۱",
    title: "انتخاب رشته",
    desc: "رشته بورسی خود را انتخاب کنید و در آن به کسب درآمد برسید (فارکس، کریپتو).",
    accent: "#3ecf9a",
  },
  {
    num: "۲",
    title: "آزمون",
    desc: "آزمون‌های پایان دوره ایران اِفیکس برای تجزیه و تحلیل دانش شما از دوره می‌باشد.",
    accent: "#e6b45a",
  },
  {
    num: "۳",
    title: "گواهینامه",
    desc: "در انتها افتخار این را خواهیم داشت که از موفقیت شما تقدیر کنیم.",
    accent: "#5cb8de",
  },
];

/* ---------- امکانات ویژه ---------- */
export const FEATURES_HEAD = {
  kicker: "امکانات ویژه",
  title: "امکانات ویژه",
  desc: "از کتاب‌های آموزشی تا دستیارهای معاملاتی؛ دریافت بهترین کتاب‌های آموزشی بین‌المللی و آزمون‌ها و سوالات.",
};

export const FEATURE_CARDS: { id: string; title: string; desc: string; accent: string; icon: "chart" | "news" | "live" | "self" }[] = [
  {
    id: "chart",
    title: "چارت تحلیل",
    desc: "چارت حرفه‌ای مبتنی بر تریدینگ ویو، همیشه در دسترس شما برای تحلیل ارزها.",
    accent: "#3ecf9a",
    icon: "chart",
  },
  {
    id: "news",
    title: "اخبار بین‌الملل",
    desc: "جدیدترین اخبار اقتصادی تاثیرگذار، به‌صورت لحظه‌ای و دقیق در اختیار شما.",
    accent: "#5cb8de",
    icon: "news",
  },
  {
    id: "live",
    title: "لایو ترید",
    desc: "با اکانت ۱۰٬۰۰۰ دلاری در محیط متاتریدر معامله کنید و تجربه کسب نمایید.",
    accent: "#ef9656",
    icon: "live",
  },
  {
    id: "self",
    title: "خودشناسی",
    desc: "با تست روانشناسی فردی، میزان ریسک‌پذیری و اضطراب خود را بسنجید.",
    accent: "#e6b45a",
    icon: "self",
  },
];

/* ---------- شروع هوشمندانه ---------- */
export const FINAL_CTA = {
  kicker: "شروع هوشمندانه",
  title: "همین حالا شروع کنید",
  desc: "به خانواده بزرگ معامله‌گران ایران افیکس بپیوندید و از خدمات حرفه‌ای ما بهره‌مند شوید. به‌ویژه، اپلیکیشن ما کاملاً رایگان است و تمام امکانات مورد نیاز را در اختیارتان قرار می‌دهد.",
  successTitle: "موفقیت شما",
  successLine1: "اگر می‌خواهید یک معامله‌گر موفق شوید، حتماً به ایران اِفیکس نیاز دارید.",
  successLine2:
    "از کتاب‌های آموزشی تا دستیارهای معاملاتی، ایران اِفیکس همه ابزارهای لازم برای موفقیت شما در بازارهای مالی را فراهم می‌کند.",
};

/* ---------- اشتراک‌ها ---------- */
export const PLANS = {
  monthly: {
    name: "اشتراک یک‌ماهه",
    price: "۱٬۶۰۰٬۰۰۰",
    unit: "تومان / ماه",
    note: "دسترسی کامل ۳۰ روزه به تمام امکانات",
    desc: "یک ماه دسترسی کامل و بدون محدودیت به تمام امکانات ایران افیکس؛ هر سه ربات سیگنال‌ده، کانال VIP، آکادمی و پشتیبانی اختصاصی. بدون تمدید خودکار — تمدید فقط با اختیار خود شما.",
    features: [
      "دسترسی به هر ۳ ربات سیگنال‌ده",
      "کانال VIP سیگنال‌های لحظه‌ای",
      "دسترسی کامل به آکادمی آموزشی",
      "پشتیبانی تلگرامی ۲۴/۷",
      "به‌روزرسانی هفتگی استراتژی‌ها",
    ],
    cta: "شروع اشتراک ماهانه",
    priceNum: 1600000,
  },
  lifetime: {
    name: "اشتراک دائمی",
    price: "رایگان",
    unit: "برای همیشه",
    note: "بدون پرداخت، بدون تمدید، بدون محدودیت زمانی",
    desc: "به‌جای پرداخت ماهانه، فقط یک حساب معاملاتی از طریق ایران افیکس افتتاح کنید؛ تمام امکانات پرمیوم برای همیشه فعال می‌ماند. بدون تمدید، بدون هزینه پنهان، بدون محدودیت زمانی.",
    features: [
      "تمام امکانات پلن ماهانه",
      "وبینار ماهانه استراتژی با اساتید",
      "مشاور اختصاصی حساب",
      "سیگنال‌های پریمیوم یوز و میکوبات",
      "اولویت در رویدادها و نشست‌های حضوری",
    ],
    cta: "دریافت اشتراک دائمی رایگان",
    condition: "با افتتاح و شارژ حساب معاملاتی از طریق ایران افیکس، به‌صورت خودکار فعال می‌شود.",
    priceNum: 0,
  },
};

/* ---------- فوتر ---------- */
export const FOOTER_PLATFORM_LINKS = [
  { label: "سامانه کوین افیکس", href: "#top" },
  { label: "سامانه دلتا افیکس", href: "#top" },
  { label: "سامانه گلد افیکس", href: "#top" },
  { label: "مقایسه سامانه‌ها", href: "#top" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "خدمات تخصصی", href: "#services" },
  { label: "مرجع معامله‌گران", href: "#academy" },
  { label: "تعرفه اشتراک", href: "#plans" },
  { label: "چرا ایران افیکس", href: "#why" },
];

export const FOOTER_EXTRA_COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "دسته‌بندی‌ها",
    links: [
      { label: "دانلود اپلیکیشن", href: "#" },
      { label: "اخبار", href: "#" },
      { label: "تقویم اقتصادی", href: "#" },
      { label: "چارت تحلیل", href: "#" },
      { label: "سیگنال و تحلیل", href: "#" },
      { label: "فروشگاه", href: "#" },
    ],
  },
  {
    title: "دانلود اپلیکیشن",
    links: [
      { label: "دریافت از مایکت", href: "#" },
      { label: "دریافت از آی‌اپس", href: "#" },
      { label: "دریافت نسخه APK", href: "#" },
      { label: "دریافت نسخه دسکتاپ", href: "#" },
    ],
  },
  {
    title: "ابزارها",
    links: [
      { label: "تبدیل جیسون", href: "#" },
      { label: "تایید دامنه", href: "#" },
      { label: "مقالات تخصصی", href: "#" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { label: "پشتیبانی", href: "#" },
      { label: "ایمیل پشتیبانی", href: "#" },
      { label: "همکاری با برترین ارائه‌دهندگان خدمات", href: "#" },
    ],
  },
];

export const COPYRIGHT =
  "© ۱۴۰۴ - تمامی حقوق برای ایران افیکس محفوظ است. | طراحی و توسعه با عشق برای جامعه معامله‌گران ایران";

/* ---------- محصولات (پنل خرید و سبد) ---------- */
export type Product = {
  id: string;
  kind: "robot" | "course" | "plan";
  kindLabel: string;
  name: string;
  accent: string;
  desc: string;
  features: string[];
  meta: { label: string; value: string }[];
  priceNum: number;
  priceLabel: string;
  unit: string;
};

/* تبدیل «؛» به «،» برای نمایش یکدست در پنل خرید */
const norm = (s: string) => s.replace(/؛/g, "،");

export function productFromRobot(r: Robot): Product {
  return {
    id: `robot-${r.id}`,
    kind: "robot",
    kindLabel: "ربات معاملاتی",
    name: r.name,
    accent: r.accent,
    desc: norm(r.desc),
    features: [
      `نرخ موفقیت ٪${r.winRate} در ۹۰ روز گذشته`,
      `سیگنال روزانه: ${r.daily}`,
      `سبک معاملاتی: ${r.timeframe}`,
      "ارسال سیگنال به تلگرام و داخل اپلیکیشن",
      "گارانتی بازگشت وجه تا ۷ روز",
    ],
    meta: [
      { label: "نرخ موفقیت", value: `٪${r.winRate}` },
      { label: "سیگنال روزانه", value: r.daily },
      { label: "سبک", value: r.timeframe },
      { label: "بازارها", value: r.markets.join("، ") },
    ],
    priceNum: r.priceNum,
    priceLabel: r.priceLabel,
    unit: "تومان / ماه",
  };
}

export function productFromCourse(c: Course): Product {
  return {
    id: `course-${c.id}`,
    kind: "course",
    kindLabel: "دوره آموزشی",
    name: c.title,
    accent: c.levelColor,
    desc: norm(c.desc),
    features: [
      "دسترسی مادام‌العمر به ویدیوها",
      "تمرین عملی روی چارت زنده",
      "گواهینامه پایان دوره ایران افیکس",
      "رفع اشکال هفتگی با مدرس",
    ],
    meta: [
      { label: "سطح", value: c.level },
      { label: "مدرس", value: c.teacher },
      { label: "جلسات", value: c.sessions },
      { label: "مدت", value: c.hours },
    ],
    priceNum: c.priceNum,
    priceLabel: c.priceLabel,
    unit: "تومان",
  };
}

export function productFromPlan(key: "monthly" | "lifetime"): Product {
  const p = PLANS[key];
  return {
    id: `plan-${key}`,
    kind: "plan",
    kindLabel: key === "monthly" ? "اشتراک ماهانه" : "اشتراک دائمی",
    name: p.name,
    accent: key === "monthly" ? "#3ecf9a" : "#e6b45a",
    desc: norm(p.desc),
    features: p.features.map(norm),
    meta:
      key === "monthly"
        ? [
            { label: "مدت اعتبار", value: "۳۰ روز" },
            { label: "تمدید", value: "دستی و اختیاری" },
            { label: "ضمانت", value: "بازگشت ۷ روزه" },
          ]
        : [
            { label: "مدت اعتبار", value: "همیشگی" },
            { label: "هزینه", value: "رایگان" },
            { label: "فعال‌سازی", value: "با افتتاح حساب" },
          ],
    priceNum: p.priceNum,
    priceLabel: p.price,
    unit: p.unit,
  };
}
