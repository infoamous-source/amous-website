"use client";

import { useState, useRef, useCallback } from "react";

interface ImageUploaderProps {
  currentUrl: string | null;
  onUpload: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUploader({ currentUrl, onUpload, label = "이미지", className = "" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (file: File) => {
    setError("");
    setUploading(true);

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      setError("지원하지 않는 형식입니다. (jpg, png, gif, webp, svg)");
      setUploading(false);
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("50MB 이하 파일만 업로드 가능합니다.");
      setUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        onUpload(data.url);
        setPreview(data.url);
      } else {
        setError(data.error || "업로드 실패");
        setPreview(currentUrl);
      }
    } catch {
      setError("업로드 중 오류가 발생했습니다.");
      setPreview(currentUrl);
    }
    setUploading(false);
  }, [currentUrl, onUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const displayUrl = preview || currentUrl;

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={"relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all " +
          (dragOver ? "border-navy-800 bg-navy-50" : "border-gray-300 hover:border-gray-400") + " " +
          (uploading ? "opacity-70 pointer-events-none" : "")}
      >
        {displayUrl ? (
          <div className="space-y-3">
            <div className="relative w-full max-w-xs mx-auto">
              <img
                src={displayUrl}
                alt={label}
                className="w-full h-auto max-h-48 object-contain rounded-lg"
              />
            </div>
            <p className="text-xs text-gray-500">클릭하거나 파일을 드래그하여 변경</p>
          </div>
        ) : (
          <div className="py-8">
            <svg className="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6.75 7.5l.75-.75a.75.75 0 011.06 0l.75.75M6.75 7.5h10.5" />
            </svg>
            <p className="text-sm text-gray-600 font-medium">클릭하여 이미지 선택</p>
            <p className="text-xs text-gray-400 mt-1">또는 파일을 드래그 앤 드롭</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WebP (최대 50MB)</p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-navy-800 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">업로드 중...</p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml,.gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

      {displayUrl && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setPreview(null);
            onUpload("");
          }}
          className="text-xs text-red-500 hover:text-red-700 mt-2"
        >
          이미지 제거
        </button>
      )}
    </div>
  );
}
