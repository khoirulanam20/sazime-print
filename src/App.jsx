import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import {
  LayoutDashboard, ShoppingCart, Box, ScanLine, Settings, LogOut, ChevronRight,
  TrendingUp, AlertCircle, CheckCircle2, Search, Filter, Plus,
  Download, ArrowLeft, Package, ShoppingBag, ExternalLink, ChevronDown,
  Wallet, FileSpreadsheet, Edit3, X, Eye, Calendar, Share2, RefreshCw,
  Camera, Zap, Key, User, Truck, MapPin, CreditCard, Clock, FileText,
  CheckSquare, Square, QrCode, Keyboard, Phone, Printer, Menu, Save,
  ArrowRightLeft, BadgePercent, Trash2, Banknote, Landmark, Layers, History, Scissors, Database, FileBarChart, Calculator, Receipt
} from 'lucide-react';

// --- KONFIGURASI TEMA (SAZIME STYLE) ---
const THEME = {
  primary: 'bg-red-600',
  primaryHover: 'hover:bg-red-700',
  primaryText: 'text-red-600',
  primaryBorder: 'border-red-600',
  primaryLight: 'bg-red-50',
  primaryLightText: 'text-red-600',
  secondary: 'bg-slate-900',
  secondaryText: 'text-slate-900',
  headerMobile: 'bg-red-700',
  bottomNav: 'bg-red-700',
};

// --- HELPER FUNCTIONS ---
const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const generateInvoiceCode = (prefix = 'INV') => {
  const date = new Date();
  const ymd = date.toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${ymd}-${random}`;
};

// --- SUB-KOMPONEN UI ---

const Sidebar = ({ activeMenu, setActiveMenu }) => (
  <aside className={`hidden lg:flex w-64 ${THEME.secondary} text-white h-screen fixed left-0 top-0 flex-col z-30 shadow-2xl`}>
    <div className="p-6 border-b border-slate-700/50">
      <h1 className="text-2xl font-black tracking-tighter flex items-center">
        <span className="text-red-500 mr-1">SAZIME</span>
        <span className="text-white italic">PRINT</span>
      </h1>
      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold opacity-80">
        Printing Management
      </p>
    </div>

    <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
      {/* GROUP: OPERASIONAL */}
      <div className="mb-2 px-3 text-[10px] font-black uppercase text-slate-500 tracking-widest mt-2">Operasional</div>
      {[
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'nota-pelanggan', icon: ShoppingCart, label: 'Nota Pelanggan (Jual)' },
        { id: 'nota-supplier', icon: Truck, label: 'Nota Supplier (Beli)' },
        { id: 'pengeluaran-lain', icon: FileText, label: 'Pengeluaran Ops' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveMenu(item.id)}
          className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 mb-1 group ${
            activeMenu === item.id
              ? `${THEME.primary} text-white shadow-lg shadow-red-900/20`
              : 'hover:bg-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <item.icon className={`w-4 h-4 mr-3 transition-transform ${activeMenu === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className="font-bold text-xs tracking-wide">{item.label}</span>
        </button>
      ))}

      {/* GROUP: DATABASE */}
      <div className="mb-2 px-3 text-[10px] font-black uppercase text-slate-500 tracking-widest mt-6">Database & Stok</div>
      {[
        { id: 'database-produk', icon: Database, label: 'Database Produk' },
        { id: 'database-vendor', icon: Truck, label: 'Database Vendor' },
        { id: 'master-bahan', icon: Layers, label: 'Master Bahan Baku' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveMenu(item.id)}
          className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 mb-1 group ${
            activeMenu === item.id
              ? `${THEME.primary} text-white shadow-lg shadow-red-900/20`
              : 'hover:bg-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <item.icon className={`w-4 h-4 mr-3 transition-transform ${activeMenu === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className="font-bold text-xs tracking-wide">{item.label}</span>
        </button>
      ))}

      {/* GROUP: LAPORAN */}
      <div className="mb-2 px-3 text-[10px] font-black uppercase text-slate-500 tracking-widest mt-6">Laporan</div>
      {[
        { id: 'rekap-cashflow', icon: FileBarChart, label: 'Rekap Cashflow' },
        { id: 'withdraw', icon: ArrowRightLeft, label: 'Kas & Withdraw' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveMenu(item.id)}
          className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 mb-1 group ${
            activeMenu === item.id
              ? `${THEME.primary} text-white shadow-lg shadow-red-900/20`
              : 'hover:bg-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <item.icon className={`w-4 h-4 mr-3 transition-transform ${activeMenu === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className="font-bold text-xs tracking-wide">{item.label}</span>
        </button>
      ))}
    </nav>
  </aside>
);

const BottomNavbar = ({ activeMenu, setActiveMenu }) => (
  <nav className={`lg:hidden fixed bottom-0 left-0 right-0 ${THEME.bottomNav} text-white flex justify-around p-2 z-[60] pb-safe-area shadow-[0_-4px_20px_rgba(0,0,0,0.15)]`}>
    {[
      { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
      { id: 'nota-pelanggan', icon: ShoppingCart, label: 'Jual' },
      { id: 'nota-supplier', icon: Truck, label: 'Beli' },
      { id: 'rekap-cashflow', icon: FileBarChart, label: 'Laporan' },
      { id: 'withdraw', icon: Wallet, label: 'Kas' },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => setActiveMenu(item.id)}
        className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 w-1/5 relative ${
          activeMenu === item.id
            ? 'opacity-100'
            : 'opacity-60 hover:opacity-100'
        }`}
      >
        <div className={`transition-all duration-300 ${activeMenu === item.id ? '-translate-y-1' : ''}`}>
           <item.icon className={`w-6 h-6 ${activeMenu === item.id ? 'scale-110 drop-shadow-md' : ''}`} />
        </div>
        <span className={`text-[9px] font-bold mt-1 uppercase tracking-tight transition-all ${activeMenu === item.id ? 'opacity-100 font-black' : 'opacity-0 h-0 overflow-hidden'}`}>
          {item.label}
        </span>
      </button>
    ))}
  </nav>
);

const FilterBar = ({
  startDate, setStartDate,
  endDate, setEndDate,
  dateFilterMode, setDateFilterMode,
  statusFilter, setStatusFilter,
  showStatus = true
}) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-end">
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center">
          <Calendar className="w-3 h-3 mr-1" /> Periode Laporan
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
           <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
              {[{ k: 'day', l: 'Hari' }, { k: 'month', l: 'Bulan' }, { k: 'year', l: 'Tahun' }].map((m) => (
                <button
                  key={m.k}
                  onClick={() => {
                    setDateFilterMode(m.k);
                    const now = new Date();
                    if (m.k === 'day') {
                      const d = now.toISOString().slice(0, 10);
                      setStartDate(d); setEndDate(d);
                    } else if (m.k === 'month') {
                       const y = now.getFullYear();
                       const mm = String(now.getMonth() + 1).padStart(2, '0');
                       setStartDate(`${y}-${mm}-01`);
                       setEndDate(`${y}-${mm}-${String(new Date(y, now.getMonth() + 1, 0).getDate()).padStart(2, '0')}`);
                    } else {
                       const y = now.getFullYear();
                       setStartDate(`${y}-01-01`); setEndDate(`${y}-12-31`);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    dateFilterMode === m.k ? 'bg-white shadow-sm text-red-600 ring-1 ring-slate-100' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {m.l}
                </button>
              ))}
            </div>
            {dateFilterMode === 'day' && <input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setEndDate(e.target.value); }} className="flex-1 bg-slate-50 rounded-xl text-xs font-bold py-2 px-3 border border-slate-100 outline-none focus:ring-2 focus:ring-red-500" />}
            {dateFilterMode === 'month' && <input type="month" value={startDate.slice(0, 7)} onChange={(e) => { const [y, m] = e.target.value.split('-'); setStartDate(`${y}-${m}-01`); setEndDate(`${y}-${m}-${new Date(y, m, 0).getDate()}`); }} className="flex-1 bg-slate-50 rounded-xl text-xs font-bold py-2 px-3 border border-slate-100 outline-none focus:ring-2 focus:ring-red-500" />}
            {dateFilterMode === 'year' && (
               <select value={startDate.slice(0, 4)} onChange={(e) => {const y=e.target.value; setStartDate(`${y}-01-01`); setEndDate(`${y}-12-31`);}} className="flex-1 bg-slate-50 rounded-xl text-xs font-bold py-2 px-3 border border-slate-100 outline-none">
                 {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
               </select>
            )}
        </div>
      </div>
      
      {showStatus && (
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center">
            <Filter className="w-3 h-3 mr-1" /> Status Pembayaran
          </label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full bg-slate-50 rounded-xl text-xs font-bold py-2.5 px-3 border border-slate-100 outline-none focus:ring-2 focus:ring-red-500">
            <option value="all">Semua Status</option>
            <option value="lunas">Lunas</option>
            <option value="belum_lunas">Belum Lunas</option>
          </select>
        </div>
      )}
    </div>
  );
};

const SearchInput = ({ placeholder, value, onChange }) => (
  <div className="relative">
    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
    <input 
      type="text" 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-red-500 transition"
    />
  </div>
);

// --- MAIN APP ---

const App = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  // --- STATE DATA ---
  const [products, setProducts] = useState([
    { id: 1, name: 'MMT BANNER 280 GR', unit: 'METER', width: 0, length: 0, area: 0, qty: 2240, price: 25000, costPrice: 18000, vendorId: 5, vendorName: 'MPS (Modern Printing Supplies)', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 2, name: 'MMT BANNER 480 GR', unit: 'METER', width: 0, length: 0, area: 0, qty: 420, price: 35000, costPrice: 25000, vendorId: 5, vendorName: 'MPS (Modern Printing Supplies)', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 3, name: 'STICKER ORAJET - 1,06', unit: 'METER', width: 106, length: 0, area: 0, qty: 53, price: 45000, costPrice: 32000, vendorId: 5, vendorName: 'MPS (Modern Printing Supplies)', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 4, name: 'STICKER MASTER - 1,26', unit: 'METER', width: 126, length: 0, area: 0, qty: 63, price: 55000, costPrice: 40000, vendorId: 2, vendorName: 'PT. Grafika Indonesia', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 5, name: 'STICKER CINA - 1,56', unit: 'METER', width: 156, length: 0, area: 0, qty: 78, price: 40000, costPrice: 28000, vendorId: 3, vendorName: 'CV. Digital Print Supplies', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 6, name: 'LAMINASI GLOSS 100 GR - 1,06', unit: 'METER', width: 106, length: 0, area: 0, qty: 53, price: 15000, costPrice: 10000, vendorId: 5, vendorName: 'MPS (Modern Printing Supplies)', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 7, name: 'LAMINASI GLOSS 120 GR - 1,06', unit: 'METER', width: 106, length: 0, area: 0, qty: 53, price: 18000, costPrice: 12000, vendorId: 5, vendorName: 'MPS (Modern Printing Supplies)', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 8, name: 'LAMINASI DOFF 100 GR - 1,06', unit: 'METER', width: 106, length: 0, area: 0, qty: 53, price: 16000, costPrice: 11000, vendorId: 1, vendorName: 'Toko Warna Abadi', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 9, name: 'LAMINASI DOFF 120 GR - 1,06', unit: 'METER', width: 106, length: 0, area: 0, qty: 53, price: 19000, costPrice: 13000, vendorId: 1, vendorName: 'Toko Warna Abadi', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 10, name: 'JASA CUTTING STICKER - 1,06', unit: 'METER', width: 106, length: 0, area: 0, qty: -200, price: 8000, costPrice: 0, vendorId: 0, vendorName: 'Internal', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 11, name: 'ALAT ROLL UP BANNER 60 X 160 CM', unit: 'PCS', width: 60, length: 160, area: 0, qty: 20, price: 150000, costPrice: 120000, vendorId: 4, vendorName: 'Toko Alat Tulis & Printing', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 12, name: 'ALBATROS 0,63', unit: 'METER', width: 63, length: 0, area: 0, qty: 63, price: 25000, costPrice: 18000, vendorId: 2, vendorName: 'PT. Grafika Indonesia', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 13, name: 'ALAT X BANNER 60 X 160 CM', unit: 'PCS', width: 60, length: 160, area: 0, qty: 10, price: 200000, costPrice: 160000, vendorId: 4, vendorName: 'Toko Alat Tulis & Printing', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 14, name: 'RING KELING BANNER', unit: 'PACK', width: 0, length: 0, area: 0, qty: 5, price: 25000, costPrice: 15000, vendorId: 4, vendorName: 'Toko Alat Tulis & Printing', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 15, name: 'DTF FILM', unit: 'M. LARI', width: 0, length: 0, area: 0, qty: 100, price: 50000, costPrice: 35000, vendorId: 3, vendorName: 'CV. Digital Print Supplies', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 16, name: 'TINTA INDOOR', unit: 'PCS', width: 0, length: 0, area: 0, qty: 4, price: 500000, costPrice: 350000, vendorId: 5, vendorName: 'MPS (Modern Printing Supplies)', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 17, name: 'POWDER DTF 1 KG', unit: 'PCS', width: 0, length: 0, area: 0, qty: 5, price: 250000, costPrice: 180000, vendorId: 3, vendorName: 'CV. Digital Print Supplies', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 18, name: 'JAHIT KELILING', unit: 'M. KEL', width: 0, length: 0, area: 0, qty: -20, price: 5000, costPrice: 0, vendorId: 0, vendorName: 'Internal', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
    { id: 19, name: 'JASA DESAIN', unit: 'LEVEL', width: 0, length: 0, area: 0, qty: -20, price: 50000, costPrice: 0, vendorId: 0, vendorName: 'Internal', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' },
  ]);

  const [materials, setMaterials] = useState([
    { id: 1, name: 'Tinta Ecosolvent Cyan', unit: 'LITER', qty: 10, costPrice: 250000, vendorId: 5, vendorName: 'MPS (Modern Printing Supplies)' },
    { id: 2, name: 'Tinta Ecosolvent Magenta', unit: 'LITER', qty: 8, costPrice: 250000, vendorId: 5, vendorName: 'MPS (Modern Printing Supplies)' },
    { id: 3, name: 'Tinta Ecosolvent Yellow', unit: 'LITER', qty: 9, costPrice: 250000, vendorId: 5, vendorName: 'MPS (Modern Printing Supplies)' },
    { id: 4, name: 'Tinta Ecosolvent Black', unit: 'LITER', qty: 7, costPrice: 250000, vendorId: 5, vendorName: 'MPS (Modern Printing Supplies)' },
    { id: 5, name: 'Mata Ayam (Eyelet)', unit: 'PACK', qty: 50, costPrice: 15000, vendorId: 4, vendorName: 'Toko Alat Tulis & Printing' },
  ]);

  const [vendors, setVendors] = useState([
    { id: 1, name: 'Toko Warna Abadi', contact: '08123456789', email: 'warnaabadi@gmail.com', address: 'Jl. Maju Mundur No. 1, Jakarta', category: 'Bahan Baku', status: 'Aktif' },
    { id: 2, name: 'PT. Grafika Indonesia', contact: '08198765432', email: 'info@grafikaindonesia.com', address: 'Jl. Sudirman No. 45, Bandung', category: 'Bahan Baku', status: 'Aktif' },
    { id: 3, name: 'CV. Digital Print Supplies', contact: '08134567890', email: 'sales@digitalprint.co.id', address: 'Jl. Malioboro No. 20, Yogyakarta', category: 'Bahan Baku', status: 'Aktif' },
    { id: 4, name: 'Toko Alat Tulis & Printing', contact: '08122334455', email: 'alatprinting@gmail.com', address: 'Jl. Veteran No. 15, Surabaya', category: 'Peralatan', status: 'Aktif' },
    {
      id: 5,
      name: 'MPS (Modern Printing Supplies)',
      contact: '08155666777',
      email: 'sales@mps.co.id',
      address: 'Jl. Industri No. 88, Jakarta',
      category: 'Bahan Baku',
      status: 'Aktif',
      suppliedProducts: [
        { productId: 1, name: 'MMT BANNER 280 GR', costPrice: 18000 },
        { productId: 2, name: 'MMT BANNER 480 GR', costPrice: 25000 },
        { productId: 3, name: 'STICKER ORAJET - 1,06', costPrice: 32000 },
        { productId: 6, name: 'LAMINASI GLOSS 100 GR - 1,06', costPrice: 10000 },
        { productId: 7, name: 'LAMINASI GLOSS 120 GR - 1,06', costPrice: 12000 },
        { productId: 16, name: 'TINTA INDOOR', costPrice: 350000 },
      ]
    },
  ]);

  // Supplier-Product mapping dengan harga modal
  const [supplierProducts, setSupplierProducts] = useState([
    {
      supplierId: 5, // MPS
      supplierName: 'MPS (Modern Printing Supplies)',
      products: [
        { productId: 1, productName: 'MMT BANNER 280 GR', costPrice: 18000 },
        { productId: 2, productName: 'MMT BANNER 480 GR', costPrice: 25000 },
        { productId: 3, productName: 'STICKER ORAJET - 1,06', costPrice: 32000 },
        { productId: 6, productName: 'LAMINASI GLOSS 100 GR - 1,06', costPrice: 10000 },
        { productId: 7, productName: 'LAMINASI GLOSS 120 GR - 1,06', costPrice: 12000 },
        { productId: 16, productName: 'TINTA INDOOR', costPrice: 350000 },
      ]
    }
  ]);

  const _now = new Date();
  const currentMonthPrefix = `${_now.getFullYear()}-${String(_now.getMonth() + 1).padStart(2, '0')}`;

  const [salesInvoices, setSalesInvoices] = useState([
    { id: 'INV-20250101-1234', date: `${currentMonthPrefix}-01`, buyer: 'Budi Santoso', items: [{ productId: 1, name: 'MMT BANNER 280 GR', width: 200, length: 100, area: 2, unit: 'METER', price: 20000, qty: 1, discount: 0, subtotal: 40000 }], total: 40000, paid: 40000, remaining: 0, paymentMethod: 'Cash', status: 'lunas' },
    { id: 'INV-20250102-5678', date: `${currentMonthPrefix}-02`, buyer: 'Siti Aminah', items: [{ productId: 2, name: 'MMT BANNER 480 GR', width: 300, length: 150, area: 4.5, unit: 'METER', price: 35000, qty: 3, discount: 0, subtotal: 157500 }], total: 157500, paid: 157500, remaining: 0, paymentMethod: 'Transfer', status: 'lunas' },
    { id: 'INV-20250103-9012', date: `${currentMonthPrefix}-03`, buyer: 'Ahmad Rahman', items: [{ productId: 3, name: 'STICKER ORAJET - 1,06', width: 106, length: 200, area: 2.12, unit: 'METER', price: 45000, qty: 2, discount: 0, subtotal: 90000 }], total: 90000, paid: 90000, remaining: 0, paymentMethod: 'Cash', status: 'lunas' },
    { id: 'INV-20250104-3456', date: `${currentMonthPrefix}-04`, buyer: 'Maya Sari', items: [{ productId: 4, name: 'STICKER MASTER - 1,26', width: 126, length: 180, area: 2.268, unit: 'METER', price: 55000, qty: 4, discount: 0, subtotal: 220000 }], total: 220000, paid: 220000, remaining: 0, paymentMethod: 'Transfer', status: 'lunas' },
    { id: 'INV-20250105-7890', date: `${currentMonthPrefix}-05`, buyer: 'Rudi Hartono', items: [{ productId: 5, name: 'STICKER CINA - 1,56', width: 156, length: 220, area: 3.432, unit: 'METER', price: 40000, qty: 5, discount: 0, subtotal: 200000 }], total: 200000, paid: 200000, remaining: 0, paymentMethod: 'Cash', status: 'lunas' },
    { id: 'INV-20250106-1111', date: `${currentMonthPrefix}-06`, buyer: 'Dewi Lestari', items: [{ productId: 6, name: 'LAMINASI GLOSS 100 GR - 1,06', width: 106, length: 150, area: 1.59, unit: 'METER', price: 15000, qty: 3, discount: 0, subtotal: 45000 }], total: 45000, paid: 45000, remaining: 0, paymentMethod: 'Transfer', status: 'lunas' },
    { id: 'INV-20250107-2222', date: `${currentMonthPrefix}-07`, buyer: 'Joko Widodo', items: [{ productId: 7, name: 'LAMINASI GLOSS 120 GR - 1,06', width: 106, length: 180, area: 1.908, unit: 'METER', price: 18000, qty: 2, discount: 0, subtotal: 36000 }], total: 36000, paid: 36000, remaining: 0, paymentMethod: 'Cash', status: 'lunas' },
    { id: 'INV-20250108-3333', date: `${currentMonthPrefix}-08`, buyer: 'Nina Kartika', items: [{ productId: 11, name: 'ALAT ROLL UP BANNER 60 X 160 CM', width: 60, length: 160, area: 0, unit: 'PCS', price: 150000, qty: 8, discount: 0, subtotal: 1200000 }], total: 1200000, paid: 1200000, remaining: 0, paymentMethod: 'Transfer', status: 'lunas' },
    { id: 'INV-20250109-4444', date: `${currentMonthPrefix}-09`, buyer: 'Bayu Prasetyo', items: [{ productId: 12, name: 'ALBATROS 0,63', width: 63, length: 120, area: 0.756, unit: 'METER', price: 25000, qty: 6, discount: 0, subtotal: 150000 }], total: 150000, paid: 150000, remaining: 0, paymentMethod: 'Cash', status: 'lunas' },
    { id: 'INV-20250110-5555', date: `${currentMonthPrefix}-10`, buyer: 'Rina Amelia', items: [{ productId: 13, name: 'ALAT X BANNER 60 X 160 CM', width: 60, length: 160, area: 0, unit: 'PCS', price: 200000, qty: 7, discount: 0, subtotal: 1400000 }], total: 1400000, paid: 1400000, remaining: 0, paymentMethod: 'Transfer', status: 'lunas' },
    { id: 'INV-20250111-6666', date: `${currentMonthPrefix}-11`, buyer: 'Fajar Nugroho', items: [{ productId: 8, name: 'LAMINASI DOFF 100 GR - 1,06', width: 106, length: 100, area: 1.06, unit: 'METER', price: 16000, qty: 4, discount: 0, subtotal: 64000 }], total: 64000, paid: 64000, remaining: 0, paymentMethod: 'Cash', status: 'lunas' },
    { id: 'INV-20250112-7777', date: `${currentMonthPrefix}-12`, buyer: 'Linda Sari', items: [{ productId: 9, name: 'LAMINASI DOFF 120 GR - 1,06', width: 106, length: 140, area: 1.484, unit: 'METER', price: 19000, qty: 3, discount: 0, subtotal: 57000 }], total: 57000, paid: 57000, remaining: 0, paymentMethod: 'Transfer', status: 'lunas' },
    { id: 'INV-20250113-8888', date: `${currentMonthPrefix}-13`, buyer: 'Doni Setiawan', items: [{ productId: 10, name: 'JASA CUTTING STICKER - 1,06', width: 106, length: 80, area: 0.848, unit: 'METER', price: 8000, qty: 2, discount: 0, subtotal: 16000 }], total: 16000, paid: 16000, remaining: 0, paymentMethod: 'Cash', status: 'lunas' },
    { id: 'INV-20250114-9999', date: `${currentMonthPrefix}-14`, buyer: 'Sari Indah', items: [{ productId: 14, name: 'RING KELING BANNER', width: 0, length: 0, area: 0, unit: 'PACK', price: 25000, qty: 3, discount: 0, subtotal: 75000 }], total: 75000, paid: 75000, remaining: 0, paymentMethod: 'Transfer', status: 'lunas' },
    { id: 'INV-20250115-0001', date: `${currentMonthPrefix}-15`, buyer: 'Eko Prabowo', items: [{ productId: 1, name: 'MMT BANNER 280 GR', width: 250, length: 120, area: 3, unit: 'METER', price: 20000, qty: 2, discount: 0, subtotal: 60000 }, { productId: 3, name: 'STICKER ORAJET - 1,06', width: 106, length: 100, area: 1.06, unit: 'METER', price: 45000, qty: 1, discount: 0, subtotal: 45000 }], total: 105000, paid: 105000, remaining: 0, paymentMethod: 'Cash', status: 'lunas' },
  ]);

  const [purchaseInvoices, setPurchaseInvoices] = useState([
    { 
        id: 'BUY-20250101-9999',
        noTagihan: 'SUP-001',
        date: `${currentMonthPrefix}-01`, 
        vendor: 'Toko Warna Abadi',
        salesName: 'Andi',
        address: 'Jl. Maju Mundur No. 1',
        items: [{
            name: 'Tinta Cyan',
            unit: 'LITER',
            purchaseUnit: 'LITER',
            width: 0, length: 0, area: 0, lot: '-',
            qty: 2,
            price: 300000,
            discount: 0,
            subtotal: 600000,
            conversion: 1
        }],
        total: 600000, 
        paid: 600000, 
        remaining: 0, 
        paymentMethod: 'Transfer', 
        status: 'lunas' 
    },
  ]);

  const [expenses, setExpenses] = useState([
    { id: 'EXP-20250105-1111', date: `${currentMonthPrefix}-05`, vendor: 'PLN', item: 'Listrik Bulan Ini', price: 1500000, paymentMethod: 'Transfer' },
  ]);

  const [wallet, setWallet] = useState({ cash: 8500000, bank: 25000000 });
  const [withdrawHistory, setWithdrawHistory] = useState([
    { id: 1, date: `${currentMonthPrefix}-01`, from: 'Bank', to: 'Cash', amount: 5000000 },
  ]);

  // --- FILTER STATES ---
  const [startDate, setStartDate] = useState(`${currentMonthPrefix}-01`);
  const [endDate, setEndDate] = useState(`${currentMonthPrefix}-${String(new Date(_now.getFullYear(), _now.getMonth() + 1, 0).getDate()).padStart(2, '0')}`);
  const [dateFilterMode, setDateFilterMode] = useState('month');
  const [statusFilter, setStatusFilter] = useState('all');

  // --- MODAL & FORM STATES ---
  const [showModal, setShowModal] = useState(null); 
  const [editItem, setEditItem] = useState(null);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [isCreatingPurchase, setIsCreatingPurchase] = useState(false);

  // --- CALCULATIONS FOR DASHBOARD ---
  const filteredSales = useMemo(() => salesInvoices.filter(i => i.date >= startDate && i.date <= endDate && (statusFilter === 'all' || i.status === statusFilter)), [salesInvoices, startDate, endDate, statusFilter]);
  const filteredPurchases = useMemo(() => purchaseInvoices.filter(i => i.date >= startDate && i.date <= endDate && (statusFilter === 'all' || i.status === statusFilter)), [purchaseInvoices, startDate, endDate, statusFilter]);
  const filteredExpenses = useMemo(() => expenses.filter(i => i.date >= startDate && i.date <= endDate), [expenses, startDate, endDate]);

  const stats = useMemo(() => {
    const totalSalesPaid = filteredSales.reduce((acc, curr) => acc + curr.paid, 0);
    const totalSalesUnpaid = filteredSales.reduce((acc, curr) => acc + curr.remaining, 0);
    const totalPurchasePaid = filteredPurchases.reduce((acc, curr) => acc + curr.paid, 0);
    const totalPurchaseUnpaid = filteredPurchases.reduce((acc, curr) => acc + curr.remaining, 0);
    const totalExpenses = filteredExpenses.reduce((acc, curr) => acc + curr.price, 0);
    const totalSalesGlobal = filteredSales.reduce((acc, curr) => acc + curr.total, 0);
    const totalPurchaseGlobal = filteredPurchases.reduce((acc, curr) => acc + curr.total, 0);
    const profit = totalSalesGlobal - totalPurchaseGlobal - totalExpenses;

    return { totalSalesPaid, totalSalesUnpaid, totalPurchasePaid, totalPurchaseUnpaid, totalExpenses, profit, totalSalesGlobal };
  }, [filteredSales, filteredPurchases, filteredExpenses]);

  // --- PAGES COMPONENTS ---

  const Dashboard = () => {
    const pieData = [
      { name: 'Penjualan Lunas', value: stats.totalSalesPaid, color: '#059669' }, 
      { name: 'Penjualan Belum Lunas', value: stats.totalSalesUnpaid, color: '#f59e0b' },
      { name: 'Belanja Lunas', value: stats.totalPurchasePaid, color: '#3b82f6' },
      { name: 'Belanja Utang', value: stats.totalPurchaseUnpaid, color: '#ef4444' },
      { name: 'Pengeluaran Lain', value: stats.totalExpenses, color: '#6366f1' },
    ].filter(d => d.value > 0);

    const productSales = {};
    filteredSales.forEach(inv => {
      inv.items.forEach(item => {
        if (!productSales[item.name]) productSales[item.name] = 0;
        productSales[item.name] += item.qty;
      });
    });
    
    let sortedProducts = Object.keys(productSales).map(key => ({ name: key, value: productSales[key] })).sort((a, b) => b.value - a.value);
    const COLORS = ['#dc2626', '#2563eb', '#16a34a', '#d97706', '#9333ea', '#0891b2', '#db2777', '#4b5563', '#84cc16', '#6366f1', '#9ca3af'];

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <FilterBar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} dateFilterMode={dateFilterMode} setDateFilterMode={setDateFilterMode} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

        {/* Profit Card */}
        <div className={`p-6 rounded-2xl border ${stats.profit >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'} shadow-sm flex justify-between items-center`}>
            <div>
              <p className={`text-xs font-black uppercase tracking-widest ${stats.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>Estimasi Profit Bersih</p>
              <h2 className={`text-3xl font-black mt-2 ${stats.profit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>{formatCurrency(stats.profit)}</h2>
              <p className="text-[10px] text-slate-500 mt-1 font-bold">Rumus: Penjualan - Belanja Bahan - Pengeluaran Lain</p>
            </div>
            <div className={`p-4 rounded-full ${stats.profit >= 0 ? 'bg-emerald-200/50 text-emerald-700' : 'bg-red-200/50 text-red-700'}`}>
              <TrendingUp className="w-8 h-8" />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-black text-slate-800 mb-4 uppercase italic">Komposisi Keuangan</h3>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{borderRadius:'12px', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Legend iconType="circle" wrapperStyle={{fontSize:'10px', fontWeight:'700'}} />
                  </PieChart>
                </ResponsiveContainer>
             </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-black text-slate-800 mb-4 uppercase italic">Produk Terlaris</h3>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {(() => {
                      const maxTop = 4;
                      let top4 = sortedProducts.slice(0, maxTop);
                      let others = sortedProducts.slice(maxTop);
                      let chartData = top4;
                      if (others.length > 0) {
                        chartData = [...top4, { name: "Lainnya", value: others.reduce((sum, prod) => sum + prod.value, 0) }];
                      }
                      return (
                        <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                      );
                    })()}
                    <Tooltip contentStyle={{borderRadius:'12px', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const DatabaseProduk = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({
      name: '',
      unit: 'METER',
      width: 0,
      length: 0,
      qty: 0,
      price: 0,
      costPrice: 0,
      vendorId: '',
      vendorName: '',
      widthLock: 'unlock', // lock, unlock, rejected
      lengthLock: 'unlock', // lock, unlock, rejected
      priceLock: 'unlock' // lock, unlock, rejected
    });

    // Update vendor name when vendorId changes
    useEffect(() => {
        if (form.vendorId) {
            const vendor = vendors.find(v => v.id == form.vendorId);
            if (vendor) {
                setForm(prev => ({
                    ...prev,
                    vendorName: vendor.name
                }));
            }
        }
    }, [form.vendorId, vendors]);

    const handleSubmit = (e) => {
      e.preventDefault();
      // Calculate area if dimensions provided
      const area = (parseFloat(form.width || 0) * parseFloat(form.length || 0)) / 10000;
      
      const payload = {
          ...form,
          area,
          qty: parseInt(form.qty),
          price: parseInt(form.price),
          width: parseFloat(form.width || 0),
          length: parseFloat(form.length || 0),
          widthLock: form.widthLock,
          lengthLock: form.lengthLock,
          priceLock: form.priceLock
      };
      
      if (editItem) {
        setProducts(products.map(p => p.id === editItem.id ? { ...payload, id: editItem.id } : p));
      } else {
        setProducts([...products, { ...payload, id: Date.now() }]);
      }
      setForm({
        name: '',
        unit: 'METER',
        width: 0,
        length: 0,
        qty: 0,
        price: 0,
        widthLock: 'unlock',
        lengthLock: 'unlock',
        priceLock: 'unlock'
      });
      setEditItem(null);
      setShowModal(null);
    };

    const handleDelete = (id) => {
        if(window.confirm('Hapus produk ini?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    }

    const handleEdit = (item) => {
        setEditItem(item);
        setForm(item);
        setShowModal('add-product');
    }

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div>
              <h3 className="text-lg font-black text-slate-800 uppercase italic">Database Produk</h3>
              <p className="text-xs text-slate-500 font-medium">Daftar item yang dijual ke pelanggan.</p>
           </div>
           <div className="flex w-full md:w-auto gap-2">
             <div className="w-full md:w-64">
               <SearchInput placeholder="Cari Produk..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
             </div>
             <button onClick={() => { setEditItem(null); setForm({ name: '', unit: 'METER', width: 0, length: 0, qty: 0, price: 0, costPrice: 0, vendorId: '', vendorName: '', widthLock: 'unlock', lengthLock: 'unlock', priceLock: 'unlock' }); setShowModal('add-product'); }} className="btn-primary flex items-center whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Produk Baru</button>
           </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest">
              <tr>
                <th className="p-4">Nama Produk</th>
                <th className="p-4 text-center">Vendor</th>
                <th className="p-4 text-center">L (Lebar)</th>
                <th className="p-4 text-center">P (Panjang)</th>
                <th className="p-4 text-center">Stok (Qty)</th>
                <th className="p-4 text-center">Satuan</th>
                <th className="p-4 text-center">Luas (m²)</th>
                <th className="p-4 text-right">Harga Jual</th>
                <th className="p-4 text-right">Harga Beli</th>
                <th className="p-4 text-center">Status Lock</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold">
                      {p.name}
                  </td>
                  <td className="p-4 text-center text-sm text-slate-600">{p.vendorName || '-'}</td>
                  <td className="p-4 text-center font-mono">{p.width || '-'}</td>
                  <td className="p-4 text-center font-mono">{p.length || '-'}</td>
                  <td className="p-4 text-center font-bold text-slate-700">{p.qty}</td>
                  <td className="p-4 text-center text-xs font-black bg-slate-50 text-slate-600 rounded">{p.unit}</td>
                  <td className="p-4 text-center text-slate-500 text-xs font-mono">
                    {p.width > 0 && p.length > 0 
                      ? ((p.width * p.length) / 10000).toLocaleString('id-ID')
                      : '-'}
                  </td>
                  <td className="p-4 text-right font-bold text-emerald-600">{formatCurrency(p.price)}</td>
                  <td className="p-4 text-right font-bold text-blue-600">{p.costPrice ? formatCurrency(p.costPrice) : '-'}</td>
                  <td className="p-4 text-center text-xs">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1 justify-center">
                        <span className={`px-1 py-0.5 rounded text-[8px] font-bold uppercase ${
                          p.widthLock === 'lock' ? 'bg-red-100 text-red-700' :
                          p.widthLock === 'rejected' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>L: {p.widthLock}</span>
                        <span className={`px-1 py-0.5 rounded text-[8px] font-bold uppercase ${
                          p.lengthLock === 'lock' ? 'bg-red-100 text-red-700' :
                          p.lengthLock === 'rejected' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>P: {p.lengthLock}</span>
                      </div>
                      <span className={`px-1 py-0.5 rounded text-[8px] font-bold uppercase ${
                        p.priceLock === 'lock' ? 'bg-red-100 text-red-700' :
                        p.priceLock === 'rejected' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>Price: {p.priceLock}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Add Product */}
        {showModal === 'add-product' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl p-6">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-black text-slate-800 uppercase italic">{editItem ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                 <button onClick={() => setShowModal(null)}><X className="w-5 h-5" /></button>
               </div>
               <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="col-span-2">
                   <label className="label-text">Nama Item</label>
                   <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="Contoh: Banner Flexi" />
                 </div>
                 <div className="col-span-2">
                   <label className="label-text">Vendor/Pemasok</label>
                   <select value={form.vendorId} onChange={e => setForm({...form, vendorId: e.target.value})} className="input-field">
                     <option value="">-- Pilih Vendor --</option>
                     {vendors.filter(v => v.status === 'Aktif').map(v => (
                       <option key={v.id} value={v.id}>{v.name}</option>
                     ))}
                     <option value="0">Internal</option>
                   </select>
                 </div>
                 <div>
                   <label className="label-text">Stok (QTY)</label>
                   <input type="number" required value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} className="input-field" />
                 </div>
                 <div>
                   <label className="label-text">Satuan</label>
                   <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="input-field">
                      <option value="METER">METER</option>
                      <option value="PCS">PCS</option>
                      <option value="PACK">PACK</option>
                      <option value="M. LARI">M. LARI</option>
                      <option value="LEVEL">LEVEL</option>
                   </select>
                 </div>
                 <div>
                   <label className="label-text">L (Lebar cm) - Nullable</label>
                   <input type="number" step="0.01" value={form.width} onChange={e => setForm({...form, width: e.target.value})} className="input-field" placeholder="0" />
                 </div>
                 <div>
                    <label className="label-text">P (Panjang cm) - Nullable</label>
                   <input type="number" step="0.01" value={form.length} onChange={e => setForm({...form, length: e.target.value})} className="input-field" placeholder="0" />
                 </div>
                 <div>
                   <label className="label-text">Harga Jual</label>
                   <input type="number" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="input-field" placeholder="0" />
                 </div>
                 <div>
                   <label className="label-text">Harga Beli</label>
                   <input type="number" value={form.costPrice} onChange={e => setForm({...form, costPrice: e.target.value})} className="input-field" placeholder="0" />
                 </div>
                 <div className="col-span-2 space-y-3">
                   <h5 className="text-xs font-black text-slate-600 uppercase tracking-widest">Status Lock</h5>
                   <div className="grid grid-cols-1 gap-2">
                     <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                       <label className="text-xs font-bold text-slate-600">L (Lebar):</label>
                       <select
                         value={form.widthLock}
                         onChange={e => setForm({...form, widthLock: e.target.value})}
                         className="text-xs px-2 py-1 rounded border border-slate-300"
                       >
                         <option value="unlock">Unlock</option>
                         <option value="lock">Lock</option>
                         <option value="rejected">Rejected</option>
                       </select>
                     </div>
                     <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                       <label className="text-xs font-bold text-slate-600">P (Panjang):</label>
                       <select
                         value={form.lengthLock}
                         onChange={e => setForm({...form, lengthLock: e.target.value})}
                         className="text-xs px-2 py-1 rounded border border-slate-300"
                       >
                         <option value="unlock">Unlock</option>
                         <option value="lock">Lock</option>
                         <option value="rejected">Rejected</option>
                       </select>
                     </div>
                     <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                       <label className="text-xs font-bold text-slate-600">Harga Jual:</label>
                       <select
                         value={form.priceLock}
                         onChange={e => setForm({...form, priceLock: e.target.value})}
                         className="text-xs px-2 py-1 rounded border border-slate-300"
                       >
                         <option value="unlock">Unlock</option>
                         <option value="lock">Lock</option>
                         <option value="rejected">Rejected</option>
                       </select>
                     </div>
                   </div>
                 </div>
                 <div className="col-span-2 mt-4">
                   <button type="submit" className="btn-primary w-full">{editItem ? 'Simpan Perubahan' : 'Simpan Produk'}</button>
                 </div>
               </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const NotaSupplier = () => {
    // Header State
    const [header, setHeader] = useState({
      noTagihan: 'SUP-002',
      nomorInternal: generateInvoiceCode('BUY'),
      date: new Date().toISOString().slice(0, 10),
      vendorId: '', // ID vendor dari dropdown
      vendor: '', // Nama vendor (diisi otomatis saat vendorId dipilih)
      salesName: '',
      address: '',
      paymentMethod: 'Cash',
    });

    // Item Entry State
    const [itemEntry, setItemEntry] = useState({
      targetType: 'material',
      itemId: '',
      width: 0, 
      length: 0, 
      qty: 1, 
      lot: 'Lock', // Default Lock
      price: 0,
      discount: 0,
      purchaseUnit: '',
      conversionValue: 0, 
    });

    const [cart, setCart] = useState([]);
    const [paidAmount, setPaidAmount] = useState(0);

    // Supplier-specific products
    const selectedVendor = vendors.find(v => v.id == header.vendorId);
    const availableProducts = selectedVendor?.suppliedProducts || [];

    // Derived Logic for Item Entry
    const selectedProduct = itemEntry.targetType === 'product' 
        ? products.find(p => p.id == itemEntry.itemId) 
        : materials.find(m => m.id == itemEntry.itemId);

    useEffect(() => {
        if (selectedProduct) {
            // Default rules:
            // Purchase unit always from database regardless of Lot selection
            const unit = selectedProduct.unit;
            
            setItemEntry(prev => ({
                ...prev, 
                purchaseUnit: unit,
                // If not METER, clear dimensions
                width: selectedProduct.unit !== 'METER' ? 0 : (selectedProduct.width || 0),
                length: selectedProduct.unit !== 'METER' ? 0 : (selectedProduct.length || 0),
            }));
        }
    }, [itemEntry.itemId, itemEntry.targetType, itemEntry.lot]);

    // Load data for editing
    useEffect(() => {
        if (editItem && isCreatingPurchase) {
            const vendorData = vendors.find(v => v.name === editItem.vendor);
            setHeader({
                noTagihan: editItem.noTagihan,
                nomorInternal: editItem.id,
                date: editItem.date,
                vendorId: vendorData?.id || '',
                vendor: editItem.vendor,
                salesName: editItem.salesName || '',
                address: editItem.address || '',
                paymentMethod: editItem.paymentMethod
            });
            setCart(editItem.items);
            setPaidAmount(editItem.paid);
        } else if (!editItem && isCreatingPurchase) {
            setHeader(prev => ({...prev, nomorInternal: generateInvoiceCode('BUY')}));
        }
    }, [editItem, isCreatingPurchase, vendors]);

    // Update vendor name when vendorId changes
    useEffect(() => {
        if (header.vendorId) {
            const vendor = vendors.find(v => v.id == header.vendorId);
            if (vendor) {
                setHeader(prev => ({
                    ...prev,
                    vendor: vendor.name,
                    address: vendor.address,
                    salesName: vendor.contact // Using contact as sales name for simplicity
                }));
            }
        }
    }, [header.vendorId, vendors]);

    const addToCart = () => {
        if (!selectedProduct || !header.vendorId) return alert("Pilih Item dan Vendor");

        const width = parseFloat(itemEntry.width) || 0;
        const length = parseFloat(itemEntry.length) || 0;
        const qty = parseInt(itemEntry.qty) || 1;
        const discount = parseFloat(itemEntry.discount) || 0;

        // Get price from supplier's product list or use manual input
        let price = parseFloat(itemEntry.price) || 0;
        if (itemEntry.targetType === 'product' && header.vendorId) {
            const supplierProduct = availableProducts.find(p => p.productId == itemEntry.itemId);
            if (supplierProduct) {
                price = supplierProduct.costPrice;
            }
        }
        
        let area = 0;
        let subtotal = 0;
        let addedQty = qty;

        // Logic Konversi: Jika DB = METER dan Lot = ROLL
        // "P" acts as "Panjang per Roll" in this context if Lot=Roll
        if (selectedProduct.unit === 'METER' && itemEntry.lot === 'Roll') {
            const rollLength = parseFloat(itemEntry.length) || 0; // Using P as roll length
            addedQty = qty * rollLength;
        }

        // Hitung Luas & Subtotal
        if (selectedProduct.unit === 'METER' && width > 0 && length > 0 && itemEntry.lot !== 'Roll') {
           // Standard Meter calculation if dimensions exist
           area = (width * length) / 10000;
        }
        
        subtotal = (price * qty) - discount;

        const newItem = {
            id: Date.now(),
            targetType: itemEntry.targetType,
            itemId: itemEntry.itemId,
            name: selectedProduct.name,
            width, length, qty, lot: itemEntry.lot,
            area, 
            unit: selectedProduct.unit, // Satuan Stok
            purchaseUnit: itemEntry.purchaseUnit, // Satuan Beli
            price, discount, subtotal,
            addedQty 
        };

        setCart([...cart, newItem]);
        setItemEntry({ ...itemEntry, itemId: '', width: 0, length: 0, qty: 1, lot: 'Lock', price: 0, discount: 0 });
    };

    const removeFromCart = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const totalTagihan = cart.reduce((acc, item) => acc + item.subtotal, 0);
    const sisaTagihan = totalTagihan - paidAmount;

    const handleSave = () => {
       if (!header.vendor || cart.length === 0) return alert("Data belum lengkap");

       // Update Stocks
       cart.forEach(item => {
           if (item.targetType === 'material') {
               setMaterials(prev => prev.map(m => m.id == item.itemId ? {...m, qty: parseInt(m.qty) + item.addedQty} : m));
           } else {
               setProducts(prev => prev.map(p => p.id == item.itemId ? {...p, qty: parseInt(p.qty) + item.addedQty} : p));
           }
       });

       const newInvoice = { 
           id: header.nomorInternal,
           noTagihan: header.noTagihan,
           date: header.date,
           vendor: header.vendor,
           salesName: header.salesName,
           address: header.address,
           items: cart,
           total: totalTagihan,
           paid: parseInt(paidAmount),
           remaining: sisaTagihan < 0 ? 0 : sisaTagihan,
           paymentMethod: header.paymentMethod,
           status: sisaTagihan <= 0 ? 'lunas' : 'belum_lunas' 
       };

       if (editItem) {
           setPurchaseInvoices(prev => prev.map(inv => inv.id === editItem.id ? newInvoice : inv));
       } else {
           setPurchaseInvoices([newInvoice, ...purchaseInvoices]);
           if (header.paymentMethod === 'Cash') setWallet(prev => ({...prev, cash: prev.cash - parseInt(paidAmount)})); 
           else setWallet(prev => ({...prev, bank: prev.bank - parseInt(paidAmount)}));
       }
       
       setIsCreatingPurchase(false);
       setEditItem(null);
    };

    const handleDeleteInvoice = (id) => {
        if(window.confirm('Hapus nota supplier ini?')) {
            setPurchaseInvoices(prev => prev.filter(i => i.id !== id));
        }
    }

    // LIST VIEW
    if (!isCreatingPurchase) {
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div><h3 className="text-lg font-black text-slate-800 uppercase italic">Nota Supplier (Belanja)</h3><p className="text-xs text-slate-500 font-medium">Rekap pembelian stok dari vendor.</p></div>
               <button onClick={() => { setIsCreatingPurchase(true); setEditItem(null); }} className="btn-primary flex items-center whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Catat Belanja</button>
            </div>
            
            <FilterBar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} dateFilterMode={dateFilterMode} setDateFilterMode={setDateFilterMode} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
            
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
               <table className="w-full text-left whitespace-nowrap text-sm"><thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b"><tr><th className="p-4">Tanggal</th><th className="p-4">No. Tagihan</th><th className="p-4">Vendor</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4 text-center">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredPurchases.map(p => (<tr key={p.id} className="hover:bg-slate-50"><td className="p-4 text-xs text-slate-500 font-mono">{p.date}</td><td className="p-4 font-mono text-xs">{p.noTagihan}</td><td className="p-4 font-bold">{p.vendor}</td><td className="p-4 font-black text-red-600">{formatCurrency(p.total)}</td><td className="p-4"><span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${p.status === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.status.replace('_', ' ')}</span></td>               <td className="p-4 text-center">
                   <div className="flex justify-center gap-2">
                        <button onClick={() => { setEditItem(p); setShowModal('invoice-detail-purchase'); }} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => { setIsCreatingPurchase(true); setEditItem(p); }} className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => { setEditItem(p); setShowModal('invoice-print-purchase'); }} className="p-2 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-600"><Printer className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteInvoice(p.id)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600"><Trash2 className="w-4 h-4" /></button>
                   </div>
               </td></tr>))}</tbody></table>
            </div>
          </div>
        );
    }

    // FORM VIEW
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center">
                <button onClick={() => setIsCreatingPurchase(false)} className="mr-4 p-2 rounded-full hover:bg-slate-200 transition"><ArrowLeft className="w-5 h-5"/></button>
                <h3 className="text-xl font-black text-slate-800 uppercase italic">{editItem ? 'Edit Nota Supplier' : 'Input Belanja (Nota Supplier)'}</h3>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 space-y-6">
                {/* Header */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center"><FileText className="w-4 h-4 mr-2"/> Informasi Supplier</h4>
                   <div className="grid grid-cols-2 gap-4">
                      <div><label className="label-text">No. Tagihan (Supplier)</label><input type="text" value={header.noTagihan} onChange={e => setHeader({...header, noTagihan: e.target.value})} className="input-field" placeholder="INV-SUP-..." /></div>
                      <div><label className="label-text">No. Internal (Auto)</label><input type="text" value={header.nomorInternal} disabled className="input-field bg-slate-100 text-slate-500 cursor-not-allowed" /></div>
                      <div><label className="label-text">Hari - Tanggal</label><input type="date" value={header.date} onChange={e => setHeader({...header, date: e.target.value})} className="input-field" /></div>
                      <div><label className="label-text">Nama Supplier</label><select value={header.vendorId} onChange={e => setHeader({...header, vendorId: e.target.value})} className="input-field"><option value="">-- Pilih Supplier --</option>{vendors.filter(v => v.status === 'Aktif').map(v => (<option key={v.id} value={v.id}>{v.name}</option>))}</select></div>
                      <div><label className="label-text">Kontak</label><input type="text" value={header.salesName} onChange={e => setHeader({...header, salesName: e.target.value})} className="input-field" /></div>
                      <div><label className="label-text">Alamat</label><input type="text" value={header.address} onChange={e => setHeader({...header, address: e.target.value})} className="input-field" /></div>
                   </div>
                </div>

                {/* Item Entry */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center"><ShoppingCart className="w-4 h-4 mr-2"/> Input Item</h4>
                   
                   {/* Type Selection */}
                   <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                       <button onClick={() => setItemEntry({...itemEntry, targetType: 'material', itemId: ''})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${itemEntry.targetType === 'material' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}>Bahan Baku</button>
                       <button onClick={() => setItemEntry({...itemEntry, targetType: 'product', itemId: ''})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${itemEntry.targetType === 'product' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}>Produk Jual</button>
                   </div>

                   <div className="grid grid-cols-12 gap-3 items-end">
                       <div className="col-span-4">
                           <label className="label-text">Nama Item</label>
                           <select className="input-field" value={itemEntry.itemId} onChange={e => setItemEntry({...itemEntry, itemId: e.target.value})}>
                               <option value="">-- Pilih --</option>
                               {itemEntry.targetType === 'material'
                                 ? materials.map(m => <option key={m.id} value={m.id}>{m.name} ({m.qty} {m.unit})</option>)
                                 : header.vendorId && availableProducts.length > 0
                                   ? availableProducts.map(p => {
                                       const product = products.find(prod => prod.id === p.productId);
                                       return product ? (
                                         <option key={p.productId} value={p.productId}>
                                           {p.name} - Modal: Rp {formatCurrency(p.costPrice)}
                                         </option>
                                       ) : null;
                                     })
                                   : <option disabled>-- Pilih Supplier terlebih dahulu --</option>
                               }
                           </select>
                       </div>
                       
                       <div className="col-span-2">
                           <label className="label-text">Lot</label>
                           <select className="input-field" value={itemEntry.lot} onChange={e => setItemEntry({...itemEntry, lot: e.target.value})}>
                               <option value="Lock">Lock</option>
                               <option value="Roll">Roll</option>
                           </select>
                       </div>

                       <div className="col-span-2">
                           <label className="label-text">Satuan</label>
                           <input type="text" value={itemEntry.purchaseUnit} disabled className="input-field bg-slate-100 text-slate-500" />
                       </div>

                       <div className="col-span-2">
                           <label className="label-text">L (cm) (Locked)</label>
                           <input
                                type="number"
                                className="input-field bg-slate-100"
                                value={itemEntry.width}
                                placeholder="0"
                                readOnly={true}
                           />
                       </div>
                       <div className="col-span-2">
                           <label className="label-text">P (cm) {itemEntry.lot === 'Roll' ? '(Pjg/Roll)' : ''}</label>
                           <input 
                                type="number" 
                                className={`input-field ${selectedProduct?.unit !== 'METER' ? 'bg-slate-100' : ''}`} 
                                value={itemEntry.length} 
                                onChange={e => setItemEntry({...itemEntry, length: e.target.value})} 
                                placeholder="0"
                                readOnly={selectedProduct?.unit !== 'METER'}
                           />
                       </div>
                       <div className="col-span-2"><label className="label-text">Qty</label><input type="number" className="input-field" value={itemEntry.qty} onChange={e => setItemEntry({...itemEntry, qty: e.target.value})} placeholder="1" /></div>
                       <div className="col-span-3"><label className="label-text">Harga</label><input type="number" className="input-field" value={itemEntry.price} onChange={e => setItemEntry({...itemEntry, price: e.target.value})} placeholder="0" /></div>
                       <div className="col-span-3"><label className="label-text">Disc</label><input type="number" className="input-field" value={itemEntry.discount} onChange={e => setItemEntry({...itemEntry, discount: e.target.value})} placeholder="0" /></div>
                       
                       <div className="col-span-4 mt-2 text-right">
                           <button onClick={addToCart} className="btn-primary w-full h-[46px] flex items-center justify-center">
                               <Plus className="w-4 h-4 mr-2" /> Tambah
                           </button>
                       </div>
                   </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100 text-slate-600 font-bold uppercase">
                                <tr>
                                    <th className="p-3">No</th>
                                    <th className="p-3">Nama Item</th>
                                    <th className="p-3 text-center">L</th>
                                    <th className="p-3 text-center">P</th>
                                    <th className="p-3 text-center">Qty</th>
                                    <th className="p-3 text-center">Lot</th>
                                    <th className="p-3 text-center">Luas</th>
                                    <th className="p-3 text-center">Sat</th>
                                    <th className="p-3 text-right">Harga</th>
                                    <th className="p-3 text-right">Disc</th>
                                    <th className="p-3 text-right">Subtotal</th>
                                    <th className="p-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {cart.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50">
                                        <td className="p-3 text-center">{idx + 1}</td>
                                        <td className="p-3 font-bold">{item.name}</td>
                                        <td className="p-3 text-center">{item.width || '-'}</td>
                                        <td className="p-3 text-center">{item.length || '-'}</td>
                                        <td className="p-3 text-center font-bold">{item.qty}</td>
                                        <td className="p-3 text-center">{item.lot}</td>
                                        <td className="p-3 text-center">{item.area > 0 ? item.area.toFixed(2) : '-'}</td>
                                        <td className="p-3 text-center">{item.purchaseUnit}</td>
                                        <td className="p-3 text-right">{formatCurrency(item.price)}</td>
                                        <td className="p-3 text-right">{formatCurrency(item.discount)}</td>
                                        <td className="p-3 text-right font-bold">{formatCurrency(item.subtotal)}</td>
                                        <td className="p-3 text-center"><button onClick={() => removeFromCart(idx)}><Trash2 className="w-4 h-4 text-red-500" /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
             </div>

             {/* Sidebar Summary */}
             <div className="space-y-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl sticky top-24">
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Tagihan</p>
                            <h2 className="text-4xl font-black tracking-tight">{formatCurrency(totalTagihan)}</h2>
                        </div>
                        <div className="pt-4 border-t border-slate-700 space-y-4">
                            <div>
                                <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Bayar (Rp)</label>
                                <input type="number" value={paidAmount} onChange={e => setPaidAmount(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-red-600 font-bold text-lg" placeholder="0" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Metode Bayar</label>
                                <select value={header.paymentMethod} onChange={e => setHeader({...header, paymentMethod: e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl font-bold text-sm">
                                    <option value="Cash">Cash</option>
                                    <option value="Transfer">Transfer</option>
                                    <option value="Tempo">Tempo</option>
                                </select>
                            </div>
                            <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-800">
                                <span>Sisa Tagihan</span>
                                <span className={sisaTagihan > 0 ? 'text-red-400' : 'text-emerald-400'}>{formatCurrency(sisaTagihan)}</span>
                            </div>
                        </div>
                        <button onClick={handleSave} className="w-full mt-4 bg-red-600 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-red-500 transition shadow-lg shadow-red-900/50 flex items-center justify-center">
                            <Save className="w-4 h-4 mr-2" /> Simpan Transaksi
                        </button>
                    </div>
                </div>
             </div>
          </div>
      </div>
    );
  };

  const NotaPelanggan = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDeleteInvoice = (id) => {
        if(window.confirm('Hapus transaksi penjualan ini?')) {
            setSalesInvoices(prev => prev.filter(i => i.id !== id));
        }
    }

    const InvoiceForm = () => {
      // Header State
      const [header, setHeader] = useState({
        noTagihan: generateInvoiceCode(),
        date: new Date().toISOString().slice(0, 10),
        buyer: '',
        paymentMethod: 'Cash',
      });

      // Item Entry State
      const [itemEntry, setItemEntry] = useState({
        selectedProductId: '',
        // itemDesc removed
        width: 0, // L
        length: 0, // P
        qty: 1,
        discount: 0,
      });

      // Cart State
      const [cart, setCart] = useState([]);
      const [paidAmount, setPaidAmount] = useState(0);

      // Load data for editing
      useEffect(() => {
        if (editItem && isCreatingInvoice) {
            setHeader({
                noTagihan: editItem.id,
                date: editItem.date,
                buyer: editItem.buyer,
                paymentMethod: editItem.paymentMethod
            });
            setCart(editItem.items);
            setPaidAmount(editItem.paid);
        }
      }, [editItem, isCreatingInvoice]);

      // Derived Logic
      const selectedProduct = products.find(p => p.id == itemEntry.selectedProductId);

      // Effect to handle "L" from database when product changes
      useEffect(() => {
          if (selectedProduct) {
              setItemEntry(prev => ({
                  ...prev,
                  // "L" always takes from database produk and can be edited
                  width: selectedProduct.width || 0
              }));
          }
      }, [itemEntry.selectedProductId, selectedProduct]);

      const addToCart = () => {
        if (!selectedProduct) return;
        
        const width = parseFloat(itemEntry.width) || 0;
        const length = parseFloat(itemEntry.length) || 0;
        const qty = parseInt(itemEntry.qty) || 1;
        const discount = parseFloat(itemEntry.discount) || 0;
        const basePrice = selectedProduct.price;
        
        let luas = 0;
        let subtotal = 0;

        // Logic: Jika ada dimensi (L & P), hitung Luas dan asumsikan Harga Jual adalah per m2
        // Jika tidak, asumsikan Harga Jual adalah per unit
        if (selectedProduct.unit === 'METER' && width > 0 && length > 0) {
           luas = (width * length) / 10000; // cm2 to m2
           subtotal = (basePrice * luas * qty) - discount;
        } else {
           subtotal = (basePrice * qty) - discount;
        }

        const newItem = {
            id: Date.now(),
            productId: selectedProduct.id,
            name: selectedProduct.name, // NAMA
            // itemDesc removed
            width: width, // L
            length: length, // P
            qty: qty, // Qty
            area: luas, // Luas
            unit: selectedProduct.unit || 'Pcs', // Satuan
            price: basePrice, // Harga
            discount: discount, // Discount
            subtotal: subtotal // Sub Total
        };

        setCart([...cart, newItem]);
        // Reset entry fields
        setItemEntry({ selectedProductId: '', width: 0, length: 0, qty: 1, discount: 0 });
      };

      const removeFromCart = (index) => {
          setCart(cart.filter((_, i) => i !== index));
      };

      const totalTagihan = cart.reduce((acc, item) => acc + item.subtotal, 0);
      const sisaTagihan = totalTagihan - paidAmount;

      const handleSaveInvoice = () => {
        if (!header.buyer || cart.length === 0) return alert('Data pelanggan atau barang belum diisi');
        
        const invoiceData = {
          id: header.noTagihan,
          date: header.date,
          buyer: header.buyer,
          items: cart,
          total: totalTagihan,
          paid: parseFloat(paidAmount),
          remaining: sisaTagihan < 0 ? 0 : sisaTagihan,
          paymentMethod: header.paymentMethod,
          status: sisaTagihan <= 0 ? 'lunas' : 'belum_lunas'
        };

        if (editItem) {
            setSalesInvoices(prev => prev.map(inv => inv.id === editItem.id ? invoiceData : inv));
        } else {
            setSalesInvoices([invoiceData, ...salesInvoices]);
            if (header.paymentMethod === 'Cash') {
                setWallet(prev => ({...prev, cash: prev.cash + parseFloat(paidAmount)}));
            } else {
                setWallet(prev => ({...prev, bank: prev.bank + parseFloat(paidAmount)}));
            }
        }
        
        setIsCreatingInvoice(false);
        setEditItem(null);
      };

      return (
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header & Navigation */}
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center">
                <button onClick={() => { setIsCreatingInvoice(false); setEditItem(null); }} className="mr-4 p-2 rounded-full hover:bg-slate-200 transition"><ArrowLeft className="w-5 h-5"/></button>
                <h3 className="text-xl font-black text-slate-800 uppercase italic">{editItem ? 'Edit Nota Pelanggan' : 'Form Nota Pelanggan'}</h3>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Form Inputs */}
            <div className="lg:col-span-2 space-y-6">
               {/* 1. Header Nota */}
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center"><FileText className="w-4 h-4 mr-2"/> Informasi Nota</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label-text">Nomor Tagihan</label>
                        <input type="text" value={header.noTagihan} disabled className="input-field bg-slate-100 text-slate-500 font-mono cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="label-text">Hari Tanggal</label>
                        <input type="date" value={header.date} onChange={e => setHeader({...header, date: e.target.value})} className="input-field" />
                    </div>
                    <div>
                        <label className="label-text">Nama Pelanggan</label>
                        <input type="text" value={header.buyer} onChange={e => setHeader({...header, buyer: e.target.value})} className="input-field" placeholder="Nama Customer" />
                    </div>
                    <div>
                        <label className="label-text">Sistem Bayar</label>
                        <select value={header.paymentMethod} onChange={e => setHeader({...header, paymentMethod: e.target.value})} className="input-field">
                            <option value="Cash">Cash</option>
                            <option value="Transfer">Transfer</option>
                            <option value="Tempo">Tempo</option>
                        </select>
                    </div>
                  </div>
               </div>

               {/* 2. Input Barang */}
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center"><ShoppingCart className="w-4 h-4 mr-2"/> Input Barang</h4>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                     <div className="md:col-span-6">
                        <label className="label-text">Produk (NAMA)</label>
                        <select value={itemEntry.selectedProductId} onChange={e => setItemEntry({...itemEntry, selectedProductId: e.target.value})} className="input-field">
                            <option value="">-- Pilih Produk --</option>
                            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                     </div>
                     <div className="md:col-span-2">
                        <label className="label-text">L (cm)</label>
                        <input
                            type="number"
                            value={itemEntry.width}
                            onChange={e => setItemEntry({...itemEntry, width: e.target.value})}
                            className="input-field"
                            placeholder="0"
                        />
                     </div>
                     <div className="md:col-span-2">
                        <label className="label-text">P (cm) {selectedProduct?.unit !== 'METER' ? '(Locked)' : ''}</label>
                        <input 
                            type="number" 
                            value={itemEntry.length} 
                            onChange={e => setItemEntry({...itemEntry, length: e.target.value})} 
                            className={`input-field ${selectedProduct?.unit !== 'METER' ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''}`} 
                            placeholder="0" 
                            readOnly={selectedProduct?.unit !== 'METER'}
                        />
                     </div>
                     <div className="md:col-span-2">
                        <label className="label-text">Qty</label>
                        <input type="number" value={itemEntry.qty} onChange={e => setItemEntry({...itemEntry, qty: e.target.value})} className="input-field" placeholder="1" />
                     </div>
                     <div className="md:col-span-4">
                        <label className="label-text">Discount (Rp)</label>
                        <input type="number" value={itemEntry.discount} onChange={e => setItemEntry({...itemEntry, discount: e.target.value})} className="input-field" placeholder="0" />
                     </div>
                     <div className="md:col-span-8">
                        <button onClick={addToCart} className="btn-primary w-full h-[46px] flex items-center justify-center">
                            <Plus className="w-4 h-4 mr-2" /> Tambah Barang
                        </button>
                     </div>
                  </div>
               </div>

               {/* 3. Tabel Barang */}
               <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-slate-100 bg-slate-50">
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Daftar Item Nota</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider">
                            <tr>
                                <th className="p-3 text-center border-r border-slate-200 w-10">No</th>
                                <th className="p-3 border-r border-slate-200 min-w-[150px]">Nama</th>
                                <th className="p-3 text-center border-r border-slate-200 w-16">L</th>
                                <th className="p-3 text-center border-r border-slate-200 w-16">P</th>
                                <th className="p-3 text-center border-r border-slate-200 w-16">Qty</th>
                                <th className="p-3 text-center border-r border-slate-200 w-20">Luas</th>
                                <th className="p-3 text-center border-r border-slate-200 w-16">Sat</th>
                                <th className="p-3 text-right border-r border-slate-200 min-w-[100px]">Harga</th>
                                <th className="p-3 text-right border-r border-slate-200 min-w-[80px]">Disc</th>
                                <th className="p-3 text-right min-w-[120px]">Sub Total</th>
                                <th className="p-3 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {cart.map((item, idx) => (
                                <tr key={item.id} className="hover:bg-slate-50">
                                    <td className="p-3 text-center font-mono text-slate-500 border-r border-slate-100">{idx + 1}</td>
                                    <td className="p-3 font-bold border-r border-slate-100">{item.name}</td>
                                    <td className="p-3 text-center border-r border-slate-100">{item.width || '-'}</td>
                                    <td className="p-3 text-center border-r border-slate-100">{item.length || '-'}</td>
                                    <td className="p-3 text-center border-r border-slate-100 font-bold">{item.qty}</td>
                                    <td className="p-3 text-center border-r border-slate-100 text-slate-500">{item.area > 0 ? item.area.toFixed(2) : '-'}</td>
                                    <td className="p-3 text-center border-r border-slate-100 text-xs">{item.unit}</td>
                                    <td className="p-3 text-right border-r border-slate-100 font-mono">{formatCurrency(item.price)}</td>
                                    <td className="p-3 text-right border-r border-slate-100 text-red-500">{item.discount > 0 ? formatCurrency(item.discount) : '-'}</td>
                                    <td className="p-3 text-right font-black">{formatCurrency(item.subtotal)}</td>
                                    <td className="p-3 text-center">
                                        <button onClick={() => removeFromCart(idx)} className="text-red-400 hover:text-red-600 transition"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                            {cart.length === 0 && <tr><td colSpan="11" className="p-6 text-center text-slate-400 italic">Belum ada barang ditambahkan.</td></tr>}
                        </tbody>
                    </table>
                  </div>
               </div>
            </div>

            {/* Right Column: Payment & Summary */}
            <div className="space-y-6">
               <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl sticky top-24">
                  <div className="space-y-4">
                     <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Tagihan</p>
                        <h2 className="text-4xl font-black tracking-tight">{formatCurrency(totalTagihan)}</h2>
                     </div>
                     
                     <div className="pt-4 border-t border-slate-700 space-y-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Terbayar (Rp)</label>
                            <input type="number" value={paidAmount} onChange={e => setPaidAmount(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-red-600 font-bold text-lg" placeholder="0" />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm font-bold mb-1">
                                <span>Sisa Tagihan</span>
                                <span className={sisaTagihan > 0 ? 'text-red-400' : 'text-emerald-400'}>{formatCurrency(sisaTagihan)}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-slate-400">
                                <span>Status Pembayaran</span>
                                <span className="uppercase font-bold tracking-wider">{sisaTagihan <= 0 ? 'LUNAS' : 'BELUM LUNAS'}</span>
                            </div>
                        </div>
                     </div>

                     <button onClick={handleSaveInvoice} className="w-full mt-4 bg-red-600 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-red-500 transition shadow-lg shadow-red-900/50 flex items-center justify-center">
                        <Save className="w-4 h-4 mr-2" /> {editItem ? 'Simpan Perubahan' : 'Simpan Transaksi'}
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      );
    };

    const InvoiceList = () => {
       const filteredList = salesInvoices.filter(i => 
         (i.buyer.toLowerCase().includes(searchTerm.toLowerCase()) || i.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === 'all' || i.status === statusFilter)
       );
       
       return (
         <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div>
                  <h3 className="text-lg font-black text-slate-800 uppercase italic">Nota Pelanggan (Penjualan)</h3>
                  <p className="text-xs text-slate-500 font-medium">Daftar transaksi kasir.</p>
               </div>
               <div className="flex w-full md:w-auto gap-2">
                 <div className="w-full md:w-48"><SearchInput placeholder="Cari Nota/Nama..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
                 <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-2 outline-none"><option value="all">Semua Status</option><option value="lunas">Lunas</option><option value="belum_lunas">Belum Lunas</option></select>
                 <button onClick={() => { setIsCreatingInvoice(true); setEditItem(null); }} className="btn-primary flex items-center whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Buat Nota Baru</button>
               </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left whitespace-nowrap">
                 <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b">
                   <tr><th className="p-4">No Nota</th><th className="p-4">Tanggal</th><th className="p-4">Nama Pelanggan</th><th className="p-4">Total</th><th className="p-4">Sisa</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi</th></tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 text-sm">{filteredList.map(inv => (<tr key={inv.id} className="hover:bg-slate-50"><td className="p-4 font-mono text-xs font-bold">{inv.id}</td><td className="p-4 text-xs text-slate-500">{inv.date}</td><td className="p-4 font-bold">{inv.buyer}</td><td className="p-4 font-black">{formatCurrency(inv.total)}</td><td className="p-4 font-bold text-red-500">{formatCurrency(inv.remaining)}</td><td className="p-4 text-center"><span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${inv.status === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{inv.status.replace('_', ' ')}</span></td><td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                        <button onClick={() => { setEditItem(inv); setShowModal('invoice-detail'); }} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition" title="Lihat Detail"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => { setEditItem(inv); setIsCreatingInvoice(true); }} className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 transition" title="Edit Transaksi"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => { setEditItem(inv); setShowModal('invoice-print'); }} className="p-2 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-600 transition" title="Cetak Nota"><Printer className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteInvoice(inv.id)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                    </div>
                 </td></tr>))}</tbody>
              </table>
            </div>
         </div>
       );
    };

    return isCreatingInvoice ? <InvoiceForm /> : <InvoiceList />;
  };

  const DatabaseVendor = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({
      name: '',
      contact: '',
      email: '',
      address: '',
      category: 'Bahan Baku',
      status: 'Aktif'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!form.name.trim()) return alert("Nama vendor harus diisi");

      const payload = {
        ...form,
        name: form.name.trim(),
        contact: form.contact.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        category: form.category,
        status: form.status
      };

      if (editItem) {
        setVendors(vendors.map(v => v.id === editItem.id ? { ...payload, id: editItem.id } : v));
      } else {
        setVendors([...vendors, { ...payload, id: Date.now() }]);
      }
      setForm({
        name: '',
        contact: '',
        email: '',
        address: '',
        category: 'Bahan Baku',
        status: 'Aktif'
      });
      setEditItem(null);
      setShowModal(null);
    };

    const handleDelete = (id) => {
      if(window.confirm('Hapus vendor ini?')) {
        setVendors(vendors.filter(v => v.id !== id));
      }
    };

    const handleEdit = (item) => {
      setEditItem(item);
      setForm(item);
      setShowModal('add-vendor');
    };

    const filteredVendors = vendors.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="text-lg font-black text-slate-800 uppercase italic">Database Vendor</h3>
            <p className="text-xs text-slate-500 font-medium">Daftar vendor/supplier yang bekerja sama.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <div className="w-full md:w-64">
              <SearchInput placeholder="Cari Vendor..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button onClick={() => { setEditItem(null); setForm({ name: '', contact: '', email: '', address: '', category: 'Bahan Baku', status: 'Aktif' }); setShowModal('add-vendor'); }} className="btn-primary flex items-center whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Tambah Vendor</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest">
              <tr>
                <th className="p-4">Nama Vendor</th>
                <th className="p-4">Kontak</th>
                <th className="p-4">Email</th>
                <th className="p-4">Alamat</th>
                <th className="p-4 text-center">Kategori</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVendors.map(v => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold">{v.name}</td>
                  <td className="p-4 font-mono text-sm">{v.contact}</td>
                  <td className="p-4 text-slate-600">{v.email}</td>
                  <td className="p-4 text-slate-600 max-w-xs truncate" title={v.address}>{v.address}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      v.category === 'Bahan Baku' ? 'bg-blue-100 text-blue-700' :
                      v.category === 'Peralatan' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {v.category}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      v.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(v)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(v.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredVendors.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Tidak ada data vendor</p>
            </div>
          )}
        </div>

        {showModal === 'add-vendor' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-800 uppercase italic">{editItem ? 'Edit Vendor' : 'Tambah Vendor Baru'}</h3>
                <button onClick={() => setShowModal(null)}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label-text">Nama Vendor</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="PT. Contoh Vendor" />
                </div>
                <div>
                  <label className="label-text">Nomor Kontak</label>
                  <input type="text" required value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} className="input-field" placeholder="08123456789" />
                </div>
                <div>
                  <label className="label-text">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" placeholder="vendor@email.com" />
                </div>
                <div className="col-span-2">
                  <label className="label-text">Alamat</label>
                  <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="input-field" rows="3" placeholder="Jl. Contoh No. 123, Kota" />
                </div>
                <div>
                  <label className="label-text">Kategori</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">
                    <option value="Bahan Baku">Bahan Baku</option>
                    <option value="Peralatan">Peralatan</option>
                    <option value="Jasa">Jasa</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="input-field">
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
                <div className="col-span-2 mt-4">
                  <button type="submit" className="btn-primary w-full">{editItem ? 'Simpan Perubahan' : 'Simpan Vendor'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const MasterBahan = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({ name: '', unit: '', qty: 0, costPrice: 0, vendorId: '', vendorName: '' });
    const filteredMaterials = materials.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Update vendor name when vendorId changes
    useEffect(() => {
        if (form.vendorId) {
            const vendor = vendors.find(v => v.id == form.vendorId);
            if (vendor) {
                setForm(prev => ({
                    ...prev,
                    vendorName: vendor.name
                }));
            }
        }
    }, [form.vendorId, vendors]);

    const handleSave = () => {
       if (editItem) {
         setMaterials(materials.map(m => m.id === editItem.id ? { ...form, id: editItem.id } : m));
       } else {
         setMaterials([...materials, { ...form, id: Date.now() }]);
       }
       setForm({ name: '', unit: '', qty: 0, costPrice: 0, vendorId: '', vendorName: '' });
       setEditItem(null);
       setShowModal(null);
    };

    const handleDelete = (id) => {
        if(window.confirm('Hapus bahan ini?')) {
            setMaterials(materials.filter(m => m.id !== id));
        }
    }

    const handleEdit = (item) => {
        setEditItem(item);
        setForm(item);
        setShowModal('add-material');
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div>
              <h3 className="text-lg font-black text-slate-800 uppercase italic">Master Bahan Baku</h3>
              <p className="text-xs text-slate-500 font-medium">Stok tinta, bahan roll, kertas, dll.</p>
           </div>
           <div className="flex w-full md:w-auto gap-2">
             <div className="w-full md:w-64">
               <SearchInput placeholder="Cari Bahan..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
             </div>
             <button onClick={() => { setEditItem(null); setForm({ name: '', unit: '', qty: 0, costPrice: 0, vendorId: '', vendorName: '' }); setShowModal('add-material'); }} className="btn-primary flex items-center whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Bahan Baru</button>
           </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest">
               <tr>
                 <th className="p-4">Nama Bahan</th>
                 <th className="p-4">Vendor</th>
                 <th className="p-4">Satuan</th>
                 <th className="p-4 text-right">Harga Beli</th>
                 <th className="p-4">Stok Saat Ini</th>
                 <th className="p-4 text-center">Aksi</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {filteredMaterials.map(m => (
                 <tr key={m.id} className="hover:bg-slate-50">
                   <td className="p-4 font-bold">{m.name}</td>
                   <td className="p-4 text-sm text-slate-600">{m.vendorName || '-'}</td>
                   <td className="p-4 text-xs">{m.unit}</td>
                   <td className="p-4 text-right font-bold text-blue-600">{m.costPrice ? formatCurrency(m.costPrice) : '-'}</td>
                   <td className="p-4">{m.qty}</td>
                   <td className="p-4 text-center">
                     <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(m)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(m.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

        {/* Modal */}
        {showModal === 'add-material' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
             <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-black text-slate-800 uppercase italic">{editItem ? 'Edit Bahan' : 'Tambah Bahan'}</h3>
                  <button onClick={() => setShowModal(null)}><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                   <div>
                     <label className="label-text">Nama Bahan</label>
                     <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="Contoh: Tinta Cyan" />
                   </div>
                   <div>
                     <label className="label-text">Satuan</label>
                     <input type="text" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="input-field" placeholder="Liter/Roll/Pcs" />
                   </div>
                   <div>
                     <label className="label-text">Stok Awal</label>
                     <input type="number" value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} className="input-field" />
                   </div>
                   <div>
                     <label className="label-text">Harga Beli</label>
                     <input type="number" value={form.costPrice} onChange={e => setForm({...form, costPrice: e.target.value})} className="input-field" placeholder="0" />
                   </div>
                   <div>
                     <label className="label-text">Vendor/Pemasok</label>
                     <select value={form.vendorId} onChange={e => setForm({...form, vendorId: e.target.value})} className="input-field">
                       <option value="">-- Pilih Vendor --</option>
                       {vendors.filter(v => v.status === 'Aktif').map(v => (
                         <option key={v.id} value={v.id}>{v.name}</option>
                       ))}
                       <option value="0">Internal</option>
                     </select>
                   </div>
                   <button onClick={handleSave} className="btn-primary w-full mt-4">{editItem ? 'Simpan Perubahan' : 'Simpan'}</button>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  };

  const PengeluaranLain = () => {
    const [form, setForm] = useState({ vendor: '', item: '', price: 0, paymentMethod: 'Cash' });
    
    const handleSave = () => {
       if(editItem) {
          setExpenses(expenses.map(e => e.id === editItem.id ? { ...form, id: editItem.id } : e));
       } else {
          const newItem = { id: generateInvoiceCode('EXP'), date: new Date().toISOString().slice(0, 10), ...form };
          if (form.paymentMethod === 'Cash') setWallet(prev => ({...prev, cash: prev.cash - parseInt(form.price)})); else setWallet(prev => ({...prev, bank: prev.bank - parseInt(form.price)}));
          setExpenses([newItem, ...expenses]);
       }
       setForm({ vendor: '', item: '', price: 0, paymentMethod: 'Cash' });
       setEditItem(null);
       setShowModal(null);
    };

    const handleDelete = (id) => {
        if(window.confirm('Hapus data pengeluaran ini?')) {
            setExpenses(prev => prev.filter(e => e.id !== id));
        }
    }

    const handleEdit = (item) => {
        setEditItem(item);
        setForm(item);
        setShowModal('add-expense');
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div><h3 className="text-lg font-black text-slate-800 uppercase italic">Pengeluaran Operasional</h3><p className="text-xs text-slate-500 font-medium">Listrik, Air, Gaji, ATK, dll.</p></div>
           <button onClick={() => { setEditItem(null); setForm({ vendor: '', item: '', price: 0, paymentMethod: 'Cash' }); setShowModal('add-expense'); }} className="btn-primary flex items-center whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Catat Pengeluaran</button>
        </div>
        <FilterBar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} dateFilterMode={dateFilterMode} setDateFilterMode={setDateFilterMode} showStatus={false} statusFilter={null} setStatusFilter={null} />
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
           <table className="w-full text-left whitespace-nowrap text-sm"><thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b"><tr><th className="p-4">Tanggal</th><th className="p-4">Penerima</th><th className="p-4">Keperluan</th><th className="p-4">Nominal</th><th className="p-4 text-center">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredExpenses.map(e => (<tr key={e.id} className="hover:bg-slate-50"><td className="p-4 text-xs font-mono">{e.date}</td><td className="p-4 font-bold">{e.vendor}</td><td className="p-4">{e.item}</td><td className="p-4 font-black text-red-600">{formatCurrency(e.price)}</td><td className="p-4 text-center"><div className="flex justify-center gap-2"><button onClick={() => handleEdit(e)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit3 className="w-4 h-4" /></button><button onClick={() => handleDelete(e.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button></div></td></tr>))}</tbody></table>
        </div>
        {/* Modal */}
        {showModal === 'add-expense' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
             <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
                <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-black text-slate-800 uppercase italic">{editItem ? 'Edit Pengeluaran' : 'Input Pengeluaran'}</h3><button onClick={() => setShowModal(null)}><X className="w-5 h-5" /></button></div>
                <div className="space-y-4">
                   <div><label className="label-text">Penerima / Vendor</label><input type="text" value={form.vendor} onChange={e => setForm({...form, vendor: e.target.value})} className="input-field" placeholder="Contoh: PLN" /></div>
                   <div><label className="label-text">Keperluan</label><input type="text" value={form.item} onChange={e => setForm({...form, item: e.target.value})} className="input-field" placeholder="Bayar Listrik" /></div>
                   <div><label className="label-text">Nominal (Rp)</label><input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="input-field" /></div>
                   <div><label className="label-text">Sumber Dana</label><select className="input-field" value={form.paymentMethod} onChange={e => setForm({...form, paymentMethod: e.target.value})}><option value="Cash">Cash (Kasir)</option><option value="Transfer">Transfer (Bank)</option></select></div>
                   <button onClick={handleSave} className="btn-primary w-full mt-4">{editItem ? 'Simpan Perubahan' : 'Simpan'}</button>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  };

  const Withdraw = () => {
    const [form, setForm] = useState({ amount: 0, from: 'Bank', to: 'Cash' });
    const handleTransfer = () => {
       const amount = parseInt(form.amount);
       if (amount <= 0) return alert('Jumlah tidak valid');

       if (form.from === 'Bank' && wallet.bank >= amount) { 
           setWallet({ bank: wallet.bank - amount, cash: wallet.cash + amount }); 
           setWithdrawHistory([{ id: Date.now(), date: new Date().toISOString().slice(0, 10), from: 'Bank', to: 'Cash', amount }, ...withdrawHistory]);
           alert('Withdraw Sukses'); 
       } 
       else if (form.from === 'Cash' && wallet.cash >= amount) { 
           setWallet({ cash: wallet.cash - amount, bank: wallet.bank + amount }); 
           setWithdrawHistory([{ id: Date.now(), date: new Date().toISOString().slice(0, 10), from: 'Cash', to: 'Bank', amount }, ...withdrawHistory]);
           alert('Deposit Sukses'); 
       } 
       else { alert('Saldo tidak mencukupi'); }
    };

    return (
      <div className="max-w-2xl mx-auto space-y-6">
         <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><div className="flex items-center space-x-3 mb-2"><div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Banknote className="w-6 h-6"/></div><span className="text-xs font-black uppercase tracking-widest text-slate-400">Saldo Cash</span></div><h3 className="text-2xl font-black text-slate-800">{formatCurrency(wallet.cash)}</h3></div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><div className="flex items-center space-x-3 mb-2"><div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Landmark className="w-6 h-6"/></div><span className="text-xs font-black uppercase tracking-widest text-slate-400">Saldo Bank</span></div><h3 className="text-2xl font-black text-slate-800">{formatCurrency(wallet.bank)}</h3></div>
         </div>
         <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
             <h3 className="text-xl font-black text-slate-800 mb-6 uppercase italic text-center">Mutasi Kas / Withdraw</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-center gap-4 bg-slate-50 p-4 rounded-xl"><select className="font-bold bg-transparent outline-none text-right" value={form.from} onChange={e => setForm({...form, from: e.target.value, to: e.target.value === 'Bank' ? 'Cash' : 'Bank'})}><option value="Bank">Bank (Rekening)</option><option value="Cash">Cash (Kasir)</option></select><ArrowRightLeft className="w-5 h-5 text-slate-400" /><span className="font-bold text-slate-800">{form.to}</span></div>
                <div><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nominal</label><input type="number" className="w-full text-center text-3xl font-black text-slate-900 border-b-2 border-slate-200 py-4 outline-none focus:border-red-600 bg-transparent" placeholder="0" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} /></div>
                <button onClick={handleTransfer} className="btn-primary w-full py-4 mt-4">Proses Pemindahan</button>
             </div>
         </div>
         
         {/* HISTORY TABLE */}
         <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
             <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                 <History className="w-4 h-4 text-slate-400" />
                 <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Riwayat Mutasi</span>
             </div>
             <table className="w-full text-left whitespace-nowrap text-sm">
                 <thead className="bg-white text-slate-400 text-[10px] uppercase font-black tracking-widest border-b">
                     <tr><th className="p-4">Tanggal</th><th className="p-4">Dari</th><th className="p-4">Ke</th><th className="p-4 text-right">Nominal</th></tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                     {withdrawHistory.map((h, i) => (
                         <tr key={i} className="hover:bg-slate-50">
                             <td className="p-4 text-xs font-mono">{h.date}</td>
                             <td className="p-4 font-bold text-slate-700">{h.from}</td>
                             <td className="p-4 font-bold text-slate-700">{h.to}</td>
                             <td className="p-4 text-right font-black text-emerald-600">{formatCurrency(h.amount)}</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
      </div>
    );
  };

  const RekapCashflow = () => {
    const [activeSubmenu, setActiveSubmenu] = useState('penjualan');

    const submenus = [
      { id: 'penjualan', label: 'Penjualan', icon: TrendingUp },
      { id: 'belanja-bahan', label: 'Belanja Bahan', icon: ShoppingCart },
      { id: 'belanja-lainnya', label: 'Belanja Lainnya', icon: Receipt }
    ];

    const getDayName = (dateString) => {
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const date = new Date(dateString);
      return days[date.getDay()];
    };

    // Submenu Components
    const PenjualanSubmenu = () => (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-800 uppercase italic">Laporan Penjualan</h3>
          <p className="text-xs text-slate-500 font-medium">Rekap transaksi penjualan pelanggan.</p>
        </div>
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
            <tr>
              <th className="p-4">HARI</th>
              <th className="p-4">TGL</th>
              <th className="p-4">NOTA</th>
              <th className="p-4">CUSTOMER</th>
              <th className="p-4">METODE BAYAR</th>
              <th className="p-4">#</th>
              <th className="p-4 text-right">TAGIHAN</th>
              <th className="p-4 text-right">TERBAYAR</th>
              <th className="p-4 text-right">KURANG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {filteredSales.map((sale, idx) => (
              <tr key={sale.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono text-xs font-bold text-slate-600">{getDayName(sale.date)}</td>
                <td className="p-4 font-mono text-xs font-bold">{sale.date}</td>
                <td className="p-4 font-mono text-xs font-bold text-blue-600">{sale.id}</td>
                <td className="p-4 font-bold">{sale.buyer}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${
                    sale.paymentMethod === 'Cash' ? 'bg-emerald-100 text-emerald-700' :
                    sale.paymentMethod === 'Transfer' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {sale.paymentMethod}
                  </span>
                </td>
                <td className="p-4 text-center font-bold">{idx + 1}</td>
                <td className="p-4 text-right font-mono font-bold">{formatCurrency(sale.total)}</td>
                <td className="p-4 text-right font-mono font-bold text-emerald-600">{formatCurrency(sale.paid)}</td>
                <td className="p-4 text-right font-mono font-bold text-red-600">{formatCurrency(sale.remaining)}</td>
              </tr>
            ))}
            {filteredSales.length === 0 && <tr><td colSpan="9" className="p-8 text-center text-slate-400 text-xs italic">Belum ada transaksi penjualan pada periode ini.</td></tr>}
          </tbody>
        </table>
      </div>
    );

    const BelanjaBahanSubmenu = () => (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-800 uppercase italic">Laporan Belanja Bahan</h3>
          <p className="text-xs text-slate-500 font-medium">Rekap pembelian bahan baku dari supplier.</p>
        </div>
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
            <tr>
              <th className="p-4">HARI</th>
              <th className="p-4">TGL</th>
              <th className="p-4">NOTA</th>
              <th className="p-4">NAMA SUPPLIER</th>
              <th className="p-4">KONTAK</th>
              <th className="p-4">METODE BAYAR</th>
              <th className="p-4">#</th>
              <th className="p-4 text-right">TAGIHAN</th>
              <th className="p-4 text-right">TERBAYAR</th>
              <th className="p-4 text-right">KURANG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {filteredPurchases.map((purchase, idx) => (
              <tr key={purchase.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono text-xs font-bold text-slate-600">{getDayName(purchase.date)}</td>
                <td className="p-4 font-mono text-xs font-bold">{purchase.date}</td>
                <td className="p-4 font-mono text-xs font-bold text-red-600">{purchase.noTagihan}</td>
                <td className="p-4 font-bold">{purchase.vendor}</td>
                <td className="p-4">{purchase.salesName || '-'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${
                    purchase.paymentMethod === 'Cash' ? 'bg-emerald-100 text-emerald-700' :
                    purchase.paymentMethod === 'Transfer' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {purchase.paymentMethod}
                  </span>
                </td>
                <td className="p-4 text-center font-bold">{idx + 1}</td>
                <td className="p-4 text-right font-mono font-bold">{formatCurrency(purchase.total)}</td>
                <td className="p-4 text-right font-mono font-bold text-emerald-600">{formatCurrency(purchase.paid)}</td>
                <td className="p-4 text-right font-mono font-bold text-red-600">{formatCurrency(purchase.remaining)}</td>
              </tr>
            ))}
            {filteredPurchases.length === 0 && <tr><td colSpan="10" className="p-8 text-center text-slate-400 text-xs italic">Belum ada transaksi belanja bahan pada periode ini.</td></tr>}
          </tbody>
        </table>
      </div>
    );

    const BelanjaLainnyaSubmenu = () => (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-800 uppercase italic">Laporan Belanja Lainnya</h3>
          <p className="text-xs text-slate-500 font-medium">Rekap pengeluaran operasional lainnya.</p>
        </div>
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
            <tr>
              <th className="p-4">HARI</th>
              <th className="p-4">TGL</th>
              <th className="p-4">KETERANGAN</th>
              <th className="p-4">SUBJEK</th>
              <th className="p-4">METODE BAYAR</th>
              <th className="p-4">#</th>
              <th className="p-4 text-right">TAGIHAN</th>
              <th className="p-4 text-right">TERBAYAR</th>
              <th className="p-4 text-right">KURANG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {filteredExpenses.map((expense, idx) => (
              <tr key={expense.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono text-xs font-bold text-slate-600">{getDayName(expense.date)}</td>
                <td className="p-4 font-mono text-xs font-bold">{expense.date}</td>
                <td className="p-4 font-bold">{expense.item}</td>
                <td className="p-4">{expense.vendor}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${
                    expense.paymentMethod === 'Cash' ? 'bg-emerald-100 text-emerald-700' :
                    expense.paymentMethod === 'Transfer' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {expense.paymentMethod}
                  </span>
                </td>
                <td className="p-4 text-center font-bold">{idx + 1}</td>
                <td className="p-4 text-right font-mono font-bold">{formatCurrency(expense.price)}</td>
                <td className="p-4 text-right font-mono font-bold text-emerald-600">{formatCurrency(expense.paid)}</td>
                <td className="p-4 text-right font-mono font-bold text-red-600">{formatCurrency(expense.remaining)}</td>
              </tr>
            ))}
            {filteredExpenses.length === 0 && <tr><td colSpan="9" className="p-8 text-center text-slate-400 text-xs italic">Belum ada transaksi belanja lainnya pada periode ini.</td></tr>}
          </tbody>
        </table>
      </div>
    );

    const renderActiveSubmenu = () => {
      switch(activeSubmenu) {
        case 'penjualan':
          return <PenjualanSubmenu />;
        case 'belanja-bahan':
          return <BelanjaBahanSubmenu />;
        case 'belanja-lainnya':
          return <BelanjaLainnyaSubmenu />;
        default:
          return <PenjualanSubmenu />;
      }
    };

    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
        <FilterBar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} dateFilterMode={dateFilterMode} setDateFilterMode={setDateFilterMode} statusFilter={statusFilter} setStatusFilter={setStatusFilter} showStatus={false} />

        {/* Submenu Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-black text-slate-800 uppercase italic">Rekap Cashflow</h3>
            <p className="text-xs text-slate-500 font-medium">Pilih kategori laporan yang ingin ditampilkan.</p>
          </div>
          <div className="flex bg-slate-100 p-1 mx-6 mb-6 rounded-xl">
            {submenus.map(submenu => {
              const Icon = submenu.icon;
              return (
                <button
                  key={submenu.id}
                  onClick={() => setActiveSubmenu(submenu.id)}
                  className={`flex-1 py-3 text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 ${
                    activeSubmenu === submenu.id ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {submenu.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Submenu Content */}
        {renderActiveSubmenu()}
      </div>
    );
  };

  const Modal = () => {
    if (!showModal || !editItem || ['add-product', 'add-material', 'add-purchase', 'add-expense', 'add-vendor'].includes(showModal)) return null;
    const [payAdd, setPayAdd] = useState(0);
    const handleAddPayment = () => {
       const newPaid = editItem.paid + parseInt(payAdd); const newRemaining = editItem.total - newPaid;
       const updatedItem = { ...editItem, paid: newPaid, remaining: newRemaining < 0 ? 0 : newRemaining, status: newRemaining <= 0 ? 'lunas' : 'belum_lunas' };
       if (showModal === 'invoice-detail') { setSalesInvoices(salesInvoices.map(i => i.id === editItem.id ? updatedItem : i)); setWallet(prev => ({...prev, cash: prev.cash + parseInt(payAdd)})); } 
       else if (showModal === 'invoice-detail-purchase') { setPurchaseInvoices(purchaseInvoices.map(i => i.id === editItem.id ? updatedItem : i)); setWallet(prev => ({...prev, cash: prev.cash - parseInt(payAdd)})); }
       setShowModal(null); setEditItem(null); alert('Pembayaran berhasil diupdate');
    };

    if (showModal === 'invoice-print' || showModal === 'invoice-detail' || showModal === 'invoice-print-purchase' || showModal === 'invoice-detail-purchase') {
        const isPurchase = showModal.includes('purchase');
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 overflow-y-auto">
                <div className="bg-white w-full max-w-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 rounded-lg"> 
                    <div className="p-8 bg-white" id="printable-area">
                        {/* Header Invoice */}
                        <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-6">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">{isPurchase ? 'NOTA BELANJA' : <span>SAZIME <span className="text-red-600">PRINT</span></span>}</h1>
                                {isPurchase ? (
                                    <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">{editItem.vendor}</p>
                                ) : (
                                    <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Digital Printing & Advertising</p>
                                )}
                                <p className="text-xs text-slate-500 mt-1 max-w-[250px]">{isPurchase ? editItem.address : 'Jl. Raya Sazime No. 123, Semarang, Jawa Tengah. Telp: 0812-3456-7890'}</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">{isPurchase ? 'PURCHASE ORDER' : 'INVOICE'}</h2>
                                <p className="text-sm font-mono font-bold text-red-600 mt-1">#{isPurchase ? editItem.noTagihan : editItem.id}</p>
                                <p className="text-xs text-slate-500 font-bold mt-1">{editItem.date}</p>
                            </div>
                        </div>

                        {/* Customer/Supplier Info */}
                        <div className="flex justify-between mb-8">
                            <div className="w-1/2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isPurchase ? 'Supplier:' : 'Kepada Yth:'}</p>
                                <h3 className="text-lg font-bold text-slate-900">{isPurchase ? editItem.vendor : editItem.buyer}</h3>
                                {isPurchase && <p className="text-xs text-slate-500">Sales: {editItem.salesName}</p>}
                            </div>
                            <div className="w-1/2 text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Metode Pembayaran:</p>
                                <span className="inline-block px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-700 uppercase">{editItem.paymentMethod}</span>
                            </div>
                        </div>

                        {/* Table Items */}
                        <table className="w-full text-left text-[10px] mb-8 border-collapse">
                            <thead>
                                <tr className="border-y-2 border-slate-800">
                                    <th className="py-2 px-1 text-center">NO</th>
                                    <th className="py-2 px-1">NAMA ITEM</th>
                                    {isPurchase && <th className="py-2 px-1 text-center">LOT</th>}
                                    {!isPurchase && <th className="py-2 px-1">ITEM</th>}
                                    <th className="py-2 px-1 text-center">L</th>
                                    <th className="py-2 px-1 text-center">P</th>
                                    <th className="py-2 px-1 text-center">QTY</th>
                                    <th className="py-2 px-1 text-center">LUAS</th>
                                    <th className="py-2 px-1 text-center">SAT</th>
                                    <th className="py-2 px-1 text-right">HARGA</th>
                                    <th className="py-2 px-1 text-right">DISC</th>
                                    <th className="py-2 px-1 text-right">SUB TOTAL</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {editItem.items.map((item, i) => (
                                    <tr key={i}>
                                        <td className="py-2 px-1 text-center font-medium">{i + 1}</td>
                                        <td className="py-2 px-1 font-bold">{item.name}</td>
                                        {isPurchase && <td className="py-2 px-1 text-center text-slate-500">{item.lot || '-'}</td>}
                                        {!isPurchase && <td className="py-2 px-1 text-slate-600">{item.itemDesc}</td>}
                                        <td className="py-2 px-1 text-center">{item.width || '-'}</td>
                                        <td className="py-2 px-1 text-center">{item.length || '-'}</td>
                                        <td className="py-2 px-1 text-center font-bold">{item.qty}</td>
                                        <td className="py-2 px-1 text-center">{item.area > 0 ? item.area.toFixed(2) : '-'}</td>
                                        <td className="py-2 px-1 text-center">{item.purchaseUnit || item.unit}</td>
                                        <td className="py-2 px-1 text-right">{formatCurrency(item.price)}</td>
                                        <td className="py-2 px-1 text-right text-red-500">{item.discount > 0 ? formatCurrency(item.discount) : '-'}</td>
                                        <td className="py-2 px-1 text-right font-bold">{formatCurrency(item.subtotal)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Summary & Footer */}
                        <div className="flex flex-row justify-between items-start">
                            <div className="w-1/2 pr-8">
                                <div className="border p-4 rounded-xl bg-slate-50 text-center h-full flex flex-col justify-center">
                                    <p className="text-xs text-slate-500 italic mb-2">"Terima kasih atas kerjasamanya."</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold mt-4">Hormat Kami,</p>
                                    <div className="h-16"></div>
                                    <p className="text-xs font-bold text-slate-700 underline decoration-slate-300 underline-offset-4">{isPurchase ? 'Bagian Pembelian' : 'Admin Sazime'}</p>
                                </div>
                            </div>
                            <div className="w-1/2 pl-8">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-slate-500">Total Tagihan</span>
                                        <span className="font-black text-slate-900 text-lg">{formatCurrency(editItem.total)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-dashed border-slate-200 pb-3">
                                        <span className="font-bold text-slate-500">Terbayar</span>
                                        <span className="font-bold text-slate-700">{formatCurrency(editItem.paid)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-base pt-1">
                                        <span className="font-black text-slate-700 uppercase tracking-tight">Sisa Tagihan</span>
                                        <span className={`font-black text-xl ${editItem.remaining > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                            {formatCurrency(editItem.remaining)}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-right">
                                        <span className={`inline-block px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest ${editItem.remaining <= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                            {editItem.remaining <= 0 ? 'LUNAS' : 'BELUM LUNAS'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Print Footer */}
                        <div className="mt-12 border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] text-slate-400">
                            <p>Dicetak pada: {new Date().toLocaleString('id-ID')}</p>
                            <p>Halaman 1 dari 1</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 flex justify-end gap-3 border-t border-slate-200 print:hidden">
                        <button onClick={() => setShowModal(null)} className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition">Tutup</button>
                        <button onClick={() => window.print()} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition flex items-center shadow-lg">
                            <Printer className="w-4 h-4 mr-2" /> Cetak Nota
                        </button>
                    </div>
                    {/* Print CSS */}
                    <style>{`
                        @media print {
                            body * { visibility: hidden; }
                            #printable-area, #printable-area * { visibility: visible; }
                            #printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 0; margin: 0; }
                            @page { size: auto; margin: 0mm; }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 selection:bg-red-100">
      <style>{`
        .input-field { width: 100%; padding: 0.75rem 1rem; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 700; outline: none; transition: all 0.2s; }
        .input-field:focus { border-color: #dc2626; background-color: #fff; box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1); }
        .label-text { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 0.35rem; display: block; margin-left: 0.25rem; }
        .btn-primary { background-color: #dc2626; color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 900; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2); }
        .btn-primary:hover { background-color: #b91c1c; transform: translateY(-1px); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .pb-safe-area { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col relative w-full">
         <header className="lg:hidden h-16 bg-red-700 text-white flex items-center px-4 sticky top-0 z-40 shadow-md"><h1 className="font-black text-xl italic tracking-tight">{activeMenu.replace(/-/g, ' ').toUpperCase()}</h1></header>
         <header className="hidden lg:flex h-20 bg-white/80 backdrop-blur border-b border-slate-200 items-center justify-between px-8 sticky top-0 z-40"><h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight">{activeMenu.replace(/-/g, ' ')}</h2><div className="flex items-center space-x-4"><div className="text-right"><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Saldo Kas</p><p className="font-black text-slate-900 text-lg">{formatCurrency(wallet.cash)}</p></div><div className="h-8 w-[1px] bg-slate-200 mx-2"></div><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black shadow-lg shadow-red-200">A</div></div></header>
         <main className="flex-1 p-4 md:p-8 pb-24 lg:pb-8 max-w-[1600px] mx-auto w-full">
            {activeMenu === 'dashboard' && <Dashboard />}
            {activeMenu === 'database-produk' && <DatabaseProduk />}
            {activeMenu === 'database-vendor' && <DatabaseVendor />}
            {activeMenu === 'nota-pelanggan' && <NotaPelanggan />}
            {activeMenu === 'rekap-cashflow' && <RekapCashflow />}
            {activeMenu === 'master-bahan' && <MasterBahan />}
            {activeMenu === 'nota-supplier' && <NotaSupplier />}
            {activeMenu === 'pengeluaran-lain' && <PengeluaranLain />}
            {activeMenu === 'withdraw' && <Withdraw />}
         </main>
      </div>
      <BottomNavbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      {showModal && <Modal />}
    </div>
  );
};

export default App;