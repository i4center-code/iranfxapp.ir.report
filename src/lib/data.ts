export type Side = "buy" | "sell";

export const NAV_LINKS = [
  { id: "platforms", label: "پلتفرم‌ها" },
  { id: "robots", label: "ربات‌های سیگنال" },
  { id: "academy", label: "آکادمی" },
  { id: "plans", label: "اشتراک" },
] as const;

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

export type Platform = {
  id: string;
  name: string;
  en: string;
  tagline: string;
  accent: string;
  accentSoft: string;
  market: string;
  pair: string;
  price: string;
  change: number;
  features: string[];
  spark: number[];
  seed: number;
};

export const PLATFORMS: Platform[] = [
  {
    id: "gold",
    name: "گلد افیکس",
    en: "Gold FX",
    tagline: "تخصصی‌ترین پلتفرم معامله طلا در ایران",
    accent: "#e6b45a",
    accentSoft: "rgba(230,180,90,0.14)",
    market: "طلا و فلزات",
    pair: "XAU/USD",
    price: "۲٬۳۸۴٫۵۰",
    change: 0.42,
    features: ["اسپرد طلا از ۰٫۱ دلار", "معامله طلای آبشده و سکه", "تحویل و تسویه آنی ریالی", "نمودار تیک‌به‌تیک زنده"],
    spark: [32, 30, 31, 28, 26, 27, 24, 25, 22, 23, 20, 21, 17, 18, 14, 15, 11, 12, 8, 6],
    seed: 11,
  },
  {
    id: "coin",
    name: "کوین افیکس",
    en: "Coin FX",
    tagline: "خرید، فروش و معامله ۱۲۰+ رمزارز با تسویه آنی",
    accent: "#ef9656",
    accentSoft: "rgba(239,150,86,0.14)",
    market: "رمزارزها",
    pair: "BTC/USDT",
    price: "۶۷٬۲۴۰",
    change: 1.87,
    features: ["بیش از ۱۲۰ رمزارز فعال", "کیف پول سرد و امن", "معاملات اهرمی تا ۱:۱۰۰", "بازار P2P بدون کارمزد"],
    spark: [20, 26, 22, 30, 24, 32, 26, 20, 28, 22, 30, 24, 18, 26, 20, 28, 22, 16, 24, 10],
    seed: 23,
  },
  {
    id: "delta",
    name: "دلتا افیکس",
    en: "Delta FX",
    tagline: "فارکس حرفه‌ای با اجرای ECN و لوریج منعطف",
    accent: "#5cb8de",
    accentSoft: "rgba(92,184,222,0.14)",
    market: "فارکس و شاخص‌ها",
    pair: "EUR/USD",
    price: "۱٫۰۸۴۲",
    change: 0.11,
    features: ["۶۰+ جفت‌ارز و شاخص جهانی", "حساب ECN با اسپرد از صفر", "لوریج منعطف تا ۱:۵۰۰", "سازگار با متاتریدر ۵"],
    spark: [22, 20, 23, 21, 24, 22, 20, 23, 21, 19, 22, 20, 23, 21, 22, 20, 23, 21, 22, 20],
    seed: 37,
  },
];

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
};

export const ROBOTS: Robot[] = [
  {
    id: "orobat",
    name: "اُروبات",
    role: "استراتژیست سویینگ",
    desc: "روندهای بزرگ طلا و فارکس را شناسایی می‌کند و با دید چندروزه، سیگنال‌های کم‌ریسک و پرطمأنینه صادر می‌کند.",
    accent: "#3ecf9a",
    winRate: 87,
    daily: "۳ تا ۵ سیگنال",
    markets: ["طلا", "فارکس"],
    timeframe: "تایم‌فریم ۴ ساعته",
    tag: "کم‌ریسک",
    lastSignal: "۴ دقیقه پیش",
  },
  {
    id: "microbot",
    name: "میکوبات",
    role: "اسکالپر رمزارز",
    desc: "در تایم‌فریم‌های کوتاه، نوسان‌های ریز بیت‌کوین و آلت‌کوین‌ها را شکار می‌کند؛ مخصوص معامله‌گران پرحجم.",
    accent: "#e6b45a",
    winRate: 82,
    daily: "۲۰+ سیگنال",
    markets: ["رمزارز"],
    timeframe: "تایم‌فریم ۵ دقیقه",
    tag: "پرتحرک",
    lastSignal: "همین حالا",
  },
  {
    id: "yuz",
    name: "یوز",
    role: "شکارچی خبر",
    desc: "مثل یوزپلنگ، در لحظه انتشار اخبار مهم اقتصادی وارد عمل می‌شود و جهش‌های لحظه‌ای بازار را به سود شما می‌چاپد.",
    accent: "#5cb8de",
    winRate: 79,
    daily: "در زمان اخبار",
    markets: ["فارکس", "شاخص‌ها"],
    timeframe: "معاملات خبری",
    tag: "سرعتی",
    lastSignal: "۱۲ دقیقه پیش",
  },
];

export const SIGNAL_POOL: { robot: string; side: Side; pair: string; price: string }[] = [
  { robot: "میکوبات", side: "buy", pair: "BTC/USDT", price: "۶۷٬۲۱۴" },
  { robot: "اُروبات", side: "buy", pair: "XAU/USD", price: "۲٬۳۸۱٫۴" },
  { robot: "یوز", side: "sell", pair: "EUR/USD", price: "۱٫۰۸۵۶" },
  { robot: "میکوبات", side: "sell", pair: "ETH/USDT", price: "۳٬۵۲۰٫۲" },
  { robot: "اُروبات", side: "buy", pair: "GBP/USD", price: "۱٫۲۶۹۰" },
  { robot: "یوز", side: "buy", pair: "US30", price: "۳۹٬۰۸۵" },
  { robot: "میکوبات", side: "buy", pair: "SOL/USDT", price: "۱۴۸٫۷" },
  { robot: "اُروبات", side: "sell", pair: "USD/JPY", price: "۱۵۷٫۶۵" },
  { robot: "یوز", side: "buy", pair: "XAU/USD", price: "۲٬۳۷۷٫۹" },
  { robot: "میکوبات", side: "buy", pair: "XRP/USDT", price: "۰٫۵۲۸۴" },
];

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
  },
];

export const PLANS = {
  monthly: {
    name: "اشتراک یک‌ماهه",
    price: "۳۹۹٬۰۰۰",
    unit: "تومان",
    note: "برای شروع و ارزیابی کامل امکانات",
    features: [
      "دسترسی به هر ۳ ربات سیگنال‌ده",
      "کانال VIP سیگنال‌های لحظه‌ای",
      "دسترسی کامل به آکادمی آموزشی",
      "پشتیبانی تلگرامی ۲۴/۷",
      "به‌روزرسانی هفتگی استراتژی‌ها",
    ],
    cta: "شروع اشتراک ماهانه",
  },
  lifetime: {
    name: "اشتراک دائمی",
    price: "رایگان",
    unit: "برای همیشه",
    note: "بدون پرداخت، بدون تمدید، بدون محدودیت زمانی",
    features: [
      "تمام امکانات پلن ماهانه",
      "وبینار ماهانه استراتژی با اساتید",
      "مشاور اختصاصی حساب",
      "سیگنال‌های پریمیوم یوز و میکوبات",
      "اولویت در رویدادها و نشست‌های حضوری",
    ],
    cta: "دریافت اشتراک دائمی رایگان",
    condition: "با افتتاح و شارژ حساب معاملاتی از طریق ایران افیکس، به‌صورت خودکار فعال می‌شود.",
  },
};

export const TRUST_POINTS = [
  { icon: "wallet", label: "واریز و برداشت ریالی آنی" },
  { icon: "gauge", label: "اسپرد از ۰٫۰ پیپ" },
  { icon: "headset", label: "پشتیبانی فارسی ۲۴ ساعته" },
  { icon: "shield", label: "کیف پول سرد و امنیت دومرحله‌ای" },
] as const;

export const DOWNLOAD_PERKS = [
  "حجم سبک؛ فقط ۳۸ مگابایت",
  "اعلان لحظه‌ای سیگنال ربات‌ها",
  "ورود امن با اثر انگشت و چهره",
  "حالت تاریک کامل، هم‌رنگ چشم معامله‌گر",
];
