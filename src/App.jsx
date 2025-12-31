import React, { useState, useMemo, useEffect } from 'react';
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
  ArrowRightLeft, BadgePercent, Trash2, Banknote, Landmark, Layers, History, Scissors
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
      {/* GROUP: TRANSAKSI (Sering Diakses) */}
      <div className="mb-2 px-3 text-[10px] font-black uppercase text-slate-500 tracking-widest mt-2">Utama</div>
      {[
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'invoice-penjualan', icon: ShoppingCart, label: 'Penjualan (Kasir)' },
        { id: 'invoice-belanja', icon: Truck, label: 'Belanja Bahan' },
        { id: 'pengeluaran-lain', icon: FileText, label: 'Pengeluaran Lain' },
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

      {/* GROUP: MASTER DATA */}
      <div className="mb-2 px-3 text-[10px] font-black uppercase text-slate-500 tracking-widest mt-6">Master Data</div>
      {[
        { id: 'input-produk', icon: Package, label: 'Master Produk Jual' },
        { id: 'input-bahan', icon: Layers, label: 'Master Bahan Baku' },
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
      <div className="mb-2 px-3 text-[10px] font-black uppercase text-slate-500 tracking-widest mt-6">Keuangan & Laporan</div>
      {[
        { id: 'rekap-penjualan', icon: FileSpreadsheet, label: 'Laporan Penjualan' },
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
      { id: 'invoice-penjualan', icon: ShoppingCart, label: 'Jual' },
      { id: 'invoice-belanja', icon: Truck, label: 'Beli' },
      { id: 'rekap-penjualan', icon: FileSpreadsheet, label: 'Rekap' },
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
  // Produk Jual - Dimensi dalam cm, Stok Unit menyesuaikan satuan
  const [products, setProducts] = useState([
    { id: 1, name: 'Banner Flexi 280gr', unit: 'Roll', width: 320, length: 5000, area: 0, qty: 5, priceBroker: 15000, priceRetail: 25000 },
    { id: 2, name: 'Sticker Vinyl Standard', unit: 'Roll', width: 120, length: 5000, area: 0, qty: 10, priceBroker: 45000, priceRetail: 65000 },
    { id: 3, name: 'Sticker Ritrama', unit: 'Roll', width: 150, length: 5000, area: 0, qty: 3, priceBroker: 65000, priceRetail: 85000 },
    { id: 4, name: 'Kartu Nama 1 Sisi', unit: 'Box', width: 9, length: 5.5, area: 0, qty: 200, priceBroker: 30000, priceRetail: 45000 }, // Dimensi per pcs/lembar
    { id: 5, name: 'X-Banner Stand Only', unit: 'Pcs', width: 0, length: 0, area: 0, qty: 15, priceBroker: 45000, priceRetail: 60000 },
  ]);

  const [materials, setMaterials] = useState([
    { id: 1, name: 'Tinta Ecosolvent Cyan', unit: 'Liter', qty: 10 },
    { id: 2, name: 'Tinta Ecosolvent Magenta', unit: 'Liter', qty: 8 },
    { id: 3, name: 'Tinta Ecosolvent Yellow', unit: 'Liter', qty: 9 },
    { id: 4, name: 'Tinta Ecosolvent Black', unit: 'Liter', qty: 7 },
    { id: 5, name: 'Mata Ayam (Eyelet)', unit: 'Pack', qty: 50 },
  ]);

  const _now = new Date();
  const currentMonthPrefix = `${_now.getFullYear()}-${String(_now.getMonth() + 1).padStart(2, '0')}`;

  const [salesInvoices, setSalesInvoices] = useState([
    { id: 'INV-20250101-1234', date: `${currentMonthPrefix}-01`, buyer: 'Budi Santoso', priceType: 'retail', items: [{ productId: 1, name: 'Banner Flexi 280gr (200x100 cm)', price: 50000, qty: 1, discount: 0, subtotal: 50000 }], total: 50000, paid: 50000, remaining: 0, paymentMethod: 'Cash', status: 'lunas' },
    { id: 'INV-20250102-5678', date: `${currentMonthPrefix}-02`, buyer: 'CV Maju Jaya', priceType: 'broker', items: [{ productId: 2, name: 'Sticker Vinyl', price: 45000, qty: 10, discount: 10000, subtotal: 440000 }], total: 440000, paid: 200000, remaining: 240000, paymentMethod: 'Transfer', status: 'belum_lunas' },
  ]);

  const [purchaseInvoices, setPurchaseInvoices] = useState([
    { id: 'BUY-20250101-9999', date: `${currentMonthPrefix}-01`, vendor: 'Toko Warna Abadi', vendorType: 'mitra', item: 'Tinta Cyan', price: 300000, qty: 2, total: 600000, paid: 600000, remaining: 0, paymentMethod: 'Transfer', status: 'lunas' },
  ]);

  const [expenses, setExpenses] = useState([
    { id: 'EXP-20250105-1111', date: `${currentMonthPrefix}-05`, vendor: 'PLN', vendorType: 'non-mitra', item: 'Listrik Bulan Ini', price: 1500000, paymentMethod: 'Transfer' },
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
    let topProductsChart = sortedProducts.length > 10 ? sortedProducts.slice(0, 10).concat({ name: 'Lainnya', value: sortedProducts.slice(10).reduce((a,c)=>a+c.value,0)}) : sortedProducts;
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
             <h3 className="text-lg font-black text-slate-800 mb-4 uppercase italic">Top 10 Produk Terlaris</h3>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={topProductsChart} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {topProductsChart.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius:'12px', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const InputProduk = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({ name: '', unit: '', width: 0, length: 0, qty: 0, priceBroker: 0, priceRetail: 0 });
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const area = parseFloat(form.width) * parseFloat(form.length);
      const payload = { ...form, area, qty: parseInt(form.qty), priceBroker: parseInt(form.priceBroker), priceRetail: parseInt(form.priceRetail) };
      
      if (editItem) {
        setProducts(products.map(p => p.id === editItem.id ? { ...payload, id: editItem.id } : p));
      } else {
        setProducts([...products, { ...payload, id: Date.now() }]);
      }
      setForm({ name: '', unit: '', width: 0, length: 0, qty: 0, priceBroker: 0, priceRetail: 0 });
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
              <h3 className="text-lg font-black text-slate-800 uppercase italic">Master Produk</h3>
              <p className="text-xs text-slate-500 font-medium">Kelola data barang yang dijual.</p>
           </div>
           <div className="flex w-full md:w-auto gap-2">
             <div className="w-full md:w-64">
               <SearchInput placeholder="Cari Produk..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
             </div>
             <button onClick={() => { setEditItem(null); setForm({ name: '', unit: '', width: 0, length: 0, qty: 0, priceBroker: 0, priceRetail: 0 }); setShowModal('add-product'); }} className="btn-primary flex items-center whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Produk Baru</button>
           </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest">
              <tr>
                <th className="p-4">Nama Produk</th>
                <th className="p-4">Dimensi Unit</th>
                <th className="p-4">Stok Unit</th>
                <th className="p-4">Total Luas Stok</th>
                <th className="p-4 text-right">Harga Broker</th>
                <th className="p-4 text-right">Harga Ritel</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold">{p.name}</td>
                  <td className="p-4 text-xs font-mono">{p.width > 0 ? `${p.width} x ${p.length} cm` : '-'}</td>
                  <td className="p-4 font-bold text-slate-700">{p.qty} {p.unit}</td>
                  <td className="p-4 text-xs font-mono font-bold text-slate-600">
                    {p.width > 0 && p.length > 0 
                      ? `${((p.width * p.length * p.qty) / 10000).toLocaleString('id-ID')} m²` 
                      : '-'}
                  </td>
                  <td className="p-4 text-right font-mono text-xs">{formatCurrency(p.priceBroker)}</td>
                  <td className="p-4 text-right font-bold text-red-600">{formatCurrency(p.priceRetail)}</td>
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
                   <label className="label-text">Nama Produk</label>
                   <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="Contoh: Banner Flexi" />
                 </div>
                 <div>
                   <label className="label-text">Satuan Stok (Roll/Lbr/Pcs)</label>
                   <input type="text" required value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="input-field" placeholder="Roll" />
                 </div>
                 <div>
                   <label className="label-text">Jumlah Stok Awal</label>
                   <input type="number" required value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} className="input-field" />
                 </div>
                 <div>
                   <label className="label-text">Lebar per Unit (cm) - Optional</label>
                   <input type="number" step="0.01" value={form.width} onChange={e => setForm({...form, width: e.target.value})} className="input-field" placeholder="0" />
                 </div>
                 <div>
                    <label className="label-text">Panjang per Unit (cm) - Optional</label>
                   <input type="number" step="0.01" value={form.length} onChange={e => setForm({...form, length: e.target.value})} className="input-field" placeholder="0" />
                 </div>
                 <div>
                   <label className="label-text">Harga Broker (Reseller)</label>
                   <input type="number" required value={form.priceBroker} onChange={e => setForm({...form, priceBroker: e.target.value})} className="input-field" />
                 </div>
                 <div>
                   <label className="label-text">Harga Ritel (Umum)</label>
                   <input type="number" required value={form.priceRetail} onChange={e => setForm({...form, priceRetail: e.target.value})} className="input-field" />
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

  const InvoicePenjualan = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDeleteInvoice = (id) => {
        if(window.confirm('Hapus transaksi penjualan ini?')) {
            setSalesInvoices(prev => prev.filter(i => i.id !== id));
        }
    }

    const InvoiceForm = () => {
      const [inv, setInv] = useState({ buyer: '', priceType: 'retail', selectedProductId: '', qty: 1, discount: 0, paymentMethod: 'Cash', payAmount: 0 });
      const [customSize, setCustomSize] = useState({ width: 0, length: 0, isCustom: false });
      const [cart, setCart] = useState([]);
      
      const selectedProduct = products.find(p => p.id == inv.selectedProductId);
      const unitPrice = selectedProduct ? (inv.priceType === 'retail' ? selectedProduct.priceRetail : selectedProduct.priceBroker) : 0;
      
      // Calculate Subtotal Item
      let subTotalItem = 0;
      let displayPrice = unitPrice;
      
      if (customSize.isCustom && selectedProduct) {
          // Logic: (L x P / 10000) * PricePerM2 * Qty
          const areaM2 = (customSize.width * customSize.length) / 10000;
          const itemPrice = areaM2 * unitPrice; // Price for one piece of this dimension
          subTotalItem = (itemPrice * inv.qty) - inv.discount;
          displayPrice = itemPrice;
      } else {
          subTotalItem = (unitPrice * inv.qty) - inv.discount;
      }

      const totalTagihan = cart.reduce((acc, item) => acc + item.subtotal, 0);
      const remaining = totalTagihan - inv.payAmount;

      const addToCart = () => {
        if (!selectedProduct) return;
        
        let itemName = selectedProduct.name;
        let finalPrice = unitPrice;
        let finalSubtotal = subTotalItem;

        if (customSize.isCustom) {
            itemName = `${selectedProduct.name} (${customSize.width}x${customSize.length} cm)`;
            // Price displayed in cart will be price per piece of that dimension
            finalPrice = (customSize.width * customSize.length / 10000) * unitPrice;
        }

        setCart([...cart, { 
            productId: selectedProduct.id, 
            name: itemName, 
            price: finalPrice, 
            qty: parseInt(inv.qty), 
            discount: parseInt(inv.discount), 
            subtotal: finalSubtotal 
        }]);
        setInv({...inv, selectedProductId: '', qty: 1, discount: 0});
        setCustomSize({ width: 0, length: 0, isCustom: false });
      };

      const handleSaveInvoice = () => {
        if (!inv.buyer || cart.length === 0) return alert('Data tidak lengkap');
        const newInvoice = {
          id: generateInvoiceCode(), date: new Date().toISOString().slice(0, 10),
          buyer: inv.buyer, priceType: inv.priceType, items: cart, total: totalTagihan,
          paid: parseInt(inv.payAmount), remaining: remaining < 0 ? 0 : remaining,
          paymentMethod: inv.paymentMethod, status: remaining <= 0 ? 'lunas' : 'belum_lunas'
        };
        if (inv.paymentMethod === 'Cash') setWallet(prev => ({...prev, cash: prev.cash + parseInt(inv.payAmount)}));
        else setWallet(prev => ({...prev, bank: prev.bank + parseInt(inv.payAmount)}));
        setSalesInvoices([newInvoice, ...salesInvoices]);
        setIsCreatingInvoice(false);
      };

      return (
        <div className="animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center mb-6">
             <button onClick={() => setIsCreatingInvoice(false)} className="mr-4 p-2 rounded-full hover:bg-slate-200 transition"><ArrowLeft className="w-5 h-5"/></button>
             <h3 className="text-xl font-black text-slate-800 uppercase italic">Invoice Baru</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div><label className="label-text">Nama Pembeli</label><input type="text" value={inv.buyer} onChange={e => setInv({...inv, buyer: e.target.value})} className="input-field" /></div>
                    <div><label className="label-text">Tipe Harga</label><select value={inv.priceType} onChange={e => setInv({...inv, priceType: e.target.value})} className="input-field"><option value="retail">Ritel (Umum)</option><option value="broker">Broker (Reseller)</option></select></div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4 space-y-3">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <label className="label-text">Pilih Produk</label>
                            <select value={inv.selectedProductId} onChange={e => { setInv({...inv, selectedProductId: e.target.value}); setCustomSize({...customSize, isCustom: false}); }} className="input-field">
                                <option value="">-- Pilih Produk --</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>
                        
                        {/* CUSTOM SIZE TOGGLE */}
                        {selectedProduct && (
                            <div className="col-span-2">
                                <div className="flex items-center gap-2 mb-2 p-2 bg-white rounded-lg border border-slate-200 w-fit cursor-pointer" onClick={() => setCustomSize(prev => ({...prev, isCustom: !prev.isCustom}))}>
                                    <Scissors className={`w-4 h-4 ${customSize.isCustom ? 'text-red-600' : 'text-slate-400'}`} />
                                    <span className={`text-xs font-bold ${customSize.isCustom ? 'text-red-600' : 'text-slate-500'}`}>Input Ukuran Custom (Cetak)</span>
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ml-2 ${customSize.isCustom ? 'bg-red-600 border-red-600' : 'border-slate-300'}`}>
                                        {customSize.isCustom && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                </div>
                                {customSize.isCustom && (
                                    <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2">
                                        <div><label className="label-text">Lebar (cm)</label><input type="number" value={customSize.width} onChange={e => setCustomSize({...customSize, width: e.target.value})} className="input-field" placeholder="0" /></div>
                                        <div><label className="label-text">Panjang (cm)</label><input type="number" value={customSize.length} onChange={e => setCustomSize({...customSize, length: e.target.value})} className="input-field" placeholder="0" /></div>
                                        <div className="col-span-2 text-[10px] text-slate-500 italic text-right">
                                            Luas: {((customSize.width * customSize.length) / 10000).toFixed(4)} m² x {formatCurrency(unitPrice)}/m² = {formatCurrency(((customSize.width * customSize.length) / 10000) * unitPrice)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div><label className="label-text">Qty</label><input type="number" value={inv.qty} onChange={e => setInv({...inv, qty: e.target.value})} className="input-field" /></div>
                        <div><label className="label-text">Diskon Item (Rp)</label><input type="number" value={inv.discount} onChange={e => setInv({...inv, discount: e.target.value})} className="input-field" /></div>
                     </div>
                     <div className="flex justify-between items-center mt-2"><span className="font-bold text-slate-700">Subtotal: {formatCurrency(subTotalItem)}</span><button onClick={addToCart} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-slate-800">+ Tambah</button></div>
                  </div>
                  <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-red-50 text-red-600 text-[10px] uppercase font-black"><tr><th className="p-3">Produk</th><th className="p-3 text-right">Harga</th><th className="p-3 text-center">Qty</th><th className="p-3 text-right">Total</th></tr></thead><tbody className="divide-y divide-slate-100">{cart.map((item, idx) => (<tr key={idx}><td className="p-3 font-bold">{item.name}</td><td className="p-3 text-right">{formatCurrency(item.price)}</td><td className="p-3 text-center">{item.qty}</td><td className="p-3 text-right font-black">{formatCurrency(item.subtotal)}</td></tr>))}</tbody></table></div>
               </div>
            </div>
            <div className="space-y-6">
               <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-xs font-bold text-slate-400 uppercase">Total Tagihan</p>
                  <h2 className="text-4xl font-black mt-2">{formatCurrency(totalTagihan)}</h2>
                  <div className="mt-6 space-y-4">
                     <div><label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Metode Pembayaran</label><select className="w-full bg-slate-800 border-none text-white p-3 rounded-lg font-bold" value={inv.paymentMethod} onChange={e => setInv({...inv, paymentMethod: e.target.value})}><option value="Cash">Cash</option><option value="Transfer">Transfer</option></select></div>
                     <div><label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Bayar (Rp)</label><input type="number" value={inv.payAmount} onChange={e => setInv({...inv, payAmount: e.target.value})} className="w-full bg-slate-800 border-none text-white p-3 rounded-lg font-bold" /></div>
                  </div>
                  <button onClick={handleSaveInvoice} className="w-full mt-6 bg-red-600 py-3.5 rounded-xl font-black uppercase text-sm hover:bg-red-500">Simpan Transaksi</button>
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
                  <h3 className="text-lg font-black text-slate-800 uppercase italic">Riwayat Penjualan</h3>
                  <p className="text-xs text-slate-500 font-medium">Daftar transaksi kasir.</p>
               </div>
               <div className="flex w-full md:w-auto gap-2">
                 <div className="w-full md:w-48"><SearchInput placeholder="Cari Nama/Invoice..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
                 <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-2 outline-none"><option value="all">Semua Status</option><option value="lunas">Lunas</option><option value="belum_lunas">Belum Lunas</option></select>
                 <button onClick={() => setIsCreatingInvoice(true)} className="btn-primary flex items-center whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Transaksi Baru</button>
               </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left whitespace-nowrap">
                 <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b">
                   <tr><th className="p-4">Invoice</th><th className="p-4">Tanggal</th><th className="p-4">Pembeli</th><th className="p-4">Total</th><th className="p-4">Sisa</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Detail</th></tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 text-sm">{filteredList.map(inv => (<tr key={inv.id} className="hover:bg-slate-50"><td className="p-4 font-mono text-xs font-bold">{inv.id}</td><td className="p-4 text-xs text-slate-500">{inv.date}</td><td className="p-4 font-bold">{inv.buyer}</td><td className="p-4 font-black">{formatCurrency(inv.total)}</td><td className="p-4 font-bold text-red-500">{formatCurrency(inv.remaining)}</td><td className="p-4 text-center"><span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${inv.status === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{inv.status.replace('_', ' ')}</span></td><td className="p-4 text-center"><div className="flex justify-center gap-2"><button onClick={() => { setEditItem(inv); setShowModal('invoice-detail'); }} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600"><Eye className="w-4 h-4" /></button><button onClick={() => handleDeleteInvoice(inv.id)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600"><Trash2 className="w-4 h-4" /></button></div></td></tr>))}</tbody>
              </table>
            </div>
         </div>
       );
    };

    return isCreatingInvoice ? <InvoiceForm /> : <InvoiceList />;
  };

  const InputBahan = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({ name: '', unit: '', qty: 0 });
    const filteredMaterials = materials.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSave = () => {
       if (editItem) {
         setMaterials(materials.map(m => m.id === editItem.id ? { ...form, id: editItem.id } : m));
       } else {
         setMaterials([...materials, { ...form, id: Date.now() }]);
       }
       setForm({ name: '', unit: '', qty: 0 });
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
             <button onClick={() => { setEditItem(null); setForm({ name: '', unit: '', qty: 0 }); setShowModal('add-material'); }} className="btn-primary flex items-center whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Bahan Baru</button>
           </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest">
               <tr>
                 <th className="p-4">Nama Bahan</th>
                 <th className="p-4">Satuan</th>
                 <th className="p-4">Stok Saat Ini</th>
                 <th className="p-4 text-center">Aksi</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {filteredMaterials.map(m => (
                 <tr key={m.id} className="hover:bg-slate-50">
                   <td className="p-4 font-bold">{m.name}</td>
                   <td className="p-4 text-xs">{m.unit}</td>
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
                   <button onClick={handleSave} className="btn-primary w-full mt-4">{editItem ? 'Simpan Perubahan' : 'Simpan'}</button>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  };

  const InvoiceBelanja = () => {
    // Default form state, 'targetType' determines where the stock goes
    const [form, setForm] = useState({ vendor: '', vendorType: 'mitra', targetType: 'material', itemId: '', price: 0, qty: 1, paymentMethod: 'Cash', payAmount: 0 });
    const total = form.price * form.qty;
    const remaining = total - form.payAmount;

    // Helper to get unit of selected item
    const getSelectedUnit = () => {
        if (!form.itemId) return '';
        if (form.targetType === 'material') {
            const m = materials.find(x => x.id == form.itemId);
            return m ? `(${m.unit})` : '';
        } else {
            const p = products.find(x => x.id == form.itemId);
            return p ? `(${p.unit})` : '';
        }
    };

    const handleDelete = (id) => {
        if(window.confirm('Hapus riwayat belanja ini?')) {
            setPurchaseInvoices(prev => prev.filter(i => i.id !== id));
        }
    }

    const handleSave = () => {
       // Logic to find Item Name based on ID and Type
       let itemName = '';
       if (form.targetType === 'material') {
           const mat = materials.find(m => m.id == form.itemId);
           itemName = mat ? mat.name : 'Unknown Material';
           // Update Stock Material
           setMaterials(prev => prev.map(m => m.id == form.itemId ? {...m, qty: parseInt(m.qty) + parseInt(form.qty)} : m));
       } else {
           const prod = products.find(p => p.id == form.itemId);
           itemName = prod ? prod.name : 'Unknown Product';
           // Update Stock Product
           setProducts(prev => prev.map(p => p.id == form.itemId ? {...p, qty: parseInt(p.qty) + parseInt(form.qty)} : p));
       }

       const newItem = { 
           id: generateInvoiceCode('BUY'), 
           date: new Date().toISOString().slice(0, 10), 
           ...form, 
           item: itemName, // Display name for table
           total, 
           paid: parseInt(form.payAmount), 
           remaining: remaining < 0 ? 0 : remaining, 
           status: remaining <= 0 ? 'lunas' : 'belum_lunas' 
       };

       if (form.paymentMethod === 'Cash') setWallet(prev => ({...prev, cash: prev.cash - parseInt(form.payAmount)})); 
       else setWallet(prev => ({...prev, bank: prev.bank - parseInt(form.payAmount)}));
       
       setPurchaseInvoices([newItem, ...purchaseInvoices]);
       setShowModal(null);
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div><h3 className="text-lg font-black text-slate-800 uppercase italic">Belanja Bahan</h3><p className="text-xs text-slate-500 font-medium">Rekap pembelian stok dari vendor.</p></div>
           <button onClick={() => { setForm({ vendor: '', vendorType: 'mitra', targetType: 'material', itemId: '', price: 0, qty: 1, paymentMethod: 'Cash', payAmount: 0 }); setShowModal('add-purchase'); }} className="btn-primary flex items-center whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Catat Belanja</button>
        </div>
        <FilterBar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} dateFilterMode={dateFilterMode} setDateFilterMode={setDateFilterMode} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
           <table className="w-full text-left whitespace-nowrap text-sm"><thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b"><tr><th className="p-4">Vendor</th><th className="p-4">Item</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4 text-center">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredPurchases.map(p => (<tr key={p.id} className="hover:bg-slate-50"><td className="p-4 font-bold">{p.vendor} <span className="text-[10px] font-normal text-slate-400 block">{p.vendorType}</span></td><td className="p-4">{p.item} <span className="text-[10px] font-mono text-slate-400 block">{p.id}</span></td><td className="p-4 font-black text-red-600">{formatCurrency(p.total)}</td><td className="p-4"><span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${p.status === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.status.replace('_', ' ')}</span></td><td className="p-4 text-center"><div className="flex justify-center gap-2"><button onClick={() => { setEditItem(p); setShowModal('invoice-detail-purchase'); }} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600"><Eye className="w-4 h-4" /></button><button onClick={() => handleDelete(p.id)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600"><Trash2 className="w-4 h-4" /></button></div></td></tr>))}</tbody></table>
        </div>
        {/* Modal */}
        {showModal === 'add-purchase' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
             <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6">
                <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-black text-slate-800 uppercase italic">Input Belanja</h3><button onClick={() => setShowModal(null)}><X className="w-5 h-5" /></button></div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="col-span-2"><label className="label-text">Nama Vendor</label><input type="text" value={form.vendor} onChange={e => setForm({...form, vendor: e.target.value})} className="input-field" /></div>
                   <div className="col-span-2"><label className="label-text">Tipe Vendor</label><select className="input-field" value={form.vendorType} onChange={e => setForm({...form, vendorType: e.target.value})}><option value="mitra">Mitra Langganan</option><option value="non-mitra">Umum / Non-Mitra</option></select></div>
                   
                   {/* PILIHAN TARGET STOK */}
                   <div className="col-span-2">
                       <label className="label-text">Simpan ke Stok</label>
                       <div className="flex bg-slate-100 p-1 rounded-xl mb-2">
                           <button onClick={() => setForm({...form, targetType: 'material', itemId: ''})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${form.targetType === 'material' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}>Bahan Baku</button>
                           <button onClick={() => setForm({...form, targetType: 'product', itemId: ''})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${form.targetType === 'product' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}>Produk Jual</button>
                       </div>
                   </div>

                   {/* DYNAMIC FIELD BASED ON TARGET */}
                   <div className="col-span-2">
                       <label className="label-text">Pilih Item {form.targetType === 'material' ? 'Bahan' : 'Produk'}</label>
                       <select className="input-field" value={form.itemId} onChange={e => setForm({...form, itemId: e.target.value})}>
                           <option value="">-- Pilih --</option>
                           {form.targetType === 'material' 
                             ? materials.map(m => <option key={m.id} value={m.id}>{m.name} ({m.qty} {m.unit})</option>)
                             : products.map(p => <option key={p.id} value={p.id}>{p.name} {p.width > 0 ? `(${p.width}x${p.length}cm)` : ''} ({p.qty} {p.unit})</option>)
                           }
                       </select>
                   </div>

                   <div><label className="label-text">Harga Satuan</label><input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="input-field" /></div>
                   <div><label className="label-text">Qty Masuk {getSelectedUnit()}</label><input type="number" value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} className="input-field" /></div>
                   <div className="col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-200"><div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-slate-500 uppercase">Total Belanja</span><span className="text-lg font-black text-slate-900">{formatCurrency(total)}</span></div><div className="grid grid-cols-2 gap-2"><div><label className="label-text">Bayar Via</label><select className="input-field" value={form.paymentMethod} onChange={e => setForm({...form, paymentMethod: e.target.value})}><option value="Cash">Cash</option><option value="Transfer">Transfer</option></select></div><div><label className="label-text">Nominal Bayar</label><input type="number" className="input-field" value={form.payAmount} onChange={e => setForm({...form, payAmount: e.target.value})} /></div></div></div>
                   <div className="col-span-2"><button onClick={handleSave} className="btn-primary w-full">Simpan Data & Update Stok</button></div>
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
          // Logic edit standar (tanpa mengubah saldo kas untuk simplifikasi prototype, idealnya ada perhitungan selisih)
          setExpenses(expenses.map(e => e.id === editItem.id ? { ...form, id: editItem.id } : e));
       } else {
          const newItem = { id: generateInvoiceCode('EXP'), date: new Date().toISOString().slice(0, 10), ...form, vendorType: 'non-mitra' };
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
           <div><h3 className="text-lg font-black text-slate-800 uppercase italic">Pengeluaran Lain</h3><p className="text-xs text-slate-500 font-medium">Listrik, Air, Gaji, ATK, dll.</p></div>
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

  const RekapPenjualan = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <FilterBar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} dateFilterMode={dateFilterMode} setDateFilterMode={setDateFilterMode} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"><table className="w-full text-left whitespace-nowrap"><thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100"><tr><th className="p-4">Kode Invoice</th><th className="p-4">Tanggal</th><th className="p-4">Pembeli</th><th className="p-4">Total</th><th className="p-4">Sisa</th><th className="p-4 text-center">Status</th></tr></thead><tbody className="divide-y divide-slate-50 text-sm">{filteredSales.map(inv => (<tr key={inv.id} className="hover:bg-slate-50"><td className="p-4 font-mono font-bold text-xs">{inv.id}</td><td className="p-4 text-xs text-slate-500">{inv.date}</td><td className="p-4 font-bold text-slate-700">{inv.buyer}</td><td className="p-4 font-black">{formatCurrency(inv.total)}</td><td className="p-4 font-bold text-red-500">{formatCurrency(inv.remaining)}</td><td className="p-4 text-center"><span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${inv.status === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{inv.status.replace('_', ' ')}</span></td></tr>))}</tbody></table></div>
    </div>
  );

  const Modal = () => {
    if (!showModal || !editItem || ['add-product', 'add-material', 'add-purchase', 'add-expense'].includes(showModal)) return null;
    const [payAdd, setPayAdd] = useState(0);
    const handleAddPayment = () => {
       const newPaid = editItem.paid + parseInt(payAdd); const newRemaining = editItem.total - newPaid;
       const updatedItem = { ...editItem, paid: newPaid, remaining: newRemaining < 0 ? 0 : newRemaining, status: newRemaining <= 0 ? 'lunas' : 'belum_lunas' };
       if (showModal === 'invoice-detail') { setSalesInvoices(salesInvoices.map(i => i.id === editItem.id ? updatedItem : i)); setWallet(prev => ({...prev, cash: prev.cash + parseInt(payAdd)})); } 
       else if (showModal === 'invoice-detail-purchase') { setPurchaseInvoices(purchaseInvoices.map(i => i.id === editItem.id ? updatedItem : i)); setWallet(prev => ({...prev, cash: prev.cash - parseInt(payAdd)})); }
       setShowModal(null); setEditItem(null); alert('Pembayaran berhasil diupdate');
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
         <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50"><h3 className="font-black text-lg uppercase italic text-slate-800">{showModal === 'invoice-detail' ? 'Detail Penjualan' : 'Detail Pembelian'}</h3><button onClick={() => setShowModal(null)}><X className="w-5 h-5 text-slate-400 hover:text-red-600" /></button></div>
            <div className="p-6 space-y-4">
               <div className="flex justify-between"><span className="text-xs font-bold text-slate-400">ID: {editItem.id}</span><span className="text-xs font-bold text-slate-400">{editItem.date}</span></div>
               <div className="text-center py-2"><h2 className="text-3xl font-black text-slate-900">{formatCurrency(editItem.total)}</h2><p className="text-xs font-bold text-slate-500 mt-1">{showModal === 'invoice-detail' ? editItem.buyer : editItem.vendor}</p></div>
               <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100"><div><p className="text-[10px] uppercase font-bold text-slate-400">Sudah Dibayar</p><p className="font-bold text-emerald-600">{formatCurrency(editItem.paid)}</p></div><div className="text-right"><p className="text-[10px] uppercase font-bold text-slate-400">Sisa Tagihan</p><p className="font-bold text-red-600">{formatCurrency(editItem.remaining)}</p></div></div>
               {editItem.remaining > 0 && (<div className="pt-4 border-t border-dashed border-slate-200"><label className="text-xs font-bold text-slate-700 mb-2 block">Tambah Pembayaran (Pelunasan)</label><div className="flex gap-2"><input type="number" value={payAdd} onChange={e => setPayAdd(e.target.value)} className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2 outline-none focus:border-red-600 font-bold" /><button onClick={handleAddPayment} className="bg-emerald-600 text-white px-4 rounded-xl font-bold text-xs uppercase hover:bg-emerald-700">Simpan</button></div></div>)}
            </div>
         </div>
      </div>
    );
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
            {activeMenu === 'input-produk' && <InputProduk />}
            {activeMenu === 'invoice-penjualan' && <InvoicePenjualan />}
            {activeMenu === 'rekap-penjualan' && <RekapPenjualan />}
            {activeMenu === 'input-bahan' && <InputBahan />}
            {activeMenu === 'invoice-belanja' && <InvoiceBelanja />}
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