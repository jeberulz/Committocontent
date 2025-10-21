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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Loader2, X } from "lucide-react"

interface ToneDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  preset?: any
}

const FORMALITY_OPTIONS = [
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Professional" },
  { value: "formal", label: "Formal" },
]

const TECHNICAL_DEPTH_OPTIONS = [
  { value: "beginner-friendly", label: "Beginner-Friendly" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

const PERSONALITY_TRAITS = [
  "friendly",
  "concise",
  "detailed",
  "humorous",
  "encouraging",
  "direct",
  "analytical",
  "conversational",
]

export function ToneDialog({ open, onOpenChange, preset }: ToneDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [formality, setFormality] = useState("professional")
  const [technicalDepth, setTechnicalDepth] = useState("intermediate")
  const [personality, setPersonality] = useState<string[]>([])
  const [targetAudience, setTargetAudience] = useState("")
  const [examplePhrases, setExamplePhrases] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createTonePreset = useMutation(api.toneOfVoice.createTonePreset)
  const updateTonePreset = useMutation(api.toneOfVoice.updateTonePreset)

  useEffect(() => {
    if (preset) {
      setName(preset.name || "")
      setDescription(preset.description || "")
      setFormality(preset.settings.formality || "professional")
      setTechnicalDepth(preset.settings.technicalDepth || "intermediate")
      setPersonality(preset.settings.personality || [])
      setTargetAudience(preset.settings.targetAudience || "")
      setExamplePhrases(preset.settings.examplePhrases?.join("\n") || "")
      setIsActive(preset.isActive ?? true)
    } else {
      setName("")
      setDescription("")
      setFormality("professional")
      setTechnicalDepth("intermediate")
      setPersonality(["friendly", "concise"])
      setTargetAudience("")
      setExamplePhrases("")
      setIsActive(true)
    }
  }, [preset, open])

  const togglePersonalityTrait = (trait: string) => {
    setPersonality((prev) =>
      prev.includes(trait)
        ? prev.filter((t) => t !== trait)
        : [...prev, trait]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Please enter a preset name")
      return
    }

    if (personality.length === 0) {
      toast.error("Please select at least one personality trait")
      return
    }

    setIsSubmitting(true)

    try {
      const settings = {
        formality,
        technicalDepth,
        personality,
        targetAudience: targetAudience || undefined,
        examplePhrases: examplePhrases
          ? examplePhrases.split("\n").filter((p) => p.trim())
          : undefined,
      }

      if (preset) {
        await updateTonePreset({
          presetId: preset._id,
          name,
          description: description || undefined,
          settings,
          isActive,
        })
        toast.success("Tone preset updated successfully")
      } else {
        await createTonePreset({
          name,
          description: description || undefined,
          settings,
        })
        toast.success("Tone preset created successfully")
      }
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to save tone preset")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#2a2a2a] border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {preset ? "Edit Tone Preset" : "Create New Tone Preset"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {preset
              ? "Update your tone of voice settings"
              : "Define how your AI-generated content should sound"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Preset Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Friendly Developer"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this tone"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="formality">Formality Level</Label>
              <Select value={formality} onValueChange={setFormality}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-white/10 text-white">
                  {FORMALITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technicalDepth">Technical Depth</Label>
              <Select value={technicalDepth} onValueChange={setTechnicalDepth}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-white/10 text-white">
                  {TECHNICAL_DEPTH_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Personality Traits</Label>
            <p className="text-xs text-white/50">
              Select traits that describe your desired writing style
            </p>
            <div className="flex flex-wrap gap-2">
              {PERSONALITY_TRAITS.map((trait) => (
                <Badge
                  key={trait}
                  onClick={() => togglePersonalityTrait(trait)}
                  className={`cursor-pointer capitalize transition ${
                    personality.includes(trait)
                      ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {trait}
                  {personality.includes(trait) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
            {personality.length === 0 && (
              <p className="text-xs text-red-400">
                Please select at least one personality trait
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
            <Input
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Junior developers, Tech leads"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="examplePhrases">Example Phrases (Optional)</Label>
            <p className="text-xs text-white/50">
              Add one phrase per line to guide the AI's writing style
            </p>
            <Textarea
              id="examplePhrases"
              value={examplePhrases}
              onChange={(e) => setExamplePhrases(e.target.value)}
              placeholder="Let's dive into...\nHere's what you need to know\nIn simple terms..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
            />
          </div>

          {preset && (
            <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
              <div className="space-y-0.5">
                <Label htmlFor="active">Active Status</Label>
                <p className="text-xs text-white/50">
                  Inactive presets won't appear in content generation
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
              {preset ? "Update Preset" : "Create Preset"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
