// نسخة محسنة من الـ SearchBar
export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();
  
    const handleSearch = (e?: React.FormEvent) => {
      e?.preventDefault(); // لمنع تحديث الصفحة إذا استخدمت form
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`); // لضمان عمل الحروف العربية بشكل صحيح في الرابط
      }
    };
  
    return (
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن وصفة..."
          className="flex-1 border p-3 rounded-lg text-right" // إضافة محاذاة لليمين للعربي
        />
        <button
          type="submit" // يجعله يعمل مع Enter تلقائياً
          className="bg-orange-500 text-white px-6 rounded-lg"
        >
          بحث
        </button>
      </form>
    );
  }