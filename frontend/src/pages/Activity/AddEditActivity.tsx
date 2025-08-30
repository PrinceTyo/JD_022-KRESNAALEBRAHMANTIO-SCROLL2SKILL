import { CategoryInput } from "@/components/Activity/Input/CategoryInput";
import { TagInput } from "@/components/Activity/Input/TagInput";
import { TimeInput } from "@/components/Activity/Input/TimeInput";
import { TypeInput } from "@/components/Activity/Input/TypeInput";
import { Plus, Edit, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

interface AddEditAcProps {
  initialData?: {
    id?: string;
    _id?: string;
    title?: string;
    type?: "productive" | "distraction";
    category?: string;
    description?: string;
    tags?: string[];
    startTime?: string;
    endTime?: string;
  } | null;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    type: "productive" | "distraction";
    category: string;
    description: string;
    tags: string[];
    startTime: string;
    endTime: string;
  }) => void;
  type: string;
}

export default function AddEditActivity({
  initialData,
  onClose,
  onSubmit,
  type,
}: AddEditAcProps) {
  const [title, setTitle] = useState("");
  const [activityType, setActivityType] = useState<
    "productive" | "distraction"
  >("productive");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [startHour, setStartHour] = useState("10");
  const [startMinute, setStartMinute] = useState("30");
  const [endHour, setEndHour] = useState("12");
  const [endMinute, setEndMinute] = useState("00");

  const startTime = `${startHour}:${startMinute}`;
  const endTime = `${endHour}:${endMinute}`;

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setActivityType(initialData.type || "productive");
      setCategory(initialData.category || "");
      setDescription(initialData.description || "");
      setTags(initialData.tags || []);

      if (initialData.startTime) {
        const [sh, sm] = initialData.startTime.split(":");
        setStartHour(sh);
        setStartMinute(sm);
      }

      if (initialData.endTime) {
        const [eh, em] = initialData.endTime.split(":");
        setEndHour(eh);
        setEndMinute(em);
      }
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!category) {
      toast.error("Category is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (startTime && endTime && endTime <= startTime) {
      toast.error("End time must be greater than start time");
      return;
    }

    onSubmit({
      title,
      type: activityType,
      category,
      description,
      tags,
      startTime,
      endTime,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0">
      <div className="p-4 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-2xl shadow-lg">
              <Activity className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {type === "edit" ? "Edit Activity" : "Create New Activity"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {type === "edit"
                  ? "Make changes to your activity"
                  : "Add a new activity to track your time"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl hover:bg-red-50 transition-all duration-200 group mt-4 md:mt-0"
          >
            <MdClose className="text-2xl text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Activity Title
              </label>
              <input
                type="text"
                placeholder="e.g., Morning Exercise, Study Session..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400 text-lg shadow-sm"
              />
            </div>

            <div className="mr-0 md:mr-10">
              <TypeInput type={activityType} setType={setActivityType} />
            </div>
            <div>
              <CategoryInput
                type={activityType}
                category={category}
                setCategory={setCategory}
              />
            </div>
          </div>

          <div className="space-y-6">
            <TimeInput
              startHour={startHour}
              startMinute={startMinute}
              endHour={endHour}
              endMinute={endMinute}
              setStartHour={setStartHour}
              setStartMinute={setStartMinute}
              setEndHour={setEndHour}
              setEndMinute={setEndMinute}
            />

            <TagInput tags={tags} setTags={setTags} />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full"></span>
            Description
          </label>
          <textarea
            placeholder="Describe your target goals, objectives, and what you hope to achieve..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-24 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm resize-none placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full h-14 bg-secondary text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-center gap-3">
            {type === "edit" ? (
              <>
                <Edit className="w-5 h-5" />
                <span className="text-lg">Update Activity</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span className="text-lg">Create Activity</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}