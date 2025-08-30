import { SourceLinkInput } from "@/components/Target/Input/SourceLinkInput";
import { SourceTypeInput } from "@/components/Target/Input/SourceTypeInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Target, Plus, Edit, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import type { TargetData } from "@/api/targetApi";
import { TargetDoneInput } from "@/components/Target/Input/TargetDoneInput";
import toast from "react-hot-toast";

interface AddEditTargetProps {
  initialData?: {
    id?: string;
    _id?: string;
    title?: string;
    sourceType?: TargetData["sourceType"];
    sourceLink?: string;
    description?: string;
    targetDone?: string;
    progress?: number;
  } | null;
  onClose?: () => void;
  onSubmit?: (data: {
    title: string;
    sourceType: TargetData["sourceType"];
    sourceLink: string;
    description: string;
    targetDone: string;
    progress: number;
  }) => void;
  type?: "add" | "edit";
}

export default function AddEditTarget({
  initialData,
  onClose,
  onSubmit,
  type = "add",
}: AddEditTargetProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [sourceType, setSourceType] = useState<TargetData["sourceType"]>(
    (initialData?.sourceType as TargetData["sourceType"]) || "others"
  );
  const [sourceLink, setSourceLink] = useState(initialData?.sourceLink || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [targetDone, setTargetDone] = useState(initialData?.targetDone || "");
  const [progress, setProgress] = useState(initialData?.progress || 0);

  const getAllowedDomains = (type: TargetData["sourceType"]) => {
    switch (type) {
      case "youtube":
        return ["youtube.com", "youtu.be"];
      case "course":
        return undefined;
      default:
        return undefined;
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!sourceType) {
      toast.error("Source type is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!targetDone) {
      toast.error("Target completion date is required");
      return;
    }

    onSubmit?.({
      title: title.trim(),
      sourceType,
      sourceLink,
      description: description.trim(),
      targetDone,
      progress,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0">
      <div className="p-4 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-2xl shadow-lg">
              <Target className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {type === "edit" ? "Edit Target" : "Create New Target"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {type === "edit"
                  ? "Update your target details"
                  : "Set your goals and track progress"}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                Target Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Learn React Hooks"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              />
            </div>

            <div>
              <SourceTypeInput
                sourceType={sourceType}
                setSourceType={setSourceType}
              />
            </div>

            <div>
              <SourceLinkInput
                sourceLink={sourceLink}
                setSourceLink={setSourceLink}
                allowedDomains={getAllowedDomains(sourceType)}
                placeholder="https://reactjs.org/docs/hooks-intro.html"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="targetDone"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-secondary" />
                Target Completion Date
              </Label>
              <TargetDoneInput value={targetDone} onChange={setTargetDone} />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="progress"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-green-500" />
                Current Progress ({progress}%)
              </Label>
              <div className="space-y-3">
                <Input
                  id="progress"
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={({ target }) => setProgress(Number(target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span className="font-semibold text-green-600">
                    {progress}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-2xl border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Progress Status
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    progress >= 80
                      ? "bg-green-100 text-green-800"
                      : progress >= 50
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {progress >= 80
                    ? "Excellent"
                    : progress >= 50
                    ? "Good"
                    : "Keep Going"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="description"
            className="text-sm font-semibold text-gray-700 flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-secondary rounded-full"></span>
            Description
          </Label>
          <Textarea
            placeholder="Describe your target goals, objectives, and what you hope to achieve..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-24 bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm resize-none"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-14 bg-secondary text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-secondary transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-center gap-3">
            {type === "edit" ? (
              <>
                <Edit className="w-5 h-5" />
                <span className="text-lg">Update Target</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span className="text-lg">Create Target</span>
              </>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
}
