import {
  BookOpen,
  BookOpenCheck,
  Brain,
  Briefcase,
  CircleQuestionMark,
  Footprints,
  HeartCrack,
  HeartHandshake,
  HeartPulse,
  ImageOff,
  MirrorRound,
  Shield,
  Sprout,
  Triangle,
  Users,
  type LucideIcon,
} from 'lucide-react'

/** One icon per الموضوعات topic, each saying something about the topic itself
 *  — a mirror for self-image, a shield for spiritual warfare — rather than the
 *  same tick eight times over. Anything not named here has no icon: a generic
 *  mark repeated down a list says less than none at all. */
const icons: Record<string, LucideIcon> = {
  'مسح شامل للكتاب المقدس': BookOpen,
  'صور مغلوطة عن الله': ImageOff,
  'الشر والألم': HeartCrack,
  'الثالوث وطبيعة الله': Triangle,
  'الحرب الروحية': Shield,
  'التشكيل الروحي': Sprout,
  'الهوية والقيمة والصورة الذاتية': MirrorRound,
  العلاقات: Users,
  'العلاقة الشخصية مع الله': HeartHandshake,
  'كيف نفهم الكتاب المقدس': BookOpenCheck,
  'التعامل مع الإشكاليات': CircleQuestionMark,
  'حياة التلمذة': Footprints,
  // المحاور الرئيسية الأربعة
  'المحور الروحي والنفسي': HeartPulse,
  'المحور المجتمعي والعلاقاتي': Users,
  'المحور العملي/المهني': Briefcase,
  'المحور الفكري واللاهوتي': Brain,
}

export function topicIcon(label: string): LucideIcon | undefined {
  return icons[label]
}
