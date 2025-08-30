// src/components/Target/Input/SourceLinkInput.tsx
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Link, ExternalLink, Check } from "lucide-react";

interface SourceLinkInputProps {
  sourceLink: string;
  setSourceLink: (link: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  allowedDomains?: string[];
}

export const SourceLinkInput = ({
  sourceLink,
  setSourceLink,
  label = "Source Link",
  placeholder = "https://example.com",
  required = false,
  allowedDomains,
}: SourceLinkInputProps ) => {
  const [inputValue, setInputValue] = useState(sourceLink);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    try {
      const u = new URL(url);
      if (allowedDomains?.length) {
        return allowedDomains.some((d) => u.hostname.includes(d));
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setError("");
    setIsValid(validateUrl(value));
  };

  const handleSaveLink = () => {
    if (!inputValue.trim()) {
      if (required) {
        setError("Please enter a URL");
        return;
      }
      setSourceLink("");
      return;
    }
    if (!validateUrl(inputValue)) {
      const msg = allowedDomains?.length
        ? `Only links from ${allowedDomains.join(", ")} are allowed`
        : "Please enter a valid URL";
      setError(msg);
      return;
    }
    setSourceLink(inputValue.trim());
    setError("");
  };

  const handleClearLink = () => {
    setInputValue("");
    setSourceLink("");
    setError("");
    setIsValid(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveLink();
    }
  };

  const openLink = (url: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const hasUnsavedChanges = inputValue.trim() !== sourceLink;

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <span className="w-2 h-2 bg-secondary rounded-full" />
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="url"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className={`transition-colors ${
              error
                ? "border-red-500 focus:border-red-500"
                : isValid
                ? "border-green-500 focus:border-green-500"
                : ""
            }`}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {hasUnsavedChanges && !error && (
            <p className="text-amber-600 text-xs mt-1">
              Press Enter or click Save to apply changes
            </p>
          )}
        </div>

        <div className="flex gap-1">
          {hasUnsavedChanges && (
            <Button
              type="button"
              onClick={handleSaveLink}
              disabled={!!error}
              variant="outline"
              title="Save link"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}

          {(inputValue || sourceLink) && (
            <Button
              type="button"
              onClick={handleClearLink}
              variant="outline"
              title="Clear link"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {sourceLink && (
        <div className="space-y-2">
          <span className="text-xs text-gray-500">Current source link:</span>
          <div className="flex items-center justify-between p-3 border border-green-200 rounded-md bg-green-50 group hover:bg-green-100 transition-colors">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Link className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate" title={sourceLink}>
                {sourceLink}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => openLink(sourceLink)}
              className="h-8 w-8 p-0 opacity-70 group-hover:opacity-100 transition-opacity hover:bg-green-200"
              title="Open link in new tab"
            >
              <ExternalLink className="h-4 w-4 text-green-600" />
            </Button>
          </div>
        </div>
      )}

      {!sourceLink && !inputValue && (
        <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
          <Link className="h-6 w-6 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No source link added</p>
          <p className="text-xs text-gray-400">Add a URL to reference the source</p>
        </div>
      )}
    </div>
  );
};