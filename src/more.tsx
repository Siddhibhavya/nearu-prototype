import { useEffect, useRef, useState } from "react";
import { ScrollRow } from "./ui";
import { BagIcon, BellIcon, ChatIcon, StoreIcon, VerifiedSeal } from "./icons";

// ---------------------------------------------------------------------------------------------------------------------------
// Orders, order history, notifications, addresses, bank payments, messages, cash-out, revenue report and add-listing.
// Brand only: Futura / Liberation Sans, yellow #fec12d, coral #ff5a5f, blue #0057e7, cream #fff4ee, ink #17120e.
// ---------------------------------------------------------------------------------------------------------------------------
export const rupee = (n: number) => "₹" + n.toLocaleString("en-IN");
const rupeeDec = (n: number) => "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export type OrderStatus = "Unpaid" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type OrderItem = { title: string; image: string; qty: number; price: number };
export type Order = { id: string; status: OrderStatus; date: string; items: OrderItem[] };
type BuyAgain = { id: number; title: string; price: number; image: string };

const orderTotal = (o: Order) => o.items.reduce((n, i) => n + i.price * i.qty, 0);
const statusNote: Record<OrderStatus, string> = {
  Unpaid: "Complete your payment so the seller can start preparing your order.",
  Processing: "The seller is packing your order. You will be told when it is handed over.",
  Shipped: "Your order is on its way across campus. Pick-up point: Library Gate.",
  Delivered: "Your package has been successfully delivered. Happy Shopping :)",
  Cancelled: "This order was cancelled and the money went back to your account.",
};
const statusIcon: Record<OrderStatus, string> = { Unpaid: "◔", Processing: "◌", Shipped: "➜", Delivered: "✓", Cancelled: "✕" };

export const seedOrders: Order[] = [
  { id: "NU-2045", status: "Unpaid", date: "Sat, 10 Oct 09:42", items: [{ title: "Campus Design Notes", image: "./assets/1f777.png", qty: 1, price: 599 }] },
  { id: "NU-2041", status: "Processing", date: "Fri, 09 Oct 18:20", items: [{ title: "Mahogany Soy Candle", image: "./assets/order-candle.jpg", qty: 1, price: 299 }, { title: "Ceramic Studio Mug", image: "./assets/e7eaa.png", qty: 2, price: 599 }] },
  { id: "NU-2038", status: "Shipped", date: "Thu, 08 Oct 14:05", items: [{ title: "Grey Knit Sweater", image: "./assets/order-sweater.jpg", qty: 1, price: 699 }] },
  { id: "NU-2033", status: "Delivered", date: "Wed, 07 Oct 11:06", items: [{ title: "Crown Stud Earrings", image: "./assets/order-earrings.jpg", qty: 1, price: 349 }, { title: "Denim Jacket", image: "./assets/order-jacket.jpg", qty: 1, price: 749 }, { title: "Cozy Cloud Beanie", image: "./assets/beanie.jpg", qty: 1, price: 699 }] },
  { id: "NU-2029", status: "Delivered", date: "Mon, 05 Oct 16:30", items: [{ title: "White Sneakers", image: "./assets/order-sneakers.jpg", qty: 1, price: 799 }, { title: "Canvas Satchel", image: "./assets/order-backpack.jpg", qty: 1, price: 649 }] },
  { id: "NU-2022", status: "Cancelled", date: "Sat, 03 Oct 10:12", items: [{ title: "Hand-painted Denim", image: "./assets/2e7ab.png", qty: 1, price: 799 }] },
];

// older orders for the history page (everything that is not still on its way)
const olderHistory: { id: string; date: string; title: string; image: string; price: number; qty: number; status: "Delivered" | "Cancelled" }[] = [
  { id: "NU-2011", date: "Sun, 27 Sep", title: "Dreamy Polaroids", image: "./assets/14334.png", price: 499, qty: 1, status: "Delivered" },
  { id: "NU-2004", date: "Tue, 22 Sep", title: "Boho Dorm Macrame", image: "./assets/91f1c.png", price: 649, qty: 1, status: "Delivered" },
  { id: "NU-1987", date: "Wed, 16 Sep", title: "Olympus Stylus", image: "./assets/9d186.png", price: 749, qty: 1, status: "Delivered" },
  { id: "NU-1960", date: "Thu, 10 Sep", title: "Rainy Day Soy", image: "./assets/43074.png", price: 299, qty: 2, status: "Delivered" },
];

export const orderFromLines = (lines: { product: { title: string; image: string; price: number }; qty: number }[], n: number): Order => ({
  id: "NU-" + (2040 + n),
  status: "Processing",
  date: "Sat, 10 Oct 10:05",
  items: lines.map((l) => ({ title: l.product.title, image: l.product.image, qty: l.qty, price: l.product.price })),
});

function NotifyChat({ id, label, onChat }: { id: string; label: string; onChat: () => void }) {
  const [state, setState] = useState<"idle" | "ringing" | "done">("idle");
  const ring = () => { if (state !== "idle") return; setState("ringing"); window.setTimeout(() => setState("done"), 1100); };
  return (
    <div className="nx-ping">
      <button aria-label={`${label} for order ${id}`} className={`nx-notify ${state}`} onClick={ring} type="button"><BellIcon filled={state !== "idle"} size={20} /><span>{state === "done" ? "Notified" : label}</span></button>
      <button aria-label={`Message about order ${id}`} className="nx-msg" onClick={onChat} type="button"><ChatIcon size={22} /></button>
    </div>
  );
}

// ---- My Orders: side-scroll status tabs + a "More" drop-down, cards of what was ordered -------------------------------------
const statuses: ("All" | OrderStatus)[] = ["All", "Unpaid", "Processing", "Shipped", "Delivered", "Cancelled"];

export function MyOrdersView({ orders, onPay, onChat }: { orders: Order[]; onPay: (id: string) => void; onChat: () => void }) {
  const [tab, setTab] = useState<"All" | OrderStatus>("All");
  const [more, setMore] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState<Record<string, boolean>>({});
  const shown = tab === "All" ? orders : orders.filter((o) => o.status === tab);
  const count = (s: "All" | OrderStatus) => (s === "All" ? orders.length : orders.filter((o) => o.status === s).length);
  return (
    <main className="screen-content nx-view nx-orders">
      <div className="nx-topbar"><h2>My Orders</h2></div>
      <div className="nx-tabrow">
        <ScrollRow arrowTop={20} className="nx-tabs" label="Order status">
          {statuses.map((s) => (
            <button aria-pressed={tab === s} className={tab === s ? "on" : ""} key={s} onClick={() => setTab(s)} type="button">{s}</button>
          ))}
        </ScrollRow>
        <button aria-expanded={more} className="nx-more" onClick={() => setMore(!more)} type="button">More <i className={more ? "up" : ""} /></button>
      </div>
      {more && (
        <div className="nx-morepanel" role="group" aria-label="All order statuses">
          {statuses.map((s) => (
            <button className={tab === s ? "on" : ""} key={s} onClick={() => { setTab(s); setMore(false); }} type="button">{s} <small>{count(s)}</small></button>
          ))}
        </div>
      )}
      {shown.length === 0 && <p className="nx-empty">Nothing here yet. Orders you place will show up in this list.</p>}
      {shown.map((o) => {
        const total = orderTotal(o);
        const units = o.items.reduce((n, i) => n + i.qty, 0);
        return (
          <article className="nx-order" key={o.id}>
            <header><span className={`nx-st ${o.status.toLowerCase()}`}><i aria-hidden="true">{statusIcon[o.status]}</i></span><strong>{o.status}</strong><small>{o.id}</small></header>
            <div className="nx-note"><p>{statusNote[o.status]}</p><time>{o.date}</time></div>
            <div className="nx-thumbs">{o.items.map((i) => <span key={i.title}><img alt={i.title} src={i.image} /><b>x{i.qty}</b></span>)}</div>
            <p className="nx-total"><span>x{units}</span> Total Amount: <b>{rupee(total)}</b></p>
            {open === o.id && (
              <ol className="nx-track" aria-label="Order progress">
                {["Order placed", "Packed by seller", "Out for delivery", "Delivered"].map((t, i) => <li className={i <= (o.status === "Processing" ? 1 : 2) ? "done" : ""} key={t}>{t}</li>)}
              </ol>
            )}
            <div className="nx-actions">
              {(o.status === "Unpaid" || o.status === "Processing" || o.status === "Shipped") && <NotifyChat id={o.id} label="Notify seller" onChat={onChat} />}
              {o.status === "Unpaid" && <button className="payment-action nx-btn" onClick={() => onPay(o.id)} type="button">Pay Now</button>}
              {(o.status === "Processing" || o.status === "Shipped") && <button className="nx-btn line" onClick={() => setOpen(open === o.id ? null : o.id)} type="button">{open === o.id ? "Hide tracking" : "Track order"}</button>}
              {o.status === "Delivered" && <button className="nx-btn dark" disabled={reviewed[o.id]} onClick={() => setReviewed({ ...reviewed, [o.id]: true })} type="button">{reviewed[o.id] ? "Review sent ✓" : "Review"}</button>}
              {o.status === "Cancelled" && <button className="order-action nx-btn" type="button">Buy again</button>}
            </div>
          </article>
        );
      })}
    </main>
  );
}

// ---- Seller orders: the same cards, for what other students ordered from you ----------------------------------------------------
type SStatus = "Processing" | "Ready" | "Completed";
type SOrder = { id: string; status: SStatus; who: string; thread?: number; date: string; items: OrderItem[] };
const seedSellerOrders: SOrder[] = [
  { id: "NU-S118", status: "Ready", who: "Aanya Shah", thread: 3, date: "Sat, 10 Oct 10:02", items: [{ title: "Risograph Mini Zine", image: "./assets/43074.png", qty: 1, price: 180 }] },
  { id: "NU-S117", status: "Processing", who: "Rhea Patel", thread: 4, date: "Sat, 10 Oct 08:40", items: [{ title: "Custom Portrait Slot", image: "./assets/14334.png", qty: 1, price: 500 }] },
  { id: "NU-S112", status: "Completed", who: "Dev Rao", date: "Thu, 08 Oct 16:15", items: [{ title: "Campus Poster Pack", image: "./assets/9d186.png", qty: 1, price: 250 }] },
  { id: "NU-S109", status: "Completed", who: "Isha Nair", date: "Wed, 07 Oct 12:30", items: [{ title: "Campus Poster Pack", image: "./assets/9d186.png", qty: 1, price: 250 }, { title: "Risograph Mini Zine", image: "./assets/43074.png", qty: 2, price: 180 }] },
];
const sStatuses: ("All" | SStatus)[] = ["All", "Processing", "Ready", "Completed"];
const sNote = (o: SOrder) => (o.status === "Processing" ? `${o.who} ordered this. Start preparing it for hand-over.` : o.status === "Ready" ? `Packed for ${o.who}. Waiting for pick-up at the Library Gate.` : `Handed over to ${o.who}. The money is in your payouts.`);
export function SellerOrdersView({ onChat }: { onChat: (thread?: number) => void }) {
  const [orders, setOrders] = useState(seedSellerOrders);
  const [tab, setTab] = useState<"All" | SStatus>("All");
  const [more, setMore] = useState(false);
  const shown = tab === "All" ? orders : orders.filter((o) => o.status === tab);
  const count = (s: "All" | SStatus) => (s === "All" ? orders.length : orders.filter((o) => o.status === s).length);
  const advance = (id: string) => setOrders((l) => l.map((o) => (o.id === id ? { ...o, status: o.status === "Processing" ? "Ready" : "Completed" } : o)));
  const cls: Record<SStatus, string> = { Processing: "processing", Ready: "shipped", Completed: "delivered" };
  const icon: Record<SStatus, string> = { Processing: "◌", Ready: "➜", Completed: "✓" };
  return (
    <main className="screen-content nx-view nx-orders">
      <div className="nx-tabrow">
        <ScrollRow arrowTop={20} className="nx-tabs" label="Order status">
          {sStatuses.map((s) => <button aria-pressed={tab === s} className={tab === s ? "on" : ""} key={s} onClick={() => setTab(s)} type="button">{s}</button>)}
        </ScrollRow>
        <button aria-expanded={more} className="nx-more" onClick={() => setMore(!more)} type="button">More <i className={more ? "up" : ""} /></button>
      </div>
      {more && (
        <div className="nx-morepanel" role="group" aria-label="All order statuses">
          {sStatuses.map((s) => <button className={tab === s ? "on" : ""} key={s} onClick={() => { setTab(s); setMore(false); }} type="button">{s} <small>{count(s)}</small></button>)}
        </div>
      )}
      {shown.length === 0 && <p className="nx-empty">No orders here yet.</p>}
      {shown.map((o) => {
        const total = o.items.reduce((n, i) => n + i.price * i.qty, 0);
        const units = o.items.reduce((n, i) => n + i.qty, 0);
        return (
          <article className="nx-order" key={o.id}>
            <header><span className={`nx-st ${cls[o.status]}`}><i aria-hidden="true">{icon[o.status]}</i></span><strong>{o.status}</strong><small>{o.id}</small></header>
            <div className="nx-note"><p>{sNote(o)}</p><time>{o.date}</time></div>
            <div className="nx-thumbs">{o.items.map((i) => <span key={i.title}><img alt={i.title} src={i.image} /><b>x{i.qty}</b></span>)}</div>
            <p className="nx-total"><span>x{units}</span> Total Amount: <b>{rupee(total)}</b></p>
            <div className="nx-actions">
              {o.status !== "Completed" && <NotifyChat id={o.id} label="Notify buyer" onChat={() => onChat(o.thread)} />}
              {o.status === "Processing" && <button className="order-action nx-btn" onClick={() => advance(o.id)} type="button">Mark ready</button>}
              {o.status === "Ready" && <button className="nx-btn dark" onClick={() => advance(o.id)} type="button">Hand over</button>}
            </div>
          </article>
        );
      })}
    </main>
  );
}

// ---- Order history: what was bought before, with Buy again -----------------------------------------------------------------
export function OrderHistoryView({ orders, onAgain }: { orders: Order[]; onAgain: (p: BuyAgain) => void }) {
  const done = orders.filter((o) => o.status === "Delivered" || o.status === "Cancelled");
  const rows = [
    ...done.flatMap((o) => o.items.map((i) => ({ key: o.id + i.title, id: o.id, date: o.date.split(" ").slice(0, 3).join(" "), title: i.title, image: i.image, price: i.price, qty: i.qty, status: o.status as "Delivered" | "Cancelled" }))),
    ...olderHistory.map((h) => ({ key: h.id, ...h })),
  ];
  const spent = rows.filter((r) => r.status === "Delivered").reduce((n, r) => n + r.price * r.qty, 0);
  const [added, setAdded] = useState<Record<string, boolean>>({});
  return (
    <main className="screen-content nx-view">
      <div className="nx-topbar"><h2>Order History</h2></div>
      <p className="nx-sub">{rows.length} past items · {rupee(spent)} spent on campus</p>
      <div className="nx-list">
        {rows.map((r, i) => (
          <article className="nx-hrow" key={r.key}>
            <img alt={r.title} src={r.image} />
            <div>
              <strong>{r.title}</strong>
              <small>{r.status} · {r.date} · {r.id}</small>
              <b>{rupee(r.price)}{r.qty > 1 ? ` · x${r.qty}` : ""}</b>
            </div>
            <button className="nx-btn mini" onClick={() => { onAgain({ id: 500 + i, title: r.title, price: r.price, image: r.image }); setAdded({ ...added, [r.key]: true }); }} type="button">{added[r.key] ? "In cart ✓" : "Buy again"}</button>
          </article>
        ))}
      </div>
    </main>
  );
}

// ---- Notifications ---------------------------------------------------------------------------------------------------------
export function NotificationsView({ sellerMode, onGo }: { sellerMode: boolean; onGo: (to: "MyOrders" | "Orders" | "Messages" | "Payouts" | "Listings" | "Explore") => void }) {
  const items: { to: "MyOrders" | "Orders" | "Messages" | "Payouts" | "Listings" | "Explore"; title: string; body: string; time: string; unread: boolean; kind: string }[] = sellerMode
    ? [
        { to: "Orders", title: "New order from Aanya Shah", body: "Risograph Mini Zine · ₹180. Ready for pick-up?", time: "10 min", unread: true, kind: "order" },
        { to: "Payouts", title: "₹749.50 is ready to cash out", body: "Your latest sales have settled.", time: "2 h", unread: true, kind: "money" },
        { to: "Messages", title: "Rhea Patel sent a message", body: "“Can the portrait slot be this weekend?”", time: "5 h", unread: true, kind: "chat" },
        { to: "Listings", title: "Campus Poster Pack got 5 new saves", body: "Students are adding it to their wishlists.", time: "Yesterday", unread: false, kind: "heart" },
      ]
    : [
        { to: "MyOrders", title: "Your order NU-2038 has shipped", body: "Grey Knit Sweater is on its way. Pick-up: Library Gate.", time: "10 min", unread: true, kind: "order" },
        { to: "Messages", title: "Maya Chen replied", body: "“Yes, still available! I can bring it to the canteen.”", time: "2 h", unread: true, kind: "chat" },
        { to: "Explore", title: "Price drop on Cozy Cloud Beanie", body: "Now ₹599, down from ₹699.", time: "5 h", unread: true, kind: "tag" },
        { to: "MyOrders", title: "Order NU-2033 delivered", body: "Tell the seller how it went. Leave a review.", time: "Yesterday", unread: false, kind: "order" },
      ];
  const [read, setRead] = useState<Record<number, boolean>>({});
  const unread = items.filter((n, i) => n.unread && !read[i]).length;
  return (
    <main className="screen-content nx-view">
      <div className="nx-topbar between"><h2>Notifications</h2><button className="nx-link" disabled={unread === 0} onClick={() => setRead(Object.fromEntries(items.map((_, i) => [i, true])))} type="button">Mark all read</button></div>
      <p className="nx-sub">{unread ? `${unread} new` : "You are all caught up"}</p>
      <div className="nx-list">
        {items.map((n, i) => (
          <button className={`nx-note-row ${n.unread && !read[i] ? "unread" : ""}`} key={n.title} onClick={() => { setRead({ ...read, [i]: true }); onGo(n.to); }} type="button">
            <span className={`nx-kind ${n.kind}`} aria-hidden="true">{n.kind === "order" ? "▣" : n.kind === "money" ? "₹" : n.kind === "chat" ? <ChatIcon size={20} /> : n.kind === "heart" ? "♥" : "%"}</span>
            <span><strong>{n.title}</strong><small>{n.body}</small></span>
            <time>{n.time}</time>
          </button>
        ))}
      </div>
    </main>
  );
}

// ---- Addresses: cards, share and edit ----------------------------------------------------------------------------------------
type Address = { id: number; label: string; name: string; line1: string; line2: string; phone: string; primary: boolean };
const seedAddresses: Address[] = [
  { id: 1, label: "Hostel room", name: "Kabir Mehta", line1: "Room 214, Block C, Anant Hostel", line2: "ANANT University Campus", phone: "+91 98765 43210", primary: true },
  { id: 2, label: "Campus pick-up", name: "Kabir Mehta", line1: "Library Gate, Locker 7", line2: "ANANT University Campus", phone: "+91 98765 43210", primary: false },
  { id: 3, label: "Home", name: "Kabir Mehta", line1: "12, Shivalik Heights, Navrangpura", line2: "Ahmedabad 380009", phone: "+91 98765 43210", primary: false },
];
export function AddressesView() {
  const [list, setList] = useState(seedAddresses);
  const [editing, setEditing] = useState<Address | null>(null);
  const [sharing, setSharing] = useState<Address | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const save = (a: Address) => { setList((l) => (l.some((x) => x.id === a.id) ? l.map((x) => (x.id === a.id ? a : x)) : [...l, a]).map((x) => (a.primary && x.id !== a.id ? { ...x, primary: false } : x))); setEditing(null); };
  if (editing) {
    const set = (k: keyof Address, v: string | boolean) => setEditing({ ...editing, [k]: v } as Address);
    return (
      <main className="screen-content nx-view ss-view nx-form">
        <div className="nx-topbar"><h2>{list.some((x) => x.id === editing.id) ? "Edit address" : "New address"}</h2></div>
        <div className="ss-form">
          <label><span>LABEL</span><input onChange={(e) => set("label", e.target.value)} value={editing.label} /></label>
          <label><span>FULL NAME</span><input onChange={(e) => set("name", e.target.value)} value={editing.name} /></label>
          <label><span>ADDRESS</span><input onChange={(e) => set("line1", e.target.value)} value={editing.line1} /></label>
          <label><span>CAMPUS / CITY</span><input onChange={(e) => set("line2", e.target.value)} value={editing.line2} /></label>
          <label><span>PHONE</span><input inputMode="tel" onChange={(e) => set("phone", e.target.value)} value={editing.phone} /></label>
        </div>
        <label className="nx-check"><input checked={editing.primary} onChange={(e) => set("primary", e.target.checked)} type="checkbox" /> Use as my default address</label>
        <div className="nx-two">
          <button className="nx-btn line" onClick={() => setEditing(null)} type="button">Cancel</button>
          <button className="nx-btn order-action" onClick={() => save(editing)} type="button">Save address</button>
        </div>
      </main>
    );
  }
  return (
    <main className="screen-content nx-view">
      <div className="nx-topbar"><h2>Addresses</h2></div>
      <p className="nx-sub">Where your orders can be delivered or picked up.</p>
      <div className="nx-list">
        {list.map((a) => (
          <article className={`nx-addr ${a.primary ? "primary" : ""}`} key={a.id}>
            <header><strong>{a.label}</strong>{a.primary && <span className="nx-pill">DEFAULT</span>}</header>
            <p>{a.name}<br />{a.line1}<br />{a.line2}<br />{a.phone}</p>
            <div className="nx-two">
              <button className="nx-btn line" onClick={() => setEditing(a)} type="button">Edit</button>
              <button className="nx-btn line" onClick={() => setSharing(a)} type="button">Share</button>
            </div>
          </article>
        ))}
      </div>
      <button className="nx-btn order-action wide" onClick={() => setEditing({ id: Date.now(), label: "", name: "Kabir Mehta", line1: "", line2: "", phone: "+91 98765 43210", primary: false })} type="button">＋ Add new address</button>
      {sharing && (
        <div className="nx-sheet-layer">
          <button aria-label="Close" className="nx-scrim" onClick={() => { setSharing(null); setSent(null); }} type="button" />
          <section aria-label="Share address" className="nx-sheet" role="dialog">
            <strong>Share “{sharing.label}”</strong>
            <p>{sharing.line1}, {sharing.line2}</p>
            <div className="nx-share">
              {["Aanya Shah", "Rhea Patel", "Maya Chen", "Copy text"].map((n) => (
                <button className={sent === n ? "sent" : ""} key={n} onClick={() => setSent(n)} type="button"><i>{n === "Copy text" ? "⧉" : n[0]}</i>{sent === n ? (n === "Copy text" ? "Copied ✓" : "Sent ✓") : n}</button>
              ))}
            </div>
            <button className="nx-btn line wide" onClick={() => { setSharing(null); setSent(null); }} type="button">Done</button>
          </section>
        </div>
      )}
    </main>
  );
}

// ---- Bank payments: Paid / Paid out -------------------------------------------------------------------------------------------
export type Payout = { id: string; title: string; sub: string; amount: number };
const paidRows = [
  { id: "NU-2041", title: "Mahogany Soy Candle + 1 more", sub: "UPI · kabir@okaxis · 09 Oct", amount: 1497 },
  { id: "NU-2038", title: "Grey Knit Sweater", sub: "UPI · kabir@okaxis · 08 Oct", amount: 699 },
  { id: "NU-2033", title: "Crown Stud Earrings + 2 more", sub: "UPI · kabir@okaxis · 07 Oct", amount: 1797 },
  { id: "NU-2029", title: "White Sneakers + 1 more", sub: "Card ••4821 · 05 Oct", amount: 1448 },
];
const refundRows: Payout[] = [{ id: "NU-2022", title: "Refund · Hand-painted Denim", sub: "Order cancelled · to HDFC ••4821 · 03 Oct", amount: 799 }];
export function BankPaymentsView({ payouts }: { payouts: Payout[] }) {
  const [tab, setTab] = useState<"paid" | "out">("paid");
  const out = [...payouts, ...refundRows];
  const paid = paidRows.reduce((n, r) => n + r.amount, 0), sent = out.reduce((n, r) => n + r.amount, 0);
  return (
    <main className="screen-content nx-view">
      <div className="nx-topbar"><h2>Bank Payments</h2></div>
      <section className="nx-bank"><span>LINKED</span><strong>UPI · kabir@okaxis</strong><small>HDFC Bank ••4821 · verified</small></section>
      <div aria-label="Payments" className="nx-seg" role="tablist">
        <button aria-selected={tab === "paid"} className={tab === "paid" ? "on" : ""} onClick={() => setTab("paid")} role="tab" type="button">Paid</button>
        <button aria-selected={tab === "out"} className={tab === "out" ? "on" : ""} onClick={() => setTab("out")} role="tab" type="button">Paid out</button>
      </div>
      <p className="nx-sub">{tab === "paid" ? `${rupee(paid)} paid for orders this month` : `${rupeeDec(sent)} sent to your bank or UPI`}</p>
      <div className="nx-list">
        {tab === "paid"
          ? paidRows.map((r) => <article className="nx-tx" key={r.id}><span className="nx-dot out" aria-hidden="true">↑</span><div><strong>{r.title}</strong><small>{r.sub} · {r.id}</small></div><b>−{rupee(r.amount)}</b></article>)
          : out.map((r) => <article className="nx-tx" key={r.id}><span className="nx-dot in" aria-hidden="true">↓</span><div><strong>{r.title}</strong><small>{r.sub}</small></div><b className="in">+{rupeeDec(r.amount)}</b></article>)}
      </div>
    </main>
  );
}

// ---- Messages: Buying / Selling toggle, then a conversation ----------------------------------------------------------------
export type Msg = { from: "me" | "them"; text: string; time: string };
export type ThreadProduct = { title: string; price: number; image: string; blurb: string };
export type Thread = { id: number; role: "buying" | "selling"; name: string; avatar?: string; about: string; unread: number; msgs: Msg[]; replies: string[]; product?: ThreadProduct };
export const seedThreads: Thread[] = [
  { id: 1, role: "buying", name: "Maya Chen", avatar: "./assets/166ae.png", about: "Cozy Cloud Beanie · ₹699", unread: 1, product: { title: "Cozy Cloud Beanie", price: 699, image: "./assets/beanie.jpg", blurb: "Knitwear, handmade on campus." }, msgs: [
    { from: "me", text: "Hi Maya! Is the Cozy Cloud Beanie still available?", time: "9:12" },
    { from: "them", text: "Yes, still available! I can bring it to the canteen.", time: "9:20" }], replies: ["Perfect, see you then!", "Sounds good to me!", "Great, I will message you when I get there."] },
  { id: 2, role: "buying", name: "Studio Terra", about: "Speckled Clay Mug · ₹299", unread: 0, product: { title: "Speckled Clay Mug", price: 299, image: "./assets/e7eaa.png", blurb: "Ceramic collection, speckled cream." }, msgs: [
    { from: "me", text: "Does the mug come in blue as well?", time: "Yesterday" },
    { from: "them", text: "Only speckled cream for now, a blue glaze is coming next week.", time: "Yesterday" }], replies: ["Sure, I will keep one aside for you.", "Sounds good, thanks for waiting!"] },
  { id: 3, role: "selling", name: "Aanya Shah", about: "Risograph Mini Zine · ₹180", unread: 1, product: { title: "Risograph Mini Zine", price: 180, image: "./assets/43074.png", blurb: "Print collection, limited run." }, msgs: [
    { from: "them", text: "Hi! Is the zine ready for pick-up?", time: "10:02" }], replies: ["Great, I will collect it from the library gate.", "Thank you! Will leave a review.", "Perfect, see you then!"] },
  { id: 4, role: "selling", name: "Rhea Patel", about: "Custom Portrait Slot · ₹500", unread: 1, product: { title: "Custom Portrait Slot", price: 500, image: "./assets/14334.png", blurb: "Portrait service, made to order." }, msgs: [
    { from: "them", text: "Can the portrait slot be this weekend?", time: "8:40" }], replies: ["Thank you! Sending the reference photo now.", "Perfect, that works for me!"] },
];

const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");
const Avatar = ({ name, src }: { name: string; src?: string }) => (src ? <span className="nx-av"><img alt="" src={src} /></span> : <span className="nx-av">{initials(name)}</span>);

export function MessagesView({ threads, sellerMode, onOpen }: { threads: Thread[]; sellerMode: boolean; onOpen: (id: number) => void }) {
  const [role, setRole] = useState<"buying" | "selling">(sellerMode ? "selling" : "buying");
  const shown = threads.filter((t) => t.role === role);
  return (
    <main className="screen-content nx-view">
      <div className="nx-topbar"><h2>Messages</h2></div>
      <div aria-label="Message type" className="nx-seg two-icons" role="tablist">
        <button aria-selected={role === "buying"} className={role === "buying" ? "on" : ""} onClick={() => setRole("buying")} role="tab" type="button"><BagIcon size={18} />Buying</button>
        <button aria-selected={role === "selling"} className={role === "selling" ? "on" : ""} onClick={() => setRole("selling")} role="tab" type="button"><StoreIcon size={18} />Selling</button>
      </div>
      <div className="nx-list">
        {shown.map((t) => {
          const last = t.msgs[t.msgs.length - 1] ?? { from: "them" as const, text: "Say hello to start the collab", time: "" };
          return (
            <button className="nx-thread" key={t.id} onClick={() => onOpen(t.id)} type="button">
              <Avatar name={t.name} src={t.avatar} />
              <span><strong>{t.name}</strong><small>{t.about}</small><em>{last.from === "me" ? "You: " : ""}{last.text}</em></span>
              <time>{last.time}{t.unread > 0 && <b>{t.unread}</b>}</time>
            </button>
          );
        })}
      </div>
    </main>
  );
}

export function ChatView({ thread, onSend }: { thread: Thread; onSend: (id: number, text: string) => void }) {
  const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [thread.msgs.length]);
  const send = (t: string) => { const v = t.trim(); if (!v) return; onSend(thread.id, v); setText(""); };
  const quick = thread.about === "Collaboration" ? ["Want to collab?", "A joint drop?", "Share your idea"] : thread.role === "buying" ? ["Is it still available?", "Can we meet at the library?", "Thanks!"] : ["Ready for pick-up", "Sure, that works", "Thank you!"];
  return (
    <>
      <main className="screen-content nx-view nx-chat">
        {thread.product && (
          <article aria-label="Pinned product" className="chat-pin">
            <span className="chat-pin-img"><img alt="" src={thread.product.image} /></span>
            <div className="chat-pin-card">
              <em>AVAILABLE</em>
              <strong>{thread.product.title}</strong>
              <small>{thread.product.blurb}</small>
              <b>{rupee(thread.product.price)}</b>
            </div>
          </article>
        )}
        <div aria-hidden="true" className="chat-today"><i /><span>TODAY</span><i /></div>
        <div aria-live="polite" className="nx-bubbles">
          {thread.msgs.map((m, i) => <p className={m.from} key={i}>{m.text}<time>{m.time}</time></p>)}
          <div ref={end} />
        </div>
      </main>
      <div className="nx-composer">
        <div className="nx-quick">{quick.map((q) => <button key={q} onClick={() => send(q)} type="button">{q}</button>)}</div>
        <form onSubmit={(e) => { e.preventDefault(); send(text); }}>
          <input aria-label="Write a message" onChange={(e) => setText(e.target.value)} placeholder="Write a message" value={text} />
          <button aria-label="Send" className="chat-send" disabled={!text.trim()} type="submit"><svg aria-hidden="true" height="18" viewBox="0 0 24 24" width="18"><path d="M3 11.5 21 3l-5.5 18-4-7.5Z" fill="#17120e" /></svg></button>
        </form>
      </div>
    </>
  );
}

// ---- Cash out: choose UPI, formal steps, verified ---------------------------------------------------------------------------
const upis = [{ id: "kabir@okaxis", bank: "Axis Bank" }, { id: "kabir@ybl", bank: "PhonePe · HDFC Bank" }];
export function CashOutView({ balance, onConfirm }: { balance: number; onConfirm: (upi: string) => void }) {
  const [upi, setUpi] = useState(upis[0].id);
  return (
    <main className="screen-content nx-view">
      <div className="nx-topbar"><h2>Cash Out</h2></div>
      <section className="nx-cash"><span>AVAILABLE TO CASH OUT</span><strong>{rupeeDec(balance)}</strong></section>
      <p className="nx-label">SEND MONEY TO</p>
      <div className="nx-list" role="radiogroup" aria-label="UPI ID">
        {upis.map((u) => (
          <button aria-checked={upi === u.id} className={`nx-radio ${upi === u.id ? "on" : ""}`} key={u.id} onClick={() => setUpi(u.id)} role="radio" type="button"><i aria-hidden="true" /><span><strong>{u.id}</strong><small>{u.bank}</small></span></button>
        ))}
      </div>
      <p className="nx-sub">The money reaches your UPI right away. NearU does not charge a fee.</p>
      <button className="nx-btn payment-action wide" disabled={balance <= 0} onClick={() => onConfirm(upi)} type="button">Cash out {rupeeDec(balance)}</button>
    </main>
  );
}

export function PayoutProcessingView({ upi, amount, onDone }: { upi: string; amount: number; onDone: () => void }) {
  const [step, setStep] = useState(0);
  const labels = ["Request received", "Checking your UPI ID", "Money sent to " + upi, "Verified by your bank"];
  useEffect(() => {
    if (step >= labels.length) { const t = window.setTimeout(onDone, 700); return () => window.clearTimeout(t); }
    const t = window.setTimeout(() => setStep((s) => s + 1), 1100);
    return () => window.clearTimeout(t);
  }, [step]);
  return (
    <main className="nx-process">
      <h2>Sending {rupeeDec(amount)}</h2>
      <p>Please keep this screen open for a moment.</p>
      <ol>
        {labels.map((l, i) => <li className={i < step ? "done" : i === step ? "now" : ""} key={l}><i aria-hidden="true">{i < step ? "✓" : ""}</i>{l}</li>)}
      </ol>
      {step >= 3 && <div className="nx-upi-toast" role="status"><b>UPI</b><span>{rupeeDec(amount)} received from NearU</span></div>}
    </main>
  );
}

export function PayoutDoneView({ upi, amount, onProfile }: { upi: string; amount: number; onProfile: () => void }) {
  return (
    <main className="nx-done">
      <span aria-hidden="true" className="nx-badge"><VerifiedSeal size={110} /></span>
      <h2>PAYOUT<br />VERIFIED</h2>
      <strong>{rupeeDec(amount)}</strong>
      <dl>
        <div><dt>To</dt><dd>{upi}</dd></div>
        <div><dt>UPI ref</dt><dd>4208 1735 0291</dd></div>
        <div><dt>Date</dt><dd>Sat, 10 Oct · 10:14</dd></div>
        <div><dt>Status</dt><dd>Received</dd></div>
      </dl>
      <button className="order-action nx-btn wide" onClick={onProfile} type="button">Back to Profile</button>
    </main>
  );
}

// ---- Revenue report ------------------------------------------------------------------------------------------------------------
const reportData = {
  week: { label: "This week", rows: [["Mon", 180], ["Tue", 0], ["Wed", 250], ["Thu", 250], ["Fri", 500], ["Sat", 0], ["Sun", 0]] as [string, number][], sales: [
    ["09 Oct", "Aanya Shah", "Risograph Mini Zine", 180, "Settled"], ["08 Oct", "Dev Rao", "Campus Poster Pack", 250, "Settled"], ["07 Oct", "Isha Nair", "Campus Poster Pack", 250, "Settled"], ["05 Oct", "Rhea Patel", "Custom Portrait Slot", 500, "Pending"]] },
  last: { label: "Last week", rows: [["Mon", 360], ["Tue", 180], ["Wed", 0], ["Thu", 250], ["Fri", 180], ["Sat", 500], ["Sun", 0]] as [string, number][], sales: [
    ["02 Oct", "Neel Joshi", "Custom Portrait Slot", 500, "Settled"], ["01 Oct", "Kiara Bose", "Risograph Mini Zine", 180, "Settled"], ["30 Sep", "Dev Rao", "Campus Poster Pack", 250, "Settled"], ["28 Sep", "Aanya Shah", "Risograph Mini Zine", 360, "Settled"]] },
};
export function ReportView({ available }: { available: number }) {
  const [p, setP] = useState<"week" | "last">("week");
  const [saved, setSaved] = useState(false);
  const d = reportData[p];
  const total = d.sales.reduce((n: number, s) => n + (s[3] as number), 0);
  const max = Math.max(...d.rows.map((r) => r[1]), 1);
  return (
    <main className="screen-content nx-view">
      <div className="nx-topbar"><h2>Sales Report</h2></div>
      <div aria-label="Period" className="nx-seg" role="tablist">
        <button aria-selected={p === "week"} className={p === "week" ? "on" : ""} onClick={() => setP("week")} role="tab" type="button">This week</button>
        <button aria-selected={p === "last"} className={p === "last" ? "on" : ""} onClick={() => setP("last")} role="tab" type="button">Last week</button>
      </div>
      <section className="nx-kpis">
        <article><span>Revenue</span><strong>{rupee(total)}</strong></article>
        <article><span>Orders</span><strong>{d.sales.length}</strong></article>
        <article><span>Available</span><strong>{rupeeDec(available)}</strong></article>
      </section>
      <section className="nx-chart" role="img" aria-label={`Daily revenue, ${d.label}`}>
        {d.rows.map(([day, v]) => <div key={day}><i style={{ height: Math.max(4, (v / max) * 100) + "%" }} /><b>{v ? rupee(v) : ""}</b><span>{day}</span></div>)}
      </section>
      <p className="nx-label">SALES</p>
      <div className="nx-list">
        {d.sales.map((s) => (
          <article className="nx-tx" key={`${s[0]}${s[1]}`}><span className="nx-dot in" aria-hidden="true">₹</span><div><strong>{s[2]}</strong><small>{s[1]} · {s[0]} · {s[4]}</small></div><b className="in">+{rupee(s[3] as number)}</b></article>
        ))}
      </div>
      <button className="nx-btn order-action wide" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 2000); }} type="button">{saved ? "Report saved ✓" : "Download report"}</button>
    </main>
  );
}

// ---- Add listing: upload a product, set stock ----------------------------------------------------------------------------------
export type Listing = { image: string; title: string; price: number; inStock: boolean; stock: number; sold: number };
const listCats = ["Handmade", "Vintage", "Textbooks", "Tech", "Dorm Decor", "Services"];
export function AddListingView({ onPublish }: { onPublish: (l: Listing) => void }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [cat, setCat] = useState("Handmade");
  const [inStock, setInStock] = useState(true);
  const [qty, setQty] = useState(5);
  const file = useRef<HTMLInputElement>(null);
  const [hint, setHint] = useState(false);
  const ok = !!photo && title.trim() && Number(price) > 0 && Number(price) < 800;
  const pick = (f?: File | null) => { if (f) setPhoto(URL.createObjectURL(f)); };
  return (
    <main className="screen-content ss-view nx-form">
      <h2 className="ss-title">Add Listing</h2>
      <input accept="image/*" aria-label="Upload product photo" className="sr-only" onChange={(e) => pick(e.target.files?.[0])} ref={file} type="file" />
      <div className={`ss-cover nx-photo ${photo ? "has-photo" : ""}`} onClick={() => file.current?.click()} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); file.current?.click(); } }} role="button" tabIndex={0} aria-label={photo ? "Change product photo" : "Upload product photo"}>
        {photo ? <img alt="Product photo" className="ss-cover-img" src={photo} /> : <><img alt="" src="./assets/a0a11.svg" /><span>UPLOAD PRODUCT PHOTO</span></>}
      </div>
      <button className="nx-link center" onClick={() => setPhoto(photo ? null : "./assets/d495f.png")} type="button">{photo ? "Remove photo" : "No photo handy? Use a sample"}</button>
      <div className="ss-form">
        <label><span>PRODUCT NAME</span><input onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Speckled Clay Mug" value={title} /></label>
        <label><span>PRICE (₹)</span><input inputMode="numeric" onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, ""))} placeholder="e.g. 599" value={price} /></label>
        <div className="ss-tags-field"><span>CATEGORY</span>
          <div className="nx-chips">{listCats.map((c) => <button aria-pressed={cat === c} className={cat === c ? "on" : ""} key={c} onClick={() => setCat(c)} type="button">{c}</button>)}</div>
        </div>
        <div className="nx-stock">
          <div><strong>{inStock ? "In stock" : "Out of stock"}</strong><small>{inStock ? "Buyers can add it to their cart." : "Shown as sold out until you switch it on."}</small></div>
          <button aria-label="In stock" aria-pressed={inStock} className={`mini-toggle ${inStock ? "active" : ""}`} onClick={() => setInStock(!inStock)} type="button"><i /></button>
        </div>
        {inStock && (
          <div className="nx-qty"><span>UNITS AVAILABLE</span>
            <div><button aria-label="Fewer" disabled={qty <= 1} onClick={() => setQty(qty - 1)} type="button">−</button><output>{qty}</output><button aria-label="More" onClick={() => setQty(qty + 1)} type="button">+</button></div>
          </div>
        )}
      </div>
      {hint && !ok && <p className="nx-hint" role="alert">Add a photo, a name and a price (under ₹800) to publish.</p>}
      <button className="nx-btn order-action wide" onClick={() => { if (!ok) { setHint(true); return; } onPublish({ image: photo!, title: title.trim(), price: Number(price), inStock, stock: qty, sold: 0 }); }} type="button">Publish listing</button>
    </main>
  );
}
