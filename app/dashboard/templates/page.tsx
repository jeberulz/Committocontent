"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import {
  FileText,
  Plus,
  Loader2,
  MoreVertical,
  Copy,
  Pencil,
  Trash2,
  BookOpen,
  Sparkles,
  Mic
} from "lucide-react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TemplateDialog } from "./template-dialog"
import { ToneDialog } from "./tone-dialog"
import { Id } from "@/convex/_generated/dataModel"

export default function TemplatesPage() {
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [isToneDialogOpen, setIsToneDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [editingTone, setEditingTone] = useState<any>(null)

  const templates = useQuery(api.templates.getUserTemplates)
  const tonePresets = useQuery(api.toneOfVoice.getUserTonePresets)
  const deleteTemplate = useMutation(api.templates.deleteTemplate)
  const deleteTonePreset = useMutation(api.toneOfVoice.deleteTonePreset)
  const duplicateTemplate = useMutation(api.templates.duplicateTemplate)
  const duplicateTonePreset = useMutation(api.toneOfVoice.duplicateTonePreset)

  const isLoading = templates === undefined || tonePresets === undefined

  const handleDeleteTemplate = async (templateId: Id<"templates">) => {
    try {
      await deleteTemplate({ templateId })
      toast.success("Template deleted successfully")
    } catch (error) {
      toast.error("Failed to delete template")
    }
  }

  const handleDuplicateTemplate = async (templateId: Id<"templates">) => {
    try {
      await duplicateTemplate({ templateId })
      toast.success("Template duplicated successfully")
    } catch (error) {
      toast.error("Failed to duplicate template")
    }
  }

  const handleDeleteTone = async (presetId: Id<"toneOfVoice">) => {
    try {
      await deleteTonePreset({ presetId })
      toast.success("Tone preset deleted successfully")
    } catch (error) {
      toast.error("Failed to delete tone preset")
    }
  }

  const handleDuplicateTone = async (presetId: Id<"toneOfVoice">) => {
    try {
      await duplicateTonePreset({ presetId })
      toast.success("Tone preset duplicated successfully")
    } catch (error) {
      toast.error("Failed to duplicate tone preset")
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "tutorial": return "📚"
      case "release-notes": return "🚀"
      case "how-to": return "🔧"
      case "deep-dive": return "🔬"
      case "weekly-update": return "📅"
      default: return "📝"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "tutorial": return "bg-blue-500/10 text-blue-300"
      case "release-notes": return "bg-emerald-500/10 text-emerald-300"
      case "how-to": return "bg-amber-500/10 text-amber-300"
      case "deep-dive": return "bg-purple-500/10 text-purple-300"
      case "weekly-update": return "bg-pink-500/10 text-pink-300"
      default: return "bg-white/5 text-white/70"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-2xl tracking-tight text-white"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
            fontWeight: 600,
          }}
        >
          Content Templates
        </h1>
        <p
          className="text-sm text-white/60 mt-1"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
          }}
        >
          Create reusable templates and define your writing style
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="templates" className="gap-2">
            <FileText className="w-4 h-4" />
            Post Templates
            {templates && templates.length > 0 && (
              <Badge className="ml-1 bg-white/10 text-white/70 border-0">
                {templates.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="tone" className="gap-2">
            <Mic className="w-4 h-4" />
            Tone of Voice
            {tonePresets && tonePresets.length > 0 && (
              <Badge className="ml-1 bg-white/10 text-white/70 border-0">
                {tonePresets.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">
              Create templates for different types of content
            </p>
            <Button
              onClick={() => {
                setEditingTemplate(null)
                setIsTemplateDialogOpen(true)
              }}
              className="bg-white text-black hover:bg-white/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>

          {/* Template Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60">Total Templates</p>
                  <p className="text-2xl tracking-tight mt-1 font-semibold">
                    {templates?.length || 0}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white/80" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60">Active</p>
                  <p className="text-2xl tracking-tight mt-1 font-semibold">
                    {templates?.filter(t => t.isActive).length || 0}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-300" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60">Most Used</p>
                  <p className="text-sm tracking-tight mt-1 font-medium truncate">
                    {templates && templates.length > 0
                      ? templates.sort((a, b) => b.usageCount - a.usageCount)[0]?.name || "None"
                      : "None"}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white/80" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60">Categories</p>
                  <p className="text-2xl tracking-tight mt-1 font-semibold">
                    {new Set(templates?.map(t => t.category)).size || 0}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-lg">📁</span>
                </div>
              </div>
            </div>
          </div>

          {/* Template Grid */}
          {templates && templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template._id}
                  className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5 hover:ring-white/20 transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                      <Badge className={`text-xs ${getCategoryColor(template.category)}`}>
                        {template.category}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <MoreVertical className="w-4 h-4 text-white/70" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-white/10">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingTemplate(template)
                            setIsTemplateDialogOpen(true)
                          }}
                          className="text-white/90 hover:bg-white/10"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDuplicateTemplate(template._id)}
                          className="text-white/90 hover:bg-white/10"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteTemplate(template._id)}
                          className="text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2">
                    {template.name}
                  </h3>

                  {template.description && (
                    <p className="text-sm text-white/60 mb-4 line-clamp-2">
                      {template.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span>Used {template.usageCount}x</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className={template.isActive ? "text-emerald-300" : "text-white/40"}>
                        {template.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-12 text-center">
              <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No templates yet</h3>
              <p className="text-sm text-white/60 mb-4">
                Create your first template to start generating consistent content
              </p>
              <Button
                onClick={() => {
                  setEditingTemplate(null)
                  setIsTemplateDialogOpen(true)
                }}
                className="bg-white text-black hover:bg-white/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Tone of Voice Tab */}
        <TabsContent value="tone" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">
              Define how your content should sound
            </p>
            <Button
              onClick={() => {
                setEditingTone(null)
                setIsToneDialogOpen(true)
              }}
              className="bg-white text-black hover:bg-white/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Tone Preset
            </Button>
          </div>

          {/* Tone Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60">Total Presets</p>
                  <p className="text-2xl tracking-tight mt-1 font-semibold">
                    {tonePresets?.length || 0}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white/80" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60">Active Presets</p>
                  <p className="text-2xl tracking-tight mt-1 font-semibold">
                    {tonePresets?.filter(t => t.isActive).length || 0}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-300" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60">Most Used</p>
                  <p className="text-sm tracking-tight mt-1 font-medium truncate">
                    {tonePresets && tonePresets.length > 0
                      ? tonePresets.sort((a, b) => b.usageCount - a.usageCount)[0]?.name || "None"
                      : "None"}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white/80" />
                </div>
              </div>
            </div>
          </div>

          {/* Tone Presets Grid */}
          {tonePresets && tonePresets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tonePresets.map((preset) => (
                <div
                  key={preset._id}
                  className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5 hover:ring-white/20 transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Mic className="w-5 h-5 text-white/70" />
                      <h3 className="text-base font-semibold text-white">
                        {preset.name}
                      </h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <MoreVertical className="w-4 h-4 text-white/70" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-white/10">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingTone(preset)
                            setIsToneDialogOpen(true)
                          }}
                          className="text-white/90 hover:bg-white/10"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDuplicateTone(preset._id)}
                          className="text-white/90 hover:bg-white/10"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteTone(preset._id)}
                          className="text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {preset.description && (
                    <p className="text-sm text-white/60 mb-4">
                      {preset.description}
                    </p>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/50 w-28">Formality:</span>
                      <Badge className="bg-white/10 text-white/90 capitalize">
                        {preset.settings.formality}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/50 w-28">Depth:</span>
                      <Badge className="bg-white/10 text-white/90 capitalize">
                        {preset.settings.technicalDepth}
                      </Badge>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-white/50 w-28 pt-1">Personality:</span>
                      <div className="flex flex-wrap gap-1">
                        {preset.settings.personality.map((trait, idx) => (
                          <Badge key={idx} className="bg-emerald-500/10 text-emerald-300 capitalize text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10">
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span>Used {preset.usageCount}x</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className={preset.isActive ? "text-emerald-300" : "text-white/40"}>
                        {preset.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-12 text-center">
              <Mic className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No tone presets yet</h3>
              <p className="text-sm text-white/60 mb-4">
                Create your first tone preset to define your writing style
              </p>
              <Button
                onClick={() => {
                  setEditingTone(null)
                  setIsToneDialogOpen(true)
                }}
                className="bg-white text-black hover:bg-white/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Tone Preset
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <TemplateDialog
        open={isTemplateDialogOpen}
        onOpenChange={setIsTemplateDialogOpen}
        template={editingTemplate}
      />
      <ToneDialog
        open={isToneDialogOpen}
        onOpenChange={setIsToneDialogOpen}
        preset={editingTone}
      />
    </>
  )
}
