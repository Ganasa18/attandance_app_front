import { useState } from "react";
import { toast } from "sonner";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      toast.warning("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.success(`Copied ${copiedText}`);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      toast.warning("Copy Failed");
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}
