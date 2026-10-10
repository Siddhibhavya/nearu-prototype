import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ScrollRow } from "./ui";
import { CartIcon, ShareIcon, MailIcon, PhoneIcon, CheckIcon, AddressIcon, ArrowLeftIcon, BagIcon, BankIcon, BellIcon, ChartIcon, ChatIcon, GearIcon, HeartIcon, HistoryIcon, MoonIcon, OrdersIcon, PayoutIcon, PenIcon, ReturnIcon, StoreIcon, SunIcon, SupportIcon, UserIcon, VerifiedSeal } from "./icons";
import { AddListingView, AddressesView, BankPaymentsView, CashOutView, ChatView, MessagesView, MyOrdersView, NotificationsView, SellerOrdersView, OrderHistoryView, PayoutDoneView, PayoutProcessingView, ReportView, orderFromLines, seedOrders, seedThreads } from "./more";
import type { Listing, Msg, Order, Payout, Thread } from "./more";

type Tab =
  | "Explore"
  | "Search"
  | "Cart"
  | "Profile"
  | "Wishlist"
  | "Storefront"
  | "Analytics"
  | "Payouts"
  | "Checkout"
  | "Confirmed"
  | "Onboarding"
  | "OnboardingCreate"
  | "OnboardingMode"
  | "OnboardingVerify"
  | "OnboardingLogin"
  | "SellerSetup"
  | "Listings"
  | "Orders"
  | "Product"
  | "SeeAll"
  | "MyOrders"
  | "OrderHistory"
  | "Notifications"
  | "Addresses"
  | "BankPayments"
  | "Messages"
  | "Chat"
  | "CashOut"
  | "PayoutProcessing"
  | "PayoutDone"
  | "Report"
  | "AddListing"
  | "Shop"
  | "EditProfile"
  | "AppPrefs"
  | "SellerOnboard"
  | "Collab";


const featured = [
  {
    id: 1,
    seller: "Kabir Mehta",
    title: "Modular Cable Org",
    label: "MOST POPULAR",
    price: "₹499",
    image: "./assets/91f1c.png",
    avatar: "./assets/dc6b1.png",
  },
  {
    id: 17,
    seller: "Shroom Doodle",
    title: "Lapis Drop Earrings",
    label: "NEW STORE",
    price: "₹599",
    image: "./assets/shroom-lapis.jpg",
    avatar: "./assets/shroom-avatar.svg",
  },
  {
    id: 2,
    seller: "Maya Chen",
    title: "Cozy Cloud Beanie",
    label: "MOST POPULAR",
    price: "₹699",
    image: "./assets/beanie.jpg",
    avatar: "./assets/166ae.png",
  },
];

const marketplace: { id: number; title: string; price: string; image: string; category: string; shop?: string }[] = [
  { id: 3, title: "Rainy Day Soy", price: "₹299", image: "./assets/43074.png", category: "Handmade" },
  { id: 4, title: "Olympus Stylus", price: "₹749", image: "./assets/9d186.png", category: "Vintage" },
  { id: 5, title: "Dreamy Polaroids", price: "₹499", image: "./assets/14334.png", category: "Services" },
  { id: 6, title: "Hand-painted Denim", price: "₹799", image: "./assets/2e7ab.png", category: "Handmade" },
  { id: 7, title: "Boho Dorm Macrame", price: "₹649", image: "./assets/91f1c.png", category: "Dorm Decor" },
  { id: 8, title: "Web Dev Tutoring", price: "₹699", image: "./assets/c80da.png", category: "Tutoring" },
  { id: 9, title: "Campus Design Notes", price: "₹599", image: "./assets/1f777.png", category: "Textbooks" },
  { id: 10, title: "Ceramic Studio Mug", price: "₹599", image: "./assets/e7eaa.png", category: "Handmade" },
  { id: 11, title: "Carnelian Gold Ring", price: "₹749", image: "./assets/shroom-ring.jpg", category: "Accessories", shop: "Shroom Doodle" },
  { id: 12, title: "Pearl Strand Necklace", price: "₹699", image: "./assets/shroom-pearls.jpg", category: "Accessories", shop: "Shroom Doodle" },
  { id: 13, title: "Beaded Bracelet", price: "₹349", image: "./assets/shroom-bracelet.jpg", category: "Accessories", shop: "Shroom Doodle" },
  { id: 14, title: "Barrette Hair Clip", price: "₹199", image: "./assets/shroom-clip.jpg", category: "Accessories", shop: "Shroom Doodle" },
  { id: 15, title: "Flower Cluster Earrings", price: "₹449", image: "./assets/shroom-flowers.jpg", category: "Accessories", shop: "Shroom Doodle" },
];

function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <span className="status-time">9:41</span>
      <div className="status-network">
        <span className="signal-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <img alt="Wi-Fi" src="./assets/2a9f7.svg" />
        <span className="battery" role="img" aria-label="Battery full">
          <i />
          <b />
        </span>
      </div>
    </div>
  );
}

function OnboardingView({
  onCreate,
  onLogin,
}: {
  onCreate: () => void;
  onLogin: () => void;
}) {
  return (
    <main className="onboarding-view">
      <div className="onboarding-orb top" />
      <div className="onboarding-orb bottom" />
      <img alt="Students shopping together" className="onboarding-art" src="./assets/886f4.svg" />
      <div className="onboarding-title">From Dorm to Dorm</div>
      <button className="onboarding-create" onClick={onCreate} type="button">
        CREATE ACCOUNT
        <img alt="" src="./assets/d4982.svg" />
      </button>
      <button className="onboarding-login" onClick={onLogin} type="button">Log In</button>
      <div className="onboarding-trust">
        <span><img alt="" src="./assets/89afe.svg" />VERIFIED<br />STUDENTS</span>
        <i />
        <span><img alt="" src="./assets/a221b.svg" />SECURE<br />PAYMENTS</span>
      </div>
    </main>
  );
}

function FlowBackdrop() {
  return (
    <>
      <div className="flow-orb flow-orb-top" />
      <div className="flow-orb flow-orb-side" />
      <div className="flow-orb flow-orb-bottom" />
      <img alt="NearU" className="flow-logo" src="./assets/2b8f2.svg" />
    </>
  );
}

function CreateAccountView({
  onLogin,
  onNext,
}: {
  onLogin: () => void;
  onNext: () => void;
}) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set(["HANDMADE"]));
  const toggleTag = (tag: string) => {
    setSelectedTags((current) => {
      const next = new Set(current);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  return (
    <main className="account-flow">
      <FlowBackdrop />
      <div className="flow-title">Create Account</div>
      <section className="account-card">
        <label>
          <span>FULL NAME <img alt="" src="./assets/6e0c2.svg" /></span>
          <input defaultValue="Kabir Mehta" />
        </label>
        <label>
          <span>MAJOR / SPECIALTY <img alt="" src="./assets/6edd1.svg" /></span>
          <input defaultValue="Graphic Design / Econ" />
        </label>
        <label>
          <span>FUN FACT <img alt="" src="./assets/a0548.svg" /></span>
          <textarea defaultValue="I make the best matcha latte on campus..." />
        </label>
        <div className="story-note">People love a good story!</div>
        <div className="tag-label">WHAT DO YOU SELL?</div>
        <div className="account-tags">
          {[
            ["HANDMADE", "./assets/3bf6e.svg"],
            ["TEXTBOOKS", "./assets/1cfde.svg"],
            ["TECH", "./assets/6e048.svg"],
          ].map(([tag, icon]) => (
            <button
              className={selectedTags.has(tag) ? "selected" : ""}
              key={tag}
              onClick={() => toggleTag(tag)}
              type="button"
            >
              <img alt="" src={icon} />{tag}
            </button>
          ))}
        </div>
        <button className="flow-primary" onClick={onNext} type="button">CREATE PROFILE</button>
      </section>
      <button className="flow-text-link" onClick={onLogin} type="button">
        Already have an account? <b>Log in</b>
      </button>
    </main>
  );
}

function LoginView({ onLogin }: { onLogin: () => void }) {
  return (
    <main className="account-flow login-flow">
      <FlowBackdrop />
      <div className="flow-title">Log In</div>
      <section className="account-card login-card">
        <label>
          <span>STUDENT EMAIL ADDRESS</span>
          <input placeholder="alex@university.edu" type="email" />
        </label>
        <label>
          <span>PASSWORD</span>
          <input placeholder="Enter your password" type="password" />
        </label>
        <button className="forgot-link" type="button">Forgot password?</button>
        <button className="flow-primary" onClick={onLogin} type="button">LOG IN</button>
      </section>
    </main>
  );
}

function ModeSelectionView({
  onChoose,
}: {
  onChoose: (seller: boolean, both?: boolean) => void;
}) {
  return (
    <main className="account-flow mode-flow">
      <FlowBackdrop />
      <div className="mode-heading">How do you want to<br />use Near U today?</div>
      <p>Select an option below to customize your experience. You can always change this later in settings.</p>
      <section className="role-options">
        <button className="role-buy" onClick={() => onChoose(false)} type="button">
          <img alt="" src="./assets/1dcbe.svg" /><strong>I want to Buy</strong>
        </button>
        <button className="role-sell" onClick={() => onChoose(true)} type="button">
          <img alt="" src="./assets/5d0e3.svg" /><strong>I want to Sell</strong>
        </button>
        <button className="role-both" onClick={() => onChoose(false, true)} type="button">
          <img alt="" src="./assets/icon-collab-active.svg" /><strong>I want to Buy and Sell</strong>
        </button>
      </section>
    </main>
  );
}

function VerificationView({ onVerify }: { onVerify: () => void }) {
  return (
    <main className="account-flow verify-flow">
      <FlowBackdrop />
      <div className="mode-heading">Campus<br />Verification</div>
      <section className="verify-card">
        <label>SELECT YOUR UNIVERSITY</label>
        <div className="flow-input with-icon"><img alt="" src="./assets/e8c77.svg" /><input placeholder="Search for your campus..." /></div>
        <div className="campus-tags"><button type="button">STANFORD</button><button type="button">MIT</button><button type="button">UC BERKELEY</button></div>
        <label>STUDENT EMAIL ADDRESS</label>
        <div className="flow-input with-icon"><img alt="" src="./assets/0b37a.svg" /><input placeholder="alex@university.edu" type="email" /></div>
        <p className="verify-note"><img alt="" src="./assets/30d63.svg" />We&apos;ll send a 6-digit magic code to this email to verify your status.</p>
        <button className="flow-primary verify-button" onClick={onVerify} type="button">
          VERIFY MY CAMPUS <img alt="" src="./assets/d3302.svg" />
        </button>
      </section>
      <div className="secure-note"><img alt="" src="./assets/9ee46.svg" /> ENCRYPTED &amp; SECURE</div>
      <p className="verify-quote">&quot;We only allow verified students to<br />keep things safe!&quot;</p>
    </main>
  );
}

function AppHeader({
  onMenu,
  onWishlist,
  wishlistActive,
  onNotifications,
  notificationsActive,
  unread,
}: {
  onMenu: () => void;
  onWishlist: () => void;
  wishlistActive: boolean;
  onNotifications: () => void;
  notificationsActive: boolean;
  unread: boolean;
}) {
  return (
    <header className="app-header">
      <button aria-label="Open menu" className="menu-button" onClick={onMenu} type="button">
        <svg aria-hidden="true" height="22" viewBox="0 0 28 22" width="28"><path d="M3 4h22M3 11h22M3 18h22" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" /></svg>
      </button>
      <img alt="NearU" className="brand-logo" src="./assets/33894.svg" />
      <div className="header-actions">
        <button
          aria-label={unread ? "Open notifications, new" : "Open notifications"}
          className={`wishlist-button bell-button ${notificationsActive ? "active" : ""}`}
          onClick={onNotifications}
          type="button"
        >
          <BellIcon filled={notificationsActive} />
          {unread && <i className="bell-dot" aria-hidden="true" />}
        </button>
        <button
          aria-label="Open wishlist"
          className={`wishlist-button ${wishlistActive ? "active" : ""}`}
          onClick={onWishlist}
          type="button"
        >
          <HeartIcon filled={wishlistActive} />
        </button>
      </div>
    </header>
  );
}

function SellerDash({ onAnalytics, onStore }: { onAnalytics: () => void; onStore: () => void }) {
  return (
    <section aria-label="Your shop this month" className="sd-dash">
      <button className="sd-card" onClick={onAnalytics} type="button">
        <span className="sd-kicker">YOUR SHOP · LAST 30 DAYS<em>View analytics →</em></span>
        <span className="sd-two">
          <span><i>Revenue</i><b>{rupees(262560)}</b><u>+12%</u></span>
          <span><i>Orders</i><b>101</b><u>+8%</u></span>
        </span>
        <span className="sd-bars" aria-hidden="true">{[690, 780, 835, 977].map((v) => <s key={v} style={{ height: v / 977 * 100 + "%" }} />)}</span>
      </button>
      <button className="sd-store" onClick={onStore} type="button"><img alt="" src="./assets/150a5.svg" />Store view</button>
    </section>
  );
}

function ExploreView({ onSearch, sellerMode, onAnalytics, onStore, onOpen, onSeeAll, onShop }: { onSearch: () => void; sellerMode: boolean; onAnalytics: () => void; onStore: () => void; onOpen: (p: Product) => void; onSeeAll: () => void; onShop: () => void }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Textbooks", "Handmade", "Accessories", "Services", "Dorm Decor", "Tutoring"];
  const visibleProducts = category === "All"
    ? marketplace.slice(0, 6)
    : marketplace.filter((item) => item.category === category);

  return (
    <main className="screen-content">
      {sellerMode && <SellerDash onAnalytics={onAnalytics} onStore={onStore} />}
      <button aria-label="Search marketplace" className="search-pill" onClick={onSearch} type="button">
        <img alt="" src="./assets/b8fee.svg" />
      </button>

      <div className="category-list">
        {categories.map((item) => (
          <button
            className={category === item ? "selected" : ""}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <section className="featured-section">
        <div className="section-row">
          <div>
            <div className="featured-title">Featured Student<br />Hustlers</div>
            <p>Campus favorites &amp; their best-sellers.</p>
          </div>
          <button className="see-all" onClick={onSeeAll} type="button">
            <span>See<br />All</span>
            <b>→</b>
          </button>
        </div>

        <ScrollRow arrowTop={92} className="featured-scroll" label="Featured student hustlers">
          {featured.map((item) => (
            <article className="featured-card" key={item.id} onClick={() => onOpen(catalog.find((p) => p.id === item.id)!)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(catalog.find((p) => p.id === item.id)!); } }} role="button" tabIndex={0}>
              <div className="featured-photo">
                <img alt={item.title} src={item.image} />
                <span className="seller-pill" onClick={item.seller === "Shroom Doodle" ? (e) => { e.stopPropagation(); onShop(); } : undefined}>
                  <i><img alt="" src={item.avatar} /></i>
                  {item.seller}
                </span>
                <strong>{item.price}</strong>
              </div>
              <div className="featured-copy">
                <span>{item.label}</span>
                <div>{item.title}</div>
              </div>
            </article>
          ))}
        </ScrollRow>
      </section>

      <section className="market-section">
        <div className="market-heading">
          <div className="featured-title small">{category === "All" ? "Fresh on Campus" : category}</div>
          <button onClick={onSeeAll} type="button">See All</button>
        </div>
        <div className="market-grid">
          {visibleProducts.map((item) => (
            <article className="market-card" key={item.id} onClick={() => onOpen(catalog.find((p) => p.id === item.id)!)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(catalog.find((p) => p.id === item.id)!); } }} role="button" tabIndex={0}>
              <img alt={item.title} src={item.image} />
              <span>{item.title}</span>
              <strong>{item.price}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function SearchView({ onOpen }: { onOpen: (p: Product) => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Handmade", "Vintage", "Dorm Decor", "Services"];
  const results = marketplace.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || item.category === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <main className="screen-content search-view">
      <div className="view-title">Search</div>
      <label className="search-pill active">
        <img alt="" src="./assets/b8fee.svg" />
        <input
          autoFocus
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          value={query}
        />
      </label>
      <ScrollRow className="filter-row" label="Filter by category">
        {filters.map((item) => (
          <button
            className={filter === item ? "selected" : ""}
            key={item}
            onClick={() => setFilter(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </ScrollRow>
      <div className="result-label">{query ? `Results for “${query}”` : "Explore Marketplace"}</div>
      <div className="market-grid">
        {results.map((item) => (
          <article className="market-card" key={item.id} onClick={() => onOpen(catalog.find((p) => p.id === item.id)!)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(catalog.find((p) => p.id === item.id)!); } }} role="button" tabIndex={0}>
            <img alt={item.title} src={item.image} />
            <span>{item.title}</span>
            <strong>{item.price}</strong>
          </article>
        ))}
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------------------------------------------------------
// Shopping from the feed: product page, See All, a working cart, and a checkout that follows what is being bought.
// ---------------------------------------------------------------------------------------------------------------------------
type Product = { id: number; title: string; price: number; image: string; seller?: string; avatar?: string; category?: string; label?: string };
type Line = { product: Product; qty: number; selected: boolean };

const parsePrice = (s: string) => Number(s.replace(/[^\d]/g, ""));
const catalog: Product[] = [
  ...featured.map((f) => ({ id: f.id, title: f.title, price: parsePrice(f.price), image: f.image, seller: f.seller, avatar: f.avatar, label: f.label, category: "Featured" })),
  ...marketplace.map((m) => ({ id: m.id, title: m.title, price: parsePrice(m.price), image: m.image, category: m.category, seller: m.shop })),
];
const seedCart: Line[] = [
  { product: { id: 101, title: "Loung Chair", price: 399, image: "./assets/3b138.png", seller: "Kabir Mehta · FEATURED ARTIST" }, qty: 1, selected: true },
  { product: { id: 102, title: "Speckled Clay Mug", price: 299, image: "./assets/e7eaa.png", seller: "STUDIO TERRA · VERIFIED SELLER" }, qty: 1, selected: false },
  { product: { id: 103, title: "Rainy Day Soy Candle", price: 199, image: "./assets/63cf0.png", seller: "CAMPUS SCENTS · STUDENT" }, qty: 1, selected: false },
];
const lineTotal = (lines: Line[]) => lines.reduce((n, l) => n + l.product.price * l.qty, 0);

type Shop = { id: string; name: string; studio: string; bio: string; avatar?: string; rating: string; sold: number; replies: string; tag: string };
const shops: Record<string, Shop> = {
  kabir: { id: "kabir", name: "Kabir Mehta", studio: "Kabir's Dorm Studio", bio: "Creating handmade artifacts for student life. Everything is made in my dorm studio with love and too much caffeine.", avatar: "./assets/dc6b1.png", rating: "4.9", sold: 12, replies: "< 1hr", tag: "FEATURED MAKER" },
  shroom: { id: "shroom", name: "Shroom Doodle", studio: "Accessories and jewellery", bio: "Tiny doodled charms, beaded bracelets and earrings made in a hostel room between lectures.", avatar: "./assets/shroom-avatar.svg", rating: "4.8", sold: 31, replies: "< 1hr", tag: "NEW STORE" },
  maya: { id: "maya", name: "Maya Chen", studio: "Maya's Knit Corner", bio: "Cosy knits and small things made between classes.", avatar: "./assets/166ae.png", rating: "4.7", sold: 18, replies: "< 2hr", tag: "STUDENT MAKER" },
  campus: { id: "campus", name: "Campus Seller", studio: "NearU campus shop", bio: "A verified student seller on NearU.", rating: "4.6", sold: 9, replies: "< 3hr", tag: "STUDENT SELLER" },
};
const shopFor = (p: Product): Shop => (/Shroom/.test(p.seller ?? "") ? shops.shroom : /Maya/.test(p.seller ?? "") ? shops.maya : /Kabir/.test(p.seller ?? "") ? shops.kabir : shops.campus);
const aboutItem = (p: Product) => {
  const c = p.category ?? "";
  if (c === "Handmade" || c === "Featured") return "Made by a student on campus, in small batches. Every piece comes out a little different, which is part of the charm.";
  if (c === "Accessories") return "Handmade and picked by Shroom Doodle, a student shop for accessories and jewellery. Comes in a small gift pouch.";
  if (c === "Vintage") return "Pre-loved and checked by the seller before listing. Works as it should; light wear adds to the character.";
  if (c === "Textbooks") return "Clean copy with notes only in pencil. Handed over on campus, no shipping needed.";
  if (c === "Services" || c === "Tutoring") return "Booked through the seller. You agree on a time in Messages and pay when the session is done.";
  return "Listed by a verified student seller. Hand-over happens on campus at a pick-up point you choose.";
};
const highlights = (p: Product) => ["Verified student seller", "Campus pick-up · free delivery", p.category === "Services" || p.category === "Tutoring" ? "Pay after the session" : "Pay by UPI at checkout"];
type Review = { name: string; stars: number; when: string; text: string; likes: number; liked: boolean; reply?: string };
const reviewList: Review[] = [
  { name: "Aanya S.", stars: 5, when: "2 days ago", text: "Exactly as described. Easy hand-over near the library.", likes: 4, liked: false },
  { name: "Dev R.", stars: 5, when: "1 week ago", text: "Well packed and the seller replied within minutes.", likes: 2, liked: false },
  { name: "Isha N.", stars: 4, when: "2 weeks ago", text: "Great quality for the price. Would buy again.", likes: 1, liked: false },
];
const reviewStore = new Map<number, Review[]>();

const crops = [{ pos: "50% 50%", scale: 1 }, { pos: "30% 25%", scale: 1.9 }, { pos: "75% 80%", scale: 1.9 }];
function ProductView({ product, inCart, onAdd, onBuy, onCart, faved, onFav, shop, onOpenShop, onMessage, sellerMode }: { product: Product; inCart: boolean; onAdd: (qty: number) => void; onBuy: (qty: number) => void; onCart: () => void; faved: boolean; onFav: () => void; shop: Shop; onOpenShop: () => void; onMessage: () => void; sellerMode: boolean }) {
  const [shot, setShot] = useState(0);
  const [added, setAdded] = useState(false);
  const [reviews, setReviewsState] = useState<Review[]>(() => reviewStore.get(product.id) ?? reviewList);
  const setReviews = (next: Review[]) => { reviewStore.set(product.id, next); setReviewsState(next); };
  const [writing, setWriting] = useState(false);
  const [draftStars, setDraftStars] = useState(5);
  const [draftText, setDraftText] = useState("");
  const [replyFor, setReplyFor] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const avg = (reviews.reduce((n, r) => n + r.stars, 0) / reviews.length).toFixed(1);
  const addOrGo = () => { if (added || inCart) { onCart(); return; } onAdd(1); setAdded(true); };
  const tags = [product.category === "Vintage" ? "Condition: Used - Good" : "Condition: New", "Pickup Only"];
  return (
    <>
    <main className="screen-content pd-view">
      <div className="pd-photo">
        <img alt={product.title} src={product.image} style={{ objectPosition: crops[shot].pos, transform: `scale(${crops[shot].scale})`, transformOrigin: crops[shot].pos }} />
        {product.label && <span className="pd-label">{product.label}</span>}
      </div>
      <div aria-label="Photos" className="pd-thumbs" role="group">
        {crops.map((c, i) => (
          <button aria-label={`Photo ${i + 1}`} aria-pressed={shot === i} className={shot === i ? "on" : ""} key={i} onClick={() => setShot(i)} type="button"><img alt="" src={product.image} style={{ objectPosition: c.pos, transform: `scale(${c.scale})`, transformOrigin: c.pos }} /></button>
        ))}
      </div>
      <div className="pd-body">
        <div className="pd-titlerow">
          <h2>{product.title}</h2>
          <button aria-label={faved ? "Remove from wishlist" : "Save to wishlist"} aria-pressed={faved} className={`pd-heart ${faved ? "on" : ""}`} onClick={onFav} type="button"><HeartIcon filled={faved} /></button>
        </div>
        <b className="pd-price">{rupees(product.price)}</b>
        <article aria-label="Shop" className="pd-shop" onClick={onOpenShop} onKeyDown={(e) => { if (e.key === "Enter" && e.target === e.currentTarget) onOpenShop(); }} role="link" tabIndex={0}>
          <header>
            <span className="nx-av">{shop.avatar ? <img alt="" src={shop.avatar} /> : shop.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
            <div><strong>{shop.name}</strong><small>{shop.studio}</small></div>
            <b className="pd-verified">VERIFIED</b>
            <button aria-label={`Message ${shop.name}`} className="pd-msg" onClick={(e) => { e.stopPropagation(); onMessage(); }} type="button"><ChatIcon size={26} /></button>
          </header>
          <div className="pd-shopstats">
            <div><strong>{shop.rating}</strong><span>Rating</span></div>
            <div><strong>{shop.sold}</strong><span>Sold</span></div>
            <div><strong>{shop.replies}</strong><span>Replies</span></div>
          </div>
        </article>
        <section className="pd-details">
          <h3>DETAILS</h3>
          <p>{aboutItem(product)}</p>
          <div className="pd-tags">{tags.map((t) => <i key={t}>{t}</i>)}</div>
        </section>
        <section className="pd-reviews">
          <h3>Reviews</h3>
          <div className="pd-rating"><b>{avg}</b><span aria-label={`${avg} out of 5 stars`}>{"★".repeat(Math.round(Number(avg)))}</span><small>{reviews.length + 20} reviews from students</small></div>
          {!sellerMode && !writing && <button className="nx-btn order-action pd-write" onClick={() => setWriting(true)} type="button">Write a review</button>}
          {!sellerMode && writing && (
            <div className="pd-form">
              <div aria-label="Your rating" className="pd-stars" role="radiogroup">{[1, 2, 3, 4, 5].map((n) => <button aria-checked={draftStars === n} aria-label={`${n} star${n > 1 ? "s" : ""}`} className={n <= draftStars ? "on" : ""} key={n} onClick={() => setDraftStars(n)} role="radio" type="button">★</button>)}</div>
              <textarea aria-label="Your review" onChange={(e) => setDraftText(e.target.value)} placeholder="How was it? Tell other students." value={draftText} />
              <div className="nx-two"><button className="nx-btn line" onClick={() => { setWriting(false); setDraftText(""); }} type="button">Cancel</button><button className="nx-btn order-action" disabled={!draftText.trim()} onClick={() => { setReviews([{ name: "You", stars: draftStars, when: "Just now", text: draftText.trim(), likes: 0, liked: false }, ...reviews]); setWriting(false); setDraftText(""); setDraftStars(5); }} type="button">Post review</button></div>
            </div>
          )}
          {reviews.map((r, i) => (
            <article key={r.name + i}>
              <header><strong>{r.name}</strong><span aria-label={`${r.stars} out of 5 stars`}>{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</span><time>{r.when}</time></header>
              <p>{r.text}</p>
              {r.reply && <div className="pd-reply"><b>Seller reply</b><p>{r.reply}</p></div>}
              <footer>
                <button aria-pressed={r.liked} className={`pd-like ${r.liked ? "on" : ""}`} disabled={sellerMode} onClick={() => setReviews(reviews.map((x, j) => (j === i ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x)))} type="button"><HeartIcon filled={r.liked} size={16} />{r.liked ? "Liked" : "Like"} · {r.likes}</button>
                {sellerMode && !r.reply && replyFor !== i && <button className="pd-replybtn" onClick={() => { setReplyFor(i); setReplyText(""); }} type="button">Reply</button>}
              </footer>
              {sellerMode && replyFor === i && (
                <div className="pd-form">
                  <textarea aria-label="Your reply" onChange={(e) => setReplyText(e.target.value)} placeholder="Thank the buyer or answer their question." value={replyText} />
                  <div className="nx-two"><button className="nx-btn line" onClick={() => setReplyFor(null)} type="button">Cancel</button><button className="nx-btn order-action" disabled={!replyText.trim()} onClick={() => { setReviews(reviews.map((x, j) => (j === i ? { ...x, reply: replyText.trim() } : x))); setReplyFor(null); }} type="button">Send reply</button></div>
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
    <div className="pd-bar">
      <button className="pd-buy" onClick={() => onBuy(1)} type="button"><BagIcon size={20} />Buy Now</button>
      <button className="pd-add" onClick={addOrGo} type="button"><CartIcon size={20} />{added || inCart ? "View Cart" : "Add to Cart"}</button>
    </div>
    </>
  );
}

function SeeAllView({ onOpen }: { onOpen: (p: Product) => void }) {
  const cats = ["All", ...Array.from(new Set(catalog.map((p) => p.category as string)))];
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? catalog : catalog.filter((p) => p.category === cat);
  return (
    <main className="screen-content search-view sa-view">
      <div className="view-title">All Products</div>
      <ScrollRow className="filter-row" label="Filter by category">
        {cats.map((c) => <button className={cat === c ? "selected" : ""} key={c} onClick={() => setCat(c)} type="button">{c}</button>)}
      </ScrollRow>
      <div className="result-label">{shown.length} items on campus</div>
      <div className="market-grid">
        {shown.map((p) => (
          <article className="market-card" key={p.id} onClick={() => onOpen(p)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(p); } }} role="button" tabIndex={0}>
            <img alt={p.title} src={p.image} />
            <span>{p.title}</span>
            <strong>{rupees(p.price)}</strong>
          </article>
        ))}
      </div>
    </main>
  );
}

function CartView({ lines, onToggle, onQty, onCheckout }: { lines: Line[]; onToggle: (id: number) => void; onQty: (id: number, d: number) => void; onCheckout: () => void }) {
  const picked = lines.filter((l) => l.selected);
  const total = lineTotal(picked);
  return (
    <main className="screen-content cart-view detailed-cart">
      <div className="view-title">Your Cart</div>
      <div className="cart-items">
        {lines.length === 0 && <p className="cart-empty">Your cart is empty. Pick something from the feed.</p>}
        {lines.map((l) => (
          <article className="cart-list-item" key={l.product.id}>
            <button aria-label={`${l.selected ? "Unselect" : "Select"} ${l.product.title}`} aria-pressed={l.selected} className={`cart-check ${l.selected ? "checked" : ""}`} onClick={() => onToggle(l.product.id)} type="button" />
            <img alt={l.product.title} src={l.product.image} />
            <div>
              <strong>{l.product.title}</strong>
              <small>{l.product.seller ?? "NearU campus seller"}</small>
              <b>{rupees(l.product.price)}</b>
              <span className="quantity">
                <button aria-label={`Add one ${l.product.title}`} onClick={() => onQty(l.product.id, 1)} type="button">⊕</button> {l.qty} <button aria-label={`Remove one ${l.product.title}`} onClick={() => onQty(l.product.id, -1)} type="button">⊖</button>
              </span>
            </div>
          </article>
        ))}
      </div>
      <div className="cart-paybar">
        <span>Total Payable amount<b>{rupees(total)}</b></span>
        <button className="payment-action" disabled={picked.length === 0} onClick={onCheckout} type="button">
          <span>▣</span> Pay Now
        </button>
      </div>
    </main>
  );
}

type ProfileData = { name: string; major: string; studio: string; bio: string; email: string; phone: string; address: string };
const seedProfile: ProfileData = { name: "Kabir Mehta", major: "Interaction Design / Furniture", studio: "Kabir's Dorm Studio", bio: "I make the best matcha latte on campus...", email: "kabir.mehta@anu.edu.in", phone: "+91 98765 43210", address: "Room 214, Block C, Anant Hostel, Anant National University, Ahmedabad 382355" };

function ProfileView({
  onNavigate,
  sellerMode,
  onModeChange,
  profile,
  sellerAccount,
  onBecomeSeller,
}: {
  onNavigate: (tab: Tab) => void;
  sellerMode: boolean;
  onModeChange: () => void;
  profile: ProfileData;
  sellerAccount: boolean;
  onBecomeSeller: () => void;
}) {
  const profileActions: Array<[ReactNode, string, Tab | null]> = sellerMode
    ? [
        [<OrdersIcon />, "My Orders", "Orders" as Tab],
        [<HistoryIcon />, "Order History", "OrderHistory" as Tab],
        [<PayoutIcon />, "Payout", "Payouts" as Tab],
        [<ChatIcon />, "Messages", "Messages" as Tab],
      ]
    : [
        [<OrdersIcon />, "My Orders", "MyOrders" as Tab],
        [<HistoryIcon />, "Order History", "OrderHistory" as Tab],
        [<AddressIcon />, "Address", "Addresses" as Tab],
        [<BankIcon />, "Bank Payments", "BankPayments" as Tab],
        [<ChatIcon />, "Messages", "Messages" as Tab],
      ];

  return (
    <main className="screen-content profile-view figma-profile">
      {!sellerAccount && (
        <button className="become-seller order-action" onClick={onBecomeSeller} type="button">
          <StoreIcon size={26} />
          <span><strong>Become a seller</strong><small>Sell your own things on campus</small></span>
          <b aria-hidden="true">→</b>
        </button>
      )}
      <article aria-label="NearU student ID" className="id-card">
        <span aria-hidden="true" className="id-stripes tl" />
        <span aria-hidden="true" className="id-stripes tr" />
        <span className="id-chip">ANANT NATIONAL UNIVERSITY</span>
        <div className="id-photo"><img alt={profile.name} src="./assets/dc6b1.png" /><i aria-hidden="true">NEAR U</i></div>
        <span className={`id-tag ${sellerMode ? "seller" : "buyer"}`}>{sellerMode ? "Hustler!" : "Best buyer"}</span>
        <div className="id-body">
          <img alt="NearU" className="id-logo" src="./assets/33894.svg" />
          <p className="id-title">STUDENT IDENTIFICATION</p>
          <span aria-hidden="true" className="id-rule" />
          <small>NAME</small>
          <div className="id-name">{profile.name}</div>
          <small>OCCUPANCY</small>
          <div className="id-line">{profile.major}</div>
          <small>DATE OF ISSUE</small>
          <div className="id-line">10/10/2026</div>
        </div>
        <span aria-hidden="true" className="id-bars" />
        <span aria-hidden="true" className="id-seal"><VerifiedSeal size={44} /></span>
        <span className="id-no">NU-101026</span>
      </article>
      <div className="id-actions">
        <button className="pf-pill pf-edit" onClick={() => onNavigate("EditProfile")} type="button"><PenIcon size={14} />Edit</button>
        <b className="pf-pill pf-verified"><CheckIcon size={14} />VERIFIED</b>
      </div>
      <section aria-label="Your numbers" className="pf-stats">
        <div><strong>27</strong><span>Orders</span></div>
        <div><strong>12</strong><span>Followers</span></div>
        <div><strong>3</strong><span>Following</span></div>
      </section>
      <section aria-label="Contact details" className="pf-contact">
        <h3>Contact details</h3>
        <div><MailIcon size={22} /><span><small>EMAIL</small>{profile.email}</span></div>
        <div><PhoneIcon size={22} /><span><small>PHONE</small>{profile.phone}</span></div>
        <div><AddressIcon size={22} /><span><small>ADDRESS</small>{profile.address}</span></div>
        <button className="nx-link" onClick={() => onNavigate("Addresses")} type="button">Manage delivery addresses →</button>
      </section>
      {sellerAccount && <button
        aria-label={`Switch to ${sellerMode ? "buyer" : "seller"} mode`}
        aria-pressed={sellerMode}
        className={`profile-mode-toggle ${sellerMode ? "seller-active" : "buyer-active"}`}
        onClick={onModeChange}
        type="button"
      >
        <span className="profile-toggle-slider" />
        <span className="buyer-label">
          <BagIcon size={20} />
          Buyer Mode
        </span>
        <span className="seller-label">
          <StoreIcon size={20} />
          Seller Mode
        </span>
      </button>}
      <div className="profile-action-list">
        {profileActions.map(([icon, label, tab]) => (
          <button key={label} onClick={() => tab && onNavigate(tab)} type="button">
            <span className="profile-action-icon">{icon}</span>
            <span>{label}</span>
            <img alt="" className="profile-action-arrow" src="./assets/2254b.svg" />
          </button>
        ))}
      </div>
      <section className="profile-help-card">
        <div className="profile-help-title">Help</div>
        {[
          [<ReturnIcon />, "Return Policy"],
          [<SupportIcon />, "Customer Service"],
          [<GearIcon />, "App Preferences"],
        ].map(([icon, label]) => (
          <button key={label as string} onClick={() => label === "App Preferences" && onNavigate("AppPrefs")} type="button">
            <span className="profile-action-icon">{icon}</span>
            <span>{label}</span>
            <img alt="" className="profile-action-arrow" src="./assets/2254b.svg" />
          </button>
        ))}
      </section>
      <button className="profile-logout" onClick={() => onNavigate("Onboarding")} type="button">
        Log out
      </button>
    </main>
  );
}

function AppPrefsView({ dark, onDark }: { dark: boolean; onDark: () => void }) {
  const [on, setOn] = useState<Record<string, boolean>>({ orders: true, messages: true, offers: false, reminders: true });
  const rows: [string, string, string][] = [
    ["orders", "Order updates", "Shipped, delivered and payment alerts."],
    ["messages", "Messages", "When a buyer or seller writes to you."],
    ["offers", "Offers and price drops", "Items from your wishlist and favourite shops."],
    ["reminders", "Pick-up reminders", "A nudge before a campus hand-over."],
  ];
  return (
    <main className="screen-content nx-view">
      <p className="nx-label">APPEARANCE</p>
      <div className="nx-pref">
        <div><strong>Dark mode</strong><small>{dark ? "On: easier on the eyes at night." : "Off: the light NearU look."}</small></div>
        <button aria-checked={dark} aria-label="Dark mode" className={`mini-toggle ${dark ? "active" : ""}`} onClick={onDark} role="switch" type="button"><i /></button>
      </div>
      <p className="nx-label">NOTIFICATIONS</p>
      <div className="nx-list">
        {rows.map(([k, t, s]) => (
          <div className="nx-pref" key={k}>
            <div><strong>{t}</strong><small>{s}</small></div>
            <button aria-checked={on[k]} aria-label={t} className={`mini-toggle ${on[k] ? "active" : ""}`} onClick={() => setOn({ ...on, [k]: !on[k] })} role="switch" type="button"><i /></button>
          </div>
        ))}
      </div>
    </main>
  );
}

function EditProfileView({ profile, onSave }: { profile: ProfileData; onSave: (p: ProfileData) => void }) {
  const [draft, setDraft] = useState(profile);
  const set = (k: keyof ProfileData, v: string) => setDraft({ ...draft, [k]: v });
  return (
    <main className="screen-content ss-view nx-form ep-view">
      <h2 className="ss-title">Edit Profile</h2>
      <div className="ep-photo"><img alt={draft.name} src="./assets/dc6b1.png" /><span aria-hidden="true"><PenIcon size={16} /></span></div>
      <div className="ss-form">
        <label><span>FULL NAME</span><input onChange={(e) => set("name", e.target.value)} value={draft.name} /></label>
        <label><span>MAJOR / SPECIALTY</span><input onChange={(e) => set("major", e.target.value)} value={draft.major} /></label>
        <label><span>STORE NAME</span><input onChange={(e) => set("studio", e.target.value)} value={draft.studio} /></label>
        <label><span>EMAIL</span><input inputMode="email" onChange={(e) => set("email", e.target.value)} type="email" value={draft.email} /></label>
        <label><span>PHONE</span><input inputMode="tel" onChange={(e) => set("phone", e.target.value)} value={draft.phone} /></label>
        <label><span>ADDRESS</span><textarea className="short" onChange={(e) => set("address", e.target.value)} value={draft.address} /></label>
        <label><span>FUN FACT</span><textarea onChange={(e) => set("bio", e.target.value)} value={draft.bio} /></label>
      </div>
      <button className="nx-btn order-action wide" disabled={!draft.name.trim()} onClick={() => onSave({ ...draft, name: draft.name.trim() })} type="button">Save profile</button>
    </main>
  );
}

function WishlistView({ items, onRemove, onAddToCart }: { items: Product[]; onRemove: (id: number) => void; onAddToCart: (picked: Product[]) => void }) {
  const wishlist = items.map((p) => ({ id: p.id, title: p.title, seller: p.seller ?? "NearU campus seller", price: p.price, image: p.image }));
  const [selected, setSelected] = useState<Set<number>>(new Set(items.slice(0, 1).map((p) => p.id)));
  const total = wishlist.filter((item) => selected.has(item.id)).reduce((sum, item) => sum + item.price, 0);

  const toggleItem = (id: number) => {
    setSelected((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <>
    <main className="screen-content wishlist-view exact-wishlist">
      <div className="view-title">My Wishlist</div>
      <div className="wishlist-total">
        <span>Total Payable amount</span>
        <strong>₹{total.toLocaleString("en-IN")}</strong>
      </div>
      <div className="wishlist-list">
        {wishlist.map((item) => (
          <article key={item.title}>
            <button
              aria-label={`${selected.has(item.id) ? "Unselect" : "Select"} ${item.title}`}
              className={`wishlist-checkbox ${selected.has(item.id) ? "selected" : ""}`}
              onClick={() => toggleItem(item.id)}
              type="button"
            >
              {selected.has(item.id) ? "✓" : ""}
            </button>
            <img alt={item.title} src={item.image} />
            <div><strong>{item.title}</strong><small>{item.seller}</small><b>₹{item.price.toLocaleString("en-IN")}</b></div>
            <button aria-label={`Remove ${item.title} from wishlist`} className="wl-heart" onClick={() => onRemove(item.id)} type="button"><HeartIcon filled size={26} /></button>
          </article>
        ))}
        {wishlist.length === 0 && <p className="nx-empty">Nothing saved yet. Tap the heart on a product to keep it here.</p>}
      </div>
    </main>
    <div className="wl-bar">
      <button
        className="wishlist-checkout order-action"
        disabled={selected.size === 0}
        onClick={() => onAddToCart(items.filter((p) => selected.has(p.id)))}
        type="button"
      >
        Add selected to Cart
      </button>
    </div>
    </>
  );
}

function ConfirmedView({ onDone, onOrders }: { onDone: () => void; onOrders: () => void }) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          window.setTimeout(onDone, 0);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [onDone]);

  return (
    <main className="confirmed-view">
      <div>PAYMENT<br />CONFIRMED!</div>
      <span aria-label="Payment confirmed" className="seal-wrap" role="img"><VerifiedSeal size={150} /></span>
      <p>(Returning to Explore in {countdown} seconds)</p>
      <button className="order-action" onClick={onOrders} type="button">View My Orders</button>
      <button onClick={onDone} type="button">Back to Explore</button>
    </main>
  );
}


// ---------------------------------------------------------------------------------------------------------------------------
// Checkout, Analytics and Storefront setup — built from Figma 213:4116, 213:4961 and 213:4615 (fonts: brand only; currency: rupees, Figma $ x 80).
// ---------------------------------------------------------------------------------------------------------------------------
const SALES_FACTOR = 80; // Figma dollars -> rupees
const rupees = (n: number) => "₹" + n.toLocaleString("en-IN");

function CheckoutView({ lines, onPay }: { lines: Line[]; onPay: () => void }) {
  const subtotal = lineTotal(lines);
  const tax = Math.round(subtotal * 0.05);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const [method, setMethod] = useState<"upi" | "card" | "cod">("upi");
  const [app, setApp] = useState("");
  return (
    <main className="screen-content co-view">
      <div className="co-head"><h2>Order Summary</h2><span className="co-chip"><b>{count}</b> {count === 1 ? "ITEM" : "ITEMS"}</span></div>
      <div className="co-main">
        {lines.map((l) => (
          <article className="co-item" key={l.product.id}>
            <span className="co-check" />
            <img alt={l.product.title} src={l.product.image} />
            <div className="co-item-text">
              <strong>{l.product.title}</strong>
              <small>{(l.product.seller ?? "NearU campus seller").replace(" · ", " • ")}</small>
              <div><b>{rupees(l.product.price * l.qty)}</b><span>Qty: <i>{l.qty}</i></span></div>
            </div>
          </article>
        ))}

        <section className="co-card">
          <div className="co-title"><img alt="" src="./assets/f87b0.svg" /><h3>Delivery Point</h3></div>
          <label className="co-field">
            <span>SELECT PICK-UP</span>
            <div className="co-select"><select defaultValue="SH1"><option>SH1</option><option>SH2</option></select><img alt="" src="./assets/59819.svg" /></div>
          </label>
          <label className="co-field">
            <span>ROOM / FLAT NO.</span>
            <input className="co-input" placeholder="e.g. A 210" />
          </label>
          <div className="co-note"><img alt="" src="./assets/f61b5.svg" /><p>Orders are delivered to the main<br />reception desk of your selected<br />hall.</p></div>
        </section>

        <section className="co-card co-pay" aria-label="Payment method">
          <h3 className="co-pay-title">Payment Method</h3>
          <div className={`co-opt co-upi ${method === "upi" ? "selected" : ""}`}>
            <button aria-pressed={method === "upi"} className="co-opt-head" onClick={() => setMethod("upi")} type="button">
              <span><img alt="" src="./assets/cf373.svg" />Pay via UPI</span><em>FASTEST</em>
            </button>
            {method === "upi" && (
              <div className="co-apps">
                <button aria-pressed={app === "GPay"} className={app === "GPay" ? "on" : ""} onClick={() => setApp("GPay")} type="button"><img alt="" src="./assets/e0e8f.svg" />GPay</button>
                <button aria-pressed={app === "PhonePe"} className={app === "PhonePe" ? "on" : ""} onClick={() => setApp("PhonePe")} type="button"><img alt="" src="./assets/270c6.svg" />PhonePe</button>
              </div>
            )}
          </div>
          {([["card", "./assets/46283.svg", "Credit / Debit Card"], ["cod", "./assets/627fa.svg", "Cash on Delivery"]] as const).map(([id, icon, label]) => (
            <button aria-pressed={method === id} className={`co-opt co-row ${method === id ? "selected" : ""}`} key={id} onClick={() => setMethod(id)} type="button">
              <span><img alt="" src={icon} />{label}</span><img alt="" className="co-chev" src="./assets/24434.svg" />
            </button>
          ))}
        </section>

        <section className="co-card co-total">
          <div className="co-rows">
            <div><span>Subtotal</span><strong>{rupees(subtotal)}</strong></div>
            <div><span>Campus Delivery</span><strong className="free">FREE</strong></div>
            <div><span>Tax</span><strong>{rupees(tax)}</strong></div>
            <div className="total"><span>Total</span><strong>{rupees(subtotal + tax)}</strong></div>
          </div>
          <button className="payment-action co-paynow" onClick={onPay} type="button"><img alt="" src="./assets/c66ac.svg" />Pay Now</button>
          <p className="co-trust">TRUSTED BY <b>2,000</b>+ STUDENTS AT UNIVERSITY TECH</p>
          <p className="co-verified"><img alt="" src="./assets/4a944.svg" />COMMUNITY VERIFIED</p>
        </section>
      </div>
    </main>
  );
}

type Period = "7" | "30" | "90";
const periods: Record<Period, {
  label: string; days: string; revenue: number; orders: number; revDelta: string; ordDelta: string; conv: string; aov: number; back: string; views: string;
  bars: { label: string; revenue: number; orders: number }[]; trend: string; best: string; vs: string;
}> = {
  "7": {
    label: "Last 7 Days", days: "7", revenue: 64800, orders: 24, revDelta: "+9%", ordDelta: "+5%", conv: "7.9%", aov: 2700, back: "38%", views: "310",
    bars: [["Mon", 7200, 2], ["Tue", 9100, 3], ["Wed", 8400, 3], ["Thu", 10800, 4], ["Fri", 12600, 5], ["Sat", 9900, 4], ["Sun", 6800, 3]].map(([label, revenue, orders]) => ({ label: label as string, revenue: revenue as number, orders: orders as number })),
    trend: "Friday was your best day", best: "Fri", vs: "previous 7 days",
  },
  "30": {
    label: "Last 30 Days", days: "30", revenue: 262560, orders: 101, revDelta: "+12%", ordDelta: "+8%", conv: "8.4%", aov: 2600, back: "42%", views: "1.2k",
    bars: weeksData(), trend: "Sales went up every week", best: "May 22–30", vs: "previous 30 days",
  },
  "90": {
    label: "Last 90 Days", days: "90", revenue: 712400, orders: 287, revDelta: "+18%", ordDelta: "+14%", conv: "8.1%", aov: 2480, back: "40%", views: "3.4k",
    bars: [{ label: "Mar", revenue: 201640, orders: 86 }, { label: "Apr", revenue: 248200, orders: 100 }, { label: "May", revenue: 262560, orders: 101 }],
    trend: "Sales went up every month", best: "May", vs: "previous 90 days",
  },
};
function weeksData() {
  return [
    { label: "May 1–7", revenue: 690 * SALES_FACTOR, orders: 21 },
    { label: "May 8–14", revenue: 780 * SALES_FACTOR, orders: 24 },
    { label: "May 15–21", revenue: 835 * SALES_FACTOR, orders: 26 },
    { label: "May 22–30", revenue: 977 * SALES_FACTOR, orders: 30 },
  ];
}
// A round top value for the chart axis (4 steps).
const niceMax = (v: number) => { const step = Math.pow(10, Math.floor(Math.log10(v / 4))); const n = Math.ceil(v / 4 / step); const s = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10; return s * step * 4; };
const compactRupees = (n: number) => "₹" + (n >= 100000 ? (n / 100000).toFixed(n % 100000 ? 1 : 0) + "L" : n >= 1000 ? (n / 1000).toFixed(n % 1000 ? 1 : 0) + "k" : n);

function AnalyticsView() {
  const [metric, setMetric] = useState<"revenue" | "orders">("revenue");
  const [period, setPeriod] = useState<Period>("30");
  const [exported, setExported] = useState(false);
  const p = periods[period];
  const values = p.bars.map((b) => (metric === "revenue" ? b.revenue : b.orders));
  const max = niceMax(Math.max(...values));
  const ticks = [0, 1, 2, 3, 4].map((i) => (max / 4) * i);
  const fmt = (n: number) => (metric === "revenue" ? compactRupees(n) : String(n));
  const bestIndex = values.indexOf(Math.max(...values));
  const slot = 274 / p.bars.length, barW = Math.min(36, slot * 0.52);
  const doExport = () => { setExported(true); window.setTimeout(() => setExported(false), 2000); };
  return (
    <main className="screen-content an-view">
      <div className="an-top">
        <h2>Analytics</h2>
      </div>
      <div className="an-chips">
        <span className="an-chip"><img alt="" src="./assets/03c60.svg" />Ceramic Studio</span>
        <span className="an-chip"><img alt="" src="./assets/0a5ee.svg" />Verified</span>
      </div>
      <div className="an-controls">
        <label className="an-select"><select aria-label="Period" onChange={(e) => setPeriod(e.target.value as Period)} value={period}>{(Object.keys(periods) as Period[]).map((k) => <option key={k} value={k}>{periods[k].label}</option>)}</select><img alt="" src="./assets/e9fc8.svg" /></label>
        <button className="an-export" onClick={doExport} type="button"><img alt="" src="./assets/b8916.svg" />{exported ? "Exported ✓" : "Export"}</button>
      </div>
      <section className="an-card an-summary">
        <p className="an-kicker">YOUR SHOP IN THE LAST {p.days} DAYS</p>
        <div className="an-two">
          <div><p className="an-label">Revenue</p><p className="an-big">{rupees(p.revenue)}</p><span className="an-delta">{p.revDelta}</span><p className="an-vs">vs {p.vs}</p></div>
          <div><p className="an-label">Orders</p><p className="an-big">{p.orders}</p><span className="an-delta">{p.ordDelta}</span><p className="an-vs">vs {p.vs}</p></div>
        </div>
        <hr />
        <p className="an-sentence">You earned {rupees(p.revenue)} from {p.orders} orders. Both went up compared with the {p.days} days before.</p>
      </section>
      <div className="an-grid">
        <article><span>Conversion Rate</span><strong>{p.conv}</strong><small>Visitors who bought something</small></article>
        <article><span>Avg Order Value</span><strong>{rupees(p.aov)}</strong><small>Average spent per order</small></article>
        <article><span>Return Customers</span><strong>{p.back}</strong><small>Buyers who came back</small></article>
        <article><span>Page Views</span><strong>{p.views}</strong><small>Times your shop was opened</small></article>
      </div>
      <section className="an-card an-sales">
        <h3>{period === "7" ? "Sales by day" : period === "90" ? "Sales by month" : "Sales by week"}</h3>
        <div className="an-tabs" role="tablist">
          <button aria-selected={metric === "revenue"} className={metric === "revenue" ? "on" : ""} onClick={() => setMetric("revenue")} role="tab" type="button">Revenue</button>
          <button aria-selected={metric === "orders"} className={metric === "orders" ? "on" : ""} onClick={() => setMetric("orders")} role="tab" type="button">Orders</button>
        </div>
        <div className="an-plot" role="img" aria-label={`${metric} chart for the last ${p.days} days`}>
          {ticks.map((t, i) => (
            <div className={`an-grid-line ${i === 0 ? "base" : ""}`} key={i} style={{ top: 180 - (t / max) * 160 }}><span>{fmt(t)}</span></div>
          ))}
          {p.bars.map((b, i) => {
            const v = values[i];
            const h = (v / max) * 160;
            return (
              <div className="an-bar-col" key={b.label} style={{ left: 48 + i * slot + (slot - barW) / 2, width: barW }}>
                <b className={i === bestIndex ? "best" : ""} style={{ top: 180 - h - 20 }}>{fmt(v)}</b>
                <i style={{ height: h, top: 180 - h, width: barW }} />
              </div>
            );
          })}
        </div>
        <div className="an-xlabels">{p.bars.map((b) => <span key={b.label} style={{ width: slot }}>{b.label}</span>)}</div>
        <p className="an-sentence">{p.trend}. Your best {period === "7" ? "day was" : period === "90" ? "month was" : "week was"} {p.bars[bestIndex].label} with {metric === "revenue" ? rupees(p.bars[bestIndex].revenue) : p.bars[bestIndex].orders + " orders"}.</p>
      </section>
      <section className="an-best">
        <h3>Bestsellers</h3>
        {([["./assets/b6a46.png", "Studio Mug", 24, 599], ["./assets/5dc5e.png", "Handcrafted Journal", 18, 449]] as const).map(([img, name, sold, price]) => (
          <article key={name}>
            <span className="an-thumb"><img alt="" src={img} /></span>
            <div><strong>{name}</strong><small>{Math.max(1, Math.round(sold * (period === "7" ? 0.3 : period === "90" ? 2.8 : 1)))} Sold • {period === "30" ? "May 1-30" : period === "7" ? "Last 7 days" : "Mar-May"}</small></div>
            <b>{rupees(price)}</b>
          </article>
        ))}
      </section>
    </main>
  );
}

const setupProducts = [
  { image: "./assets/9d186.png", tag: "VINTAGE", title: "Olympus Stylus", price: 749 },
  { image: "./assets/d495f.png", tag: "CERAMICS", title: "Speckled Clay Mug", price: 599 },
];
const tagSuggestions = ["HANDMADE", "ART", "VINTAGE", "CERAMICS", "TEXTBOOKS", "TECH", "DESIGN", "PRINTS", "DORM DECOR", "TUTORING", "SERVICES", "ACCESSORIES"];

const collabPeople = [
  { name: "Shroom Doodle", avatar: "./assets/shroom-avatar.svg", sells: "Accessories and jewellery", tags: ["Jewellery", "Charms"] },
  { name: "Maya Chen", avatar: "./assets/166ae.png", sells: "Knitwear and cosy things", tags: ["Beanies", "Scarves"] },
  { name: "Studio Terra", sells: "Ceramics and clay", tags: ["Mugs", "Planters"] },
  { name: "Campus Scents", sells: "Candles and fragrance", tags: ["Soy candles", "Gifting"] },
  { name: "Aanya Shah", sells: "Risograph zines and prints", tags: ["Zines", "Posters"] },
  { name: "Rhea Patel", sells: "Custom portraits", tags: ["Portraits", "Illustration"] },
];
function CollabView({ onMessage, threads, onOpen, open, onToggle }: { onMessage: (p: { name: string; avatar?: string; sells: string }) => void; threads: Thread[]; onOpen: (id: number) => void; open: boolean; onToggle: () => void }) {
  const mine = threads.filter((t) => t.about === "Collaboration");
  return (
    <main className="screen-content nx-view collab-view">
      <section aria-label="My collabs" className="my-collabs">
        <header>
          <h3>My collabs</h3>
          <button aria-pressed={open} className={`collab-status ${open ? "open" : "closed"}`} onClick={onToggle} type="button"><b aria-hidden="true" />{open ? "Open to collab" : "Closed to collab"}</button>
        </header>
        {mine.length === 0 ? <p>No collabs yet. Message a shop below to start one.</p> : mine.map((t) => (
          <button className="my-collab-row" key={t.id} onClick={() => onOpen(t.id)} type="button">
            <span className="nx-av">{t.avatar ? <img alt="" src={t.avatar} /> : t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
            <span><strong>{t.name}</strong><small>Chat started · {t.msgs.length} message{t.msgs.length === 1 ? "" : "s"}</small></span>
            <i aria-hidden="true">›</i>
          </button>
        ))}
        <small className="my-collabs-note">{open ? "Other shops can see you are open and message you." : "You are hidden from the list until you open again."}</small>
      </section>
      <p className="nx-sub">Student shops that are open to teaming up. Say hello to start a collab.</p>
      <div className="nx-list">
        {collabPeople.map((p) => (
          <article className="collab-card" key={p.name}>
            <span className="nx-av">{p.avatar ? <img alt="" src={p.avatar} /> : p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
            <div>
              <strong>{p.name}</strong>
              <small>{p.sells}</small>
              <span className="collab-tags">{p.tags.map((t) => <i key={t}>{t}</i>)}</span>
              <em><b aria-hidden="true" />Open to collab</em>
            </div>
            <button aria-label={`Send a message to ${p.name}`} className="collab-msg order-action" onClick={() => onMessage(p)} type="button"><ChatIcon size={20} /><span>Message</span></button>
          </article>
        ))}
      </div>
    </main>
  );
}

function SellerOnboardView({ onDone, onExit }: { onDone: (cats: string[]) => void; onExit: () => void }) {
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [often, setOften] = useState("");
  const [spots, setSpots] = useState<string[]>(["Library Gate"]);
  const [upi, setUpi] = useState("kabir@okaxis");
  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const kinds: [string, string][] = [["Student maker", "I make things myself: art, ceramics, prints, crafts."], ["Reseller", "I sell pre-loved or sourced things: books, gadgets, clothes."], ["Service provider", "I offer a skill: tutoring, design, photos, coding."]];
  const catList = ["Handmade", "Textbooks", "Tech", "Dorm Decor", "Vintage", "Accessories", "Tutoring", "Design services"];
  const freq = ["Now and then, around fests", "Every week", "It is my main hustle"];
  const places = ["Library Gate", "Canteen", "Hostel lobby", "Studio block"];
  const ready = [kind !== "", cats.length > 0, often !== "" && spots.length > 0, upi.includes("@")][step];
  const titles = ["What kind of seller are you?", "What will you sell?", "How and where do you sell?", "Where should your money go?"];
  return (
    <main className="account-flow so-view">
      <FlowBackdrop />
      <button aria-label={step === 0 ? "Cancel and go back" : "Previous step"} className="so-back" onClick={() => (step === 0 ? onExit() : setStep(step - 1))} type="button"><ArrowLeftIcon size={26} /></button>
      <div aria-label={`Step ${step + 1} of 4`} className="so-dots" role="img">{[0, 1, 2, 3].map((i) => <i className={i <= step ? "on" : ""} key={i} />)}</div>
      <div aria-hidden="true" className="so-hero"><img alt="" src="./assets/33894.svg" /><span>For U, NearU</span></div>
      <div className="so-kicker">BECOME A SELLER</div>
      <h1 className="so-title">{titles[step]}</h1>
      {step === 0 && <div className="so-list">{kinds.map(([k, d]) => <button aria-pressed={kind === k} className={`so-opt ${kind === k ? "on" : ""}`} key={k} onClick={() => setKind(k)} type="button"><strong>{k}</strong><small>{d}</small></button>)}</div>}
      {step === 1 && <><p className="so-sub">Pick everything that fits. You can change this later.</p><div className="so-chips">{catList.map((c) => <button aria-pressed={cats.includes(c)} className={cats.includes(c) ? "on" : ""} key={c} onClick={() => toggle(cats, setCats, c)} type="button">{c}</button>)}</div></>}
      {step === 2 && <>
        <p className="so-label">HOW OFTEN WILL YOU SELL?</p>
        <div className="so-list">{freq.map((k) => <button aria-pressed={often === k} className={`so-opt slim ${often === k ? "on" : ""}`} key={k} onClick={() => setOften(k)} type="button"><strong>{k}</strong></button>)}</div>
        <p className="so-label">WHERE DO YOU HAND OVER?</p>
        <div className="so-chips">{places.map((c) => <button aria-pressed={spots.includes(c)} className={spots.includes(c) ? "on" : ""} key={c} onClick={() => toggle(spots, setSpots, c)} type="button">{c}</button>)}</div>
      </>}
      {step === 3 && <>
        <label className="so-field"><span>UPI ID FOR PAYOUTS</span><input onChange={(e) => setUpi(e.target.value)} value={upi} /></label>
        <dl className="so-sum">
          <div><dt>Seller type</dt><dd>{kind}</dd></div>
          <div><dt>Selling</dt><dd>{cats.join(", ")}</dd></div>
          <div><dt>Frequency</dt><dd>{often}</dd></div>
          <div><dt>Hand-over</dt><dd>{spots.join(", ")}</dd></div>
        </dl>
        <p className="so-sub">Next you will set up your storefront: name, photos and bio.</p>
      </>}
      <button className="flow-primary so-next" disabled={!ready} onClick={() => (step < 3 ? setStep(step + 1) : onDone(cats.map((c) => c.toUpperCase())))} type="button">{step < 3 ? "CONTINUE" : "CREATE MY STOREFRONT"}</button>
    </main>
  );
}

function SellerSetupView({ onDone, onNavigate, initialTags }: { onDone: () => void; onNavigate: (tab: Tab) => void; initialTags?: string[] }) {
  const [tags, setTags] = useState(initialTags ?? ["HANDMADE", "ART"]);
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(false);
  const [cover, setCover] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [list, setList] = useState(false);
  const [out, setOut] = useState<Record<string, boolean>>({});
  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 1800); };
  const q = query.trim().toUpperCase();
  const matches = tagSuggestions.filter((t) => !tags.includes(t) && t.includes(q));
  const addTag = (raw: string) => {
    const t = raw.trim().toUpperCase();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setQuery(""); setAdding(false);
  };
  const outCount = Object.values(out).filter(Boolean).length;
  return (
    <>
    <main className="screen-content ss-view">
      <h2 className="ss-title">Setup Storefront</h2>
      <div className={`ss-cover ${cover ? "has-photo" : ""}`} onClick={() => setCover(!cover)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setCover(!cover); } }} role="button" tabIndex={0} aria-label={cover ? "Remove cover photo" : "Add cover photo"}>
        {cover ? <img alt="Cover photo" className="ss-cover-img" src="./assets/d495f.png" /> : <><img alt="" src="./assets/a0a11.svg" /><span>ADD COVER PHOTO</span></>}
        <div aria-label={avatar ? "Remove store photo" : "Add store photo"} className="ss-avatar" onClick={(e) => { e.stopPropagation(); setAvatar(!avatar); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); setAvatar(!avatar); } }} role="button" tabIndex={0}>
          {avatar ? <img alt="Store photo" className="ss-avatar-img" src="./assets/dc6b1.png" /> : <img alt="" src="./assets/cb5d7.svg" />}
        </div>
      </div>
      <div className="ss-form">
        <label><span>STORE NAME</span><input placeholder="e.g. Campus Crafts" /></label>
        <label><span>STORE BIO</span><textarea placeholder="Tell buyers what makes your products unique..." /></label>
        <div className="ss-tags-field">
          <span>TAGS</span>
          <div className="ss-tags">
            {tags.map((t) => (
              <span className="ss-tag" key={t}>{t}<button aria-label={`Remove ${t}`} onClick={() => setTags(tags.filter((x) => x !== t))} type="button"><img alt="" src="./assets/146d1.svg" /></button></span>
            ))}
            {adding
              ? <input aria-label="Search or type a tag" autoFocus className="ss-tag-input" onBlur={() => window.setTimeout(() => { setAdding(false); setQuery(""); }, 150)} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addTag(query); if (e.key === "Escape") { setAdding(false); setQuery(""); } }} placeholder="Search or type a tag" value={query} />
              : <button aria-label="Add tag" className="ss-add-tag" onClick={() => setAdding(true)} type="button"><img alt="" src="./assets/7c238.svg" /></button>}
          </div>
          {adding && (
            <ul aria-label="Tag suggestions" className="ss-suggest">
              {matches.slice(0, 5).map((t) => <li key={t}><button onMouseDown={(e) => e.preventDefault()} onClick={() => addTag(t)} type="button">{t}</button></li>)}
              {q && !tagSuggestions.includes(q) && !tags.includes(q) && <li><button onMouseDown={(e) => e.preventDefault()} onClick={() => addTag(q)} type="button">Add “{query.trim()}”</button></li>}
            </ul>
          )}
        </div>
      </div>
      <div className="ss-actions">
        <button className="ss-btn coral" onClick={() => onNavigate("AddListing")} type="button"><img alt="" src="./assets/b7f4c.svg" />Add Listing</button>
        <button className="ss-btn coral" onClick={save} type="button">{saved ? "Saved ✓" : "Save Changes"}</button>
        <button className="ss-btn blue" onClick={() => onNavigate("Analytics")} type="button"><img alt="" src="./assets/8eed9.svg" />Analytics</button>
        <button className="ss-btn line" onClick={() => onNavigate("Storefront")} type="button"><i />Live Preview</button>
      </div>
      <div className="ss-stats">
        <span className="ss-stat in"><i />{12 - outCount} in Stock</span>
        <span className="ss-stat out"><i />{4 + outCount} Out of stock</span>
        <button aria-label={list ? "Show as grid" : "Show as list"} aria-pressed={list} className="ss-view-toggle" onClick={() => setList(!list)} type="button"><img alt="" src="./assets/fd200.svg" /></button>
      </div>
      <div className={`ss-products ${list ? "list" : ""}`}>
        {setupProducts.map((p) => (
          <article className={out[p.title] ? "is-out" : ""} key={p.title}>
            <img alt={p.title} src={p.image} />
            <div><span className="ss-ptag">{out[p.title] ? "OUT OF STOCK" : p.tag}</span><strong>{p.title}</strong><p><b>{rupees(p.price)}</b><button aria-label={out[p.title] ? `Mark ${p.title} in stock` : `Mark ${p.title} out of stock`} onClick={() => setOut({ ...out, [p.title]: !out[p.title] })} type="button"><img alt="" src="./assets/b0a76.svg" /></button></p></div>
          </article>
        ))}
      </div>
    </main>
    <button className="ss-live" onClick={onDone} type="button"><img alt="" src="./assets/150a5.svg" />Live Store</button>
    </>
  );
}

const seedListings: Listing[] = [
  { image: "./assets/43074.png", title: "Risograph Mini Zine", price: 180, inStock: true, stock: 12, sold: 12 },
  { image: "./assets/9d186.png", title: "Campus Poster Pack", price: 250, inStock: true, stock: 8, sold: 8 },
  { image: "./assets/14334.png", title: "Custom Portrait Slot", price: 500, inStock: false, stock: 0, sold: 5 },
];
const completedListings: Listing[] = [
  { image: "./assets/1f777.png", title: "Campus Design Notes", price: 599, inStock: false, stock: 0, sold: 20 },
  { image: "./assets/91f1c.png", title: "Boho Dorm Macrame", price: 649, inStock: false, stock: 0, sold: 9 },
  { image: "./assets/2e7ab.png", title: "Hand-painted Denim", price: 799, inStock: false, stock: 0, sold: 6 },
];
const archivedListings: Listing[] = [
  { image: "./assets/e7eaa.png", title: "Ceramic Studio Mug", price: 599, inStock: false, stock: 0, sold: 14 },
  { image: "./assets/c80da.png", title: "Web Dev Tutoring", price: 699, inStock: false, stock: 0, sold: 4 },
  { image: "./assets/43074.png", title: "Rainy Day Soy", price: 299, inStock: false, stock: 0, sold: 17 },
  { image: "./assets/14334.png", title: "Dreamy Polaroids", price: 499, inStock: false, stock: 0, sold: 11 },
  { image: "./assets/9d186.png", title: "Olympus Stylus", price: 749, inStock: false, stock: 0, sold: 1 },
];
function ListingsView({ listings, onToggle, onAdd, onRestore }: { listings: Listing[]; onToggle: (i: number) => void; onAdd: () => void; onRestore: (l: Listing) => void }) {
  const [tab, setTab] = useState<"active" | "completed" | "archived">("active");
  const [archived, setArchived] = useState(archivedListings);
  return (
    <main className="screen-content seller-listings-view">
      <div className="storefront-title">Store Management</div>
      <div className="nx-utabs" role="tablist">
        <button aria-selected={tab === "active"} className={tab === "active" ? "on" : ""} onClick={() => setTab("active")} role="tab" type="button">Active ({listings.length})</button>
        <button aria-selected={tab === "completed"} className={tab === "completed" ? "on" : ""} onClick={() => setTab("completed")} role="tab" type="button">Completed ({completedListings.length})</button>
        <button aria-selected={tab === "archived"} className={tab === "archived" ? "on" : ""} onClick={() => setTab("archived")} role="tab" type="button">Archived ({archived.length})</button>
      </div>
      {tab === "active" && <button className="seller-add-listing" onClick={onAdd} type="button">＋ ADD LISTING</button>}
      {tab === "active" && listings.map((x, i) => (
        <article className="manage-listing" key={x.title + i}>
          <img src={x.image} alt="" />
          <div>
            <span className={x.inStock ? "stock-pill" : "stock-pill out"}>{x.inStock ? "IN STOCK" : "OUT OF STOCK"}</span>
            <strong>{x.title}</strong>
            <small>{rupees(x.price)} · {x.sold ? x.sold + " sold" : "new listing"}{x.inStock ? " · " + x.stock + " left" : ""}</small>
          </div>
          <button aria-label={`${x.title} in stock`} aria-pressed={x.inStock} className={`mini-toggle ${x.inStock ? "active" : ""}`} onClick={() => onToggle(i)} type="button"><i /></button>
        </article>
      ))}
      {tab === "completed" && completedListings.map((x) => (
        <article className="manage-listing" key={x.title}>
          <img src={x.image} alt="" />
          <div><span className="stock-pill sold">ALL SOLD</span><strong>{x.title}</strong><small>{rupees(x.price)} · {x.sold} sold</small></div>
        </article>
      ))}
      {tab === "archived" && archived.map((x) => (
        <article className="manage-listing" key={x.title}>
          <img src={x.image} alt="" />
          <div><span className="stock-pill out">ARCHIVED</span><strong>{x.title}</strong><small>{rupees(x.price)} · {x.sold} sold</small></div>
          <button className="restore-btn" onClick={() => { onRestore({ ...x, inStock: true, stock: 5 }); setArchived((l) => l.filter((y) => y.title !== x.title)); }} type="button">Restore</button>
        </article>
      ))}
    </main>
  );
}

function StorefrontView({ onNavigate, profile, listings }: { onNavigate: (tab: Tab) => void; profile: ProfileData; listings: Listing[] }) {
  return (
    <main className="screen-content storefront-view">
      <div className="storefront-title">Storefront</div>
      <img alt="Store illustration" className="shop-illustration" src="./assets/4f002.png" />
      <div className="maker-photo"><img alt={profile.name} src="./assets/dc6b1.png" /><b>✿</b></div>
      <span className="maker-tag">FEATURED MAKER</span>
      <div className="maker-name">{profile.name}</div>
      <div className="maker-meta"><b>{profile.name}</b> · Senior @ ANANT</div>
      <p>Creating handmade artifacts for student life. Everything is made in my dorm studio with love and too much caffeine.</p>
      <div className="store-stats">
        <div><strong>4.9</strong><span>Rating</span></div>
        <div><strong>12</strong><span>Sold</span></div>
        <div><strong>&lt; 1hr</strong><span>Replies</span></div>
      </div>
      <div className="storefront-actions"><button className="add-listing-button order-action" onClick={() => onNavigate("AddListing")} type="button">＋ Add Listing</button><div className="storefront-mini-actions storefront-mini-actions-three"><button onClick={() => onNavigate("Listings")} type="button">Manage Stock</button><button onClick={() => onNavigate("Orders")} type="button">Orders</button><button onClick={() => onNavigate("Analytics")} type="button">Analytics</button></div></div>
      <section className="sf-listings">
        <h3>Your listings <small>{listings.length} items</small></h3>
        <div className="market-grid">
          {listings.map((l, i) => (
            <article className="market-card sf-card" key={l.title + i} onClick={() => onNavigate("Listings")} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onNavigate("Listings"); } }} role="button" tabIndex={0}>
              <img alt={l.title} src={l.image} />
              <em className={l.inStock ? "in" : "out"}>{l.inStock ? "IN STOCK" : "OUT OF STOCK"}</em>
              <span>{l.title}</span>
              <strong>{rupees(l.price)}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ShopView({ shop, onOpen, onMessage }: { shop: Shop; onOpen: (p: Product) => void; onMessage: () => void }) {
  const items = catalog.filter((p) => shopFor(p).id === shop.id);
  return (
    <main className="screen-content storefront-view shop-view">
      <div className="storefront-title">{shop.name}</div>
      <img alt="Store illustration" className="shop-illustration" src="./assets/4f002.png" />
      <div className="maker-photo shroom">{shop.avatar ? <img alt={`${shop.name} logo`} src={shop.avatar} /> : <b>{shop.name[0]}</b>}</div>
      <span className="maker-tag">{shop.tag}</span>
      <div className="maker-name">{shop.name}</div>
      <div className="maker-meta"><b>{shop.studio}</b> · Student @ ANANT</div>
      <p>{shop.bio}</p>
      <div className="store-stats">
        <div><strong>{shop.rating}</strong><span>Rating</span></div>
        <div><strong>{shop.sold}</strong><span>Sold</span></div>
        <div><strong>{shop.replies}</strong><span>Replies</span></div>
      </div>
      <button className="nx-btn order-action wide shop-msg" onClick={onMessage} type="button"><ChatIcon size={20} />Message {shop.name.split(" ")[0]}</button>
      <div className="shop-grid market-grid">
        {items.map((p) => (
          <article className="market-card" key={p.id} onClick={() => onOpen(p)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(p); } }} role="button" tabIndex={0}>
            <img alt={p.title} src={p.image} />
            <span>{p.title}</span>
            <strong>{rupees(p.price)}</strong>
          </article>
        ))}
      </div>
    </main>
  );
}

function PayoutsView({ balance, onCashOut, onRevenue }: { balance: number; onCashOut: () => void; onRevenue: () => void }) {
  const whole = Math.floor(balance), cents = Math.round((balance - whole) * 100);
  return (
    <main className="screen-content payouts-view">
      <div className="data-heading"><strong>Payouts</strong></div>
      <section className="cashout-card"><span>Available Cashout</span><strong>₹{whole.toLocaleString("en-IN")}<small>.{String(cents).padStart(2, "0")}</small></strong></section>
      <div className="payout-buttons"><button className="payment-action" disabled={balance <= 0} onClick={onCashOut} type="button">Cash Out</button><button onClick={onRevenue} type="button">Revenue</button></div>
      <div className="growth-row"><strong>Sales Growth</strong><span>+12%</span></div>
      <img alt="Sales growth chart" className="growth-chart" src="./assets/e6e74.svg" />
      <div className="weekly-orders"><span>Weekly Orders</span><strong>42</strong></div>
    </main>
  );
}

const buyerLinks: { label: string; icon: ReactNode; tab: Tab }[] = [
  { label: "My Orders", icon: <HistoryIcon />, tab: "MyOrders" },
  { label: "Wishlist", icon: <HeartIcon />, tab: "Wishlist" },
  { label: "Messages", icon: <ChatIcon />, tab: "Messages" },
  { label: "Profile", icon: <UserIcon />, tab: "Profile" },
];

const sellerLinks: { label: string; icon: ReactNode; tab: Tab }[] = [
  { label: "Store Logs", icon: <HistoryIcon />, tab: "Listings" },
  { label: "Analytics", icon: <ChartIcon />, tab: "Analytics" },
  { label: "Payouts", icon: <PayoutIcon />, tab: "Payouts" },
  { label: "Messages", icon: <ChatIcon />, tab: "Messages" },
  { label: "Storefront", icon: <StoreIcon />, tab: "Storefront" },
  { label: "Profile", icon: <UserIcon />, tab: "Profile" },
];

function SideMenu({
  sellerMode,
  onClose,
  onModeChange,
  onNavigate,
  active,
  profile,
  dark,
  onDark,
  sellerAccount,
  onBecomeSeller,
}: {
  sellerMode: boolean;
  sellerAccount: boolean;
  onBecomeSeller: () => void;
  onClose: () => void;
  onModeChange: () => void;
  onNavigate: (tab: Tab) => void;
  active: Tab;
  profile: ProfileData;
  dark: boolean;
  onDark: () => void;
}) {
  const links = sellerMode ? sellerLinks : buyerLinks;

  return (
    <div className="drawer-layer" role="presentation">
      <button aria-label="Close menu" className="drawer-scrim" onClick={onClose} type="button" />
      <aside aria-label={`${sellerMode ? "Seller" : "Buyer"} menu`} className="side-menu">
        <div className="drawer-profile">
          <div className="drawer-profile-icon">
            <img alt={profile.name} src="./assets/dc6b1.png" />
          </div>
          <div>
            <strong>{profile.name}</strong>
            <span>{sellerMode ? "Student Maker" : "Student"}</span>
          </div>
          <button aria-label="Close menu" onClick={onClose} type="button">
            <img alt="" src="./assets/307ce.svg" />
          </button>
        </div>

        {sellerAccount ? (
          <button
            aria-label={`Switch to ${sellerMode ? "buyer" : "seller"} mode`}
            className={`mode-switch ${sellerMode ? "seller" : ""}`}
            onClick={onModeChange}
            type="button"
          >
            <span><i /></span>
            <small>{sellerMode ? "SELLER" : "BUYER"}</small>
          </button>
        ) : (
          <button className="drawer-become order-action" onClick={onBecomeSeller} type="button"><StoreIcon size={22} />Become a seller</button>
        )}

        <nav className="drawer-links">
          {links.map((link) => (
            <button
              aria-current={active === link.tab ? "page" : undefined}
              className={active === link.tab ? "active" : ""}
              key={link.label}
              onClick={() => {
                onNavigate(link.tab);
                onClose();
              }}
              type="button"
            >
              <span className="drawer-icon">{link.icon}</span>
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        <img alt="" className="drawer-watermark" src="./assets/6f490.svg" />

        <button className="drawer-mode-link" onClick={sellerAccount ? onModeChange : onBecomeSeller} type="button">
          <span className="drawer-icon">{sellerMode ? <StoreIcon size={22} /> : <BagIcon size={22} />}</span>
          <span>{sellerAccount ? (sellerMode ? "Seller Mode" : "Buyer Mode") : "Buyer account"}</span>
        </button>
        <button aria-checked={dark} className="drawer-theme" onClick={onDark} role="switch" type="button">
          <span className="drawer-icon">{dark ? <MoonIcon size={22} /> : <SunIcon size={22} />}</span>
          <span>{dark ? "Dark mode" : "Light mode"}</span>
          <i aria-hidden="true" className={dark ? "on" : ""}><b /></i>
        </button>
      </aside>
    </div>
  );
}

function BottomNav({
  active,
  onChange,
  sellerMode,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
  sellerMode: boolean;
}) {
  // Keep the Figma navigation model intact in both modes:
  // Buyer: Feed / Search / Cart / Profile
  // Seller: Feed / Sell / Cart / Profile
  const tabs: { name: Tab; label: string; icon: string; activeIcon: string }[] = sellerMode
    ? [
        { name: "Explore", label: "feed", icon: "./assets/2e888.svg", activeIcon: "./assets/10afb.svg" },
        { name: "Listings", label: "Sell", icon: "./assets/64db7.svg", activeIcon: "./assets/99371.svg" },
        { name: "Collab", label: "Collab", icon: "./assets/icon-collab.svg", activeIcon: "./assets/icon-collab-active.svg" },
        { name: "Profile", label: "Profile", icon: "./assets/85b9a.svg", activeIcon: "./assets/1cf4d.svg" },
      ]
    : [
        { name: "Explore", label: "feed", icon: "./assets/2e888.svg", activeIcon: "./assets/10afb.svg" },
        { name: "Search", label: "Search", icon: "./assets/0b1c9.svg", activeIcon: "./assets/75480.svg" },
        { name: "Cart", label: "Cart", icon: "./assets/5294d.svg", activeIcon: "./assets/6d8c2.svg" },
        { name: "Profile", label: "Profile", icon: "./assets/85b9a.svg", activeIcon: "./assets/1cf4d.svg" },
      ];

  const profileGroup: Tab[] = ["MyOrders", "OrderHistory", "Addresses", "BankPayments", "Messages", "Chat", "CashOut", "Payouts", "Report", "Orders"];
  const shownTab: Tab = active === "Checkout" ? "Cart" : active === "Product" || active === "SeeAll" || active === "Notifications" || active === "Wishlist" ? "Explore" : profileGroup.includes(active) ? "Profile" : (active === "SellerSetup" || active === "Analytics" || active === "AddListing") && sellerMode ? "Listings" : active;
  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.name === shownTab));
  const notchAssets = ["./assets/bc349.svg", "./assets/9f690.svg", "./assets/62ebf.svg", "./assets/df703.svg"];

  return (
    <nav className={`mobile-nav ${sellerMode ? "seller-nav" : "buyer-nav"}`} aria-label={sellerMode ? "Seller navigation" : "Buyer navigation"}>
      <img
        alt=""
        aria-hidden="true"
        className="nav-inverted-arc"
        src={notchAssets[activeIndex]}
      />
      {tabs.map((tab, index) => {
        const selected = index === activeIndex;
        return (
          <button
            aria-current={selected ? "page" : undefined}
            aria-label={tab.label === "feed" ? "Feed" : tab.label}
            className={`nav-item ${selected ? "selected" : ""}`}
            key={`${sellerMode ? "seller" : "buyer"}-${tab.label}`}
            onClick={() => onChange(tab.name)}
            type="button"
          >
            <span className="nav-icon-slot">
              <img
                alt=""
                className={`nav-icon nav-icon-${tab.label.toLowerCase()}`}
                src={selected ? tab.activeIcon : tab.icon}
              />
            </span>
            <small>{tab.label}</small>
          </button>
        );
      })}
    </nav>
  );
}

// Recording / deep-link helpers: ?screen=Explore (any Tab name) and ?mode=seller start the prototype in a known, repeatable state. No params = clean start at Onboarding.
const startParams = new URLSearchParams(window.location.search);
const START_SCREENS: Tab[] = ["Product","SeeAll","Explore","Search","Cart","Profile","Wishlist","Storefront","Analytics","Payouts","Checkout","Confirmed","Onboarding","OnboardingCreate","OnboardingMode","OnboardingVerify","OnboardingLogin","SellerSetup","Listings","Orders","MyOrders","OrderHistory","Notifications","Addresses","BankPayments","Messages","Chat","CashOut","PayoutProcessing","PayoutDone","Report","AddListing","Shop","EditProfile","AppPrefs","SellerOnboard","Collab"];
const requested = START_SCREENS.find((t) => t === startParams.get("screen"));
const startScreen: Tab = requested ?? "Onboarding";

const seedFavs: Product[] = [
  { id: 101, title: "Loung Chair", price: 399, image: "./assets/3b138.png", seller: "Kabir Mehta · FEATURED ARTIST" },
  { id: 102, title: "Speckled Clay Mug", price: 299, image: "./assets/e7eaa.png", seller: "STUDIO TERRA · VERIFIED SELLER" },
  { id: 103, title: "Rainy Day Soy Candle", price: 199, image: "./assets/63cf0.png", seller: "CAMPUS SCENTS · STUDENT" },
];

const barTitles: Partial<Record<Tab, string>> = {
  Search: "Search", Cart: "Your Cart", Profile: "Account", Wishlist: "My Wishlist", Storefront: "Storefront", Analytics: "Analytics", Payouts: "Payouts",
  Checkout: "Order Summary", SeeAll: "All Products", Listings: "Store Management", Orders: "Orders", MyOrders: "My Orders", OrderHistory: "Order History",
  Notifications: "Notifications", Addresses: "Addresses", BankPayments: "Bank Payments", Messages: "Messages", Chat: "Messages", CashOut: "Cash Out",
  Report: "Sales Report", AddListing: "Add Listing", EditProfile: "Edit Profile", Shop: "Shroom Doodle", AppPrefs: "App Preferences", Collab: "Collab", Product: "Product Details",
};
const barTitle = (t: Tab, _shop: string) => barTitles[t] ?? "";
const shopName = "Shroom Doodle";

export default function App() {
  const [active, setActive] = useState<Tab>(startScreen);
  const [cart, setCart] = useState<Line[]>(seedCart);
  const [viewing, setViewing] = useState<Product>(catalog[0]);
  const [buyNow, setBuyNow] = useState<Line[] | null>(null);
  const [history, setHistory] = useState<Tab[]>([]);
  const navigate = (tab: Tab) => {
    setHistory((items) => active === tab ? items : [...items, active]);
    setActive(tab);
  };
  const goBack = () => {
    setHistory((items) => {
      const next = [...items];
      const previous = next.pop() || (sellerMode ? "Storefront" : "Explore");
      setActive(previous);
      return next;
    });
  };
  const openProduct = (p: Product) => { setViewing(p); navigate("Product"); };
  const addToCart = (p: Product, qty: number) => setCart((c) => (c.some((l) => l.product.id === p.id) ? c.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + qty, selected: true } : l)) : [...c, { product: p, qty, selected: true }]));
  const toggleLine = (id: number) => setCart((c) => c.map((l) => (l.product.id === id ? { ...l, selected: !l.selected } : l)));
  const changeQty = (id: number, d: number) => setCart((c) => c.flatMap((l) => (l.product.id !== id ? [l] : l.qty + d <= 0 ? [] : [{ ...l, qty: l.qty + d }])));
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [profile, setProfile] = useState<ProfileData>(seedProfile);
  const [dark, setDark] = useState(() => {
    const asked = startParams.get("theme");
    if (asked) return asked === "dark";
    try { const saved = window.localStorage.getItem("nearu-theme"); if (saved) return saved === "dark"; } catch { /* storage blocked */ }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  useEffect(() => { try { window.localStorage.setItem("nearu-theme", dark ? "dark" : "light"); } catch { /* storage blocked */ } }, [dark]);
  const [confirmUnfav, setConfirmUnfav] = useState<Product | null>(null);
  const [favs, setFavs] = useState<Product[]>(seedFavs);
  const [listings, setListings] = useState<Listing[]>(seedListings);
  const [threads, setThreads] = useState<Thread[]>(seedThreads);
  const [chatId, setChatId] = useState(1);
  const [balance, setBalance] = useState(749.5);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [payUpi, setPayUpi] = useState("kabir@okaxis");
  const [payAmount, setPayAmount] = useState(0);
  const [notifSeen, setNotifSeen] = useState(false);
  const toggleFav = (p: Product) => setFavs((f) => (f.some((x) => x.id === p.id) ? f.filter((x) => x.id !== p.id) : [...f, p]));
  const sendMessage = (id: number, text: string) => {
    const stamp = new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: false });
    setThreads((t) => t.map((x) => (x.id === id ? { ...x, unread: 0, msgs: [...x.msgs, { from: "me", text, time: stamp } as Msg] } : x)));
    window.setTimeout(() => {
      setThreads((t) => t.map((x) => {
        if (x.id !== id) return x;
        const n = x.msgs.filter((m) => m.from === "them").length;
        return { ...x, msgs: [...x.msgs, { from: "them", text: x.replies[n % x.replies.length], time: stamp } as Msg] };
      }));
    }, 1400);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [sellerMode, setSellerMode] = useState(startParams.get("mode") === "seller");
  const [sellerSetupDone, setSellerSetupDone] = useState(false);
  const [sellerAccount, setSellerAccount] = useState(startParams.get("mode") === "seller" || startParams.get("account") === "seller");
  const [collabOpen, setCollabOpen] = useState(true);
  const [shopId, setShopId] = useState("shroom");
  const [shareMsg, setShareMsg] = useState(false);
  const openShop = (id: string) => { setShopId(id); navigate("Shop"); };
  const messageShop = (shop: Shop, p?: Product) => {
    const about = p ? p.title + " · " + rupees(p.price) : "Shop chat";
    const ex = threads.find((t) => t.name === shop.name && t.about === about);
    if (ex) setChatId(ex.id);
    else {
      const id = Date.now();
      setThreads((t) => [...t, { id, role: "buying", name: shop.name, avatar: shop.avatar, about, unread: 0, msgs: [], replies: ["Hi! Yes, it is still available.", "Sure, we can meet near the library.", "Sounds good, see you then!"], product: p ? { title: p.title, price: p.price, image: p.image, blurb: aboutItem(p).split(".")[0] + "." } : undefined }]);
      setChatId(id);
    }
    navigate("Chat");
  };
  const [sellerCats, setSellerCats] = useState<string[]>([]);
  const startCollab = (p: { name: string; avatar?: string; sells: string }) => {
    const ex = threads.find((t) => t.name === p.name && t.about === "Collaboration");
    if (ex) setChatId(ex.id);
    else {
      const id = Date.now();
      setThreads((t) => [...t, { id, role: "selling", name: p.name, avatar: p.avatar, about: "Collaboration", unread: 0, msgs: [], replies: ["Love that idea! Tell me more.", "Sounds fun. When can we meet?", "Let us plan it at the library."] }]);
      setChatId(id);
    }
    navigate("Chat");
  };
  const startSelling = () => { setMenuOpen(false); navigate("SellerOnboard"); };
  const onboardingTabs: Tab[] = ["Onboarding", "OnboardingCreate", "OnboardingMode", "OnboardingVerify", "OnboardingLogin", "SellerOnboard"];
  const showChrome = active !== "Confirmed" && active !== "PayoutProcessing" && active !== "PayoutDone" && !onboardingTabs.includes(active);
  const backExceptions: Tab[] = ["Explore", "Onboarding", "OnboardingCreate", "OnboardingLogin", "OnboardingMode", "OnboardingVerify", "SellerSetup", "PayoutProcessing", "PayoutDone", "SellerOnboard"];
  const showBack = !backExceptions.includes(active);
  const askUnfav = (p: Product) => setConfirmUnfav(p);
  // The version line is not pinned: it is the last line of a page and only shows when the page is long enough to scroll to it.
  useEffect(() => {
    const m = document.querySelector<HTMLElement>("main.screen-content");
    if (!m) return;
    const after = 44;
    const bar = document.querySelector<HTMLElement>(".page-bar");
    const follow = () => bar?.style.setProperty("--bar-y", -m.scrollTop + "px");
    follow();
    m.addEventListener("scroll", follow, { passive: true });
    const measure = () => {
      const has = m.classList.contains("has-v");
      const need = m.scrollHeight - (has ? after : 0) > m.clientHeight + 2;
      if (need !== has) m.classList.toggle("has-v", need);
    };
    measure();
    const mo = new MutationObserver(measure);
    mo.observe(m, { childList: true, subtree: true });
    m.addEventListener("load", measure, true);
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 500);
    return () => { mo.disconnect(); m.removeEventListener("scroll", follow); m.removeEventListener("load", measure, true); window.removeEventListener("resize", measure); window.clearTimeout(t); };
  });

  return (
    <div className="prototype-stage">
      <header className="sr-only"><h1>NearU campus marketplace prototype</h1></header>
      <div className="phone-device-shell">
      <div className={`phone-app ${dark && !(["Onboarding", "OnboardingCreate", "OnboardingMode", "OnboardingVerify", "OnboardingLogin", "SellerOnboard"] as Tab[]).includes(active) ? "dark" : ""}`}>
      <StatusBar />
      {showBack && (
        <div className="page-bar">
          <button className="screen-back-button" onClick={goBack} type="button" aria-label="Go back">
            <ArrowLeftIcon size={26} />
          </button>
          <div className="bar-title">
            <h2>{active === "Chat" ? (threads.find((t) => t.id === chatId)?.name ?? "Messages") : active === "Shop" ? shops[shopId].name : barTitle(active, shopName)}</h2>
            {active === "Chat" && <small>ONLINE</small>}
          </div>
          {(active === "Product" || active === "Chat") && <button aria-label="Share" className="bar-action" onClick={() => { setShareMsg(true); window.setTimeout(() => setShareMsg(false), 1600); }} type="button"><ShareIcon size={22} /></button>}
          {shareMsg && <span className="bar-toast" role="status">Link copied ✓</span>}
          {active === "Storefront" && <button aria-label="Edit storefront" className="bar-action" onClick={() => navigate("SellerSetup")} type="button"><PenIcon size={24} /></button>}
        </div>
      )}
      {showChrome && (
        <AppHeader
          onMenu={() => setMenuOpen(true)}
          onWishlist={() => navigate("Wishlist")}
          wishlistActive={active === "Wishlist"}
          onNotifications={() => { setNotifSeen(true); navigate("Notifications"); }}
          notificationsActive={active === "Notifications"}
          unread={!notifSeen}
        />
      )}
      {active === "Explore" && <ExploreView onAnalytics={() => navigate("Analytics")} onOpen={openProduct} onSearch={() => navigate("Search")} onSeeAll={() => navigate("SeeAll")} onShop={() => openShop("shroom")} onStore={() => navigate("Storefront")} sellerMode={sellerMode} />}
      {active === "Search" && <SearchView onOpen={openProduct} />}
      {active === "Cart" && <CartView lines={cart} onCheckout={() => { setBuyNow(null); navigate("Checkout"); }} onQty={changeQty} onToggle={toggleLine} />}
      {active === "Product" && <ProductView inCart={cart.some((l) => l.product.id === viewing.id)} key={viewing.id} onAdd={(qty) => addToCart(viewing, qty)} onBuy={(qty) => { setBuyNow([{ product: viewing, qty, selected: true }]); navigate("Checkout"); }} onCart={() => navigate("Cart")} product={viewing} faved={favs.some((x) => x.id === viewing.id)} onFav={() => (favs.some((x) => x.id === viewing.id) ? askUnfav(viewing) : toggleFav(viewing))} onMessage={() => messageShop(shopFor(viewing), viewing)} onOpenShop={() => openShop(shopFor(viewing).id)} sellerMode={sellerMode} shop={shopFor(viewing)} />}
      {active === "SeeAll" && <SeeAllView onOpen={openProduct} />}
      {active === "Profile" && (
        <ProfileView
          onNavigate={navigate}
          onBecomeSeller={startSelling}
          onModeChange={() => { if (!sellerMode && !sellerSetupDone) { setSellerMode(true); navigate("SellerOnboard"); } else setSellerMode((current) => !current); }}
          profile={profile}
          sellerAccount={sellerAccount}
          sellerMode={sellerMode}
        />
      )}
      {active === "Wishlist" && <WishlistView items={favs} onAddToCart={(picked) => { picked.forEach((p) => addToCart(p, 1)); navigate("Cart"); }} onRemove={(id) => { const p = favs.find((x) => x.id === id); if (p) askUnfav(p); }} />}
      {active === "Checkout" && <CheckoutView lines={buyNow ?? cart.filter((l) => l.selected)} onPay={() => { setOrders((o) => [orderFromLines(buyNow ?? cart.filter((l) => l.selected), o.length), ...o]); if (!buyNow) setCart((c) => c.filter((l) => !l.selected)); setBuyNow(null); navigate("Confirmed"); }} />}
      {active === "Confirmed" && <ConfirmedView onDone={() => navigate("Explore")} onOrders={() => navigate("MyOrders")} />}
      {active === "Storefront" && <StorefrontView listings={listings} onNavigate={navigate} profile={profile} />}
      {active === "Shop" && <ShopView onMessage={() => messageShop(shops[shopId])} onOpen={openProduct} shop={shops[shopId]} />}
      {active === "EditProfile" && <EditProfileView onSave={(p) => { setProfile(p); goBack(); }} profile={profile} />}
      {active === "Listings" && <ListingsView listings={listings} onAdd={() => navigate("AddListing")} onRestore={(l) => setListings((x) => [...x, l])} onToggle={(i) => setListings((l) => l.map((x, j) => (j === i ? { ...x, inStock: !x.inStock, stock: !x.inStock ? Math.max(x.stock, 1) : x.stock } : x)))} />}
      {active === "Orders" && <SellerOrdersView onChat={(id) => { if (id) { setChatId(id); navigate("Chat"); } else navigate("Messages"); }} />}
      {active === "SellerSetup" && <SellerSetupView initialTags={sellerCats.length ? sellerCats : undefined} onDone={() => { setSellerSetupDone(true); setSellerMode(true); navigate("Storefront"); }} onNavigate={navigate} />}
      {active === "Analytics" && <AnalyticsView />}
      {active === "Collab" && <CollabView onMessage={startCollab} onOpen={(id) => { setChatId(id); navigate("Chat"); }} onToggle={() => setCollabOpen((o) => !o)} open={collabOpen} threads={threads} />}
      {active === "AppPrefs" && <AppPrefsView dark={dark} onDark={() => setDark((d) => !d)} />}
      {active === "Payouts" && <PayoutsView balance={balance} onCashOut={() => navigate("CashOut")} onRevenue={() => navigate("Report")} />}
      {active === "MyOrders" && <MyOrdersView onChat={() => navigate("Messages")} onPay={(id) => setOrders((o) => o.map((x) => (x.id === id ? { ...x, status: "Processing" } : x)))} orders={orders} />}
      {active === "OrderHistory" && <OrderHistoryView onAgain={(p) => addToCart(p, 1)} orders={orders} />}
      {active === "Notifications" && <NotificationsView onGo={(to) => navigate(to)} sellerMode={sellerMode} />}
      {active === "Addresses" && <AddressesView />}
      {active === "BankPayments" && <BankPaymentsView payouts={payouts} />}
      {active === "Messages" && <MessagesView onOpen={(id) => { setChatId(id); setThreads((t) => t.map((x) => (x.id === id ? { ...x, unread: 0 } : x))); navigate("Chat"); }} sellerMode={sellerMode} threads={threads} />}
      {active === "Chat" && <ChatView onSend={sendMessage} thread={threads.find((t) => t.id === chatId) ?? threads[0]} />}
      {active === "CashOut" && <CashOutView balance={balance} onConfirm={(upi) => { setPayUpi(upi); setPayAmount(balance); navigate("PayoutProcessing"); }} />}
      {active === "PayoutProcessing" && <PayoutProcessingView amount={payAmount} onDone={() => { setBalance(0); setPayouts((p) => [{ id: "PO-" + (p.length + 1), title: "Cash out to UPI", sub: payUpi + " · 10 Oct", amount: payAmount }, ...p]); setActive("PayoutDone"); }} upi={payUpi} />}
      {active === "PayoutDone" && <PayoutDoneView amount={payAmount} onProfile={() => { setHistory([]); setActive("Profile"); }} upi={payUpi} />}
      {active === "Report" && <ReportView available={balance} />}
      {active === "AddListing" && <AddListingView onPublish={(l) => { setListings((x) => [l, ...x]); setHistory((h) => (h[h.length - 1] === "Listings" ? h.slice(0, -1) : h)); setActive("Listings"); }} />}
      {active === "Onboarding" && (
        <OnboardingView
          onCreate={() => navigate("OnboardingCreate")}
          onLogin={() => navigate("OnboardingLogin")}
        />
      )}
      {active === "OnboardingCreate" && (
        <CreateAccountView
          onLogin={() => navigate("OnboardingLogin")}
          onNext={() => navigate("OnboardingMode")}
        />
      )}
      {active === "OnboardingMode" && (
        <ModeSelectionView
          onChoose={(seller, both) => {
            setSellerMode(seller);
            setSellerAccount(seller || !!both);
            navigate("OnboardingVerify");
          }}
        />
      )}
      {active === "OnboardingVerify" && <VerificationView onVerify={() => navigate(sellerMode && !sellerSetupDone ? "SellerOnboard" : "Explore")} />}
      {active === "SellerOnboard" && <SellerOnboardView onDone={(cats) => { setSellerCats(cats); setSellerAccount(true); setSellerMode(true); setHistory([]); setActive("SellerSetup"); }} onExit={() => { setSellerMode(false); goBack(); }} />}
      {active === "OnboardingLogin" && <LoginView onLogin={() => navigate("Explore")} />}
      {showChrome && <BottomNav active={active} onChange={navigate} sellerMode={sellerMode} />}
      {menuOpen && (
        <SideMenu
          onClose={() => setMenuOpen(false)}
          onBecomeSeller={startSelling}
          onModeChange={() => { if (!sellerMode && !sellerSetupDone) { setMenuOpen(false); setSellerMode(true); navigate("SellerOnboard"); } else setSellerMode((current) => !current); }}
          onNavigate={navigate}
          sellerAccount={sellerAccount}
          sellerMode={sellerMode}
          active={active}
          profile={profile}
          dark={dark}
          onDark={() => setDark((d) => !d)}
        />
      )}
      {confirmUnfav && (
        <div className="confirm-layer" role="presentation">
          <button aria-label="Cancel" className="confirm-scrim" onClick={() => setConfirmUnfav(null)} type="button" />
          <section aria-labelledby="unfav-title" aria-modal="true" className="confirm-card" role="dialog">
            <HeartIcon filled size={34} />
            <h2 id="unfav-title">Remove from wishlist?</h2>
            <p>{confirmUnfav.title} will no longer be saved.</p>
            <div className="nx-two">
              <button className="nx-btn line" onClick={() => setConfirmUnfav(null)} type="button">Cancel</button>
              <button className="nx-btn payment-action" onClick={() => { toggleFav(confirmUnfav); setConfirmUnfav(null); }} type="button">Yes, remove</button>
            </div>
          </section>
        </div>
      )}
      </div>
      </div>
      <aside className="prototype-console" aria-label="Prototype console">
        <div className="console-title">NearU Console</div>
        <button onClick={() => navigate("Onboarding")} type="button">Onboarding</button>
        <button onClick={() => navigate("Explore")} type="button">Feed</button>
        <button onClick={() => navigate("Search")} type="button">Search</button>
        <button onClick={() => navigate("Cart")} type="button">Cart</button>
        <button onClick={() => navigate("Profile")} type="button">Profile</button>
        <button onClick={() => { setSellerMode(true); navigate(sellerSetupDone ? "Storefront" : "SellerSetup"); }} type="button">Seller</button>
        <button onClick={() => navigate("Listings")} type="button">Listings</button>
        <button onClick={() => navigate("Orders")} type="button">Orders</button>
        <button onClick={() => navigate("Analytics")} type="button">Analytics</button>
        <button onClick={() => navigate("Payouts")} type="button">Payouts</button>
        <button onClick={() => navigate("MyOrders")} type="button">My Orders</button>
        <button onClick={() => navigate("Messages")} type="button">Messages</button>
      </aside>
    </div>
  );
}
