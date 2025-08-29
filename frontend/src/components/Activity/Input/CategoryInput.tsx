import CategoryBadge from "@/components/Shared/Badges/CategoryBadge";

interface Props {
  type: "productive" | "distraction";
  category: string;
  setCategory: (v: string) => void;
}

const productiveCategories = [
  { value: "exercise", label: "Exercise" },
  { value: "learning", label: "Learning" },
  { value: "work", label: "Work" },
  { value: "reading", label: "Reading" },
  { value: "others", label: "Others" },
];

const distractionCategories = [
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "game", label: "Gaming" },
  { value: "others", label: "Others" },
];

export default function CategoryInput({ type, category, setCategory }: Props) {
  const categories = type === "productive" ? productiveCategories : distractionCategories;

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        Category
      </label>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategory(cat.value)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              category === cat.value
                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-lg"
                : "border-gray-200 bg-white/80 text-gray-700 hover:border-gray-300 backdrop-blur-sm"
            }`}
          >
            <div className="flex items-center gap-3">
              <CategoryBadge
                category={cat.value}
                iconSize={20}
                variant="transparent"
              />
              <span className="font-semibold">{cat.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}