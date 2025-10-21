"use client"

import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface TemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template?: any
}

const TEMPLATE_CATEGORIES = [
  { value: "tutorial", label: "Tutorial" },
  { value: "release-notes", label: "Release Notes" },
  { value: "how-to", label: "How-To Guide" },
  { value: "deep-dive", label: "Deep Dive" },
  { value: "weekly-update", label: "Weekly Update" },
  { value: "custom", label: "Custom" },
]

const DEFAULT_TEMPLATE_STRUCTURE = `# {{title}}

## Overview
{{overview}}

## What Changed
{{changes}}

## Key Features
{{features}}

## Code Example
\`\`\`{{language}}
{{code}}
\`\`\`

## Conclusion
{{conclusion}}

## Next Steps
{{next_steps}}`

export function TemplateDialog({ open, onOpenChange, template }: TemplateDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("tutorial")
  const [structure, setStructure] = useState(DEFAULT_TEMPLATE_STRUCTURE)
  const [isActive, setIsActive] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createTemplate = useMutation(api.templates.createTemplate)
  const updateTemplate = useMutation(api.templates.updateTemplate)

  useEffect(() => {
    if (template) {
      setName(template.name || "")
      setDescription(template.description || "")
      setCategory(template.category || "tutorial")
      setStructure(template.structure || DEFAULT_TEMPLATE_STRUCTURE)
      setIsActive(template.isActive ?? true)
    } else {
      setName("")
      setDescription("")
      setCategory("tutorial")
      setStructure(DEFAULT_TEMPLATE_STRUCTURE)
      setIsActive(true)
    }
  }, [template, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Please enter a template name")
      return
    }

    if (!structure.trim()) {
      toast.error("Please enter a template structure")
      return
    }

    setIsSubmitting(true)

    try {
      if (template) {
        await updateTemplate({
          templateId: template._id,
          name,
          description: description || undefined,
          category,
          structure,
          isActive,
        })
        toast.success("Template updated successfully")
      } else {
        await createTemplate({
          name,
          description: description || undefined,
          category,
          structure,
        })
        toast.success("Template created successfully")
      }
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to save template")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#2a2a2a] border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {template ? "Edit Template" : "Create New Template"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {template
              ? "Update your content template"
              : "Create a reusable template for generating consistent content"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Technical Tutorial"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this template"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-white/10 text-white">
                {TEMPLATE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="structure">Template Structure</Label>
            <p className="text-xs text-white/50">
              Use {"{{placeholder}}"} for dynamic content. Example: {"{{title}}"}, {"{{code}}"}, {"{{features}}"}
            </p>
            <Textarea
              id="structure"
              value={structure}
              onChange={(e) => setStructure(e.target.value)}
              placeholder={DEFAULT_TEMPLATE_STRUCTURE}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[300px] font-mono text-sm"
            />
          </div>

          {template && (
            <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
              <div className="space-y-0.5">
                <Label htmlFor="active">Active Status</Label>
                <p className="text-xs text-white/50">
                  Inactive templates won't appear in content generation
                </p>
              </div>
              <Switch
                id="active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black hover:bg-white/90"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {template ? "Update Template" : "Create Template"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
